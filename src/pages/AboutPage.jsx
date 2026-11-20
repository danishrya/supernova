import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ArrowRight, ArrowUpRight } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

// Copy from Figma frame 2001:2934 (Tentang). Year labels are editable placeholders
// for the "[ganti: …]" slots in the design.
const MILESTONES = [
  { year: '2021', text: 'Mulai bikin deck presentasi sidang & lomba bisnis buat temen kampus. Ketagihan ngerapihin alur cerita.', phase: 'PHASE_01', tag: 'KAMPUS' },
  { year: '2022', text: 'Garap website portofolio & company profile perdana buat UMKM keramik lokal. Mulai ninggalin template pasaran.', phase: 'PHASE_02', tag: 'UMKM' },
  { year: '2024', text: 'Resmi namain Supernova Studio. Rilis batch produk digital pertama (Pitch Deck Blueprint & Brand Kit).', phase: 'PHASE_03', tag: 'STUDIO LAUNCH' },
  { year: '2026', text: 'Fokus solo practice penuh waktu. Bantu puluhan founder & UMKM tampil rapi tanpa birokrasi agensi.', phase: 'CURRENT STATUS', tag: 'FULL-TIME', now: true },
];

const METHODS = [
  {
    no: '01',
    tag: 'KOMUNIKASI',
    title: 'Ngobrol lurus tanpa basa-basi',
    text: 'Nggak ada istilah presentasi pitching 40 slide cuma buat jelasin konsep awal. Kita langsung bedah brief lewat chat atau call singkat, tentuin objektif utama, dan sepakati batas revisi.',
  },
  {
    no: '02',
    tag: 'ONE-STOP',
    title: 'Eksekusi fokus satu pintu',
    text: "Semua file desain, riset alur, copywriting sampai integrasi web ditangani langsung sama gue. Nggak bakal ada pesan lo yang 'nyangkut di intern'. Lo dapet hasil murni standar zine.",
    flipped: true,
  },
  {
    no: '03',
    tag: 'HANDOVER',
    title: 'Transparansi file & serah terima',
    text: 'File master Figma, PPTX editable, font lisensi, dan staging link web jadi milik lo seutuhnya 100%. Ditambah video walkthrough panduan mandiri biar lo bisa update sendiri.',
  },
];

const PRINCIPLES = ['Jelas dulu, bagus kemudian', 'Revisi itu wajar, bukan dosa', 'Kalau nggak bisa, gue bilang'];

