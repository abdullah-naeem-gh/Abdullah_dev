import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Software Intern",
      company: "Mezino Technologies | Lahore | Onsite",
      period: "Jun 2024 - Sep 2024 • 4 months",
      description: "Developed and deployed full-stack websites with cloud-based microservices, implemented DevOps practices, and enabled scalable deployment of AI models using modern tools and cloud platforms.",
      achievements: [
        "Developed REST APIs with Node.js and Express, using TypeScript and documented with OpenAPI standards.",
        "Containerized applications using Docker and built CI/CD pipelines with GitHub Actions for seamless deployment.",
        "Leveraged vector embeddings and deployed large AI models on GCPs Vertex AI Workbench and Runpod for various ML workflows.",
        "Deployed applications on Google Cloud Run, integrating them with Cloud SQL and Cloud Storage to manage infrastructure effectively with Pulumi."
      ]
    },
    // {
    //   title: "Full Stack Developer",
    //   company: "Startup Inc",
    //   period: "2022 - 2023",
    //   description: "Developed and maintained full-stack web applications using modern technologies.",
    //   achievements: [
    //     "Built scalable microservices architecture",
    //     "Implemented real-time features using WebSocket",
    //     "Improved application performance by 40%"
    //   ]
    // }
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 
        className="text-4xl font-bold text-white mb-12 text-center"
        variants={itemVariants}
      >
        Professional Experience
      </motion.h2>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-red-800"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="mb-12 relative"
            variants={itemVariants}
          >
            <div className="absolute left-0 w-16 h-16 rounded-full bg-gray-800 border-4 border-red-500 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-red-500" />
            </div>

            <div className="ml-24 bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <span className="text-red-500">•</span>
                <span className="text-gray-400">{exp.company}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{exp.period}</span>
              </div>

              <p className="text-gray-300 mb-4">{exp.description}</p>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-red-500 mt-1">•</span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};