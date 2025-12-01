import React, { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Award, ChevronRight, Zap, Target, TrendingUp, Lock, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  code: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  skills: string[];
  gradient: string;
  glowColor: string;
  progress?: number;
  estimatedCompletion?: string;
}

const certifications: Certification[] = [
  {
    id: 'aplus',
    name: 'CompTIA A+',
    code: 'A+',
    status: 'in-progress',
    description: 'Hardware, software, and troubleshooting fundamentals for IT professionals',
    skills: ['Hardware', 'Software', 'Troubleshooting', 'Networking Basics'],
    gradient: 'from-teal-400 to-emerald-500',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    progress: 65,
    estimatedCompletion: 'Q1 2026',
  },
  {
    id: 'nplus',
    name: 'Network+',
    code: 'N+',
    status: 'upcoming',
    description: 'Network infrastructure, operations, and security fundamentals',
    skills: ['Network Architecture', 'Protocols', 'Security', 'Troubleshooting'],
    gradient: 'from-blue-400 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    estimatedCompletion: 'Q2 2026',
  },
  {
    id: 'splus',
    name: 'Security+',
    code: 'S+',
    status: 'upcoming',
    description: 'Cybersecurity fundamentals, threats, and best practices',
    skills: ['Threat Analysis', 'Risk Management', 'Cryptography', 'Compliance'],
    gradient: 'from-purple-400 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    estimatedCompletion: 'Q3 2026',
  },
];

const roadmapItems = [
  { id: 'aplus', code: 'A+', name: 'CompTIA A+', status: 'in-progress', gradient: 'from-teal-400 to-emerald-500', glowColor: 'rgba(20, 184, 166, 0.5)', category: 'Foundation' },
  { id: 'nplus', code: 'N+', name: 'Network+', status: 'upcoming', gradient: 'from-blue-400 to-cyan-500', glowColor: 'rgba(59, 130, 246, 0.5)', category: 'Foundation' },
  { id: 'splus', code: 'S+', name: 'Security+', status: 'upcoming', gradient: 'from-purple-400 to-pink-500', glowColor: 'rgba(168, 85, 247, 0.5)', category: 'Foundation' },
  { id: 'lpi', code: 'LPI', name: 'LPI Linux Essentials', status: 'upcoming', gradient: 'from-orange-400 to-red-500', glowColor: 'rgba(251, 146, 60, 0.5)', category: 'Linux' },
  { id: 'az900', code: 'AZ-900', name: 'Azure Fundamentals', status: 'upcoming', gradient: 'from-sky-400 to-blue-500', glowColor: 'rgba(56, 189, 248, 0.5)', category: 'Azure' },
  { id: 'az104', code: 'AZ-104', name: 'Azure Administrator', status: 'upcoming', gradient: 'from-indigo-400 to-violet-500', glowColor: 'rgba(129, 140, 248, 0.5)', category: 'Azure' },
  { id: 'az305', code: 'AZ-305', name: 'Azure Solutions Architect', status: 'upcoming', gradient: 'from-violet-400 to-fuchsia-500', glowColor: 'rgba(167, 139, 250, 0.5)', category: 'Azure' },
];

// 3D Tilt Card Component
interface CertCardProps {
  cert: Certification;
  index: number;
}

