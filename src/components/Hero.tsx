import { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Bottom layer (revealed by the circle) */}
      <div className="absolute inset-0 flex items-center justify-center bg-[var(--accent)]">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-black mb-4">HIDING</h1>
          <h1 className="text-8xl font-bold text-black mb-4">BAD</h1>
          <h1 className="text-8xl font-bold text-black mb-4">STUFF</h1>
          <h1 className="text-8xl font-bold text-black mb-4">SINCE</h1>
          <h1 className="text-8xl font-bold text-black">2023</h1>
        </div>
      </div>

      {/* Top layer with the circle reveal effect */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-[var(--surface)]"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, 
                       transparent 150px, 
                       black 151px)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, 
                           transparent 150px, 
                           black 151px)`,
        }}
      >
        <div className="text-center">
          <h1 className="text-8xl font-bold text-[var(--text-primary)] mb-4">MAKING</h1>
          <h1 className="text-8xl font-bold text-[var(--text-primary)] mb-4">GOOD</h1>
          <h1 className="text-8xl font-bold text-[var(--text-primary)] mb-4">STUFF</h1>
          <h1 className="text-8xl font-bold text-[var(--text-primary)] mb-4">SINCE</h1>
          <h1 className="text-8xl font-bold text-[var(--text-primary)]">2023</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;