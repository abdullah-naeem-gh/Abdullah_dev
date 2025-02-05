import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  longDescription?: string;
  additionalImages?: string[];
  features?: string[];
  challenges?: string[];
  implementation?: string;
  duration?: string;
  role?: string;
  team?: string;
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
  features = [],
  challenges = [],
  implementation,
  duration,
  role,
  team,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [imageUrl, ...(additionalImages || [])].filter(Boolean) as string[];

  const handleCardClick = () => {
    setIsModalOpen(true);
    setCurrentImageIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
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
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-bold text-white">{title}</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {duration && <p className="text-gray-400 mt-2">Duration: {duration}</p>}
                {role && <p className="text-gray-400">Role: {role}</p>}
                {team && <p className="text-gray-400">Team: {team}</p>}
              </div>

              {/* Image Gallery */}
              {allImages.length > 0 && (
                <div className="relative h-96 bg-gray-900">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${title} - image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full ${
                              currentImageIndex === index ? 'bg-white' : 'bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
                  <p className="text-gray-300">{longDescription || description}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                {features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Key Features</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Challenges */}
                {challenges.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Challenges & Solutions</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Implementation Details */}
                {implementation && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Implementation Details</h3>
                    <p className="text-gray-300">{implementation}</p>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 pt-4">
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;