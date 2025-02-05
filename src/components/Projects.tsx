import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Filter } from "lucide-react";

export const Projects: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const projects = [
    {
      title: "Stable Diffusion Dashboard",
      description:
        "A dashboard for generating images using Stable Diffusion, deployed via Docker on Runpod Serverless.",
      longDescription:
        "A comprehensive dashboard that leverages Stable Diffusion for AI image generation. The system is containerized using Docker and deployed on Runpod's serverless infrastructure for optimal performance and scalability.",
      tech: ["Docker", "Node.js", "Express.js", "EJS", "Runpod"],
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
      githubUrl: "https://github.com/abdullah-naeem-gh/Crime-Mapping-System",
      imageUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070",
    },
  ];

  // Collect unique technologies to populate filter buttons
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.tech))
  ).sort();

  // If a tech is selected, show only relevant projects
  const filteredProjects = selectedTech
    ? projects.filter((project) => project.tech.includes(selectedTech))
    : projects;

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
      className="max-w-6xl mx-auto p-8 max-h-full overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-bold text-[var(--text-primary)] mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>
      {/* Filter Section */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[var(--text-secondary)]" />
          <span className="text-[var(--text-secondary)]">
            Filter by technology:
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <motion.button
            variants={filterVariants}
            whileHover="hover"
            whileTap="tap"
            className={`px-4 py-2 rounded-full text-sm ${
              selectedTech === null
                ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                : 'bg-[var(--surface)] text-[var(--text-muted)]'
            }`}
            onClick={() => setSelectedTech(null)}
          >
            All
          </motion.button>
          {allTechnologies.map((tech) => (
            <motion.button
              key={tech}
              variants={filterVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-4 py-2 rounded-full text-sm ${
                selectedTech === tech
                  ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                  : 'bg-[var(--surface)] text-[var(--text-muted)]'
              }`}
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTech || 'all'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No projects message */}
      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[var(--text-secondary)] mt-8"
        >
          No projects found with the selected technology.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Projects;