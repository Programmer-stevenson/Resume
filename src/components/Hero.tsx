import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SaturnBackground from './SaturnBackground';

const roles = ['Cloud Engineer Aspirant', 'Full-Stack Developer', 'IT Professional'];

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden borealis-bg">
      {/* Floating Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-teal-500/30 rounded-full blur-3xl"
        style={{ top: '20%', left: '10%' }}
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-3xl"
        style={{ bottom: '20%', right: '10%' }}
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Saturn Background */}
      <SaturnBackground />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 pt-20">
        <div className="mb-[10px]">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold font-mono typewriter inline-block">
            {displayText}
          </div>
        </div>

        {/* Scrolling Text */}
        <motion.div
          className="scrolling-text-wrapper relative w-full max-w-md mx-auto overflow-hidden py-4 mb-8 mt-[50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="scrolling-text flex whitespace-nowrap animate-scroll-left">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                <span className="scroll-item text-xl sm:text-2xl text-teal-300 font-medium px-8">Cloud Engineer Aspirant</span>
                <span className="separator text-teal-500 text-lg">•</span>
                <span className="scroll-item text-xl sm:text-2xl text-teal-300 font-medium px-8">Full-Stack Developer</span>
                <span className="separator text-teal-500 text-lg">•</span>
                <span className="scroll-item text-xl sm:text-2xl text-teal-300 font-medium px-8">IT Professional</span>
                <span className="separator text-teal-500 text-lg">•</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-20 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Transforming infrastructure challenges into scalable cloud solutions
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <motion.a
            href="#skills"
            onClick={(e) => handleNavClick(e, '#skills')}
            className="group relative px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg font-medium text-base shadow-lg shadow-teal-500/30 overflow-hidden w-full sm:w-auto"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(20, 184, 166, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Technologies
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className="group relative px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-teal-500/30 rounded-lg font-medium text-base text-teal-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05, borderColor: 'rgba(20, 184, 166, 0.5)', backgroundColor: 'rgba(31, 41, 55, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              View Projects
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
