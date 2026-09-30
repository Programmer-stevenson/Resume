import { useState, useEffect, useRef } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SaturnBackground from './SaturnBackground';

// Requires public/textures/space-bg2.jpg and your existing SaturnBackground.
// Seeded positions stay identical across renders, resize, and hydration.
const STARS = Array.from({ length: 64 }, (_, i) => {
  const random = (salt: number) => {
    const n = Math.sin((i + 1) * 127.1 + salt * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const bright = i % 3 === 0;
  return {
    left: `${2 + random(1) * 96}%`,
    top: `${2 + random(2) * 94}%`,
    size: bright ? 3 + random(3) * 1.5 : 1.6 + random(3) * 1.6,
    duration: `${2.2 + random(4) * 2.8}s`,
    delay: `${-random(5) * 12}s`,
    low: 0.08 + random(6) * 0.08,
    high: bright ? 1 : 0.85 + random(7) * 0.15,
    color: i % 4 === 0 ? '#b8d9ff' : '#e6efff',
    bright,
  };
});

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  const [starsActive, setStarsActive] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setShowContent(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let inView = true;
    const update = () => setStarsActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(section);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/textures/space-bg2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        touchAction: 'pan-y pinch-zoom',
        isolation: 'isolate',
      }}
    >
      <style>{`
        #home .bs-space-stars {
          position: absolute; inset: 0; overflow: hidden;
          pointer-events: none; z-index: 3;
        }
        #home .bs-space-star {
          position: absolute; display: block; border-radius: 50%;
          background: var(--star-color);
          opacity: var(--star-low);
          animation: bs-space-twinkle var(--star-duration) ease-in-out var(--star-delay) infinite;
        }
        #home .bs-space-star--bright {
          background: #ffffff;
          box-shadow: 0 0 5px 1px rgba(195,225,255,.85);
        }
        #home .bs-space-star--bright::before,
        #home .bs-space-star--bright::after {
          content: ''; position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        #home .bs-space-star--bright::before {
          width: 14px; height: 18px;
          background: linear-gradient(135deg, #d6ecff, #ffffff 48%, #b5d7ff);
          clip-path: polygon(50% 0%, 59% 40%, 100% 50%, 59% 60%, 50% 100%, 41% 60%, 0% 50%, 41% 40%);
        }
        #home .bs-space-star--bright::after {
          width: 20px; height: 20px;
          background: radial-gradient(circle, rgba(220,240,255,.65) 0%, rgba(155,201,255,.2) 30%, transparent 70%);
        }
        #home .bs-space-stars[data-active="false"] .bs-space-star {
          animation-play-state: paused;
        }
        @keyframes bs-space-twinkle {
          0%, 100% { opacity: var(--star-low); transform: scale(.65); }
          45% { opacity: var(--star-high); transform: scale(1.4); }
          70% { opacity: var(--star-low); transform: scale(.95); }
        }
        @media (max-width: 767px) {
          #home .bs-space-star:nth-child(n + 37) { display: none; animation: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          #home .bs-space-star { animation: none; opacity: var(--star-high); }
        }
      `}</style>

      {/* Foreground sparkles remain visible above the Saturn canvas. */}
      <div className="bs-space-stars" data-active={starsActive} aria-hidden="true">
        {STARS.map((star, i) => (
          <span
            key={i}
            className={`bs-space-star${star.bright ? ' bs-space-star--bright' : ''}`}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              '--star-color': star.color,
              '--star-low': star.low,
              '--star-high': star.high,
              '--star-duration': star.duration,
              '--star-delay': star.delay,
            } as CSSProperties}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <SaturnBackground />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 pt-20">
        <div className="mb-[10px]">
          <div className="h-[48px] sm:h-[56px] md:h-[64px] lg:h-[96px] xl:h-[112px]" aria-hidden="true" />
        </div>

        <motion.div
          className="relative w-full max-w-md mx-auto py-4 mb-8 mt-[50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.5 }}
        >
          <div className="h-[32px] sm:h-[36px]" aria-hidden="true" />
        </motion.div>

        <motion.div
          className="mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent || reduceMotion ? 0 : 20 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.7 }}
        >
          <div className="h-[28px] sm:h-[32px] md:h-[36px]" aria-hidden="true" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 justify-center items-center max-w-sm mx-auto mt-[8px] sm:mt-0"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent || reduceMotion ? 0 : 20 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.9 }}
        >
          <motion.a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className="group flex w-full items-center justify-center gap-2 rounded-lg border border-teal-500/30 bg-gray-800/50 px-6 py-3 text-sm font-medium text-teal-300 backdrop-blur-sm sm:text-base"
            whileHover={{ scale: reduceMotion ? 1 : 1.03, borderColor: 'rgba(20, 184, 166, 0.5)', backgroundColor: 'rgba(31, 41, 55, 0.8)' }}
            whileTap={{ scale: reduceMotion ? 1 : 0.97 }}
          >
            View Projects
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>

          <motion.a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="group flex w-full items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-950/50 px-6 py-3 text-sm font-medium text-blue-200 backdrop-blur-sm sm:text-base"
            whileHover={{ scale: reduceMotion ? 1 : 1.03, borderColor: 'rgba(96, 165, 250, 0.6)', backgroundColor: 'rgba(23, 37, 84, 0.8)' }}
            whileTap={{ scale: reduceMotion ? 1 : 0.97 }}
          >
            View Professional Experience
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0 7-7m-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
