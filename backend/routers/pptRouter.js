const express = require("express");
const router = express.Router();
const Model = require("../models/pptModel");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");
const libre = require("libreoffice-convert");
const util = require("util");
const { spawn } = require("child_process");
const axios = require("axios");

const genAPI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const convertAsync = util.promisify(libre.convert);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Add this helper function at the top of your file
function isLightColor(color) {
  // Remove the '#' if present
  const hex = color.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance
  // Using the formula from WCAG 2.0
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return true if color is light (luminance > 0.5)
  return luminance > 0.5;
}

// Replace the downloadImage function with this improved version
async function downloadImage(imageKeyword, topic) {
  try {
    // Combine the topic context with the image keyword for better relevance
    const searchTerm = `${topic} ${imageKeyword}`.trim();
    console.log(`Searching Pexels for keyword: ${searchTerm}`);

    // Get multiple images to have better options
    const searchResponse = await axios.get(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&per_page=3&orientation=landscape`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    if (!searchResponse.data?.photos?.length) {
      // Fallback to just the imageKeyword if no results with combined search
      const fallbackResponse = await axios.get(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          imageKeyword
        )}&per_page=3&orientation=landscape`,
        {
          headers: {
            Authorization: process.env.PEXELS_API_KEY,
          },
        }
      );

      if (!fallbackResponse.data?.photos?.length) {
        console.error("No images found on Pexels");
        return null;
      }

      // Select the most relevant image based on size and quality
      const bestPhoto = fallbackResponse.data.photos.reduce((best, current) => {
        return current.width * current.height > best.width * best.height
          ? current
          : best;
      });

      const imageUrl = bestPhoto.src.large2x;
      console.log(`Found fallback image URL: ${imageUrl}`);

      // Download the actual image
      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        headers: {
          Accept: "image/jpeg, image/png, image/jpg",
        },
      });

      if (!imageResponse.data || imageResponse.data.length === 0) {
        console.error("No image data received");
        return null;
      }

      // Determine the image type from the Content-Type header
      const contentType = imageResponse.headers["content-type"];
      const extension =
        contentType === "image/png"
          ? "png"
          : contentType === "image/jpeg"
          ? "jpeg"
          : contentType === "image/jpg"
          ? "jpg"
          : "jpeg";

      // Save image to temp file
      const tempFileName = `temp_${Date.now()}.${extension}`;
      const tempFilePath = path.join(uploadsDir, tempFileName);
      fs.writeFileSync(tempFilePath, imageResponse.data);

      return {
        path: tempFilePath,
        type: contentType,
      };
    } else {
      // Select the most relevant image based on size and quality
      const bestPhoto = searchResponse.data.photos.reduce((best, current) => {
        return current.width * current.height > best.width * best.height
          ? current
          : best;
      });

      const imageUrl = bestPhoto.src.large2x;
      console.log(`Found image URL: ${imageUrl}`);

      // Download the actual image
      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        headers: {
          Accept: "image/jpeg, image/png, image/jpg",
        },
      });

      if (!imageResponse.data || imageResponse.data.length === 0) {
        console.error("No image data received");
        return null;
      }

      // Determine the image type from the Content-Type header
      const contentType = imageResponse.headers["content-type"];
      const extension =
        contentType === "image/png"
          ? "png"
          : contentType === "image/jpeg"
          ? "jpeg"
          : contentType === "image/jpg"
          ? "jpg"
          : "jpeg";

      // Save image to temp file
      const tempFileName = `temp_${Date.now()}.${extension}`;
      const tempFilePath = path.join(uploadsDir, tempFileName);
      fs.writeFileSync(tempFilePath, imageResponse.data);

      return {
        path: tempFilePath,
        type: contentType,
      };
    }
  } catch (error) {
    console.error("Error downloading image from Pexels:", error.message);
    return null;
  }
}

