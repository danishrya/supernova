import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';
import { STUDIO_CONFIG } from '../config/studioConfig';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import NeedsQuiz from '../components/NeedsQuiz';
import AboutMinCham from '../components/AboutMinCham';
import DraggableTestimonials from '../components/DraggableTestimonials';
import TechRibbon from '../components/TechRibbon';
import { IconArrowRight, IconWhatsApp, IconCheck } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function HomePage({ onOpenProjectModal }) {
  const caseStudies = PROJECTS_DATA.slice(0, 3);
  const heroCase = caseStudies[0]; // Nexus Capital
  const sideCases = caseStudies.slice(1, 3); // PT Samudra Energi & Valkyrie Apparel

  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Kami tertarik untuk konsultasi santai mengenai kebutuhan desain presentasi/website di Studio Supernova.'
  )}`;

  return (
    <div className="page-home human-page-wrap">
      {/* =========================================================================
          HERO: HUMAN EDITORIAL BROADSHEET • BRICOLAGE GROTESQUE (700-800)
          ========================================================================= */}
      <section className="hero-editorial-broadsheet" id="hero">
        <div className="container">
          {/* Top Ledger Strip */}
          <div className="hero-ledger-top">
            <span className="ledger-item">STUDIO DESAIN &bull; MIN CHAM</span>
            <span className="ledger-dot">&bull;</span>
            <span className="ledger-item">JAKARTA, INDONESIA</span>
            <span className="ledger-dot">&bull;</span>
            <span className="ledger-item">EDISI RESMI 2026</span>
            <span className="ledger-badge">BUKAN TEMPLATE AI</span>
          </div>

          {/* Main Hero Grid */}
          <div className="hero-broadsheet-grid">
            {/* Left Column: Bold Human Statement */}
            <div className="hero-main-column">
              <h1 className="hero-bricolage-headline">
                Desain berkarakter untuk <span className="headline-accent">bisnis kamu.</span> Bukan template pasaran.
              </h1>

              {/* Handwritten Margin Note */}
              <div className="designer-handwritten-note">
                <span className="arrow-scribble">↳</span>
                <span>"Slide presentasi 40 halaman yang tadinya padat dan membingungkan, kami bedah jadi alur visual yang rapi dan terarah."</span>
                <span className="signature-tag">— Min Cham</span>
              </div>

              {/* Honest, Clear Copywriting in Hanken Grotesk */}
              <p className="hero-hanken-lead">
                Kami membantu UMKM, founder startup, dan profesional merapikan slide presentasi, membangun website kilat yang ringan dibuka di ponsel, serta menyediakan aset digital siap pakai. Kamu berkomunikasi langsung dengan Min Cham — tanpa perantara, tanpa birokrasi berbelit.
              </p>

              {/* Hero Action Row */}
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
                  to="/harga"
                  className="btn btn-hero-calc"
                  id="homeHeroCalcBtn"
                  onClick={() => playClick()}
                  data-cursor="Hitung"
                >
                  <span>Minta Estimasi Biaya</span>
                  <IconArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: Physical Studio Specimen Sheet */}
            <div className="hero-specimen-column">
              <div className="specimen-physical-sheet">
                <div className="sheet-header">
                  <div className="sheet-stamp-box">
                    <span className="sheet-id">SPECIMEN #01</span>
                    <span className="sheet-status-pill">CONTOH KARYA</span>
                  </div>
                  <span className="sheet-category">PRESENTASI PITCH DECK</span>
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

                <div className="sheet-body">
                  <h3 className="sheet-title">{heroCase.title}</h3>
                  <p className="sheet-desc">{heroCase.overview}</p>

                  <div className="sheet-results-table">
                    <div className="table-row">
                      <span className="tbl-label">Tantangan:</span>
                      <span className="tbl-val">{heroCase.challenge}</span>
                    </div>
                    <div className="table-row">
                      <span className="tbl-label">Solusi Visual:</span>
                      <span className="tbl-val highlight-green">{heroCase.solution}</span>
                    </div>
                  </div>

                  <div className="sheet-footer">
                    <span className="sheet-mono-tools">FORMAT: POWERPOINT 365 + KEYNOTE</span>
                    <Link
                      to={`/portofolio/${heroCase.id}`}
                      className="sheet-link"
                      onClick={() => playClick()}
                    >
                      Buka Rincian &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Studio Guarantees Ledger */}
          <div className="studio-guarantees-ledger">
            <div className="ledger-header">
              <span className="ledger-title-mono">STANDAR MUTU STUDIO SUPERNOVA &bull; NO. SN-2026-ID</span>
              <span className="ledger-stamp-badge">100% GARANSI RESMI</span>
            </div>
            <div className="ledger-columns-grid">
              <div className="guarantee-col">
                <span className="col-num">01/</span>
                <div className="col-content">
                  <h4>100% Hak Milik Master File</h4>
                  <p>File mentah .PPTX yang dapat kamu edit mandiri, file vektor SVG, atau kode sumber website diserahkan penuh tanpa biaya tambahan.</p>
                </div>
              </div>
              <div className="guarantee-col">
                <span className="col-num">02/</span>
                <div className="col-content">
                  <h4>Bicara Langsung dengan Min Cham</h4>
                  <p>Tanpa birokrasi oper-operan perantara. Catatan dan revisi kamu langsung dikerjakan oleh desainer penanggung jawab.</p>
                </div>
              </div>
              <div className="guarantee-col">
                <span className="col-num">03/</span>
                <div className="col-content">
                  <h4>Garansi Revisi Sampai Siap Tampil</h4>
                  <p>Kami dampingi penyesuaian materi sampai kamu benar-benar siap dan percaya diri tampil di depan audiens atau klien.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Dateline Strip */}
      <TechRibbon />

      {/* =========================================================================
          SECTION 01: EDITORIAL ARCHITECTURAL ROSTER (LAYANAN)
          ========================================================================= */}
      <section className="section services-roster-section" id="layanan">
        <div className="container">
          <div className="roster-header-spread">
            <div className="header-meta-box">
              <span className="section-index-stamp">01 &bull; SPESIALISASI KAMI</span>
              <h2 className="roster-main-title">
                Tiga layanan utama yang kami <span className="title-quirk">kerjakan dengan teliti.</span>
              </h2>
            </div>
            <p className="roster-sub-desc">
              Kami tidak menawarkan puluhan layanan acak. Studio Supernova fokus pada 3 disiplin yang terbukti langsung meningkatkan rasa percaya calon pembeli kamu.
            </p>
          </div>

          <div className="editorial-roster-list">
            {/* Service Row 01: Desain PPT */}
            <article className="roster-entry-row" style={{ '--accent-border': '#f59e0b' }}>
              <div className="entry-left-col">
                <span className="entry-index-big">01</span>
                <div className="entry-titles">
                  <span className="entry-tag">PRESENTASI &bull; DECK</span>
                  <h3 className="entry-heading">Desain Slide Presentasi &amp; Pitch Deck (PPT)</h3>
                </div>
              </div>

              <div className="entry-mid-col">
                <p className="entry-desc">
                  Bukan sekadar memindahkan teks ke template. Kami merapikan alur narasi, menyusun bagan data menjadi infografik bersih, dan memastikan setiap slide nyaman dibaca audiens.
                </p>
                <div className="entry-deliverables-chips">
                  <span className="chip-item">✦ 100% Master File .PPTX &amp; Keynote</span>
                  <span className="chip-item">✦ Format Rasio 16:9 HD dengan grafik rapi</span>
                  <span className="chip-item">✦ Waktu pengerjaan fleksibel (reguler atau kilat)</span>
                </div>
              </div>

              <div className="entry-right-col">
                <Link
                  to="/layanan/desain-ppt"
                  className="btn btn-roster-action"
                  onClick={() => playClick()}
                >
                  <span>Lihat Contoh Slide PPT</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Service Row 02: Website */}
            <article className="roster-entry-row" style={{ '--accent-border': '#f59e0b' }}>
              <div className="entry-left-col">
                <span className="entry-index-big">02</span>
                <div className="entry-titles">
                  <span className="entry-tag">DIGITAL &bull; LANDING PAGE</span>
                  <h3 className="entry-heading">Pembuatan Website &amp; Landing Page Kilat</h3>
                </div>
              </div>

              <div className="entry-mid-col">
                <p className="entry-desc">
                  Website modern yang ringan dibuka di ponsel calon pelanggan kamu. Dirancang khusus untuk mengalirkan pengunjung langsung ke chat WhatsApp bisnis tanpa hambatan teknis.
                </p>
                <div className="entry-deliverables-chips">
                  <span className="chip-item">✦ Responsif di smartphone &amp; layar desktop</span>
                  <span className="chip-item">✦ Integrasi tombol chat WhatsApp otomatis</span>
                  <span className="chip-item">✦ Tanpa biaya langganan bulanan server berat</span>
                </div>
              </div>

              <div className="entry-right-col">
                <Link
                  to="/layanan/website"
                  className="btn btn-roster-action"
                  onClick={() => playClick()}
                >
                  <span>Lihat Contoh Website</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Service Row 03: Produk Digital */}
            <article className="roster-entry-row" style={{ '--accent-border': '#f59e0b' }}>
              <div className="entry-left-col">
                <span className="entry-index-big">03</span>
                <div className="entry-titles">
                  <span className="entry-tag">ASET PRAKTIS &bull; TEMPLATE</span>
                  <h3 className="entry-heading">Katalog Template &amp; Produk Digital</h3>
                </div>
              </div>

              <div className="entry-mid-col">
                <p className="entry-desc">
                  Solusi hemat waktu bagi kamu yang membutuhkan template slide presentasi, kit feed Instagram, atau draf surat perjanjian kerja freelance siap edit detik ini juga.
                </p>
                <div className="entry-deliverables-chips">
                  <span className="chip-item">✦ Tautan unduh instan via Google Drive resmi</span>
                  <span className="chip-item">✦ Disertai petunjuk font gratis dari Google Fonts</span>
                  <span className="chip-item">✦ Tarif terjangkau mulai dari Rp 79.000</span>
                </div>
              </div>

              <div className="entry-right-col">
                <Link
                  to="/produk-digital"
                  className="btn btn-roster-action"
                  onClick={() => playClick()}
                >
                  <span>Lihat Katalog Template</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>
          </div>

          <div className="roster-footer-cta">
            <Link to="/layanan" className="btn btn-editorial-outline" onClick={() => playClick()}>
              <span>Buka Detail Semua Layanan &amp; Alur Kerja &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: BUKTI PERUBAHAN NYATA (BEFORE / AFTER INTERAKTIF)
          ========================================================================= */}
      <section className="section py-small">
        <div className="container">
          <div className="craft-ruler-header">
            <span className="ruler-stamp">02 &bull; PERBANDINGAN TATA LETAK</span>
            <h2 className="ruler-title">Bandingkan Slide Mentah vs Hasil Sentuhan Studio:</h2>
            <p className="ruler-sub">Geser tuas pembanding ke kiri dan kanan untuk melihat perbedaan keterbacaan materi dan struktur visualnya.</p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: CONTOH KARYA TERPILIH (DUO ASYMMETRICAL SPREAD)
          ========================================================================= */}
      <section className="section curated-cases-spread-section" id="portofolio">
        <div className="container">
          <div className="cases-header-row">
            <div>
              <span className="section-index-stamp">03 &bull; CONTOH KARYA PILIHAN</span>
              <h2 className="cases-main-title">
                Contoh studi kasus, <span className="title-quirk">bukan sekadar gambar pajangan.</span>
              </h2>
            </div>
            <Link to="/portofolio" className="btn btn-editorial-outline" onClick={() => playClick()}>
              <span>Lihat Semua Portofolio &rarr;</span>
            </Link>
          </div>

          {/* Asymmetrical Spread: 2 Side-by-Side In-Depth Cases */}
          <div className="cases-duo-spread">
            {sideCases.map((project, idx) => (
              <article key={project.id} className="case-spread-card">
                <div className="case-card-top-bar">
                  <span className="case-num">KARYA 0{idx + 2}</span>
                  <span className="case-badge">{project.badge}</span>
                </div>

                <div
                  className="case-media-frame"
                  onClick={() => onOpenProjectModal && onOpenProjectModal(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="case-media-img"
                    loading="lazy"
                  />
                  <div className="case-hover-glass">
                    <span>Buka Rincian Studi Kasus &rarr;</span>
                  </div>
                </div>

                <div className="case-content-box">
                  <span className="case-category-label">{project.categoryLabel}</span>
                  <h3 className="case-heading">{project.title}</h3>
                  <p className="case-overview-text">{project.overview}</p>

                  <div className="case-results-mini-box">
                    <span className="res-title">HASIL PENGERJAAN:</span>
                    <ul className="res-items">
                      {project.results.slice(0, 2).map((r, rIdx) => (
                        <li key={rIdx}>
                          <IconCheck size={14} color="#10b981" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="case-bottom-links">
                    <Link
                      to={`/portofolio/${project.id}`}
                      className="case-direct-link"
                      onClick={() => playClick()}
                    >
                      <span>Lihat Studi Kasus</span>
                      <IconArrowRight size={14} />
                    </Link>

                    <button
                      type="button"
                      className="case-preview-pill"
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
          SECTION 04: KUESIONER KEBUTUHAN (MINI QUIZ)
          ========================================================================= */}
      <NeedsQuiz />

      {/* =========================================================================
          SECTION 05: CERITA PERSONAL MIN CHAM
          ========================================================================= */}
      <AboutMinCham />

      {/* =========================================================================
          SECTION 06: TESTIMONI KLIEN NYATA
          ========================================================================= */}
      <DraggableTestimonials />

      {/* =========================================================================
          SECTION 07: MEMO AJAKAN DISKUSI (FINAL CTA)
          ========================================================================= */}
      <section className="section final-memo-section">
        <div className="container">
          <div className="studio-invitation-memo">
            <div className="memo-header-line">
              <span className="memo-stamp">07 &bull; JALUR KONSULTASI LANGSUNG</span>
              <span className="memo-date">SENIN – SABTU (09:00 – 18:00 WIB)</span>
            </div>

            <h2 className="memo-title">
              Punya materi yang ingin <span className="headline-accent">kami bedah visualnya?</span>
            </h2>

            <p className="memo-desc">
              Kirimkan draf materi mentahan, catatan ide, atau slide lama kamu ke WhatsApp Min Cham. Kami akan bedah dan berikan masukan alur visualnya secara gratis sebelum kamu memutuskan untuk bekerja sama.
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
                <span>Minta Estimasi Biaya</span>
                <IconArrowRight size={15} />
              </Link>
            </div>

            <div className="memo-footer-specs">
              <span>✦ Konsultasi awal bebas biaya</span>
              <span>✦ 100% Hak milik master file diserahkan</span>
              <span>✦ Garansi revisi sampai tuntas</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
