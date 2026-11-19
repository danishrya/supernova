import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { playClick } from '../utils/sound';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Directional scroll listener & dynamic island elevation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled threshold (becomes floating island)
      if (currentScrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Smart hide on fast scroll down, reveal on scroll up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current + 8) {
          setNavVisible(false);
        } else if (currentScrollY < lastScrollY.current - 8) {
          setNavVisible(true);
        }
      } else {
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update gliding active indicator position
  const updatePill = () => {
    if (!navRef.current) return;
    const activeItem = navRef.current.querySelector('.figma-nav-item.is-active');
    if (activeItem) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      setPillStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    setMobileOpen(false);
    // Short delay to let React Router finish class updates on active item
    const timer = setTimeout(updatePill, 40);
    window.addEventListener('resize', updatePill);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePill);
    };
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

  const navItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Layanan', path: '/layanan' },
    { label: 'Portofolio', path: '/portofolio' },
    { label: 'Produk', path: '/produk-digital' },
    { label: 'Harga', path: '/harga' },
    { label: 'Tentang', path: '/tentang' },
    { label: 'Kontak', path: '/kontak' },
  ];

  return (
    <>
      <header
        className={`figma-navbar ${isScrolled ? 'is-scrolled' : ''} ${
          navVisible || mobileOpen ? 'is-visible' : 'is-hidden'
        }`}
        data-name="Header - DYNAMIC SMART NAVBAR"
      >
        <div className="figma-navbar-container">
          {/* Brand Logo Left */}
          <Link
            to="/"
            className="figma-brand-link"
            onClick={() => playClick()}
            data-name="Link - Brand Logo Left"
          >
            <span className="figma-brand-title">Supernova</span>
            <span className="figma-brand-studio">STUDIO</span>
            <span className="figma-brand-dot" />
          </Link>

          {/* Desktop Center Links with Gliding Pill Indicator */}
          <nav
            ref={navRef}
            className="figma-nav-center"
            aria-label="Navigasi Utama"
            data-name="Nav - Center Links"
          >
            {/* Smooth Sliding Pill Indicator */}
            <span
              className="figma-nav-gliding-pill"
              style={{
                transform: `translateX(${pillStyle.left}px)`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
              }}
              aria-hidden="true"
            />

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `figma-nav-item ${isActive ? 'is-active' : ''}`
                }
                onClick={() => playClick()}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme Toggle Button (Dark / Light) */}
            <button
              type="button"
              className="figma-theme-toggle"
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              aria-label={theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
              title={theme === 'dark' ? 'Tema Terang' : 'Tema Gelap'}
            >
              {theme === 'dark' ? (
                /* Sun Icon for Switching to Light */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon Icon for Switching to Dark */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <Link
              to="/harga"
              className="figma-nav-cta"
              onClick={() => playClick()}
              data-name="Link - Right Action CTA"
            >
              <span>Minta estimasi</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.625 7H11.375M7.875 3.5L11.375 7L7.875 10.5"
                  stroke="#14110F"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <button
              type="button"
              className="figma-nav-mobile-toggle"
              onClick={() => {
                playClick();
                setMobileOpen(true);
              }}
              aria-label="Buka Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay (Figma 2001:3256) */}
      {mobileOpen && (
        <div className="figma-mobile-menu-overlay" role="dialog" aria-modal="true">
          <div className="figma-mobile-menu-header">
            <div className="figma-brand-link">
              <span className="figma-brand-title">Supernova</span>
              <span className="figma-brand-studio">STUDIO</span>
              <span className="figma-brand-dot" />
            </div>
            <button
              type="button"
              className="figma-mobile-close-btn"
              onClick={() => {
                playClick();
                setMobileOpen(false);
              }}
              aria-label="Tutup Menu"
            >
              &times;
            </button>
          </div>

          <nav className="figma-mobile-links-list">
            {navItems.map((item, idx) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className="figma-mobile-link-row"
                onClick={() => {
                  playClick();
                  setMobileOpen(false);
                }}
              >
                <div className="figma-mobile-link-left">
                  <span className="figma-mobile-link-idx">0{idx + 1}</span>
                  <span className="figma-mobile-link-title">{item.label}</span>
                </div>
                <span className="figma-mobile-link-arrow">&rarr;</span>
              </NavLink>
            ))}
          </nav>

          <div className="figma-mobile-menu-footer">
            <div className="figma-mobile-theme-row">
              <span className="figma-mobile-theme-label">Mode Tampilan:</span>
              <button
                type="button"
                className="figma-mobile-theme-btn"
                onClick={() => {
                  playClick();
                  toggleTheme();
                }}
              >
                {theme === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
              </button>
            </div>

            <Link
              to="/harga"
              className="figma-mobile-cta-btn"
              onClick={() => {
                playClick();
                setMobileOpen(false);
              }}
            >
              Minta estimasi &rarr;
            </Link>
            <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--figma-text-muted)' }}>
              KONSULTASI AWAL LEWAT WHATSAPP
            </div>
          </div>
        </div>
      )}
    </>
  );
}
