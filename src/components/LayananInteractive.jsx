import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { playClick } from '../utils/sound';

/* =========================================================================
   Sticky jump nav — highlights the service block currently in view
   ========================================================================= */
const JUMPS = [
  { id: 'blok-ppt', no: '01', label: 'Presentasi' },
  { id: 'blok-website', no: '02', label: 'Website' },
  { id: 'blok-produk', no: '03', label: 'Produk digital' },
  { id: 'alur-order', no: '→', label: 'Alur order' },
];

export function ServiceJumpNav() {
  const [active, setActive] = useState(JUMPS[0].id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    JUMPS.forEach((j) => {
      const el = document.getElementById(j.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const idx = JUMPS.findIndex((j) => j.id === active);

  return (
    <nav className="lx-jump" aria-label="Lompat ke layanan">
      <div className="lx-jump__inner" style={{ '--i': idx, '--n': JUMPS.length }}>
        <span className="lx-jump__thumb" aria-hidden="true" />
        {JUMPS.map((j) => (
          <button
            key={j.id}
            type="button"
            className={`lx-jump__btn${active === j.id ? ' is-active' : ''}`}
            onClick={() => go(j.id)}
            aria-current={active === j.id ? 'true' : undefined}
          >
            <span className="lx-jump__no">{j.no}</span>
            {j.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* =========================================================================
   Block 1 — PPT: draft → Supernova morph toggle (auto-plays until touched)
   ========================================================================= */
export function PptMorphVisual() {
  const [after, setAfter] = useState(true);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = window.setInterval(() => setAfter((a) => !a), 3200);
    return () => window.clearInterval(t);
  }, [touched]);

  const toggle = (v) => {
    playClick();
    setTouched(true);
    setAfter(v);
  };

  return (
    <div className={`figma-layanan-block-visual lx-ppt${after ? ' is-after' : ' is-before'}`}>
      <div className="lx-switch" role="radiogroup" aria-label="Bandingkan slide">
        <button type="button" role="radio" aria-checked={!after} className={!after ? 'is-on' : ''} onClick={() => toggle(false)}>
          Draft lama
        </button>
        <button type="button" role="radio" aria-checked={after} className={after ? 'is-on' : ''} onClick={() => toggle(true)}>
          Versi Supernova
        </button>
        <span className="lx-switch__thumb" aria-hidden="true" />
      </div>

      <div className="lx-slide-back" aria-hidden="true" />
      <div className="lx-slide">
        <div className="lx-slide__bar">
          <span className="lx-slide__brand">
            <i /> {after ? 'SUPERNOVA // DECK INVESTASI UMKM' : 'Presentasi_final_REVISI3.pptx'}
          </span>
          <span>16:9</span>
        </div>

        <div className="lx-slide__body">
          <div className="lx-slide__copy">
            <span className="lx-slide__title">{after ? 'Pertumbuhan Penjualan Q3–Q4' : 'LAPORAN PERKEMBANGAN PENJUALAN PERUSAHAAN PERIODE Q3 DAN Q4 TAHUN 2026'}</span>
            <span className="lx-lines" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <i key={i} style={{ '--w': `${[96, 88, 92, 70, 84, 60][i]}%` }} />
              ))}
            </span>
            <span className="lx-slide__pill">+142% GROWTH</span>
          </div>
          <div className="lx-slide__chart" aria-hidden="true">
            <span className="lx-bars">
              {[30, 60, 95].map((h, i) => (
                <i key={i} style={{ '--h': `${h}%`, '--d': `${i * 90}ms` }} />
              ))}
            </span>
            <span className="lx-table">
              {Array.from({ length: 9 }).map((_, i) => (
                <i key={i} />
              ))}
            </span>
          </div>
        </div>

        <div className="lx-slide__foot">
          <span>{after ? 'SLIDE 16:9 // PITCH DECK' : 'Sumber: data internal (lihat lampiran)'}</span>
          <span className="lx-slide__page">{after ? 'PAGE 04 OF 18' : 'Hal. 23 dari 45'}</span>
        </div>
      </div>

      <div className="figma-visual-sticky-badge lx-ppt__badge">
        {after ? 'FORMAT: PPTX & PDF READY' : 'KEBACA? NGGAK JUGA…'}
      </div>
    </div>
  );
}

/* =========================================================================
   Block 2 — Website: drag to resize the viewport, layout reflows
   ========================================================================= */
export function WebResizeVisual() {
  const [w, setW] = useState(100); // percent of the stage
  const px = Math.round(375 + ((1440 - 375) * (w - 30)) / 70);
  const layout = w >= 78 ? 'desktop' : w >= 52 ? 'tablet' : 'mobile';

  return (
    <div className="figma-layanan-block-visual lx-web">
      <div className="figma-visual-sticky-badge lx-web__badge">SCREEN-ADAPTIVE // {layout.toUpperCase()}</div>

      <div className="lx-web__stage">
        <div className={`lx-browser lx-browser--${layout}`} style={{ width: `${w}%` }}>
          <div className="lx-browser__bar">
            <span className="lx-browser__lights">
              <i />
              <i />
              <i />
            </span>
            <span className="lx-browser__url">https://brand-kamu.com</span>
            <span className="lx-browser__px">{px}px</span>
          </div>
          <div className="lx-site">
            <div className="lx-site__nav">
              <b>BRAND CO.</b>
              <span className="lx-site__links">
                <i />
                <i />
                <i />
              </span>
              <span className="lx-site__burger" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="lx-site__hero">
              <div className="lx-site__copy">
                <i className="lx-site__h" />
                <i className="lx-site__h lx-site__h--2" />
                <i className="lx-site__p" />
                <span className="lx-site__wa">WhatsApp</span>
              </div>
              <div className="lx-site__img" />
            </div>
            <div className="lx-site__cards">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>

      <label className="lx-web__ctrl">
        <span>Geser buat ubah lebar layar</span>
        <input
          type="range"
          min="30"
          max="100"
          value={w}
          onChange={(e) => setW(Number(e.target.value))}
          aria-label="Lebar layar pratinjau"
        />
        <span className="lx-web__ticks" aria-hidden="true">
          <span>HP</span>
          <span>Tablet</span>
          <span>Desktop</span>
        </span>
      </label>
    </div>
  );
}

/* =========================================================================
   Block 3 — Produk: card fan, click to bring a product to the front
   ========================================================================= */
const FAN = [
  { id: 'notion-freelance-os', kind: 'SYSTEM TEMPLATE', name: 'Notion Freelance OS', desc: 'CRM klien, invoice & pipeline proyek.', price: 'Rp 129.000' },
  { id: 'pitch-deck-blueprint', kind: 'E-BOOK + PPTX', name: 'Pitch Deck Blueprint', desc: 'Panduan praktis nulis teks pitch deck yang bikin investor penasaran.', price: 'Rp 149.000', badge: 'BESTSELLER' },
  { id: 'brand-kit-umkm', kind: 'FIGMA + CANVA', name: 'Brand Kit UMKM', desc: 'Logo, palet warna, dan aset sosmed siap pakai.', price: 'Rp 189.000' },
];

export function ProdukFanVisual() {
  const [front, setFront] = useState(1);
  const order = [0, 1, 2].map((slot) => (front + slot - 1 + FAN.length) % FAN.length); // left, center, right
  const current = FAN[front];

  return (
    <div className="figma-layanan-block-visual lx-fan">
      <div className="lx-fan__stage">
        {order.map((idx, slot) => {
          const p = FAN[idx];
          return (
            <button
              key={p.id}
              type="button"
              className={`lx-card lx-card--${['left', 'center', 'right'][slot]}`}
              onClick={() => {
                playClick();
                setFront(idx);
              }}
              aria-label={`Lihat ${p.name}`}
              aria-pressed={idx === front}
            >
              <span className="lx-card__top">
                <span className="lx-card__kind">{p.badge ? `● ${p.badge}` : p.kind}</span>
                <span>{p.badge ? p.kind.split(' ')[0] : ''}</span>
              </span>
              <span className="lx-card__name">{p.name}</span>
              <span className="lx-card__desc">{p.desc}</span>
              <span className="lx-card__foot">
                <b>{p.price}</b>
                <span className="lx-card__tag">INSTANT</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="lx-fan__bar">
        <span className="figma-visual-sticky-badge lx-fan__badge">DIRECT ACCESS // NO SUBSCRIPTION</span>
        <Link to={`/produk-digital/${current.id}`} className="lx-fan__link" onClick={playClick}>
          Lihat {current.name} →
        </Link>
      </div>
    </div>
  );
}

/* =========================================================================
   Alur order — 5 steps, progress follows scroll, click to focus a step
   ========================================================================= */
const ORDER = [
  { tag: 'SEPAKAT', title: 'Ngobrol Santai', desc: 'Lo ceritain kebutuhan, target audiens, materi mentah, dan deadline lewat WhatsApp atau form brief singkat.', time: 'Hari 0' },
  { tag: 'SEPAKAT', title: 'Penawaran Fix', desc: 'Gue kasih rincian harga pasti, cakupan kerja, dan estimasi tanggal jadi. Nggak ada biaya tersembunyi di belakang.', time: '≤ 24 jam' },
  { tag: 'MULAI', title: 'DP & Kickoff', desc: 'Bayar DP 50% sebagai tanda jadi komitmen waktu pengerjaan, slot kalender kerja langsung dikunci buat lo.', time: 'Hari 1' },
  { tag: 'PROSES', title: 'Dikerjain Fokus', desc: 'Gue racik desainnya dengan teliti. Draft pertama bakal dikirim via link preview rapi sesuai tanggal yang disepakati.', time: 'Hari 2–10' },
  { tag: 'SELESAI', title: 'Revisi & Serah Terima', desc: 'Penyesuaian minor jika ada. Pelunasan sisa 50%, lalu seluruh file master dikirim ke Google Drive lo. Selesai!', time: 'Hari terakhir' },
];

export function OrderTimeline() {
  const ref = useRef(null);
  const [scrollStep, setScrollStep] = useState(0);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.8 - r.top) / (r.height + vh * 0.2)));
      setScrollStep(Math.min(ORDER.length - 1, Math.floor(p * ORDER.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = picked ?? scrollStep;

  return (
    <div className="lx-order" ref={ref} onMouseLeave={() => setPicked(null)}>
      <div className="lx-order__rail" aria-hidden="true">
        <span style={{ width: `${(active / (ORDER.length - 1)) * 100}%` }} />
      </div>
      <div className="figma-layanan-steps-5-grid lx-order__grid">
        {ORDER.map((s, i) => {
          const state = i < active ? 'done' : i === active ? 'current' : 'pending';
          return (
            <button
              key={s.title}
              type="button"
              className={`figma-step-5-card lx-step is-${state}`}
              onMouseEnter={() => setPicked(i)}
              onFocus={() => setPicked(i)}
              onClick={() => {
                playClick();
                setPicked(i);
              }}
            >
              <span className={`figma-step-5-badge ${i <= active ? 'is-active' : 'is-pending'}`}>
                {state === 'done' ? '✓' : String(i + 1).padStart(2, '0')}
              </span>
              <span className={`figma-step-5-tag${i <= active ? '' : ' is-pending'}`}>
                TAHAP 0{i + 1} // {state === 'current' ? 'LO DI SINI' : s.tag}
              </span>
              <span className="figma-step-5-title">{s.title}</span>
              <span className={`figma-step-5-desc${i <= active ? '' : ' is-pending'}`}>{s.desc}</span>
              <span className="lx-step__time">{s.time}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
