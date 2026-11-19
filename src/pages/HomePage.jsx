import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';
import { STUDIO_CONFIG } from '../config/studioConfig';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import AboutMinCham from '../components/AboutMinCham';
import DraggableTestimonials from '../components/DraggableTestimonials';
import { IconArrowRight, IconWhatsApp } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function HomePage({ onOpenProjectModal }) {
  const caseStudies = PROJECTS_DATA.slice(0, 3);
  const heroCase = caseStudies[0]; // Nexus Capital

  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Kami tertarik untuk konsultasi santai mengenai kebutuhan desain presentasi/website di Studio Supernova.'
  )}`;

  return (
    <div className="page-home human-page-wrap">
      {/* =========================================================================
          HERO SECTION: CLEAN, BOLD & AUTHENTIC STUDIO HERO
          ========================================================================= */}
      <section className="hero-studio-section" id="hero">
        <div className="container">
          <div className="hero-top-meta">
            <span className="studio-pill-tag">STUDIO DESAIN &bull; JAKARTA</span>
            <span className="studio-status-live">
              <span className="live-dot" /> Siap Terima Proyek Baru
            </span>
          </div>

          <div className="hero-grid-layout">
            {/* Left Column: Clear Value Proposition */}
            <div className="hero-content-col">
              <h1 className="hero-studio-title">
                Desain berkarakter untuk <span className="accent-text">bisnis kamu.</span>
              </h1>

              <p className="hero-studio-sub">
                Slide pitch deck tajam, website kilat ramah smartphone, dan aset digital siap pakai — dikerjakan langsung oleh Min Cham tanpa sales perantara.
              </p>

              <div className="hero-cta-buttons">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                  id="homeHeroWaBtn"
                  onClick={() => playClick()}
                  data-cursor="Chat"
                >
                  <IconWhatsApp size={18} />
                  <span>Konsultasi WhatsApp</span>
                </a>

                <Link
                  to="/portofolio"
                  className="btn btn-secondary btn-lg"
                  id="homeHeroWorksBtn"
                  onClick={() => playClick()}
                  data-cursor="Karya"
                >
                  <span>Lihat Portofolio</span>
                  <IconArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: Clean Project Showcase Frame */}
            <div className="hero-showcase-col">
              <div className="hero-featured-project-card">
                <div
                  className="project-cover-wrap"
                  onClick={() => onOpenProjectModal && onOpenProjectModal(heroCase)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={heroCase.image}
                    alt={heroCase.title}
                    className="project-cover-img"
                  />
                  <div className="project-cover-overlay">
                    <span>Lihat Rincian Studi Kasus &rarr;</span>
                  </div>
                </div>

                <div className="project-card-footer">
                  <div className="project-info">
                    <span className="project-cat-tag">PRESENTASI PITCH DECK</span>
                    <h3 className="project-name">{heroCase.title}</h3>
                  </div>
                  <Link
                    to={`/portofolio/${heroCase.id}`}
                    className="project-action-link"
                    onClick={() => playClick()}
                  >
                    Buka Rincian &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist 3-Point Guarantee Strip */}
          <div className="studio-trust-strip">
            <div className="trust-item">
              <span className="trust-icon">✦</span>
              <span>100% Master File .PPTX &amp; Kode Milik Klien</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-icon">✦</span>
              <span>Bicara Langsung dengan Desainer</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-icon">✦</span>
              <span>Garansi Revisi Fleksibel Sampai Puas</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 01: 3 LAYANAN UTAMA
          ========================================================================= */}
      <section className="section services-summary-section" id="layanan">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">SPESIALISASI KAMI</span>
            <h2 className="section-headline">
              Tiga layanan utama yang kami kerjakan <span className="accent-text">dengan teliti.</span>
            </h2>
            <p className="section-subheadline">
              Fokus pada 3 disiplin yang terbukti langsung meningkatkan kredibilitas dan penjualan bisnis kamu.
            </p>
          </div>

          <div className="services-grid-three">
            {/* Service 01: PPT */}
            <article className="service-card-item">
              <div className="service-card-top">
                <span className="service-num">01</span>
                <span className="service-tag">PRESENTASI &bull; DECK</span>
              </div>
              <h3 className="service-card-title">Desain Slide Presentasi &amp; Pitch Deck (PPT)</h3>
              <p className="service-card-desc">
                Rombak narasi slide bisnis dan data tabel jadi alur visual berkelas yang nyaman dibaca dan siap memikat investor.
              </p>
              <Link
                to="/layanan/desain-ppt"
                className="service-card-link"
                onClick={() => playClick()}
              >
                <span>Lihat Layanan PPT</span>
                <IconArrowRight size={14} />
              </Link>
            </article>

            {/* Service 02: Website */}
            <article className="service-card-item">
              <div className="service-card-top">
                <span className="service-num">02</span>
                <span className="service-tag">DIGITAL &bull; WEB</span>
              </div>
              <h3 className="service-card-title">Pembuatan Website &amp; Landing Page Kilat</h3>
              <p className="service-card-desc">
                Website modern berkecepatan tinggi yang ringan dibuka di smartphone calon pelanggan dan langsung terhubung ke WhatsApp.
              </p>
              <Link
                to="/layanan/website"
                className="service-card-link"
                onClick={() => playClick()}
              >
                <span>Lihat Layanan Website</span>
                <IconArrowRight size={14} />
              </Link>
            </article>

            {/* Service 03: Produk Digital */}
            <article className="service-card-item">
              <div className="service-card-top">
                <span className="service-num">03</span>
                <span className="service-tag">SIAP PAKAI &bull; TEMPLATE</span>
              </div>
              <h3 className="service-card-title">Katalog Template &amp; Produk Digital</h3>
              <p className="service-card-desc">
                Template slide presentasi, kit feed media sosial, dan draf kontrak freelance siap unduh detik ini juga untuk kebutuhan cepat.
              </p>
              <Link
                to="/produk-digital"
                className="service-card-link"
                onClick={() => playClick()}
              >
                <span>Buka Katalog Produk</span>
                <IconArrowRight size={14} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: BUKTI NYATA (BEFORE / AFTER INTERAKTIF)
          ========================================================================= */}
      <section className="section before-after-section">
        <div className="container">
          <div className="section-title-wrap text-center">
            <span className="section-badge">HASIL NYATA</span>
            <h2 className="section-headline">
              Perbedaan Slide Mentahan vs Sentuhan Studio
            </h2>
            <p className="section-subheadline mx-auto">
              Geser tuas pembanding ke kiri dan kanan untuk melihat perbedaan struktur visual materi dan keterbacaan data.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: 3 CONTOH KARYA PILIHAN
          ========================================================================= */}
      <section className="section curated-works-section" id="portofolio">
        <div className="container">
          <div className="section-head-split">
            <div>
              <span className="section-badge">CONTOH KARYA PILIHAN</span>
              <h2 className="section-headline">
                Koleksi karya nyata, <span className="accent-text">bukan sekadar pajangan mockup.</span>
              </h2>
            </div>
            <Link to="/portofolio" className="btn btn-secondary" onClick={() => playClick()}>
              <span>Semua Portofolio &rarr;</span>
            </Link>
          </div>

          <div className="works-grid-three">
            {caseStudies.map((project, idx) => (
              <article key={project.id} className="work-card-clean">
                <div className="work-card-media" onClick={() => onOpenProjectModal && onOpenProjectModal(project)}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-card-img"
                    loading="lazy"
                  />
                  <span className="work-category-pill">{project.categoryLabel}</span>
                </div>

                <div className="work-card-body">
                  <h3 className="work-card-title">{project.title}</h3>
                  <p className="work-card-desc">{project.overview}</p>

                  <div className="work-card-footer">
                    <Link
                      to={`/portofolio/${project.id}`}
                      className="work-link"
                      onClick={() => playClick()}
                    >
                      <span>Lihat Studi Kasus</span>
                      <IconArrowRight size={14} />
                    </Link>
                    <button
                      type="button"
                      className="work-preview-btn"
                      onClick={() => onOpenProjectModal && onOpenProjectModal(project)}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: CERITA PERSONAL MIN CHAM
          ========================================================================= */}
      <AboutMinCham />

      {/* =========================================================================
          SECTION 05: TESTIMONI KLIEN
          ========================================================================= */}
      <DraggableTestimonials />

      {/* =========================================================================
          SECTION 06: CALL TO ACTION PENUTUP
          ========================================================================= */}
      <section className="section final-callout-section">
        <div className="container">
          <div className="final-callout-box">
            <span className="callout-badge">KONSULTASI LANGSUNG</span>
            <h2 className="callout-title">
              Punya materi yang ingin <span className="accent-text">kami bedah visualnya?</span>
            </h2>
            <p className="callout-desc">
              Kirimkan draf slide mentahan atau rencana website kamu ke WhatsApp Min Cham. Konsultasi awal 100% gratis dan santai.
            </p>

            <div className="callout-actions">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                onClick={() => playClick()}
                data-cursor="Chat"
              >
                <IconWhatsApp size={18} />
                <span>Konsultasi via WhatsApp</span>
              </a>

              <Link
                to="/harga"
                className="btn btn-secondary btn-lg"
                onClick={() => playClick()}
              >
                <span>Hitung Estimasi Biaya</span>
                <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
