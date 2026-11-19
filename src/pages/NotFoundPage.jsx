import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

// Figma frame 2001:4395 (404). The "escaped" Nova Dot that replaces the 0 can be
// dragged around and springs back home — a small toy for a lost visitor.
const FAST_LINKS = [
  { dir: 'DIR:01', kind: 'LAYANAN', label: 'Desain Presentasi & Deck', to: '/layanan/desain-ppt' },
  { dir: 'DIR:02', kind: 'DEV', label: 'Bikin Website Kustom', to: '/layanan/website' },
  { dir: 'DIR:03', kind: 'ESTIMASI', label: 'Hitung Estimasi Biaya', to: '/harga' },
];

export default function NotFoundPage() {
  const dotRef = useRef(null);
  const drag = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [escapes, setEscapes] = useState(0);

  useEffect(() => {
    const move = (e) => {
      if (!drag.current) return;
      setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
    };
    const up = () => {
      if (!drag.current) return;
      drag.current = null;
      setDragging(false);
      setOffset({ x: 0, y: 0 });
      setEscapes((n) => n + 1);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  const startDrag = (e) => {
    e.preventDefault();
    drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    setDragging(true);
  };

  const notes = ['ini dia, kabur', 'eh balik lagi', 'oke, sekali lagi?', 'dia betah di sini'];

  return (
    <div className="sn-page nf-page" data-name="Supernova Studio — 404">
      <section className="sn-container nf-main">
        <span className="sn-overline" data-reveal>
          <span className="sn-dot" /> KESALAHAN 404 // HALAMAN TIDAK DITEMUKAN
        </span>

        <div className="nf-lockup" aria-label="404" data-reveal data-reveal-delay="1">
          <span className="sn-display nf-four">4</span>
          <span className="nf-zero">
            <span
              ref={dotRef}
              className={`nf-dot${dragging ? ' is-dragging' : ''}`}
              style={{ transform: `translate(${offset.x}px, ${offset.y}px) rotate(-6deg)` }}
              onPointerDown={startDrag}
              role="img"
              aria-label="Nova Dot yang kabur, bisa digeser"
            />
            <span className="nf-callout" aria-hidden="true">
              <span className="sn-caveat">{notes[escapes % notes.length]}</span>
              <img src="/figma-assets/arrow-caveat.svg" alt="" />
            </span>
          </span>
          <span className="sn-display nf-four">4</span>
        </div>

        <div className="nf-copy" data-reveal data-reveal-delay="2">
          <h1 className="sn-display nf-title">Halaman ini nyasar. Kayak ide yang belum dirapihin.</h1>
          <p className="sn-body sn-body--lg">
            Mungkin tautannya udah usang, ada typo di URL, atau halamannya lagi dipindah ke folder lain sama
            gue. Santai, navigasi utama masih aman.
          </p>
        </div>

        <div className="nf-actions" data-reveal data-reveal-delay="3">
          <Link to="/" className="sn-btn sn-btn--primary sn-btn--lg" data-magnetic onClick={playClick}>
            Balik ke beranda <ArrowRight size={13} />
          </Link>
          <Link to="/portofolio" className="sn-link-underline" onClick={playClick}>
            Atau lihat karya portofolio <ArrowUpRight size={11} />
          </Link>
        </div>

        <div className="sn-card nf-explorer" data-reveal data-reveal-delay="4">
          <div className="nf-explorer__head">
            <span className="sn-mono">MUNGKIN LO LAGI NYARI SALAH SATU DARI INI:</span>
            <span className="sn-mono sn-mono--plain">INDEX // 03</span>
          </div>
          <div className="nf-explorer__grid">
            {FAST_LINKS.map((l) => (
              <Link key={l.dir} to={l.to} className="nf-fast" onClick={playClick} data-spotlight>
                <span className="nf-fast__top">
                  <span className="sn-dot" />
                  <span>{l.dir}</span>
                </span>
                <span className="nf-fast__kind">{l.kind}</span>
                <span className="nf-fast__label">
                  {l.label} <ArrowUpRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="nf-colophon">
          <span>SUPERNOVA STUDIO // SOLO PRACTICE • 2026</span>
          <span>STATUS: 404_PAGE_RESOLVED_OK</span>
        </div>
      </section>
    </div>
  );
}
