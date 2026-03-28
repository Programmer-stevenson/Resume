import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Calendar,
  ChevronDown,
  Server,
  Shield,
  Cloud,
  Code2,
  Monitor,
  Smartphone,
  CheckCircle2,
  Building2,
  Award,
  Rocket,
  HardDrive,
  Palette
} from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: 'work' | 'education';
  description?: string;
  highlights: string[];
  skills?: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 'epc',
    title: 'IT Infrastructure Specialist',
    company: 'Executive Personal Computers, Inc.',
    location: 'Las Vegas, NV',
    period: 'Jan 2026 - Present',
    type: 'work',
    current: true,
    highlights: [
      'Configure, diagnose, test, and validate enterprise IT infrastructure across multi-vendor server platforms (Dell PowerEdge, HP ProLiant, Lenovo, Supermicro, Cisco UCS, IBM, Oracle), networking equipment, SAN storage arrays, and endpoint devices',
      'Execute certified data sanitization via Blancco Drive Eraser and CLI tooling in strict compliance with NIST 800-88, generating verified certificates of destruction for regulatory audit',
      'Drive full-lifecycle ITAD processing — intake, assessment, sanitization, functional testing, grading, and certified disposition or remarketing',
      'Restore and configure enterprise servers and network infrastructure to factory specifications leveraging out-of-band management (HP iLO 4, Dell iDRAC) and PuTTY serial console',
      'Execute full server rebuilds — OS reimaging, BIOS/UEFI firmware updates, RAID array configuration, drive pool initialization, and system health validation',
      'Perform component-level hardware replacements on rack-mount and tower servers — RAM, SSD/HDD, CPUs, PSUs, NICs, RAID controllers, backplanes',
      'Wipe, reset, and restore high-volume multi-vendor enterprise IT equipment — managed switches, routers, firewalls, access points, POS systems, and docking stations',
      'Maintain rigorous asset documentation — hardware specs, test results, erasure verification, chain-of-custody — within ERP and inventory systems',
    ],
    skills: ['Dell PowerEdge', 'HP ProLiant', 'Cisco UCS', 'Blancco', 'iLO 4', 'iDRAC', 'PuTTY', 'NIST 800-88', 'RAID'],
    icon: HardDrive,
    accentColor: 'rose',
  },
  {
    id: 'plexura',
    title: 'Technical Co-Founder',
    company: 'Plexura',
    location: 'Las Vegas, NV · Remote',
    period: 'Apr 2025 - Present',
    type: 'work',
    current: true,
    highlights: [
      'Lead technical strategy, architecture, and delivery for client web and mobile applications, logo design, graphic design, and digital marketing campaigns',
      'Oversee project execution, coding standards, and development team operations across the full software development lifecycle',
      'Build internal tooling and automations to streamline agency workflows and improve delivery efficiency',
      'Implement analytics, SEO, and marketing technology stacks for client campaigns to drive measurable growth',
      'Create and manage social media content, digital marketing assets, and brand presence across platforms',
      'Partner with Director of Strategy & Sales on client acquisition, proposals, brand positioning, partnerships, and business operations including budgeting and contracts',
    ],
    skills: ['React', 'Next.js', 'Node.js', 'Three.js', 'Tailwind CSS', 'MongoDB', 'SEO', 'Figma'],
    icon: Rocket,
    accentColor: 'fuchsia',
  },
  {
    id: 'macbid',
    title: 'IT Administrator',
    company: 'MAC.BID',
    location: 'Las Vegas, NV · Hybrid Remote',
    period: 'Nov 2024 - Nov 2025',
    type: 'work',
    highlights: [
      'Supported IT infrastructure across multiple offices, maintaining 99.5% uptime for enterprise operations',
      'Deployed and managed Microsoft Intune for device management and security across the organization',
      'Provided multi-platform technical support (Windows, macOS, iOS, Android) with 95% SLA compliance',
      'Managed Active Directory accounts, security groups, and user permissions',
      'Deployed software updates, patches, and security rollouts using Intune and Microsoft 365',
      'Negotiated with vendors for hardware procurement and licensing agreements',
      'Created comprehensive IT documentation and SOPs to ensure compliance and operational efficiency',
    ],
    skills: ['Microsoft Intune', 'Active Directory', 'Microsoft 365', 'Windows', 'macOS', 'iOS', 'Android'],
    icon: Server,
    accentColor: 'cyan',
  },
  {
    id: 'cdw',
    title: 'IT Technician',
    company: 'CDW',
    location: 'Las Vegas, NV',
    period: 'Apr 2024 - Nov 2024',
    type: 'work',
    highlights: [
      'Configured and imaged 200+ devices daily — Windows laptops (Lenovo, Dell, HP), MacBooks, desktops, tablets, and mobile devices — for enterprise client deployments',
      'Performed OS imaging and provisioning via PXE boot, USB boot media, Microsoft Autopilot, and Chrome White Glove enrollment across large-scale client orders',
      'Activated and configured Apple iPhones, Android devices, and tablets including MDM enrollment, email setup, app deployment, and carrier activation',
      'Serviced and configured high volumes of MacBooks and Windows/Lenovo laptops — firmware updates, user profile setup, domain joins, and client-specific application installs',
      'Applied BitLocker encryption, antivirus deployment, security policies, and Windows/macOS updates prior to shipping',
      'Provisioned devices using Autopilot, MECM, and various deployment methods according to client specifications for major enterprise accounts',
      'Installed operating systems, business applications, and security software on new and refreshed hardware',
      'Performed quality assurance testing and asset tagging to ensure all devices met strict client standards before deployment',
    ],
    skills: ['Intune', 'Autopilot', 'MECM', 'PXE Boot', 'Azure AD', 'Active Directory', 'BitLocker', 'Chrome White Glove', 'macOS', 'iOS', 'Android'],
    icon: Monitor,
    accentColor: 'emerald',
  },
  {
    id: 'wgu',
    title: 'Bachelor of Science in Cloud & Network Engineering',
    company: 'Western Governors University',
    location: 'Online',
    period: 'Expected Graduation: Fall 2027',
    type: 'education',
    current: true,
    highlights: [
      'Cloud architecture and infrastructure',
      'Network security and administration',
      'DevOps practices and automation',
    ],
    icon: Cloud,
    accentColor: 'violet',
  },
  {
    id: 'unlv',
    title: 'Management Information Systems',
    company: 'University of Nevada, Las Vegas',
    location: 'Las Vegas, NV',
    period: '',
    type: 'education',
    highlights: [
      'Built a foundation at the intersection of business strategy and technology, combining core business principles with hands-on technical training',
      'Coursework spanning database design (SQL, ER modeling), object-oriented programming (Java), systems analysis (Agile/Waterfall, SDLC), data analytics, IT project management, and IT business strategy',
    ],
    icon: Building2,
    accentColor: 'red',
  },
  {
    id: 'csn',
    title: 'Associate of Applied Science in Computing & IT',
    company: 'College of Southern Nevada',
    location: 'Las Vegas, NV',
    period: '',
    type: 'education',
    description: 'Software Programming Concentration',
    highlights: [
      'Java, C++, SQL, JavaScript, Python',
      'Networking fundamentals',
      'Security principles',
      'Cloud architecture basics',
    ],
    icon: Code2,
    accentColor: 'amber',
  },
];

