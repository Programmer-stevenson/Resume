import { Linkedin, Github, ArrowUpRight } from 'lucide-react';

const roleCards = [
  {
    image: '/hardware.png',
    title: 'Enterprise Infrastructure',
    description: 'Hands-on configuration, recovery, and validation of Dell PowerEdge and HPE ProLiant servers, Cisco switches, routers, and access points. Experience with remote management, firmware, hardware diagnostics, and preparation for redeployment.',
    tags: ['Cisco Nexus', 'Cisco Catalyst', 'Dell PowerEdge', 'HPE ProLiant', 'iDRAC / iLO', 'CLI & Serial Console', 'BIOS / UEFI', 'RAID Configuration'],
  },
  {
    image: '/cloud.png',
    title: 'Endpoint & Identity Management',
    description: 'Supporting users and devices through Microsoft Intune, Active Directory, Entra ID, and Microsoft 365, including enrollment, application deployment, access management, and day-to-day troubleshooting.',
    tags: ['Microsoft Intune', 'Entra ID', 'Microsoft 365 Applications', 'Active Directory', 'Windows Autopilot', 'Application Deployment', 'Patch Management', 'BitLocker'],
  },
  {
    image: '/codebrackets.png',
    title: 'Development & Automation',
    description: 'Building PowerShell and Microsoft Graph projects for IT workflows alongside production React applications. Hands-on experience with APIs, Git/GitHub, application deployment, and troubleshooting build and hosting issues.',
    tags: ['PowerShell', 'Microsoft Graph', 'Scripting', 'React / Next.js', 'REST APIs', 'Git / GitHub', 'Node.js', 'Render / Vercel'],
  },
];

