import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { playClick } from '../utils/sound';

// Beranda "Contoh karya" — three live cards that demo the kind of work instead
// of static placeholders.

// Karhutla Vintage deck — real slides rendered from the PPTX (public/decks/karhutla).
// Each slide waits for the visitor to press Next.
const SLIDES = [
  'Napasmu hari ini',
  'Apa itu karhutla',
  'Seberapa besar',
  'Penyebab',
  'Lahan gambut',
  'Kesehatan',
  'Dampak',
  'Penanganan',
  'Ajakan',
  'Penutup',
];
const slideSrc = (i, thumb = false) => `/decks/karhutla/${String(i + 1).padStart(2, '0')}${thumb ? '-thumb' : ''}.webp`;

function DeckCard() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const last = index === SLIDES.length - 1;

  // Warm the cache for the next slide so Next feels instant
  useEffect(() => {
    if (index + 1 < SLIDES.length) {
      const img = new Image();
      img.src = slideSrc(index + 1);
    }
  }, [index]);

  const go = (i) => {
    playClick();
    setDir(i >= index ? 1 : -1);
    setIndex((i + SLIDES.length) % SLIDES.length);
  };
  const next = () => go(last ? 0 : index + 1);
  const prev = () => go(Math.max(0, index - 1));

  return (
    <article
      className="figma-portfolio-big-card ws-card ws-deck ws-slides"
      data-spotlight
      data-reveal
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      }}
    >
      <div className="figma-card-tags-row">
        <span className="figma-mono-tag-chip">PPT</span>
        <span className="ws-live">
          <i className="ws-live__dot" /> SLIDE {String(index + 1).padStart(2, '0')} / {SLIDES.length}
        </span>
        <span className="figma-status-badge">Proyek asli</span>
      </div>

      <div className="ws-stage">
        <button
          type="button"
          className="ws-stage__screen ws-slides__screen"
          onClick={next}
          aria-label={last ? 'Ulang dari slide pertama' : 'Slide berikutnya'}
        >
          <img
            key={index}
            src={slideSrc(index)}
            alt={`Slide ${index + 1}: ${SLIDES[index]} — presentasi Karhutla Vintage`}
            className={`ws-slides__img ${dir > 0 ? 'from-right' : 'from-left'}`}
            width="1280"
            height="720"
            loading="lazy"
            decoding="async" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          <span className="ws-stage__counter">
            {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </button>

        <div className="ws-chapters" role="tablist" aria-label="Pilih slide">
          {SLIDES.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={i === index}
              title={label}
              className={`ws-chapter${i === index ? ' is-active' : ''}${i < index ? ' is-done' : ''}`}
              onClick={() => go(i)}
            >
              <span className="ws-chapter__fill" style={{ width: i <= index ? '100%' : '0%' }} />
            </button>
          ))}
        </div>

        <div className="ws-video__bar">
          <span className="ws-chapter__label">
            {String(index + 1).padStart(2, '0')} — {SLIDES[index]}
            {!last && <em> · pencet Next buat lanjut</em>}
          </span>
          <div className="ws-video__controls">
            <button type="button" className="ws-video__btn" onClick={prev} disabled={index === 0} aria-label="Slide sebelumnya">
              ←
            </button>
            <button type="button" className="ws-video__btn ws-video__next is-ready" onClick={next} aria-label={last ? 'Ulang dari awal' : 'Slide berikutnya'}>
              {last ? '↺ Ulang' : 'Next →'}
            </button>
          </div>
        </div>
      </div>

      <div className="figma-card-footer-info">
        <div>
          <h4 className="figma-card-title">Karhutla — Edisi Vintage</h4>
          <span className="figma-card-meta">10 SLIDE // PRESENTASI EDUKASI 16:9</span>
        </div>
        <Link to="/layanan/desain-ppt" className="ws-cta" onClick={() => playClick()}>
          Bikin yang kayak gini <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

function WebCard() {
  return (
    <Link
      to="/layanan/website"
      className="figma-portfolio-small-card ws-card ws-web"
      onClick={() => playClick()}
      data-spotlight
      data-reveal
      data-reveal-delay="1"
    >
      <div className="figma-card-tags-row">
        <span className="figma-mono-tag-chip">WEB</span>
        <span className="figma-status-badge is-concept">Contoh karya</span>
      </div>

      <div className="ws-browser" aria-hidden="true">
        <div className="ws-browser__bar">
          <span className="ws-browser__lights">
            <i />
            <i />
            <i />
          </span>
          <span className="ws-browser__url">studiofotoanalog.id</span>
          <span className="ws-browser__hint">hover ↓</span>
        </div>
        <div className="ws-browser__viewport">
          <div className="ws-browser__page">
            <div className="ws-page-hero">
              <span className="ws-page-hero__kicker">EST. 1998 — 35MM</span>
              <span className="ws-page-hero__title">Cahaya yang nggak bisa diulang.</span>
            </div>
            <div className="ws-film">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} style={{ '--i': i }} />
              ))}
            </div>
            <div className="ws-page-row">
              <span>PORTRAIT</span>
              <span>WEDDING</span>
              <span>STREET</span>
            </div>
            <div className="ws-film ws-film--b">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} style={{ '--i': i + 6 }} />
              ))}
            </div>
            <div className="ws-page-cta">BOOKING SESI →</div>
          </div>
          <span className="ws-grain" />
        </div>
      </div>

      <div className="figma-card-footer-info">
        <div>
          <h4 className="figma-card-title">Landing Page Studio Foto Analog</h4>
          <span className="figma-card-meta">JAMBI // CONCEPT DESIGN</span>
        </div>
        <span className="ws-arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

function NotionCard() {
  const tasks = ['Brief klien masuk', 'Invoice DP terkirim', 'Revisi 2 beres', 'File final dikirim'];
  return (
    <Link
      to="/produk-digital/notion-freelance-os"
      className="figma-portfolio-small-card ws-card ws-notion"
      onClick={() => playClick()}
      data-spotlight
      data-reveal
      data-reveal-delay="2"
    >
      <div className="figma-card-tags-row">
        <span className="figma-mono-tag-chip">PRODUK</span>
        <span className="figma-status-badge">Proyek asli</span>
      </div>

      <div className="ws-os" aria-hidden="true">
        <ul className="ws-checklist">
          {tasks.map((t, i) => (
            <li key={t} style={{ '--i': i }}>
              <span className="ws-check" />
              <span className="ws-check__text">{t}</span>
            </li>
          ))}
        </ul>
        <div className="ws-kanban">
          <div className="ws-kanban__cols">
            <span>BRIEF</span>
            <span>PROSES</span>
            <span>SELESAI</span>
          </div>
          <div className="ws-kanban__track">
            <span className="ws-kanban__chip">Deck Klien A</span>
          </div>
          <div className="ws-kanban__stat">
            <b data-count="140" data-count-suffix="+">140+</b> download
          </div>
        </div>
      </div>

      <div className="figma-card-footer-info">
        <div>
          <h4 className="figma-card-title">Notion Freelance Operating System</h4>
          <span className="figma-card-meta">140+ DOWNLOAD // TEMPLATE</span>
        </div>
        <span className="ws-arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

export default function WorkShowcase() {
  return (
    <div className="figma-portfolio-asymmetric-grid ws-grid">
      <DeckCard />
      <div className="figma-portfolio-stack-col">
        <WebCard />
        <NotionCard />
      </div>
    </div>
  );
}
