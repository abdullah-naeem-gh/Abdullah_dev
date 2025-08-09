import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Full‑stack Developer",
      company: "Salik Labs · Internship | Islamabad | On-site",
      period: "Jul 2025 - Present • 2 months",
      description:
        "Integrating AI chat with file uploads and building a scalable full‑stack platform.",
      achievements: [
        "Integrated AI chat with file uploads, markdown, and persistent context.",
        "Engineered app with React (TypeScript), Express, and Supabase using clean architecture.",
        "Dockerized front/back; deployed on AWS EC2 with Nginx reverse proxy and Let's Encrypt SSL.",
        "Implemented secure auth, RBAC, and multi‑tenant orgs with email verification.",
      ],
    },
    {
      title: "Software Intern",
      company: "Mezino Technologies | Lahore | Onsite",
      period: "Jun 2024 - Sep 2024 • 4 months",
      description:
        "Built full‑stack web apps and cloud microservices with DevOps and scalable AI deployments.",
      achievements: [
        "Built typed REST APIs (Node.js, Express, OpenAPI).",
        "Dockerized services and set up CI/CD with GitHub Actions.",
        "Used vector embeddings; deployed LLMs on Vertex AI and Runpod.",
        "Deployed to Cloud Run; integrated Cloud SQL/Storage with Pulumi.",
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
      className="h-full w-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="w-full max-w-5xl px-3 sm:px-6 md:px-8 pt-12 md:pt-16 pb-4">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-4 sm:mb-6"
          variants={itemVariants}
        >
          Professional Experience
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:gap-5">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="rounded-xl bg-white text-black shadow-xl p-4 sm:p-5 md:p-6"
              variants={itemVariants}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-red-500 flex items-center justify-center bg-gray-100">
                    <Briefcase className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold leading-tight">{exp.title}</h3>
                    <span className="text-xs sm:text-sm text-gray-600">{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs sm:text-sm text-gray-700">{exp.period}</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3">{exp.description}</p>

              <ul className="space-y-1.5">
                {exp.achievements.slice(0, 3).map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-500 mt-1 text-xs flex-shrink-0">•</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};