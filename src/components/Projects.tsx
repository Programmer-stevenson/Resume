import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Pause, Play, ChevronDown, Palette } from 'lucide-react';

const projects = [
  {
    "title": "KCKN Glass — Auto Glass & Repair",
    "description": "Full-stack Utah Located auto glass business site with service booking, gallery, financing info, and a custom admin dashboard. Built for a real client with Twilio SMS integration and MongoDB backend.",
    "liveUrl": "https://kcknglass.com/",
    "githubUrl": "https://github.com/Programmer-stevenson/Los-s-Auto-Glass-",
    "iconLabel": "Utah Auto Glass Business Site",
    "screenshot": "/los.jpg",
    "tech": [
      "Next.js",
      "Express",
      "MongoDB",
      "Twilio",
      "Tailwind CSS"
    ]
  },
  {
    "title": "Vorus Luxury Cologne",
    "description": "A fictional luxury cologne brand I designed and built end-to-end — I invented the product and brand identity, then handcrafted the entire web experience from scratch. Every visual, animation, and component is custom, with a complete cart, checkout flow, and sample subscription concept.",
    "liveUrl": "https://vorus.onrender.com",
    "githubUrl": "https://github.com/Programmer-stevenson/Vorus",
    "iconLabel": "Fictional Product & Brand Design",
    "screenshot": "/vorus.png",
    "tech": [
      "React",
      "TypeScript",
      "MERN Stack",
      "Framer Motion"
    ]
  },
  {
    "title": "Pétale — Artisan Florist",
    "description": "One of my first complex React builds — a fictional luxury florist concept where I designed the logo, created all of the imagery, and handcrafted the entire front end from scratch. Features a bouquet shop showcase, featured products, a weddings section, and a same-day delivery concept. Front-end demo only.",
    "liveUrl": "https://petale-luxury-floral.onrender.com/",
    "githubUrl": "https://github.com/Programmer-stevenson",
    "iconLabel": "Fictional Luxury Florist",
    "screenshot": "/Petale.jpg",
    "tech": [
      "React",
      "Framer Motion",
      "Tailwind CSS",
      "Responsive Design"
    ]
  },
  {
    "title": "Super Duper Scooper",
    "description": "Live website demo built for a real Utah dog waste removal and lawn protection company serving West Jordan and the Salt Lake Valley. Features a quote-request form wired to a serverless form service, service-area coverage, a photo-confirmation visit concept, and a clean, conversion-focused design.",
    "liveUrl": "https://super-duper-scoopers.onrender.com/",
    "githubUrl": "https://github.com/Programmer-stevenson",
    "iconLabel": "Real Client · Live Website Demo",
    "screenshot": "/superScoop.png",
    "tech": [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Form API"
    ]
  },
  {
    "title": "Hazey Tattoos",
    "description": "Completely custom front-end portfolio site for a Utah tattoo artist. Features a filterable work gallery (illustrative B&G, realism, traditional, fine line, stippling), services, reviews, and a booking CTA — all in a bespoke dark-and-gold editorial design built entirely from scratch.",
    "liveUrl": "https://www.hazeytattoos.com",
    "githubUrl": "https://github.com/Programmer-stevenson",
    "iconLabel": "Utah Tattoo Artist Portfolio",
    "screenshot": "/hazeyport.jpg",
    "tech": [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive Design"
    ]
  },
  {
    "title": "Kevin Inks — Original Tattoos",
    "description": "Custom portfolio and booking experience built for a real Las Vegas tattoo artist. The site pairs a responsive React frontend with a headless WordPress CMS and custom REST API, allowing the client to manage artwork, available designs, images, and site content without changing the frontend code.",
    "liveUrl": "https://kevin-inks.vercel.app/",
    "githubUrl": "https://github.com/Programmer-stevenson/Kevin-Inks",
    "iconLabel": "Las Vegas Tattoo Artist — Headless CMS",
    "screenshot": "/kevin-web.png",
    "tech": [
      "React",
      "TypeScript",
      "Headless WordPress",
      "REST API",
      "Tailwind CSS",
      "Framer Motion"
    ]
  },
  {
    "title": "Plexura.net",
    "description": "Modern Full Service Digital Agency website showcasing stunning animations, responsive design, and cutting-edge frontend techniques.",
    "liveUrl": "https://plexura.net",
    "githubUrl": "https://github.com/Programmer-stevenson/Plexura",
    "iconLabel": " My Agency Website",
    "screenshot": "/plexura.png",
    "tech": [
      "React",
      "Tailwind CSS",
      "Framer Motion"
    ]
  },
  {
    "title": "My Portfolio Website",
    "description": "Interactive MERN Stack personal portfolio featuring Three.js Saturn background, advanced animations, and modern design patterns showcasing skills and experience.",
    "liveUrl": "https://brandons-resume.com/",
    "githubUrl": "https://github.com/Programmer-stevenson/Resume",
    "iconLabel": "Personal Site",
    "screenshot": "/resume.jpg",
    "tech": [
      "React",
      "TypeScript",
      "Three.js",
      "Framer Motion"
    ]
  },
  {
    "title": "Tiger Paw Cleaning",
    "description": "Front-end website built for a real Missouri cleaning business featuring premium animations, Radix UI components, and conversion-focused service pages designed to attract residential and commercial clients. Lead-generation forms are handled via Web3Forms, and all imagery was provided by the client.",
    "liveUrl": "https://tigerpawcleaning.com/",
    "githubUrl": "https://github.com/Programmer-stevenson/Tiger-Paw-Cleaning",
    "iconLabel": "Cleaning Brand",
    "screenshot": "/tiger-paw.png",
    "tech": [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "Web3Forms"
    ]
  }
];

