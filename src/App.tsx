import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GithubIcon, Mail, Menu, X, Moon, Sun } from 'lucide-react';
import Hero from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
// import { Skills } from './components/Skills';
import About from './components/About';
 

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollTime = useRef(0);
  const lastWheelTime = useRef(0);
  const lastKeyboardTime = useRef(0);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const headerOpacity = useTransform(scrollXProgress, [0, 0.1], [1, 0.6]);

  // Theme handling
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // Define sections
  const sections = [
    { title: 'Home', component: <Hero /> },
    { title: 'About', component: <About /> },
    { title: 'Experience', component: <Experience /> },
    { title: 'Projects', component: <Projects /> },
  ];

  // Define menu items to match with sections
  const menuItems = [
    { title: 'Home', section: 0 },
    { title: 'About', section: 1 },
    { title: 'Experience', section: 2 },
    { title: 'Projects', section: 3 },
  ];
  
  // Optimized scroll handling with throttling
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const now = Date.now();
    if (now - lastScrollTime.current < 32) return; // Throttle to ~30fps
    
    lastScrollTime.current = now;
    
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const sectionWidth = window.innerWidth;
    const newSection = Math.round(scrollLeft / sectionWidth);
    
    if (newSection !== currentSection && newSection >= 0 && newSection < sections.length) {
      setCurrentSection(newSection);
    }
  }, [currentSection, sections.length]);

  // Separate keyboard handler with less restrictions
  const handleKeyboardNavigation = useCallback((direction: number) => {
    if (!containerRef.current) return false;
    
    let nextSection = currentSection;
    if (direction > 0 && currentSection < sections.length - 1) {
      nextSection = currentSection + 1;
    } else if (direction < 0 && currentSection > 0) {
      nextSection = currentSection - 1;
    } else {
      return false;
    }
    
    setCurrentSection(nextSection);
    
    const targetScroll = window.innerWidth * nextSection;
    containerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
    
    return true;
  }, [currentSection, sections.length]);

  // Optimized section change with debouncing
  const handleSectionChange = useCallback((direction: number, inputType: 'keyboard' | 'wheel' | 'touch' = 'wheel') => {
    if (!containerRef.current) return false;
    
    const now = Date.now();
    // Different debouncing for different input types
    const debounceTime = inputType === 'keyboard' ? 100 : inputType === 'touch' ? 200 : 0; // No debounce for wheel
    
    // Only check isScrolling for touch events
    if (inputType === 'touch' && isScrolling) return false;
    
    if (debounceTime > 0 && now - lastScrollTime.current < debounceTime) return false;
    
    lastScrollTime.current = now;
    
    let nextSection = currentSection;
    if (direction > 0 && currentSection < sections.length - 1) {
      nextSection = currentSection + 1;
    } else if (direction < 0 && currentSection > 0) {
      nextSection = currentSection - 1;
    } else {
      return false;
    }
    
    if (inputType === 'touch') {
      setIsScrolling(true);
    }
    setCurrentSection(nextSection);
    
    const targetScroll = window.innerWidth * nextSection;
    containerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
    
    // Only set timeout for touch events
    if (inputType === 'touch') {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Reset scrolling flag
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    }
    
    return true;
  }, [currentSection, sections.length, isScrolling]);

  useEffect(() => {
    const element = document.documentElement;
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;

    // Add scroll listener with throttling
    const throttledScrollHandler = () => {
      if (!isScrolling) {
        handleScroll();
      }
    };
    
    container.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Handle touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? 1 : -1;
        handleSectionChange(direction, 'touch');
      }
    };

    // Optimized wheel handler with better performance and controlled scrolling
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 800) return; // Longer debounce to prevent multiple rapid scrolls
      
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      
      let direction = 0;
      
      // Increase sensitivity threshold to prevent accidental scrolls
      if (isHorizontalScroll) {
        direction = e.deltaX > 30 ? 1 : e.deltaX < -30 ? -1 : 0;
      } else if (isVerticalScroll) {
        direction = e.deltaY > 30 ? 1 : e.deltaY < -30 ? -1 : 0;
      }
      
      if (direction !== 0) {
        e.preventDefault();
        lastWheelTime.current = now;
        
        // Direct navigation with single section movement
        if (containerRef.current) {
          let nextSection = currentSection;
          if (direction > 0 && currentSection < sections.length - 1) {
            nextSection = currentSection + 1;
          } else if (direction < 0 && currentSection > 0) {
            nextSection = currentSection - 1;
          }
          
          if (nextSection !== currentSection) {
            setCurrentSection(nextSection);
            
            const targetScroll = window.innerWidth * nextSection;
            containerRef.current.scrollTo({
              left: targetScroll,
              behavior: 'smooth',
            });
          }
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      
      let direction = 0;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        direction = 1;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        direction = -1;
      }
      
      if (direction !== 0) {
        e.preventDefault();
        
        // Use dedicated keyboard navigation for better responsiveness
        const now = Date.now();
        if (now - lastKeyboardTime.current >= 150) { // Minimal debounce for keyboard
          lastKeyboardTime.current = now;
          handleKeyboardNavigation(direction);
        }
      }
    };

    // Prevent default scroll behavior for better control
    const preventDefaultScroll = (e: WheelEvent) => {
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      
      // Only prevent default for significant scroll movements
      if ((isHorizontalScroll && Math.abs(e.deltaX) > 30) || 
          (isVerticalScroll && Math.abs(e.deltaY) > 30)) {
        e.preventDefault();
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (container && !isScrolling) {
        const targetScroll = window.innerWidth * currentSection;
        container.scrollLeft = targetScroll;
      }
    };

    // Add event listeners with optimized options
    window.addEventListener('resize', handleResize, { passive: true });
    element.addEventListener('wheel', preventDefaultScroll, { passive: false });
    element.addEventListener('wheel', onWheel, { passive: false });
    element.addEventListener('keydown', onKeyDown, { passive: false });
    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      element.removeEventListener('wheel', preventDefaultScroll);
      element.removeEventListener('wheel', onWheel);
      element.removeEventListener('keydown', onKeyDown);
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('scroll', throttledScrollHandler);
      
      // Clear any pending timeouts
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSection, sections.length, handleScroll, handleSectionChange, handleKeyboardNavigation, isScrolling]);

  const scrollToSection = (section: number) => {
    if (containerRef.current && section >= 0 && section < sections.length) {
      const targetScroll = window.innerWidth * section;
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
      setCurrentSection(section);
      setIsMobileMenuOpen(false); // Close mobile menu when navigating
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      

      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-6 flex justify-between items-center bg-gradient-to-b from-background to-transparent"
      >
        {/* Left side - Name and Social Links */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
          <motion.h1
            className="text-base sm:text-lg md:text-2xl font-bold text-black"
            whileHover={{ scale: 1.05 }}
          >
            <span className="hidden sm:inline">Abdullah Naeem</span>
            <span className="sm:hidden">A.N</span>
          </motion.h1>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <motion.a
              href="mailto:n.abdullah.self@gmail.com"
              className="text-gray-700 hover:text-black transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={18} />
            </motion.a>
            <motion.a
              href="https://github.com/abdullah-naeem-gh"
              className="text-gray-700 hover:text-black transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <GithubIcon size={18} />
            </motion.a>
            <motion.button
              onClick={toggleTheme}
              className="text-gray-700 hover:text-black transition-colors p-1.5 rounded-md hover:bg-gray-100"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-4 lg:gap-8">
            {menuItems.map((item) => (
              <motion.li key={item.title}>
                <motion.button
                  onClick={() => scrollToSection(item.section)}
                  className={`${currentSection === item.section ? 'text-black' : 'text-gray-600'} hover:text-black transition-colors relative px-2 py-1 text-sm lg:text-base`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{item.title}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 origin-left"
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

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-black p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </motion.button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute top-0 right-0 h-full w-full max-w-xs bg-white shadow-lg p-4 pt-14 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile menu header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-black">Navigation</h3>
              <motion.button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} className="text-gray-600" />
              </motion.button>
            </div>
            
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <motion.li key={item.title}>
                  <motion.button
                    onClick={() => scrollToSection(item.section)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      currentSection === item.section 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-black hover:text-red-500 hover:bg-gray-50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.title}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
            
            {/* Mobile menu footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4">
                <motion.a
                  href="mailto:n.abdullah.self@gmail.com"
                  className="text-gray-600 hover:text-red-500 transition-colors p-2 rounded-md hover:bg-gray-100"
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                </motion.a>
                <motion.a
                  href="https://github.com/abdullah-naeem-gh"
                  className="text-gray-600 hover:text-red-500 transition-colors p-2 rounded-md hover:bg-gray-100"
                  whileTap={{ scale: 0.95 }}
                >
                  <GithubIcon size={20} />
                </motion.a>
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
      
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
          {sections.map((section) => (
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
        className="fixed bottom-0 left-0 right-0 h-1 bg-red-500 origin-left z-20"
        style={{ scaleX: scrollXProgress }}
      />
      
      {/* Navigation Dots */}
      <div className="fixed bottom-3 sm:bottom-4 md:bottom-8 left-0 right-0 z-50 flex justify-center gap-1.5 sm:gap-2 md:gap-4">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              currentSection === i
                ? 'bg-red-500 w-4 sm:w-5 md:w-8' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>

      
    </div>
  );
};

export default App;