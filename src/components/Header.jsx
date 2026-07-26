import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import site from '../content/site.json';
import { useHeaderScroll } from '../hooks/useAnimations';
import ThemeToggle from './ui/ThemeToggle';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Product', to: '/product' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
];

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('aria-hidden') !== 'true' &&
      !el.closest('[inert]'),
  );
}

function setInert(el, enabled) {
  if (!el) return;
  if (enabled) el.setAttribute('inert', '');
  else el.removeAttribute('inert');
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const scrolled = useHeaderScroll();
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const logoRef = useRef(null);
  const themeWrapRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 960px)');
    const sync = () => {
      setIsMobileNav(media.matches);
      if (!media.matches) setMenuOpen(false);
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!menuOpen || !isMobileNav) return undefined;

    const main = document.getElementById('main-content');
    const footer = document.querySelector('.site-footer');
    const backToTop = document.querySelector('.back-to-top');

    setInert(logoRef.current, true);
    setInert(themeWrapRef.current, true);
    setInert(main, true);
    setInert(footer, true);
    setInert(backToTop, true);

    const getTrapFocusables = () => {
      const navItemsFocusable = getFocusable(navRef.current);
      const toggle = toggleRef.current;
      return toggle ? [...navItemsFocusable, toggle] : navItemsFocusable;
    };

    const focusables = getTrapFocusables();
    focusables[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const items = getTrapFocusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !items.includes(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !items.includes(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.style.overflow = '';
      setInert(logoRef.current, false);
      setInert(themeWrapRef.current, false);
      setInert(main, false);
      setInert(footer, false);
      setInert(backToTop, false);
    };
  }, [menuOpen, isMobileNav]);

  const mobileMenuHidden = isMobileNav && !menuOpen;
  const dialogOpen = menuOpen && isMobileNav;

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
    >
      <div className="container site-header__inner">
        <Link
          ref={logoRef}
          to="/"
          className="logo"
          onClick={closeMenu}
          aria-label={`${site.name} home`}
        >
          <span className="logo__mark" aria-hidden="true">DH</span>
          <span className="logo__text">{site.name}</span>
        </Link>

        <nav
          ref={navRef}
          id="primary-navigation"
          className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
          aria-label={dialogOpen ? 'Site menu' : 'Primary'}
          inert={mobileMenuHidden ? true : undefined}
          {...(dialogOpen
            ? {
                role: 'dialog',
                'aria-modal': true,
              }
            : {})}
        >
          <ul className="site-nav__list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
                  }
                  onClick={closeMenu}
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="site-nav__actions">
            <Link to="/contact" className="btn btn--primary site-nav__cta" onClick={closeMenu}>
              Book a demo
            </Link>
          </div>
        </nav>

        <div className="site-header__controls">
          <div ref={themeWrapRef}>
            <ThemeToggle />
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-haspopup={isMobileNav ? 'dialog' : undefined}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle__bar" aria-hidden="true" />
            <span className="nav-toggle__bar" aria-hidden="true" />
            <span className="nav-toggle__bar" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
