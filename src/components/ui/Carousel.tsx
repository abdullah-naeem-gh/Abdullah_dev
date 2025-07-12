"use client";
import { ChevronRight } from "lucide-react";
import { useState, useRef, useId, useEffect } from "react";
import { motion } from "framer-motion";

interface ProjectSlideData {
  title: string;
  description: string;
  tech: string[];
  imageUrl?: string;
  githubUrl: string;
  demoUrl?: string;
  longDescription?: string;
}

interface SlideProps {
  slide: ProjectSlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  onViewProject: (project: ProjectSlideData) => void;
}

const Slide = ({ slide, index, current, handleSlideClick, onViewProject }: SlideProps) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(current === index);
  }, [current, index]);

  useEffect(() => {
    if (!isActive) return;

    let frameCount = 0;
    const animate = () => {
      if (!slideRef.current) return;
      
      // Skip frames for better performance
      frameCount++;
      if (frameCount % 2 === 0) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isActive]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isActive) return;
    
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = (event.clientX - (r.left + Math.floor(r.width / 2))) * 0.3; // Further reduced intensity
    yRef.current = (event.clientY - (r.top + Math.floor(r.height / 2))) * 0.3; // Further reduced intensity
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { title, description, tech, imageUrl, githubUrl } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <div
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white transition-all duration-300 ease-in-out w-[85vw] h-[60vh] sm:w-[70vw] sm:h-[55vh] md:w-[60vw] md:h-[50vh] lg:w-[50vmin] lg:h-[50vmin] cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: !isActive
            ? "scale(0.85) rotateX(8deg)"
            : "scale(1) rotateX(0deg)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Smoother transition
          transformOrigin: "bottom",
          willChange: isActive ? "transform" : "auto", // Optimize GPU usage
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform: isActive
              ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
              : "none",
            backfaceVisibility: "hidden", // Improve performance
            willChange: isActive ? "transform" : "auto",
          }}
        >
        {imageUrl && (
          <img
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
            style={{
              opacity: isActive ? 0.8 : 0.3,
            }}
            alt={title}
            src={imageUrl}
            loading="lazy" // Always lazy load for better performance
            decoding="async"
          />
        )}
        {isActive && (
          <div className="absolute inset-0 bg-black/40 transition-all duration-500" />
        )}
      </div>

      <article
        className={`relative p-3 sm:p-4 md:p-6 transition-opacity duration-500 ease-in-out z-10 ${
          isActive ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 text-white leading-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-3 sm:mb-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
            {tech.slice(0, 4).map((item, idx) => (
              <span
                key={idx}
                className="px-2 sm:px-3 py-1 text-xs bg-white/20 text-white rounded-full backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 flex-wrap isolate">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onViewProject(slide);
              }}
              className="px-3 sm:px-4 py-2 bg-white text-black rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 sm:px-4 py-2 bg-transparent border border-white text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition-colors relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Code
            </motion.a>
            {slide.demoUrl && (
              <motion.a
                href={slide.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
              </motion.a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

interface CarouselProps {
  slides: ProjectSlideData[];
  onViewProject: (project: ProjectSlideData) => void;
}

export function Carousel({ slides, onViewProject }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance required (in px)
  const minSwipeDistance = 50;

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextClick();
    } else if (isRightSwipe) {
      handlePreviousClick();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePreviousClick();
    } else if (e.key === 'ArrowRight') {
      handleNextClick();
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20"
      aria-labelledby={`carousel-heading-${id}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Previous Arrow */}
      <button
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black/80 backdrop-blur-sm border-2 border-white/30 rounded-full focus:outline-none hover:bg-black/90 hover:border-white/50 active:scale-95 transition duration-200 z-30 shadow-lg"
        title="Go to previous slide"
        onClick={handlePreviousClick}
      >
        <ChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rotate-180" />
      </button>

      {/* Next Arrow */}
      <button
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-black/80 backdrop-blur-sm border-2 border-white/30 rounded-full focus:outline-none hover:bg-black/90 hover:border-white/50 active:scale-95 transition duration-200 z-30 shadow-lg"
        title="Go to next slide"
        onClick={handleNextClick}
      >
        <ChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
      </button>

      <div className="relative w-[85vw] h-[60vh] sm:w-[70vw] sm:h-[55vh] md:w-[60vw] md:h-[50vh] lg:w-[50vmin] lg:h-[50vmin] mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
            width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center"
              style={{ width: `${100 / slides.length}%` }}
            >
              <Slide
                slide={slide}
                index={index}
                current={current}
                handleSlideClick={handleSlideClick}
                onViewProject={onViewProject}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicators - More visible on mobile */}
      <div className="flex justify-center mt-4 sm:mt-6 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              current === index
                ? 'bg-white shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
