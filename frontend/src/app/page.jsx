import React from "react";
import Navbar from "./components/Navbar/page";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500">
      


      <Navbar/>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-white text-5xl font-bold mb-6">
          Turn your ideas into stunning presentation instantly.
        </h1>
        <p className="text-white text-lg mb-8">
        Create stunning, professional presentations in minutes. Powered by
        advanced AI technology.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 text-lg font-semibold rounded-lg shadow-md">
            Generate from prompt
          </button>
          <button className="bg-white text-indigo-600 hover:bg-indigo-700 px-6 py-3 text-lg font-semibold rounded-lg shadow-md">
            Import Document
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Slide Creation</h3>
              <p>Generate slides with minimal input and enjoy a seamless workflow.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Customizable Templates</h3>
              <p>Choose from a variety of themes to match your style.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Advanced Design Tools</h3>
              <p>Effortlessly add images, charts, and infographics.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-2">Export Options</h4>
              <p>Save presentations in multiple formats like PDF and PPTX.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h5 className="text-xl font-semibold mb-2">Animation & Transitions</h5>
              <p>Enhance your slides with smooth animations.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h6 className="text-xl font-semibold mb-2">Integration with Tools</h6>
              <p>Connect with external apps for enhanced functionality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Template 1" className="mb-4 rounded" />
              <h3 className="text-xl font-semibold">Business Proposal</h3>
              <p className="text-gray-700">Perfect for pitching ideas and strategies.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Template 2" className="mb-4 rounded" />
              <h3 className="text-xl font-semibold">Educational Deck</h3>
              <p className="text-gray-700">Ideal for lessons and workshops.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Template 3" className="mb-4 rounded" />
              <h3 className="text-xl font-semibold">Creative Portfolio</h3>
              <p className="text-gray-700">Showcase your projects and achievements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white text-gray-700 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Step 1</h3>
              <p>Input your topic and key points.</p>
            </div>
            <div className="p-6 bg-white text-gray-700 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Step 2</h3>
              <p>AI generates a tailored presentation instantly.</p>
            </div>
            <div className="p-6 bg-white text-gray-700 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Step 3</h3>
              <p>Customize and download your slides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-700 italic">"This tool saved me hours of work! Highly recommend."</p>
              <h4 className="text-indigo-600 font-bold mt-4">- Alex D.</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-700 italic">"Incredible results with minimal effort. Love it!"</p>
              <h4 className="text-indigo-600 font-bold mt-4">- Jamie K.</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-700 italic">"A game-changer for creating presentations on the go."</p>
              <h4 className="text-indigo-600 font-bold mt-4">- Taylor R.</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-indigo-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Presentation?</h2>
          <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 text-lg font-semibold rounded-lg shadow-md">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
