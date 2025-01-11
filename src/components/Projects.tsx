// components/Projects.tsx
import React from "react";
import { ProjectCard } from "./ProjectCard";

export const Projects: React.FC = () => {
  const projects = [
    {
      title: "Stable Diffusion Dashboard",
      description:
        "A dashboard for generating images using Stable Diffusion, deployed via Docker on Runpod Serverless.",
      tech: ["Docker", "Node.js", "Express.js", "EJS", "Runpod"],
      demoUrl: "https://sd-dashboard-c95169e-sv2fkmpxsa-uc.a.run.app/",
      githubUrl: "https://github.com/abdullah-naeem-gh/SD-dashboard",
      imageUrl: "../assets/stronghold/stronghold2.png", // Add image URL
    },
    {
      title: "Image-Based Search Engine",
      description:
        "A search engine utilizing vector embeddings for image similarity search.",
      tech: ["MERN Stack", "Vector DB", "GCP", "MySQL"],
      demoUrl:
        "https://cloudrun-frontend-service-683908241893.us-central1.run.app/",
      githubUrl: "https://github.com/abdullah-naeem-gh/image_Searc",
      imageUrl: "/path/to/image2.jpg", // Add image URL
    },
    {
      title: "The Annoying Traps",
      description:
        "A vertical game where players navigate past obstacles using mouse controls.",
      tech: ["Python", "Pygame", "Collision Detection"],
      githubUrl: "https://github.com/someone/the-annoying-traps",
      imageUrl: "/path/to/image3.jpg", // Add image URL
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-white mb-12 relative">
        <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
          Projects
        </span>
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            tech={project.tech}
            demoUrl={project.demoUrl}
            githubUrl={project.githubUrl}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};