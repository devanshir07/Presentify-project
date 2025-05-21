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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Enhanced animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-48 -left-48 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
                <div className="absolute top-0 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
                <div className="absolute -bottom-48 right-48 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000"></div>
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Page header with gradient text */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-5xl font-extrabold tracking-tight mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                            Presentify
                        </span>
                    </h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Create stunning presentations powered by AI in just seconds
                    </p>
                </motion.div>
                
                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Form */}
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                        <h2 className="text-3xl font-bold mb-2 text-gray-800">Design Your Presentation</h2>
                        <p className="text-gray-500 mb-8">Fill in the details and select a theme to generate your perfect slides</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Presentation Topic
                                    </span>
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        required
                                        className="pl-4 w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:shadow-md"
                                        placeholder="e.g., Artificial Intelligence in Healthcare"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                            </svg>
                                            Number of Slides
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="numberOfSlides"
                                            value={formData.numberOfSlides}
                                            onChange={handleChange}
                                            required
                                            min="1"
                                            max="50"
                                            className="pl-4 w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="5-15 recommended"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="Any specific content, tone, colors, etc."
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                        Presentation Theme
                                    </span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {themeOptions.map((theme) => (
                                        <motion.div
                                            key={theme.id}
                                            onClick={() => setFormData({...formData, theme: theme.id})}
                                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                            className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                                                formData.theme === theme.id 
                                                    ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                                                    : 'border-gray-200 hover:border-gray-300 hover:shadow'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="mb-2 h-20 w-28 overflow-hidden rounded-lg shadow-sm">
                                                    {/* Theme preview - more distinctive styling */}
                                                    <div className={`h-full w-full ${
                                                        theme.id === 'modern' ? 'bg-gradient-to-br from-gray-50 to-gray-200' :
                                                        theme.id === 'corporate' ? 'bg-gradient-to-r from-blue-800 to-blue-600' :
                                                        theme.id === 'creative' ? 'bg-gradient-to-br from-pink-500 to-orange-400' :
                                                        theme.id === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-700' :
                                                        theme.id === 'nature' ? 'bg-gradient-to-br from-green-600 to-green-400' :
                                                        'bg-gradient-to-br from-blue-700 to-purple-600'
                                                    }`}>
                                                        {/* Mock content for theme preview */}
                                                        <div className="w-full h-4 mt-2 mx-auto rounded">
                                                            <div className={`h-1 w-3/4 mx-auto rounded ${
                                                                theme.id === 'modern' || theme.id === 'corporate' ? 'bg-black/20' :
                                                                'bg-white/20'
                                                            }`}></div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className={`h-8 w-1 ml-2 ${
                                                                theme.id === 'modern' || theme.id === 'corporate' ? 'bg-black/20' :
                                                                'bg-white/20'
                                                            }`}></div>
                                                            <div className="ml-1 space-y-1">
                                                                <div className={`h-1 w-8 rounded ${
                                                                    theme.id === 'modern' || theme.id === 'corporate' ? 'bg-black/20' :
                                                                    'bg-white/20'
                                                                }`}></div>
                                                                <div className={`h-1 w-12 rounded ${
                                                                    theme.id === 'modern' || theme.id === 'corporate' ? 'bg-black/20' :
                                                                    'bg-white/20'
                                                                }`}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">{theme.name}</span>
                                                <span className="text-xs text-gray-500 text-center">{theme.description}</span>
                                            </div>
                                            {formData.theme === theme.id && (
                                                <motion.div 
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating your slides...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        Generate Presentation
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                )}
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                            </motion.button>
                        </form>
                    </div>

                    {/* Preview + Download */}
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Preview & Download</h3>
                        <p className="text-gray-500 mb-6">See your presentation before downloading</p>

                        {!result && !loading && (
                            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 bg-gray-50/50 rounded-xl border border-gray-100">
                                <svg className="w-20 h-20 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-lg">Your presentation will appear here</p>
                                <p className="text-sm mt-2 max-w-xs text-center text-gray-400">Fill the form and click "Generate Presentation" to start</p>
                            </div>
                        )}

                        {loading && (
                            <div className="flex flex-col items-center justify-center h-[400px] text-indigo-500 bg-indigo-50 rounded-xl border border-indigo-100">
                                <div className="w-20 h-20 mb-4">
                                    <svg className="animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <p className="text-lg font-medium">Creating your presentation</p>
                                <div className="mt-4 max-w-xs w-full bg-white rounded-full h-1.5">
                                    <div className="bg-indigo-500 h-1.5 rounded-full animate-pulse"></div>
                                </div>
                                <p className="text-sm mt-4 max-w-xs text-center">This may take up to a minute depending on complexity...</p>
                            </div>
                        )}

                        {result && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <div className={`p-6 rounded-xl ${
                                    result.success 
                                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100' 
                                        : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-100'
                                }`}>
                                    <div className="flex items-start">
                                        {result.success ? (
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </div>
                                        )}
                                        <div>
                                            <p className={`text-lg font-medium ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                                                {result.message}
                                            </p>
                                            {result.fileName && (
                                                <p className="text-sm text-gray-600 mt-1">Generated: {result.fileName}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {result.success && result.fileName && (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <motion.button
                                                onClick={handleDownload}
                                                whileHover={{ scale: 1.03, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                                whileTap={{ scale: 0.97 }}
                                                className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download Presentation
                                            </motion.button>

                                            <button 
                                                onClick={refreshPreview}
                                                className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                Refresh
                                            </button>
                                        </div>

                                        <div className="h-[500px] border border-gray-200 rounded-xl overflow-hidden shadow-md relative">
                                            {/* Remove or modify the overlay that's causing the scroll issue */}
                                            <div className="absolute top-0 left-0 right-0 bg-black/70 text-white px-3 py-2 text-sm text-center pointer-events-none">
                                                Scroll to view all slides
                                            </div>
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