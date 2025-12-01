import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-black py-8 px-4 sm:px-6 border-t border-teal-500/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 text-sm sm:text-base">
          © 2025 Brandon Stevenson. Built with passion and code.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
