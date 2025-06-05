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
      {/* Top layer (normal content) - make background transparent */}
      <div className="absolute inset-0 z-10">
        {/* Main visible content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-8xl font-bold font-radon text-[var(--text-primary)] mb-4">MAKING</h1>
            <h1 className="text-8xl font-bold font-radon text-[var(--text-primary)] mb-4">GOOD</h1>
            <h1 className="text-8xl font-bold font-radon text-[var(--text-primary)] mb-4">STUFF</h1>
            <h1 className="text-8xl font-bold font-radon text-[var(--text-primary)] mb-4">SINCE</h1>
            <h1 className="text-8xl font-bold font-radon text-[var(--text-primary)]">2023</h1>
          </div>
        </div>
      </div>
      
      {/* Circle reveal cutout - position absolute on top of everything */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          clipPath: `circle(150px at ${mousePos.x}px ${mousePos.y}px)`,
        }}
      >
        {/* Bottom layer content (revealed through mask) */}
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/src/assets/background/image-modified.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          {/* Content that appears through the mask */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <h1 className="text-8xl font-bold font-radon text-white mb-4">HIDING</h1>
              <h1 className="text-8xl font-bold font-radon text-white mb-4">BAD</h1>
              <h1 className="text-8xl font-bold font-radon text-white mb-4">STUFF</h1>
              <h1 className="text-8xl font-bold font-radon text-white mb-4">SINCE</h1>
              <h1 className="text-8xl font-bold font-radon text-white">2023</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;