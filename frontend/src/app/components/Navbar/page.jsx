'use client';
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
      <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="font-semibold text-xl text-black dark:text-white"
            aria-label="Brand"
          >
           PRESENTIFY
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden text-gray-800 dark:text-white"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={3} y1={6} x2={21} y2={6} />
                <line x1={3} y1={12} x2={21} y2={12} />
                <line x1={3} y1={18} x2={21} y2={18} />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-4`}
        >
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="p-2 text-sm text-gray-800 dark:text-white focus:outline-none"
            >
              Features
              <svg
                className="inline-block ml-1"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute bg-white border border-gray-200 shadow-lg rounded-lg mt-2 w-48 z-10 dark:bg-neutral-800">
                <ul>
                  <li className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                    AI-Powered Slide Creation
                  </li>
                  <li className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                    Customizable Templates
                  </li>
                  <li className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                    Advanced Design Tools
                  </li>
                  <li className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                    Export Options
                  </li>
                  <li className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                    Animation & Transitions
                  </li>
                  <li className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                    Integration with Tools
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link
            href="/pricing"
            className="p-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="p-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="p-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
