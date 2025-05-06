'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Sidebar = () => {
    const router = useRouter();

    const handleLogout = () => {
        try {
            // Clear the auth token
            localStorage.removeItem('token');
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Error logging out');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white border-r border-gray-200 w-64 fixed left-0 top-0">
            {/* Header/Logo Section */}
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
                <Link 
                    href="/dashboard" 
                    className="text-xl font-bold text-blue-600"
                >
                    Admin Panel
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-2">
                    <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
                    >
                        <svg 
                            className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                            />
                        </svg>
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link
                        href="/manage-user"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
                    >
                        <svg 
                            className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                            />
                        </svg>
                        <span className="font-medium">Manage Users</span>
                    </Link>
                </div>
            </nav>

            {/* Logout Section */}
            <div className="border-t border-gray-200 p-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors group"
                >
                    <svg 
                        className="w-5 h-5 mr-3 text-gray-500 group-hover:text-red-600" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                        />
                    </svg>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;