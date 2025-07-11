import { useState, useEffect, useRef, useCallback } from 'react';

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animatedRadius, setAnimatedRadius] = useState(30);
  const animationRef = useRef<number>();
  const lastUpdateTime = useRef(0);

  // Throttled mouse move handler
  const throttledMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateTime.current > 32) { // 30fps
      setMousePos({ x: e.clientX, y: e.clientY });
      lastUpdateTime.current = now;
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!isMobile) {
      window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    }
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, throttledMouseMove]);

  // Smooth radius animation
  useEffect(() => {
    const targetRadius = isHoveringText ? (isMobile ? 100 : 150) : (isMobile ? 30 : 50);
    let isAnimating = true;
    
    const animateRadius = () => {
      if (!isAnimating) return;
      
      // Run animation every frame for smoother circle transitions
      setAnimatedRadius(current => {
        const diff = targetRadius - current;
        const step = diff * 0.15; // Faster animation speed
        
        if (Math.abs(diff) < 0.5) {
          isAnimating = false;
          return targetRadius;
        }
        
        if (isAnimating) {
          animationRef.current = requestAnimationFrame(animateRadius);
        }
        return current + step;
      });
    };
    
    animationRef.current = requestAnimationFrame(animateRadius);
    
    return () => {
      isAnimating = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHoveringText, isMobile]);

  const circleRadius = Math.round(animatedRadius);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top layer (normal content) */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div 
            className="text-center max-w-5xl px-4 md:px-6"
            onMouseEnter={() => !isMobile && setIsHoveringText(true)}
            onMouseLeave={() => !isMobile && setIsHoveringText(false)}
            onTouchStart={() => isMobile && setIsHoveringText(true)}
            onTouchEnd={() => isMobile && setIsHoveringText(false)}
          >
            <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-4 md:mb-8">
              ABOUT ME
            </h2>
            <p className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-radon text-black leading-tight">
              I'm a skilled AI web and app developer creating high-quality, impactful
              digital experiences.
            </p>
          </div>
        </div>
      </div>
      
      {/* Circle reveal cutout */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          clipPath: isMobile 
            ? `circle(${circleRadius}px at 50% 50%)` 
            : `circle(${circleRadius}px at ${mousePos.x}px ${mousePos.y}px)`
        }}
      >
        {/* Bottom layer content (revealed through mask) */}
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/image-modified.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center max-w-5xl px-4 md:px-6">
              <h2 className="text-xl md:text-2xl font-medium text-white mb-4 md:mb-8">
                ABOUT ME
              </h2>
              <p className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-radon text-white leading-tight">
                An AI developer creating innovative digital experiences—at least until
                AI decides it doesn't need me anymore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;