// Scoped styles keep this component independent of the site's existing dark theme.
const styles = `
#introduction.bs-intro {
  --navy:#123253; --muted:#47637d; --line:#cadfee;
  position:relative; isolation:isolate; overflow:hidden;
  background:radial-gradient(ellipse at 90% 12%,#b4dcf8 0%,transparent 44%),radial-gradient(ellipse at 5% 62%,#d2ebfc 0%,transparent 47%),linear-gradient(145deg,#fff 5%,#edf7ff 49%,#dcefff 75%,#fff 100%);
  color:var(--navy); padding:100px 28px 70px;
  font-family:Inter,'Segoe UI',Arial,sans-serif; scroll-margin-top:80px;
}
.bs-intro,.bs-intro * {box-sizing:border-box}
.bs-intro h2,.bs-intro h3,.bs-intro p {margin:0}
.bs-intro a {text-decoration:none}
.bs-intro .intro-wrap {max-width:1180px;margin:auto;position:relative}
.bs-intro .intro-topline {display:flex;align-items:center;gap:20px;margin-bottom:45px}
.bs-intro .intro-eyebrow {font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#305f88}
.bs-intro .intro-rule {width:72px;height:1px;background:#88b4d6}
.bs-intro .intro-profile {display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:70px;align-items:center}
.bs-intro .intro-copy {grid-column:1;grid-row:1;min-width:0}
.bs-intro .intro-copy-label {font-size:11px;font-weight:650;letter-spacing:.13em;text-transform:uppercase;color:#426988;margin-bottom:20px}
.bs-intro .intro-title {font-size:clamp(44px,5.7vw,76px);line-height:1.03;letter-spacing:-.065em;font-weight:700;color:#113252;margin-bottom:28px}
.bs-intro .intro-title span {display:block;color:#386f9c;font-weight:400}
.bs-intro .intro-description {font-size:15px;line-height:1.9;color:var(--muted);max-width:620px}
.bs-intro .intro-description+.intro-description {margin-top:16px}
.bs-intro .intro-sidebar {grid-column:2;grid-row:1;display:flex;flex-direction:column;align-items:center;position:relative;text-align:center;padding:28px 0 12px}
.bs-intro .intro-portrait {position:relative;width:clamp(240px,27vw,338px);aspect-ratio:1;border:1px solid #81b1d4;border-radius:50%;padding:13px;background:linear-gradient(145deg,#ffffffb3,#c9e7fa80);box-shadow:0 25px 70px #3d80ae20;margin-bottom:25px}
.bs-intro .intro-portrait:before {content:'';position:absolute;inset:-19px;border:1px solid #fff;border-radius:50%;pointer-events:none}
.bs-intro .intro-portrait:after {content:'';position:absolute;inset:-37px;border:1px solid #a9cfe466;border-radius:50%;pointer-events:none}
.bs-intro .intro-portrait img {width:100%;height:100%;display:block;object-fit:cover;object-position:top;border:5px solid #fff;border-radius:50%;background:#d5eafa}
.bs-intro .intro-sidebar-label {position:relative;z-index:1;margin-top:-7px;margin-bottom:12px;padding:9px 16px;background:#fff;border:1px solid #d2e5f2;border-radius:30px;color:#3a6485;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;box-shadow:0 8px 24px #2758780a}
.bs-intro .intro-sidebar-title {font-size:21px;font-weight:600;letter-spacing:-.03em}
.bs-intro .intro-sidebar-subtitle {font-size:12px;color:var(--muted);margin-top:7px}
.bs-intro .intro-socials {display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:22px}
.bs-intro .intro-social {display:inline-flex;gap:7px;align-items:center;justify-content:center;min-height:42px;padding:10px 13px;border-radius:30px;border:1px solid #bdd6e8;background:#ffffffb3;color:#244f73;font-size:11px;font-weight:600;transition:background .2s,color .2s}
.bs-intro .intro-social:first-child {background:#143b5f;color:#fff;border-color:#143b5f}
.bs-intro .intro-social:hover {background:#285e88;color:#fff}
.bs-intro a:focus-visible {outline:3px solid #377eae;outline-offset:4px}
.bs-intro .intro-facts {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin:52px 0 0;padding:27px 18px;border:1px solid #fff;border-radius:20px;background:#ffffffa8;box-shadow:0 12px 40px #2a67900a}
.bs-intro .intro-fact {display:flex;align-items:center;justify-content:center;gap:18px;margin:0;padding:0 20px}
.bs-intro .intro-fact+.intro-fact {border-left:1px solid #cddfec}
.bs-intro .intro-fact dt {font-size:36px;font-weight:600;letter-spacing:-.05em;white-space:nowrap}
.bs-intro .intro-fact dd {font-size:11px;line-height:1.65;color:#526c82;max-width:115px;margin:0}
/* Expertise: three balanced cards with a quiet architectural treatment. */
.bs-intro .intro-section-heading {display:flex;justify-content:space-between;align-items:end;gap:20px;margin:64px 0 26px}
.bs-intro .intro-section-heading h3 {font-size:32px;font-weight:500;letter-spacing:-.045em}
.bs-intro .intro-section-heading p {font-size:12px;color:var(--muted)}
.bs-intro .intro-cards {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.bs-intro .intro-card {position:relative;display:flex;flex-direction:column;padding:30px 26px 25px;border:1px solid #c9e0f0;background:linear-gradient(155deg,#fff 40%,#eff8ff);border-radius:18px;min-width:0;box-shadow:0 10px 28px #244e7107;overflow:hidden}
.bs-intro .intro-card:before {content:'';position:absolute;top:0;left:26px;right:26px;height:3px;background:linear-gradient(90deg,#3d7ba9,#b3d9f4);border-radius:0 0 4px 4px}
.bs-intro .intro-card-top {display:flex;justify-content:space-between;align-items:center;margin-bottom:27px}
.bs-intro .intro-icon {width:50px;height:50px;display:grid;place-items:center;flex-shrink:0}
.bs-intro .intro-icon img {display:block;width:100%;height:100%;object-fit:contain}
.bs-intro .intro-card h3 {font-size:22px;font-weight:600;line-height:1.3;letter-spacing:-.035em;margin-bottom:15px;color:var(--navy);max-width:240px;min-height:2.6em}
.bs-intro .intro-card p {font-size:13px;line-height:1.85;color:var(--muted);margin-bottom:28px}
.bs-intro .intro-tags {display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:20px;border-top:1px solid #d9e8f3}
.bs-intro .intro-tag {padding:6px 9px;border-radius:6px;background:#eaf4fc;border:1px solid #d9e9f6;color:#365e7f;font-size:10px;font-weight:500}
.bs-intro .intro-footer {margin-top:34px;display:flex;align-items:center;justify-content:space-between;gap:25px;padding:25px 0 0;border-top:1px solid #cbdfee}
.bs-intro .intro-footer p {font-size:13px;line-height:1.8;color:var(--muted);max-width:720px}
.bs-intro .intro-footer strong {font-weight:600;color:var(--navy)}
.bs-intro .intro-footer-mark {display:grid;place-items:center;width:40px;height:40px;border:1px solid #adcde4;border-radius:50%;flex-shrink:0}
@media(max-width:960px) {
 .bs-intro .intro-profile {gap:38px;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr)}
 .bs-intro .intro-fact {flex-direction:column;gap:5px;text-align:center}
 .bs-intro .intro-fact dd {max-width:none}
 .bs-intro .intro-title {font-size:57px}
}
@media(min-width:701px) and (max-width:960px) {
 .bs-intro .intro-cards {gap:12px}
 .bs-intro .intro-card {padding:27px 19px 22px}
 .bs-intro .intro-card h3 {font-size:19px}
}
@media(max-width:700px) {
 #introduction.bs-intro {padding:52px 22px}
 .bs-intro .intro-topline {margin-bottom:32px}
 .bs-intro .intro-profile {grid-template-columns:1fr;gap:35px}
 .bs-intro .intro-copy {grid-column:1;grid-row:2}
 .bs-intro .intro-sidebar {grid-column:1;grid-row:1;padding-top:20px}
 .bs-intro .intro-portrait {width:230px}
 .bs-intro .intro-title {font-size:clamp(43px,10vw,64px)}
 .bs-intro .intro-description {font-size:14px}
 .bs-intro .intro-facts {margin-top:30px;padding:20px 0;border-radius:16px}
 .bs-intro .intro-fact {padding:0 9px}
 .bs-intro .intro-fact dt {font-size:27px}
 .bs-intro .intro-fact dd {font-size:10px}
 .bs-intro .intro-section-heading {align-items:start;flex-direction:column;gap:7px;margin-top:40px}
 .bs-intro .intro-section-heading h3 {font-size:29px}
 .bs-intro .intro-cards {grid-template-columns:1fr}
 .bs-intro .intro-card {padding:27px 25px 24px}
 .bs-intro .intro-card-top {margin-bottom:20px}
 .bs-intro .intro-card h3 {min-height:0;max-width:none;font-size:23px}
 .bs-intro .intro-card p {font-size:13px}
 .bs-intro .intro-footer-mark {display:none}
}
.bs-intro .intro-fact-topic {flex-direction:column;gap:8px;text-align:center}
.bs-intro .intro-fact-topic dt {font-size:22px;line-height:1.2;letter-spacing:-.035em;white-space:normal;overflow-wrap:anywhere}
.bs-intro .intro-fact-topic dd {max-width:none}
@media(max-width:700px) {
 .bs-intro .intro-fact-topic dt {font-size:clamp(12px,3.2vw,20px)}
 .bs-intro .intro-fact-topic dd {font-size:10px}
}
@media(prefers-reduced-motion:reduce) {.bs-intro .intro-social {transition:none}}
`;

