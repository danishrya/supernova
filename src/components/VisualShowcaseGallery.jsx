import React, { useState } from 'react';
import { useSiteContent } from '../context/ContentContext';

export default function VisualShowcaseGallery({ onOpenProjectModal }) {
  const { projects } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'presentation', label: 'Pitch Deck' },
    { id: 'branding', label: 'Brand Identity' },
    { id: 'web', label: 'Web & Digital' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section visual-gallery-section" id="gallery">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: 32 }}>
          <span className="section-tag">SELECTED WORKS</span>
          <h2 className="section-title">Karya Terpilih</h2>

          {/* Minimal Category Filter Pills */}
          <div className="gallery-filter-pills minimal-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`gallery-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Visual Showcase Grid */}
        <div className="visual-cards-grid minimal-works-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="visual-card-item minimal-card-item"
              onClick={() => onOpenProjectModal(project)}
            >
              <div className="visual-card-media">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="v-card-img"
                />
                <div className="v-card-hover-overlay">
                  <span className="btn btn-primary btn-sm">Lihat Proyek</span>
                </div>
              </div>

              <div className="visual-card-details minimal-card-details">
                <div className="v-card-topline">
                  <h3 className="v-card-title">{project.title.split('—')[0].trim()}</h3>
                  <span className="v-card-badge-minimal">{project.categoryLabel}</span>
                </div>
                <p className="v-card-sub-minimal">{project.badge}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
