'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/contexts/AppContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useApp();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-[10] w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm dark:bg-neutral-800/95 dark:border-neutral-700">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="w-48">          
              <Link
              href="/"
              className="font-bold text-2xl text-black hover:text-gray-800 transition-colors duration-300"
              aria-label="Brand"
            >
              PRESENTIFY
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex md:items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              <Link
                href="/features"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700/50"
              >
                Features
              </Link>

              <Link
                href="../about"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700/50"
              >
                About
              </Link>
              
              <Link
                href="/templates"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700/50"
              >
                Templates
              </Link>

              <Link 
                href="/contact" 
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700/50"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Auth Buttons - Right */}
          <div className="hidden md:flex items-center space-x-3 w-48 justify-end">
            {user ? (    <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Logout
              </button>
            ) : (
              <>              
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4`}>
          <div className="flex flex-col space-y-2">
            <Link
              href="../about"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
            >
              About
            </Link>
            
            <Link
              href="/templates"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
            >
              Templates
            </Link>

            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors">
              Contact Us
            </Link>

            {user ? (
              <button               
               onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
              >
                Logout
              </button>
            ) : (
              <>              
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
                <Link                
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;