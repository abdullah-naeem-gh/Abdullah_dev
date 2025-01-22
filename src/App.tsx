import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import Hero from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const headerOpacity = useTransform(scrollXProgress, [0, 0.1], [1, 0.6]);

  useEffect(() => {
    const element = document.documentElement;
    const container = containerRef.current;
    
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        const multiplier = 2.5;
        container.scrollLeft += e.deltaY * multiplier;
      }
    };

    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
  }, []);

  const menuItems = [
    { title: 'About', section: 0 },
    { title: 'Experience', section: 1 },
    { title: 'Projects', section: 2 },
    { title: 'Skills', section: 3 }
  ];

  const scrollToSection = (section: number) => {
    if (containerRef.current) {
      const targetScroll = window.innerWidth * section;
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900">
      {/* Header */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-gray-900 to-transparent"
      >
        {/* Left side - Name and Social Links */}
        <div className="flex items-center gap-6">
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
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
            </motion.a>
          </div>
        </div>

        {/* Right side - Navigation Menu */}
        <nav>
          <ul className="flex gap-8">
            {menuItems.map((item) => (
              <motion.li key={item.title}>
                <motion.button
                  onClick={() => scrollToSection(item.section)}
                  className="text-gray-400 hover:text-white transition-colors relative px-2 py-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{item.title}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className="h-full overflow-x-scroll overflow-y-hidden"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex h-full">
          <div className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="w-full h-full flex items-center justify-center">
              <Hero />
            </div>
          </div>

          <div className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="w-full h-full flex items-center justify-center">
              <Experience />
            </div>
          </div>

          <div className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="w-full h-full flex items-center justify-center">
              <Projects />
            </div>
          </div>

          <div className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="w-full h-full flex items-center justify-center">
              <Skills />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-red-500 origin-left"
        style={{ scaleX: scrollXProgress }}
      />
    </div>
  );
};

export default App;