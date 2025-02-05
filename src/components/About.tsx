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
      {/* Bottom Layer - Hidden Text */}
      <div className="absolute inset-0 flex items-center justify-center bg-[var(--accent)]">
        <div className="text-center max-w-4xl px-6">
          <h2 className="text-2xl font-medium text-black mb-8">ABOUT ME</h2>
          <p className="text-6xl font-bold text-black leading-tight">
            An AI developer creating innovative digital experiences—at least until
            AI decides it doesn’t need me anymore.
          </p>
        </div>
      </div>

      {/* Top Layer with Circle Cut-out */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-[var(--surface)]"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 150px, black 151px)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 150px, black 151px)`,
        }}
      >
        <div className="text-center max-w-4xl px-6">
          <h2 className="text-2xl font-medium text-[var(--text-secondary)] mb-8">
            ABOUT ME
          </h2>
          <p className="text-6xl font-bold text-[var(--text-primary)] leading-tight">
            I'm a skilled AI web and app developer creating high-quality, impactful
            digital experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;