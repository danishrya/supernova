import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projects';

export default function Catalog({ onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const filterButtons = [
    { key: 'all', label: 'Semua Karya' },
    { key: 'presentation', label: 'Presentasi & PPT' },
    { key: 'web', label: 'Website & Digital' },
    { key: 'branding', label: 'Brand & Desain' },
  ];

  const filteredProjects =
    filter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section className="section catalog-section" id="catalog">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">SHOWCASE KATALOG &amp; PORTOFOLIO</span>
          <h2 className="section-title">Katalog Solusi Kreatif &amp; Digital</h2>
          <p className="section-subtitle">
            Koleksi karya slide presentasi (PPT), rekayasa website modern, dan identitas visual brand kelas dunia. Klik pada setiap proyek untuk melihat detail solusi.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="catalog-filter-bar">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              className={`filter-btn ${filter === btn.key ? 'active' : ''}`}
              onClick={() => setFilter(btn.key)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="catalog-grid" id="catalogGrid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card"
              onClick={() => onSelectProject && onSelectProject(project)}
            >
              <div className="card-media">
                {project.image ? (
                  <img src={project.image} alt={project.title} loading="lazy" />
                ) : (
                  <div className="card-placeholder-visual energy-bg">
                    <div className="visual-decor">
                      <span className="decor-tag">CREATIVE SOLUTION</span>
                      <h4>{project.title.split('—')[0]}</h4>
                    </div>
                  </div>
                )}
                <div className="card-category-badge">{project.categoryLabel}</div>
                <div className="card-overlay">
                  <button className="btn btn-primary btn-sm open-modal-btn">
                    Lihat Studi Kasus
                  </button>
                </div>
              </div>

              <div className="card-content">
                <div className="card-metrics-chip">
                  <span className="chip-dot"></span> {project.badge}
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.overview}</p>
                <div className="tech-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
