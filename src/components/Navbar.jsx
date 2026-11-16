import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { IconArrowRight } from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Works', path: '/catalog' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`site-header-floating-wrap ${scrolled ? 'is-scrolled' : 'is-top'}`}>
      <div className={`floating-navbar ${scrolled ? 'scrolled' : ''}`} id="floatingNav">
        {/* Brand Logo with User Gold Coin */}
        <Link to="/" className="brand-logo" id="brandLogo">
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

        {/* Desktop Nav Links - Clean & Minimalist in English */}
        <nav className="floating-nav-links" id="mainNav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `floating-nav-link ${isActive ? 'active' : ''}`}
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Single Sleek CTA Button */}
        <div className="navbar-right-action">
          <Link to="/contact" className="floating-cta-btn" id="navCtaBtn">
            <span>Get in Touch</span>
            <IconArrowRight size={15} />
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
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="mobile-cta-action">
            <span>Get in Touch via WhatsApp</span>
            <IconArrowRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}
