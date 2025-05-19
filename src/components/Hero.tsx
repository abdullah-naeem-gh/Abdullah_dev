import { useState, useEffect } from 'react';
import Threads from './Threads';

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
      {/* Top layer (normal content) */}
      <div className="absolute inset-0 bg-[var(--surface)] z-10">
        {/* Threads component for top layer */}
        <div className="absolute inset-0">
          <Threads 
            color={[0.9, 0.2, 0.2]} 
            amplitude={0.8} 
            distance={0.2}
            position="absolute"
            zIndex={1}
            enableMouseInteraction={true}
          />
        </div>
        
        {/* Main visible content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-8xl font-bold text-[var(--text-primary)] mb-4">MAKING</h1>
            <h1 className="text-8xl font-bold text-[var(--text-primary)] mb-4">GOOD</h1>
            <h1 className="text-8xl font-bold text-[var(--text-primary)] mb-4">STUFF</h1>
            <h1 className="text-8xl font-bold text-[var(--text-primary)] mb-4">SINCE</h1>
            <h1 className="text-8xl font-bold text-[var(--text-primary)]">2023</h1>
          </div>
        </div>
      </div>
      
      {/* Circle reveal cutout - position absolute on top of everything */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          clipPath: `circle(150px at ${mousePos.x}px ${mousePos.y}px)`,
        }}
      >
        {/* Bottom layer content (revealed through mask) */}
        <div className="absolute inset-0 bg-[var(--accent)]">
          {/* Threads component for bottom layer */}
          <Threads 
            color={[0, 0, 0]}  // Black threads for bottom layer
            amplitude={0.6} 
            distance={0.3}
            position="absolute"
            zIndex={1}
            enableMouseInteraction={true}
          />
          
          {/* Content that appears through the mask */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <h1 className="text-8xl font-bold text-black mb-4">HIDING</h1>
              <h1 className="text-8xl font-bold text-black mb-4">BAD</h1>
              <h1 className="text-8xl font-bold text-black mb-4">STUFF</h1>
              <h1 className="text-8xl font-bold text-black mb-4">SINCE</h1>
              <h1 className="text-8xl font-bold text-black">2023</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;