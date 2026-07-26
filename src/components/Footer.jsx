import { Link } from 'react-router-dom';
import site from '../content/site.json';
import Reveal from './ui/Reveal';
import Icon from './ui/Icon';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Product', to: '/product' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
];

const socialLinks = [
  { label: 'YouTube', href: site.social.youtube, icon: 'youtube' },
  { label: 'LinkedIn', href: site.social.linkedin, icon: 'linkedin' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container site-footer__grid">
        <Reveal variant="fade-up">
          <div>
            <p className="site-footer__brand">
              <span className="site-footer__brand-mark" aria-hidden="true">DH</span>
              {site.name}
            </p>
            <p className="site-footer__tagline">{site.tagline}</p>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={80}>
          <nav aria-label="Footer">
            <p className="site-footer__heading">Company</p>
            <ul className="site-footer__list">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal variant="fade-up" delay={160}>
          <div>
            <p className="site-footer__heading">Contact</p>
            <address className="site-footer__address">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </address>
          </div>
        </Reveal>
      </div>

      <div className="container site-footer__bottom">
        <div className="site-footer__bottom-copy">
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <p className="site-footer__credit">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built for Digital Heroes
              <span>Training Task</span>
            </a>
          </p>
        </div>
        <ul className="site-footer__social" aria-label="Social media">
          {socialLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <Icon name={item.icon} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
