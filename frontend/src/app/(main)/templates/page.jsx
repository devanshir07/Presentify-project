'use client';
import React from 'react';
import { motion } from 'framer-motion';

// Dummy data for PPT templates
const dummyTemplates = [
  {
    id: 1,
    title: 'Business Pitch',
    description: 'A clean and modern template for business presentations.',
    thumbnail: 'https://marketplace.canva.com/EAF9qSYV158/1/0/1600w/canva-neutral-beige-organic-beauty-start-up-pitch-deck-presentation-xY3ud29YBg8.jpg',
    category: 'Business',
  },
  {
    id: 2, 
    title: 'Educational',
    description: 'Bright and engaging slides for educational content.',
    thumbnail: 'https://media.istockphoto.com/id/1192263162/photo/abstract-blue-education-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=uVE60HDWeg-cCnVlv1JIBwX7EwCoTC9JlqdS93VQrao=',
    category: 'Education',
  },
  {
    id: 3,
    title: 'Minimalist',
    description: 'Simple, elegant, and distraction-free template.',
    thumbnail: 'https://stg-uploads.slidenest.com/template_412/templateColor_444/previewImages/modern-architecture-minimal-powerpoint-google-slides-keynote-presentation-template-1.jpeg',
    category: 'Design',
  },
  {
    id: 4,
    title: 'Creative Portfolio',
    description: 'Showcase your creative work with style.',
    thumbnail: 'https://marketplace.canva.com/EAFw0uuvpIY/3/0/1600w/canva-black-beige-modern-minimalist-photography-creative-portfolio-presentation-3u_OuUMCG_w.jpg',
    category: 'Creative',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Templates = () => {
  return (    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900 mb-4"
          >
            Choose Your Template
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Select from our professionally designed templates to create stunning presentations
          </motion.p>
        </div>

        {/* Templates Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {dummyTemplates.map((template) => (
            <motion.div
              key={template.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={template.thumbnail} 
                  alt={template.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    {template.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Use Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;