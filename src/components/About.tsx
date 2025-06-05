import { useState, useEffect } from 'react';

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const circleRadius = isHoveringText ? (isMobile ? 100 : 150) : (isMobile ? 30 : 50);

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
            : `circle(${circleRadius}px at ${mousePos.x}px ${mousePos.y}px)`,
          transition: 'clip-path 0.3s ease-out'
        }}
      >
        {/* Bottom layer content (revealed through mask) */}
        <div className="absolute inset-0" style={{
          backgroundImage: "url('src/assets/background/image-modified.png')",
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