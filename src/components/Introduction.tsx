import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Code2, Cloud } from 'lucide-react';

const roleCards = [
  {
    icon: Cpu,
    title: 'IT Administrator',
    description: 'Managing enterprise environments with Microsoft 365, Intune, and Azure infrastructure',
    gradient: 'from-teal-500 to-cyan-500',
    iconGradient: 'from-teal-500/20 to-cyan-500/20',
    borderHover: 'hover:border-teal-500/50',
  },
  {
    icon: Code2,
    title: 'Full-Stack Developer',
    description: 'Building modern web applications with React, Node.js, and cutting-edge technologies',
    gradient: 'from-cyan-500 to-blue-500',
    iconGradient: 'from-cyan-500/20 to-blue-500/20',
    borderHover: 'hover:border-cyan-500/50',
  },
  {
    icon: Cloud,
    title: 'Aspiring Cloud Engineer',
    description: 'Architecting scalable cloud solutions and automating infrastructure deployment',
    gradient: 'from-blue-500 to-purple-500',
    iconGradient: 'from-blue-500/20 to-purple-500/20',
    borderHover: 'hover:border-blue-500/50',
  },
];

const Introduction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900/80 to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        {/* Main intro text */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-teal-500" />
              <span className="text-teal-400 font-mono text-sm tracking-wider uppercase">Introduction</span>
              <div className="w-12 h-[2px] bg-gradient-to-r from-teal-500 via-teal-500 to-transparent" />
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              I'm Brandon Stevenson
            </span>
          </motion.h2>

          <motion.p
            className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A passionate <span className="text-teal-400 font-semibold">Tech Professional</span> specializing in cloud infrastructure, system administration, and full-stack development
          </motion.p>
        </div>

        {/* Role cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {roleCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className={`group relative ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 blur transition duration-500`}
                  whileHover={{ opacity: 1 }}
                />
                <div className={`relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 ${card.borderHover} transition-all duration-300`}>
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${card.iconGradient} rounded-xl flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7 text-teal-400" />
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                    {card.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Combining technical expertise with creative problem-solving to deliver
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 font-semibold"> innovative solutions</span> that drive business success
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
