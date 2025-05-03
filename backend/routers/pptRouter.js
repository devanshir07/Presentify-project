const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');
const libre = require('libreoffice-convert');
const util = require('util');
const { spawn } = require('child_process');
const axios = require('axios');

const genAPI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const convertAsync = util.promisify(libre.convert);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Replace the downloadImage function with this improved version
async function downloadImage(imageKeyword) {
    try {
        console.log(`Searching Pexels for keyword: ${imageKeyword}`);
        
        const searchResponse = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(imageKeyword)}&per_page=1&orientation=landscape`, {
            headers: {
                'Authorization': process.env.PEXELS_API_KEY
            }
        });

        if (!searchResponse.data?.photos?.[0]?.src?.large2x) {
            console.error('No images found on Pexels');
            return null;
        }

        const imageUrl = searchResponse.data.photos[0].src.large2x;
        console.log(`Found image URL: ${imageUrl}`);

        // Download the actual image
        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'image/jpeg, image/png, image/jpg'
            }
        });

        if (!imageResponse.data || imageResponse.data.length === 0) {
            console.error('No image data received');
            return null;
        }

        // Determine the image type from the Content-Type header
        const contentType = imageResponse.headers['content-type'];
        const extension = contentType === 'image/png' ? 'png' : 
                         contentType === 'image/jpeg' ? 'jpeg' :
                         contentType === 'image/jpg' ? 'jpg' : 'jpeg';

        // Save image to temp file
        const tempFileName = `temp_${Date.now()}.${extension}`;
        const tempFilePath = path.join(uploadsDir, tempFileName);
        fs.writeFileSync(tempFilePath, imageResponse.data);

        return {
            path: tempFilePath,
            type: contentType
        };
    } catch (error) {
        console.error('Error downloading image from Pexels:', error.message);
        return null;
    }
}

// Cleanup old files (files older than 1 hour)
const cleanupOldFiles = () => {
    const files = fs.readdirSync(uploadsDir);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    files.forEach(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        if (now - stats.mtimeMs > oneHour) {
            try {
                fs.unlinkSync(filePath);
                console.log(`Cleaned up old file: ${file}`);
            } catch (err) {
                console.error(`Error cleaning up file ${file}:`, err);
            }
        }
    });
};

// Run cleanup every hour
setInterval(cleanupOldFiles, 60 * 60 * 1000);

// Add preview endpoint
router.get('/preview/:filename', async (req, res) => {
    try {
        const filePath = path.join(uploadsDir, req.params.filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.log('File not found:', filePath);
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        const outputPath = path.join(uploadsDir, `preview_${req.params.filename.replace('.pptx', '.pdf')}`);

        // Use PowerPoint to convert PPTX to PDF
        const powershellScript = `
    $PowerPoint = New-Object -ComObject PowerPoint.Application
    $Presentation = $PowerPoint.Presentations.Open("${filePath}")
    $Presentation.SaveAs("${outputPath}", 32)
    $Presentation.Close()
    $PowerPoint.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($Presentation)
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($PowerPoint)
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
        `;

        const ps = spawn('powershell.exe', ['-Command', powershellScript]);

        ps.on('exit', (code) => {
            if (code !== 0) {
                console.error('PowerPoint conversion failed');
                return res.status(500).json({ success: false, message: 'Conversion failed' });
            }

            // Set response headers for PDF
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="preview_${req.params.filename.replace('.pptx', '.pdf')}"`);

            // Send PDF file
            const absolutePath = path.resolve(outputPath);
            res.sendFile(absolutePath, {}, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                }
                // Clean up PDF file after sending
                setTimeout(() => {
                    try {
                        if (fs.existsSync(outputPath)) {
                            fs.unlinkSync(outputPath);
                            console.log('Cleaned up PDF file:', outputPath);
                        }
                    } catch (unlinkError) {
                        console.error('Error cleaning up PDF:', unlinkError);
                    }
                }, 1000);
            });
        });

        ps.stderr.on('data', (data) => {
            console.error(`PowerShell Error: ${data}`);
        });

    } catch (error) {
        console.error('Error in preview endpoint:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating preview',
            error: error.message
        });
    }
});

// Add download endpoint
router.get('/download/:filename', (req, res) => {
    try {
        const filePath = path.join(uploadsDir, req.params.filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        // Send the file for download
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).json({ success: false, message: 'Error downloading file' });
            }
        });
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ success: false, message: 'Error downloading file' });
    }
});

