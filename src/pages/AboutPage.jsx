import React, { useState } from 'react';
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
            <figure className="ab-portrait" data-tilt="6">
              <div className="ab-portrait__top">
                <span>PORTRAIT_REF.01</span>
                <span className="ab-portrait__iso">ISO 400</span>
              </div>
              <div className="ab-portrait__photo">
                <span className="ab-portrait__label">[ganti: foto]</span>
                <span className="ab-portrait__scan" aria-hidden="true" />
              </div>
              <figcaption className="ab-portrait__bottom">
                <span>FOUNDER</span>
                <span>YK, ID</span>
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
                <b>KOTA:</b> Yogyakarta &amp; Jakarta
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
