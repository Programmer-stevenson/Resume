import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Rocket,
  HardDrive,
  Palette,
  ArrowUpRight,
  MousePointerClick,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & data                                                       */
/* ------------------------------------------------------------------ */
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
    accent: '#22d3ee',
  },
  {
    name: 'Frontend',
    icon: Monitor,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'Three.js', 'WebGL', 'Responsive Design'],
    accent: '#a78bfa',
  },
  {
    name: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL', 'REST APIs', 'CI/CD'],
    accent: '#34d399',
  },
  {
    name: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: ['Azure', 'AWS', 'Microsoft 365', 'Intune', 'Autopilot', 'MECM', 'VPN', 'VoIP'],
    accent: '#fbbf24',
  },
  {
    name: 'IT Administration',
    icon: Shield,
    skills: ['Active Directory', 'Device Management', 'Blancco', 'NIST 800-88', 'Network Administration', 'Firewall', 'RDP'],
    accent: '#fb7185',
  },
  {
    name: 'Platforms & Tools',
    icon: Smartphone,
    skills: ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Git', 'Jira', 'Adobe Creative Suite'],
    accent: '#818cf8',
  },
  {
    name: 'Enterprise Hardware',
    icon: HardDrive,
    skills: ['Dell PowerEdge', 'HP ProLiant', 'Cisco UCS', 'iLO 4', 'iDRAC', 'RAID', 'SAN Storage', 'PuTTY'],
    accent: '#f97316',
  },
  {
    name: 'Design & Marketing',
    icon: Palette,
    skills: ['Figma', 'Graphic Design', 'Logo Design', 'SEO', 'UI/UX Design', 'Branding', 'Web Design'],
    accent: '#ec4899',
  },
];

/* ------------------------------------------------------------------ */
/*  Accent system (restrained — neutral glass base + single hue)       */
/* ------------------------------------------------------------------ */
const ACCENTS: Record<string, { hex: string; text: string }> = {
  rose: { hex: '#fb7185', text: 'text-rose-300' },
  fuchsia: { hex: '#e879f9', text: 'text-fuchsia-300' },
  cyan: { hex: '#22d3ee', text: 'text-cyan-300' },
  emerald: { hex: '#34d399', text: 'text-emerald-300' },
  violet: { hex: '#a78bfa', text: 'text-violet-300' },
  amber: { hex: '#fbbf24', text: 'text-amber-300' },
};
const getAccent = (c: string) => ACCENTS[c] ?? ACCENTS.cyan;

/* ------------------------------------------------------------------ */
/*  Detail panel (shared by desktop pane + mobile accordion)           */
/* ------------------------------------------------------------------ */
const RoleDetail: React.FC<{ exp: Experience }> = ({ exp }) => {
  const accent = getAccent(exp.accentColor);
  const Icon = exp.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 backdrop-blur-sm">
      {/* top sheen in accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.hex}66, transparent)` }}
      />
      {/* faint corner glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-20"
        style={{ background: accent.hex }}
      />

      <div className="relative">
        {/* header */}
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
            style={{ borderColor: `${accent.hex}40`, background: `${accent.hex}14` }}
          >
            <Icon className={`h-6 w-6 ${accent.text}`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
                {exp.type === 'work' ? 'Experience' : 'Education'}
              </span>
              {exp.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Current
                </span>
              )}
            </div>
            <h3 className="about-display text-xl font-bold leading-tight text-white sm:text-2xl">
              {exp.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {exp.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {exp.location}
              </span>
              {exp.period && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {exp.period}
                </span>
              )}
            </div>
            {exp.description && <p className="mt-2 text-sm text-gray-500">{exp.description}</p>}
          </div>
        </div>

        {/* highlights */}
        <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
              <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* skills */}
        {exp.skills && (
          <div className="mt-6 flex flex-wrap gap-2">
            {exp.skills.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-gray-300"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Left-rail list item                                                */
/* ------------------------------------------------------------------ */
const RoleListItem: React.FC<{
  exp: Experience;
  active: boolean;
  mobileOpen: boolean;
  onSelect: () => void;
}> = ({ exp, active, mobileOpen, onSelect }) => {
  const accent = getAccent(exp.accentColor);
  const Icon = exp.icon;

  return (
    <button
      onClick={onSelect}
      className={`group relative w-full overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all duration-300 ${
        active
          ? 'border-white/20 bg-white/[0.05]'
          : 'border-white/[0.08] bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.03]'
      }`}
    >
      {/* active accent bar */}
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transition-all duration-300"
        style={{
          width: '3px',
          height: active ? '62%' : '0%',
          background: accent.hex,
        }}
      />
      <div className="flex items-center gap-3.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300"
          style={{
            borderColor: active ? `${accent.hex}40` : 'rgba(255,255,255,0.08)',
            background: active ? `${accent.hex}14` : 'rgba(255,255,255,0.02)',
          }}
        >
          <Icon className={`h-5 w-5 ${active ? accent.text : 'text-gray-500'}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className={`truncate text-sm font-semibold ${active ? 'text-white' : 'text-gray-300'}`}>
            {exp.title}
          </div>
          <div className="truncate text-xs text-gray-500">
            {exp.company}
            {exp.period ? ` · ${exp.period}` : ''}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {exp.current && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
          {/* mobile chevron */}
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform duration-300 lg:hidden ${
              mobileOpen ? 'rotate-180' : ''
            }`}
          />
          {/* desktop arrow */}
          <ArrowUpRight
            className={`hidden h-4 w-4 transition-all duration-300 lg:block ${
              active ? `${accent.text} translate-x-0` : 'text-gray-600 group-hover:text-gray-400'
            }`}
          />
        </div>
      </div>
    </button>
  );
};

/* ------------------------------------------------------------------ */
/*  Skill card (cohesive dark glass)                                   */
/* ------------------------------------------------------------------ */
const SkillCard: React.FC<{
  category: (typeof skillCategories)[0];
  index: number;
  hoveredSkill: string | null;
  setHoveredSkill: (s: string | null) => void;
}> = ({ category, index, hoveredSkill, setHoveredSkill }) => {
  const Icon = category.icon;
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)` }}
      />
      {/* corner glow on hover */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ background: category.accent }}
      />

      <div className="relative mb-5 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ borderColor: `${category.accent}33`, background: `${category.accent}12` }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="about-display text-base font-bold text-white">{category.name}</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
            {category.skills.length} skills
          </span>
        </div>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {category.skills.map((skill) => {
          const hot = hoveredSkill === skill;
          return (
            <span
              key={skill}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="cursor-default rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-200"
              style={{
                borderColor: hot ? `${category.accent}66` : 'rgba(255,255,255,0.08)',
                background: hot ? `${category.accent}1f` : 'rgba(255,255,255,0.03)',
                color: hot ? '#fff' : '#d1d5db',
              }}
            >
              {skill}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */
const AboutSpaceBackground = () => {
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

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'experience' | 'skills'>('experience');
  const [selectedId, setSelectedId] = useState<string>('epc');
  const [mobileOpen, setMobileOpen] = useState<string | null>('epc');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const workItems = experiences.filter((e) => e.type === 'work');
  const eduItems = experiences.filter((e) => e.type === 'education');
  const selectedExp = experiences.find((e) => e.id === selectedId) ?? experiences[0];

  const groups = [
    { label: 'Experience', anchor: undefined as string | undefined, items: workItems },
    { label: 'Education', anchor: 'education', items: eduItems },
  ];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileOpen((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04140e] via-[#0a0a16] to-[#150a1e] px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* display font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&display=swap');
        .about-display { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* atmospheric background */}
      <AboutSpaceBackground />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        {/* header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">
            About Me
          </span>
          <h2 className="about-display mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Background &amp;{' '}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg">
            Network &amp; infrastructure IT professional and full-stack developer — building
            enterprise systems and modern web experiences.
          </p>
        </motion.div>

        {/* tab switcher */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-sm">
            {(['experience', 'skills'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-xl px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="aboutActiveTab"
                    className="absolute inset-0 rounded-xl border border-teal-400/30 bg-gradient-to-r from-teal-500/20 to-cyan-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === 'experience' ? <Briefcase className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
                  {tab[0].toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* click-to-explore CTA (experience only) */}
        <AnimatePresence>
          {activeTab === 'experience' && (
            <motion.div
              key="exp-cta"
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-400/20 bg-teal-500/[0.06] px-4 py-2 text-sm text-teal-200">
                <MousePointerClick className="h-4 w-4" />
                <span className="lg:hidden">Tap a role to see the full breakdown</span>
                <span className="hidden lg:inline">Select a role to explore the full breakdown</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* content */}
        <AnimatePresence mode="wait">
          {activeTab === 'experience' ? (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="lg:grid lg:grid-cols-12 lg:gap-8"
            >
              {/* LEFT: role list */}
              <div className="space-y-8 lg:col-span-5">
                {groups.map((group) => (
                  <div key={group.label}>
                    <div
                      id={group.anchor}
                      className={`mb-3 flex items-center gap-3 ${group.anchor ? 'scroll-mt-24' : ''}`}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                        {group.label}
                      </span>
                      <span className="h-px flex-1 bg-white/[0.07]" />
                    </div>

                    <div className="space-y-2.5">
                      {group.items.map((exp) => (
                        <div key={exp.id}>
                          <RoleListItem
                            exp={exp}
                            active={selectedId === exp.id}
                            mobileOpen={mobileOpen === exp.id}
                            onSelect={() => handleSelect(exp.id)}
                          />
                          {/* mobile inline detail */}
                          <div className="lg:hidden">
                            <AnimatePresence initial={false}>
                              {mobileOpen === exp.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-2.5">
                                    <RoleDetail exp={exp} />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: sticky detail (desktop) */}
              <div className="hidden lg:col-span-7 lg:block">
                <div className="sticky top-24">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedExp.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <RoleDetail exp={selectedExp} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
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
      </div>
    </section>
  );
};

export default About;