const skillCategories = [
  {
    name: 'Languages',
    icon: Code2,
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'SQL', 'HTML', 'CSS'],
    color: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    shimmerColor: 'rgba(59, 130, 246, 0.15)',
    borderGradient: 'from-cyan-400 via-blue-500 to-cyan-400',
  },
  {
    name: 'Frontend',
    icon: Monitor,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'Three.js', 'WebGL', 'Responsive Design'],
    color: 'from-violet-500 to-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    shimmerColor: 'rgba(168, 85, 247, 0.15)',
    borderGradient: 'from-violet-400 via-purple-500 to-violet-400',
  },
  {
    name: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL', 'REST APIs', 'CI/CD'],
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    shimmerColor: 'rgba(20, 184, 166, 0.15)',
    borderGradient: 'from-emerald-400 via-teal-500 to-emerald-400',
  },
  {
    name: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: ['Azure', 'AWS', 'Microsoft 365', 'Intune', 'Autopilot', 'MECM', 'VPN', 'VoIP'],
    color: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    shimmerColor: 'rgba(249, 115, 22, 0.15)',
    borderGradient: 'from-amber-400 via-orange-500 to-amber-400',
  },
  {
    name: 'IT Administration',
    icon: Shield,
    skills: ['Active Directory', 'Device Management', 'Blancco', 'NIST 800-88', 'Network Administration', 'Firewall', 'RDP'],
    color: 'from-rose-500 to-pink-500',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    shimmerColor: 'rgba(236, 72, 153, 0.15)',
    borderGradient: 'from-rose-400 via-pink-500 to-rose-400',
  },
  {
    name: 'Platforms & Tools',
    icon: Smartphone,
    skills: ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Git', 'Jira', 'Adobe Creative Suite'],
    color: 'from-indigo-500 to-blue-500',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    shimmerColor: 'rgba(59, 130, 246, 0.15)',
    borderGradient: 'from-indigo-400 via-blue-500 to-indigo-400',
  },
  {
    name: 'Enterprise Hardware',
    icon: HardDrive,
    skills: ['Dell PowerEdge', 'HP ProLiant', 'Cisco UCS', 'iLO 4', 'iDRAC', 'RAID', 'SAN Storage', 'PuTTY'],
    color: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    shimmerColor: 'rgba(239, 68, 68, 0.15)',
    borderGradient: 'from-orange-400 via-red-500 to-orange-400',
  },
  {
    name: 'Design & Marketing',
    icon: Palette,
    skills: ['Figma', 'Graphic Design', 'Logo Design', 'SEO', 'UI/UX Design', 'Branding', 'Web Design'],
    color: 'from-pink-500 to-fuchsia-500',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    shimmerColor: 'rgba(217, 70, 239, 0.15)',
    borderGradient: 'from-pink-400 via-fuchsia-500 to-pink-400',
  },
];

