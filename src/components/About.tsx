
// components/About.tsx
export const About: React.FC = () => {
    return (
      <div className="text-center max-w-4xl mx-auto px-6">
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-red-500 to-red-800" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">John Doe</h1>
        <h2 className="text-2xl text-gray-400 mb-8">Full Stack Developer</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Passionate developer with a keen eye for design and a love for creating 
          seamless user experiences. Specialized in React, TypeScript, and modern web technologies.
        </p>
      </div>
    );
  };