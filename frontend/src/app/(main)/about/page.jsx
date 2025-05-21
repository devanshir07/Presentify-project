'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, SparklesIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative"
        >
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transforming Presentations
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Presentify, we're revolutionizing how the world creates and delivers presentations through the power of AI and intuitive design.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedTitle>Our Mission</AnimatedTitle>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              We believe that everyone deserves the ability to create stunning presentations that effectively communicate their ideas. Our mission is to democratize professional presentation design through innovative AI technology and user-friendly tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <StatCard number="500K+" label="Presentations Enhanced" />
              <StatCard number="200+" label="Countries Reached" />
              <StatCard number="98%" label="User Satisfaction" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedTitle>Our Core Values</AnimatedTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <ValueCard
              icon={<UserGroupIcon className="w-12 h-12 text-blue-600" />}
              title="User-Focused"
              description="Every feature we develop starts with our users' needs and challenges in mind."
            />
            <ValueCard
              icon={<ShieldCheckIcon className="w-12 h-12 text-blue-600" />}
              title="Quality First"
              description="We maintain the highest standards in AI technology and design capabilities."
            />
            <ValueCard
              icon={<SparklesIcon className="w-12 h-12 text-blue-600" />}
              title="Innovation"
              description="We continuously push the boundaries of what's possible in presentation technology."
            />
            <ValueCard
              icon={<RocketLaunchIcon className="w-12 h-12 text-blue-600" />}
              title="Empowerment"
              description="We empower users to create presentations that make lasting impressions."
            />
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedTitle>Our Technology</AnimatedTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advanced AI-Powered Presentation Technology
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-blue-600 mb-2">Smart Design Analysis</h4>
                  <p className="text-lg text-gray-600">
                    Our AI engine analyzes your slides for visual hierarchy, color harmony, and layout balance, 
                    providing real-time suggestions to enhance visual impact while maintaining brand consistency.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-blue-600 mb-2">Content Enhancement</h4>
                  <p className="text-lg text-gray-600">
                    Advanced NLP algorithms optimize your content flow, suggest impactful headlines, 
                    and ensure clear communication while maintaining your authentic message.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-blue-600 mb-2">Automated Visualization</h4>
                  <p className="text-lg text-gray-600">
                    Transform complex data into compelling visuals with our AI-powered chart recommendations 
                    and smart image suggestions that perfectly match your content.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-blue-600 mb-2">Adaptive Learning</h4>
                  <p className="text-lg text-gray-600">
                    Our platform continuously learns from user interactions, becoming more intelligent 
                    with each presentation while adapting to your personal style and industry best practices.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-video relative rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="/tech/ai-dashboard.jpg"
                alt="AI Technology Dashboard"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>      {/* Future Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedTitle>Our Vision for the Future</AnimatedTitle>
          <div className="max-w-6xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto"
            >
              We're pioneering the next generation of presentation technology, where AI and human creativity 
              work in perfect harmony to revolutionize how ideas are shared across the globe.
            </motion.p>
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <a href="../signup">
                Join Our Innovation Journey
                </a>
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Animated Components
const AnimatedTitle = ({ children }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-gray-900 mb-8 text-center"
    >
      {children}
    </motion.h2>
  );
};

// Stat Card Component
const StatCard = ({ number, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6"
    >
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-lg text-center"
    >
      <div className="mb-6 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ name, role, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-lg text-center"
    >
      <div className="w-32 h-32 relative mx-auto mb-6 rounded-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <h4 className="text-blue-600 font-medium mb-4">{role}</h4>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default AboutPage;