// Cleanup old files (files older than 1 hour)
const cleanupOldFiles = () => {
  const files = fs.readdirSync(uploadsDir);
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  files.forEach((file) => {
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
router.get("/preview/:filename", async (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  const outputPath = filePath.replace(".pptx", ".pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: "File not found" });
  }

  try {
    // Check if PDF already exists and is newer than the PPTX file
    const pptxStats = fs.statSync(filePath);
    let needsConversion = true;
    
    if (fs.existsSync(outputPath)) {
      const pdfStats = fs.statSync(outputPath);
      // Only reconvert if PPTX is newer than PDF
      if (pdfStats.mtimeMs >= pptxStats.mtimeMs) {
        needsConversion = false;
      }
    }
    
    // Convert if needed
    if (needsConversion) {
      const pptData = fs.readFileSync(filePath);
      const pdfData = await convertAsync(pptData, ".pdf", undefined);
      fs.writeFileSync(outputPath, pdfData);
    }

    // Set proper cache control headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${path.basename(outputPath)}"`
    );
    
    // Send file
    res.sendFile(outputPath, { root: path.dirname(outputPath) });
  } catch (error) {
    console.error("LibreOffice preview error:", error.message);
    res.status(500).json({ success: false, message: "Preview failed", error: error.message });
  }
});

// Add endpoint to extract content from PPT
router.get("/get-content/:filename", async (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: "File not found" });
  }

  try {
    // This is a simplified approach. For production, you would need
    // a proper PPT parsing library that can extract text content
    // For now, we'll return placeholder data
    
    // Mock data - in a real implementation, you would extract this from the PPT
    const slides = [
      "Content for slide 1",
      "Content for slide 2", 
      "Content for slide 3"
    ];
    
    res.json({
      success: true,
      slides: slides
    });
  } catch (error) {
    console.error("Error extracting content:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to extract content",
      error: error.message
    });
  }
});

// Fix the edit-ppt endpoint to use POST instead of PUT
router.post("/edit-ppt", async (req, res) => {
  const { filename, slides } = req.body;

  if (!filename || !slides || !Array.isArray(slides)) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    const pres = new pptxgen();
    pres.layout = "LAYOUT_16x9";

    slides.forEach((slideText, index) => {
      const slide = pres.addSlide();
      slide.background = { color: "#1F2937" };

      slide.addText(`Slide ${index + 1}`, {
        x: 0.5,
        y: 0.3,
        w: "90%",
        h: 1,
        fontSize: 26,
        bold: true,
        color: "#FFFFFF",
      });

      slide.addText(slideText || "No content provided", {
        x: 0.7,
        y: 1.5,
        w: "90%",
        h: 4.5,
        fontSize: 18,
        color: "#F3F4F6",
      });
    });

    const savePath = path.join(uploadsDir, filename);
    await pres.writeFile(savePath);

    // Delete any existing PDF (it will be regenerated on next preview request)
    const pdfPath = savePath.replace(".pptx", ".pdf");
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }

    res.json({ success: true, message: "Presentation updated!", fileName: filename });
  } catch (err) {
    console.error("Edit PPT Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update PPT",
      error: err.message 
    });
  }
});

// Add download endpoint
router.get("/download/:filename", (req, res) => {
  try {
    const filePath = path.join(uploadsDir, req.params.filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    // Send the file for download
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ success: false, message: "Error downloading file" });
  }
});

