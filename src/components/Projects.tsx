import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Sparkles, Code2, Globe, Rocket } from 'lucide-react';

const projects = [
  {
    title: 'Vorus Luxury Cologne',
    description: 'Fully custom luxury cologne landing page built from scratch — every visual, animation, and component handcrafted. Features a complete cart, checkout flow, and sample subscription concept.',
    tech: ['React', 'TypeScript', 'MERN Stack', 'Framer Motion'],
    liveUrl: 'https://vorus.onrender.com',
    githubUrl: 'https://github.com/Programmer-stevenson',
    gradient: 'from-[#0a0a0f] via-[#1a1520] to-[#0d0d12]',
    accentGradient: 'from-amber-600 to-yellow-500',
    textGradient: 'from-amber-200 to-yellow-100',
    glowColor: 'shadow-amber-500/20',
    borderAccent: 'border-amber-500/30',
    tagBg: 'bg-amber-500/10',
    tagText: 'text-amber-300',
    icon: Sparkles,
    iconLabel: 'Luxury E-Commerce',
    screenshot: '/vorus.png',
  },
  {
    title: 'Cosmic Skate',
    description: 'Interstellar space-themed web experience for a music industry client. Features warp-speed stars, floating Saturn overlay, shooting stars, and cinematic WebGL effects.',
    tech: ['React', 'Three.js', 'WebGL', 'Tailwind CSS'],
    liveUrl: 'https://cosmicskate.onrender.com',
    githubUrl: 'https://github.com/Programmer-stevenson',
    gradient: 'from-[#050510] via-[#0f0a1a] to-[#080812]',
    accentGradient: 'from-violet-600 to-purple-500',
    textGradient: 'from-violet-200 to-purple-100',
    glowColor: 'shadow-violet-500/20',
    borderAccent: 'border-violet-500/30',
    tagBg: 'bg-violet-500/10',
    tagText: 'text-violet-300',
    icon: Rocket,
    iconLabel: 'WebGL Experience',
    screenshot: '/cosmic.png',
  },
  {
    title: 'Plexura.net',
    description: 'Modern web development agency website showcasing stunning animations, responsive design, and cutting-edge frontend techniques.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://plexura.net',
    githubUrl: 'https://github.com/Programmer-stevenson',
    gradient: 'from-[#0a100f] via-[#0f1a18] to-[#0a0f0e]',
    accentGradient: 'from-emerald-600 to-teal-500',
    textGradient: 'from-emerald-200 to-teal-100',
    glowColor: 'shadow-emerald-500/20',
    borderAccent: 'border-emerald-500/30',
    tagBg: 'bg-emerald-500/10',
    tagText: 'text-emerald-300',
    icon: Code2,
    iconLabel: 'Agency Website',
    screenshot: '/plexura.png',
  },
  {
    title: 'Portfolio Website',
    description: 'Interactive personal portfolio featuring Three.js Saturn background, advanced animations, and modern design patterns showcasing skills and experience.',
    tech: ['React', 'TypeScript', 'Three.js', 'Framer Motion'],
    liveUrl: 'https://resume-frmy.onrender.com/',
    githubUrl: 'https://github.com/Programmer-stevenson',
    gradient: 'from-[#0a0a10] via-[#101020] to-[#0a0a12]',
    accentGradient: 'from-cyan-600 to-blue-500',
    textGradient: 'from-cyan-200 to-blue-100',
    glowColor: 'shadow-cyan-500/20',
    borderAccent: 'border-cyan-500/30',
    tagBg: 'bg-cyan-500/10',
    tagText: 'text-cyan-300',
    icon: Globe,
    iconLabel: 'Personal Site',
    screenshot: '/resume.jpg',
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section id="projects" className="min-h-screen py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-gray-950 via-black to-gray-950">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A collection of work showcasing modern web development, stunning visuals, and seamless user experiences.
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Navigation Arrows */}
          <motion.button
            className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Main Slide Area */}
          <div className="relative mx-8 sm:mx-12">
            <AnimatePresence mode="wait">
              {projects.map((project, index) => {
                if (index !== currentSlide) return null;
                const Icon = project.icon;
                const showPlaceholder = imageError[index];

                return (
                  <motion.div
                    key={project.title}
                    className={`bg-gradient-to-br ${project.gradient} rounded-3xl overflow-hidden shadow-2xl ${project.glowColor}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
                    </div>

                    {/* Content - Stacked Layout */}
                    <div className="relative p-6 sm:p-8 lg:p-10">
                      {/* Top: Project Info */}
                      <motion.div
                        className="mb-6 lg:mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
                          {/* Left side - Title and Badge */}
                          <div className="flex-1">
                            {/* Badge */}
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${project.tagBg} border ${project.borderAccent}`}>
                                <Icon className={`w-3.5 h-3.5 ${project.tagText}`} />
                                <span className={`text-xs font-semibold ${project.tagText} uppercase tracking-wider`}>
                                  {project.iconLabel}
                                </span>
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.textGradient} leading-tight mb-3`}>
                              {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                              {project.description}
                            </p>
                          </div>

                          {/* Right side - Tech & Buttons */}
                          <div className="flex flex-col gap-4 lg:items-end">
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 lg:justify-end">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/10 hover:border-white/20 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${project.accentGradient} text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl`}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span>View Live</span>
                                <ExternalLink className="w-4 h-4" />
                              </motion.a>
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm text-gray-300 text-sm font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Github className="w-4 h-4" />
                                <span>Source</span>
                              </motion.a>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Bottom: Full Screenshot */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <div className={`relative rounded-2xl overflow-hidden border ${project.borderAccent} bg-black/40 backdrop-blur-sm shadow-2xl group`}>
                          {/* Screenshot Image or Placeholder */}
                          {showPlaceholder ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-gradient-to-br from-gray-900/80 to-black/80">
                              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.accentGradient} flex items-center justify-center mb-4 shadow-lg`}>
                                <Icon className="w-10 h-10 text-white" />
                              </div>
                              <p className="text-gray-500 text-sm font-medium">Screenshot Placeholder</p>
                              <p className="text-gray-600 text-xs mt-1">{project.screenshot}</p>
                            </div>
                          ) : (
                            <div className="relative">
                              <img
                                src={project.screenshot}
                                alt={`${project.title} screenshot`}
                                className="w-full h-auto max-h-[500px] object-contain bg-black/20"
                                onError={() => handleImageError(index)}
                              />
                              
                              {/* Gradient overlay at bottom */}
                              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                            </div>
                          )}
                          
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className="relative group"
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span
                  className={`block w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? `bg-gradient-to-r ${projects[index].accentGradient} scale-125`
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
                {index === currentSlide && (
                  <motion.span
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${projects[index].accentGradient} opacity-40`}
                    initial={{ scale: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Project Counter */}
          <div className="absolute -bottom-2 right-8 sm:right-12 text-gray-600 text-sm font-mono">
            <span className="text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;