const getAccentClasses = (color: string) => {
  const colors: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', shadow: 'rgba(6, 182, 212, 0.15)' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', shadow: 'rgba(16, 185, 129, 0.15)' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', shadow: 'rgba(139, 92, 246, 0.15)' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', shadow: 'rgba(245, 158, 11, 0.15)' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', shadow: 'rgba(244, 63, 94, 0.15)' },
    fuchsia: { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', shadow: 'rgba(217, 70, 239, 0.15)' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', shadow: 'rgba(239, 68, 68, 0.15)' },
  };
  return colors[color] || colors.cyan;
};

interface ExperienceCardProps {
  exp: Experience;
  index: number;
  isLeft: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, index, isLeft }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { 
    once: true,
    margin: '-30% 0px -30% 0px'
  });
  
  const accent = getAccentClasses(exp.accentColor);
  const Icon = exp.icon;

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex flex-col md:flex-row items-start gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      {/* Timeline Node */}
      <motion.div
        className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-2 ${accent.border} ${accent.bg} transform -translate-x-1/2 z-10`}
        animate={
          isCardInView 
            ? { scale: 1.3 }
            : { scale: 1 }
        }
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <motion.div
        className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
        animate={isCardInView ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className={`relative p-6 rounded-2xl bg-white/[0.02] border backdrop-blur-sm overflow-hidden transition-colors duration-500 ${
            isCardInView ? accent.border : 'border-white/10'
          }`}
          animate={{ 
            boxShadow: isCardInView 
              ? `0 0 40px 0 ${accent.shadow}` 
              : '0 0 0 0 rgba(0,0,0,0)'
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Glow Effect */}
          <motion.div 
            className={`absolute inset-0 ${accent.bg} pointer-events-none`}
            animate={{ opacity: isCardInView ? 0.5 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Header */}
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <motion.div 
                  className={`p-2 rounded-lg ${accent.bg} ${accent.border} border`}
                  animate={isCardInView ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-5 h-5 ${accent.text}`} />
                </motion.div>
                {exp.current && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                    Current
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                  {exp.type === 'work' ? 'Work' : 'Education'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {exp.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
                {exp.period && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                )}
              </div>
              {exp.description && (
                <p className="mt-2 text-sm text-gray-500">{exp.description}</p>
              )}
            </div>
            <motion.div
              animate={{ rotate: isCardInView ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isCardInView ? accent.text : 'text-gray-500'}`} />
            </motion.div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isCardInView && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-white/10">
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${accent.text} flex-shrink-0 mt-0.5`} />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {exp.skills && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium ${accent.bg} ${accent.text} border ${accent.border}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.03, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </motion.div>
  );
};

/* ── Shimmer keyframes injected once via a <style> tag ── */
const ShimmerStyles = () => (
  <style>{`
    @keyframes shimmer-slide {
      0% { transform: translateX(-100%) rotate(15deg); }
      100% { transform: translateX(200%) rotate(15deg); }
    }
    @keyframes border-rotate {
      0% { --angle: 0deg; }
      100% { --angle: 360deg; }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
    @keyframes float-particle {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
      50% { transform: translateY(-8px) scale(1.2); opacity: 0.7; }
    }
    .shimmer-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--shimmer-color, rgba(255,255,255,0.06)) 50%,
        transparent 100%
      );
      animation: shimmer-slide 4s ease-in-out infinite;
      pointer-events: none;
      z-index: 1;
    }
    .shimmer-card:hover::before {
      animation-duration: 2s;
    }
    .glow-border {
      position: relative;
    }
    .glow-border::after {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 1rem;
      padding: 1px;
      background: linear-gradient(
        var(--border-angle, 0deg),
        var(--glow-from, rgba(6, 182, 212, 0.5)),
        transparent 40%,
        transparent 60%,
        var(--glow-to, rgba(59, 130, 246, 0.5))
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      animation: border-rotate 6s linear infinite;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .glow-border:hover::after {
      opacity: 1;
    }
    .skill-pill {
      position: relative;
      overflow: hidden;
    }
    .skill-pill::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        var(--pill-shimmer, rgba(255,255,255,0.1)),
        transparent
      );
      transition: left 0.5s ease;
    }
    .skill-pill:hover::before {
      left: 100%;
    }
  `}</style>
);

interface SkillCardProps {
  category: typeof skillCategories[0];
  index: number;
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, index, hoveredSkill, setHoveredSkill }) => {
  const Icon = category.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="shimmer-card glow-border group relative rounded-2xl overflow-hidden"
      style={{
        '--shimmer-color': category.shimmerColor,
        '--glow-from': category.glowColor,
        '--glow-to': category.glowColor,
        '--border-angle': `${index * 45}deg`,
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        scale: 1.03,
        y: -4,
      }}
    >
      {/* Card background */}
      <div className="relative p-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl h-full">
        
        {/* Ambient glow on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-2xl pointer-events-none`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.06 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Floating particles (decorative dots) */}
        <div className="absolute top-3 right-3 flex gap-1.5 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-1 h-1 rounded-full bg-gradient-to-br ${category.color}`}
              style={{
                animation: `float-particle 3s ease-in-out ${i * 0.6}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Icon + Title row */}
        <div className="relative flex items-center gap-3 mb-5">
          <motion.div 
            className={`relative p-2.5 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
            style={{
              boxShadow: `0 4px 20px -4px ${category.glowColor}`,
            }}
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            <span className="text-xs text-gray-500">{category.skills.length} skills</span>
          </div>
        </div>

        {/* Skill pills */}
        <div className="relative flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <motion.span
              key={skill}
              className={`skill-pill px-3 py-1.5 rounded-lg text-sm font-medium cursor-default transition-all duration-300 border ${
                hoveredSkill === skill 
                  ? 'bg-white/15 border-white/25 text-white shadow-lg' 
                  : 'bg-white/[0.04] text-gray-300 border-white/[0.08]'
              }`}
              style={{
                '--pill-shimmer': category.shimmerColor,
                ...(hoveredSkill === skill ? { boxShadow: `0 0 20px -4px ${category.glowColor}` } : {}),
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ scale: 1.08, y: -2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.04 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.color}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.08, duration: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'experience' | 'skills'>('experience');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="about" className="min-h-screen py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      <ShimmerStyles />
      <div ref={ref} className="max-w-6xl mx-auto">
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
            About Me
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Background &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            IT professional and full-stack developer with a passion for building modern web experiences and managing enterprise infrastructure.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {(['experience', 'skills'] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === 'experience' ? <Briefcase className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'experience' ? (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/50 via-cyan-500/50 to-amber-500/50 transform md:-translate-x-1/2" />

                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <div key={exp.id}>
                      {exp.type === 'education' && (index === 0 || experiences[index - 1].type !== 'education') && (
                        <div id="education" className="scroll-mt-24" />
                      )}
                      <ExperienceCard 
                        exp={exp} 
                        index={index} 
                        isLeft={index % 2 === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {skillCategories.map((category, index) => (
                <SkillCard
                  key={category.name}
                  category={category}
                  index={index}
                  hoveredSkill={hoveredSkill}
                  setHoveredSkill={setHoveredSkill}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { label: 'Co-Founded Agency', value: 'Plexura', icon: Rocket },
            { label: 'Uptime Achieved', value: '99.5%', icon: Server },
            { label: 'Devices Configured', value: '10,000+', icon: Smartphone },
            { label: 'Years in IT', value: '3+', icon: Award },
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="relative p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center group overflow-hidden"
                whileHover={{ scale: 1.03, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <StatIcon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <motion.div 
                  className="text-2xl sm:text-3xl font-bold text-white mb-1"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;