import React, { memo } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Brain, PenTool as Tool } from "lucide-react";

const skills = {
  Frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
  Backend: ["Node.js", "Express", "Python", "FastAPI", "MongoDB"],
  MLOps: ["Docker", "Kubernetes", "TensorFlow", "PyTorch", "MLflow"],
  Tools: ["Git", "AWS", "GCP", "Linux", "CI/CD"],
};

const iconMap = {
  Frontend: Code2,
  Backend: Server,
  MLOps: Brain,
  Tools: Tool,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Skills: React.FC = memo(() => {
  return (
    <div className="relative text-white py-8 px-4 lg:px-8">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(220,38,38)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <motion.div
        className="relative max-w-6xl mx-auto p-8 z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent text-center"
          variants={itemVariants}
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, items]) => {
            const Icon = iconMap[category as keyof typeof iconMap];
            return (
              <motion.div
                key={category}
                className="bg-gradient-to-br from-gray-900/80 to-black/70 p-5 rounded-lg border border-red-500/10 backdrop-blur-sm"
                variants={itemVariants}
              >
                <div className="flex items-center mb-3 space-x-2">
                  <Icon className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-bold text-red-500">{category}</h3>
                </div>
                <div className="space-y-2">
                  {items.map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="relative p-2 rounded-md border border-red-500/10 hover:border-red-500/50 transition-all duration-300"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                      <h3 className="text-sm font-medium text-white hover:text-red-400 transition-colors">
                        {skill}
                      </h3>
                      <div className="w-full bg-gray-800/50 h-0.5 mt-1 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 group-hover:animate-progress"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
});