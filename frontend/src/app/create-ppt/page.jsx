'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PptViewer from '@/components/PptViewer';

export default function CreatePPT() {
    const [formData, setFormData] = useState({
        topic: '',
        numberOfSlides: '5',
        additionalInfo: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('professional');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            // Validate form data
            if (!formData.topic || !formData.numberOfSlides) {
                throw new Error("Topic and number of slides are required");
            }

            console.log("Submitting form data:", formData);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/create-ppt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    template: selectedTemplate
                })
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);
            
            if (data.success) {
                setResult(data);
            } else {
                throw new Error(data.message || "Failed to create presentation");
            }
        } catch (error) {
            console.error("Error creating PPT:", error);
            setError(error.message || 'Failed to create presentation');
            setResult({ success: false, message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (result?.fileName) {
            const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/ppt/download/${result.fileName}?t=${Date.now()}`;
            console.log("Download URL:", downloadUrl);
            window.open(downloadUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-48 -left-48 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-48 -right-48 w-96 h-96 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-48 left-48 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-6xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Form Section */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Create Your Presentation</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Presentation Topic</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        required
                                        className="pl-4 w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your presentation topic"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Slides</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="numberOfSlides"
                                        value={formData.numberOfSlides}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="20"
                                        className="pl-4 w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="How many slides do you need?"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Any specific content, tone, colors, etc."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Presentation Template
                                </label>
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl"
                                >
                                    <option value="professional">Professional</option>
                                    <option value="creative">Creative</option>
                                    <option value="minimal">Minimal</option>
                                    <option value="dark">Dark Theme</option>
                                </select>
                            </div>
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Generating...' : 'Generate Presentation'}
                            </motion.button>
                        </form>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Preview & Edit</h3>

                        {loading && (
                            <div className="flex flex-col items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                                <p className="mt-4 text-gray-600">Generating your presentation...</p>
                            </div>
                        )}

                        {!result && !loading && (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-lg">Your presentation preview will appear here</p>
                            </div>
                        )}

                        {error && (
                            <div className="p-6 rounded-xl bg-red-50 border border-red-100">
                                <p className="text-lg text-red-700">{error}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Please try again or check if the OnlyOffice Document Server is running.
                                </p>
                            </div>
                        )}

                        {result && !loading && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                className="space-y-6"
                            >
                                <div className={`p-4 rounded-xl ${result.success ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                                    <p className={`text-lg ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                                        {result.message}
                                    </p>
                                    {result.fileName && (
                                        <p className="text-sm text-gray-600 mt-2">File name: {result.fileName}</p>
                                    )}
                                </div>

                                {result.success && result.fileName && (
                                    <div className="space-y-4">
                                        <motion.button
                                            onClick={handleDownload}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-3 px-6 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
                                        >
                                            Download Presentation
                                        </motion.button>
                                        
                                        <div className="border rounded-xl overflow-hidden">
                                            <PptViewer fileName={result.fileName} />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}