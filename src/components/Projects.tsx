import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Sparkles, Code2, Globe, Palette, Wrench, Droplets, PawPrint, PenTool, Flower2, LayoutGrid, ChevronDown } from 'lucide-react';

const projects = [
  {
    title: 'Vorus Luxury Cologne',
    description: 'A fictional luxury cologne brand I designed and built end-to-end — I invented the product and brand identity, then handcrafted the entire web experience from scratch. Every visual, animation, and component is custom, with a complete cart, checkout flow, and sample subscription concept.',
    tech: ['React', 'TypeScript', 'MERN Stack', 'Framer Motion'],
    liveUrl: 'https://vorus.onrender.com',
    githubUrl: 'https://github.com/Programmer-stevenson/Vorus',
    gradient: 'from-[#0a0a0f] via-[#1a1520] to-[#0d0d12]',
    accentGradient: 'from-amber-600 to-yellow-500',
    textGradient: 'from-amber-200 to-yellow-100',
    glowColor: 'shadow-amber-500/20',
    borderAccent: 'border-amber-500/30',
    tagBg: 'bg-amber-500/10',
    tagText: 'text-amber-300',
    icon: Sparkles,
    iconLabel: 'Fictional Product & Brand Design',
    screenshot: '/vorus.png',
  },
  {
    title: 'Pétale — Artisan Florist',
    description: 'One of my first complex React builds — a fictional luxury florist concept where I designed the logo, created all of the imagery, and handcrafted the entire front end from scratch. Features a bouquet shop showcase, featured products, a weddings section, and a same-day delivery concept. Front-end demo only.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS', 'Responsive Design'],
    liveUrl: 'https://petale-luxury-floral.onrender.com/',
    githubUrl: 'https://github.com/Programmer-stevenson',
    gradient: 'from-[#0a100c] via-[#121a14] to-[#0a0f0b]',
    accentGradient: 'from-rose-400 to-pink-300',
    textGradient: 'from-rose-200 to-pink-100',
    glowColor: 'shadow-rose-500/20',
    borderAccent: 'border-rose-500/30',
    tagBg: 'bg-rose-500/10',
    tagText: 'text-rose-300',
    icon: Flower2,
    iconLabel: 'Fictional Luxury Florist',
    screenshot: '/Petale.jpg',
  },
  {
    title: 'KCKN Glass — Auto Glass & Repair',
    description: 'Full-stack Utah Located auto glass business site with service booking, gallery, financing info, and a custom admin dashboard. Built for a real client with Twilio SMS integration and MongoDB backend.',
    tech: ['Next.js', 'Express', 'MongoDB', 'Twilio', 'Tailwind CSS'],
    liveUrl: 'https://kcknglass.com/',
    githubUrl: 'https://github.com/Programmer-stevenson/Los-s-Auto-Glass-',
    gradient: 'from-[#060810] via-[#0a1220] to-[#080a12]',
    accentGradient: 'from-blue-600 to-sky-500',
    textGradient: 'from-blue-200 to-sky-100',
    glowColor: 'shadow-blue-500/20',
    borderAccent: 'border-blue-500/30',
    tagBg: 'bg-blue-500/10',
    tagText: 'text-blue-300',
    icon: Wrench,
    iconLabel: 'Utah Auto Glass Business Site',
    screenshot: '/los.jpg',
  },
  {
    title: 'Super Duper Scooper',
    description: 'Front-end website for a real Utah dog waste removal and lawn protection company serving West Jordan and the Salt Lake Valley. Features a quote-request form wired to a serverless form service, service-area coverage, a photo-confirmation visit concept, and a clean, conversion-focused design.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Form API'],
    liveUrl: 'https://super-duper-scoopers.onrender.com/',
    githubUrl: 'https://github.com/Programmer-stevenson',
    gradient: 'from-[#080f08] via-[#0f1a0d] to-[#0a0f0a]',
    accentGradient: 'from-green-600 to-lime-500',
    textGradient: 'from-green-200 to-lime-100',
    glowColor: 'shadow-green-500/20',
    borderAccent: 'border-green-500/30',
    tagBg: 'bg-green-500/10',
    tagText: 'text-green-300',
    icon: PawPrint,
    iconLabel: 'Utah Dog Waste + Lawn Care',
    screenshot: '/superScoop.png',
  },
  {
    title: 'Hazey Tattoos',
    description: 'Completely custom front-end portfolio site for a Utah tattoo artist. Features a filterable work gallery (illustrative B&G, realism, traditional, fine line, stippling), services, reviews, and a booking CTA — all in a bespoke dark-and-gold editorial design built entirely from scratch.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
    liveUrl: 'https://www.hazeytattoos.com',
    githubUrl: 'https://github.com/Programmer-stevenson',
    gradient: 'from-[#0c0a08] via-[#171310] to-[#0a0908]',
    accentGradient: 'from-amber-500 to-orange-400',
    textGradient: 'from-amber-200 to-orange-100',
    glowColor: 'shadow-amber-500/20',
    borderAccent: 'border-amber-500/30',
    tagBg: 'bg-amber-500/10',
    tagText: 'text-amber-300',
    icon: PenTool,
    iconLabel: 'Utah Tattoo Artist Portfolio',
    screenshot: '/hazeyport.jpg',
  },
  {
    title: 'Plexura Plumbing Marketing',
    description: 'Conversion-focused digital marketing landing page built for plumbing companies. Features GBP optimization info, service packages, campaign creative showcases, and mobile-first conversion UX.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
    liveUrl: 'https://plexura-plumbing-marketing.onrender.com/',
    githubUrl: 'https://github.com/Programmer-stevenson',
    gradient: 'from-[#050a0f] via-[#0a1a1f] to-[#080f12]',
    accentGradient: 'from-teal-600 to-cyan-500',
    textGradient: 'from-teal-200 to-cyan-100',
    glowColor: 'shadow-teal-500/20',
    borderAccent: 'border-teal-500/30',
    tagBg: 'bg-teal-500/10',
    tagText: 'text-teal-300',
    icon: Droplets,
    iconLabel: 'Digital Marketing Landing Page',
    screenshot: '/plumb.png',
  },

  {
    title: 'Plexura.net',
    description: 'Modern Full Service Digital Agency website showcasing stunning animations, responsive design, and cutting-edge frontend techniques.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://plexura.net',
    githubUrl: 'https://github.com/Programmer-stevenson/Plexura',
    gradient: 'from-[#0a100f] via-[#0f1a18] to-[#0a0f0e]',
    accentGradient: 'from-emerald-600 to-teal-500',
    textGradient: 'from-emerald-200 to-teal-100',
    glowColor: 'shadow-emerald-500/20',
    borderAccent: 'border-emerald-500/30',
    tagBg: 'bg-emerald-500/10',
    tagText: 'text-emerald-300',
    icon: Code2,
    iconLabel: ' My Agency Website',
    screenshot: '/plexura.png',
  },
  {
    title: 'My Portfolio Website',
    description: 'Interactive MERN Stack personal portfolio featuring Three.js Saturn background, advanced animations, and modern design patterns showcasing skills and experience.',
    tech: ['React', 'TypeScript', 'Three.js', 'Framer Motion'],
    liveUrl: 'https://brandons-resume.com/',
    githubUrl: 'https://github.com/Programmer-stevenson/Resume',
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
  {
  title: 'Tiger Paw Cleaning',
  description: 'Front-end website built for a real Missouri cleaning business featuring premium animations, Radix UI components, and conversion-focused service pages designed to attract residential and commercial clients. Lead-generation forms are handled via Web3Forms, and all imagery was provided by the client.',
  tech: ['React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Framer Motion', 'Web3Forms'],
  liveUrl: 'https://tigerpawcleaning.com/',
  githubUrl: 'https://github.com/Programmer-stevenson/Tiger-Paw-Cleaning',
  gradient: 'from-[#0a0a10] via-[#111111] to-[#0a0a0a]',
  accentGradient: 'from-yellow-500 to-amber-400',
  textGradient: 'from-yellow-200 to-amber-100',
  glowColor: 'shadow-yellow-500/20',
  borderAccent: 'border-yellow-500/30',
  tagBg: 'bg-yellow-500/10',
  tagText: 'text-yellow-300',
  icon: Sparkles,
  iconLabel: 'Cleaning Brand',
  screenshot: '/tiger-paw.png',
},
];