const WA_URL = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
  'Halo Min Cham, gue cocok sama cara kerja Supernova. Yuk bikin sesuatu bareng!'
)}`;

const GREETINGS = [
  'Halo! Selamat datang 👋 Ada yang bisa Min Cham bantu?',
  'Eh, halo! Min Cham di sini. Mau bikin apa nih?',
  'Selamat datang di Supernova! Butuh deck, web, atau template?',
];

const BUBBLES = {
  poke: ['eh? apa?', 'hm?', 'iya, kenapa?'],
  pinched: ['aduh…', 'eh eh eh', 'sakit woy'],
  angry: ['WOI! SAKIT!', 'udah dong!', 'lepasin ga!'],
  calm: ['…iya iya, dimaafin', 'jangan diulang ya', 'hmph.'],
};
const pick = (list) => list[Math.floor(Math.random() * list.length)];

/** One open eye drawn over a lens of the (closed-eyed) drawing; the pupil follows --ex/--ey. */
function AvatarEye({ side }) {
  return (
    <svg className={`ab-eye ab-eye--${side}`} viewBox="0 0 60 36" aria-hidden="true">
      <defs>
        <clipPath id={`ab-eye-clip-${side}`}>
          <path d="M4 18 Q30 -2 56 18 Q30 38 4 18 Z" />
        </clipPath>
      </defs>
      <g className="ab-eye__lid">
        <path d="M4 18 Q30 -2 56 18 Q30 38 4 18 Z" fill="#fffdf8" />
        <g clipPath={`url(#ab-eye-clip-${side})`}>
          <g className="ab-eye__look">
            <circle cx="30" cy="18" r="10" fill="#4a2e1c" />
            <circle cx="30" cy="18" r="5" fill="#0f0a08" />
            <circle cx="33" cy="15" r="2.2" fill="#ffffff" />
          </g>
        </g>
        <path d="M4 18 Q30 -2 56 18 Q30 38 4 18 Z" fill="none" stroke="#17110f" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/**
 * Admin avatar: stays still, eyes follow the cursor. Press + drag pinches it
 * (stretches toward the pull, springs back); pinch hard or long and he gets angry.
 */
function AdminAvatar() {
  const [mood, setMood] = useState('idle'); // idle | pinched | angry
  const [bubble, setBubble] = useState('');
  const [waving, setWaving] = useState(true); // waves hello on arrival, then rests the arm
  const [pull, setPull] = useState(null); // { ox, oy, dx, dy } while pinching
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const press = useRef(null);
  const moodRef = useRef('idle');
  const timers = useRef([]);

  const setMoodBoth = (m) => {
    moodRef.current = m;
    setMood(m);
  };
  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };
  const later = (fn, ms) => timers.current.push(window.setTimeout(fn, ms));
  const say = (text, ms) => {
    setBubble(text);
    later(() => setBubble(''), ms);
  };

  const getAngry = () => {
    clearTimers();
    setMoodBoth('angry');
    say(pick(BUBBLES.angry), 2200);
    later(() => {
      setMoodBoth('idle');
      setBubble(pick(BUBBLES.calm));
      later(() => setBubble(''), 1800);
    }, 2400);
  };

  // End a pinch no matter where/how the button is released (outside the box,
  // outside the window, lost capture, tab switch) — otherwise it stays "pinched".
  const endPinch = () => {
    const p = press.current;
    if (!p) return;
    press.current = null;
    setPull(null);
    if (p.travel < 6 && moodRef.current === 'idle') {
      clearTimers();
      say(pick(BUBBLES.poke), 1200);
    } else if (moodRef.current === 'pinched') {
      clearTimers();
      setMoodBoth('idle');
      say('fiuh…', 900);
    }
  };

  // Greet once when the page opens, then lower the arm
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = window.setTimeout(() => setBubble(pick(GREETINGS)), 450);
    const t2 = window.setTimeout(() => setWaving(false), reduced ? 2200 : 3200);
    const t3 = window.setTimeout(() => setBubble((b) => (GREETINGS.includes(b) ? '' : b)), 4800);
    return () => [t1, t2, t3].forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const onWinMove = (e) => {
      const p = press.current;
      if (p) {
        if (e.pointerType === 'mouse' && e.buttons === 0) {
          endPinch(); // button already released somewhere we didn't hear about
          return;
        }
        const dx = Math.max(-90, Math.min(90, e.clientX - p.x));
        const dy = Math.max(-90, Math.min(90, e.clientY - p.y));
        p.travel = Math.max(p.travel, Math.hypot(dx, dy));
        setPull((v) => v && { ...v, dx, dy });
        if (p.travel > 18 && moodRef.current === 'idle') {
          clearTimers();
          setMoodBoth('pinched');
          say(pick(BUBBLES.pinched), 1200);
        }
        if (moodRef.current !== 'angry' && (p.travel > 75 || (p.travel > 25 && performance.now() - p.t > 1100))) getAngry();
      }
      if (reduced || !rootRef.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // eyes look toward the cursor; distance only changes how far (capped)
        const r = rootRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.32;
        const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
        const reach = Math.min(1, Math.hypot(e.clientX - cx, e.clientY - cy) / 260);
        rootRef.current.style.setProperty('--ex', (Math.cos(ang) * 9 * reach).toFixed(2));
        rootRef.current.style.setProperty('--ey', (Math.sin(ang) * 5 * reach).toFixed(2));
      });
    };
    const onWinUp = () => endPinch();
    window.addEventListener('pointermove', onWinMove, { passive: true });
    window.addEventListener('pointerup', onWinUp);
    window.addEventListener('pointercancel', onWinUp);
    window.addEventListener('blur', onWinUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onWinMove);
      window.removeEventListener('pointerup', onWinUp);
      window.removeEventListener('pointercancel', onWinUp);
      window.removeEventListener('blur', onWinUp);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const r = stageRef.current.getBoundingClientRect();
    press.current = { x: e.clientX, y: e.clientY, t: performance.now(), travel: 0 };
    setPull({ ox: ((e.clientX - r.left) / r.width) * 100, oy: ((e.clientY - r.top) / r.height) * 100, dx: 0, dy: 0 });
  };

  const stretch = pull
    ? {
        transformOrigin: `${pull.ox}% ${pull.oy}%`,
        transform: `translate(${pull.dx * 0.25}px, ${pull.dy * 0.25}px) skewX(${(pull.dx / 90) * 8}deg) scale(${1 + Math.abs(pull.dx) / 300 - Math.abs(pull.dy) / 900}, ${1 + Math.abs(pull.dy) / 300 - Math.abs(pull.dx) / 900})`,
      }
    : undefined;

  return (
    <div
      ref={rootRef}
      className={`ab-portrait__photo ab-spin is-${mood}${pull ? ' is-pulling' : ''}`}
      role="img"
      tabIndex={0}
      aria-label="Avatar admin Supernova. Klik tahan lalu tarik buat nyubit, atau tekan Enter."
      onPointerDown={onDown}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && moodRef.current !== 'angry') {
          e.preventDefault();
          getAngry();
        }
      }}
    >
      <div className="ab-spin__stage" ref={stageRef} style={stretch}>
        <div className="ab-spin__body">
          <img src={waving ? '/admin-spin/wavebase.webp' : '/admin-spin/down.webp'} alt="" className="is-current" width="720" height="688" draggable={false} />
          {waving && <img src="/admin-spin/hand.webp" alt="" className="ab-hand" draggable={false} />}
          {/* overlays are % of the 720×688 front frame */}
          <AvatarEye side="l" />
          <AvatarEye side="r" />
          <span className="ab-spin__blush ab-spin__blush--l" aria-hidden="true" />
          <span className="ab-spin__blush ab-spin__blush--r" aria-hidden="true" />
          <span className="ab-spin__vein" aria-hidden="true">💢</span>
          <span className="ab-spin__steam ab-spin__steam--l" aria-hidden="true" />
          <span className="ab-spin__steam ab-spin__steam--r" aria-hidden="true" />
        </div>
      </div>
      {bubble && (
        <span className="ab-spin__bubble" role="status" key={bubble}>
          {bubble}
        </span>
      )}
      <span className="ab-spin__hint" aria-hidden="true">
        tahan &amp; tarik buat nyubit
      </span>
    </div>
  );
}

