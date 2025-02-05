import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  longDescription?: string;
  additionalImages?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  githubUrl,
  demoUrl,
  imageUrl,
  longDescription,
  additionalImages = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        onClick={handleCardClick}
        className="bg-gray-800 rounded-lg overflow-hidden max-w-xs cursor-pointer"
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
              onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-gray-300 mb-4">{longDescription || description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {additionalImages && additionalImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {additionalImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${title} screenshot ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                  <span>View Code</span>
                </motion.a>
                {demoUrl && (
                  <motion.a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;