// Generate digi image array: digi1.jpg through digi13.jpg + plumb.png
const digiImages = [
  ...Array.from({ length: 13 }, (_, i) => ({
    src: `/digi${i + 1}.jpg`,
    alt: `Digital Marketing Design ${i + 1}`,
  })),
  {
    src: '/plumb.png',
    alt: 'Plexura Plumbing Marketing Landing Page',
  },
];

const DigitalMarketingCarousel = () => {
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { once: true, margin: '-100px' });

  // Duplicate images for seamless infinite loop
  const duplicatedImages = [...digiImages, ...digiImages];

  return (
    <motion.div
      ref={carouselRef}
      className="mt-28"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-sm text-fuchsia-300 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Palette className="w-3.5 h-3.5" />
          Plexura Creative
        </motion.span>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
          Digital Marketing {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">
            For Plexura
          </span>
        </h3>
        <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
          Brand graphics, Social Media content, and marketing assets designed for my business.
        </p>
      </motion.div>

      {/* Auto-scrolling Carousel */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a16] via-[#0a0a16]/80 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a16] via-[#0a0a16]/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {duplicatedImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              className="flex-shrink-0 px-2 sm:px-3"
            >
              <div className="relative group w-[280px] sm:w-[340px] md:w-[400px] rounded-2xl overflow-hidden border border-white/10 hover:border-fuchsia-500/40 transition-all duration-500 shadow-lg hover:shadow-fuchsia-500/10">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Keyframes for infinite scroll */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </motion.div>
  );
};

const ProjectsSpaceBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const starCount = isMobile ? 24 : 55;
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 1.6,
        opacity: 0.15 + Math.random() * 0.4,
      })),
    [starCount]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Static minty-green + purple nebula glows */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-[100px] sm:h-[30rem] sm:w-[30rem]" />
      <div className="absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-purple-600/25 blur-[110px] sm:h-[32rem] sm:w-[32rem]" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-400/15 blur-[100px] sm:h-[26rem] sm:w-[26rem]" />
      <div className="absolute -bottom-16 right-1/4 h-64 w-64 rounded-full bg-fuchsia-600/15 blur-[100px] sm:h-96 sm:w-96" />
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[130px]" />

      {/* Static stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const AUTOPLAY_DELAY = 8000;

  // Start or restart the autoplay timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, AUTOPLAY_DELAY);
  }, []);

  // Initialize autoplay
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
    resetTimer();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section id="projects" className="relative min-h-screen overflow-hidden py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-[#04140e] via-[#0a0a16] to-[#150a1e]">
      <ProjectsSpaceBackground />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
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
          ref={slideshowRef}
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
            <AnimatePresence mode="popLayout">
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
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6 lg:gap-8">
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
                            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-4 sm:line-clamp-none">
                              {project.description}
                            </p>
                          </div>

                          {/* Right side - Tech & Buttons */}
                          <div className="flex flex-col gap-5 lg:items-end">
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 lg:justify-end">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 text-[11px] sm:px-3 sm:py-1.5 sm:text-xs rounded-lg font-medium bg-white/5 text-gray-300 border border-white/10 hover:border-white/20 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full lg:w-auto">
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex flex-1 lg:flex-none items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${project.accentGradient} text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl`}
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
                                className="inline-flex flex-1 lg:flex-none items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm text-gray-300 text-sm font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
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
                onClick={() => goToSlide(index)}
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

        {/* See All Projects toggle */}
        <div className="mt-14 flex justify-center">
          <motion.button
            onClick={() => setShowAll((v) => !v)}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 text-sm font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <LayoutGrid className="w-4 h-4 text-cyan-400" />
            {showAll ? 'Hide All Projects' : `See All ${projects.length} Projects`}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>

        {/* All Projects Grid */}
        <AnimatePresence initial={false}>
          {showAll && (
            <motion.div
              key="all-projects-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
                {projects.map((project, index) => {
                  const Icon = project.icon;
                  const broken = imageError[index];
                  return (
                    <motion.div
                      key={`grid-${project.title}`}
                      className={`group relative flex flex-col rounded-2xl overflow-hidden border ${project.borderAccent} bg-white/[0.02] backdrop-blur-sm`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                    >
                      {/* Thumbnail — click to open in the showcase */}
                      <button
                        onClick={() => {
                          goToSlide(index);
                          setShowAll(false);
                          slideshowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="relative block w-full aspect-video overflow-hidden bg-black/40"
                        aria-label={`Open ${project.title} in the showcase`}
                      >
                        {broken ? (
                          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.accentGradient}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={project.screenshot}
                            alt={`${project.title} screenshot`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={() => handleImageError(index)}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </button>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-4">
                        <span className={`mb-2 inline-flex max-w-full items-center gap-1.5 self-start rounded-full px-2 py-0.5 ${project.tagBg} border ${project.borderAccent}`}>
                          <Icon className={`h-3 w-3 shrink-0 ${project.tagText}`} />
                          <span className={`truncate text-[10px] font-semibold uppercase tracking-wider ${project.tagText}`}>
                            {project.iconLabel}
                          </span>
                        </span>

                        <h4 className={`mb-2 bg-gradient-to-r text-base font-bold leading-snug text-transparent bg-clip-text ${project.textGradient}`}>
                          {project.title}
                        </h4>

                        <p className="mb-4 text-xs leading-relaxed text-gray-400 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Links */}
                        <div className="mt-auto flex items-center gap-2">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r ${project.accentGradient} px-3 py-2 text-xs font-semibold text-white transition-transform duration-200 hover:scale-[1.02]`}
                          >
                            View Live <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-gray-300 transition-colors hover:border-white/20 hover:bg-white/10"
                            aria-label={`${project.title} source`}
                          >
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Digital Marketing Carousel */}
        <DigitalMarketingCarousel />
      </div>
    </section>
  );
};

export default Projects;