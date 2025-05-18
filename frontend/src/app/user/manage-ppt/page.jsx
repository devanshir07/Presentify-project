'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function MyPresentations() {
    const [presentations, setPresentations] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchPresentations = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ppt/user/presentations`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    router.push('/login');
                    return;
                }

                const data = await response.json();
                if (data.success) {
                    setPresentations(data.presentations);
                }
            } catch (error) {
                console.error('Error fetching presentations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPresentations();
    }, []);

    const handleDownload = async (fileName) => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/ppt/download/${fileName}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 401) {
                localStorage.removeItem('token');
                router.push('/login');
                return;
            }

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error('Error downloading presentation:', error);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Presentations</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {presentations.map((ppt) => (
                        <motion.div
                            key={ppt._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{ppt.title}</h2>
                            <p className="text-gray-600 mb-4">{ppt.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>{new Date(ppt.createdAt).toLocaleDateString()}</span>
                                <span>{ppt.numberOfSlides} slides</span>
                            </div>
                            <div className="mt-4 flex space-x-3">
                                <button
                                    onClick={() => handleDownload(ppt.fileName)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Download
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {presentations.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <p>No presentations found. Create your first presentation!</p>
                    </div>
                )}
            </div>
        </div>
    );
}