import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { IconArrowRight, IconWhatsApp, IconClose } from './Icons';
import { playClick } from '../utils/sound';
import { STUDIO_CONFIG } from '../config/studioConfig';

export default function Navbar({ onLogoEasterEgg }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const location = useLocation();

  // Enforce dark tactile theme on mount & cleanup any stale light mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.remove('theme-light');
    document.documentElement.classList.add('theme-dark');
    try {
      localStorage.setItem('supernova_theme', 'dark');
    } catch (e) {}
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change & prevent body scroll when open
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLogoClick = () => {
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
    { label: 'Beranda', path: '/' },
    { label: 'Layanan', path: '/layanan' },
    { label: 'Portofolio', path: '/portofolio' },
    { label: 'Produk Digital', path: '/produk-digital' },
    { label: 'Harga & Estimasi', path: '/harga' },
    { label: 'Tentang', path: '/tentang' },
    { label: 'Kontak', path: '/kontak' },
  ];

  return (
    <header className={`site-header-floating-wrap ${scrolled ? 'is-scrolled' : 'is-top'}`}>
      <div className={`floating-navbar ${scrolled ? 'scrolled' : ''}`} id="floatingNav">
        {/* Brand Wordmark with Signature Supernova Dot */}
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
              alt="Studio Supernova"
              className="brand-logo-img"
            />
          </div>
          <span className="brand-text">
            SUPERNOVA<span className="brand-sub">STUDIO</span>
            <span className="supernova-signature-dot" title="The Supernova Dot" />
          </span>
        </Link>

        {/* Desktop Multi-Page Nav Links */}
        <nav className="floating-nav-links" id="mainNav" aria-label="Navigasi Utama">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `floating-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => playClick()}
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Actions: Estimasi CTA + Mobile Menu Button */}
        <div className="navbar-right-action">
          <Link
            to="/harga"
            className="floating-cta-btn"
            id="navCtaBtn"
            onClick={() => playClick()}
            data-cursor="Hitung"
          >
            <span>Minta Estimasi</span>
            <IconArrowRight size={14} />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className={`mobile-toggle-pill ${mobileOpen ? 'is-active' : ''}`}
            id="mobileToggle"
            aria-label={mobileOpen ? 'Tutup Menu' : 'Buka Menu'}
            onClick={() => {
              playClick();
              setMobileOpen(!mobileOpen);
            }}
          >
            <span className={`hamburger-bar ${mobileOpen ? 'open' : ''}`} />
            <span className={`hamburger-bar ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          FULLSCREEN ANIMATED MOBILE MENU (Anti-AI Slop: Big Editorial Serif + Zine Stickers)
          ========================================================================= */}
      <div
        className={`fullscreen-mobile-menu ${mobileOpen ? 'is-open' : ''}`}
        id="fullscreenMobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu Layar Penuh"
      >
        <div className="fs-menu-backdrop" onClick={() => setMobileOpen(false)} />
        <div className="fs-menu-sheet">
          <div className="fs-menu-header">
            <div className="fs-brand">
              <span className="fs-brand-title">STUDIO SUPERNOVA</span>
              <span className="fs-brand-badge">EDISI INDONESIA &bull; 2026</span>
            </div>
            <button
              type="button"
              className="fs-close-btn"
              onClick={() => {
                playClick();
                setMobileOpen(false);
              }}
              aria-label="Tutup Menu"
            >
              <IconClose size={20} />
            </button>
          </div>

          <nav className="fs-nav-links">
            {navItems.map((item, idx) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `fs-nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  playClick();
                  setMobileOpen(false);
                }}
              >
                <span className="fs-item-index">0{idx + 1}</span>
                <span className="fs-item-title">{item.label}</span>
                <span className="fs-item-arrow">&rarr;</span>
              </NavLink>
            ))}
          </nav>

          {/* Sub-Services Quick Links */}
          <div className="fs-quick-services">
            <span className="fs-section-tag">SPESIALISASI KAMI:</span>
            <div className="fs-services-chips">
              <Link
                to="/layanan/desain-ppt"
                className="fs-chip"
                onClick={() => setMobileOpen(false)}
              >
                Desain Presentasi PPT &rarr;
              </Link>
              <Link
                to="/layanan/website"
                className="fs-chip"
                onClick={() => setMobileOpen(false)}
              >
                Pembuatan Website Kilat &rarr;
              </Link>
            </div>
          </div>

          {/* Footer Contact Details */}
          <div className="fs-menu-footer">
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Halo%20Min%20Cham,%20saya%20mau%20konsultasi`}
              target="_blank"
              rel="noopener noreferrer"
              className="fs-whatsapp-cta"
              onClick={() => setMobileOpen(false)}
            >
              <IconWhatsApp size={18} />
              <span>Chat WhatsApp Min Cham ({STUDIO_CONFIG.phone})</span>
            </a>
            <p className="fs-guarantee-note">
              ✦ {STUDIO_CONFIG.guaranteeText}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
