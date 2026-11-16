import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSiteContent } from '../context/ContentContext';
import { IconSearch, IconClose, IconArrowRight } from '../components/Icons';

export default function CatalogPage({ onOpenProjectModal }) {
  const { projects } = useSiteContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('filter') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filterButtons = [
    { key: 'all', label: 'Semua Karya' },
    { key: 'presentation', label: 'Presentasi & Pitch Deck (PPT)' },
    { key: 'web', label: 'Website & Digital' },
    { key: 'branding', label: 'Brand & Desain Grafis' },
  ];

  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    if (catKey === 'all') {
      searchParams.delete('filter');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ filter: catKey });
    }
  };

  const filteredAndSortedProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        activeCategory === 'all' || project.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.overview.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="page-catalog">
      {/* Header Banner */}
      <section className="page-header-section">
        <div className="container">
          <div className="page-header-box text-center">
            <span className="section-tag">PORTOFOLIO &amp; SHOWCASE</span>
            <h1 className="page-main-title">
              Koleksi Karya Desain, PPT &amp; Web <br />
              Tampilan Mewah &amp; Terpercaya.
            </h1>
            <p className="page-main-subtitle">
              Jelajahi berbagai karya kreatif yang telah kami selesaikan untuk beragam brand dan pelaku usaha — mulai dari slide pitch deck investor, presentasi tender, website modern berkecepatan tinggi, hingga identitas visual brand kelas dunia.
            </p>
          </div>
        </div>
      </section>

      {/* Explorer Controls */}
      <section className="section catalog-explorer-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="catalog-toolbar">
            {/* Search Input */}
            <div className="catalog-search-box">
              <IconSearch size={18} color="#b8933b" />
              <input
                type="text"
                placeholder="Cari contoh karya (misal: Pitch Deck, PPT, Company Profile, Toko Online, Logo, Branding)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="catalog-search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus Pencarian"
                >
                  <IconClose size={16} />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="catalog-filter-tabs">
              {filterButtons.map((btn) => (
                <button
                  key={btn.key}
                  className={`cat-tab-btn ${activeCategory === btn.key ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(btn.key)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result Count Status */}
          <div className="catalog-status-bar">
            <span>
              Menampilkan <strong>{filteredAndSortedProjects.length}</strong> karya
              {activeCategory !== 'all' && ` dalam kategori ${activeCategory}`}
              {searchQuery && ` untuk "${searchQuery}"`}
            </span>
          </div>

          {/* Projects Grid */}
          {filteredAndSortedProjects.length > 0 ? (
            <div className="catalog-grid">
              {filteredAndSortedProjects.map((project) => (
                <article
                  key={project.id}
                  className="project-card"
                  onClick={() => onOpenProjectModal(project)}
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
                        Lihat Studi Kasus Lengkap
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
          ) : (
            <div className="catalog-empty-state">
              <div className="empty-icon-wrap">
                <IconSearch size={36} color="#dfbe76" />
              </div>
              <h3>Tidak ada karya yang sesuai dengan pencarian Anda</h3>
              <p>Coba gunakan kata kunci lain atau pilih filter "Semua Karya".</p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
              >
                Reset Filter Pencarian
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <span className="cta-banner-tag">KONSULTASI SOLUSI KHUSUS</span>
              <h2>Punya Kebutuhan Desain, Slide PPT atau Web Khusus?</h2>
              <p>
                Kami berpengalaman merancang presentasi strategis, sistem web performa tinggi, dan identitas brand yang disesuaikan dengan target bisnis Anda.
              </p>
              <div className="cta-banner-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <span>Konsultasikan Kebutuhan Anda</span>
                  <IconArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn btn-secondary btn-lg">
                  <span>Simulator Estimasi Proyek</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
