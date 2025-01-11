import { ExternalLink, Github } from "lucide-react";
interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    demoUrl?: string;
    githubUrl?: string;
    imageUrl: string; // Add imageUrl prop
  }
  
  export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    tech,
    demoUrl,
    githubUrl,
    imageUrl,
  }) => {
    return (
      <div className="relative group overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <img src={imageUrl} alt={title} className="w-full h-auto" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-500 bg-opacity-20 rounded-full text-red-400 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <Github size={16} />
                <span>Code</span>
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <ExternalLink size={16} />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };