import { useRef, useCallback, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Github,
  Globe,
  ArrowUpRight,
  Copy,
  Check,
  Send,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Subtle magnetic effect — reserved for the single primary CTA       */
/* ------------------------------------------------------------------ */
const useMagnetic = (strength = 0.25) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 18, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { springX, springY, handleMouse, handleMouseLeave };
};

/* ------------------------------------------------------------------ */
/*  Contact data                                                       */
/* ------------------------------------------------------------------ */
interface ContactItem {
  id: string;
  icon: React.ElementType;
  label: string;
  value: string;
  meta: string;
  href: string | null;
  copyable: boolean;
}

const contactInfo: ContactItem[] = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'brandon.stevensonn@outlook.com',
    meta: 'Primary — fastest response',
    href: 'mailto:brandon.stevensonn@outlook.com',
    copyable: true,
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone',
    value: '(725) 314-2660',
    meta: 'Call or text',
    href: 'tel:+17253142660',
    copyable: true,
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/brandonstevensonprograms',
    meta: 'Professional network',
    href: 'https://www.linkedin.com/in/brandonstevensonprograms',
    copyable: false,
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    value: 'Programmer-stevenson',
    meta: 'Code & projects',
    href: 'https://github.com/Programmer-stevenson',
    copyable: false,
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'Location',
    value: 'Las Vegas, Nevada',
    meta: 'Open to remote & on-site',
    href: null,
    copyable: false,
  },
];

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/brandonstevensonprograms', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Programmer-stevenson', label: 'GitHub' },
  { icon: Globe, href: 'https://brandons-resume.com', label: 'Website' },
];

/* ------------------------------------------------------------------ */
/*  A single row in the contact ledger                                 */
/* ------------------------------------------------------------------ */
const ContactRow = ({
  item,
  index,
  isInView,
}: {
  item: ContactItem;
  index: number;
  isInView: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const Wrapper: React.ElementType = item.href ? 'a' : 'div';
  const linkProps = item.href
    ? {
        href: item.href,
        target: item.href.startsWith('http') ? '_blank' : undefined,
        rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Wrapper
        {...linkProps}
        className={`group/row relative flex items-center gap-5 px-5 sm:px-6 py-5 ${
          item.href ? 'cursor-pointer' : ''
        }`}
      >
        {/* animated left accent bar */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[2px] bg-gradient-to-b from-teal-400 to-cyan-500 transition-all duration-300 group-hover/row:h-2/3" />

        {/* hover wash */}
        <span className="absolute inset-0 bg-gradient-to-r from-teal-500/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover/row:opacity-100" />

        {/* icon */}
        <div className="relative shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-teal-300 transition-all duration-300 group-hover/row:border-teal-400/30 group-hover/row:bg-teal-400/10 group-hover/row:text-teal-200">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
        </div>

        {/* text */}
        <div className="relative min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
            {item.label}
          </div>
          <div className="truncate text-[15px] font-medium text-gray-100 transition-colors duration-300 group-hover/row:text-white">
            {item.value}
          </div>
          <div className="mt-0.5 truncate text-xs text-gray-600">{item.meta}</div>
        </div>

        {/* action */}
        <div className="relative flex shrink-0 items-center gap-2">
          {item.copyable && (
            <button
              onClick={handleCopy}
              aria-label={`Copy ${item.label}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition-all duration-200 hover:border-teal-400/40 hover:text-teal-300 active:scale-90"
            >
              {copied ? (
                <Check className="h-4 w-4 text-teal-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
          {item.href && (
            <ArrowUpRight className="h-5 w-5 text-gray-600 transition-all duration-300 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-teal-300" />
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */
const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { springX, springY, handleMouse, handleMouseLeave } = useMagnetic(0.2);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#070709] px-4 py-24 sm:px-6 sm:py-32"
    >
      {/* embedded display font + tokens */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        .contact-display { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* ---------- atmospheric background ---------- */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft corner glow */}
        <div className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-teal-500/10 blur-[160px]" />
        <div className="absolute -bottom-48 -left-40 h-[560px] w-[560px] rounded-full bg-cyan-600/[0.07] blur-[150px]" />
        {/* fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 80% at 50% 40%, black 40%, transparent 100%)',
          }}
        />
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ============== LEFT : headline block ============== */}
          <div className="lg:col-span-5">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2.5 rounded-full border border-teal-500/20 bg-teal-500/[0.06] px-3.5 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
              </span>
              <span className="text-xs font-medium tracking-wide text-teal-300">
                Available for opportunities
              </span>
            </motion.div>

            <motion.h2
              {...fadeUp(0.08)}
              className="contact-display mt-7 text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Let&apos;s
              <br />
              <span className="bg-gradient-to-br from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                connect.
              </span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-6 max-w-md text-base leading-relaxed text-gray-400 sm:text-lg"
            >
              Whether you&apos;re scaling infrastructure, shipping a product, or
              hiring for your team — I&apos;d love to hear what you&apos;re building.
            </motion.p>

            {/* primary CTA — the one magnetic element */}
            <motion.div {...fadeUp(0.24)} className="mt-9">
              <motion.a
                href="mailto:brandon.stevensonn@outlook.com"
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
                style={{ x: springX, y: springY }}
                whileTap={{ scale: 0.97 }}
                className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 px-7 py-4 font-semibold text-[#04110f] shadow-[0_8px_40px_-8px_rgba(45,212,191,0.5)] transition-shadow duration-300 hover:shadow-[0_12px_50px_-6px_rgba(45,212,191,0.65)]"
              >
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
                  aria-hidden
                />
                <Send className="relative h-5 w-5" strokeWidth={2} />
                <span className="relative">Start a conversation</span>
              </motion.a>
            </motion.div>

            {/* response time + socials */}
            <motion.div
              {...fadeUp(0.32)}
              className="mt-10 flex flex-col gap-6 border-t border-white/5 pt-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600">
                  Response time
                </span>
                <span className="h-px flex-1 bg-white/5" />
                <span className="text-sm font-medium text-teal-300">Within 24 hours</span>
              </div>

              <div className="flex items-center gap-3">
                {socials.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-300"
                    >
                      <SIcon className="h-5 w-5" strokeWidth={1.75} />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ============== RIGHT : contact ledger ============== */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
            >
              {/* top sheen */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* panel header */}
              <div className="flex items-center justify-between px-5 py-5 sm:px-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
                    Direct channels
                  </div>
                  <div className="contact-display mt-1 text-xl font-bold text-white">
                    Reach me directly
                  </div>
                </div>
                <div className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  <span className="text-[11px] font-medium text-gray-400">Online</span>
                </div>
              </div>

              {/* rows */}
              <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                {contactInfo.map((item, i) => (
                  <ContactRow key={item.id} item={item} index={i} isInView={isInView} />
                ))}
              </div>
            </motion.div>

            {/* small footnote */}
            <motion.p
              {...fadeUp(0.7)}
              className="mt-5 text-center text-xs text-gray-600 lg:text-right"
            >
              Prefer email? Hit{' '}
              <span className="font-medium text-gray-400">Start a conversation</span> — it opens
              a pre-addressed draft.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;