import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="text-center max-w-4xl mx-auto relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="mb-8 relative"
        variants={itemVariants}
      >
        <div className="w-40 h-40 mx-auto relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-800 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center">
            <span className="text-5xl font-bold text-white">AN</span>
          </div>
        </div>
        <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-800 rounded-full opacity-20 blur-xl animate-pulse"></div>
      </motion.div>

      <motion.h1 
        className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
        variants={itemVariants}
      >
        Web Developer
        <motion.span 
          className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800"
          animate={{ 
            backgroundPosition: ["0%", "100%"],
            opacity: [1, 0.8, 1] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          & MLOps Engineer
        </motion.span>
      </motion.h1>

      <motion.p 
        className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        variants={itemVariants}
      >
        Bachelor of Science in Computer Science student at NUST, passionate about
        creating innovative solutions with modern web technologies and ML workflows.
        Turning complex problems into elegant solutions.
      </motion.p>

      <motion.div 
        className="flex flex-wrap justify-center gap-6 text-gray-300"
        variants={itemVariants}
      >
        <motion.div 
          className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MapPin className="w-5 h-5" />
          <span>Islamabad, Pakistan</span>
        </motion.div>
        <motion.a
          href="mailto:n.abdullah.self@gmail.com"
          className="flex items-center gap-2 hover:text-red-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-5 h-5" />
          <span>n.abdullah.self@gmail.com</span>
        </motion.a>
        <motion.div 
          className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone className="w-5 h-5" />
          <span>+92345-8452580</span>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-12 flex justify-center gap-6"
        variants={itemVariants}
      >
        <motion.a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-gray-800 rounded-full hover:bg-red-500 transition-colors"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
        >
          <Github className="w-6 h-6" />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-gray-800 rounded-full hover:bg-red-500 transition-colors"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
        >
          <Linkedin className="w-6 h-6" />
        </motion.a>
        <motion.a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-gray-800 rounded-full hover:bg-red-500 transition-colors"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
        >
          <Twitter className="w-6 h-6" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};