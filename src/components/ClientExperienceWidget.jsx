import React, { useState } from 'react';

export default function ClientExperienceWidget() {
  const [activeIdx, setActiveIdx] = useState(0);

  const slides = [
    {
      id: 'nexus',
      tabLabel: 'Pitch Deck',
      category: 'PRESENTATION & PITCH DECK',
      title: 'Nexus Capital',
      highlight: 'Lolos Pendanaan Seed Round',
      image: '/assets/images/corporate.jpg',
    },
    {
      id: 'architekton',
      tabLabel: 'Web Experience',
      category: 'DIGITAL & WEB PLATFORM',
      title: 'A&E Architekton',
      highlight: 'Ultra-fast Portfolio Web',
      image: '/assets/images/devices-showcase.jpg',
    },
    {
      id: 'valkyrie',
      tabLabel: 'Brand Identity',
      category: 'BRAND IDENTITY & SYSTEM',
      title: 'Valkyrie Studio',
      highlight: 'Identitas Visual Lengkap',
      image: '/assets/images/ecommerce.jpg',
    },
  ];

  const current = slides[activeIdx];

  return (
    <div className="hero-showcase-card minimalist-showcase">
      {/* Top Clean Switcher */}
      <div className="showcase-minimal-nav">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`minimal-tab ${activeIdx === idx ? 'active' : ''}`}
            onClick={() => setActiveIdx(idx)}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      {/* Main Image Frame */}
      <div className="showcase-minimal-frame">
        <img
          src={current.image}
          alt={current.title}
          className="showcase-minimal-img"
        />
        <div className="showcase-minimal-overlay" />

        {/* Floating Minimal Info */}
        <div className="showcase-minimal-badge">
          <span className="badge-dot-live" />
          <span>{current.highlight}</span>
        </div>

        <div className="showcase-minimal-caption">
          <span className="caption-cat">{current.category}</span>
          <h3 className="caption-title">{current.title}</h3>
        </div>
      </div>
    </div>
  );
}
