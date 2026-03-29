import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Code2, Cloud, Linkedin, Github, TrendingUp, Zap, Target } from 'lucide-react';

const roleCards = [
  {
    icon: Cpu,
    title: 'IT Infrastructure Specialist',
    description: 'Enterprise server platforms, ITAD processing, data sanitization, and multi-vendor hardware at scale',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Code2,
    title: 'Full-Stack Developer',
    description: 'Building modern web applications with React, Node.js, Three.js, and cutting-edge technologies',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Cloud,
    title: 'Aspiring Cloud Engineer',
    description: 'Pursuing a B.S. in Cloud & Network Engineering — architecting scalable solutions and automating infrastructure',
    gradient: 'from-blue-500 to-purple-500',
  },
];

const values = [
  {
    icon: TrendingUp,
    label: 'Growth-Driven',
    description: 'Always leveling up — pursuing certifications, degrees, and new skills to stay ahead of the curve',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    label: 'Agile Learner',
    description: 'Rapidly adapting to new technologies, environments, and challenges with hands-on problem solving',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Target,
    label: 'Business-Minded',
    description: 'Co-founded Plexura — combining technical expertise with entrepreneurial vision to deliver real results',
    gradient: 'from-rose-500 to-pink-500',
  },
];

const Introduction = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="introduction"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
    >
      {/* Space background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/textures/space-bg.jpg')" }}
      />



      {/* Subtle animated blobs on top */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="intro-blob absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="intro-blob intro-blob-delay absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes introBlob {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(1.1); opacity: 0.5; }
            }
            .intro-blob {
              animation: introBlob 6s ease-in-out infinite;
              will-change: transform;
            }
            .intro-blob-delay {
              animation-delay: 2s;
            }
            @keyframes introRolesScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .intro-roles-scroll {
              animation: introRolesScroll 20s linear infinite;
              width: max-content;
            }
          `,
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        {/* Photo + Intro Header */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16">
          {/* Profile Photo */}
          <motion.div
            className="flex flex-col items-center flex-shrink-0 gap-5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-full opacity-60 blur-md" />
              <div className="absolute -inset-0.5 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-full opacity-80" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-gray-900">
                <img
                  src="/brandon.jpg"
                  alt="Brandon Stevenson"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* LinkedIn badges */}
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <a
                href="https://www.linkedin.com/in/brandonstevensonprograms/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A66C2] text-white text-xs font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-transform duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" />
                Personal
              </a>
              <a
                href="https://www.linkedin.com/company/plexura/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105 transition-transform duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" />
                Plexura
              </a>
              <a
                href="https://github.com/Programmer-stevenson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#24292e] text-white text-xs font-semibold shadow-lg shadow-gray-900/50 hover:shadow-gray-700/50 hover:scale-105 transition-transform duration-200"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Intro Text */}
          <div className="text-center lg:text-left flex-1">
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-teal-500" />
              <span className="text-teal-400 font-mono text-sm tracking-wider uppercase">About Me</span>
              <div className="w-12 h-[2px] bg-gradient-to-r from-teal-500 via-teal-500 to-transparent" />
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                I&apos;m Brandon Stevenson
              </span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A passionate <span className="text-teal-400 font-semibold">Tech Professional</span> and{' '}
              <span className="text-fuchsia-400 font-semibold">Entrepreneur</span> specializing in enterprise IT infrastructure, full-stack development, and digital marketing.
              I co-founded <span className="text-emerald-400 font-semibold">Plexura</span>, a full-service digital agency, while building a career in cloud and network engineering.
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I believe in relentless growth, moving fast, and turning technical skill into business impact. Whether it&apos;s configuring Enterprise Infrastructure, shipping client websites, or studying for my next certification — I&apos;m always building toward the next level.
            </motion.p>
          </div>
        </div>

        {/* Values row */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.label}
                className="group relative text-center p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/20 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className={`text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${value.gradient}`}>
                  {value.label}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Roles — desktop: static row, mobile: auto-scroll ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Desktop */}
          <div className="hidden sm:flex flex-wrap justify-center gap-4">
            {roleCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/50 hover:border-white/20 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} leading-tight`}>
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-snug mt-0.5 max-w-[220px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: auto-scroll ticker */}
          <div className="sm:hidden relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900/90 to-transparent z-10 pointer-events-none" />

            <div className="intro-roles-scroll flex">
              {[...roleCards, ...roleCards].map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={`${card.title}-${index}`}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 flex-shrink-0 mx-2"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} leading-tight whitespace-nowrap`}>
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 leading-snug mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Combining technical expertise with creative problem-solving to deliver
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 font-semibold"> innovative solutions</span> that drive business success
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;