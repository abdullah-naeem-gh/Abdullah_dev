import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Filter } from "lucide-react";

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Responsive projects per page
  const getProjectsPerPage = () => {
    if (window.innerWidth < 640) return 1; // Mobile: 1 project
    if (window.innerWidth < 1024) return 2; // Tablet: 2 projects
    return 3; // Desktop: 3 projects
  };
  
  const [projectsPerPage, setProjectsPerPage] = useState(getProjectsPerPage());

  React.useEffect(() => {
    const handleResize = () => {
      setProjectsPerPage(getProjectsPerPage());
      setCurrentPage(0); // Reset to first page on resize
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      title: "Stable Diffusion Dashboard",
      description:
        "A dashboard for generating images using Stable Diffusion, deployed via Docker on Runpod Serverless.",
      longDescription:
        "A comprehensive dashboard that leverages Stable Diffusion for AI image generation. The system is containerized using Docker and deployed on Runpod's serverless infrastructure for optimal performance and scalability.",
      tech: ["Docker", "Node.js", "Express.js", "EJS", "Runpod"],
      categories: ["Web Dev"],
      githubUrl: "https://github.com/abdullah-naeem-gh/SD-dashboard",
      imageUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    },
    {
      title: "Image-Based Search Engine",
      description: "A search engine utilizing vector embeddings for image similarity search.",
      longDescription:
        "An advanced search engine that uses vector embeddings to enable image similarity search. Built with the MERN stack and integrated with vector databases for efficient similarity matching.",
      tech: ["MERN Stack", "Vector DB", "GCP", "MySQL"],
      categories: ["Web Dev"],
      githubUrl: "https://github.com/abdullah-naeem-gh/image_Searc",
      imageUrl:
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2072",
    },
    {
      title: "The Annoying Traps",
      description: "A vertical game where players navigate past obstacles using mouse controls.",
      longDescription:
        "A challenging vertical scrolling game built with Pygame. Players must use precise mouse controls to navigate through increasingly difficult obstacles while avoiding traps.",
      tech: ["Python", "Pygame", "Collision Detection"],
      categories: ["Games"],
      githubUrl: "https://github.com/abdullah-naeem-gh/the-annoying-traps",
      imageUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070",
    },
    {
      title: "Stronghold Reckoning",
      description:
        "A 2D tower defense game that combines strategic gameplay, resource management, and advanced algorithms.",
      longDescription:
        "A complex tower defense game built with C++ and SFML. Features include strategic resource management, multiple enemy types, and pathfinding algorithms.",
      tech: ["C++", "SFML", "DSA"],
      categories: ["Games"],
      githubUrl: "https://github.com/abdullah-naeem-gh/Stronghold_Reckon",
      imageUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070",
    },
    {
      title: "Islamabad Crime Mapping Dashboard",
      description:
        "A Heat Map Visualisation and criminals database handling dashboard for Islamabad.",
      longDescription:
        "A comprehensive crime mapping system that visualizes crime data across Islamabad using heat maps. Includes database management for criminal records and advanced data visualization using Tableau.",
      tech: ["MERN", "MySQL", "Tableau data visualization"],
      categories: ["Web Dev"],
      githubUrl: "https://github.com/abdullah-naeem-gh/Crime-Mapping-System",
      imageUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070",
    },
  ];

  // Collect unique categories
  const allCategories = Array.from(
    new Set(projects.flatMap((project) => project.categories))
  ).sort();

  // Filter projects
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.categories.includes(selectedCategory))
    : projects;

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const filterVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-3 sm:p-4 md:p-8 max-h-full overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6 md:mb-8 text-center px-2"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>
      
      {/* Filter Section */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          <span className="text-sm sm:text-base text-gray-600">
            Filter by category:
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8 px-2">
          <motion.button
            variants={filterVariants}
            whileHover="hover"
            whileTap="tap"
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
              selectedCategory === null
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage(0);
            }}
          >
            All
          </motion.button>
          {allCategories.map((category) => (
            <motion.button
              key={category}
              variants={filterVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
                selectedCategory === category
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(0);
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory || 'all'}-page-${currentPage}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-items-center px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No projects message */}
      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-6 sm:mt-8 text-sm sm:text-base px-2"
        >
          No projects found in the selected category.
        </motion.p>
      )}
      
      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 sm:mt-6 md:mt-8 gap-1.5 sm:gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                currentPage === index 
                  ? 'bg-red-500' 
                  : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(index)}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Projects;