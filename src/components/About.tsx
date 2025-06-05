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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top layer (normal content) - make background transparent */}
      <div className="absolute inset-0 z-10">
        {/* Content that sits on top */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center max-w-4xl px-6">
            <h2 className="text-2xl font-medium text-[var(--text-secondary)] mb-8">ABOUT ME</h2>
            <p className="text-6xl font-bold font-radon text-[var(--text-primary)] leading-tight">
              I'm a skilled AI web and app developer creating high-quality, impactful
              digital experiences.
            </p>
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
          backgroundImage: "url('src/assets/background/image-modified.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          {/* Content that appears through the mask */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center max-w-4xl px-6">
              <h2 className="text-2xl font-medium text-white mb-8">ABOUT ME</h2>
              <p className="text-6xl font-bold font-radon text-white leading-tight">
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