const CertCard: React.FC<CertCardProps> = ({ cert, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const getStatusIcon = () => {
    switch (cert.status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'in-progress': return <Zap className="w-5 h-5 text-amber-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusLabel = () => {
    switch (cert.status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Upcoming';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-2 rounded-3xl blur-xl"
        style={{ background: cert.glowColor }}
        animate={{ opacity: isHovered ? 0.6 : 0.2 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        animate={{ 
          borderColor: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Gradient Bar */}
        <div className={`h-1.5 bg-gradient-to-r ${cert.gradient}`} />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${cert.gradient} rounded-full blur-3xl`}
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.3, 0.5, 0.3] : 0.2 
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />
        </div>

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center shadow-lg`}
              style={{ transform: 'translateZ(20px)' }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-white font-black text-lg">{cert.code}</span>
            </motion.div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              {getStatusIcon()}
              <span className="text-sm font-medium text-gray-300">{getStatusLabel()}</span>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-2xl font-bold text-white mb-2">{cert.name}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{cert.description}</p>

          {/* Progress Bar (for in-progress) */}
          {cert.status === 'in-progress' && cert.progress && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-400">Progress</span>
                <span className="text-xs font-bold text-white">{cert.progress}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${cert.gradient} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cert.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Key Skills</p>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-lg border border-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {cert.estimatedCompletion && (
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">Target: {cert.estimatedCompletion}</span>
              </div>
            )}
            <motion.button
              className={`flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${cert.gradient} bg-clip-text text-transparent`}
              whileHover={{ x: 5 }}
            >
              View Details <ArrowRight className="w-4 h-4" style={{ color: 'currentColor' }} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Interactive Roadmap Node
interface RoadmapNodeProps {
  item: typeof roadmapItems[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ item, index, isActive, onClick }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={nodeRef}
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      {/* Connection Line to Next */}
      {index < roadmapItems.length - 1 && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-1rem)] h-0.5">
          <motion.div
            className={`h-full rounded-full ${item.status === 'in-progress' || item.status === 'completed' ? `bg-gradient-to-r ${item.gradient}` : 'bg-gray-700'}`}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      )}

      {/* Node */}
      <motion.div
        className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isActive ? 'scale-110' : ''
        }`}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={isActive ? {
          boxShadow: `0 0 30px ${item.glowColor}`
        } : {}}
      >
        {/* Glow Ring for Active/In-Progress */}
        {(item.status === 'in-progress' || isActive) && (
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient}`}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: 'blur(8px)' }}
          />
        )}

        <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg border-2 ${
          item.status === 'upcoming' ? 'border-white/20 opacity-60 grayscale-[30%]' : 'border-white/30'
        }`}>
          {item.status === 'upcoming' && (
            <div className="absolute inset-0 rounded-2xl bg-gray-900/40 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white/50" />
            </div>
          )}
          {item.status !== 'upcoming' && (
            <span className="text-white font-black text-sm">{item.code}</span>
          )}
          
          {/* Checkmark for completed */}
          {item.status === 'completed' && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-gray-900"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.5 }}
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
            </motion.div>
          )}

          {/* Pulse for in-progress */}
          {item.status === 'in-progress' && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center border-2 border-gray-900"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Label */}
      <motion.div 
        className="mt-4 text-center"
        animate={{ opacity: isActive ? 1 : 0.7 }}
      >
        <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-300'}`}>{item.name}</p>
        <p className={`text-xs mt-1 ${
          item.status === 'in-progress' ? 'text-amber-400' : 
          item.status === 'completed' ? 'text-emerald-400' : 'text-gray-500'
        }`}>
          {item.status === 'in-progress' ? 'In Progress' : 
           item.status === 'completed' ? 'Completed' : 'Upcoming'}
        </p>
      </motion.div>

      {/* Category Badge */}
      <motion.span
        className="absolute -bottom-8 px-2 py-0.5 text-[10px] font-medium bg-white/5 text-gray-500 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {item.category}
      </motion.span>
    </motion.div>
  );
};

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeRoadmapItem, setActiveRoadmapItem] = useState<string>('aplus');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = ['Foundation', 'Linux', 'Azure'];

  return (
    <section 
      id="certifications" 
      className="min-h-screen py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-gray-300">Professional Development</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Certifications &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">
              Roadmap
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Building a strong foundation in IT infrastructure, cloud computing, and cybersecurity through industry-recognized certifications.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: 'In Progress', value: '1', icon: Zap, color: 'text-amber-400' },
            { label: 'Planned', value: '6', icon: Target, color: 'text-blue-400' },
            { label: 'Goal Year', value: '2027', icon: TrendingUp, color: 'text-emerald-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center group overflow-hidden"
              whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {certifications.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>

        {/* Certification Roadmap */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {/* Roadmap Container */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/10 to-blue-900/20" />
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl" />
            
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(90deg, rgba(168,85,247,0.4), rgba(59,130,246,0.4), rgba(20,184,166,0.4), rgba(168,85,247,0.4))',
                backgroundSize: '300% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[1px] rounded-3xl bg-gray-900/95" />

            {/* Content */}
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎯
                    </motion.span>
                    Certification Roadmap
                  </h3>
                  <p className="text-gray-400">Click on any certification to learn more</p>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        hoveredCategory === cat 
                          ? 'bg-white/10 text-white border-white/30' 
                          : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                      } border`}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Roadmap Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-4">
                {roadmapItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    animate={{
                      opacity: hoveredCategory && hoveredCategory !== item.category ? 0.3 : 1,
                      scale: hoveredCategory && hoveredCategory !== item.category ? 0.95 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <RoadmapNode
                      item={item}
                      index={index}
                      isActive={activeRoadmapItem === item.id}
                      onClick={() => setActiveRoadmapItem(item.id)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Selected Item Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoadmapItem}
                  className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {(() => {
                    const item = roadmapItems.find(i => i.id === activeRoadmapItem);
                    if (!item) return null;
                    return (
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <span className="text-white font-black text-xl">{item.code}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                          <p className="text-gray-400 text-sm mb-3">
                            {item.category === 'Foundation' && 'Core IT certification providing essential knowledge for any IT career path.'}
                            {item.category === 'Linux' && 'Linux administration and command-line expertise for server management.'}
                            {item.category === 'Azure' && 'Microsoft Azure cloud platform certification for cloud architecture and administration.'}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400' :
                              item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {item.status === 'in-progress' ? 'In Progress' : 
                               item.status === 'completed' ? 'Completed' : 'Upcoming'}
                            </span>
                            <span className="text-xs text-gray-500">Category: {item.category}</span>
                          </div>
                        </div>
                        <motion.button
                          className={`px-6 py-3 rounded-xl bg-gradient-to-r ${item.gradient} text-white font-semibold flex items-center gap-2`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <a href='https://www.comptia.org/en-us/certifications/a/' target='_blank'>Learn More</a><ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;