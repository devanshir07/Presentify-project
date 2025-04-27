'use client';
import { useState } from 'react';

export default function CreatePPT() {
    const [formData, setFormData] = useState({
        topic: '',
        numberOfSlides: '',
        additionalInfo: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/create-ppt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setResult(data);
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

    const handlePreview = () => {
        if (result?.fileName) {
            window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/preview/${result.fileName}`, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Presentation</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Topic
                        </label>
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Number of Slides
                        </label>
                        <input
                            type="number"
                            name="numberOfSlides"
                            value={formData.numberOfSlides}
                            onChange={handleChange}
                            required
                            min="1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Additional Requirements
                        </label>
                        <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Generate PPT'}
                    </button>
                </form>

                {result && (
                    <div className="mt-4 space-y-4">
                        <div className={`p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
                            <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                                {result.message}
                            </p>
                            {result.fileName && (
                                <p className="text-sm text-gray-600 mt-2">
                                    File created: {result.fileName}
                                </p>
                            )}
                        </div>
                        
                        {result.success && result.fileName && (
                            <div className="flex space-x-4">
                                <button
                                    onClick={handlePreview}
                                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Download
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}