import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { playClick } from '../utils/sound';

// Beranda "Contoh karya" — three live cards that demo the kind of work instead
// of static placeholders.

// Karhutla deck recording (public/media/karhutla-720.mp4). One file, split into
// chapters by time: each chapter plays once and pauses on its last frame until
// the visitor presses Next. Boundaries come from the frame-difference analysis
// of the source video (where each slide's transition starts).
const CHAPTERS = [
  { label: 'Langit biru', start: 0, end: 5.4 },
  { label: 'Menu', start: 5.4, end: 10.4 },
  { label: 'Karhutla', start: 10.4, end: 16.4 },
  { label: 'Penyebab', start: 16.4, end: 23.4 },
  { label: 'Masih menyala', start: 23.4, end: 29.3 },
  { label: 'Kesehatan', start: 29.3, end: 35.9 },
  { label: 'Dampak meluas', start: 35.9, end: 42.4 },
  { label: 'Bukan cerita lama', start: 42.4, end: 47.9 },
  { label: 'Solusi', start: 47.9, end: 55.0 },
  { label: 'Mulai dari kamu', start: 55.0, end: 59.95 },
];

function DeckCard() {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const rafRef = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [load, setLoad] = useState(false); // attach the video src only when the card is near
  // Progress fill is written straight to the DOM: updating React state every
  // animation frame re-rendered the whole card ~60×/s while the video played.
  const fillRefs = useRef([]);
  const chapterRef = useRef(0);
  const visibleRef = useRef(false);
  const resumeRef = useRef(false);

  const stopWatch = () => cancelAnimationFrame(rafRef.current);
  const setFill = (i, ratio) => {
    const el = fillRefs.current[i];
    if (el) el.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
  };

  const watchChapter = (i) => {
    const v = videoRef.current;
    const c = CHAPTERS[i];
    const tick = () => {
      const t = v.currentTime;
      setFill(i, (t - c.start) / (c.end - c.start));
      if (t >= c.end - 0.04) {
        v.pause();
        setPlaying(false);
        setFill(i, 1);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  // Play chapter i from its start; pause exactly at its end.
  const playChapter = (i) => {
    const v = videoRef.current;
    if (!v) return;
    if (!load) setLoad(true);
    const c = CHAPTERS[i];
    stopWatch();
    chapterRef.current = i;
    setChapter(i);
    setStarted(true);
    setFill(i, 0);
    const start = () => {
      if (Math.abs(v.currentTime - c.start) > 0.15) v.currentTime = c.start;
      const p = v.play();
      setPlaying(true);
      if (p && p.catch) p.catch(() => setPlaying(false));
      watchChapter(i);
    };
    // src may have just been attached — wait for metadata before seeking
    if (v.readyState >= 1) start();
    else v.addEventListener('loadedmetadata', start, { once: true });
  };

  const next = () => {
    playClick();
    playChapter(chapter + 1 < CHAPTERS.length ? chapter + 1 : 0);
  };

  const prev = () => {
    playClick();
    playChapter(Math.max(0, chapter - 1));
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setLoad(true);
      return undefined;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 1) start downloading only when the card is about to scroll in
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          near.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    // 2) autoplay chapter 1 on first view; pause when off-screen, resume on return
    let autoplayed = false;
    const seen = new IntersectionObserver(
      ([e]) => {
        const v = videoRef.current;
        visibleRef.current = e.isIntersecting;
        if (!v) return;
        if (e.isIntersecting) {
          if (!autoplayed && !reduce) {
            autoplayed = true;
            playChapter(0);
          } else if (resumeRef.current) {
            resumeRef.current = false;
            v.play().catch(() => {});
            setPlaying(true);
            watchChapter(chapterRef.current);
          }
        } else if (!v.paused) {
          resumeRef.current = true;
          stopWatch();
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 }
    );
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
      stopWatch();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const last = chapter === CHAPTERS.length - 1;
  const waiting = started && !playing;

  return (
    <article
      ref={cardRef}
      className={`figma-portfolio-big-card ws-card ws-deck ws-video${waiting ? ' is-waiting' : ''}`}
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
          <i className="ws-live__dot" /> {playing ? 'SEDANG DIPUTAR' : started ? 'MENUNGGU NEXT' : 'SIAP DIPUTAR'}
        </span>
        <span className="figma-status-badge">Proyek asli</span>
      </div>

      <div className="ws-stage">
        <div className="ws-stage__screen ws-video__screen">
          <video
            ref={videoRef}
            className="ws-video__el"
            src={load ? '/media/karhutla-960.mp4' : undefined}
            poster="/media/karhutla-poster.jpg"
            muted
            playsInline
            preload={load ? 'auto' : 'none'}
            aria-label="Rekaman presentasi Karhutla Indonesia"
            onClick={() => (playing ? null : next())}
          />
          <span className="ws-stage__counter">
            {String(chapter + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
          </span>
          {!started && (
            <button type="button" className="ws-video__play" onClick={() => { playClick(); playChapter(0); }}>
              ▶ Putar presentasi
            </button>
          )}

        </div>

        <div className="ws-chapters" role="tablist" aria-label="Pilih slide">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.label}
              type="button"
              role="tab"
              aria-selected={i === chapter}
              title={c.label}
              className={`ws-chapter${i === chapter ? ' is-active' : ''}${i < chapter ? ' is-done' : ''}`}
              onClick={() => { playClick(); playChapter(i); }}
            >
              <span
                className="ws-chapter__fill"
                ref={(el) => {
                  fillRefs.current[i] = el;
                }}
                style={i === chapter ? undefined : { width: i < chapter ? '100%' : '0%' }}
              />
            </button>
          ))}
        </div>
        <div className="ws-video__bar">
          <span className="ws-chapter__label">
            {String(chapter + 1).padStart(2, '0')} — {CHAPTERS[chapter].label}
            {waiting && !last && <em> · pencet Next buat lanjut</em>}
          </span>
          <div className="ws-video__controls">
            <button type="button" className="ws-video__btn" onClick={prev} disabled={chapter === 0 || !started} aria-label="Slide sebelumnya">
              ←
            </button>
            <button
              type="button"
              className={`ws-video__btn ws-video__next${waiting ? ' is-ready' : ''}`}
              onClick={next}
              disabled={playing}
              aria-label={last ? 'Ulang dari awal' : 'Slide berikutnya'}
            >
              {last && waiting ? '↺ Ulang' : 'Next →'}
            </button>
          </div>
        </div>
      </div>

      <div className="figma-card-footer-info">
        <div>
          <h4 className="figma-card-title">Presentasi Edukasi Karhutla</h4>
          <span className="figma-card-meta">10 SLIDE // MOTION DECK 16:9</span>
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
