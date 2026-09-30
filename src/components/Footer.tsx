const Footer = () => {
  const linkClass =
    'rounded-sm text-sm text-slate-400 transition-colors hover:text-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400';

  return (
    <footer className="relative overflow-hidden border-t border-blue-300/15 bg-gradient-to-b from-[#112b49] via-[#0b1b30] to-[#060e1a] px-6 py-14 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-2 gap-6 border-b border-blue-200/10 pb-10 sm:gap-12">
          <nav aria-label="Footer navigation">
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Explore
            </h2>
            <ul className="space-y-3">
              <li><a className={linkClass} href="#about">Experience</a></li>
              <li><a className={linkClass} href="#projects">Projects</a></li>
              <li><a className={linkClass} href="#education">Education</a></li>
              <li><a className={linkClass} href="#contact">Contact</a></li>
            </ul>
          </nav>

          <nav aria-label="Professional profiles">
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Connect
            </h2>
            <ul className="space-y-3">
              <li>
                <a className={linkClass} href="https://www.linkedin.com/in/brandon-in-tech/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li>
                <a className={linkClass} href="https://github.com/Programmer-stevenson" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li>
                <a className={linkClass} href="https://github.com/Programmer-stevenson/IT-Study-Material" target="_blank" rel="noopener noreferrer">Study Materials</a>
              </li>
              <li><a className={linkClass} href="mailto:brandon.stevensonn@outlook.com">Email Me</a></li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center pt-10">
          <a href="#" aria-label="Brandon Stevenson — back to top" className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-blue-400">
            <img
              src="/brandons-logo.png"
              alt="Brandon Stevenson IT Professional logo"
              width={180}
              height={180}
              loading="lazy"
              className="h-auto w-36 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.16)] sm:w-44"
            />
          </a>
          <p className="mt-6 text-sm font-medium tracking-[0.12em] text-slate-300">
            Brandon Stevenson
          </p>
          <p className="mt-2 text-xs leading-6 text-slate-400">
            Infrastructure · Endpoint Management · Automation
          </p>
          <p className="mt-7 text-xs leading-5 text-slate-400">
            © {new Date().getFullYear()} Brandon Stevenson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;