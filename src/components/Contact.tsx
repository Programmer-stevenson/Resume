import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Linkedin, MapPin, Github, Globe, ArrowUpRight, Copy, Check } from 'lucide-react';

const email = 'brandon.stevensonn@outlook.com';
const phone = '(725) 314-2660';
const profiles = [
  { name: 'LinkedIn', detail: 'Professional background', icon: Linkedin, href: 'https://www.linkedin.com/in/brandonstevensonprograms' },
  { name: 'GitHub', detail: 'Code & technical projects', icon: Github, href: 'https://github.com/Programmer-stevenson' },
  { name: 'Website', detail: 'My portfolio', icon: Globe, href: 'https://brandons-resume.com' },
];

const styles = `
#contact.bs-contact {
  --contact-ink:#f3f8ff; --contact-muted:#b3c8dd; --contact-blue:#b8ddfa;
  position:relative;isolation:isolate;overflow:hidden;scroll-margin-top:80px;
  padding:96px 28px 44px;color:var(--contact-ink);
  font-family:Inter,'Segoe UI',Arial,sans-serif;
  background:radial-gradient(ellipse at 92% 10%,#234d7466 0%,transparent 48%),radial-gradient(ellipse at 0% 100%,#193d5f66 0%,transparent 45%),linear-gradient(130deg,#081727 0%,#102b46 54%,#0a1c30 100%);
}
#contact.bs-contact:before {content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#c3e3ff90,transparent)}
.bs-contact,.bs-contact * {box-sizing:border-box}
.bs-contact h2,.bs-contact h3,.bs-contact p {margin:0}
.bs-contact a {text-decoration:none}
.bs-contact button {font:inherit;cursor:pointer}
.bs-contact svg {flex-shrink:0}
.bs-contact .contact-wrap {max-width:1180px;margin:auto;position:relative}
.bs-contact .contact-eyebrow {display:flex;align-items:center;gap:16px;color:#a7c9e5;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;margin-bottom:30px}
.bs-contact .contact-eyebrow:after {content:'';width:70px;height:1px;background:#5d85a6}
.bs-contact .contact-layout {display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.06fr);gap:70px;align-items:center}
.bs-contact .contact-intro {min-width:0;padding-bottom:10px}
.bs-contact .contact-intro h2 {font-size:clamp(44px,5.5vw,72px);font-weight:600;line-height:1.04;letter-spacing:-.055em;color:#f3f8ff;margin-bottom:26px}
.bs-contact .contact-intro h2 span {display:block;color:#b7dafa;font-weight:400}
.bs-contact .contact-intro>p {font-size:15px;line-height:1.9;color:var(--contact-muted);max-width:425px}
.bs-contact .contact-cta {display:inline-flex;align-items:center;justify-content:center;gap:20px;min-height:54px;padding:15px 23px;border:1px solid #dbedfc;background:linear-gradient(130deg,#edf7ff,#add4f3);color:#113351;font-size:13px;font-weight:650;border-radius:10px;margin-top:30px;box-shadow:0 8px 28px #020c181a;transition:background .2s,box-shadow .2s}
.bs-contact .contact-cta:hover {background:#fff;box-shadow:0 8px 32px #9ed2f52b}
.bs-contact .contact-location {display:flex;align-items:flex-start;gap:11px;margin-top:34px;color:#b9cee1;font-size:12px;line-height:1.8}
.bs-contact .contact-location svg {color:#92bce0;margin-top:3px}
.bs-contact .contact-location strong {display:block;font-weight:500;color:#deebf6}
.bs-contact .contact-location span {display:block;color:#a6bed3;font-size:11px}
.bs-contact .contact-panel {min-width:0;padding:30px;border:1px solid #4e75944f;border-radius:22px;background:linear-gradient(145deg,#173754cc,#102a42dd);box-shadow:0 20px 60px #020b1729}
.bs-contact .contact-panel-label {font-size:10px;text-transform:uppercase;letter-spacing:.17em;font-weight:600;color:#a3c4df;margin-bottom:10px}
.bs-contact .contact-panel h3 {font-size:24px;line-height:1.3;letter-spacing:-.03em;font-weight:500;margin-bottom:27px;color:#f0f7ff}
.bs-contact .contact-channel {padding:22px 0;border-top:1px solid #547b974d}
.bs-contact .contact-channel-label {display:flex;align-items:center;gap:8px;color:#a9c9e3;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;margin-bottom:13px}
.bs-contact .contact-channel-line {display:flex;gap:12px;align-items:center;justify-content:space-between;min-width:0}
.bs-contact .contact-value {color:#f1f7fd;font-size:clamp(14px,1.45vw,18px);font-weight:500;line-height:1.6;overflow-wrap:anywhere;min-width:0}
.bs-contact .contact-value:hover {color:#afd8fa;text-decoration:underline;text-underline-offset:5px}
.bs-contact .contact-copy {display:grid;place-items:center;flex-shrink:0;width:44px;height:44px;border:1px solid #557f9e80;border-radius:9px;color:#bbd9ef;background:#0c233866}
.bs-contact .contact-copy:hover {background:#274d6a;border-color:#89b5d5}
.bs-contact .contact-channel-note {font-size:11px;line-height:1.7;color:#a8c0d5;margin-top:5px}
.bs-contact .contact-profiles {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;border-top:1px solid #547b974d;padding-top:23px;margin-top:1px}
.bs-contact .contact-profile {display:flex;flex-direction:column;align-items:flex-start;gap:11px;padding:15px 12px;border:1px solid #517b984d;border-radius:10px;background:#0b22364d;color:#d7eafa;min-width:0;transition:background .2s,border-color .2s}
.bs-contact .contact-profile:hover {background:#264c6c;border-color:#8eb9d7}
.bs-contact .contact-profile span {font-size:11px;font-weight:500}
.bs-contact a:focus-visible,.bs-contact button:focus-visible {outline:3px solid #b4dcfa;outline-offset:5px}
.bs-contact .contact-footer {display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;padding-top:27px;margin-top:65px;border-top:1px solid #476b884d;font-size:11px;color:#9fb9ce;line-height:1.8}
.bs-contact .contact-footer strong {font-size:12px;font-weight:500;color:#dae9f5}
.bs-contact .contact-feedback {min-height:22px;margin-top:15px;font-size:11px;line-height:1.7;color:#c7e4f9}
@media(max-width:1000px) {.bs-contact .contact-layout {gap:35px;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr)}.bs-contact .contact-panel {padding:25px}.bs-contact .contact-intro h2 {font-size:56px}}
@media(max-width:760px) {#contact.bs-contact {padding:65px 22px 32px}.bs-contact .contact-layout {grid-template-columns:1fr;gap:32px}.bs-contact .contact-intro h2 {font-size:clamp(43px,9vw,62px)}.bs-contact .contact-intro>p {max-width:570px;font-size:14px}.bs-contact .contact-value {font-size:17px}.bs-contact .contact-location {margin-top:23px}.bs-contact .contact-footer {margin-top:39px}.bs-contact .contact-eyebrow {margin-bottom:24px}}
@media(max-width:400px) {#contact.bs-contact {padding-left:16px;padding-right:16px}.bs-contact .contact-panel {padding:22px 18px}.bs-contact .contact-value {font-size:14px}.bs-contact .contact-channel-line {gap:9px}.bs-contact .contact-profiles {gap:7px}.bs-contact .contact-profile {padding:14px 10px}.bs-contact .contact-cta {width:100%}.bs-contact .contact-footer {align-items:flex-start;flex-direction:column;gap:6px}}
@media(prefers-reduced-motion:reduce) {.bs-contact .contact-cta,.bs-contact .contact-profile {transition:none}}
`;

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef(0);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); request.current += 1; }, []);

  const copyContact = async (label: string, value: string) => {
    const current = ++request.current;
    if (timer.current) clearTimeout(timer.current);
    setCopied(null);
    setFeedback('');
    try {
      await navigator.clipboard.writeText(value);
      if (current !== request.current) return;
      setCopied(label);
      setFeedback(`${label} copied.`);
      timer.current = setTimeout(() => { setCopied(null); setFeedback(''); }, 2400);
    } catch {
      if (current !== request.current) return;
      setFeedback(`Could not copy ${label.toLowerCase()}. Select and copy the text, or use the contact link.`);
    }
  };

  return (
    <section id="contact" className="bs-contact" aria-labelledby="contact-heading">
      <style>{styles}</style>
      <div className="contact-wrap">
        <p className="contact-eyebrow">Get in touch</p>
        <div className="contact-layout">
          <div className="contact-intro">
            <h2 id="contact-heading">Let&apos;s connect.<span>Start a conversation.</span></h2>
            <p>Have an IT opportunity, a development project, or a team you think I would be a good fit for? I would be glad to hear from you.</p>
            <a className="contact-cta" href={`mailto:${email}`}><Mail size={18} aria-hidden="true" />Send me an email<ArrowUpRight size={18} aria-hidden="true" /></a>
            <div className="contact-location"><MapPin size={17} aria-hidden="true" /><div><strong>Las Vegas, Nevada</strong><span>Open to remote &amp; on-site opportunities</span></div></div>
          </div>
          <div className="contact-panel">
            <p className="contact-panel-label">Contact details</p>
            <h3>Reach me directly</h3>
            <div className="contact-channel">
              <div className="contact-channel-label"><Mail size={14} aria-hidden="true" />Email</div>
              <div className="contact-channel-line">
                <a className="contact-value" href={`mailto:${email}`}>{email}</a>
                <button type="button" className="contact-copy" aria-label="Copy email address" onClick={() => copyContact('Email', email)}>{copied === 'Email' ? <Check size={17} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}</button>
              </div>
              <p className="contact-channel-note">For opportunities, introductions, and project enquiries.</p>
            </div>
            <div className="contact-channel">
              <div className="contact-channel-label"><Phone size={14} aria-hidden="true" />Phone</div>
              <div className="contact-channel-line">
                <a className="contact-value" href="tel:+17253142660">{phone}</a>
                <button type="button" className="contact-copy" aria-label="Copy phone number" onClick={() => copyContact('Phone', phone)}>{copied === 'Phone' ? <Check size={17} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}</button>
              </div>
              <p className="contact-channel-note">Call or text.</p>
            </div>
            <nav className="contact-profiles" aria-label="Professional profiles">
              {profiles.map(({ name, detail, icon: Icon, href }) => <a key={name} className="contact-profile" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${detail} (opens in a new tab)`}><Icon size={20} aria-hidden="true" /><span>{name}</span></a>)}
            </nav>
            <p className="contact-feedback" role="status" aria-live="polite">{feedback}</p>
          </div>
        </div>
        <div className="contact-footer"><strong>Brandon Stevenson</strong><span>IT Infrastructure · Endpoint Management · Development &amp; Automation</span></div>
      </div>
    </section>
  );
}