type Project = (typeof projects)[number];

const styles = `
#projects.bs-projects {
  --project-navy:#123253; --project-muted:#47637d; --project-line:#cadfee;
  padding:96px 28px; scroll-margin-top:80px; color:var(--project-navy);
  font-family:Inter,'Segoe UI',Arial,sans-serif;
  background:radial-gradient(ellipse at 94% 8%,#c5e6fc 0%,transparent 35%),radial-gradient(ellipse at 0% 65%,#d8efff 0%,transparent 40%),linear-gradient(155deg,#fff 0%,#eff8ff 48%,#e1f1fd 78%,#fff 100%);
}
.bs-projects,.bs-projects * {box-sizing:border-box}
.bs-projects h2,.bs-projects h3,.bs-projects p,.bs-projects figure {margin:0}
.bs-projects a {text-decoration:none;color:inherit}
.bs-projects button {font:inherit;cursor:pointer}
.bs-projects svg {flex-shrink:0}
.bs-projects .projects-wrap {max-width:1180px;margin:auto;min-width:0}
.bs-projects .projects-eyebrow {display:flex;gap:16px;align-items:center;font-size:11px;line-height:1.5;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#305f88;margin-bottom:21px}
.bs-projects .projects-eyebrow:after {content:'';width:64px;height:1px;background:#8bb6d6}
.bs-projects .projects-heading {display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:end;margin-bottom:38px}
.bs-projects .projects-heading h2 {font-size:clamp(36px,4.7vw,60px);font-weight:600;line-height:1.08;letter-spacing:-.055em;color:var(--project-navy)}
.bs-projects .projects-heading h2 span {color:#3b729e}
.bs-projects .projects-heading p {max-width:470px;font-size:15px;line-height:1.85;color:var(--project-muted)}
.bs-projects .project-card {display:flex;flex-direction:column;min-width:0;background:#ffffffed;border:1px solid #d0e3f1;border-radius:20px;overflow:hidden;box-shadow:0 12px 35px #254e7307}
.bs-projects .project-featured {display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);margin-bottom:45px;background:#fff;border-radius:24px;box-shadow:0 20px 55px #285c8710}
.bs-projects .project-media {display:flex;flex-direction:column;background:#e8f3fb;border-bottom:1px solid #d0e3f1;min-width:0}
.bs-projects .project-browser {display:flex;align-items:center;gap:5px;padding:12px 16px;background:#f5faff;border-bottom:1px solid #dcebf5;color:#58758e;min-width:0}
.bs-projects .project-browser i {width:5px;height:5px;border-radius:50%;background:#aecadd;flex-shrink:0}
.bs-projects .project-browser span {font-size:10px;letter-spacing:.01em;margin-left:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bs-projects .project-shot {display:block;width:100%;aspect-ratio:16/10;object-fit:contain;background:#e8f3fb}
.bs-projects .project-fallback {display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;aspect-ratio:16/10;padding:24px;text-align:center;color:#456d8d;font-size:13px}
.bs-projects .project-featured .project-media {border-bottom:0;border-right:1px solid #d0e3f1;justify-content:center;background:linear-gradient(135deg,#e9f5ff,#d2eafa)}
.bs-projects .project-featured .project-browser {margin-top:auto}
.bs-projects .project-featured .project-shot,.bs-projects .project-featured .project-fallback {margin-bottom:auto}
.bs-projects .project-body {padding:26px;display:flex;flex-direction:column;flex:1;min-width:0}
.bs-projects .project-featured .project-body {padding:36px}
.bs-projects .project-label {display:flex;align-items:center;gap:7px;font-size:10px;font-weight:650;letter-spacing:.09em;text-transform:uppercase;color:#426d8f;line-height:1.65;margin-bottom:13px}
.bs-projects .project-featured .project-label {color:#245981}
.bs-projects .project-card h3 {font-size:23px;line-height:1.25;letter-spacing:-.035em;font-weight:600;color:var(--project-navy);margin-bottom:14px;overflow-wrap:anywhere}
.bs-projects .project-featured h3 {font-size:32px}
.bs-projects .project-description {font-size:13px;line-height:1.85;color:var(--project-muted);margin-bottom:20px}
.bs-projects .project-tags {display:flex;flex-wrap:wrap;gap:7px;margin-top:auto;margin-bottom:24px}
.bs-projects .project-tag {font-size:10px;line-height:1.5;padding:5px 9px;border:1px solid #d4e5f2;border-radius:6px;background:#edf6fd;color:#365f80}
.bs-projects .project-links {display:flex;flex-wrap:wrap;gap:10px;padding-top:20px;border-top:1px solid #e1edf5}
.bs-projects .project-link {display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;border:1px solid #c9dfef;border-radius:9px;padding:10px 15px;font-size:12px;font-weight:600;line-height:1.4;background:#fff;color:#244f72}
.bs-projects .project-link-primary {background:#143b5f;border-color:#143b5f;color:#fff}
.bs-projects .project-link:hover {background:#e2f1fc}
.bs-projects .project-link-primary:hover {background:#285e88;border-color:#285e88}
.bs-projects a:focus-visible,.bs-projects button:focus-visible,.bs-projects [tabindex]:focus-visible {outline:3px solid #377eae;outline-offset:4px}
.bs-projects .projects-subheading {display:flex;align-items:baseline;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-bottom:23px}
.bs-projects .projects-subheading h3 {font-size:25px;font-weight:500;letter-spacing:-.035em}
.bs-projects .projects-subheading p {font-size:12px;line-height:1.6;color:var(--project-muted)}
.bs-projects .projects-grid {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.bs-projects .projects-creative {margin-top:72px;padding-top:37px;border-top:1px solid #bfd9ed}
.bs-projects .creative-header {display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:25px}
.bs-projects .creative-header h3 {font-size:32px;line-height:1.2;font-weight:500;letter-spacing:-.04em;margin-bottom:12px}
.bs-projects .creative-header p {font-size:14px;line-height:1.8;color:var(--project-muted);max-width:560px}
.bs-projects .creative-controls {display:flex;gap:9px;flex-shrink:0}
.bs-projects .creative-controls button {display:grid;place-items:center;width:44px;height:44px;border:1px solid #bcd8ec;border-radius:50%;background:#fff;color:#275475}
.bs-projects .creative-controls button:hover {background:#deeffb}
.bs-projects .creative-track {display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;padding:4px 4px 18px;scrollbar-width:thin;scrollbar-color:#91b9d7 #e6f3fc}
.bs-projects .creative-item {flex:0 0 30%;min-width:0;scroll-snap-align:start;border:1px solid #cce1f0;background:#fff;border-radius:16px;overflow:hidden}
.bs-projects .creative-item img {display:block;width:100%;aspect-ratio:1;object-fit:contain;background:#f6fbff}
.bs-projects .creative-item figcaption {padding:12px 16px;font-size:11px;color:#4b6b83;border-top:1px solid #e1edf5}
.bs-projects .creative-fallback {aspect-ratio:1;display:grid;place-content:center;justify-items:center;gap:12px;color:#537795;font-size:12px;background:#f2f8fd}
@media(max-width:1050px) {
 .bs-projects .projects-grid {grid-template-columns:repeat(2,minmax(0,1fr))}
 .bs-projects .project-featured {grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
 .bs-projects .project-featured .project-body {padding:27px}
 .bs-projects .project-featured h3 {font-size:28px}
 .bs-projects .creative-item {flex-basis:40%}
}
@media(max-width:760px) {
 #projects.bs-projects {padding:64px 22px}
 .bs-projects .projects-heading {grid-template-columns:1fr;gap:20px;margin-bottom:28px}
 .bs-projects .projects-heading p {max-width:600px;font-size:14px}
 .bs-projects .project-featured {grid-template-columns:1fr}
 .bs-projects .project-featured .project-media {border-right:0;border-bottom:1px solid #d0e3f1}
 .bs-projects .project-featured .project-shot {aspect-ratio:16/9}
 .bs-projects .project-body {padding:22px}
 .bs-projects .project-card h3 {font-size:22px}
 .bs-projects .project-featured h3 {font-size:28px}
 .bs-projects .projects-grid {gap:16px}
 .bs-projects .creative-header {align-items:start;flex-direction:column;gap:18px}
 .bs-projects .creative-item {flex-basis:70%}
}
@media(max-width:560px) {
 #projects.bs-projects {padding:54px 18px}
 .bs-projects .projects-grid {grid-template-columns:1fr;gap:22px}
 .bs-projects .project-featured .project-body {padding:25px 22px}
 .bs-projects .project-links .project-link {flex:1}
 .bs-projects .creative-item {flex-basis:86%}
 .bs-projects .projects-creative {margin-top:48px}
 .bs-projects .creative-header h3 {font-size:28px}
}

/* Open editorial layout: a desktop display beside project details. */
.bs-projects .projects-heading {grid-template-columns:1.2fr 1fr;align-items:center;padding-bottom:30px;border-bottom:1px solid #c4ddec;margin-bottom:42px}
.bs-projects .projects-heading h2 {font-size:clamp(35px,4vw,54px);letter-spacing:-.045em}
.bs-projects .projects-heading p {font-size:14px;max-width:360px;justify-self:end}
.bs-projects .project-world {width:40px;height:40px;object-fit:contain;flex-shrink:0}
.bs-projects .project-stage {padding:0}
.bs-projects .project-featured {display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:42px;align-items:center;margin:0;border:0;border-radius:0;background:transparent;box-shadow:none;overflow:visible}
.bs-projects .project-featured .project-media {position:relative;border:8px solid #e6edf3;border-bottom-width:16px;border-radius:15px;background:#e8f3fb;box-shadow:0 22px 42px #23476220;margin-bottom:40px;overflow:visible}
.bs-projects .project-featured .project-media:after {content:'';position:absolute;left:39%;right:39%;bottom:-45px;height:28px;border-bottom:7px solid #c3d2df;background:linear-gradient(90deg,#e5edf4,#bfcddb,#e4edf4);border-radius:0 0 6px 6px}
.bs-projects .project-featured .project-browser {margin:0;border-radius:7px 7px 0 0;padding:10px 12px}
.bs-projects .project-featured .project-shot {aspect-ratio:16/10;margin:0;border-radius:0 0 3px 3px}
.bs-projects .project-featured .project-body {padding:8px 0 8px 0}
.bs-projects .project-featured h3 {font-size:clamp(25px,2.6vw,34px);line-height:1.15;margin-bottom:18px}
.bs-projects .project-featured .project-description {font-size:13px;line-height:1.85}
.bs-projects .project-featured .project-label {font-size:9px;letter-spacing:.1em;gap:10px;margin-bottom:19px}
.bs-projects .stage-controls {display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-top:28px;padding:0 0 26px}
.bs-projects .stage-navigation {display:flex;gap:8px}
.bs-projects .stage-navigation button {width:44px;height:44px;display:grid;place-items:center;background:#fff;border:1px solid #bdd5e7;border-radius:50%;color:#234e70}
.bs-projects .stage-navigation button:hover {background:#d9ecfa}
.bs-projects .stage-dots {display:flex;flex-wrap:wrap}
.bs-projects .stage-dots button {width:28px;height:44px;border:0;background:transparent;display:grid;place-items:center;padding:0}
.bs-projects .stage-dots span {width:6px;height:6px;border-radius:10px;background:#a2bfd4}
.bs-projects .stage-dots button[aria-pressed=true] span {width:18px;background:#235578}
.bs-projects .collection-bar {display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 0;border-top:1px solid #c4ddec;border-bottom:1px solid #c4ddec;margin:0 0 28px}
.bs-projects .collection-bar p {font-size:12px;color:#53758e}
.bs-projects .collection-toggle {display:flex;align-items:center;justify-content:center;gap:14px;border:0;background:#153b5e;color:#fff;padding:13px 19px;min-height:46px;border-radius:9px;font-size:12px;font-weight:600}
.bs-projects .collection-toggle[aria-expanded=true] svg {transform:rotate(180deg)}
.bs-projects .projects-creative {margin-top:48px;border-top:0;padding-top:10px}
@media(max-width:960px) {
 .bs-projects .project-featured {gap:27px;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr)}
 .bs-projects .project-featured .project-body {padding:0}
}
@media(max-width:760px) {
 .bs-projects .projects-heading {grid-template-columns:1fr;gap:15px;margin-bottom:32px}
 .bs-projects .projects-heading p {justify-self:start;max-width:500px}
 .bs-projects .project-featured {grid-template-columns:1fr;gap:28px}
 .bs-projects .project-featured .project-media {border-right:8px solid #e6edf3;border-bottom:16px solid #e6edf3;margin-bottom:24px}
 .bs-projects .project-featured .project-body {padding:0}
 .bs-projects .project-featured .project-shot {aspect-ratio:16/10}
 .bs-projects .project-featured h3 {font-size:28px}
}
@media(max-width:430px) {
 .bs-projects .stage-controls {justify-content:center;gap:5px}
 .bs-projects .collection-bar {align-items:stretch;flex-direction:column}
 .bs-projects .collection-bar p {text-align:center}
}

/* Seamless creative ribbon. Keep identical group widths for a clean loop. */
.bs-projects .creative-ribbon {position:relative;min-width:0}
.bs-projects .creative-track {gap:0;padding:8px 0 22px;scroll-snap-type:none;scroll-behavior:auto;scrollbar-width:none;overflow-x:auto}
.bs-projects .creative-track::-webkit-scrollbar {display:none}
.bs-projects .creative-ribbon-group {display:flex;flex:0 0 auto;gap:18px;padding-right:18px;width:max-content}
.bs-projects .creative-ribbon-group .creative-item {flex:0 0 clamp(210px,24vw,300px);width:clamp(210px,24vw,300px);border-radius:14px;box-shadow:0 8px 18px #234b7108}
.bs-projects .creative-item figcaption {display:none}
.bs-projects .creative-ribbon:before,.bs-projects .creative-ribbon:after {content:'';position:absolute;top:0;bottom:0;width:35px;pointer-events:none;z-index:1}
.bs-projects .creative-ribbon:before {left:0;background:linear-gradient(90deg,#eaf5fe,transparent)}
.bs-projects .creative-ribbon:after {right:0;background:linear-gradient(270deg,#eaf5fe,transparent)}
@media(max-width:560px) {
 .bs-projects .creative-ribbon-group {gap:12px;padding-right:12px}
 .bs-projects .creative-ribbon-group .creative-item {width:220px;flex-basis:220px}
 .bs-projects .creative-ribbon:before,.bs-projects .creative-ribbon:after {width:16px}
}
@media(prefers-reduced-motion:reduce) {
 .bs-projects .creative-track {scrollbar-width:thin}
}
`;

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  const isRepo = project.githubUrl.replace(/\/$/, '').split('/').length > 4;
  return (
    <article className={`project-card${featured ? ' project-featured' : ''}`}>
      <div className="project-media">
        <div className="project-browser" aria-hidden="true">
          <i /><i /><i /><span>{project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
        </div>
        {imageFailed ? (
          <div className="project-fallback"><img className="project-world" src="/world.png" alt="" /><span>{project.title}</span><span>Preview unavailable · Explore the live website below</span></div>
        ) : (
          <img className="project-shot" src={project.screenshot} alt={`${project.title} website preview`} loading="lazy" decoding="async" width={960} height={600} onError={() => setImageFailed(true)} />
        )}
      </div>
      <div className="project-body">
        <div className="project-label"><img className="project-world" src="/world.png" alt="" />{project.iconLabel.trim()}</div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags" aria-label="Technologies">{project.tech.map((tech) => <span className="project-tag" key={tech}>{tech}</span>)}</div>
        <div className="project-links">
          <a className="project-link project-link-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live (opens in a new tab)`}>View website <ExternalLink size={14} aria-hidden="true" /></a>
          <a className="project-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${isRepo ? 'Source code for ' + project.title : 'GitHub profile'} (opens in a new tab)`}><Github size={15} aria-hidden="true" />{isRepo ? 'Source code' : 'GitHub'}</a>
        </div>
      </div>
    </article>
  );
}

