import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const headerOpacity = useTransform(scrollXProgress, [0, 0.1], [1, 0.6]);

  // Smooth horizontal scrolling with mouse wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollSpeed = 2; // Adjust for faster/slower scrolling
      container.scrollLeft += e.deltaY * scrollSpeed;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Section widths and layout configuration
  const sectionWidth = "100vw"; // Each section takes full viewport width
  const sectionStyle = `w-[${sectionWidth}] h-full flex items-center justify-center flex-shrink-0`;

  return (
    <div className="fixed inset-0 bg-gray-900">
      {/* Navigation Header */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-gray-900 to-transparent"
      >
        <motion.h1 
          className="text-2xl font-bold text-white"
          whileHover={{ scale: 1.05 }}
        >
          Abdullah Naeem
        </motion.h1>
        <div className="flex gap-4">
          <motion.a
            href="mailto:n.abdullah.self@gmail.com"
            className="text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
          </motion.a>
          <motion.a
            href="https://github.com/abdullah-naeem-gh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
        </div>
      </motion.header>

      {/* Main Horizontal Scroll Container */}
      <div 
        ref={containerRef}
        className="h-screen overflow-x-scroll overflow-y-hidden snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="flex h-full">
          {/* Hero Section */}
          <section className={`${sectionStyle} bg-gradient-to-br from-gray-900 to-gray-800 snap-start`}>
            <div className="w-full max-w-6xl px-8">
              <Hero />
            </div>
          </section>

          {/* Experience Section */}
          <section className={`${sectionStyle} bg-gradient-to-br from-gray-800 to-gray-900 snap-start`}>
            <div className="w-full max-w-6xl px-8">
              <Experience />
            </div>
          </section>

          {/* Projects Section */}
          <section className={`${sectionStyle} bg-gradient-to-br from-gray-900 to-gray-800 snap-start`}>
            <div className="w-full max-w-6xl px-8">
              <Projects />
            </div>
          </section>

          {/* Skills Section */}
          <section className={`${sectionStyle} bg-gradient-to-br from-gray-800 to-gray-900 snap-start`}>
            <div className="w-full max-w-6xl px-8">
              <Skills />
            </div>
          </section>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-red-500 origin-left"
        style={{ scaleX: scrollXProgress }}
      />

      {/* Section Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
        {['Home', 'Experience', 'Projects', 'Skills'].map((label, index) => (
          <motion.button
            key={index}
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                container.scrollTo({
                  left: index * window.innerWidth,
                  behavior: 'smooth'
                });
              }
            }}
            className="group relative flex items-center"
            whileHover={{ scale: 1.2 }}
          >
            <span className="absolute right-full mr-4 py-1 px-2 rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
              {label}
            </span>
            <motion.div
              className="w-3 h-3 rounded-full bg-gray-500 hover:bg-red-500 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default App;