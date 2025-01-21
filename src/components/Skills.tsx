import { motion } from "framer-motion";

export const Skills: React.FC = () => {
  const skills = {
    "Frontend": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
    "Backend": ["Node.js", "Express", "Python", "FastAPI", "MongoDB"],
    "MLOps": ["Docker", "Kubernetes", "TensorFlow", "PyTorch", "MLflow"],
    "Tools": ["Git", "AWS", "GCP", "Linux", "CI/CD"]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
        variants={itemVariants}
      >
        Skills & Technologies
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <motion.div
            key={category}
            className="bg-gray-800 rounded-xl p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-red-500 mb-4">{category}</h3>
            <div className="space-y-3">
              {items.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="relative"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300">{skill}</span>
                    <motion.div
                      className="h-1 bg-gradient-to-r from-red-500 to-red-800 rounded-full"
                      style={{ width: "100%" }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};