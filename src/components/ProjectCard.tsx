import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  githubUrl,
  demoUrl,
  imageUrl,
}) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden max-w-xs"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {imageUrl && (
        <div className="relative h-24 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-60"></div>
        </div>
      )}
      <div className="p-3">
        <h3 className="text-base font-bold text-white mb-1.5">{title}</h3>
        <p className="text-gray-300 mb-2 text-xs">{description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {tech.map((item, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs bg-gray-700 text-gray-300 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-300 hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4" />
            <span className="text-xs">Code</span>
          </motion.a>
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-xs">Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};