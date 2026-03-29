import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SaturnBackground from './SaturnBackground';

/*
  Requires: public/textures/space-bg.jpg
*/

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Block pinch-to-zoom on the hero section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const blockPinch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    el.addEventListener('touchmove', blockPinch, { passive: false });
    return () => el.removeEventListener('touchmove', blockPinch);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/textures/space-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        touchAction: 'pan-y',
      }}
    >
      {/* Sparkling stars — pure CSS */}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .sparkle-star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
        {[...Array(isMobile ? 12 : 25)].map((_, i) => (
          <div
            key={i}
            className="sparkle-star"
            style={{
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              top: `${5 + Math.random() * 90}%`,
              left: `${5 + Math.random() * 90}%`,
              animationName: 'sparkle',
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 6}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Planet + Rings (Three.js canvas with alpha transparency) */}
      <SaturnBackground />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 pt-20">
        {/* Invisible placeholder for typewriter area */}
        <div className="mb-[10px]">
          <div className="h-[48px] sm:h-[56px] md:h-[64px] lg:h-[96px] xl:h-[112px]" aria-hidden="true" />
        </div>

        {/* Invisible placeholder for scrolling text area */}
        <motion.div
          className="relative w-full max-w-md mx-auto py-4 mb-8 mt-[50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="h-[32px] sm:h-[36px]" aria-hidden="true" />
        </motion.div>

        {/* Invisible placeholder for paragraph */}
        <motion.div
          className="mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="h-[28px] sm:h-[32px] md:h-[36px]" aria-hidden="true" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mt-[8px] sm:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <motion.a
            href="#skills"
            onClick={(e) => handleNavClick(e, '#skills')}
            className="hidden group relative px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg font-medium text-base shadow-lg shadow-teal-500/30 overflow-hidden w-full sm:w-auto"
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
            href="#introduction"
            onClick={(e) => handleNavClick(e, '#introduction')}
            className="group relative px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-teal-500/30 rounded-lg font-medium text-base text-teal-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05, borderColor: 'rgba(20, 184, 166, 0.5)', backgroundColor: 'rgba(31, 41, 55, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              About Me
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