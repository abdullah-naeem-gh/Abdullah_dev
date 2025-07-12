import React, { useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Filter } from "lucide-react";
import { Carousel } from "./ui/Carousel";
import stronghold3 from "../assets/images/stronghold3.png";
import crimevision from "../assets/images/crimevision.png";
import sd from "../assets/images/sd.png";
import slime from "../assets/images/slime.png";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  categories: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl: string;
}

interface ProjectSlideData {
  title: string;
  description: string;
  tech: string[];
  imageUrl?: string;
  githubUrl: string;
  demoUrl?: string;
  longDescription?: string;
}

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = useMemo(() => [
    {
      title: "Crime Analysis and Predictions Platform",
      description: "A platform for analyzing and predicting crime trends in Islamabad.",
      longDescription: "Includes Data management for authorized users, crime data visualizations in form of charts and maps, crime trend analysis and Safest Path from one location to another",
      tech: ["MERN", "postgreSQL", "Gemini", "redis"],
      categories: ["Web Dev"],
      githubUrl: "https://github.com/abdullah-naeem-gh/Crime_Analysis_backend",
      demoUrl: "https://www.crimevision.live/",
      imageUrl: crimevision,
    },
    {
      title: "Stable Diffusion Dashboard",
      description: "A dashboard for generating images using Stable Diffusion, deployed via Docker on Runpod Serverless.",
      longDescription: "A comprehensive dashboard that leverages Stable Diffusion for AI image generation. The system is containerized using Docker and deployed on Runpod's serverless infrastructure for optimal performance and scalability.",
      tech: ["Docker", "Node.js", "Express.js", "EJS", "Runpod"],
      categories: ["Web Dev"],
      githubUrl: "https://github.com/abdullah-naeem-gh/SD-dashboard",
      imageUrl: sd,
    },
    {
      title: "Image-Based Search Engine",
      description: "A search engine utilizing vector embeddings for image similarity search.",
      longDescription: "An advanced search engine that uses vector embeddings to enable image similarity search. Built with the MERN stack and integrated with vector databases for efficient similarity matching.",
      tech: ["MERN Stack", "Vector DB", "GCP", "MySQL"],
      categories: ["Web Dev"],
      githubUrl: "https://github.com/abdullah-naeem-gh/image_Searc",
      imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2072",
    },
    {
      title: "The Annoying Traps",
      description: "A vertical game where players navigate past obstacles using mouse controls.",
      longDescription: "A challenging vertical scrolling game built with Pygame. Players must use precise mouse controls to navigate through increasingly difficult obstacles while avoiding traps.",
      tech: ["Python", "Pygame", "Collision Detection"],
      categories: ["Games"],
      githubUrl: "https://github.com/abdullah-naeem-gh/the-annoying-traps",
      imageUrl: slime,
    },
    {
      title: "Stronghold Reckoning",
      description: "A 2D tower defense game that combines strategic gameplay, resource management, and advanced algorithms.",
      longDescription: "A complex tower defense game built with C++ and SFML. Features include strategic resource management, multiple enemy types, and pathfinding algorithms.",
      tech: ["C++", "SFML", "DSA"],
      categories: ["Games"],
      githubUrl: "https://github.com/abdullah-naeem-gh/Stronghold_Reckon",
      imageUrl: stronghold3,
    },
  ], []);

  // Collect unique categories
  const allCategories = useMemo(() => Array.from(
    new Set(projects.flatMap((project) => project.categories))
  ).sort(), [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => selectedCategory
    ? projects.filter((project) => project.categories.includes(selectedCategory))
    : projects, [projects, selectedCategory]);

  const handleViewProject = (slideProject: ProjectSlideData) => {
    // Find the full project data from our projects array
    const fullProject = projects.find(p => p.title === slideProject.title);
    if (fullProject) {
      setSelectedProject(fullProject);
    }
  };

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
      className="max-w-7xl mx-auto p-3 sm:p-4 md:p-8 max-h-full overflow-y-auto flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 sm:mb-3 text-center px-2"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>
      
      {/* Filter Section */}
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          <span className="text-sm sm:text-base text-gray-600">
            Filter by category:
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2">
          <motion.button
            variants={filterVariants}
            whileHover="hover"
            whileTap="tap"
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
              selectedCategory === null
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedCategory(null)}
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
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      {filteredProjects.length > 0 ? (
        <div className="relative overflow-visible w-full h-full py-2 sm:py-4 px-2 sm:px-4 flex justify-center">
          <Carousel slides={filteredProjects} onViewProject={handleViewProject} />
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-6 sm:mt-8 text-sm sm:text-base px-2"
        >
          No projects found in the selected category.
        </motion.p>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectCard
          {...selectedProject}
          isModalOpen={true}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.div>
  );
};

export default Projects;