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
    'Halo Min Cham! Gue liat website Studio Supernova dan mau ngobrol santai konsultasi soal desain slide/website.'
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
            <span className="ledger-item">STUDIO KREATIF INDEPENDEN</span>
            <span className="ledger-dot">&bull;</span>
            <span className="ledger-item">MILIK MIN CHAM</span>
            <span className="ledger-dot">&bull;</span>
            <span className="ledger-item">EDISI RESMI 2026</span>
            <span className="ledger-badge">BUKAN TEMPLATE AI</span>
          </div>

          {/* Main Hero Grid */}
          <div className="hero-broadsheet-grid">
            {/* Left Column: Bold Human Statement */}
            <div className="hero-main-column">
              <h1 className="hero-bricolage-headline">
                Gue bikin desain yang <span className="headline-accent">punya karakter.</span> Bukan template AI yang bikin bosen.
              </h1>

              {/* Handwritten Margin Note */}
              <div className="designer-handwritten-note">
                <span className="arrow-scribble">↳</span>
                <span>"Slide 40 halaman yang tadinya bikin ngantuk, gue bedah jadi senjata closing di depan investor."</span>
                <span className="signature-tag">— Min Cham</span>
              </div>

              {/* Punchy, Non-Cliché Copywriting in Hanken Grotesk */}
              <p className="hero-hanken-lead">
                Banyak orang ngira desain bagus itu harus ribet dan penuh efek heboh. Padahal kuncinya ada di pesan yang jelas, tipografi berkarakter, dan rasa percaya yang langsung nancep di 3 detik pertama. Lo ngobrol langsung sama gue — tanpa sales perantara, tanpa birokrasi agensi.
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
                  <span>Ngobrol Bebas via WhatsApp</span>
                </a>

                <Link
                  to="/harga"
                  className="btn btn-hero-calc"
                  id="homeHeroCalcBtn"
                  onClick={() => playClick()}
                  data-cursor="Hitung"
                >
                  <span>Hitung Estimasi Biaya</span>
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
                    <span className="sheet-status-pill">PROYEK TERVERIFIKASI</span>
                  </div>
                  <span className="sheet-category">PITCH DECK INVESTOR</span>
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
                    <span>Lihat Bedah Studi Kasus &rarr;</span>
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
                      <span className="tbl-label">Hasil Nyata:</span>
                      <span className="tbl-val highlight-green">Lolos pendanaan Seed Round &bull; 100% Master File diserahkan</span>
                    </div>
                  </div>

                  <div className="sheet-footer">
                    <span className="sheet-mono-tools">SOFTWARE: POWERPOINT 365 + FIGMA</span>
                    <Link
                      to={`/portofolio/${heroCase.id}`}
                      className="sheet-link"
                      onClick={() => playClick()}
                    >
                      Baca Selengkapnya &rarr;
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
                  <p>File .PPTX asli yang bisa diedit mandiri, file vektor SVG, atau source code bersih kami serahkan penuh tanpa ada yang disandera.</p>
                </div>
              </div>
              <div className="guarantee-col">
                <span className="col-num">02/</span>
                <div className="col-content">
                  <h4>Bicara Langsung dengan Min Cham</h4>
                  <p>Tanpa birokrasi account manager atau oper-operan sales. Ide dan revisi Anda langsung dieksekusi oleh desainer penanggung jawab.</p>
                </div>
              </div>
              <div className="guarantee-col">
                <span className="col-num">03/</span>
                <div className="col-content">
                  <h4>Garansi Revisi Sampai Siap Tampil</h4>
                  <p>Kami dampingi penyesuaian materi sampai Anda benar-benar siap dan percaya diri maju di depan investor atau klien.</p>
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
          Pengganti 3 kartu AI generik menjadi roster editorial bergaya monograf studio
          ========================================================================= */}
      <section className="section services-roster-section" id="layanan">
        <div className="container">
          <div className="roster-header-spread">
            <div className="header-meta-box">
              <span className="section-index-stamp">ROSTER 01 &bull; SPESIALISASI</span>
              <h2 className="roster-main-title">
                Tiga hal yang gue kuasai <span className="title-quirk">sampai ke detail terkecil.</span>
              </h2>
            </div>
            <p className="roster-sub-desc">
              Gue sengaja nggak nawarin puluhan jasa acak. Studio Supernova fokus pada 3 hal yang beneran langsung naikin wibawa dan penjualan bisnis lo.
            </p>
          </div>

          <div className="editorial-roster-list">
            {/* Service Row 01: Desain PPT */}
            <article className="roster-entry-row" style={{ '--accent-border': '#f59e0b' }}>
              <div className="entry-left-col">
                <span className="entry-index-big">01</span>
                <div className="entry-titles">
                  <span className="entry-tag">PRESENTASI &bull; PITCH DECK</span>
                  <h3 className="entry-heading">Desain Slide Presentasi &amp; Pitch Deck (PPT)</h3>
                </div>
              </div>

              <div className="entry-mid-col">
                <p className="entry-desc">
                  Bukan cuma mindahin teks ke template. Gue bedah ulang susunan alur cerita (storytelling), rapikan data tabel jadi infografik tajam, dan rancang visual berwibawa standar korporat dunia.
                </p>
                <div className="entry-deliverables-chips">
                  <span className="chip-item">✦ 100% Master File .PPTX &amp; Keynote</span>
                  <span className="chip-item">✦ Layout 16:9 HD dengan grafik rapi</span>
                  <span className="chip-item">✦ Pengerjaan kilat 24–48 jam bila genting</span>
                </div>
              </div>

              <div className="entry-right-col">
                <Link
                  to="/layanan/desain-ppt"
                  className="btn btn-roster-action"
                  onClick={() => playClick()}
                >
                  <span>Pelajari Layanan PPT</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Service Row 02: Website */}
            <article className="roster-entry-row" style={{ '--accent-border': '#10b981' }}>
              <div className="entry-left-col">
                <span className="entry-index-big">02</span>
                <div className="entry-titles">
                  <span className="entry-tag">DIGITAL &bull; LANDING PAGE</span>
                  <h3 className="entry-heading">Pembuatan Website &amp; Landing Page Kilat</h3>
                </div>
              </div>

              <div className="entry-mid-col">
                <p className="entry-desc">
                  Website kencang yang kebuka di bawah 0.4 detik di smartphone calon klien lo. Dirancang khusus untuk mengalirkan traffic langsung ke chat WhatsApp bisnis lo tanpa hambatan teknis.
                </p>
                <div className="entry-deliverables-chips">
                  <span className="chip-item">✦ Responsif di HP &amp; laptop tanpa glitch</span>
                  <span className="chip-item">✦ Tombol WhatsApp terintegrasi otomatis</span>
                  <span className="chip-item">✦ Tanpa biaya langganan bulanan server</span>
                </div>
              </div>

              <div className="entry-right-col">
                <Link
                  to="/layanan/website"
                  className="btn btn-roster-action"
                  onClick={() => playClick()}
                >
                  <span>Pelajari Layanan Web</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Service Row 03: Produk Digital */}
            <article className="roster-entry-row" style={{ '--accent-border': '#f59e0b' }}>
              <div className="entry-left-col">
                <span className="entry-index-big">03</span>
                <div className="entry-titles">
                  <span className="entry-tag">ASET SIAP PAKAI &bull; TEMPLATE</span>
                  <h3 className="entry-heading">Katalog Template &amp; Produk Digital</h3>
                </div>
              </div>

              <div className="entry-mid-col">
                <p className="entry-desc">
                  Aset siap pakai buat lo yang butuh template deck presentasi, kit feed Instagram, atau draf surat perjanjian kerja freelance detik ini juga. Tinggal unduh dan edit sesuka hati.
                </p>
                <div className="entry-deliverables-chips">
                  <span className="chip-item">✦ Akses instan via Google Drive resmi</span>
                  <span className="chip-item">✦ Disertai video panduan penggunaan font</span>
                  <span className="chip-item">✦ Harga terjangkau mulai Rp 79.000</span>
                </div>
              </div>

              <div className="entry-right-col">
                <Link
                  to="/produk-digital"
                  className="btn btn-roster-action"
                  onClick={() => playClick()}
                >
                  <span>Buka Katalog Produk</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>
          </div>

          <div className="roster-footer-cta">
            <Link to="/layanan" className="btn btn-editorial-outline" onClick={() => playClick()}>
              <span>Buka Detail Semua Layanan &amp; Matriks Spesifikasi &rarr;</span>
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
            <span className="ruler-stamp">BUKTI TANGAN NYATA &bull; BUKAN JANJI MANIS</span>
            <h2 className="ruler-title">Bandingkan Slide Mentah Klien vs Hasil Bedah Studio:</h2>
            <p className="ruler-sub">Geser handle slider ke kiri dan kanan untuk melihat perbedaan kerapian visual dan tata letak informasinya.</p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: KARYA TERPILIH (ASYMMETRICAL CASE STUDY SPREAD)
          ========================================================================= */}
      <section className="section curated-cases-spread-section" id="portofolio">
        <div className="container">
          <div className="cases-header-row">
            <div>
              <span className="section-index-stamp">ARSIP 02 &bull; KARYA PILIHAN</span>
              <h2 className="cases-main-title">
                Studi kasus nyata, <span className="title-quirk">bukan sekadar screenshot mockup.</span>
              </h2>
            </div>
            <Link to="/portofolio" className="btn btn-editorial-outline" onClick={() => playClick()}>
              <span>Buka Semua 8+ Portofolio &rarr;</span>
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
                    <span>Lihat Rincian Studi Kasus &rarr;</span>
                  </div>
                </div>

                <div className="case-content-box">
                  <span className="case-category-label">{project.categoryLabel}</span>
                  <h3 className="case-heading">{project.title}</h3>
                  <p className="case-overview-text">{project.overview}</p>

                  <div className="case-results-mini-box">
                    <span className="res-title">HASIL KONKRET:</span>
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
                      <span>Bedah Lengkap Proyek</span>
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
          SECTION 05: CERITA PERSONAL MIN CHAM (MANIFESTO MANUSIA)
          ========================================================================= */}
      <AboutMinCham />

      {/* =========================================================================
          SECTION 06: TESTIMONI KLIEN NYATA DENGAN KONTEKS
          ========================================================================= */}
      <DraggableTestimonials />

      {/* =========================================================================
          SECTION 07: MEMO AJAKAN DISKUSI (ANTI-SLOP FINAL CTA)
          ========================================================================= */}
      <section className="section final-memo-section">
        <div className="container">
          <div className="studio-invitation-memo">
            <div className="memo-header-line">
              <span className="memo-stamp">MEMO STUDIO &bull; JALUR LANGSUNG</span>
              <span className="memo-date">RESPON &le; 2 JAM (JAM KERJA)</span>
            </div>

            <h2 className="memo-title">
              Punya deadline genting atau materi yang <span className="headline-accent">masih berantakan?</span>
            </h2>

            <p className="memo-desc">
              Jangan sungkan kirimkan draf kasar, coretan tangan, atau slide lama lo ke WhatsApp Min Cham. Gue bakal bedah alur visualnya secara gratis sebelum lo mutusin buat lanjut kerja bareng.
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
                <span>Chat Min Cham Sekarang</span>
              </a>

              <Link
                to="/harga"
                className="btn btn-hero-calc"
                onClick={() => playClick()}
              >
                <span>Hitung Estimasi Anggaran</span>
                <IconArrowRight size={15} />
              </Link>
            </div>

            <div className="memo-footer-specs">
              <span>✦ Tanpa biaya konsultasi awal</span>
              <span>✦ 100% Master file diserahkan</span>
              <span>✦ Garansi revisi sampai tuntas</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
