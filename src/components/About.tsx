import { useEffect, useState } from 'react';

import { ChevronDown, MapPin, Calendar, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';

const roles = [

  {

    id: 'epc',

    logo: '/epc.jpg',

    company: 'Executive Personal Computers, Inc.',

    shortName: 'EPC',



    title: 'IT Infrastructure Technician - Enterprise Server & Network Infrastructure',



    location: 'Las Vegas, NV',

    period: 'Jan 2026 – Present',

    current: true,



    summary:

      'Hands-on enterprise infrastructure role servicing, configuring, troubleshooting, imaging, and validating high volumes of servers, switches, routers, firewalls, wireless access points, and related hardware.',



    highlights: [

      'Serve on a four-person Enterprise Infrastructure team servicing large volumes of enterprise servers, switches, routers, firewalls, wireless access points, and related infrastructure hardware supporting operations across the Western U.S. through the Midwest.',



      'Configure and service Dell PowerEdge and HPE ProLiant servers using iDRAC, iLO, Dell Lifecycle Controller, RBSU, and Intelligent Provisioning; manage BIOS/UEFI settings, firmware, boot options, RAID storage, management interfaces, and hardware validation.',



      'Troubleshoot server boot failures, hardware faults, and configuration issues using remote-management tools, system logs, and diagnostics; isolate failures, replace RAM, SSD/HDDs, NICs, RAID controllers, PSUs, CPUs, PCIe cards, backplanes, and other components, then verify normal operation.',



      'Use racadm over SSH and remote-management consoles to review hardware inventory and health, inspect system logs, control power and boot behavior, and configure DHCP or static IP addressing for out-of-band management.',



      'Configure and service Cisco Catalyst and Nexus switches and ISR routers through serial-console CLI using Tera Term; work with IOS/NX-OS, ROMMON, loader, and switch(boot) environments to troubleshoot startup issues, install system images through USB/TFTP, configure boot variables and temporary management networking, and validate successful operation.',



      'Configure and validate switch interfaces and VLAN segmentation; test ports, transceivers, modules, and line cards, troubleshoot connectivity issues, and verify network hardware functionality.',



      'Configure and reset enterprise firewall appliances, including Dell SonicWall platforms, using Ethernet and console connectivity, management interfaces, and vendor-specific procedures to remove existing configurations and validate device operation.',



      'Perform structured post-service validation using CLI commands to review running and startup configurations, inventory, VLAN/VTP state, logs, flash contents, interfaces, and device status; perform loopback or PoE testing where applicable and document terminal output.',



      'Perform secure data sanitization across enterprise infrastructure using Blancco and platform-specific procedures, including storage and media inspection, configuration and system-data removal, system resets, technical validation, and documentation of erasure results or exceptions.',

    ],



    skills: [

      'Dell PowerEdge',

      'HPE ProLiant',

      'iDRAC',

      'iLO',

      'Dell Lifecycle Controller',

      'RBSU',

      'Intelligent Provisioning',

      'racadm / SSH',

      'Cisco Catalyst',

      'Cisco Nexus',

      'Cisco ISR',

      'Dell SonicWall',

      'IOS / NX-OS',

      'ROMMON / Loader',

      'VLANs',

      'TFTP / USB Imaging',

      'RAID',

      'BIOS / UEFI',

      'Tera Term',

      'Blancco',

    ],

  },



  {

    id: 'macbid',

    logo: '/mac.jpg',

    company: 'MAC.BID',

    shortName: 'MAC.BID',



    title: 'IT Administrator / IT Facility Support',



    location: 'Las Vegas, NV',

    period: 'Nov 2024 – Nov 2025',

    current: false,



    summary:

      'Sole on-site IT administrator supporting a 50+ user and 130+ device production facility while coordinating with a remote IT team.',



    highlights: [

      'Served as sole on-site IT administrator and single point of contact for a 50+ user / 130+ device facility, providing daily end-user and site support while tracking incidents and requests in ServiceNow.',



      'Supported facility opening by imaging and deploying 30+ complete workstation setups, including desktop PCs, monitors, UPS units, printers, and scanners; performed OS imaging, hardware and peripheral setup, connectivity configuration, testing, and launch-readiness validation.',



      'Administered Microsoft Intune across 100+ smartphones and tablets and 30+ desktops and laptops, including enrollment, provisioning, configuration profiles, endpoint security policies, application deployment, and patch management.',



      'Administered Active Directory and Microsoft Entra ID for user provisioning, password resets and account unlocks, security groups, and access permissions; supported Microsoft 365 administration and end-user access.',



      'Planned and executed a Windows 10 to Windows 11 migration across 30+ workstations and supported imaging and deployment of workstations, mobile devices, printers, scanners, and operational systems.',



      'Provided Windows, macOS, iOS, and Android support for business-critical software, peripherals, connectivity, and access issues while managing IT inventory, equipment ordering, deployments, and escalations with the remote IT team.',

    ],



    skills: [

      'Microsoft Intune',

      'Entra ID',

      'Active Directory',

      'Microsoft 365',

      'ServiceNow',

      'Windows 11 Migration',

      'Endpoint Deployment',

      'OS Imaging',

      'Patch Management',

      'Asset Management',

    ],

  },



  {

    id: 'cdw',

    logo: '/cdw.jpg',

    company: 'CDW',

    shortName: 'CDW',



    title: 'IT Configuration Technician (Contract)',



    location: 'Las Vegas, NV',

    period: 'Apr 2024 – Nov 2024',

    current: false,



    summary:

      'High-volume enterprise endpoint configuration, imaging, provisioning, hardware configuration, and deployment validation.',



    highlights: [

      'Configured and provisioned high volumes of enterprise desktops, laptops, servers, printers, tablets, and mobile devices for customer-specific deployments.',



      'Deployed Windows images through PXE network boot and USB; installed drivers, applications, BIOS revisions, firmware updates, and customer configuration packages.',



      'Provisioned Windows endpoints through Microsoft Autopilot and White Glove pre-provisioning; applied BitLocker encryption, verified and exported recovery keys, and configured hostnames, network parameters, credentials, and endpoint security settings.',



      'Troubleshot imaging, enrollment, drivers, hardware, network connectivity, encryption, and peripherals; installed or upgraded RAM, storage, NICs, and PCIe cards, then completed final quality-control validation and deployment documentation.',

    ],



    skills: [

      'Windows Autopilot',

      'White Glove',

      'PXE / USB Imaging',

      'BitLocker',

      'BIOS / UEFI',

      'Firmware',

      'Hardware Configuration',

      'Network Configuration',

      'Quality Control',

    ],

  },



  {

    id: 'plexura',

    logo: '/plexura_link.jpg',

    company: 'Plexura',

    shortName: 'Plexura',



    title: 'Full Stack Developer (Part-Time Freelance)',



    location: 'Las Vegas, NV',

    period: 'Apr 2025 – Present',

    current: true,



    summary:

      'Full-stack development, application integrations, cloud deployment, and production support for client websites and web applications.',



    highlights: [

      'Designed, built, and supported production client websites and web applications using React, Next.js, WordPress, JavaScript/TypeScript, HTML/CSS, and Tailwind CSS.',



      'Built application features and integrations using Node.js, Express, MongoDB, REST APIs, headless WordPress, custom PHP endpoints, CRM and booking services, analytics, and contact-form workflows.',



      'Managed Git/GitHub workflows and production deployments for 20+ applications and websites hosted on Vercel and Render, including build-log troubleshooting, environment variables, DNS and domain configuration, testing, debugging, and post-launch support.',

    ],



    skills: [

      'React',

      'Next.js',

      'JavaScript',

      'TypeScript',

      'Node.js',

      'Express',

      'MongoDB',

      'REST APIs',

      'Headless WordPress',

      'PHP',

      'Git / GitHub',

      'Render',

      'Vercel',

      'DNS / Domains',

    ],

  },

];



const skillCategories = [

  { name: 'Endpoint & Identity', skills: ['Microsoft Intune', 'Entra ID', 'Active Directory', 'Group Policy / OUs', 'Microsoft 365', 'Microsoft Teams', 'ServiceNow', 'Autopilot', 'Pre-provisioning', 'Endpoint Security Policies', 'Patch Management', 'OS Imaging'] },

  { name: 'Automation & Development', skills: ['PowerShell', 'Microsoft Graph API', 'REST APIs', 'Python', 'Bash', 'Git / GitHub', 'JavaScript / TypeScript', 'React / Next.js', 'Node.js / Express', 'MongoDB', 'WordPress / PHP'] },

  { name: 'Servers & Infrastructure', skills: ['Dell PowerEdge', 'HPE ProLiant', 'iDRAC / iLO', 'racadm / SSH', 'BIOS / UEFI', 'PERC / RAID', 'Firmware Management', 'Hardware Diagnostics', 'Windows Server', 'Linux'] },

  { name: 'Networking', skills: ['Cisco IOS / NX-OS', 'Catalyst / Nexus', 'Meraki', 'Juniper Junos', 'Aruba', 'VLANs / Trunking', 'TCP/IP', 'DNS / DHCP', 'Static IP', 'Wireless Access Points', 'PuTTY / Tera Term', 'Tftpd64'] },

  { name: 'Security & Cloud', skills: ['Azure Fundamentals', 'Entra ID', 'NIST 800-88', 'Blancco Drive Eraser', 'BitLocker', 'Chain-of-Custody Documentation', 'Cloud & Network Coursework'] },

];



const styles = `

#about.bs-about {--navy:#f3f8ff;--muted:#b3c8dd;--line:#4e75944f;padding:90px 28px;background:radial-gradient(ellipse at 92% 10%,#234d7466 0%,transparent 48%),radial-gradient(ellipse at 0% 100%,#193d5f66 0%,transparent 45%),linear-gradient(130deg,#081727 0%,#102b46 54%,#0a1c30 100%);color:var(--navy);font-family:Inter,'Segoe UI',Arial,sans-serif;scroll-margin-top:80px}

.bs-about,.bs-about * {box-sizing:border-box}

.bs-about h2,.bs-about h3,.bs-about h4,.bs-about p {margin:0}

.bs-about button {font:inherit;cursor:pointer}

.bs-about svg {flex-shrink:0}

.bs-about .about-wrap {max-width:1180px;margin:auto}

.bs-about .about-eyebrow {display:flex;align-items:center;gap:16px;font-size:11px;font-weight:700;letter-spacing:.19em;text-transform:uppercase;color:#a7c9e5;margin-bottom:20px}

.bs-about .about-eyebrow:after {content:'';height:1px;width:60px;background:#5d85a6}

.bs-about .about-header {display:flex;justify-content:space-between;align-items:end;gap:36px;margin-bottom:32px}

.bs-about .about-header h2 {font-size:clamp(35px,4.3vw,54px);line-height:1.08;letter-spacing:-.05em;font-weight:600}

.bs-about .about-header h2 span {color:#b7dafa}

.bs-about .about-header p {font-size:14px;line-height:1.85;color:var(--muted);max-width:390px}

.bs-about .about-navigation {display:flex;flex-wrap:wrap;gap:8px;padding-bottom:24px;margin-bottom:32px;border-bottom:1px solid var(--line)}

.bs-about .about-navigation button {display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:46px;padding:12px 19px;border:1px solid #4e759466;background:#0b223680;color:#d7eafa;border-radius:10px;font-size:12px;font-weight:600}

.bs-about .about-navigation button[aria-pressed=true] {background:#2f5f87;border-color:#8eb9d7;color:#fff}

.bs-about button:focus-visible,.bs-about summary:focus-visible {outline:3px solid #b4dcfa;outline-offset:4px}

.bs-about .career-layout {display:grid;grid-template-columns:240px minmax(0,1fr);gap:40px;align-items:start}

.bs-about .career-intro {position:sticky;top:100px}

.bs-about .career-intro h3 {font-size:25px;font-weight:500;letter-spacing:-.035em;line-height:1.2;margin-bottom:13px}

.bs-about .career-intro p {font-size:13px;line-height:1.85;color:var(--muted)}

.bs-about .career-note {padding-top:23px;margin-top:23px;border-top:1px solid var(--line);font-size:11px;color:#9fb9ce;line-height:1.7}

.bs-about .role-group+.role-group {margin-top:26px}

.bs-about .role-group-label {font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#a3c4df;margin-bottom:12px}

.bs-about .role-card {border:1px solid #4e75944f;background:linear-gradient(145deg,#173754cc,#102a42dd);border-radius:16px;margin-bottom:13px;overflow:hidden;box-shadow:0 18px 48px #020b1724}

.bs-about .role-card[open] {background:linear-gradient(145deg,#1b3d5dcc,#112b44ee);border-color:#89b5d5;box-shadow:0 20px 60px #020b1729}

.bs-about .role-card summary {display:grid;grid-template-columns:64px minmax(0,1fr) 24px;align-items:center;gap:16px;list-style:none;padding:23px 25px;cursor:pointer}

.bs-about .role-card summary::-webkit-details-marker {display:none}

.bs-about .role-card summary::marker {content:''}

.bs-about .role-company {display:flex;align-items:center;flex-wrap:wrap;gap:10px;font-size:12px;font-weight:650;color:#b7dafa;margin-bottom:9px}

.bs-about .role-status {font-size:9px;font-weight:600;letter-spacing:.04em;padding:4px 8px;border:1px solid #6f9fc180;border-radius:20px;background:#163a57;color:#d9efff}

.bs-about .role-card h4 {font-size:19px;font-weight:600;line-height:1.35;letter-spacing:-.025em;color:#f3f8ff}

.bs-about .role-meta {display:flex;flex-wrap:wrap;gap:8px 20px;margin-top:12px;font-size:11px;line-height:1.6;color:#a6bed3}

.bs-about .role-meta span {display:flex;align-items:center;gap:6px}

.bs-about .role-chevron {color:#92bce0;transition:transform .2s}

.bs-about .role-card[open] .role-chevron {transform:rotate(180deg)}

.bs-about .role-detail {padding:0 25px 25px}

.bs-about .role-summary {padding-top:20px;border-top:1px solid #547b974d;font-size:14px;font-weight:500;line-height:1.8;color:#dceaf6}

.bs-about .role-detail ul {padding-left:19px;margin:19px 0 23px;display:grid;gap:13px}

.bs-about .role-detail li {padding-left:4px;font-size:13px;line-height:1.85;color:var(--muted)}

.bs-about .role-detail li::marker {color:#7fb0d3}

.bs-about .about-tags {display:flex;gap:7px;flex-wrap:wrap}

.bs-about .about-tag {font-size:10px;line-height:1.5;padding:6px 9px;border:1px solid #517b9866;border-radius:6px;background:#0b223680;color:#d7eafa;overflow-wrap:anywhere}

.bs-about .earlier-work {margin-top:24px;border:1px solid #4e75944f;border-radius:12px;padding:18px 22px;background:#0b22364d}

.bs-about .earlier-work summary {font-size:12px;font-weight:600;cursor:pointer;color:#d7eafa}

.bs-about .earlier-work p {margin-top:13px;font-size:12px;line-height:1.9;color:var(--muted)}

.bs-about .education-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}

.bs-about .education-card {padding:29px;border:1px solid #4e75944f;border-radius:18px;background:linear-gradient(145deg,#173754cc,#102a42dd);box-shadow:0 18px 48px #020b1724}

.bs-about .education-card h3 {font-size:23px;font-weight:600;letter-spacing:-.035em;line-height:1.3;margin:18px 0 12px}

.bs-about .education-card p {font-size:13px;line-height:1.8;color:var(--muted)}

.bs-about .education-meta {display:flex;gap:10px;align-items:center;justify-content:space-between;font-size:11px;color:#a9c9e3}

.bs-about .education-card .degree-emphasis {margin-top:10px;font-weight:600;color:#b7dafa}

.bs-about .cert-heading {font-size:25px;letter-spacing:-.035em;font-weight:500;margin:35px 0 18px}

.bs-about .cert-list {display:grid;gap:12px}

.bs-about .cert-card {display:flex;align-items:center;gap:16px;padding:20px 24px;border:1px solid #4e75944f;border-radius:12px;background:#0b22364d}

.bs-about .cert-card h4 {font-size:15px;line-height:1.5;font-weight:600}

.bs-about .cert-card p {font-size:11px;color:#a6bed3;margin-top:5px;line-height:1.6}

.bs-about .cert-card>svg {color:#92bce0}

.bs-about .skills-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}

.bs-about .skill-card {padding:27px;background:linear-gradient(145deg,#173754cc,#102a42dd);border:1px solid #4e75944f;border-radius:16px;box-shadow:0 18px 48px #020b1724}

.bs-about .skill-card h3 {font-size:21px;letter-spacing:-.025em;font-weight:600;margin-bottom:20px}

.bs-about [hidden] {display:none!important}

@media(max-width:900px) {.bs-about .career-layout {grid-template-columns:190px minmax(0,1fr);gap:24px}.bs-about .about-header {align-items:start;flex-direction:column;gap:18px}.bs-about .about-header p {max-width:600px}}

@media(max-width:700px) {#about.bs-about {padding:60px 22px}.bs-about .career-layout {grid-template-columns:1fr;gap:24px}.bs-about .career-intro {position:static}.bs-about .career-note {display:none}.bs-about .education-grid,.bs-about .skills-grid {grid-template-columns:1fr}.bs-about .role-card summary {padding:20px}.bs-about .role-detail {padding:0 20px 22px}.bs-about .role-card h4 {font-size:18px}.bs-about .about-navigation {gap:7px}.bs-about .about-navigation button {padding:11px 13px;font-size:11px}.bs-about .education-card {padding:25px}.bs-about .cert-card {padding:20px}}

@media(max-width:380px) {#about.bs-about {padding:50px 16px}.bs-about .about-navigation button {flex:1;gap:5px;padding:11px 8px}.bs-about .about-navigation button svg {display:none}}

.bs-about .role-logo {display:grid;place-items:center;width:64px;height:64px;padding:7px;background:#fff;border:1px solid #6d94b180;border-radius:12px;overflow:hidden}

.bs-about .role-logo img {display:block;width:100%;height:100%;object-fit:contain}

@media(max-width:700px) {.bs-about .role-card summary {grid-template-columns:48px minmax(0,1fr) 20px;gap:12px}.bs-about .role-logo {width:48px;height:48px;padding:5px;border-radius:9px}}

@media(max-width:380px) {.bs-about .role-card summary {grid-template-columns:40px minmax(0,1fr) 16px;gap:9px;padding:17px 14px}.bs-about .role-logo {width:40px;height:40px;padding:4px}.bs-about .role-card h4 {font-size:16px}}

@media(prefers-reduced-motion:reduce) {.bs-about .role-chevron {transition:none}}

`;



function RoleCard({ role }: { role: (typeof roles)[number] }) {

  const [open, setOpen] = useState(role.id === 'epc');

  return (

    <details className="role-card" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>

      <summary>

        <div className="role-logo"><img src={role.logo} alt="" width={64} height={64} loading="lazy" decoding="async" /></div>

        <div>

          <div className="role-company">{role.company}{role.current && <span className="role-status">Current role</span>}</div>

          <h4>{role.title}</h4>

          <div className="role-meta"><span><Calendar size={12} aria-hidden="true" />{role.period}</span><span><MapPin size={12} aria-hidden="true" />{role.location}</span></div>

        </div>

        <ChevronDown className="role-chevron" size={19} aria-hidden="true" />

      </summary>

      <div className="role-detail">

        <p className="role-summary">{role.summary}</p>

        <ul>{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>

        <div className="about-tags" aria-label={`${role.shortName} technologies`}>{role.skills.map((skill) => <span className="about-tag" key={skill}>{skill}</span>)}</div>

      </div>

    </details>

  );

}



const views = [

  { id: 'experience', label: 'Experience', icon: Briefcase },

  { id: 'education', label: 'Education', icon: GraduationCap },

  { id: 'skills', label: 'Skills', icon: Code2 },

] as const;



export default function About() {

  const [view, setView] = useState<'experience' | 'education' | 'skills'>(() => typeof window !== 'undefined' && window.location.hash === '#education' ? 'education' : 'experience');

  useEffect(() => {

    const handleHash = () => { if (window.location.hash === '#education') setView('education'); };

    window.addEventListener('hashchange', handleHash);

    return () => window.removeEventListener('hashchange', handleHash);

  }, []);

  return (

    <section id="about" className="bs-about" aria-labelledby="about-heading">

      <style>{styles}</style>

      <div className="about-wrap">

        <p className="about-eyebrow">Professional background</p>

        <header className="about-header">

          <h2 id="about-heading">Experience <span>&amp; Skills</span></h2>

          <p>Enterprise infrastructure, endpoint administration, and software development — grounded in hands-on technical work.</p>

        </header>

        <nav id="education" className="about-navigation" aria-label="Explore professional background">

          {views.map(({ id, label, icon: Icon }) => <button id={`about-${id}-button`} type="button" key={id} aria-pressed={view === id} aria-controls={`about-${id}-panel`} onClick={() => setView(id)}><Icon size={16} aria-hidden="true" />{label}</button>)}

        </nav>

        <div id="about-experience-panel" role="region" aria-labelledby="about-experience-button" hidden={view !== 'experience'}>

          <div className="career-layout">

            <aside className="career-intro"><h3>Professional experience</h3><p>From sole-site IT support to enterprise hardware and production web applications.</p><div className="career-note">Select a role to explore responsibilities and technologies.</div></aside>

            <div>

              <div className="role-group"><p className="role-group-label">IT &amp; Infrastructure</p>{roles.filter((role) => role.id !== 'plexura').map((role) => <RoleCard key={role.id} role={role} />)}</div>

              <div className="role-group"><p className="role-group-label">Software Development &amp; Automation</p><RoleCard role={roles[3]} /></div>

              <details className="earlier-work"><summary>Earlier experience</summary><p>Delivery Driver (Independent Contractor), Uber Eats · Mar 2020 – Apr 2024<br />Assistant Manager, Garrett Popcorn Shops · Apr 2017 – Mar 2020<br />General Manager, Burger King · Apr 2014 – Apr 2017</p></details>

            </div>

          </div>

        </div>

        <div id="about-education-panel" role="region" aria-labelledby="about-education-button" hidden={view !== 'education'}>

          <div className="education-grid">

            <article className="education-card"><div className="education-meta"><GraduationCap size={24} aria-hidden="true" /><span>In progress</span></div><h3>B.S. in Cloud &amp; Network Engineering</h3><p>Western Governors University · Remote</p></article>

            <article className="education-card"><div className="education-meta"><GraduationCap size={24} aria-hidden="true" /><span>2022</span></div><h3>A.A.S. in Computer &amp; Information Technology</h3><p>College of Southern Nevada · Las Vegas, NV</p><p className="degree-emphasis">Software Programming emphasis</p></article>

          </div>

          <h3 className="cert-heading">Certifications</h3>

          <div className="cert-list">

            <article className="cert-card"><Award size={24} aria-hidden="true" /><div><h4>Microsoft Certified: Azure Fundamentals</h4><p>AZ-900 · Completed</p></div></article>

            <article className="cert-card"><Award size={24} aria-hidden="true" /><div><h4>Cisco CCNA</h4><p>In progress</p></div></article>

            <article className="cert-card"><Award size={24} aria-hidden="true" /><div><h4>Microsoft 365 Certified: Endpoint Administrator Associate</h4><p>MD-102 · In progress</p></div></article>

          </div>

        </div>

        <div id="about-skills-panel" role="region" aria-labelledby="about-skills-button" hidden={view !== 'skills'}>

          <div className="skills-grid">{skillCategories.map((category) => <article className="skill-card" key={category.name}><h3>{category.name}</h3><div className="about-tags">{category.skills.map((skill) => <span className="about-tag" key={skill}>{skill}</span>)}</div></article>)}</div>

        </div>

      </div>

    </section>

  );

}
