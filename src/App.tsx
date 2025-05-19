import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GithubIcon, Mail } from 'lucide-react'; // Changed from Github to GithubIcon
import Hero from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
// import { Skills } from './components/Skills';
import About from './components/About';
import Threads from './components/Threads';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const headerOpacity = useTransform(scrollXProgress, [0, 0.1], [1, 0.6]);

  // Define sections
  const sections = [
    { title: 'Home', component: <Hero /> },
    { title: 'About', component: <About /> },
    { title: 'Experience', component: <Experience /> },
    { title: 'Projects', component: <Projects /> },
    // Uncomment if you want to add Skills back
    // { title: 'Skills', component: <Skills /> },
  ];

  // Define menu items to match with sections
  const menuItems = [
    { title: 'Home', section: 0 },
    { title: 'About', section: 1 },
    { title: 'Experience', section: 2 },
    { title: 'Projects', section: 3 },
    // { title: 'Skills', section: 4 },
  ];
  
  useEffect(() => {
    const element = document.documentElement;
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let lastScrollTime = Date.now();

    // Track scroll position for mouse interaction with threads
    const handleScroll = () => {
      // Previously setting the unused scrollX state; this is now a no-op
      // Can be removed entirely or used for something else later
    };
    
    container.addEventListener('scroll', handleScroll);

    const handleSectionChange = (direction: number) => {
      // Don't process if we're already animating
      if (isScrolling) return false;
      
      // Don't process if we've scrolled too recently
      const now = Date.now();
      if (now - lastScrollTime < 500) return false;
      
      lastScrollTime = now;
      
      // Calculate next section
      let nextSection = currentSection;
      if (direction > 0 && currentSection < sections.length - 1) {
        nextSection = currentSection + 1;
      } else if (direction < 0 && currentSection > 0) {
        nextSection = currentSection - 1;
      } else {
        // Already at first or last section
        return false;
      }
      
      // Set flag to prevent multiple scroll events
      isScrolling = true;
      
      // Update state and scroll to the section
      setCurrentSection(nextSection);
      const targetScroll = window.innerWidth * nextSection;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
      
      // Reset flag after animation completes
      setTimeout(() => {
        isScrolling = false;
      }, 1200);
      
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Determine scroll direction with a lower threshold
      const direction = e.deltaY > 10 ? 1 : e.deltaY < -10 ? -1 : 0;
      if (direction === 0) return;
      
      handleSectionChange(direction);
    };

    // Handle keyboard navigation
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleSectionChange(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handleSectionChange(-1);
      }
    };

    // Prevent default scrolling behavior
    const preventDefaultScroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
      }
    };

    // Add event listeners
    element.addEventListener('wheel', preventDefaultScroll, { passive: false });
    element.addEventListener('wheel', onWheel, { passive: false });
    element.addEventListener('keydown', onKeyDown);

    // Clean up
    return () => {
      element.removeEventListener('wheel', preventDefaultScroll);
      element.removeEventListener('wheel', onWheel);
      element.removeEventListener('keydown', onKeyDown);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection, sections.length]);

  // Update scrollToSection to use the same logic for consistency
  const scrollToSection = (section: number) => {
    if (containerRef.current) {
      const targetScroll = window.innerWidth * section;
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
      setCurrentSection(section);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      {/* Single global Threads background for non-Hero/About sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Only show global Threads for sections other than Hero and About */}
        {currentSection !== 0 && currentSection !== 1 && (
          <Threads 
            color={[0.9, 0.2, 0.2]} 
            amplitude={0.8} 
            distance={0.2} 
            enableMouseInteraction={true}
          />
        )}
      </div>

      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-background to-transparent"
      >
        {/* Left side - Name and Social Links */}
        <div className="flex items-center gap-6">
          <motion.h1
            className="text-2xl font-bold text-text-primary"
            whileHover={{ scale: 1.05 }}
          >
            Abdullah Naeem
          </motion.h1>
          <div className="flex gap-4">
            <motion.a
              href="mailto:n.abdullah.self@gmail.com"
              className="text-text-secondary hover:text-text-primary transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
            </motion.a>
            <motion.a
              href="https://github.com/abdullah-naeem-gh"
              className="text-text-secondary hover:text-text-primary transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <GithubIcon size={20} /> {/* Changed from Github to GithubIcon */}
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
                  className={`text-${currentSection === item.section ? 'text-primary' : 'text-muted'} hover:text-text-primary transition-colors relative px-2 py-1`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{item.title}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: currentSection === item.section ? 1 : 0 }}
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
        className="h-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory relative z-10"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex h-full">
          {sections.map((section) => ( // Removed unused index parameter
            <div 
              key={section.title}
              className="w-screen h-full flex-shrink-0 snap-center bg-transparent"
            >
              <div className="w-full h-full flex items-center justify-center">
                {section.component}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-accent origin-left z-20"
        style={{ scaleX: scrollXProgress }}
      />
      
      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center gap-4">
        {sections.map((_, i) => ( // Changed index to i and using it
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === i
                ? 'bg-accent w-8' 
                : 'bg-text-muted hover:bg-text-secondary'
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;