// Get all presentations
router.get("/getall", (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/create-ppt", async (req, res) => {
  try {
    const { topic, numberOfSlides, additionalInfo } = req.body;

    // Validate input
    if (
      !topic ||
      !numberOfSlides ||
      numberOfSlides < 1 ||
      numberOfSlides > 50
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid input. Topic is required and number of slides must be between 1 and 50.",
      });
    }

    // Initialize Gemini model for this request
    const geminiModel = genAPI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    // Generate content for PPT using Gemini
    const prompt = `Create a professional and engaging presentation outline for the topic: "${topic}" with exactly ${numberOfSlides} slides.
Additional requirements: ${additionalInfo || "None"}.

Please follow these guidelines:
1. Each slide should have:
   - A clear, concise title that captures the main point
   - 3-4 key bullet points (each 1-2 lines long)
   - Multiple descriptive keywords for image search that match the slide's content
   - Background design theme suggestion (modern, gradient, geometric, etc.)
   - Background color scheme (provide light and dark contrasting hex codes)
   - Text color that ensures WCAG 2.1 AA contrast ratio (provide hex code)
   - Appropriate slide transitions that flow naturally
   - Clear content zones to prevent overlap between text and images

2. Layout Guidelines:
   - Title should always be at the top 20% of the slide
   - Content should be positioned based on image placement:
     * If image is on right: text on left 40% of slide
     * If image is on left: text on right 40% of slide
     * If image is banner: text below image
     * If grid layout: text below images
   - Maintain 16:9 aspect ratio for all layout decisions
   - Images should have fixed aspect ratios (4:3 or 16:9)
   - Minimum 20px padding between elements

3. Color Guidelines:
   - Background colors must provide sufficient contrast for text
   - Text colors must meet WCAG 2.1 AA standards (4.5:1 ratio for normal text)
   - Include a secondary text color for highlights or emphasis
   - Consistent color scheme throughout presentation

Format the response strictly as JSON with this structure:
{
  "theme": {
    "primary": "#hexcolor",
    "accent": "#hexcolor",
    "textPrimary": "#hexcolor",
    "textSecondary": "#hexcolor",
    "designStyle": "modern/geometric/gradient/etc",
    "spacing": {
      "titleTop": "5%",
      "contentPadding": "20px",
      "elementGap": "15px"
    }
  },
  "slides": [
    {
      "title": "Clear and Engaging Title",
      "content": [
        "Detailed point with specific information",
        "Clear supporting point with examples or data",
        "Actionable or concluding point"
      ],
      "template": "Choose from: TITLE_SLIDE, TITLE_AND_CONTENT, COMPARISON, IMAGE_WITH_CAPTION, TWO_CONTENT, SECTION_HEADER",
      "transition": "Choose from: MORPH, FADE, PUSH, SPLIT, CUT, DISSOLVE, COVER",
      "backgroundStyle": {
        "type": "gradient/solid/pattern",
        "colors": ["#hexcolor1", "#hexcolor2"],
        "pattern": "dots/lines/geometric/etc"
      },
      "imageKeywords": ["keyword1", "keyword2", "keyword3"],
      "imageLayout": {
        "type": "grid/floating/banner/side-by-side",
        "contentPosition": "left/right/bottom",
        "aspectRatio": "16:9",
        "maxHeight": "40%",
        "spacing": {
          "top": "25%",
          "bottom": "15%",
          "left": "5%",
          "right": "5%"
        }
      }
    }
  ]
}`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();

    // Clean up the response text by removing markdown formatting if present
    if (responseText.includes("```")) {
      responseText = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
    }

    const pptContent = JSON.parse(responseText);

    // Create PPT
    const pres = new pptxgen();

    // Configure default slide size (16:9)
    pres.layout = "LAYOUT_16x9";

    // Set presentation theme with proper contrast
    const theme = pptContent.theme;
    const defaultTheme = {
      primary: "#000000", // Black background
      accent: "#FFFFFF", // White accent
      textPrimary: "#FFFFFF", // White text
      textSecondary: "#E5E7EB", // Light gray text
      background: {
        light: "#333333", // Dark gray
        dark: "#000000", // Pure black
      },
    };

    // Use theme colors from API response or force dark theme
    pres.theme = {
      background: { color: defaultTheme.primary }, // Force black background
      title: {
        color: defaultTheme.textPrimary, // White text for titles
        fontSize: 44,
      },
      body: {
        color: defaultTheme.textPrimary, // White text for body
        fontSize: 18,
      },
    };

    // Keep track of temporary image files
    const tempImages = [];

    // Modify slide creation to ensure dark theme compatibility
    // Replace inside the for-loop where slides are added
    for (let i = 0; i < pptContent.slides.length; i++) {
      const slide = pptContent.slides[i];
      const newSlide = pres.addSlide();
      newSlide.background = { color: defaultTheme.primary };

      // Title zone
      newSlide.addText(slide.title, {
        x: "5%",
        y: "5%",
        w: "90%",
        h: "15%",
        fontSize: 32,
        bold: true,
        color: defaultTheme.textPrimary,
        align: "left",
      });

      const layout = slide.imageLayout || {};
      const contentPos = layout.contentPosition || "left";
      const textOpts = {
        y: "25%",
        h: "60%",
        fontSize: 18,
        color: defaultTheme.textPrimary,
        bullet: {
          type: "bullet",
          indent: 15,
          style: { type: "solid", color: defaultTheme.textPrimary },
        },
        bulletFont: { name: "Arial", size: 10 },
        paraSpaceAfter: 20,
        paraSpaceBefore: 5,
        lineSpacing: 1.5,
        indentLevel: 0,
        margin: [0, 0, 15, 0],
        breakLine: true,
      };

      // Layout logic based on contentPosition
      if (contentPos === "left") {
        textOpts.x = "5%";
        textOpts.w = "45%";
      } else if (contentPos === "right") {
        textOpts.x = "50%";
        textOpts.w = "45%";
      } else if (contentPos === "bottom") {
        textOpts.x = "5%";
        textOpts.y = "60%";
        textOpts.w = "90%";
        textOpts.h = "30%";
      } else {
        textOpts.x = "5%";
        textOpts.w = "90%";
      }

      if (slide.content && slide.content.length > 0) {
        const bulletParagraphs = slide.content.map((line) => ({
          text: line,
          options: {
            bullet: true,
            fontSize: 18,
            color: defaultTheme.textPrimary,
            paraSpaceAfter: 10,
          },
        }));
        newSlide.addText(bulletParagraphs, {
          x: textOpts.x,
          y: textOpts.y,
          w: textOpts.w,
          h: textOpts.h,
        });
      }

      // Add image if present
      if (slide.imageKeywords && slide.imageKeywords.length > 0) {
        const imagePromises = slide.imageKeywords.map((keyword) =>
          downloadImage(keyword, topic)
        );
        const imageResults = await Promise.all(imagePromises);
        const validImages = imageResults.filter(
          (result) => result && result.path
        );

        if (validImages.length > 0) {
          const imagePath = validImages[0].path;
          const imageOpts = {
            path: imagePath,
            sizing: { type: "contain", w: "40%", h: "50%" },
          };

          if (contentPos === "left") {
            imageOpts.x = "50%";
            imageOpts.y = "25%";
            imageOpts.w = "40%";
            imageOpts.h = "50%";
          } else if (contentPos === "right") {
            imageOpts.x = "5%";
            imageOpts.y = "25%";
            imageOpts.w = "40%";
            imageOpts.h = "50%";
          } else if (contentPos === "bottom") {
            imageOpts.x = "5%";
            imageOpts.y = "25%";
            imageOpts.w = "90%";
            imageOpts.h = "30%";
          } else {
            imageOpts.x = "50%";
            imageOpts.y = "25%";
            imageOpts.w = "40%";
            imageOpts.h = "50%";
          }

          newSlide.addImage(imageOpts);
          tempImages.push(imagePath);
        }
      }
    }

    // Save PPT in uploads directory
    const fileName = `${topic.replace(/[^a-zA-Z0-9]/g, "_")}_presentation.pptx`;
    const filePath = path.join(uploadsDir, fileName);
    await pres.writeFile(filePath);

    // Clean up temporary image files
    tempImages.forEach((imagePath) => {
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (error) {
        console.error("Error cleaning up image:", error);
      }
    });

    // Save presentation record to database
    try {
      const newPresentation = new Model({
        title: topic,
        slides: pptContent.slides.length,
        createdAt: new Date()
      });
      await newPresentation.save();
    } catch (dbError) {
      console.error("Error saving to database:", dbError);
      // Continue execution even if DB save fails
    }

    res.json({
      success: true,
      message: "PPT created successfully",
      fileName: fileName,
    });
  } catch (error) {
    console.error("Error creating PPT:", error);
    res.status(500).json({
      success: false,
      message: "Error creating PPT",
      error: error.message,
    });
  }
});

module.exports = router;