export default function AboutPage() {
  const [activeMilestone, setActiveMilestone] = useState(MILESTONES.length - 1);

  return (
    <div className="sn-page ab-page" data-name="Supernova Studio — Tentang">
      <div className="sn-container">
        <div className="ab-crumb" data-reveal>
          <span className="sn-mono">01 // TENTANG MIN CHAM &amp; SUPERNOVA</span>
          <span className="sn-dot" />
        </div>

        {/* Hero */}
        <section className="ab-hero">
          <div className="ab-hero__visual" data-reveal="left">
            <span className="ab-hero__nova" aria-hidden="true" />
            <figure className="ab-portrait">
              <div className="ab-portrait__top">
                <span>PORTRAIT_REF.01</span>
                <span className="ab-portrait__iso">ISO 400</span>
              </div>
              <AdminAvatar />
              <figcaption className="ab-portrait__bottom">
                <span>FOUNDER</span>
                <span>JKT, ID</span>
              </figcaption>
            </figure>
            <div className="ab-hero__note">
              <img src="/figma-assets/arrow-caveat.svg" alt="" aria-hidden="true" />
              <span className="sn-caveat">orang di balik semua layar ini</span>
            </div>
          </div>

          <div className="ab-hero__copy">
            <span className="ab-hero__eyebrow" data-reveal>
              <span className="sn-dot" /> SOLO CREATIVE PRACTICE // SEJAK 2021
            </span>
            <h1 className="sn-display ab-hero__title" data-reveal data-reveal-delay="1">
              Gue bikin tampilan yang bikin orang <span className="ab-hero__hl">ngerti.</span>
            </h1>
            <div className="ab-hero__prose" data-reveal data-reveal-delay="2">
              <p>
                Gue mulai Supernova karena capek lihat bisnis bagus, riset keren, atau produk rapi kalah pamor
                cuma gara-gara slide presentasinya kaku dan website-nya berantakan kayak template bawaan. Di
                sini nggak ada tim account executive yang lempar-lemparan pesan. Lo ngobrol langsung sama gue,
                yang mikirin struktur informasi sekaligus ngeracik tampilannya sampai presisi.
              </p>
              <p>
                Fokus gue sederhana: ngebantu UMKM, founder startup tahap awal, kreator, dan mahasiswa
                ngebawain karyanya dengan percaya diri. Desain yang bener bukan cuma soal estetik, tapi bikin
                orang yang ngelihat langsung paham nilainya dalam hitungan detik.
              </p>
            </div>
            <div className="ab-pills" data-reveal data-reveal-delay="3">
              <span className="ab-pill">
                <b>KOTA:</b> Pasar Minggu, Jakarta Selatan
              </span>
              <span className="ab-pill">
                <b>SPESIALISASI:</b> Deck &amp; Web Studio
              </span>
              <span className="ab-pill">
                <span className="sn-dot sn-dot--pulse" style={{ width: 6, height: 6 }} />
                <b>KAPASITAS:</b> 2–3 Proyek / Bulan
              </span>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="ab-section">
          <div className="ab-section__head" data-reveal>
            <div>
              <span className="sn-mono">02 // MILESTONE</span>
              <h2 className="sn-display ab-section__title">Perjalanan.</h2>
            </div>
            <p className="sn-body">Dari ngerjain tugas slide temen sampai punya studio solo sendiri.</p>
          </div>
          <div
            className="ab-timeline"
            style={{ '--active': activeMilestone, '--count': MILESTONES.length }}
          >
            <span className="ab-timeline__rule" aria-hidden="true">
              <i />
            </span>
            {MILESTONES.map((m, i) => (
              <button
                key={m.phase}
                type="button"
                className={`ab-milestone${m.now ? ' is-now' : ''}${i <= activeMilestone ? ' is-past' : ''}${i === activeMilestone ? ' is-active' : ''}`}
                onMouseEnter={() => setActiveMilestone(i)}
                onFocus={() => setActiveMilestone(i)}
                onClick={() => {
                  playClick();
                  setActiveMilestone(i);
                }}
                data-reveal
                data-reveal-delay={i}
              >
                <span className="ab-milestone__marker">
                  <span className="ab-milestone__dot" />
                  <span className="ab-milestone__year">{m.year}</span>
                  {m.now && <span className="ab-milestone__now">NOW</span>}
                </span>
                <span className="ab-milestone__card">
                  <span className="ab-milestone__text">{m.text}</span>
                  <span className="ab-milestone__foot">
                    <span>{m.phase}</span>
                    <span>{m.tag}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Methods */}
        <section className="ab-section">
          <div className="ab-section__head" data-reveal>
            <div>
              <span className="sn-mono">03 // METODOLOGI</span>
              <h2 className="sn-display ab-section__title">Cara gue kerja.</h2>
            </div>
          </div>
          <div className="ab-methods">
            {METHODS.map((m, i) => (
              <article
                key={m.no}
                className={`ab-method${m.flipped ? ' is-flipped' : ''}`}
                data-reveal
                data-reveal-delay={i}
                data-tilt="5"
              >
                <div className="ab-method__top">
                  <span className="ab-method__no">{m.no}</span>
                  <span className="ab-method__tag">{m.tag}</span>
                </div>
                <div className="ab-method__body">
                  <h3 className="sn-display ab-method__title">{m.title}</h3>
                  <p>{m.text}</p>
                </div>
                <div className="ab-method__foot">
                  <span>{m.flipped ? '[KONDISI TERBALIK]' : 'FOUNDER'}</span>
                  <ArrowUpRight size={14} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="ab-section">
          <div className="ab-section__head ab-section__head--row" data-reveal>
            <span className="sn-mono">04 // PRINSIP DASAR</span>
            <span className="sn-mono sn-mono--plain">NON-NEGOTIABLE MANIFESTO</span>
          </div>
          <div className="ab-principles">
            {PRINCIPLES.map((p, i) => (
              <div key={p} className="ab-principle" data-reveal data-reveal-delay={i}>
                <span className="ab-principle__no">0{i + 1}</span>
                <span className="sn-display ab-principle__text">{p}</span>
                <span className="ab-principle__dot" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="ab-cta-wrap">
          <div className="ab-cta" data-reveal="scale">
            <span className="ab-cta__kicker">TERHUBUNG LANGSUNG // TANPA FORMULIR KAKU</span>
            <h2 className="sn-display ab-cta__title">Cocok sama cara kerja gue? Ayo bikin sesuatu bareng.</h2>
            <p className="ab-cta__lead">
              Kirim brief kasar, slide draft yang bikin lo pusing, atau sekadar ide produk digital yang pengen
              diwujudin. Gue balas dalam 1x24 jam kerja.
            </p>
            <div className="ab-cta__actions">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sn-btn sn-btn--primary sn-btn--md ab-cta__btn"
                data-magnetic
                onClick={playClick}
              >
                Mulai ngobrol di WhatsApp <ArrowRight size={12} />
              </a>
              <Link to="/#portofolio" className="sn-btn sn-btn--md ab-cta__btn ab-cta__btn--outline" onClick={playClick}>
                Lihat contoh karya
              </Link>
            </div>
            <div className="ab-cta__note">
              <img src="/figma-assets/layanan-handwritten-arrow.svg" alt="" aria-hidden="true" />
              <span className="sn-caveat">slot selalu terbatas tiap bulan biar tetep fokus</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
