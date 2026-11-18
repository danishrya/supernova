import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useSiteContent } from '../context/ContentContext';
import { IconSearch, IconClose, IconArrowRight, IconWhatsApp } from '../components/Icons';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { playClick } from '../utils/sound';

export default function PortfolioPage({ onOpenProjectModal }) {
  const { projects } = useSiteContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('kategori') || searchParams.get('filter') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filterButtons = [
    { key: 'all', label: 'Semua Karya' },
    { key: 'presentation', label: 'Desain Presentasi (PPT)' },
    { key: 'web', label: 'Website & Digital' },
    { key: 'branding', label: 'Brand & Grafis' },
  ];

  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    if (catKey === 'all') {
      searchParams.delete('kategori');
      searchParams.delete('filter');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ kategori: catKey });
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        activeCategory === 'all' || project.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.overview.toLowerCase().includes(q) ||
        (project.tags && project.tags.some((t) => t.toLowerCase().includes(q)));

      return matchCategory && matchQuery;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="page-portfolio human-page-wrap">
      <div className="container">
        <Breadcrumb items={[{ label: 'Portofolio' }]} />
      </div>

      {/* Header Banner */}
      <section className="portfolio-header-section">
        <div className="container">
          <div className="portfolio-header-content">
            <div className="section-index-stamp">
              <span>03 &bull; ARSIP &amp; CONTOH KARYA</span>
            </div>
            <h1 className="portfolio-main-title">
              Contoh format presentasi, <br />
              <span className="headline-accent">identitas brand &amp; website studio.</span>
            </h1>
            <p className="portfolio-main-lead">
              Koleksi contoh slide presentasi PPT, format profil bisnis, dan website yang siap disesuaikan dengan kebutuhan materi kamu.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="section portfolio-controls-section">
        <div className="container">
          <div className="portfolio-filter-toolbar">
            {/* Search Input */}
            <div className="portfolio-search-box">
              <IconSearch size={18} color="#f59e0b" />
              <input
                type="text"
                placeholder="Cari berdasarkan kata kunci (contoh: Pitch Deck, Tender, E-commerce, Arsitek)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="portfolio-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Bersihkan pencarian"
                >
                  <IconClose size={16} />
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="portfolio-tabs-row">
              {filterButtons.map((btn) => (
                <button
                  key={btn.key}
                  type="button"
                  className={`zine-filter-tab ${activeCategory === btn.key ? 'is-active' : ''}`}
                  onClick={() => {
                    playClick();
                    handleCategoryChange(btn.key);
                  }}
                >
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Count Bar */}
          <div className="portfolio-results-info">
            <span className="mono-count">MENAMPILKAN {filteredProjects.length} DOKUMEN KARYA</span>
            {searchQuery && (
              <span className="query-notice">Hasil pencarian untuk "{searchQuery}"</span>
            )}
          </div>

          {/* Grid of Projects */}
          <div className="portfolio-cards-grid">
            {filteredProjects.map((project, idx) => (
              <article key={project.id} className="portfolio-zine-card">
                <div className="zine-card-top">
                  <span className="card-item-no">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="card-item-badge">{project.badge || project.categoryLabel}</span>
                </div>

                <div
                  className="zine-card-media"
                  onClick={() => onOpenProjectModal && onOpenProjectModal(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="zine-card-img"
                    loading="lazy"
                  />
                  <div className="zine-card-badge-overlay">
                    <span>Lihat Rincian Studi Kasus</span>
                  </div>
                </div>

                <div className="zine-card-body">
                  <span className="card-cat-label">{project.categoryLabel}</span>
                  <h3 className="card-project-title">{project.title}</h3>
                  <p className="card-project-overview">{project.overview}</p>

                  {project.tags && (
                    <div className="card-tags-cloud">
                      {project.tags.slice(0, 3).map((t, tIdx) => (
                        <span key={tIdx} className="card-mono-tag">{t}</span>
                      ))}
                    </div>
                  )}

                  <div className="card-bottom-actions">
                    <Link
                      to={`/portofolio/${project.id}`}
                      className="card-detail-link"
                      onClick={() => playClick()}
                    >
                      <span>Studi Kasus</span>
                      <IconArrowRight size={14} />
                    </Link>
                    <button
                      type="button"
                      className="card-preview-btn"
                      onClick={() => onOpenProjectModal && onOpenProjectModal(project)}
                    >
                      Preview Cepat
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="portfolio-empty-state">
              <h3>Tidak ada karya yang sesuai kriteria</h3>
              <p>Coba gunakan kata kunci lain atau pilih tab "Semua Karya".</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer Banner */}
      <section className="section final-cta-section">
        <div className="container">
          <div className="final-cta-card zine-cta-box">
            <h2 className="cta-title">Ingin Karya Berkualitas Serupa untuk Bisnis Anda?</h2>
            <p className="cta-desc">
              Hubungi Min Cham langsung via WhatsApp. Kami siap membedah kebutuhan visual bisnis Anda secara jujur dan transparan.
            </p>
            <div className="cta-actions-group">
              <a
                href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Halo%20Min%20Cham,%20saya%20tertarik%20dengan%20portofolio%20karya%20Studio%20Supernova`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                onClick={() => playClick()}
              >
                <IconWhatsApp size={18} />
                <span>Konsultasi Proyek Baru</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
