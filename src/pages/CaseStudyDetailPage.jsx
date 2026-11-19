import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PORTFOLIO_CARDS } from '../data/caseStudies';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ArrowRight, CrossGlyph } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

// Content from Figma frame 2001:1337 (Detail Proyek — Pitch Deck Seed Round Agrotech).
const META = [
  { label: 'JENIS PROYEK', value: 'Pitch Deck Presentasi (PPTX & PDF)' },
  { label: 'PERAN', value: 'Storyflow, Redesain Visual, Infografis Data' },
  { label: 'DURASI', value: '5 Hari Kerja (2x Putaran Revisi)' },
  { label: 'TOOLS', value: 'Figma, PowerPoint, Illustrator' },
];

const CORE_SLIDES = [1, 0, 0, 0, 1, 1, 0, 0, 1, 0]; // 1 = highlighted (orange border)

const METRICS = [
  { label: 'GROSS MARGIN', count: 28.4, decimals: 1, suffix: '%', note: '+12% vs rute konvensional', tone: 'gold' },
  { label: 'LOGISTICS CYCLE', count: 14, suffix: ' Jam', note: 'Penurunan loss pascapanen', tone: 'peach' },
  { label: 'PETANI AKTIF', count: 3420, suffix: '+', note: 'Di 18 Kabupaten Jateng', tone: 'meta' },
];

const PHASES = [
  { label: 'Fase 1: Konsolidasi Titik Gudang Dingin', value: 'Rp 1.1 M', pct: 26, color: 'var(--sn-orange)' },
  { label: 'Fase 2: Otomasi Penjadwalan Armada Truk', value: 'Rp 1.8 M', pct: 43, color: 'var(--sn-gold)' },
  { label: 'Fase 3: Jaringan Direct-to-Mill Marketplace', value: 'Rp 1.3 M', pct: 31, color: 'var(--sn-meta)' },
];

const SLIDES = [
  {
    tag: 'SLIDE 03 // MASALAH',
    page: 'P.03',
    kicker: '# INEFEKTIFITAS LOGISTIK GABAH',
    kickerTone: 'red',
    title: '42% Nilai Panen Tergerus Rantai Pengepul Berlapis',
    stats: ['Rugi Petani: ~Rp 1.400/kg', 'Waktu Tempuh: 3.2 Hari'],
    caption: 'Infografis Peta Rute Distribusi',
  },
  {
    tag: 'SLIDE 06 // MODEL BISNIS',
    page: 'P.06',
    kicker: '# UNIT EKONOMI BERSIH',
    kickerTone: 'gold',
    title: 'Take-rate 4.5% dari Transaksi Volume Kilang Penggilingan',
    stats: ['SaaS Gudang: Rp 750k/bln', 'Freight Fee: Rp 85/kg'],
    caption: 'Matriks Alur Pendapatan B2B',
  },
  {
    tag: 'SLIDE 09 // TRAKSI METRIK',
    page: 'P.09',
    kicker: '# PERTUMBUHAN MoM 2025',
    kickerTone: 'peach',
    title: '18.400 Ton Gabah Terkirim Sepanjang 3 Kuartal Operasional',
    stats: ['Retention: 91.2%', 'GMV Run Rate: Rp 28 M'],
    caption: 'Diagram Pertumbuhan Volume Bulanan',
  },
  {
    tag: 'SLIDE 12 // TIM & ROADMAP',
    page: 'P.12',
    kicker: '# EKSEKUSI & KAPABILITAS',
    kickerTone: 'meta',
    title: 'Kombinasi Praktisi Agronomi 12 Tahun & Mantan Tech Lead Decacorn',
    stats: ['Headcount Saat Ini: 14', 'Ekspansi Jatim: Q3 2026'],
    caption: 'Bagan Struktur & Alokasi Modal Seed',
  },
];

const DEVICES = [
  { key: 'desktop', label: 'Desktop' },
  { key: 'tablet', label: 'Tablet' },
  { key: 'hp', label: 'HP' },
];

const WA_URL = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
  'Halo Min Cham, gue mau dibikinin deck kayak studi kasus Agrotech. Bisa ngobrol dulu?'
)}`;

function SlideCard({ slide, onOpen, large = false }) {
  return (
    <div className={`cs-slide${large ? ' cs-slide--large' : ''}`}>
      <div className="cs-slide__top">
        <span className="cs-chip-sq">{slide.tag}</span>
        <span className="sn-mono sn-mono--plain">{slide.page}</span>
      </div>
      <div className="cs-slide__body">
        <span className={`cs-slide__kicker tone-${slide.kickerTone}`}>{slide.kicker}</span>
        <h4 className="sn-display cs-slide__title">{slide.title}</h4>
        <div className="cs-slide__stats">
          {slide.stats.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div className="cs-slide__foot">
        <span>{slide.caption}</span>
        {!large && onOpen && (
          <button type="button" className="cs-slide__zoom" onClick={onOpen} aria-label={`Perbesar ${slide.tag}`}>
            ⤢
          </button>
        )}
      </div>
    </div>
  );
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const [device, setDevice] = useState('desktop');
  const [lightbox, setLightbox] = useState(null);
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const index = Math.max(0, PORTFOLIO_CARDS.findIndex((c) => c.slug === slug));
  const prev = PORTFOLIO_CARDS[(index - 1 + PORTFOLIO_CARDS.length) % PORTFOLIO_CARDS.length];
  const next = PORTFOLIO_CARDS[(index + 1) % PORTFOLIO_CARDS.length];

  // Timeline rail fills as you scroll through the case sections
  useEffect(() => {
    const onScroll = () => {
      const el = timelineRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.6 - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lightbox: ESC to close, arrows to navigate
  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % SLIDES.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <div className="sn-page cs-page" data-name="Supernova Studio — Detail Proyek">
      {/* Hero */}
      <header className="sn-container cs-hero">
        <nav className="cs-crumb" aria-label="Breadcrumb" data-reveal>
          <Link to="/portofolio">PORTOFOLIO</Link>
          <span aria-hidden="true">/</span>
          <span className="cs-crumb__current">PITCH DECK SEED ROUND AGROTECH INDONESIA</span>
        </nav>
        <h1 className="sn-display cs-hero__title" data-reveal data-reveal-delay="1">
          Pitch Deck Seed Round —<br />
          Agrotech Indonesia
        </h1>
        <p className="sn-body sn-body--xl cs-hero__lead" data-reveal data-reveal-delay="2">
          Membantu startup agrikultur lokal menstrukturkan alur presentasi investasi hingga mengamankan
          pendanaan tahap awal.
        </p>
        <dl className="cs-meta" data-reveal data-reveal-delay="3">
          {META.map((m) => (
            <div key={m.label} className="cs-meta__item">
              <dt className="sn-mono sn-mono--12">{m.label}</dt>
              <dd># {m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Cover slide showcase */}
      <section className="cs-cover">
        <div className="sn-container">
          <div className="cs-cover__slide" data-reveal="scale" data-tilt="3" data-spotlight>
            <div className="cs-cover__row">
              <div className="cs-cover__ids">
                <span className="cs-chip-sq cs-chip-sq--warm">SLIDE COVER RESMI</span>
                <span className="sn-mono sn-mono--plain">SEC_ID // AGROTECH_SEED_V4.PPTX</span>
              </div>
              <span className="sn-mono sn-mono--plain">[CONFIDENTIAL — FOR INVESTORS ONLY]</span>
            </div>
            <div className="cs-cover__main">
              <span className="cs-cover__round">
                <span className="sn-dot" /> SERIES SEED ROUND 2026
              </span>
              <h2 className="sn-display cs-cover__title">Agrotech: Modernizing Rural Harvest Logistics</h2>
              <p className="sn-body">
                Platform agregasi supply-chain gabah terintegrasi untuk stabilitas harga pangan tingkat
                petani.
              </p>
            </div>
            <div className="cs-cover__row cs-cover__row--bottom">
              <span className="sn-mono sn-mono--plain">STUDIO × AGROTECH FOUNDER DECK</span>
              <span className="sn-mono sn-mono--plain">[ganti: screenshot slide utama]</span>
            </div>
            <div className="cs-cover__sticky">
              <span aria-hidden="true">✎</span>
              <em>“slide pembuka yang langsung to the point”</em>
            </div>
          </div>
        </div>
      </section>

      {/* Case timeline */}
      <section className="sn-container cs-timeline-wrap">
        <div className="cs-timeline" ref={timelineRef} style={{ '--progress': progress }}>
          <span className="cs-timeline__rail" aria-hidden="true" />

          {/* 01 Tantangan */}
          <article className="cs-step">
            <span className="cs-step__dot" aria-hidden="true" />
            <div className="cs-step__copy" data-reveal="left">
              <span className="sn-mono sn-mono--12">01 — TANTANGAN</span>
              <h3 className="sn-display cs-step__title">Bahan 45 slide, waktu pitch cuma 7 menit.</h3>
              <p className="sn-body">
                Founder punya data riset lapangan yang solid tapi alurnya berantakan. Terlalu banyak teks
                teknis yang bikin investor bosan sebelum masuk ke traksi bisnis.
              </p>
            </div>
            <div className="sn-card cs-panel" data-reveal="right">
              <div className="cs-panel__head">
                <span className="sn-mono sn-mono--12">KOMPARASI ARSITEKTUR INFORMASI</span>
                <span className="sn-mono sn-mono--plain">DOCS: DIAGRAM ALUR SEBELUM VS SESUDAH</span>
              </div>
              <div className="cs-compare">
                <div className="cs-compare__old">
                  <div className="cs-compare__label">
                    <span className="tone-red">DECK LAMA (FOUNDER DRAFT)</span>
                    <span>45 SLIDE</span>
                  </div>
                  <div className="cs-compare__lines">
                    <i style={{ width: '100%' }} />
                    <i style={{ width: '82%' }} />
                    <i style={{ width: '66%' }} />
                  </div>
                  <div className="cs-compare__block">BLOK PARAGRAF PADAT 12PT</div>
                  <div className="cs-compare__mini">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="cs-compare__foot">
                    <span className="sn-dot" style={{ background: 'var(--sn-red)', width: 6, height: 6 }} />
                    Beban kognitif tinggi, alur tenggelam
                  </div>
                </div>
                <div className="cs-compare__new">
                  <div className="cs-compare__label tone-peach">
                    <span>RE-STRUKTUR DECK</span>
                    <span>10 CORE SLIDE</span>
                  </div>
                  <div className="cs-compare__grid">
                    {CORE_SLIDES.map((on, i) => (
                      <span
                        key={i}
                        className={on ? 'is-on' : ''}
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    ))}
                  </div>
                  <div className="cs-compare__foot tone-peach">
                    <span className="sn-dot" style={{ width: 6, height: 6 }} />1 Premis, 1 Insight per
                    Slide (Pitch 7 Menit)
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* 02 Proses */}
          <article className="cs-step">
            <span className="cs-step__dot" aria-hidden="true" />
            <div className="cs-step__copy" data-reveal="left">
              <span className="sn-mono sn-mono--12">02 — PROSES</span>
              <h3 className="sn-display cs-step__title">Bongkar total struktur, visualkan angka penting.</h3>
              <p className="sn-body">
                Gue potong slide jadi 14 slide esensial. Grafik rumit disederhanakan jadi 3 poin metrik
                utama yang langsung berbicara.
              </p>
            </div>
            <div className="sn-card cs-panel" data-reveal="right">
              <div className="cs-panel__head">
                <div className="cs-devices" role="tablist" aria-label="Pratinjau perangkat">
                  {DEVICES.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      role="tab"
                      aria-selected={device === d.key}
                      className={device === d.key ? 'is-active' : ''}
                      onClick={() => {
                        playClick();
                        setDevice(d.key);
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <span className="sn-mono sn-mono--plain">DIAGRAM RESPONSIVE PROTOTYPE</span>
              </div>
              <div className={`cs-proto cs-proto--${device}`}>
                <div className="cs-proto__head">
                  <span>LAYOUT DECK RESMI: FINANCIAL ROADMAP 2026-2028</span>
                  <span>METRIC_VIEW: CONSOLIDATED</span>
                </div>
                <div className="cs-proto__metrics">
                  {METRICS.map((m) => (
                    <div key={m.label} className="cs-metric">
                      <span className="sn-mono">{m.label}</span>
                      <span
                        className="sn-display cs-metric__value"
                        data-count={m.count}
                        data-count-decimals={m.decimals || 0}
                        data-count-suffix={m.suffix}
                      >
                        0
                      </span>
                      <span className={`cs-metric__note tone-${m.tone}`}>{m.note}</span>
                    </div>
                  ))}
                </div>
                <div className="cs-cash" data-reveal>
                  <div className="cs-cash__head">
                    <span className="sn-mono">PROYEKSI ARUS KAS (PROTOTYPE VISUALISASI)</span>
                    <span className="sn-mono sn-mono--plain tone-peach">Q1 - Q4 METRIC</span>
                  </div>
                  {PHASES.map((p) => (
                    <div key={p.label} className="cs-cash__row">
                      <div className="cs-cash__labels">
                        <span>{p.label}</span>
                        <span className="tone-gold">{p.value}</span>
                      </div>
                      <div className="cs-cash__bar">
                        <i style={{ '--w': `${p.pct * 2}%`, background: p.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* 03 Hasil */}
          <article className="cs-step">
            <span className="cs-step__dot" aria-hidden="true" />
            <div className="cs-step__copy" data-reveal="left">
              <span className="sn-mono sn-mono--12">03 — HASIL</span>
              <h3 className="sn-display cs-step__title">Penyampaian lancar, deck dipakai di hadapan 4 VC.</h3>
              <p className="sn-body">
                Pitch deck selesai tepat waktu dalam 5 hari. Founder berhasil mengkomunikasikan nilai
                valuasi dengan percaya diri tanpa terbebani slide yang ruwet.
              </p>
            </div>
            <div className="cs-results">
              <div className="sn-card cs-result" data-reveal data-reveal-delay="0" data-tilt="5">
                <span className="sn-mono sn-mono--12">TARGET PENDANAAN</span>
                <div>
                  <span className="cs-result__big tone-peach">
                    Rp <span data-count="4.2" data-count-decimals="1">0</span> M
                  </span>
                  <span className="cs-result__sub tone-gold">Seed Round Cap Tertutup</span>
                </div>
                <span className="cs-result__foot">4 VC Partners Pitch Stage</span>
              </div>
              <div className="sn-card cs-result" data-reveal data-reveal-delay="1" data-tilt="5">
                <span className="sn-mono sn-mono--12">TOTAL FORMAT SLIDE</span>
                <div>
                  <span className="cs-result__big">
                    <span data-count="14">0</span> Slide
                  </span>
                  <span className="cs-result__sub tone-blush">Dari 45 draf awal</span>
                </div>
                <span className="cs-result__foot">Durasi Baca: 6 Menit 30 Detik</span>
              </div>
              <div className="sn-card cs-result" data-reveal data-reveal-delay="2" data-tilt="5">
                <span className="sn-mono sn-mono--12">STANDAR VISUAL</span>
                <div>
                  <span className="cs-result__big tone-gold">
                    <span data-count="100">0</span>% Rapi
                  </span>
                  <span className="cs-result__sub tone-blush">Figma &amp; Master PPTX</span>
                </div>
                <span className="cs-result__foot">Full Typography Vector Alignment</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Slide gallery */}
      <section className="cs-gallery">
        <div className="sn-container">
          <div className="cs-gallery__head">
            <span className="sn-mono">[ KLIK UNTUK PERBESAR // 4 DOKUMEN SLIDE ]</span>
            <span className="sn-mono sn-mono--plain">EXHIBIT A-D // HIGH RESOLUTION ARTIFACTS</span>
          </div>
          <div className="cs-gallery__grid">
            {SLIDES.map((s, i) => (
              <button
                key={s.tag}
                type="button"
                className="sn-card cs-gallery__item"
                data-reveal
                data-reveal-delay={i % 2}
                data-spotlight
                onClick={() => {
                  playClick();
                  setLightbox(i);
                }}
              >
                <SlideCard slide={s} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / next */}
      <nav className="cs-pager" aria-label="Navigasi proyek">
        <div className="sn-container cs-pager__inner">
          <Link to={`/portofolio/${prev.slug}`} className="cs-pager__link" onClick={playClick}>
            <span className="sn-mono sn-mono--12 sn-mono--plain">← PROYEK SEBELUMNYA</span>
            <span className="sn-display cs-pager__title">{prev.title}</span>
          </Link>
          <span className="cs-pager__divider" aria-hidden="true" />
          <Link to={`/portofolio/${next.slug}`} className="cs-pager__link cs-pager__link--next" onClick={playClick}>
            <span className="sn-mono sn-mono--12 sn-mono--plain">PROYEK BERIKUTNYA →</span>
            <span className="sn-display cs-pager__title">{next.title}</span>
          </Link>
        </div>
      </nav>

      {/* CTA */}
      <section className="cs-cta">
        <div className="sn-container cs-cta__inner" data-reveal>
          <span className="sn-mono tone-peach">KOLABORASI DENGAN GUE</span>
          <h2 className="sn-display cs-cta__title">Mau yang kayak gini? Chat gue</h2>
          <p className="sn-body">
            Kirim materi mentah, catatan coret-coretan, atau deck lama lo. Gue bantu bedah alurnya sampai
            siap diuji di hadapan partner maupun investor.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sn-btn sn-btn--primary sn-btn--md cs-cta__btn"
            data-magnetic
            onClick={playClick}
          >
            Chat lewat WhatsApp <ArrowRight size={13} />
          </a>
          <span className="cs-cta__slot">
            <span className="sn-dot sn-dot--green sn-dot--pulse" />
            Slot aktif: Tersedia untuk 1 proyek minggu depan
          </span>
        </div>
      </section>

      {lightbox !== null && (
        <div className="cs-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <div className="cs-lightbox__frame" onClick={(e) => e.stopPropagation()}>
            <SlideCard slide={SLIDES[lightbox]} large />
            <div className="cs-lightbox__bar">
              <button type="button" onClick={() => setLightbox((lightbox - 1 + SLIDES.length) % SLIDES.length)}>
                ←
              </button>
              <span className="sn-mono sn-mono--plain">
                {lightbox + 1} / {SLIDES.length}
              </span>
              <button type="button" onClick={() => setLightbox((lightbox + 1) % SLIDES.length)}>
                →
              </button>
            </div>
            <button type="button" className="cs-lightbox__close" onClick={() => setLightbox(null)} aria-label="Tutup">
              <CrossGlyph size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
