import { useState, useEffect, useRef, useCallback } from 'react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animatedRadius, setAnimatedRadius] = useState(30);
  const animationRef = useRef<number>();
  const lastUpdateTime = useRef(0);

  // Throttled mouse move handler for better performance
  const throttledMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateTime.current > 32) { // Reduced from 16 to 32ms (~30fps)
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

  // Optimized radius animation with requestAnimationFrame throttling
  useEffect(() => {
    const targetRadius = isHoveringText ? (isMobile ? 100 : 150) : (isMobile ? 30 : 50);
    let isAnimating = true;
    let frameCount = 0;
    
    const animateRadius = () => {
      if (!isAnimating) return;
      
      // Skip frames for better performance
      frameCount++;
      if (frameCount % 2 === 0) {
        animationRef.current = requestAnimationFrame(animateRadius);
        return;
      }
      
      setAnimatedRadius(current => {
        const diff = targetRadius - current;
        const step = diff * 0.12; // Slightly slower animation
        
        if (Math.abs(diff) < 1) {
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
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Top layer (normal content) */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <div 
            className="text-center"
            onMouseEnter={() => !isMobile && setIsHoveringText(true)}
            onMouseLeave={() => !isMobile && setIsHoveringText(false)}
            onTouchStart={() => isMobile && setIsHoveringText(true)}
            onTouchEnd={() => isMobile && setIsHoveringText(false)}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-black mb-2 md:mb-4 leading-tight">
              MAKING
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-black mb-2 md:mb-4 leading-tight">
              GOOD
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-black mb-2 md:mb-4 leading-tight">
              STUFF
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-black mb-2 md:mb-4 leading-tight">
              SINCE
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-black leading-tight">
              2023
            </h1>
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
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-white mb-2 md:mb-4 leading-tight">
                HIDING
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-white mb-2 md:mb-4 leading-tight">
                BAD
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-white mb-2 md:mb-4 leading-tight">
                STUFF
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-white mb-2 md:mb-4 leading-tight">
                SINCE
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-radon text-white leading-tight">
                2023
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;