import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { playClick } from '../utils/sound';

// Beranda "Contoh karya" — three live cards that demo the kind of work instead
// of static placeholders. Slugs match src/data/caseStudies.js.

const SLIDES = [
  { key: 'cover', label: 'COVER' },
  { key: 'problem', label: 'MASALAH' },
  { key: 'traction', label: 'TRAKSI' },
  { key: 'ask', label: 'PENDANAAN' },
];

const SLIDE_MS = 2800;

function DeckSlide({ kind }) {
  if (kind === 'cover') {
    return (
      <div className="ws-slide ws-slide--cover">
        <span className="ws-slide__kicker">
          <i className="ws-dot" /> SERIES SEED ROUND 2026
        </span>
        <h5 className="ws-slide__title">
          Agrotech: Modernizing Rural <em>Harvest Logistics</em>
        </h5>
        <span className="ws-slide__foot">STUDIO × AGROTECH FOUNDER DECK</span>
        <span className="ws-slide__orb" aria-hidden="true" />
      </div>
    );
  }
  if (kind === 'problem') {
    return (
      <div className="ws-slide ws-slide--problem">
        <span className="ws-slide__kicker ws-red"># INEFEKTIFITAS LOGISTIK GABAH</span>
        <div className="ws-slide__big">
          <span className="ws-big-num">42%</span>
          <span className="ws-big-copy">nilai panen tergerus rantai pengepul berlapis</span>
        </div>
        <div className="ws-chain" aria-hidden="true">
          {['PETANI', 'PENGEPUL', 'PENGEPUL', 'KILANG'].map((n, i) => (
            <React.Fragment key={i}>
              <span className={i === 0 || i === 3 ? 'is-end' : ''}>{n}</span>
              {i < 3 && <i />}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
  if (kind === 'traction') {
    const bars = [22, 30, 38, 47, 61, 74, 88];
    return (
      <div className="ws-slide ws-slide--traction">
        <span className="ws-slide__kicker ws-peach"># PERTUMBUHAN MoM 2025</span>
        <div className="ws-chart" aria-hidden="true">
          {bars.map((h, i) => (
            <span key={i} style={{ '--h': `${h}%`, '--i': i }} />
          ))}
        </div>
        <span className="ws-slide__caption">
          <b>18.400 ton</b> gabah terkirim · retention 91,2%
        </span>
      </div>
    );
  }
  return (
    <div className="ws-slide ws-slide--ask">
      <span className="ws-slide__kicker ws-gold"># TARGET PENDANAAN</span>
      <span className="ws-ask">Rp 4,2 M</span>
      <span className="ws-slide__caption">Seed round cap tertutup · dipitch ke 4 VC partners</span>
      <span className="ws-stamp">CLOSED</span>
    </div>
  );
}

function DeckCard() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || !inView || reduce) return undefined;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, inView]);

  return (
    <article
      ref={ref}
      className={`figma-portfolio-big-card ws-card ws-deck${paused ? ' is-paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-spotlight
      data-reveal
    >
      <div className="figma-card-tags-row">
        <span className="figma-mono-tag-chip">PPT</span>
        <span className="ws-live">
          <i className="ws-live__dot" /> {paused ? 'DIJEDA' : 'SEDANG DIPUTAR'}
        </span>
        <span className="figma-status-badge">Proyek asli</span>
      </div>

      <div className="ws-stage">
        <div className="ws-stage__screen" aria-live="polite">
          {SLIDES.map((s, i) => (
            <div key={s.key} className={`ws-stage__slide${i === active ? ' is-active' : ''}`} aria-hidden={i !== active}>
              <DeckSlide kind={s.key} />
            </div>
          ))}
          <span className="ws-stage__counter">
            {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>
        <div className="ws-thumbs" role="tablist" aria-label="Pilih slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`ws-thumb${i === active ? ' is-active' : ''}`}
              onClick={() => {
                playClick();
                setActive(i);
              }}
            >
              <span className="ws-thumb__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ws-thumb__label">{s.label}</span>
              <span
                className="ws-thumb__progress"
                style={{ animationDuration: `${SLIDE_MS}ms` }}
                key={`${i}-${active}-${paused}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="figma-card-footer-info">
        <div>
          <h4 className="figma-card-title">Pitch Deck Seed Round — Agrotech</h4>
          <span className="figma-card-meta">45 → 14 SLIDE // SELESAI DALAM 5 HARI</span>
        </div>
        <Link to="/portofolio/deck-investasi-agrotech" className="ws-cta" onClick={() => playClick()}>
          Studi kasus <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

function WebCard() {
  return (
    <Link
      to="/portofolio/landing-page-studio-foto-analog"
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
      to="/portofolio/notion-freelance-os"
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
