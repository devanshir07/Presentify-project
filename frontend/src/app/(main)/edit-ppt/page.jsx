'use client';
import { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function EditPPT() {
    const [pptList, setPptList] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/getall`)
            .then(res => res.json())
            .then(data => setPptList(data));
    }, []);

    const handleFileSelect = async (e) => {
        const filename = e.target.value;
        setSelectedFile(filename);
        
        if (filename) {
            // Create the preview URL for PDF
            const previewUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/ppt/preview/${filename}`;
            setPdfUrl(previewUrl);
            
            try {
                // Fetch slide data if you have an API endpoint for that
                // This will depend on your backend implementation
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/get-content/${filename}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.slides && Array.isArray(data.slides)) {
                        setFormData(data.slides);
                    } else {
                        // If no specific slide content API, initialize with empty slides
                        setFormData(Array(3).fill(''));
                    }
                } else {
                    // Initialize with empty slides if API fails
                    setFormData(Array(3).fill(''));
                }
            } catch (error) {
                console.error("Error fetching slide content:", error);
                setFormData(Array(3).fill(''));
            }
        } else {
            setPdfUrl('');
            setFormData([]);
        }
    };

    const handleChange = (index, value) => {
        const updated = [...formData];
        updated[index] = value;
        setFormData(updated);
    };

    const handleUpdate = async () => {
        setLoading(true);
        const payload = { filename: selectedFile, slides: formData };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/edit-ppt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();
            
            if (result.success) {
                // Refresh the PDF preview
                const timestamp = Date.now(); // Add timestamp to bust cache
                setPdfUrl(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/preview/${selectedFile}?t=${timestamp}`);
                alert(result.message);
            } else {
                alert(`Error: ${result.message || 'Failed to update presentation'}`);
            }
        } catch (error) {
            console.error("Error updating presentation:", error);
            alert("An error occurred while updating the presentation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">Edit Presentation</h1>

            <select
                className="w-full p-3 border border-gray-300 rounded mb-6"
                value={selectedFile}
                onChange={handleFileSelect}
            >
                <option value="">Select a presentation</option>
                {pptList.map(ppt => (
                    <option key={ppt._id} value={ppt.title.replace(/[^a-zA-Z0-9]/g, "_") + '_presentation.pptx'}>
                        {ppt.title}
                    </option>
                ))}
            </select>

            {selectedFile && (
                <div className="space-y-4 mb-6">
                    {[...Array(formData.length || 3)].map((_, i) => (
                        <textarea
                            key={i}
                            rows={4}
                            placeholder={`Edit slide ${i + 1} content...`}
                            className="w-full p-3 border border-gray-300 rounded"
                            value={formData[i] || ''}
                            onChange={e => handleChange(i, e.target.value)}
                        />
                    ))}
                </div>
            )}

            {selectedFile && (
                <div className="space-y-6">
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {loading ? 'Updating...' : 'Update Presentation'}
                    </button>

                    {pdfUrl && (
                        <div className="h-[500px] border border-gray-300 rounded">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                <Viewer fileUrl={pdfUrl} />
                            </Worker>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}