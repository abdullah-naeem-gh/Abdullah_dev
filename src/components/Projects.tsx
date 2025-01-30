import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

export const Projects: React.FC = () => {
  const projects = [
    {
      title: "Stable Diffusion Dashboard",
      description: "A dashboard for generating images using Stable Diffusion, deployed via Docker on Runpod Serverless.",
      tech: ["Docker", "Node.js", "Express.js", "EJS", "Runpod"],
      githubUrl: "https://github.com/abdullah-naeem-gh/SD-dashboard",
      // demoUrl: "https://sd-dashboard-c95169e-sv2fkmpxsa-uc.a.run.app/",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070"
    },
    {
      title: "Image-Based Search Engine",
      description: "A search engine utilizing vector embeddings for image similarity search.",
      tech: ["MERN Stack", "Vector DB", "GCP", "MySQL"],
      githubUrl: "https://github.com/abdullah-naeem-gh/image_Searc",
      // demoUrl: "https://cloudrun-frontend-service-683908241893.us-central1.run.app/",
      imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2072"
    },
    {
      title: "The Annoying Traps",
      description: "A vertical game where players navigate past obstacles using mouse controls.",
      tech: ["Python", "Pygame", "Collision Detection"],
      githubUrl: "https://github.com/abdullah-naeem-gh/the-annoying-traps",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"
    },
    {
      title: "Stronghold Reckoning",
      description: "A 2D tower defense game that combines strategic gameplay, resource management, and advanced algorithms.",
      tech: ["C++", "SFML", "DSA"],
      githubUrl: "https://github.com/abdullah-naeem-gh/Stronghold_Reckon",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"
    },
    {
      title: "Islamabad Crime Mapping Dashboard",
      description: "A Heat Map Visualisation and criminals database handling dashboard for Islamabad.",
      tech: ["MERN", "MySQL", "Tableau data visualization"],
      githubUrl: "https://github.com/abdullah-naeem-gh/Crime-Mapping-System",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 
        className="text-4xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </motion.div>
  );
};