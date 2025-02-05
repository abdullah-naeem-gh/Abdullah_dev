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
    // You can un-comment or add more experiences here
    // {
    //   title: "Full Stack Developer",
    //   company: "Startup Inc",
    //   period: "2022 - 2023",
    //   description: "Developed and maintained full-stack web applications using modern technologies.",
    //   achievements: [
    //     "Built scalable microservices architecture",
    //     "Implemented real-time features using WebSocket",
    //     "Improved application performance by 40%",
    //   ],
    // },
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
      className="max-w-4xl mx-auto p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-bold text-[var(--text-primary)] mb-12 text-center"
        variants={itemVariants}
      >
        Professional Experience
      </motion.h2>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] to-[var(--accent)]"></div>

        {experiences.map((exp, index) => (
          <motion.div key={index} className="mb-12 relative" variants={itemVariants}>
            {/* Circular icon container */}
            <div className="absolute left-0 w-16 h-16 rounded-full bg-[var(--surface)] border-4 border-[var(--accent)] flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[var(--accent)]" />
            </div>

            {/* Content box */}
            <div className="ml-24 bg-[var(--surface)] rounded-xl p-6">
              {/* Title & company */}
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {exp.title}
                </h3>
                <span className="text-[var(--accent)]">•</span>
                <span className="text-[var(--text-secondary)]">{exp.company}</span>
              </div>

              {/* Period */}
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-4">
                <Calendar className="w-4 h-4" />
                <span>{exp.period}</span>
              </div>

              {/* Description */}
              <p className="text-[var(--text-muted)] mb-4">{exp.description}</p>

              {/* Achievements */}
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-[var(--text-muted)]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-[var(--accent)] mt-1">•</span>
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