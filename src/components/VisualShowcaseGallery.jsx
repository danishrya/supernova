import React, { useState } from 'react';
import { useSiteContent } from '../context/ContentContext';
import { IconArrowRight } from './Icons';

export default function VisualShowcaseGallery({ onOpenProjectModal }) {
  const { projects } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState('all');

  const countAll = projects.length;
  const countPres = projects.filter((p) => p.category === 'presentation').length;
  const countWeb = projects.filter((p) => p.category === 'web').length;
  const countBrand = projects.filter((p) => p.category === 'branding').length;

  const categories = [
    { id: 'all', label: 'Semua Karya', count: countAll },
    { id: 'presentation', label: 'Pitch Deck & PPT', count: countPres },
    { id: 'web', label: 'Website & Digital', count: countWeb },
    { id: 'branding', label: 'Brand & Grafis', count: countBrand },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section visual-gallery-section" id="gallery">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: 36 }}>
          <span className="section-tag">SELECTED WORKS</span>
          <h2 className="section-title">Karya &amp; Studi Kasus Terpilih</h2>
          <p className="section-subtitle">
            Koleksi slide presentasi investor, rekayasa website modern, dan identitas brand yang dirancang untuk hasil nyata.
          </p>

          {/* Interactive Filter Pills */}
          <div className="gallery-filter-pills minimal-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`gallery-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="filter-count-badge">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Studio Showcase Grid */}
        <div className="visual-cards-grid studio-works-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="visual-card-item studio-card-item"
              onClick={() => onOpenProjectModal(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpenProjectModal(project)}
            >
              <div className="visual-card-media">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="v-card-img"
                />
                <div className="v-card-hover-overlay">
                  <span className="v-card-cta-pill">
                    <span>Lihat Detail Studi Kasus</span>
                    <IconArrowRight size={14} />
                  </span>
                </div>
                <span className="v-card-cat-pill">{project.categoryLabel || project.category}</span>
              </div>

              <div className="visual-card-details studio-card-details">
                <div className="v-card-meta-row">
                  <span className="v-card-metric-highlight">{project.badge}</span>
                </div>
                <h3 className="v-card-title">{project.title}</h3>
                <p className="v-card-overview-text">{project.overview}</p>
                <div className="v-card-tags-row">
                  {(project.tags || []).slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="v-card-tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
