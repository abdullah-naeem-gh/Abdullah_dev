import { useState, useEffect } from 'react';

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Bottom Layer - Hidden Text */}
      <div className="absolute inset-0 flex items-center justify-center bg-red-500">
        <div className="text-center max-w-4xl px-6">
          <h2 className="text-2xl font-medium text-black mb-8">ABOUT ME</h2>
          <p className="text-6xl font-bold text-black leading-tight">
            I'm a selectively skilled product designer with strong focus on producing high quality & impactful digital experience.
          </p>
        </div>
      </div>

      {/* Top Layer with Circle Cut-out */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-black"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent, transparent 149px, black 150px)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent, transparent 149px, black 150px)`
        }}
      >
        <div className="text-center max-w-4xl px-6">
          <h2 className="text-2xl font-medium text-gray-400 mb-8">ABOUT ME</h2>
          <p className="text-6xl font-bold text-white leading-tight">
            I'm a selectively skilled product designer with strong focus on producing high quality & impactful digital experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;