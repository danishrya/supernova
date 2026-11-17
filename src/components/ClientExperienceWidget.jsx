import React, { useState, useEffect } from 'react';
import { IconArrowRight, IconCheck, IconShield } from './Icons';

export default function ClientExperienceWidget({ onOpenProjectModal }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 'nexus-pitch-deck',
      tabLabel: 'Pitch Deck (PPT)',
      category: 'PRESENTATION & PITCH DECK',
      title: 'Nexus Capital — Investor Pitch Deck PPT',
      highlight: 'Lolos Seed Round $1.8M • 16:9 HD',
      image: '/assets/images/corporate.jpg',
      type: 'presentation',
      frameMeta: 'Slide 04 / 18 • Master .PPTX',
      specs: ['18 Slide Persuasif', 'Storytelling Data', 'Master PPTX 100% Editable'],
    },
    {
      id: 'architekton-corp',
      tabLabel: 'Web Experience',
      category: 'DIGITAL & WEB PLATFORM',
      title: 'Architekton — Website Profil Arsitektur',
      highlight: 'Speed < 0.4s • Google Lighthouse 99',
      image: '/assets/images/devices-showcase.jpg',
      type: 'web',
      frameMeta: 'https://supernovastudio.design/architekton',
      specs: ['Loading Kilat di HP', 'Galeri HD Layar Penuh', 'Domain & Server Siap Pakai'],
    },
    {
      id: 'valkyrie-brand-identity',
      tabLabel: 'Brand Identity',
      category: 'BRAND IDENTITY & SYSTEM',
      title: 'Valkyrie Apparel — Brand Identity & Guidelines',
      highlight: 'Full Vector Identity • Ready for Print & Social',
      image: '/assets/images/ecommerce.jpg',
      type: 'branding',
      frameMeta: 'Vector 300 DPI • RGB & CMYK',
      specs: ['Logo Utama & Monogram', 'Palet Warna & Font', 'Template Medsos Canva/PSD'],
    },
    {
      id: 'artisan-roastery-collateral',
      tabLabel: 'Kemasan & Menu',
      category: 'PACKAGING & COLLATERAL',
      title: 'Aura Artisan Coffee — Packaging & Menu Design',
      highlight: '+65% Retail Sales Naik di Bulan Pertama',
      image: '/assets/images/resto-cafe.jpg',
      type: 'collateral',
      frameMeta: 'Master Vektor .AI / .SVG / .PDF',
      specs: ['Desain Kemasan Pouch', 'Buku Menu Digital', 'Brosur & Standing Banner'],
    },
  ];

  // Auto advance every 4.5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const current = slides[activeIdx];

  return (
    <div
      className="hero-interactive-stage"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Floating Studio Pill */}
      <div className="stage-floating-chip top-right">
        <IconShield size={13} color="#dfbe76" />
        <span>100% Hak Milik Master File</span>
      </div>

      {/* Main Stage Frame */}
      <div className="stage-device-frame">
        {/* Frame Topbar (Customized based on project type) */}
        <div className="frame-os-bar">
          <div className="os-traffic-lights">
            <span className="light red" />
            <span className="light yellow" />
            <span className="light green" />
          </div>
          <div className="frame-meta-pill">
            <span className="meta-icon">{current.type === 'web' ? '🔒' : '✦'}</span>
            <span className="meta-text">{current.frameMeta}</span>
          </div>
          <span className="frame-counter">
            0{activeIdx + 1} / 0{slides.length}
          </span>
        </div>

        {/* Media Canvas with Animated Transition */}
        <div className="frame-canvas">
          <img
            key={current.id}
            src={current.image}
            alt={current.title}
            className="canvas-image"
          />
          <div className="canvas-gradient-scrim" />

          {/* Floating Metric Badge */}
          <div className="canvas-metric-badge">
            <span className="metric-dot" />
            <span>{current.highlight}</span>
          </div>

          {/* Overlay Info at Bottom */}
          <div className="canvas-caption-area">
            <span className="canvas-cat-tag">{current.category}</span>
            <h3 className="canvas-project-title">{current.title}</h3>

            <div className="canvas-specs-row">
              {current.specs.map((spec, i) => (
                <span key={i} className="canvas-spec-pill">
                  <IconCheck size={11} color="#dfbe76" />
                  <span>{spec}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Progress Switcher Bar */}
        <div className="stage-switcher-tabs">
          {slides.map((s, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={s.id}
                type="button"
                className={`stage-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="tab-progress-wrap">
                  <div
                    className={`tab-progress-bar ${isActive && !isPaused ? 'running' : ''}`}
                  />
                </div>
                <span className="tab-label-text">{s.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Live Status Chip */}
      <div className="stage-floating-chip bottom-left">
        <span className="live-pulse-dot" />
        <span>Respon Cepat via WhatsApp</span>
      </div>
    </div>
  );
}
