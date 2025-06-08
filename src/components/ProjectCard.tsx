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
  isModalOpen: boolean;
  onClose: () => void;
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
  isModalOpen,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Merge main image with additionalImages (if any)
  const allImages = [imageUrl, ...(additionalImages || [])].filter(Boolean) as string[];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 pr-2">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              {duration && (
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Duration: {duration}
                </p>
              )}
              {role && (
                <p className="text-sm sm:text-base text-gray-600">Role: {role}</p>
              )}
              {team && (
                <p className="text-sm sm:text-base text-gray-600">Team: {team}</p>
              )}
            </div>

            {/* Image Gallery */}
            {allImages.length > 0 && (
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-100">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${title} - image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-1.5 sm:p-2 rounded-full text-white hover:bg-opacity-75"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-1.5 sm:p-2 rounded-full text-white hover:bg-opacity-75"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                    {/* Dots below for indicating current image */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full ${
                            currentImageIndex === index
                              ? 'bg-white'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Overview
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {longDescription || description}
                </p>
              </div>

              {/* Technologies Used */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              {features.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Key Features
                  </h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges & Solutions */}
              {challenges.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Challenges &amp; Solutions
                  </h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                    {challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Implementation Details */}
              {implementation && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Implementation Details
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{implementation}</p>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-red-500 transition-colors py-2 sm:py-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">View Code</span>
                </motion.a>
                {demoUrl && (
                  <motion.a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-red-500 transition-colors py-2 sm:py-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Live Demo</span>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectCard;