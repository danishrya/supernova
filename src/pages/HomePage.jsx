import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { playClick } from '../utils/sound';

// Service rows (Figma 2001:136). Bracketed values are placeholders to fill in.
const SERVICE_ROWS = [
  {
    no: '01',
    title: 'Desain presentasi (PPT)',
    desc: 'Pitch deck, company profile, sidang, dan proposal yang alurnya jelas.',
    features: [
      ['File PPTX dan PDF', '(bisa diedit sendiri dengan mudah)'],
      ['Revisi [jumlah] kali', '(sampai lo puas dan yakin)'],
      ['Estimasi [x] hari', '(rata-rata 3–7 hari kerja)'],
    ],
    link: '/layanan/desain-ppt',
    linkLabel: 'Lihat paket presentasi',
    preview: 'deck',
  },
  {
    no: '02',
    title: 'Pembuatan website',
    badge: '[PAKET PALING SERING DIAMBIL]',
    desc: 'Company profile, portofolio, toko online, atau landing page yang enak dibuka di HP.',
    features: [
      ['Responsif di HP & desktop', '(dicek di layar asli)'],
      ['Domain & hosting dibantu', '(setup sampai online)'],
      ['Estimasi [x] hari', '(rata-rata 7–10 hari kerja)'],
    ],
    link: '/layanan/website',
    linkLabel: 'Lihat paket website',
    preview: 'web',
  },
  {
    no: '03',
    title: 'Produk digital',
    desc: 'Template PPT dan website, e-book, UI kit, dan desain sosmed yang tinggal pakai.',
    features: [
      ['File master siap edit', '(Figma, PPTX, Canva)'],
      ['Langsung dikirim ke email', '(tanpa nunggu dikerjain)'],
      ['Mulai Rp 89.000', '(lihat semua di katalog)'],
    ],
    link: '/produk-digital',
    linkLabel: 'Buka katalog produk',
    preview: 'product',
  },
];

function ServicePreview({ kind }) {
  if (kind === 'deck') {
    return (
      <div className="svc-preview svc-preview--deck">
        <div className="svc-preview__bar">
          <span className="svc-preview__label">PPT // SLIDE 16:9</span>
          <span className="svc-preview__dot" />
        </div>
        <div className="svc-preview__slides">
          <span className="is-on">01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>
        <div className="svc-preview__foot">
          <span>PITCH DECK</span>
          <span>16:9 FULL-HD</span>
        </div>
      </div>
    );
  }
  if (kind === 'product') {
    return (
      <div className="svc-preview svc-preview--product">
        <div className="svc-preview__bar">
          <span className="svc-preview__label svc-preview__label--accent">TEMPLATE</span>
          <span className="svc-preview__label">FIGMA / CANVA</span>
        </div>
        <div className="svc-preview__product">
          <span className="svc-preview__swatch" />
          <span className="svc-preview__swatch svc-preview__swatch--2" />
          <span className="svc-preview__swatch svc-preview__swatch--3" />
          <span className="svc-preview__name">Brand Kit UMKM v1.2</span>
        </div>
        <div className="svc-preview__foot">
          <span>RP 189.000</span>
          <span>INSTANT DL</span>
        </div>
      </div>
    );
  }
  return (
    <div className="svc-preview svc-preview--web">
      <div className="svc-preview__bar">
        <span className="svc-preview__lights">
          <i />
          <i />
          <i />
        </span>
        <span className="svc-preview__label">pratinjau: responsive-web.html</span>
        <span className="svc-preview__dot" />
      </div>
      <div className="svc-preview__screen">[ganti: screenshot tampilan mobile]</div>
      <div className="svc-preview__foot">
        <span>100% RESPONSIVE</span>
        <span>CLEAN CODE</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Service rows accordion — row 02 (Website) open by default as in Figma 2001:167
  const [openServiceRow, setOpenServiceRow] = useState('02');

  // Quiz state (from Figma 2001:311)
  const [selectedQuizOption, setSelectedQuizOption] = useState('presentasi');

  const quizOptions = [
    {
      id: 'presentasi',
      label: 'Presentasi',
      recommendation: 'Desain presentasi',
      link: '/layanan/desain-ppt',
      btnLabel: 'Lihat paketnya',
    },
    {
      id: 'website',
      label: 'Website',
      recommendation: 'Pembuatan website',
      link: '/layanan/website',
      btnLabel: 'Lihat paketnya',
    },
    {
      id: 'template',
      label: 'Template siap pakai',
      recommendation: 'Katalog template digital',
      link: '/produk-digital',
      btnLabel: 'Buka katalog',
    },
    {
      id: 'belum-tau',
      label: 'Belum tau',
      recommendation: 'Konsultasi gratis & bedah ide',
      link: 'https://wa.me/6285714521584?text=Halo%20Min%20Cham,%20saya%20punya%20ide%20tapi%20belum%20tau%20format%20yang%20paling%20pas',
      isExternal: true,
      btnLabel: 'Tanya Min Cham via WA',
    },
  ];

  // Hero mockup stack: scatters apart on hover/tap, each layer drifts with the pointer
  const heroStackRef = useRef(null);
  const [stackScattered, setStackScattered] = useState(false);
  const onStackMove = (e) => {
    const el = heroStackRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onStackLeave = () => {
    const el = heroStackRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0');
    el.style.setProperty('--py', '0');
    setStackScattered(false);
  };

  const currentRec =
    quizOptions.find((opt) => opt.id === selectedQuizOption) || quizOptions[0];

  const waClosingUrl =
    'https://wa.me/6285714521584?text=Halo%20Min%20Cham,%20saya%20punya%20ide%20yang%20mau%20dibikin%20tampilannya%20jadi%20profesional.';

  return (
    <div className="figma-main-wrapper" data-name="Supernova Studio — Beranda Website Desktop">
      {/* Subtle Grain Overlay */}
      <div className="figma-grain-overlay" aria-hidden="true">
        <img src="/figma-assets/grain.svg" alt="" />
      </div>

      {/* =========================================================================
          SECTION 1: HERO SECTION (Figma 2001:43)
          ========================================================================= */}
      <section className="figma-hero-section" id="hero" data-name="Section 01 - HERO">
        {/* Giant Cut-off Nova Dot Background (Right side, 640px) */}
        <div className="figma-giant-nova-dot" aria-hidden="true" />

        {/* Left Column (7 Columns) */}
        <div className="figma-hero-left">
          <div className="figma-mono-tag">
            <span className="figma-tag-dot" />
            <span className="figma-tag-text">01 — STUDIO KREATIF DIGITAL</span>
          </div>

          <h1 className="figma-hero-h1">
            Ide lo udah bagus.<br />
            Tampilannya<br />
            <span className="highlight">yang bikin orang</span><br />
            <span className="highlight">percaya.</span>
          </h1>

          <p className="figma-hero-body">
            Gue bikin presentasi, website, dan produk digital buat bisnis kecil, freelancer, dan mahasiswa. Rapi, jelas, dan nggak kelihatan template.
          </p>

          <div className="figma-hero-ctas">
            <Link
              to="/harga"
              className="figma-btn-primary"
              onClick={() => playClick()}
            >
              <span>Minta estimasi</span>
              <img src="/figma-assets/arrow-hero.svg" alt="" width="16" height="16" />
            </Link>

            <Link
              to="/portofolio"
              className="figma-btn-secondary"
              onClick={() => playClick()}
            >
              <span>Lihat contoh karya</span>
            </Link>
          </div>

          <div className="figma-hero-microcopy">
            KONSULTASI AWAL LEWAT WHATSAPP
          </div>

          <div className="figma-hero-scroll">
            <span>SCROLL</span>
            <div className="figma-hero-scroll-line" />
          </div>
        </div>

        {/* Right Column: Layered Editorial Mockups (5 Columns) */}
        <div
          ref={heroStackRef}
          className={`figma-hero-right hero-stack${stackScattered ? ' is-scattered' : ''}`}
          data-name="Right Column with flat layered mockups"
          onPointerEnter={(e) => {
            if (e.pointerType !== 'touch') setStackScattered(true);
          }}
          onPointerMove={onStackMove}
          onPointerLeave={onStackLeave}
          onClick={() => setStackScattered((v) => !v)}
        >
          {/* Mockup 1: PPT Slide 16:9 (-4 deg) */}
          <div className="figma-mockup-slide">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--figma-border)', paddingBottom: '9px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.96px', color: 'var(--figma-text-muted)' }}>
                PPT // SLIDE 16:9
              </span>
              <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: 'var(--figma-orange)' }} />
            </div>

            <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--figma-text-muted)' }}>
                [ganti: screenshot pitch deck]
              </span>
              <div style={{ width: '80%', height: '8px', backgroundColor: 'var(--figma-card-elevated)', borderRadius: '4px' }} />
              <div style={{ width: '55%', height: '8px', backgroundColor: 'var(--figma-card-elevated)', borderRadius: '4px' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--figma-text-muted)' }}>
                SERIES A PITCH
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--figma-text-muted)' }}>
                SLIDE 04/12
              </span>
            </div>
          </div>

          {/* Mockup 2: Website Browser Window (+2 deg) */}
          <div className="figma-mockup-browser">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--figma-border)', paddingBottom: '9px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: 'var(--figma-bg)', border: '1px solid var(--figma-border)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: 'var(--figma-bg)', border: '1px solid var(--figma-border)' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: 'var(--figma-bg)', border: '1px solid var(--figma-border)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--figma-text-muted)' }}>
                Website // supernova.id
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--figma-orange)' }}>
                1440px
              </span>
            </div>

            <div style={{ flex: 1, margin: '8px 0', border: '1px dashed var(--figma-border)', borderRadius: '4px', backgroundColor: 'var(--figma-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--figma-text-muted)' }}>
                [ganti: mockup landing page]
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--figma-text-primary)', marginTop: '4px' }}>
                UMKM Kopi Lokal
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--figma-text-muted)' }}>
                STATUS: LIVE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--figma-text-muted)' }}>
                RESPONSIVE OK
              </span>
            </div>
          </div>

          {/* Mockup 3: Template Book / Cover (-1 deg) */}
          <div className="figma-mockup-cover">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--figma-border)', paddingBottom: '9px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--figma-orange)', letterSpacing: '0.88px' }}>
                TEMPLATE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--figma-text-muted)' }}>
                FIGMA / NOTION
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '16px 0' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '9999px', backgroundColor: 'var(--figma-orange)', opacity: 0.8 }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', color: 'var(--figma-text-primary)', textAlign: 'center', marginTop: '6px' }}>
                Brand Kit UMKM v1.2
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--figma-text-muted)' }}>
                [siap pakai]
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--figma-border)', paddingTop: '9px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--figma-text-muted)' }}>
                RP 149.000
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--figma-text-muted)' }}>
                INSTANT DL
              </span>
            </div>
          </div>

          {/* Handwritten Caveat Note with curved hand-drawn arrow */}
          <div className="figma-handwritten-note">
            <span className="figma-handwritten-text">
              {stackScattered ? 'nah, keliatan semua kan' : 'ini contoh tampilannya'}
            </span>
            <img src="/figma-assets/arrow-caveat.svg" alt="" width="48" height="40" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 3 HAL (SERVICES) (Figma 2001:136)
          ========================================================================= */}
      <section className="figma-services-section" id="layanan" data-name="Section 02 - TIGA HAL">
        <div className="figma-section-header">
          <div className="figma-mono-tag">
            <span className="figma-tag-dot" />
            <span className="figma-tag-text">02</span>
          </div>
          <h2 className="figma-section-h2">Tiga hal, dikerjain sampai detail.</h2>
        </div>

        <div className="figma-services-rows-container">
          {SERVICE_ROWS.map((row) => {
            const open = openServiceRow === row.no;
            return (
              <div key={row.no} className={`figma-service-row svc-row ${open ? 'is-expanded' : ''}`}>
                <div className="figma-service-col-num">{row.no}</div>
                <div className="figma-service-col-title">
                  <h3 className="figma-service-title-text">{row.title}</h3>
                  {row.badge && <span className="figma-service-badge">{row.badge}</span>}
                </div>
                <div className="figma-service-col-desc">{row.desc}</div>
                <div className="figma-service-col-action">
                  <button
                    type="button"
                    className={`figma-pill-action-btn ${open ? 'is-active' : ''}`}
                    aria-expanded={open}
                    aria-controls={`svc-detail-${row.no}`}
                    onClick={() => {
                      playClick();
                      setOpenServiceRow(open ? null : row.no);
                    }}
                  >
                    {open ? 'Tutup detail ↑' : 'Buka detail ↓'}
                  </button>
                </div>

                <div className="svc-expand" id={`svc-detail-${row.no}`} aria-hidden={!open}>
                  <div className="svc-expand__inner">
                    <div className="figma-service-expanded-content">
                      <div className="figma-expanded-features">
                        {row.features.map(([text, sub]) => (
                          <div className="figma-feature-item" key={text}>
                            <span className="figma-tag-dot" />
                            <span className="figma-feature-text">{text}</span>
                            <span className="figma-feature-sub">{sub}</span>
                          </div>
                        ))}
                        <Link
                          to={row.link}
                          className="svc-more-link"
                          tabIndex={open ? 0 : -1}
                          onClick={() => playClick()}
                        >
                          {row.linkLabel} <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                      <div className="figma-expanded-mockup">
                        <ServicePreview kind={row.preview} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CONTOH KARYA (PORTFOLIO) (Figma 2001:223)
          ========================================================================= */}
      <section className="figma-portfolio-section" id="portofolio" data-name="Section 03 - CONTOH KARYA">
        <div className="figma-portfolio-header-split">
          <div>
            <div className="figma-mono-tag">
              <span className="figma-tag-dot" />
              <span className="figma-tag-text">03</span>
            </div>
            <h2 className="figma-section-h2">Contoh karya.</h2>
            <div className="figma-portfolio-sub">
              Sebagian masih konsep. Yang konsep ditandai jelas.
            </div>
          </div>

          <Link
            to="/portofolio"
            className="figma-all-works-link"
            onClick={() => playClick()}
          >
            <span>Lihat semua karya</span>
            <img src="/figma-assets/arrow-right.svg" alt="" width="16" height="16" />
          </Link>
        </div>

        <div className="figma-portfolio-asymmetric-grid">
          {/* Big Card (7 Columns, 520px high) */}
          <div className="figma-portfolio-big-card">
            <div className="figma-card-tags-row">
              <span className="figma-mono-tag-chip">PPT</span>
              <span className="figma-status-badge">Proyek asli</span>
            </div>

            <div className="figma-card-wireframe-box">
              <span>[ganti: screenshot proyek deck investasi]</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--figma-text-primary)' }}>
                Pitch Deck Seed Round — Agrotech Indonesia
              </span>
            </div>

            <div className="figma-card-footer-info">
              <div>
                <h4 className="figma-card-title">Deck Investasi UMKM Sayur Segar</h4>
                <span className="figma-card-meta">18 SLIDES // SELESAI DALAM 5 HARI</span>
              </div>
              <span style={{ width: '10px', height: '10px', borderRadius: '9999px', backgroundColor: 'var(--figma-orange)' }} />
            </div>
          </div>

          {/* 2 Stacked Cards (5 Columns, 248px each) */}
          <div className="figma-portfolio-stack-col">
            {/* Card 1: Top (Web) */}
            <div className="figma-portfolio-small-card">
              <div className="figma-card-tags-row">
                <span className="figma-mono-tag-chip">WEB</span>
                <span className="figma-status-badge is-concept">Contoh karya</span>
              </div>

              <div className="figma-card-wireframe-box">
                [ganti: screenshot website studio foto]
              </div>

              <div className="figma-card-footer-info">
                <div>
                  <h4 className="figma-card-title">Landing Page Studio Foto Analog</h4>
                  <span className="figma-card-meta">JAMBI // CONCEPT DESIGN</span>
                </div>
                <span style={{ color: 'var(--figma-orange)', fontSize: '16px' }}>&rarr;</span>
              </div>
            </div>

            {/* Card 2: Bottom (Produk) */}
            <div className="figma-portfolio-small-card">
              <div className="figma-card-tags-row">
                <span className="figma-mono-tag-chip">PRODUK</span>
                <span className="figma-status-badge">Proyek asli</span>
              </div>

              <div className="figma-card-wireframe-box">
                [ganti: screenshot template notion]
              </div>

              <div className="figma-card-footer-info">
                <div>
                  <h4 className="figma-card-title">Notion Freelance Operating System</h4>
                  <span className="figma-card-meta">140+ DOWNLOAD // TEMPLATE</span>
                </div>
                <span style={{ color: 'var(--figma-orange)', fontSize: '16px' }}>&rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: KUIS SINGKAT (EDITORIAL LIGHT LINEN) (Figma 2001:293)
          ========================================================================= */}
      <section className="figma-quiz-section" id="kuis" data-name="Section 04 - KUIS SINGKAT">
        <div className="figma-quiz-inner-wrapper">
          <div className="figma-quiz-top-status">
            <div className="figma-mono-tag" style={{ marginBottom: 0 }}>
              <span className="figma-tag-dot" style={{ backgroundColor: 'var(--figma-orange-light)' }} />
              <span className="figma-tag-text" style={{ color: 'var(--figma-orange-light)' }}>
                KUIS SINGKAT
              </span>
            </div>
            <span
              style={{
                backgroundColor: '#e8e2d8',
                borderRadius: '999px',
                padding: '4px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.96px',
                textTransform: 'uppercase',
                color: 'var(--figma-text-quiz-dark)',
              }}
            >
              LANGKAH 1/3
            </span>
          </div>

          <h2 className="figma-quiz-h2">Lo butuh yang mana?</h2>
          <p className="figma-quiz-sub">
            Pilih salah satu, biar gue bisa kasih estimasi dan arahan yang pas tanpa muter-muter.
          </p>

          <div className="figma-quiz-card-box">
            <span className="figma-quiz-step-tag">PERTANYAAN:</span>
            <h3 className="figma-quiz-q-title">Lo mau bikin apa?</h3>

            <div className="figma-quiz-chips-wrap">
              {quizOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`figma-quiz-chip ${selectedQuizOption === opt.id ? 'is-selected' : ''}`}
                  onClick={() => {
                    playClick();
                    setSelectedQuizOption(opt.id);
                  }}
                >
                  {selectedQuizOption === opt.id && <span className="figma-quiz-chip-dot" />}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="figma-quiz-result-row">
              <div>
                <span className="figma-quiz-rec-label">REKOMENDASI BUAT LO:</span>
                <h4 className="figma-quiz-rec-title">{currentRec.recommendation}</h4>
              </div>

              {currentRec.isExternal ? (
                <a
                  href={currentRec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="figma-quiz-action-btn"
                  onClick={() => playClick()}
                >
                  <span>{currentRec.btnLabel}</span>
                  <img src="/figma-assets/arrow-quiz.svg" alt="" width="14" height="14" />
                </a>
              ) : (
                <Link
                  to={currentRec.link}
                  className="figma-quiz-action-btn"
                  onClick={() => playClick()}
                >
                  <span>{currentRec.btnLabel}</span>
                  <img src="/figma-assets/arrow-quiz.svg" alt="" width="14" height="14" />
                </Link>
              )}
            </div>
          </div>

          <div className="figma-quiz-handwritten-note">
            <img src="/figma-assets/arrow-handwritten.svg" alt="" width="24" height="24" />
            <span className="figma-quiz-handwritten-text">bisa langsung lanjut konsultasi gratis</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CARA KERJA (TIMELINE) (Figma 2001:343)
          ========================================================================= */}
      <section className="figma-process-section" id="proses" data-name="Section 05 - CARA KERJA">
        <div className="figma-section-header">
          <div className="figma-mono-tag">
            <span className="figma-tag-dot" />
            <span className="figma-tag-text">04 — CARA KERJA</span>
          </div>
          <h2 className="figma-section-h2">Alurnya.</h2>
        </div>

        <div className="figma-process-timeline-wrap">
          {/* Progress Track Line with Nova Dots */}
          <div className="figma-process-track">
            <div className="figma-process-track-active" />
            <span className="figma-process-dot is-active" style={{ left: 0 }} />
            <span className="figma-process-dot is-active" style={{ left: '33%' }} />
            <span className="figma-process-dot" style={{ left: '66%' }} />
            <span className="figma-process-dot" style={{ right: 0 }} />
          </div>

          {/* 4 Step Cards */}
          <div className="figma-process-steps-grid">
            <div className="figma-step-card is-active">
              <span className="figma-step-num-title">01 NGOBROL</span>
              <p className="figma-step-desc">
                Lo ceritain ide lo, bahan yang udah ada, dan deadline yang lo kejar.
              </p>
            </div>

            <div className="figma-step-card is-active">
              <span className="figma-step-num-title">02 PENAWARAN</span>
              <p className="figma-step-desc">
                Gue kirim rincian biaya pasti [Rp XXX.000] dan jadwal pengerjaan jelas.
              </p>
            </div>

            <div className="figma-step-card">
              <span className="figma-step-num-title">03 DIKERJAIN</span>
              <p className="figma-step-desc">
                Gue kerjain dari konsep draft sampai jadi tanpa lo perlu nanya-nanya mulu.
              </p>
            </div>

            <div className="figma-step-card">
              <span className="figma-step-num-title">04 REVISI DAN SELESAI</span>
              <p className="figma-step-desc">
                Poles bareng sesuai jatah revisi sampai lo puas, serah terima file rapi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CLOSING HERO CTA BANNER (Figma 2001:383)
          ========================================================================= */}
      <section className="figma-cta-banner-section" data-name="Section 06 - MULAI SEKARANG">
        {/* Giant Dark flat circle cut-off on right edge */}
        <div className="figma-cta-giant-dark-circle" aria-hidden="true" />

        <div className="figma-cta-content-box">
          <div className="figma-cta-mono-tag">
            // MULAI SEKARANG
          </div>

          <h2 className="figma-cta-h2">
            Punya ide yang masih berantakan?<br />
            Bawa aja ke sini.
          </h2>

          <div className="figma-cta-actions-row">
            <a
              href={waClosingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="figma-cta-dark-btn"
              onClick={() => playClick()}
            >
              <span>Chat lewat WhatsApp</span>
              <img src="/figma-assets/arrow-right.svg" alt="" width="16" height="16" />
            </a>

            <span className="figma-cta-subtag">
              RESPON CEPAT // MIN CHAM
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
