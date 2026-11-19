import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PORTFOLIO_CARDS, PORTFOLIO_FILTERS } from '../data/caseStudies';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ArrowRight, ArrowUpRight, ChevronDown, SearchGlyph, HandArrow } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

const WA_URL = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
  'Halo Min Cham, gue punya proyek yang mau digarap kayak karya di portofolio. Bisa diskusi?'
)}`;

/** Draggable before/after comparison used by the "Redesain Pitch Deck Logistik" card. */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div className="pf-ba" style={{ '--pos': `${pos}%` }}>
      <div className="pf-ba__side pf-ba__before">
        <div className="pf-ba__head">
          <span className="pf-ba__label">SEBELUM</span>
          <span className="pf-ba__dot" />
        </div>
        <div className="pf-ba__lines">
          <span style={{ width: '72%', height: 8, background: 'var(--sn-border)' }} />
          <span style={{ width: '100%' }} />
          <span style={{ width: '80%' }} />
          <span className="pf-ba__chip">Template Jadul</span>
        </div>
        <span className="pf-ba__note">Layout bertumpuk &amp; serif acak</span>
      </div>
      <div className="pf-ba__side pf-ba__after">
        <div className="pf-ba__head">
          <span className="pf-ba__label pf-ba__label--accent">SESUDAH</span>
          <span className="pf-ba__dot pf-ba__dot--accent" />
        </div>
        <div className="pf-ba__lines">
          <span style={{ width: '78%', height: 10, background: 'var(--sn-orange)' }} />
          <span style={{ width: '100%', background: 'var(--sn-text)' }} />
          <span style={{ width: '65%', background: 'var(--sn-text-2)' }} />
          <span className="pf-ba__chip pf-ba__chip--accent">Editorial Supernova</span>
        </div>
        <span className="pf-ba__note pf-ba__note--accent">Grid presisi &amp; tipografi tegas</span>
      </div>
      <div className="pf-ba__handle" aria-hidden="true">
        <span>◀▶</span>
      </div>
      <input
        className="pf-ba__range"
        type="range"
        min="5"
        max="95"
        value={pos}
        aria-label="Geser untuk membandingkan sebelum dan sesudah"
        onChange={(e) => setPos(Number(e.target.value))}
        onClick={(e) => e.preventDefault()}
      />
    </div>
  );
}

function ProjectCard({ card, index }) {
  const cardClass = `pf-card sn-card${card.featured ? ' pf-card--featured' : ''}`;
  return (
    <Link
      to={`/portofolio/${card.slug}`}
      className={cardClass}
      style={{ minHeight: card.height }}
      data-tilt="4"
      data-spotlight
      data-reveal
      data-reveal-delay={index % 3}
      onClick={(e) => {
        if (e.target.closest('.pf-ba')) e.preventDefault();
        else playClick();
      }}
    >
      <div className="pf-card__meta">
        <span className={`sn-tag${card.featured || card.beforeAfter ? ' pf-card__kind--accent' : ''}`}>
          {card.kind}
        </span>
        <span className={`sn-pill-tag${card.real ? ' sn-pill-tag--warm' : ''}`}>
          {card.real ? 'PROYEK ASLI' : 'CONTOH KARYA'}
        </span>
      </div>

      <div className="pf-card__visual">
        {card.beforeAfter ? (
          <BeforeAfter />
        ) : (
          <div
            className={`sn-placeholder pf-card__mock${card.featured ? ' pf-card__mock--featured' : ''}`}
            style={{ height: card.mockHeight }}
          >
            <div className="sn-placeholder__inner">
              <span className="sn-placeholder__title">[GANTI: SCREENSHOT PROYEK]</span>
              <span className="sn-placeholder__sub">{card.mockNote}</span>
              {card.featured && (
                <span className="pf-card__dots" aria-hidden="true">
                  <i className="is-on" />
                  <i />
                  <i />
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pf-card__footer">
        <div className="pf-card__text">
          <h3 className="sn-display pf-card__title">{card.title}</h3>
          <p className="pf-card__desc">{card.desc}</p>
        </div>
        <span className="pf-card__cta">
          Lihat studi kasus <ArrowUpRight size={11} />
        </span>
      </div>
    </Link>
  );
}

export default function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get('kategori');
  const [active, setActive] = useState(
    PORTFOLIO_FILTERS.some((f) => f.key === initial) ? initial : 'semua'
  );
  const [query, setQuery] = useState('');
  const [showAllNote, setShowAllNote] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PORTFOLIO_CARDS.filter(
      (c) =>
        (active === 'semua' || c.category === active) &&
        (!q || `${c.title} ${c.desc} ${c.kind}`.toLowerCase().includes(q))
    );
  }, [active, query]);

  // Round-robin into 3 masonry columns (matches the Figma column order for "Semua")
  const columns = useMemo(() => {
    const cols = [[], [], []];
    filtered.forEach((card, i) => cols[i % 3].push(card));
    return cols;
  }, [filtered]);

  const selectFilter = (key) => {
    playClick();
    setActive(key);
    if (key === 'semua') setSearchParams({});
    else setSearchParams({ kategori: key });
  };

  const activeIndex = PORTFOLIO_FILTERS.findIndex((f) => f.key === active);

  return (
    <div className="sn-page pf-page" data-name="Supernova Studio — Portofolio">
      {/* Header */}
      <header className="sn-container pf-header">
        <div className="pf-header__title" data-reveal>
          <span className="sn-mono sn-mono--13">[ KATALOG ARSIP // 2024-2026 ]</span>
          <h1 className="sn-display pf-header__h1">
            Karya<span className="pf-header__period">.</span>
          </h1>
        </div>
        <div className="pf-header__aside" data-reveal="right" data-reveal-delay="2">
          <div className="pf-header__note">
            <span className="sn-caveat">klik kartu buat baca proses di baliknya</span>
            <HandArrow width={64} height={36} className="pf-header__arrow" rotate={18} />
          </div>
          <p className="sn-body sn-body--xl">
            Beberapa proyek asli, beberapa konsep. Semuanya ditandai jelas.
          </p>
        </div>
      </header>

      {/* Filter & control bar */}
      <section className="sn-container pf-controls">
        <div className="pf-controls__bar">
          <label className="pf-search">
            <span className="pf-search__icon">
              <SearchGlyph size={18} />
            </span>
            <input
              type="search"
              placeholder="Cari proyek..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Cari proyek"
            />
          </label>

          <div
            className="pf-chips"
            role="tablist"
            aria-label="Filter kategori"
            style={{ '--chip-index': activeIndex }}
          >
            {PORTFOLIO_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active === f.key}
                className={`pf-chip${active === f.key ? ' is-active' : ''}`}
                onClick={() => selectFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="pf-counter">
            <span className="sn-dot sn-dot--pulse" style={{ background: 'var(--sn-orange)' }} />
            <span key={filtered.length} className="pf-counter__num">
              {filtered.length} KARYA
            </span>
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="sn-container pf-grid-section">
        {filtered.length === 0 ? (
          <div className="pf-empty" data-reveal>
            <span className="sn-caveat">hmm, belum ada yang cocok</span>
            <p className="sn-body">Coba kata kunci lain atau balik ke filter “Semua”.</p>
            <button
              type="button"
              className="sn-btn sn-btn--ghost sn-btn--sm"
              onClick={() => {
                setQuery('');
                selectFilter('semua');
              }}
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="pf-grid" key={`${active}-${query}`}>
            {columns.map((col, ci) => (
              <div className="pf-col" key={ci}>
                {col.map((card, i) => (
                  <ProjectCard key={card.slug} card={card} index={ci + i} />
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="pf-more">
          <button
            type="button"
            className="sn-btn sn-btn--outline"
            data-magnetic
            onClick={() => {
              playClick();
              setShowAllNote(true);
            }}
          >
            {showAllNote ? 'Semua karya udah tampil' : 'Muat lebih banyak'}
            <ChevronDown size={12} />
          </button>
          {showAllNote && (
            <span className="sn-caveat pf-more__note">karya baru nyusul, janji!</span>
          )}
        </div>
      </section>

      {/* Editorial CTA */}
      <section className="sn-cta-band">
        <div className="sn-container">
          <div className="sn-cta-band__box" data-reveal="scale" data-spotlight>
            <div className="sn-cta-band__copy">
              <span className="sn-cta-band__eyebrow">
                <span className="sn-dot" style={{ width: 10, height: 10 }} />
                <span className="sn-mono sn-mono--12">KOLABORASI SELANJUTNYA</span>
              </span>
              <h2 className="sn-display sn-cta-band__title">
                Punya proyek yang mau digarap kayak di atas?
              </h2>
              <p className="sn-body sn-body--lg">
                Kirim brief singkat atau konsep mentah. Kita diskusikan struktur, estimasi waktu, dan
                biayanya tanpa ribet.
              </p>
            </div>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sn-btn sn-btn--primary sn-btn--lg"
              data-magnetic
              onClick={playClick}
            >
              Konsultasi sekarang lewat WhatsApp <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
