import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { IconArrowRight, IconWhatsApp } from './Icons';
import { playClick, playPop } from '../utils/sound';

export default function Navbar({ onLogoEasterEgg }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('supernova_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Set theme attribute on root html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('supernova_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    playPop();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogoClick = (e) => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 5) {
      setClickCount(0);
      playClick();
      if (onLogoEasterEgg) {
        onLogoEasterEgg();
      }
    }
  };

  const navItems = [
    { label: 'Layanan', path: '/#layanan' },
    { label: 'Karya', path: '/catalog' },
    { label: 'Before/After', path: '/#comparison' },
    { label: 'Kalkulator', path: '/#kalkulator' },
    { label: 'Produk Digital', path: '/#produk-digital' },
    { label: 'Tentang', path: '/#tentang' },
    { label: 'FAQ', path: '/#faq' },
  ];

  return (
    <header className={`site-header-floating-wrap ${scrolled ? 'is-scrolled' : 'is-top'}`}>
      <div className={`floating-navbar ${scrolled ? 'scrolled' : ''}`} id="floatingNav">
        {/* Brand Logo with Meteor Easter Egg */}
        <Link
          to="/"
          className="brand-logo"
          id="brandLogo"
          onClick={handleLogoClick}
          title="Klik 5x untuk easter egg hujan meteor 🌠"
        >
          <div className="logo-coin-wrapper">
            <img
              src="/assets/images/supernova-logo.jpg"
              alt="Supernova Studio"
              className="brand-logo-img"
            />
          </div>
          <span className="brand-text">
            SUPERNOVA<span className="brand-sub">STUDIO</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="floating-nav-links" id="mainNav">
          {navItems.map((item) => {
            const isAnchor = item.path.includes('#');
            if (isAnchor) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  className="floating-nav-link"
                  onClick={() => playClick()}
                >
                  <span>{item.label}</span>
                </a>
              );
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `floating-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => playClick()}
              >
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Actions: Theme Toggle + WhatsApp CTA */}
        <div className="navbar-right-action">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-label="Toggle Mode Terang/Gelap"
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>

          <Link
            to="/contact"
            className="floating-cta-btn"
            id="navCtaBtn"
            onClick={() => playClick()}
            data-cursor="Chat"
          >
            <span>Konsul Min Cham</span>
            <IconArrowRight size={14} />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-toggle-pill"
            id="mobileToggle"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`hamburger-bar ${mobileOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-bar ${mobileOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-floating-menu ${mobileOpen ? 'open' : ''}`} id="mobileDrawer">
        <div className="mobile-links-wrapper">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="mobile-nav-item"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/contact"
            className="mobile-cta-action"
            onClick={() => setMobileOpen(false)}
          >
            <IconWhatsApp size={16} />
            <span>Chat WhatsApp Min Cham</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