const Introduction = () => (
  <section id="introduction" className="bs-intro" aria-labelledby="introduction-heading">
    <style>{styles}</style>
    <div className="intro-wrap">
      <div className="intro-topline">
        <span className="intro-eyebrow">About me</span>
        <span className="intro-rule" aria-hidden="true" />
      </div>

      <div className="intro-profile">
        <aside className="intro-sidebar" aria-label="Profile and professional links">
          <div className="intro-portrait">
            <img src="/brandon.jpg" alt="Brandon Stevenson" width={338} height={338} loading="lazy" decoding="async" />
          </div>
          <p className="intro-sidebar-label">Infrastructure & technology</p>
          <p className="intro-sidebar-title">IT Professional</p>
          <p className="intro-sidebar-subtitle">Systems. Software. Cloud.</p>
          <nav className="intro-socials" aria-label="Professional profiles">
            <a className="intro-social" href="https://www.linkedin.com/in/brandon-in-tech/" target="_blank" rel="noopener noreferrer" aria-label="Brandon on LinkedIn (opens in a new tab)">
              <Linkedin size={14} aria-hidden="true" /> LinkedIn
            </a>
            <a className="intro-social" href="https://www.linkedin.com/company/plexura/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="Plexura on LinkedIn (opens in a new tab)">
              <Linkedin size={14} aria-hidden="true" /> Plexura
            </a>
            <a className="intro-social" href="https://github.com/Programmer-stevenson?tab=stars" target="_blank" rel="noopener noreferrer" aria-label="Brandon on GitHub (opens in a new tab)">
              <Github size={14} aria-hidden="true" /> GitHub
            </a>
          </nav>
        </aside>

        <div className="intro-copy">
          <p className="intro-copy-label">IT Infrastructure, Endpoint Management &amp; Automation</p>
          <h2 id="introduction-heading" className="intro-title"><span>Brandon</span> Stevenson</h2>
          <p className="intro-description">
            IT professional with 2.5+ years of hands-on experience across technical support, endpoint management, and enterprise infrastructure. Previously served as the sole on-site IT support contact for 50+ users and 130+ devices. Hands-on experience with enterprise servers and Cisco networking equipment, using command-line interfaces, serial console connections, and iDRAC/iLO management tools to configure systems, reimage switches, troubleshoot hardware, and validate functionality.
          </p>
          <p className="intro-description">
            I hold an A.A.S. in Computer &amp; Information Technology, with an emphasis in Software Programming. My development background spans production React applications, deployment troubleshooting, and PowerShell and Microsoft Graph projects that support practical IT workflows. I am building toward cloud and network engineering, with a focus on systems, networking, and automation.
          </p>

        </div>
      </div>

          <dl className="intro-facts">
            <div className="intro-fact"><dt>2.5+</dt><dd>Years of IT experience</dd></div>
            <div className="intro-fact intro-fact-topic"><dt>Enterprise<br />Infrastructure</dt><dd>Servers &amp; Cisco Networking</dd></div>
            <div className="intro-fact"><dt>A.A.S.</dt><dd>Computer &amp; Information Technology<br />Software Programming Emphasis</dd></div>
          </dl>

      <div className="intro-section-heading">
        <h3>Areas of expertise</h3>
        <p>A connected approach to modern IT.</p>
      </div>
      <div className="intro-cards">
        {roleCards.map(({ image, title, description, tags }) => (
          <article className="intro-card" key={title}>
            <div className="intro-card-top">
              <div className="intro-icon"><img src={image} alt="" aria-hidden="true" width={50} height={50} loading="lazy" decoding="async" /></div>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="intro-tags">{tags.map((tag) => <span className="intro-tag" key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
      <div className="intro-footer">
        <p>Focused on <strong>reliable systems, efficient IT operations, and practical automation.</strong></p>
        <span className="intro-footer-mark" aria-hidden="true"><ArrowUpRight size={19} /></span>
      </div>
    </div>
  </section>
);

export default Introduction;
