import { useRef, useCallback, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, ArrowUpRight, Copy, Check } from 'lucide-react';

// Magnetic effect hook
const useMagnetic = (strength = 0.3) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { springX, springY, handleMouse, handleMouseLeave };
};

// 3D Tilt Card
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated Background
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient orbs */}
    <motion.div
      className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-[150px]"
      animate={{
        scale: [1, 1.3, 1],
        x: [0, 50, 0],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px]"
      animate={{
        scale: [1.2, 1, 1.2],
        x: [0, -30, 0],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    />

    {/* Floating particles */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-teal-400/50 rounded-full"
        style={{
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: 'easeInOut',
        }}
      />
    ))}

    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }}
    />
  </div>
);

// Contact Card Component
const ContactCard = ({
  icon: Icon,
  label,
  value,
  href,
  gradient,
  index,
  isInView,
  copyable,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string | null;
  gradient: string;
  index: number;
  isInView: boolean;
  copyable?: boolean;
}) => {
  const { springX, springY, handleMouse, handleMouseLeave } = useMagnetic(0.3);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CardWrapper = href ? motion.a : motion.div;
  const linkProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {};

  return (
    <TiltCard className="h-full">
      <CardWrapper
        {...linkProps}
        className={`group relative block h-full p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20 ${
          href ? 'cursor-pointer' : ''
        }`}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.15 * index,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        whileHover={{ y: -5 }}
      >
        {/* Gradient glow on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 rounded-3xl`}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, transparent 40%, rgba(45, 212, 191, 0.1) 50%, transparent 60%)`,
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <motion.div
            className={`w-16 h-16 mb-6 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* Icon shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              initial={{ x: '-150%' }}
              whileHover={{ x: '150%' }}
              transition={{ duration: 0.6 }}
            />
            <Icon className="w-7 h-7 text-white relative z-10" />
          </motion.div>

          {/* Label */}
          <span className="text-gray-400 text-sm font-medium mb-2 tracking-wide uppercase">
            {label}
          </span>

          {/* Value */}
          <span className="text-white text-lg sm:text-xl font-semibold group-hover:text-teal-300 transition-colors duration-300 break-all">
            {value}
          </span>

          {/* Footer with action indicator */}
          <div className="mt-auto pt-6 flex items-center justify-between">
            {copyable && (
              <motion.button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-teal-400" />
                    <span className="text-teal-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            )}

            {href && (
              <motion.div
                className="flex items-center gap-1 text-gray-500 group-hover:text-teal-400 transition-colors ml-auto"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                <span className="text-sm">
                  {href.startsWith('mailto') ? 'Send email' : href.startsWith('tel') ? 'Call now' : 'Visit'}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Corner accent */}
        <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${gradient} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />
      </CardWrapper>
    </TiltCard>
  );
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'brandon.stevensonn@outlook.com',
    href: 'mailto:brandon.stevensonn@outlook.com',
    gradient: 'from-teal-500 to-emerald-500',
    copyable: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(725) 314-2660',
    href: 'tel:+17253142660',
    gradient: 'from-cyan-500 to-teal-500',
    copyable: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Brandon Stevenson',
    href: 'https://www.linkedin.com/in/brandon-s-041069330',
    gradient: 'from-blue-500 to-cyan-500',
    copyable: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Las Vegas, Nevada',
    href: null,
    gradient: 'from-purple-500 to-blue-500',
    copyable: false,
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-[#0a0a0f] flex items-center overflow-hidden"
    >
      <AnimatedBackground />

      <div ref={ref} className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="text-teal-400 text-sm font-medium">Available for opportunities</span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-white">Get In </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Touch
              </span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 12"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.path
                  d="M0 6 Q50 0 100 6 T200 6"
                  fill="none"
                  stroke="url(#underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's connect and discuss how we can work together on your next project.
          </motion.p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {contactInfo.map((item, index) => (
            <ContactCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              href={item.href}
              gradient={item.gradient}
              index={index}
              isInView={isInView}
              copyable={item.copyable}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-500">
            I typically respond within <span className="text-teal-400 font-medium">24 hours</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;