'use client';
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "/testimonials/sarah.jpg",
    content: "Presentify has transformed how we create presentations. The AI-powered features save us hours of work while maintaining professional quality.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Education Consultant",
    company: "EduTech Solutions",
    image: "/testimonials/michael.jpg",
    content: "As an educator, I love how quickly I can create engaging presentations. The templates are modern and the AI understands educational content perfectly.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    company: "InnovateLab",
    image: "/testimonials/emily.jpg",
    content: "The presentation quality is outstanding. We use Presentify for all our investor pitches now - it's that good!",
    rating: 5
  }
];

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-48 -right-48 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-48 left-48 w-96 h-96 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center py-32 px-4 relative overflow-hidden"
        >

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-800 text-6xl font-bold mb-6 leading-tight max-w-4xl"
          >
            Turn Your Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Stunning</span> Presentations Instantly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-xl mb-12 max-w-2xl"
          >
            Create professional presentations in minutes with our advanced AI technology.
            No design skills needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-6"
          >
            <Link href="../login">
              <Link href="../create-ppt">
                <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  Generate from Prompt
                </button>
              </Link>
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Powerful Features for Your Presentations
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Everything you need to create professional presentations quickly and easily
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Creation",
                  description: "Generate complete presentations from simple prompts with our advanced AI technology",
                  icon: "🤖"
                },
                {
                  title: "Smart Templates",
                  description: "Choose from hundreds of professionally designed templates that adapt to your content",
                  icon: "✨"
                },
                {
                  title: "Advanced Design Tools",
                  description: "Access powerful design features with an intuitive interface anyone can use",
                  icon: "🎨"
                },
                {
                  title: "Export Flexibility",
                  description: "Export your presentations in multiple formats including PowerPoint and PDF",
                  icon: "💾"
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-24 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold mb-4 text-gray-800"
              >
                Beautiful Templates for Every Need
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-lg max-w-2xl mx-auto"
              >
                Choose from our collection of professionally designed templates
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-20"
            >
              {[
                {
                  title: "Business Proposal",
                  description: "Perfect for pitching ideas and strategies. Create compelling business presentations that capture your audience's attention and drive results.",
                  image: "/templates/business.jpg",
                  color: "from-rose-300 to-pink-300",
                  direction: "md:flex-row"
                },
                {
                  title: "Creative Portfolio",
                  description: "Showcase your work with style. Perfect for designers, artists, and creative professionals looking to make a lasting impression.",
                  image: "/templates/creative.jpg",
                  color: "from-violet-300 to-purple-300",
                  direction: "md:flex-row-reverse"
                },
                {
                  title: "Education & Training",
                  description: "Engage your audience while teaching. Create interactive and informative presentations for educational purposes.",
                  image: "/templates/education.jpg",
                  color: "from-sky-300 to-indigo-300",
                  direction: "md:flex-row"
                }
              ].map((template, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col ${template.direction} items-center gap-8 group`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-r ${template.color} opacity-90 mix-blend-multiply`}></div>
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{template.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{template.description}</p>
                    <button className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:bg-white transition-all duration-200 group">
                      Use Template
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 px-4 relative overflow-hidden">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Loved by Thousands
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                See what our users have to say about their experience with Presentify
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-blue-600">
                          {testimonial.name[0]}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <blockquote>
                    <p className="text-gray-600 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </blockquote>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Join Thousands of Happy Users
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 px-4 bg-white/70 backdrop-blur-sm relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4"
              >
                How It Works
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold mb-4 text-gray-800"
              >
                Create Presentations in 3 Simple Steps
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-lg max-w-2xl mx-auto"
              >
                Our AI-powered platform makes it easy to create stunning presentations in minutes
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Steps Column */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {[
                  {
                    step: "1",
                    title: "Share Your Idea",
                    description: "Simply enter your topic or upload your content. Our AI understands your requirements instantly and processes your input in seconds.",
                    icon: "💡",
                    color: "from-blue-400 to-cyan-400"
                  },
                  {
                    step: "2",
                    title: "AI Magic Happens",
                    description: "Our advanced AI analyzes your content, generates professional slides, and arranges them in a compelling story structure.",
                    icon: "✨",
                    color: "from-purple-400 to-pink-400"
                  },
                  {
                    step: "3",
                    title: "Perfect & Present",
                    description: "Review your presentation, make quick adjustments if needed, and share it with your audience. Export in multiple formats including PowerPoint.",
                    icon: "🎯",
                    color: "from-teal-400 to-green-400"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-6 bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-blue-50/50 rounded-2xl transition-all duration-500"></div>
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                        {step.step}
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-3xl transform group-hover:scale-125 transition-transform duration-300">{step.icon}</span>
                        <h3 className="text-2xl font-semibold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Illustration Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square relative">
                  {/* Background decorative elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                  </div>

                  {/* Mock Presentation Interface */}
                  <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 cursor-pointer group">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                        <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Slide Content */}
                    <div className="space-y-6">
                      <div className="h-6 w-3/4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg transform group-hover:scale-95 transition-transform duration-300"></div>
                      <div className="h-4 w-1/2 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg transform group-hover:scale-95 transition-transform duration-300"></div>
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="h-24 bg-gradient-to-br from-blue-100 to-cyan-50 rounded-lg transform hover:scale-95 transition-transform duration-300 cursor-pointer shadow-sm hover:shadow-md"></div>
                        <div className="h-24 bg-gradient-to-br from-purple-100 to-pink-50 rounded-lg transform hover:scale-95 transition-transform duration-300 cursor-pointer shadow-sm hover:shadow-md"></div>
                        <div className="h-24 bg-gradient-to-br from-teal-100 to-green-50 rounded-lg transform hover:scale-95 transition-transform duration-300 cursor-pointer shadow-sm hover:shadow-md"></div>
                        <div className="h-24 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-lg transform hover:scale-95 transition-transform duration-300 cursor-pointer shadow-sm hover:shadow-md"></div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-4">
                      <div className="w-2 h-8 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                      <div className="w-2 h-8 rounded-full bg-gray-200"></div>
                      <div className="w-2 h-8 rounded-full bg-gray-200"></div>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="absolute -right-4 bottom-4 flex flex-col gap-3">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-gray-600 transform hover:-translate-x-2 transition-transform duration-300">
                      🎨 AI Design
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-gray-600 transform hover:-translate-x-2 transition-transform duration-300">
                      ⚡ Instant Generation
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-gray-600 transform hover:-translate-x-2 transition-transform duration-300">
                      📤 Easy Export
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};


export default LandingPage;
