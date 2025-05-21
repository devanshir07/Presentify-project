'use client';
import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CreatePPT() {


    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    },[])

    const [formData, setFormData] = useState({
        topic: '',
        numberOfSlides: '',
        additionalInfo: '',
        theme: 'modern' // Default theme
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Add a timestamp state to force preview refresh
    const [previewTimestamp, setPreviewTimestamp] = useState(Date.now());

    const themeOptions = [
        { id: 'modern', name: 'Modern Minimal', description: 'Clean, minimal design with ample white space' },
        { id: 'corporate', name: 'Corporate Professional', description: 'Polished business style with traditional layouts' },
        { id: 'creative', name: 'Creative Bold', description: 'Vibrant, expressive design with bold colors' },
        { id: 'dark', name: 'Dark Mode', description: 'Sleek dark backgrounds with high contrast elements' },
        { id: 'nature', name: 'Nature Inspired', description: 'Organic design with earthy colors' },
        { id: 'techFuturistic', name: 'Tech Futuristic', description: 'Forward-looking design with digital aesthetics' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/create-ppt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setResult(data);
            
            // Set a new timestamp to force preview refresh
            setPreviewTimestamp(Date.now());
        } catch (error) {
            setResult({ success: false, message: 'Error creating PPT' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDownload = () => {
        if (result?.fileName) {
            window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/download/${result.fileName}`, '_blank');
        }
    };

    const refreshPreview = () => {
        setPreviewTimestamp(Date.now());
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
                    {/* Form */}
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
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Presentation Theme</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {themeOptions.map((theme) => (
                                        <div 
                                            key={theme.id}
                                            onClick={() => setFormData({...formData, theme: theme.id})}
                                            className={`relative cursor-pointer rounded-lg border p-4 ${
                                                formData.theme === theme.id 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="mb-2 h-16 w-24 overflow-hidden rounded border">
                                                    {/* You'd need to add actual theme preview images */}
                                                    <div className={`h-full w-full ${
                                                        theme.id === 'modern' ? 'bg-gradient-to-r from-gray-50 to-gray-100' :
                                                        theme.id === 'corporate' ? 'bg-gradient-to-r from-blue-900 to-blue-800' :
                                                        theme.id === 'creative' ? 'bg-gradient-to-r from-pink-500 to-orange-500' :
                                                        theme.id === 'dark' ? 'bg-gradient-to-r from-gray-900 to-gray-800' :
                                                        theme.id === 'nature' ? 'bg-gradient-to-r from-green-700 to-green-500' :
                                                        'bg-gradient-to-r from-blue-800 to-purple-800'
                                                    }`}></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">{theme.name}</span>
                                                <span className="text-xs text-gray-500">{theme.description}</span>
                                            </div>
                                            {formData.theme === theme.id && (
                                                <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
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

                    {/* Preview + Download */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Preview & Download</h3>

                        {!result && !loading && (
                            <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                                <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-lg">Your presentation preview will appear here</p>
                            </div>
                        )}

                        {result && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className={`p-6 rounded-xl ${result.success ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
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
                                            Download
                                        </motion.button>

                                        <div className="flex justify-end mb-2">
                                            <button 
                                                onClick={refreshPreview}
                                                className="flex items-center px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                Refresh Preview
                                            </button>
                                        </div>

                                        <div className="h-[500px] border border-gray-200 rounded-xl overflow-hidden">
                                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                                                <Viewer
                                                    fileUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/preview/${result.fileName}?t=${previewTimestamp}`}
                                                />
                                            </Worker>
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