router.post('/create-ppt', async (req, res) => {
    try {
        const { topic, numberOfSlides, additionalInfo } = req.body;

        // Validate input
        if (!topic || !numberOfSlides || numberOfSlides < 1 || numberOfSlides > 50) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input. Topic is required and number of slides must be between 1 and 50.'
            });
        }

        // Initialize Gemini model for this request
        const geminiModel = genAPI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Generate content for PPT using Gemini
        const prompt = `Create a professional and engaging presentation outline for the topic: "${topic}" with exactly ${numberOfSlides} slides.
Additional requirements: ${additionalInfo || 'None'}.

Please follow these guidelines:
1. Each slide should have:
   - A clear, concise title that captures the main point
   - 3-5 key bullet points (each 1-2 lines long)
   - A descriptive keyword for Unsplash image search that matches the slide's content
   - Specific animation effects that enhance the content delivery
   - Appropriate slide transitions that flow naturally

2. The first slide should be a title slide
3. The second slide should outline the key points to be covered
4. The remaining slides should follow a logical progression

Format the response strictly as JSON with this structure:
{
  "slides": [
    {
      "title": "Clear and Engaging Title",
      "content": [
        "Detailed point with specific information",
        "Clear supporting point with examples or data",
        "Actionable or concluding point"
      ],
      "template": "Choose from: TITLE_SLIDE, TITLE_AND_CONTENT, COMPARISON, IMAGE_WITH_CAPTION, TWO_CONTENT, SECTION_HEADER",
      "animation": "Choose from: FADE_IN, ZOOM, WIPE, FLOAT_IN, SPLIT, WHEEL, CIRCLE",
      "transition": "Choose from: MORPH, FADE, PUSH, SPLIT, CUT, DISSOLVE, COVER",
      "imageKeyword": "Specific descriptive keyword for Unsplash - make it precise and relevant",
      "imageUrl": "Include the URL of the image that fits this slide's content"


    }
  ]
}

Important notes:
- Make image keywords specific and descriptive (e.g., "mountain-sunrise-landscape" instead of just "mountain")
- Ensure content points are informative and not generic
- Choose animations that complement the content type
- Vary slide layouts for visual interest
- Keep language professional and concise

Return only the JSON without any additional text or formatting.`;

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text();

        // Clean up the response text by removing markdown formatting if present
        if (responseText.includes('```')) {
            responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        }

        const pptContent = JSON.parse(responseText);

        // Create PPT
        const pres = new pptxgen();

        // Configure default slide size (16:9)
        pres.layout = 'LAYOUT_16x9';

        // Keep track of temporary image files
        const tempImages = [];

        // Add slides
        for (let i = 0; i < pptContent.slides.length; i++) {
            const slide = pptContent.slides[i];
            const newSlide = pres.addSlide();

            // Set slide transition
            newSlide.transition = {
                name: slide.transition.toLowerCase()
            };

            // Set slide layout based on template type
            if (slide.template === 'TITLE_SLIDE') {
                newSlide.addText(slide.title, {
                    x: '10%',
                    y: '40%',
                    w: '80%',
                    fontSize: 44,
                    bold: true,
                    color: '363636',
                    align: 'center',
                    animate: { animation: slide.animation.toLowerCase() }
                });
            } else {
                // Add title
                newSlide.addText(slide.title, {
                    x: '5%',
                    y: '5%',
                    w: '90%',
                    h: '15%',
                    fontSize: 32,
                    bold: true,
                    color: '363636',
                    animate: { animation: slide.animation.toLowerCase() }
                });

                // Replace the image handling section in the create-ppt route
                if (slide.imageKeyword) {
                    try {
                        const imageResult = await downloadImage(slide.imageKeyword);
                        if (imageResult && imageResult.path) {
                            if (slide.template === 'IMAGE_WITH_CAPTION') {
                                const imageOpts = {
                                    path: imageResult.path,
                                    x: '10%',
                                    y: '25%',
                                    w: '80%',
                                    h: '40%'
                                };
                                await newSlide.addImage(imageOpts);
                                
                                const contentText = slide.content.join('\n');
                                newSlide.addText(contentText, {
                                    x: '10%',
                                    y: '70%',
                                    w: '80%',
                                    fontSize: 18,
                           bullet: true,
                                    color: '666666',
                                    animate: { animation: slide.animation.toLowerCase() }
                                });
                            } else {
                                const imageOpts = {
                                    path: imageResult.path,
                                    x: '60%',
                                    y: '25%',
                                    w: '35%',
                                    h: '45%'
                                };
                                await newSlide.addImage(imageOpts);

                                const contentText = slide.content.join('\n');
                                newSlide.addText(contentText, {
                                    x: '5%',
                                    y: '25%',
                                    w: '50%',
                                    fontSize: 18,
                                    bullet: true,
                                    color: '666666',
                                    animate: { animation: slide.animation.toLowerCase() }
                                });
                            }
                            
                            // Add the temporary image path to the cleanup array
                            tempImages.push(imageResult.path);
                        }
                    } catch (imageError) {
                        console.error('Error adding image to slide:', imageError);
                        // Fall back to text-only slide
                        const contentText = slide.content.join('\n');
                        newSlide.addText(contentText, {
                            x: '5%',
                            y: '25%',
                            w: '90%',
                            fontSize: 18,
                            bullet: true,
                            color: '666666',
                            animate: { animation: slide.animation.toLowerCase() }
                        });
                    }
                } else {
                    // No image - just add content points
                    const contentText = slide.content.join('\n');
                    newSlide.addText(contentText, {
                        x: '5%',
                        y: '25%',
                        w: '90%',
                        fontSize: 18,
                        bullet: true,
                        color: '666666',
                        animate: { animation: slide.animation.toLowerCase() }
                    });
                }
            }
        }

        // Save PPT in uploads directory
        const fileName = `${topic.replace(/[^a-zA-Z0-9]/g, '_')}_presentation.pptx`;
        const filePath = path.join(uploadsDir, fileName);
        await pres.writeFile({ fileName: filePath });

        // Clean up temporary image files
        tempImages.forEach(imagePath => {
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            } catch (error) {
                console.error('Error cleaning up image:', error);
            }
        });

        res.json({
            success: true,
            message: 'PPT created successfully',
            fileName: fileName
        });

    } catch (error) {
        console.error('Error creating PPT:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating PPT',
            error: error.message
        });
    }
});

module.exports = router;