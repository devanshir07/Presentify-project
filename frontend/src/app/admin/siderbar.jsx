'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
    HiOutlineViewGrid, 
    HiOutlineUserGroup, 
    HiOutlineMail, 
    HiOutlineChatAlt2,
    HiOutlineLogout 
} from 'react-icons/hi';

const Sidebar = () => {
    const router = useRouter();
    const [isActive, setIsActive] = useState('dashboard');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <div className="h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white fixed left-0 top-0">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-8 border-b border-gray-700 pb-4">Admin Panel</h2>
                
                <nav className="space-y-4">
                    <Link 
                        href="/admin/dashboard"
                        className={`flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out
                            ${isActive === 'dashboard' ? 'bg-gray-700/70 shadow-lg' : ''}`}
                        onClick={() => setIsActive('dashboard')}
                    >
                        <HiOutlineViewGrid className="w-5 h-5 mr-3" />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link 
                        href="/admin/manage-user"
                        className={`flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out
                            ${isActive === 'manage-users' ? 'bg-gray-700/70 shadow-lg' : ''}`}
                        onClick={() => setIsActive('manage-users')}
                    >
                        <HiOutlineUserGroup className="w-5 h-5 mr-3" />
                        <span className="font-medium">Manage Users</span>
                    </Link>

                    <Link 
                        href="/admin/manage-contact"
                        className={`flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out
                            ${isActive === 'manage-contact' ? 'bg-gray-700/70 shadow-lg' : ''}`}
                        onClick={() => setIsActive('manage-contact')}
                    >
                        <HiOutlineMail className="w-5 h-5 mr-3" />
                        <span className="font-medium">Manage Contact</span>
                    </Link>

                    <Link 
                        href="/admin/manage-feedback"
                        className={`flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out
                            ${isActive === 'manage-feedback' ? 'bg-gray-700/70 shadow-lg' : ''}`}
                        onClick={() => setIsActive('manage-feedback')}
                    >
                        <HiOutlineChatAlt2 className="w-5 h-5 mr-3" />
                        <span className="font-medium">Manage Feedback</span>
                    </Link>

                    <div className="pt-6 mt-6 border-t border-gray-700">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center p-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 ease-in-out text-left"
                        >
                            <HiOutlineLogout className="w-5 h-5 mr-3" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;