import { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Bottom Layer - Different Text */}
      <div className="absolute inset-0 flex items-center justify-center bg-red-500">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-black mb-2">HIDING</h1>
          <h1 className="text-8xl font-bold text-black mb-2">BAD</h1>
          <h1 className="text-8xl font-bold text-black mb-2">STUFF</h1>
          <h1 className="text-8xl font-bold text-black mb-2">SINCE</h1>
          <h1 className="text-8xl font-bold text-black">2023</h1>
        </div>
      </div>

      {/* Top Layer with Circle Cut-out */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent, transparent 149px, black 150px)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent, transparent 149px, black 150px)`
        }}
      >
        <div className="text-center">
          <h1 className="text-8xl font-bold text-white mb-2">MAKING</h1>
          <h1 className="text-8xl font-bold text-white mb-2">GOOD</h1>
          <h1 className="text-8xl font-bold text-white mb-2">STUFF</h1>
          <h1 className="text-8xl font-bold text-white mb-2">SINCE</h1>
          <h1 className="text-8xl font-bold text-white">2023</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;