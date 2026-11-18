import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';
import { STUDIO_CONFIG } from '../config/studioConfig';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import NeedsQuiz from '../components/NeedsQuiz';
import DraggableTestimonials from '../components/DraggableTestimonials';
import TechRibbon from '../components/TechRibbon';
import { IconArrowRight, IconWhatsApp } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function HomePage({ onOpenProjectModal }) {
  const curatedProjects = PROJECTS_DATA.slice(0, 3);

  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Saya melihat website Studio Supernova dan ingin konsultasi santai mengenai proyek desain/website.'
  )}`;

  return (
    <div className="page-home human-page-wrap">
      {/* =========================================================================
          HERO: HUMAN CRAFT • ASYMMETRICAL EDITORIAL LAYOUT
          ========================================================================= */}
      <section className="hero-section space-hero-stage zine-hero" id="hero">
        <div className="container hero-container-stacked">
          {/* Top 2-Column Split */}
          <div className="hero-grid-split">
            {/* Left Content */}
            <div className="hero-content">
              {/* Note-Style Physical Badge Sticker */}
              <div className="zine-sticker-tag" style={{ '--sticker-rot': '-1.2deg' }}>
                <span className="zine-dot-pulse" />
                <span className="zine-sticker-text">
                  ✦ Studio Independen &bull; Dikerjakan Langsung oleh {STUDIO_CONFIG.owner}
                </span>
              </div>

              {/* Bold Asymmetrical Headline with Handcrafted Emphasis */}
              <h1 className="hero-title human-hero-title">
                Bukan template AI pasaran.{' '}
                <span className="title-serif-accent">Desain presisi</span> yang bikin audiens percaya.
              </h1>

              {/* Handwritten Human Annotation */}
              <div className="handwritten-annotation" style={{ '--annot-rot': '1.5deg' }}>
                <span>✍ "slide 40 halaman yang bikin ngantuk, kami bedah jadi senjata closing"</span>
              </div>

              {/* Punchy, Non-Cliché Copywriting */}
              <p className="hero-description human-hero-desc">
                Kami mendesain presentasi tingkat tinggi, membangun website kilat yang ringan dibuka di HP UMKM, dan menyediakan aset digital siap pakai. Tanpa sales perantara—Anda bicara langsung dengan pembuat karyanya.
              </p>

              {/* CTA Group */}
              <div className="hero-cta-group">
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
                  <span>Konsultasi Bebas via WhatsApp</span>
                </a>

                <Link
                  to="/harga"
                  className="btn btn-secondary btn-lg"
                  id="homeHeroCalcBtn"
                  onClick={() => playClick()}
                  data-cursor="Hitung"
                >
                  <span>Hitung Estimasi Biaya</span>
                  <IconArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Side Showcase: Tactile Specimen Card */}
            <div className="hero-preview-wrapper">
              <div className="hero-specimen-card" style={{ '--spec-rot': '1deg' }}>
                <div className="specimen-badge-row">
                  <span className="specimen-badge">SPESIMEN 01 &bull; STUDIO KARYA</span>
                  <span className="specimen-badge-accent">LIVE INTERACTIVE</span>
                </div>
                <div className="specimen-img-frame">
                  <img
                    src="/assets/images/corporate.jpg"
                    alt="Nexus Capital Pitch Deck Showcase"
                    className="specimen-img"
                  />
                  <div className="specimen-overlay-label">
                    <span className="specimen-label-title">Nexus Capital Fundraise Deck</span>
                    <span className="specimen-label-desc">Lolos pendanaan Seed Round &bull; 18 Slide 16:9 HD</span>
                  </div>
                </div>
                <div className="specimen-footer">
                  <div className="specimen-meta">
                    <span className="specimen-mono">STATUS: FINISHED & DELIVERED</span>
                    <span className="specimen-mono">TOOLS: PPTX + FIGMA</span>
                  </div>
                  <Link
                    to="/portofolio/nexus-pitch-deck"
                    className="specimen-link"
                    onClick={() => playClick()}
                  >
                    Bedah Studi Kasus &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Full-Width Guarantee Receipt */}
          <div className="zine-guarantee-receipt">
            <div className="receipt-header">
              <span className="receipt-mono">NO. JAMINAN: SN-2026-ID &bull; STANDAR STUDIO SUPERNOVA</span>
              <span className="receipt-stamp">VERIFIED 100%</span>
            </div>
            <ul className="receipt-list-row">
              <li className="receipt-col-item">
                <span className="receipt-num">01</span>
                <div>
                  <strong>100% Hak Milik Master File</strong>
                  <p>File mentah .PPTX, vektor SVG, atau source code diserahkan penuh tanpa watermark.</p>
                </div>
              </li>
              <li className="receipt-col-item">
                <span className="receipt-num">02</span>
                <div>
                  <strong>Bicara Langsung dengan Min Cham</strong>
                  <p>Komunikasi satu pintu langsung dengan desainer penanggung jawab tanpa perantara.</p>
                </div>
              </li>
              <li className="receipt-col-item">
                <span className="receipt-num">03</span>
                <div>
                  <strong>Garansi Revisi Fleksibel</strong>
                  <p>Pendampingan perbaikan sampai materi Anda siap dipresentasikan di depan audiens.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Subtle Marquee Ticker */}
      <TechRibbon />

      {/* =========================================================================
          SECTION 01: RINGKASAN 3 LAYANAN UTAMA
          ========================================================================= */}
      <section className="section services-summary-section" id="ringkasan-layanan">
        <div className="container">
          <div className="section-header-editorial">
            <div className="header-meta">
              <span className="section-index-tag">01 &bull; SPESIALISASI KAMI</span>
              <h2 className="section-heading-fraunces">
                Tiga hal yang kami kuasai <span className="heading-italic">hingga ke detail terkecil.</span>
              </h2>
            </div>
            <p className="section-subtext">
              Kami tidak menawarkan puluhan jasa acak. Kami fokus pada tiga pilar yang terbukti langsung mendongkrak reputasi dan penjualan bisnis Anda.
            </p>
          </div>

          <div className="services-editorial-grid">
            {/* Service 1: Desain PPT */}
            <article className="service-editorial-card" style={{ '--card-accent': '#f59e0b' }}>
              <div className="card-top-bar">
                <span className="service-number">01</span>
                <span className="service-badge-pill">PRESENTASI &bull; DECK</span>
              </div>
              <h3 className="service-card-title">Desain Slide Presentasi & Pitch Deck (PPT)</h3>
              <p className="service-card-desc">
                Bukan sekadar ganti font template. Kami merestrukturisasi narasi materi Anda, merapikan infografik data, dan mendesain tata visual setara startup global.
              </p>
              <ul className="service-card-specs">
                <li>✦ 100% Master File .PPTX (bebas edit mandiri)</li>
                <li>✦ Layout 16:9 HD dengan grafik dan bagan rapi</li>
                <li>✦ Waktu pengerjaan fleksibel (reguler atau kilat 24-48 jam)</li>
              </ul>
              <div className="service-card-actions">
                <Link
                  to="/layanan/desain-ppt"
                  className="service-card-link"
                  onClick={() => playClick()}
                >
                  <span>Pelajari Selengkapnya</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Service 2: Website */}
            <article className="service-editorial-card" style={{ '--card-accent': '#10b981' }}>
              <div className="card-top-bar">
                <span className="service-number">02</span>
                <span className="service-badge-pill">WEBSITE &bull; LANDING PAGE</span>
              </div>
              <h3 className="service-card-title">Pembuatan Website & Landing Page Kilat</h3>
              <p className="service-card-desc">
                Website modern yang terbuka di bawah 0.4 detik di smartphone klien Anda. Dirancang untuk mengonversi pengunjung menjadi leads WhatsApp tanpa hambatan teknis.
              </p>
              <ul className="service-card-specs">
                <li>✦ Tampilan responsif sempurna di layar HP & laptop</li>
                <li>✦ Integrasi WhatsApp chat & tombol aksi langsung</li>
                <li>✦ Tanpa biaya langganan server bulanan yang memberatkan</li>
              </ul>
              <div className="service-card-actions">
                <Link
                  to="/layanan/website"
                  className="service-card-link"
                  onClick={() => playClick()}
                >
                  <span>Pelajari Selengkapnya</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Service 3: Produk Digital */}
            <article className="service-editorial-card" style={{ '--card-accent': '#f59e0b' }}>
              <div className="card-top-bar">
                <span className="service-number">03</span>
                <span className="service-badge-pill">PRODUK DIGITAL &bull; SIAP PAKAI</span>
              </div>
              <h3 className="service-card-title">Katalog Template & Produk Digital</h3>
              <p className="service-card-desc">
                Solusi hemat waktu untuk Anda yang butuh template pitch deck, kit media sosial Instagram, maupun instrumen kontrak kerja freelance siap pakai detik ini juga.
              </p>
              <ul className="service-card-specs">
                <li>✦ File instan unduh setelah konfirmasi</li>
                <li>✦ Dilengkapi panduan video dan petunjuk font gratis</li>
                <li>✦ Harga terjangkau mulai dari Rp 79.000</li>
              </ul>
              <div className="service-card-actions">
                <Link
                  to="/produk-digital"
                  className="service-card-link"
                  onClick={() => playClick()}
                >
                  <span>Jelajahi Katalog Produk</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </article>
          </div>

          <div className="editorial-view-all-cta">
            <Link
              to="/layanan"
              className="btn btn-outline"
              onClick={() => playClick()}
            >
              <span>Lihat Detail Semua Layanan & Alur Kerja &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: BUKTI SEBELUM & SESUDAH (BEFORE / AFTER INTERAKTIF)
          ========================================================================= */}
      <BeforeAfterSlider />

      {/* =========================================================================
          SECTION 03: 3 PROYEK PILIHAN (STUDI KASUS NYATA)
          ========================================================================= */}
      <section className="section curated-portfolio-section" id="proyek-pilihan">
        <div className="container">
          <div className="section-header-editorial">
            <div className="header-meta">
              <span className="section-index-tag">02 &bull; KARYA TERPILIH</span>
              <h2 className="section-heading-fraunces">
                Studi kasus nyata, <span className="heading-italic">bukan sekadar screenshot mockup.</span>
              </h2>
            </div>
            <p className="section-subtext">
              Tiap proyek kami kerjakan dengan memahami masalah mendasar klien, mulai dari target investor hingga psikologi pembeli.
            </p>
          </div>

          <div className="curated-projects-grid">
            {curatedProjects.map((project, idx) => (
              <article key={project.id} className="curated-project-card">
                <div className="project-card-header">
                  <div className="project-meta-left">
                    <span className="project-index-num">KARYA 0{idx + 1}</span>
                    <span className="project-category-tag">{project.categoryLabel}</span>
                  </div>
                  <span className="project-badge-pill">{project.badge}</span>
                </div>

                <div
                  className="project-card-image-wrap"
                  onClick={() => onOpenProjectModal && onOpenProjectModal(project)}
                  style={{ cursor: 'pointer' }}
                  data-cursor="Buka"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-img"
                    loading="lazy"
                  />
                  <div className="project-card-overlay">
                    <span className="overlay-btn-text">Klik untuk Melihat Detail Studi Kasus &rarr;</span>
                  </div>
                </div>

                <div className="project-card-body">
                  <h3 className="project-title-fraunces">{project.title}</h3>
                  <p className="project-brief-overview">{project.overview}</p>

                  <div className="project-key-results">
                    <span className="result-heading">HASIL KONKRET:</span>
                    <ul className="results-list">
                      {project.results.slice(0, 2).map((res, rIdx) => (
                        <li key={rIdx}>
                          <span className="check-bullet">✓</span>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-footer-row">
                    <Link
                      to={`/portofolio/${project.id}`}
                      className="project-case-link"
                      onClick={() => playClick()}
                    >
                      <span>Baca Studi Kasus Lengkap</span>
                      <IconArrowRight size={14} />
                    </Link>
                    <button
                      type="button"
                      className="project-quick-preview-btn"
                      onClick={() => onOpenProjectModal && onOpenProjectModal(project)}
                    >
                      Preview Cepat
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="portfolio-cta-strip">
            <div className="strip-info">
              <span className="strip-highlight">Masih ada 5+ proyek lainnya</span>
              <span className="strip-sub">termasuk proposal tender B2B, website arsitek, dan identitas brand.</span>
            </div>
            <Link
              to="/portofolio"
              className="btn btn-secondary"
              onClick={() => playClick()}
            >
              <span>Buka Seluruh Portofolio &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: MINI QUIZ "KAMU BUTUH APA?"
          ========================================================================= */}
      <NeedsQuiz />

      {/* =========================================================================
          SECTION 05: TESTIMONI KLIEN DENGAN KONTEKS NYATA
          ========================================================================= */}
      <DraggableTestimonials />

      {/* =========================================================================
          SECTION 06: FINAL CALL TO ACTION (ANTI-SLOP BANNER)
          ========================================================================= */}
      <section className="section final-cta-section" id="ajakan-aksi">
        <div className="container">
          <div className="final-cta-card zine-cta-box">
            <div className="cta-note-badge">✦ MARI KITA BICARAKAN IDE ANDA</div>
            <h2 className="cta-title">
              Punya deadline mendesak atau materi yang <span className="highlight-text">masih berantakan?</span>
            </h2>
            <p className="cta-desc">
              Jangan ragu mengirimkan draf kasar, coretan buku catatan, atau slide lama Anda ke WhatsApp Min Cham. Kami akan bedah dan beri masukan alur visualnya secara gratis sebelum Anda memutuskan apa pun.
            </p>

            <div className="cta-actions-group">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                onClick={() => playClick()}
                data-cursor="Chat"
              >
                <IconWhatsApp size={18} />
                <span>Chat Min Cham via WhatsApp</span>
              </a>

              <Link
                to="/harga"
                className="btn btn-secondary btn-lg"
                onClick={() => playClick()}
              >
                <span>Cek Kalkulator Estimasi Biaya</span>
                <IconArrowRight size={15} />
              </Link>
            </div>

            <div className="cta-micro-specs">
              <span>✦ Respon cepat di jam kerja (09:00 - 18:00 WIB)</span>
              <span>✦ 100% Garansi master file diserahkan</span>
              <span>✦ Tanpa biaya tersembunyi</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
