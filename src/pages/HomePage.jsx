import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';
import { STUDIO_CONFIG } from '../config/studioConfig';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import AboutMinCham from '../components/AboutMinCham';
import DraggableTestimonials from '../components/DraggableTestimonials';
import TechRibbon from '../components/TechRibbon';
import { IconArrowRight, IconWhatsApp } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function HomePage({ onOpenProjectModal }) {
  const caseStudies = PROJECTS_DATA.slice(0, 3);
  const heroCase = caseStudies[0]; // Nexus Capital
  const sideCases = caseStudies.slice(0, 3); // Top 3 projects

  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Kami tertarik untuk konsultasi santai mengenai kebutuhan desain presentasi/website di Studio Supernova.'
  )}`;

  return (
    <div className="page-home human-page-wrap">
      {/* =========================================================================
          HERO: EDITORIAL, VISUAL & PUNCHY (ANTI-TEXT BLOAT)
          ========================================================================= */}
      <section className="hero-editorial-broadsheet" id="hero">
        <div className="container">
          {/* Top Ledger Strip */}
          <div className="hero-ledger-top">
            <span className="ledger-item">STUDIO DESAIN &bull; MIN CHAM</span>
            <span className="ledger-dot">&bull;</span>
            <span className="ledger-item">JAKARTA, INDONESIA</span>
            <span className="ledger-badge">BUKAN TEMPLATE AI</span>
          </div>

          {/* Main Hero Grid */}
          <div className="hero-broadsheet-grid">
            {/* Left Column: Bold, Scannable Statement */}
            <div className="hero-main-column">
              <h1 className="hero-bricolage-headline">
                Desain berkarakter untuk <span className="headline-accent">bisnis kamu.</span>
              </h1>

              {/* Concise 1-sentence Value Proposition */}
              <p className="hero-hanken-lead">
                Slide pitch deck tajam, website kilat ramah smartphone, dan aset digital siap pakai — dikerjakan langsung oleh Min Cham tanpa sales perantara.
              </p>

              {/* Direct CTAs */}
              <div className="hero-actions-row">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-hero-wa"
                  id="homeHeroWaBtn"
                  onClick={() => playClick()}
                  data-cursor="Chat"
                >
                  <IconWhatsApp size={18} />
                  <span>Konsultasi WhatsApp</span>
                </a>

                <Link
                  to="/portofolio"
                  className="btn btn-hero-calc"
                  id="homeHeroCalcBtn"
                  onClick={() => playClick()}
                  data-cursor="Karya"
                >
                  <span>Lihat Portofolio</span>
                  <IconArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Showcase Specimen Card */}
            <div className="hero-specimen-column">
              <div className="specimen-physical-sheet">
                <div className="sheet-header">
                  <span className="sheet-id">SPECIMEN #01</span>
                  <span className="sheet-category">PITCH DECK PRESENTATION</span>
                </div>

                <div
                  className="sheet-preview-frame"
                  onClick={() => onOpenProjectModal && onOpenProjectModal(heroCase)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={heroCase.image}
                    alt={heroCase.title}
                    className="sheet-preview-img"
                  />
                  <div className="sheet-preview-overlay">
                    <span>Lihat Contoh Studi Kasus &rarr;</span>
                  </div>
                </div>

                <div className="sheet-body-compact">
                  <div className="sheet-title-row">
                    <h3 className="sheet-title">{heroCase.title}</h3>
                    <span className="sheet-pill-tag">18 SLIDE &bull; PPTX</span>
                  </div>
                  <Link
                    to={`/portofolio/${heroCase.id}`}
                    className="sheet-link"
                    onClick={() => playClick()}
                  >
                    Buka Rincian Proyek &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Studio Assurance Strip */}
          <div className="studio-assurance-strip">
            <span className="assurance-item">✦ 100% Master File .PPTX &amp; Source Code</span>
            <span className="assurance-sep">&bull;</span>
            <span className="assurance-item">✦ Bicara Langsung dengan Min Cham</span>
            <span className="assurance-sep">&bull;</span>
            <span className="assurance-item">✦ Garansi Revisi Fleksibel Sampai Puas</span>
          </div>
        </div>
      </section>

      {/* Editorial Dateline Strip */}
      <TechRibbon />

      {/* =========================================================================
          SECTION 01: 3 PILAR LAYANAN (CLEAN VISUAL CARDS)
          ========================================================================= */}
      <section className="section services-roster-section" id="layanan">
        <div className="container">
          <div className="section-header-compact">
            <span className="section-index-stamp">01 &bull; SPESIALISASI KAMI</span>
            <h2 className="roster-main-title">
              Tiga layanan utama yang kami kerjakan <span className="title-quirk">dengan teliti.</span>
            </h2>
          </div>

          <div className="services-three-cards-grid">
            {/* Card 01: Desain PPT */}
            <article className="service-compact-card">
              <div className="card-index-row">
                <span className="card-index-no">01</span>
                <span className="card-tag-mono">PRESENTASI &bull; DECK</span>
              </div>
              <h3 className="card-title">Desain Slide Presentasi &amp; Pitch Deck</h3>
              <p className="card-desc">
                Rombak alur cerita dan grafik materi bisnis jadi slide visual berkelas yang siap memikat investor dan klien.
              </p>
              <Link
                to="/layanan/desain-ppt"
                className="card-action-link"
                onClick={() => playClick()}
              >
                <span>Lihat Layanan PPT</span>
                <IconArrowRight size={14} />
              </Link>
            </article>

            {/* Card 02: Website */}
            <article className="service-compact-card">
              <div className="card-index-row">
                <span className="card-index-no">02</span>
                <span className="card-tag-mono">DIGITAL &bull; WEB</span>
              </div>
              <h3 className="card-title">Pembuatan Website &amp; Landing Page Kilat</h3>
              <p className="card-desc">
                Website modern berkecepatan tinggi yang ringan diakses di smartphone dan mengalirkan traffic langsung ke WhatsApp.
              </p>
              <Link
                to="/layanan/website"
                className="card-action-link"
                onClick={() => playClick()}
              >
                <span>Lihat Layanan Website</span>
                <IconArrowRight size={14} />
              </Link>
            </article>

            {/* Card 03: Template */}
            <article className="service-compact-card">
              <div className="card-index-row">
                <span className="card-index-no">03</span>
                <span className="card-tag-mono">SIAP PAKAI &bull; TEMPLATE</span>
              </div>
              <h3 className="card-title">Katalog Template &amp; Produk Digital</h3>
              <p className="card-desc">
                Aset template slide presentasi, kit media sosial, dan draf kontrak freelance siap unduh detik ini juga.
              </p>
              <Link
                to="/produk-digital"
                className="card-action-link"
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
          SECTION 02: BUKTI NYATA SEBELUM & SESUDAH (BEFORE / AFTER)
          ========================================================================= */}
      <section className="section py-small">
        <div className="container">
          <div className="craft-ruler-header">
            <span className="ruler-stamp">02 &bull; PERBANDINGAN TATA LETAK</span>
            <h2 className="ruler-title">Perbedaan Slide Mentah vs Sentuhan Studio:</h2>
            <p className="ruler-sub">Geser tuas pembanding untuk melihat langsung kerapian alur visual dan keterbacaan data.</p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: 3 CONTOH KARYA PILIHAN (VISUAL SHOWCASE GRID)
          ========================================================================= */}
      <section className="section curated-cases-spread-section" id="portofolio">
        <div className="container">
          <div className="cases-header-row">
            <div>
              <span className="section-index-stamp">03 &bull; CONTOH KARYA PILIHAN</span>
              <h2 className="cases-main-title">
                Koleksi karya nyata, <span className="title-quirk">bukan sekadar pajangan.</span>
              </h2>
            </div>
            <Link to="/portofolio" className="btn btn-editorial-outline" onClick={() => playClick()}>
              <span>Semua Portofolio &rarr;</span>
            </Link>
          </div>

          <div className="portfolio-cards-grid">
            {sideCases.map((project, idx) => (
              <article key={project.id} className="portfolio-zine-card">
                <div className="zine-card-top">
                  <span className="card-item-no">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="card-item-badge">{project.categoryLabel}</span>
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
                  <h3 className="card-project-title">{project.title}</h3>
                  <p className="card-project-overview">{project.overview}</p>

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
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: CERITA PERSONAL MIN CHAM (RINGKAS & HUMAN)
          ========================================================================= */}
      <AboutMinCham />

      {/* =========================================================================
          SECTION 05: TESTIMONI KLIEN
          ========================================================================= */}
      <DraggableTestimonials />

      {/* =========================================================================
          SECTION 06: AJAKAN DISKUSI (PUNCHY FINAL CTA)
          ========================================================================= */}
      <section className="section final-memo-section">
        <div className="container">
          <div className="studio-invitation-memo">
            <div className="memo-header-line">
              <span className="memo-stamp">KONSULTASI LANGSUNG</span>
              <span className="memo-date">SENIN – SABTU (09:00 – 18:00 WIB)</span>
            </div>

            <h2 className="memo-title">
              Punya materi yang ingin <span className="headline-accent">kami bedah visualnya?</span>
            </h2>

            <p className="memo-desc">
              Kirimkan draf slide atau rencana website kamu ke WhatsApp Min Cham. Konsultasi awal 100% gratis dan tanpa ikatan.
            </p>

            <div className="memo-actions">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-hero-wa"
                onClick={() => playClick()}
                data-cursor="Chat"
              >
                <IconWhatsApp size={18} />
                <span>Konsultasi via WhatsApp</span>
              </a>

              <Link
                to="/harga"
                className="btn btn-hero-calc"
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
