import React, { useState, useRef, useCallback } from 'react';
import { playClick } from '../utils/sound';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [activeCase, setActiveCase] = useState('ppt'); // 'ppt' | 'web'
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const cases = {
    ppt: {
      tag: 'STUDI KASUS 01 • DESAIN PITCH DECK & TENDER',
      title: 'Dari Slide Teks Menumpuk Jadi Narasi Visual yang Closing Deal',
      desc: 'Geser tuas pembanding untuk melihat bagaimana draft awal klien (kiri) kami rombak total menjadi slide presentasi berkelas (kanan).',
      before: {
        label: 'SEBELUM DI-BEDAH SUPERNOVA',
        badge: 'Draft Lama Klien',
        headline: 'Slide Penuh Paragraf Teks & Sulit Dipahami',
        sub: '• Paragraf teks menumpuk bikin audiens bosan\n• Grafik tabel mentahan tanpa penekanan\n• Pesan utama sulit ditangkap cepat',
        stat: 'Keterbacaan: 28%',
        bg: '#1c1f26',
        accent: '#94a3b8',
      },
      after: {
        label: 'HASIL KARYA STUDIO SUPERNOVA',
        badge: 'Standar Tier-1 Pitching',
        headline: 'Hierarki Visual 16:9, Pesan Langsung Tertangkap',
        sub: '✦ Alur cerita terarah & meyakinkan\n✦ Visualisasi data dan infografik tajam\n✦ Master file .PPTX editable di laptop klien',
        stat: 'Tingkat closing: 94%',
        bg: '#0a0d14',
        accent: '#e2b764',
      },
    },
    web: {
      tag: 'STUDI KASUS 02 • WEBSITE REDESIGN UMKM',
      title: 'Dari Web Lambat Jadi Mesin Penjualan Cepat',
      desc: 'Perubahan toko/profil bisnis lokal dari loading berat menjadi website kilat ramah smartphone.',
      before: {
        label: 'WEBSITE LAMA (TEMPLATE PASARAN)',
        badge: 'Loading 4.8 Detik',
        headline: 'Loading Lambat & Navigasi Membingungkan',
        sub: '• Pengunjung kabur sebelum web terbuka\n• Tombol WhatsApp tersembunyi\n• Tampilan template generik',
        stat: 'Bounce rate: 76%',
        bg: '#1f1a1d',
        accent: '#f43f5e',
      },
      after: {
        label: 'HASIL CODE & DESIGN SUPERNOVA',
        badge: 'Speed 0.3 Detik',
        headline: 'Website Bersih, Ringan & Mengalir ke WhatsApp',
        sub: '✦ Buka sekejap mata di smartphone\n✦ Tombol chat WhatsApp otomatis terpasang\n✦ Desain kustom berwibawa',
        stat: 'Konversi chat: +210%',
        bg: '#09101d',
        accent: '#4ecdc4',
      },
    },
  };

  const current = cases[activeCase];

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <section className="section before-after-section" id="comparison">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: 36 }}>
          <div className="section-note-pill">
            <span className="section-num">02</span>
            <span>BUKTI NYATA TRANSFORMASI</span>
          </div>
          <h2 className="section-title">
            Bukan Sekadar Estetik. <span className="highlight-text">Ini Soal Hasil &amp; Persepsi.</span>
          </h2>
          <p className="section-subtitle">
            Geser pemisah di bawah ini untuk melihat langsung perbedaan sebelum dan sesudah sentuhan Studio Supernova.
          </p>

          {/* Case Toggle Buttons */}
          <div className="comparison-tabs">
            <button
              type="button"
              className={`comp-tab-btn ${activeCase === 'ppt' ? 'active' : ''}`}
              onClick={() => {
                playClick();
                setActiveCase('ppt');
                setSliderPos(50);
              }}
            >
              <span>📊 Presentasi &amp; Pitch Deck (PPT)</span>
            </button>
            <button
              type="button"
              className={`comp-tab-btn ${activeCase === 'web' ? 'active' : ''}`}
              onClick={() => {
                playClick();
                setActiveCase('web');
                setSliderPos(50);
              }}
            >
              <span>🌐 Website &amp; Landing Page</span>
            </button>
          </div>
        </div>

        {/* Comparison Stage */}
        <div
          ref={containerRef}
          className="before-after-stage"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          data-cursor="Geser"
        >
          {/* AFTER CARD (Base Layer) */}
          <div
            className="comp-card after-layer"
            style={{ backgroundColor: current.after.bg }}
          >
            <div className="comp-card-badge after-badge">
              <span className="dot gold" />
              <span>{current.after.label}</span>
            </div>

            <div className="comp-card-content">
              <span className="comp-sub-tag" style={{ color: current.after.accent }}>
                {current.after.badge}
              </span>
              <h3 className="comp-headline">{current.after.headline}</h3>
              <div className="comp-bullets">
                {current.after.sub.split('\n').map((line, idx) => (
                  <p key={idx} className="comp-line">{line}</p>
                ))}
              </div>
              <div className="comp-metric-pill" style={{ borderColor: current.after.accent }}>
                <span className="metric-text" style={{ color: current.after.accent }}>
                  {current.after.stat}
                </span>
              </div>
            </div>
          </div>

          {/* BEFORE CARD (Clipped Top Layer) */}
          <div
            className="comp-card before-layer"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              backgroundColor: current.before.bg,
            }}
          >
            <div className="comp-card-badge before-badge">
              <span className="dot red" />
              <span>{current.before.label}</span>
            </div>

            <div className="comp-card-content">
              <span className="comp-sub-tag" style={{ color: current.before.accent }}>
                {current.before.badge}
              </span>
              <h3 className="comp-headline">{current.before.headline}</h3>
              <div className="comp-bullets">
                {current.before.sub.split('\n').map((line, idx) => (
                  <p key={idx} className="comp-line muted">{line}</p>
                ))}
              </div>
              <div className="comp-metric-pill muted">
                <span className="metric-text">{current.before.stat}</span>
              </div>
            </div>
          </div>

          {/* DRAGGABLE DIVIDER HANDLE */}
          <div
            className="comp-slider-divider"
            style={{ left: `${sliderPos}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            tabIndex={0}
            role="slider"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Geser untuk membandingkan sebelum dan sesudah"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(5, p - 5));
              if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(95, p + 5));
            }}
          >
            <div className="divider-line" />
            <div className="divider-handle">
              <span className="handle-arrow">◀</span>
              <span className="handle-arrow">▶</span>
            </div>
          </div>
        </div>

        {/* Interactive Helper Text */}
        <div className="comp-footer-tip text-center">
          <span>💡 Geser lingkaran ke kiri atau kanan untuk melihat detail perbandingan</span>
        </div>
      </div>
    </section>
  );
}
