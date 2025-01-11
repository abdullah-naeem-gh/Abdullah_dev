/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Github, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 4;
  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      isScrolling = true;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      setCurrentSection(prev => {
        const next = prev + direction;
        return next >= 0 && next < totalSections ? next : prev;
      });

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 overflow-hidden">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-gray-900 to-transparent">
        <h1 className="text-2xl font-bold text-white">Abdullah Naeem</h1>
        <div className="flex gap-4">
          <a href="mailto:n.abdullah.self@gmail.com" className="text-gray-300 hover:text-white">
            <Mail size={20} />
          </a>
          <a href="https://github.com/abdullah-naeem-gh" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <Github size={20} />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-screen"
        style={{ transform: `translateX(-${currentSection * 100}%)` }}
      >
        {/* Hero Section */}
        <section className="min-w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800">
          <Hero />
        </section>

        {/* Experience Section */}
        <section className="min-w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-gray-800 to-gray-900">
          <Experience />
        </section>

        {/* Projects Section */}
        <section className="min-w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800">
          <Projects />
        </section>

        {/* Skills Section */}
        <section className="min-w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-gray-800 to-gray-900">
          <Skills />
        </section>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
        {['Home', 'Experience', 'Projects', 'Skills'].map((label, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`group relative flex items-center`}
          >
            <span className="absolute right-full mr-4 py-1 px-2 rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
              {label}
            </span>
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-red-500 scale-125' 
                  : 'bg-gray-500 hover:bg-red-400'
              }`}
              aria-label={`Go to ${label} section`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;