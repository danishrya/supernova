import React from 'react';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';

export default function ContactPage({ initialBrief, initialType }) {
  return (
    <div className="page-contact">
      {/* Header Banner */}
      <section className="page-header-section">
        <div className="container">
          <div className="page-header-box text-center">
            <span className="section-tag">HUB KONSULTASI &amp; KOLABORASI</span>
            <h1 className="page-main-title">
              Mulai Diskusi Proyek Anda <br />
              Bersama Tim Kreatif &amp; Digital Kami.
            </h1>
            <p className="page-main-subtitle">
              Tidak ada komitmen awal dan konsultasi 100% gratis. Ceritakan visi, kebutuhan slide presentasi (PPT),
              rekayasa website, atau identitas brand Anda — kami siap merumuskan solusi dan penawaran kustom yang paling efisien.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Form & Channels */}
      <Contact initialBrief={initialBrief} initialType={initialType} />

      {/* Integrated FAQ */}
      <FAQ />
    </div>
  );
}
