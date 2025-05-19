import { useState, useEffect } from 'react';
import Threads from './Threads';

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
    <div className="relative h-screen w-full overflow-hidden">
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
        
        {/* Content that sits on top */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center max-w-4xl px-6">
            <h2 className="text-2xl font-medium text-[var(--text-secondary)] mb-8">ABOUT ME</h2>
            <p className="text-6xl font-bold text-[var(--text-primary)] leading-tight">
              I'm a skilled AI web and app developer creating high-quality, impactful
              digital experiences.
            </p>
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
            <div className="text-center max-w-4xl px-6">
              <h2 className="text-2xl font-medium text-black mb-8">ABOUT ME</h2>
              <p className="text-6xl font-bold text-black leading-tight">
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