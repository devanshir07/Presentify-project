'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Presentify Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <h3 className="text-2xl font-bold text-white">Presentify</h3>
            </div>
            <p className="text-gray-400">
              Revolutionizing presentations through AI-powered design and automation.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com/presentify" icon={<FaTwitter />} />
              <SocialLink href="https://linkedin.com/company/presentify" icon={<FaLinkedinIn />} />
              <SocialLink href="https://github.com/presentify" icon={<FaGithub />} />
              <SocialLink href="https://instagram.com/presentify" icon={<FaInstagram />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/features" text="Features" />
              <FooterLink href="/pricing" text="Pricing" />
              <FooterLink href="/templates" text="Templates" />
              <FooterLink href="/blog" text="Blog" />
              <FooterLink href="/about" text="About Us" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <FooterLink href="/help" text="Help Center" />
              <FooterLink href="/documentation" text="Documentation" />
              <FooterLink href="/contact" text="Contact Us" />
              <FooterLink href="/tutorials" text="Video Tutorials" />
              <FooterLink href="/faq" text="FAQ" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p>Email: support@presentify.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Innovation Street</p>
              <p>San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-2">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-gray-400">
                Stay updated with the latest features and releases.
              </p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Presentify. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialLink = ({ href, icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
    >
      {icon}
    </motion.a>
  );
};

const FooterLink = ({ href, text }) => {
  return (
    <li>
      <Link 
        href={href}
        className="text-gray-400 hover:text-white transition-colors"
      >
        {text}
      </Link>
    </li>
  );
};

export default Footer;