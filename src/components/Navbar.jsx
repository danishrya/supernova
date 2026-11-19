import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { playClick } from '../utils/sound';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
      <header className="figma-navbar" data-name="Header - STICKY NAVBAR (72px)">
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

          {/* Desktop Center Links */}
          <nav
            className="figma-nav-center"
            aria-label="Navigasi Utama"
            data-name="Nav - Center Links"
          >
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
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && <span className="figma-nav-active-dot" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