function CreativeImage({ index }: { index: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="creative-item">
      {failed ? <div className="creative-fallback"><Palette size={32} aria-hidden="true" /><span>Preview unavailable</span></div> : <img src={`/digi${index}.jpg`} alt={`Plexura brand and social media design ${index}`} width={600} height={600} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
      <figcaption>Plexura Creative</figcaption>
    </figure>
  );
}

const Projects = () => {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReducedMotion(query.matches);
    const visibility = () => setVisible(!document.hidden);
    motion(); visibility();
    query.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    return () => { query.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const playing = !paused && !hovered && !focused && visible && !reducedMotion;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((v) => (v + 1) % projects.length), 5000);
    return () => window.clearTimeout(timer);
  }, [active, playing]);
  const creativeRef = useRef<HTMLDivElement>(null);
  const [ribbonPaused, setRibbonPaused] = useState(false);
  const [ribbonHovered, setRibbonHovered] = useState(false);
  const [ribbonFocused, setRibbonFocused] = useState(false);
  const [ribbonTouched, setRibbonTouched] = useState(false);
  const ribbonResumeAt = useRef(0);
  useEffect(() => {
    if (reducedMotion || !visible || ribbonPaused || ribbonHovered || ribbonFocused || ribbonTouched) return;
    const track = creativeRef.current;
    if (!track) return;
    let frame = 0;
    let previous = 0;
    let position = track.scrollLeft;
    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (time >= ribbonResumeAt.current) {
        const loopWidth = track.firstElementChild?.getBoundingClientRect().width ?? 0;
        if (loopWidth > 0) {
          position += elapsed * 0.035;
          if (position >= loopWidth) position %= loopWidth;
          track.scrollLeft = position;
        }
      } else { position = track.scrollLeft; }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion, visible, ribbonPaused, ribbonHovered, ribbonFocused, ribbonTouched]);
  return (
    <section id="projects" className="bs-projects" aria-labelledby="projects-heading">
      <style>{styles}</style>
      <div className="projects-wrap">
        <p className="projects-eyebrow">Development portfolio</p>
        <header className="projects-heading">
          <h2 id="projects-heading">Selected <span>Projects</span></h2>
          <p>Client websites, custom applications, and original design concepts.</p>
        </header>
        <div className="project-stage" role="region" aria-roledescription="carousel" aria-label="Project showcase"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <div aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
            <ProjectCard key={projects[active].title} project={projects[active]} featured />
          </div>
          <div className="stage-controls">
            <div className="stage-navigation">
              <button type="button" onClick={() => setActive((v) => (v - 1 + projects.length) % projects.length)} aria-label="Previous project"><ChevronLeft size={19} /></button>
              {!reducedMotion && <button type="button" onClick={() => setPaused((v) => !v)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
              <button type="button" onClick={() => setActive((v) => (v + 1) % projects.length)} aria-label="Next project"><ChevronRight size={19} /></button>
            </div>
            <div className="stage-dots" aria-label="Select a project">{projects.map((project, index) => <button type="button" key={project.title} aria-label={`Show ${project.title}`} aria-pressed={active === index} onClick={() => setActive(index)}><span /></button>)}</div>
          </div>
        </div>
        <div className="collection-bar">
          <p>More to explore</p>
          <button type="button" className="collection-toggle" aria-expanded={showAll} aria-controls="full-portfolio" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Close portfolio collection' : 'Explore full portfolio'}<ChevronDown size={18} />
          </button>
        </div>
        <div id="full-portfolio" hidden={!showAll}>
          {showAll && <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>}
        </div>
        <section className="projects-creative" aria-labelledby="creative-heading">
          <div className="creative-header">
            <div>
              <p className="projects-eyebrow">Plexura Creative</p>
              <h3 id="creative-heading">Brand & Creative Work</h3>
              <p>Brand graphics, social media content, and marketing assets designed for my business.</p>
            </div>
            <div className="creative-controls">
              {!reducedMotion && <button type="button" onClick={() => setRibbonPaused((v) => !v)} aria-label={ribbonPaused ? 'Play creative ribbon' : 'Pause creative ribbon'} aria-controls="creative-gallery">{ribbonPaused ? <Play size={18} /> : <Pause size={18} />}</button>}
            </div>
          </div>
          <div className="creative-ribbon">
            <div id="creative-gallery" ref={creativeRef} className="creative-track" tabIndex={0} role="region" aria-label="Brand and creative work ribbon; swipe or scroll horizontally to browse"
              onMouseEnter={() => setRibbonHovered(true)} onMouseLeave={() => setRibbonHovered(false)}
              onFocusCapture={() => setRibbonFocused(true)}
              onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setRibbonFocused(false); }}
              onTouchStart={() => setRibbonTouched(true)}
              onTouchEnd={() => { ribbonResumeAt.current = performance.now() + 1800; setRibbonTouched(false); }}
              onTouchCancel={() => setRibbonTouched(false)}
              onWheel={() => { ribbonResumeAt.current = performance.now() + 1800; }}>
              <div className="creative-ribbon-group">
                {Array.from({ length: 13 }, (_, i) => <CreativeImage key={i + 1} index={i + 1} />)}
              </div>
              {!reducedMotion && <div className="creative-ribbon-group" aria-hidden="true">
                {Array.from({ length: 13 }, (_, i) => <CreativeImage key={i + 1} index={i + 1} />)}
              </div>}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Projects;
