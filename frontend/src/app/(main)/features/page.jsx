'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaLayerGroup, FaPalette, FaFileExport } from 'react-icons/fa';

const FeaturePage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 1,
      title: 'AI-Powered Slides',
      icon: <FaRobot className="w-12 h-12 text-indigo-600" />,
      description: 'Transform your ideas into professional presentations with our advanced AI technology.',
      subFeatures: [
        {
          title: 'Smart Content Generation',
          description: 'Our AI analyzes your input and generates relevant content, including headlines, bullet points, and summaries.'
        },
        {
          title: 'Automatic Layout Optimization',
          description: 'AI suggests the best layout for your content, ensuring perfect visual hierarchy and readability.'
        },
        {
          title: 'Smart Image Suggestions',
          description: 'Get AI-powered image recommendations that match your content and enhance your message.'
        },
        {
          title: 'Content Enhancement',
          description: 'AI helps improve your text with grammar checks, tone adjustment, and style recommendations.'
        }
      ]
    },
    {
      id: 2,
      title: 'Professional Templates',
      icon: <FaLayerGroup className="w-12 h-12 text-indigo-600" />,
      description: 'Choose from our vast collection of professionally designed templates for any presentation need.',
      subFeatures: [
        {
          title: 'Industry-Specific Templates',
          description: 'Access templates tailored for business, education, marketing, and more.'
        },
        {
          title: 'Customizable Designs',
          description: 'Easily modify templates to match your brand colors, fonts, and style preferences.'
        },
        {
          title: 'Regular Updates',
          description: 'New templates added regularly to keep your presentations fresh and modern.'
        },
        {
          title: 'Template Categories',
          description: 'Organized categories make it easy to find the perfect template for your needs.'
        }
      ]
    },
    {
      id: 3,
      title: 'Advanced Design Tools',
      icon: <FaPalette className="w-12 h-12 text-indigo-600" />,
      description: 'Fine-tune every aspect of your presentation with our comprehensive design toolkit.',
      subFeatures: [
        {
          title: 'Rich Media Integration',
          description: 'Easily embed videos, animations, charts, and interactive elements.'
        },
        {
          title: 'Advanced Typography',
          description: 'Access premium fonts and advanced text styling options for perfect typography.'
        },
        {
          title: 'Smart Guides & Alignment',
          description: 'Precise alignment tools ensure professional-looking slides every time.'
        },
        {
          title: 'Custom Animations',
          description: 'Create engaging transitions and animations to bring your slides to life.'
        }
      ]
    },
    {
      id: 4,
      title: 'Export Options',
      icon: <FaFileExport className="w-12 h-12 text-indigo-600" />,
      description: 'Share your presentations in various formats to reach your audience effectively.',
      subFeatures: [
        {
          title: 'Multiple Format Support',
          description: 'Export to PPTX, PDF, HTML, and other popular formats.'
        },
        {
          title: 'Cloud Integration',
          description: 'Direct export to cloud services like Google Drive, Dropbox, and OneDrive.'
        },
        {
          title: 'Presentation Mode',
          description: 'Present directly from the browser with presenter notes and timing tools.'
        },
        {
          title: 'Offline Access',
          description: 'Download presentations for offline use and backup.'
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how Presentify helps you create stunning presentations with AI-powered tools, professional templates, and advanced design features.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredFeature(feature.id)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100"
            >
              <div className="mb-8 relative">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="inline-block"
                >
                  {React.cloneElement(feature.icon, {
                    className: `w-16 h-16 ${hoveredFeature === feature.id ? 'text-indigo-500' : 'text-indigo-600'}`
                  })}
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-3">{feature.title}</h2>
                <p className="text-lg text-gray-600">{feature.description}</p>
              </div>

              <div className="space-y-6">
                {feature.subFeatures.map((subFeature, subIndex) => (
                  <motion.div
                    key={subIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (subIndex * 0.1) }}
                    className="transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {subFeature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {subFeature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-xl font-semibold text-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started with Presentify
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturePage;