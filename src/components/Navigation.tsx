import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, GraduationCap, Mail, X, Menu, User } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#introduction', label: 'About Me', icon: User },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#about', label: 'Experience', icon: Briefcase },
  { href: '#education', label: 'Education', icon: GraduationCap },
  { href: '#contact', label: 'Contact', icon: Mail },
];

const mobileNavIcons: Record<string, { gradient: string; hoverGradient: string }> = {
  Home: { gradient: 'from-teal-500/20 to-cyan-500/20', hoverGradient: 'from-teal-500/30 to-cyan-500/30' },
  'About Me': { gradient: 'from-cyan-500/20 to-teal-500/20', hoverGradient: 'from-cyan-500/30 to-teal-500/30' },
  Projects: { gradient: 'from-blue-500/20 to-purple-500/20', hoverGradient: 'from-blue-500/30 to-purple-500/30' },
  Experience: { gradient: 'from-purple-500/20 to-pink-500/20', hoverGradient: 'from-purple-500/30 to-pink-500/30' },
  Education: { gradient: 'from-pink-500/20 to-rose-500/20', hoverGradient: 'from-pink-500/30 to-rose-500/30' },
  Skills: { gradient: 'from-rose-500/20 to-orange-500/20', hoverGradient: 'from-rose-500/30 to-orange-500/30' },
  Contact: { gradient: 'from-orange-500/20 to-amber-500/20', hoverGradient: 'from-orange-500/30 to-amber-500/30' },
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 z-[100] shadow-lg shadow-teal-500/50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 transition-all duration-500 ease-out"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          background: isScrolled ? 'rgba(1, 30, 25, 0.9)' : 'transparent',
          boxShadow: isScrolled ? '0 8px 32px rgba(139, 92, 246, 0.1), inset 0 0 0 1px rgba(199, 210, 254, 0.3)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(199, 210, 254, 0.4)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            className="text-xl sm:text-2xl font-bold font-display bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Brandon Stevenson
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link relative text-sm lg:text-base font-medium text-gray-300 hover:text-teal-400 transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <motion.button
            className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-teal-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-teal-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-900/98 via-teal-900/95 to-gray-900/98 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-cyan-500/10 to-blue-500/5 animate-pulse" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between py-20 px-6 overflow-y-auto">
                {/* Navigation Links */}
                <nav className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-md space-y-3">
                    {navLinks.map((link, index) => {
                      const Icon = link.icon;
                      const colors = mobileNavIcons[link.label] || mobileNavIcons['Home'];
                      
                      return (
                        <motion.a
                          key={link.href}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="group block relative overflow-hidden rounded-2xl"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                          <div className="relative flex items-center justify-between px-6 py-5 border border-teal-500/20 group-hover:border-teal-400/50 rounded-2xl backdrop-blur-sm transition-all duration-300">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br ${colors.gradient} group-hover:${colors.hoverGradient} transition-all duration-300`}>
                                <Icon className="w-5 h-5 text-teal-400" />
                              </div>
                              <span className="text-xl font-semibold text-gray-200 group-hover:text-teal-400 transition-colors duration-300">
                                {link.label}
                              </span>
                            </div>
                            <svg className="w-5 h-5 text-teal-400/50 group-hover:text-teal-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                </nav>

                {/* Bottom Section */}
                <motion.div
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Las Vegas, NV</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;