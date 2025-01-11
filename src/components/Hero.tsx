import { Mail, MapPin, Phone } from "lucide-react";

// components/Hero.tsx
export const Hero: React.FC = () => {
    return (
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-red-500 to-red-800 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">AN</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Web Developer
          <span className="block text-red-500">& MLOps Engineer</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Bachelor of Science in Computer Science student at NUST, passionate about
          creating innovative solutions with modern web technologies and ML workflows.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>Islamabad, Pakistan</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <a href="mailto:n.abdullah.self@gmail.com" className="hover:text-white">
              n.abdullah.self@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>+92345-8452580</span>
          </div>
        </div>
      </div>
    );
  };