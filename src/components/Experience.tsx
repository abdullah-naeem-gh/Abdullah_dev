import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Software Intern",
      company: "Mezino Technologies | Lahore | Onsite",
      period: "Jun 2024 - Sep 2024 • 4 months",
      description:
        "Developed and deployed full-stack websites with cloud-based microservices, implemented DevOps practices, and enabled scalable deployment of AI models using modern tools and cloud platforms.",
      achievements: [
        "Developed REST APIs with Node.js and Express, using TypeScript and documented with OpenAPI standards.",
        "Containerized applications using Docker and built CI/CD pipelines with GitHub Actions for seamless deployment.",
        "Leveraged vector embeddings and deployed large AI models on GCPs Vertex AI Workbench and Runpod for various ML workflows.",
        "Deployed applications on Google Cloud Run, integrating them with Cloud SQL and Cloud Storage to manage infrastructure effectively with Pulumi.",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-3 sm:p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8 md:mb-12 text-center px-2"
        variants={itemVariants}
      >
        Professional Experience
      </motion.h2>

      <div className="relative">
        {/* Vertical timeline line - hidden on mobile */}
        <div className="hidden md:block absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-red-600"></div>

        {experiences.map((exp, index) => (
          <motion.div key={index} className="mb-6 sm:mb-8 md:mb-12 relative" variants={itemVariants}>
            {/* Circular icon container - responsive sizing */}
            <div className="absolute left-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white border-2 sm:border-3 md:border-4 border-red-500 flex items-center justify-center">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500" />
            </div>

            {/* Content box - responsive margins and padding */}
            <div className="ml-14 sm:ml-16 md:ml-24 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6">
              {/* Title & company - responsive layout */}
              <div className="flex flex-col gap-1 sm:gap-2 md:flex-row md:items-center md:gap-4 mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl md:text-xl font-bold text-black">
                  {exp.title}
                </h3>
                <span className="hidden md:inline text-red-500">•</span>
                <span className="text-sm sm:text-base text-gray-600">{exp.company}</span>
              </div>

              {/* Period */}
              <div className="flex items-center gap-2 text-gray-600 mb-3 sm:mb-4">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base">{exp.period}</span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{exp.description}</p>

              {/* Achievements */}
              <ul className="space-y-1.5 sm:space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-sm sm:text-base text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-red-500 mt-1 text-xs sm:text-sm flex-shrink-0">•</span>
                    <span>{achievement}</span>
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