import React, { useState } from 'react';
import { IconArrowRight, IconCheck, IconShield } from './Icons';
import { playClick, playPop } from '../utils/sound';

export default function ClientExperienceWidget({ onOpenProjectModal }) {
  const [activeTab, setActiveTab] = useState('presentation'); // 'presentation' | 'web' | 'brand' | 'packaging'
  
  // Slide Deck Interactive State
  const [activeSlide, setActiveSlide] = useState(0);
  const [aspectMode, setAspectMode] = useState('16:9'); // '16:9' | '4:3'

  // Web Interactive State
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'mobile'
  const [webLiked, setWebLiked] = useState(false);

  // Brand Interactive State
  const [activeTheme, setActiveTheme] = useState('gold'); // 'gold' | 'slate' | 'ivory' | 'teal'
  const [showGrid, setShowGrid] = useState(false);

  // Packaging Interactive State
  const [finishMode, setFinishMode] = useState('gold-foil'); // 'gold-foil' | 'matte' | 'emboss'
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 });

  const handleTabChange = (tab) => {
    playPop();
    setActiveTab(tab);
  };

  const handleMouseMove3D = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardRotate({
      x: -(y / rect.height) * 20,
      y: (x / rect.width) * 20,
    });
  };

  const handleMouseLeave3D = () => {
    setCardRotate({ x: 0, y: 0 });
  };

  const deckSlides = [
    {
      num: '01',
      tag: 'MARKET PROBLEM',
      headline: 'Solusi Konvensional Terlalu Lambat & Terfragmentasi',
      subtext: 'Founder membuang 40+ jam kerja menyusun slide tanpa narasi visual yang menjual.',
      stat: '42%',
      statLabel: 'Penolakan investor karena slide kurang meyakinkan',
      badge: 'Data-Driven Narrative',
    },
    {
      num: '02',
      tag: 'OUR SOLUTION',
      headline: 'Pitch Deck Standar Tier-1 Silicon Valley & Korporasi',
      subtext: 'Slide dirancang dengan hierarki visual presisi, siap memikat impresi 30 detik pertama.',
      stat: '$1.8M',
      statLabel: 'Total pendanaan yang berhasil diraih klien Supernova',
      badge: 'Investor Pitch Ready',
    },
    {
      num: '03',
      tag: 'TRACTION & METRICS',
      headline: 'Pertumbuhan Eksponensial 240% Year-over-Year',
      subtext: 'Infografik kompleks kami sederhanakan menjadi grafik visual yang langsung dipahami audiens.',
      stat: '98.4%',
      statLabel: 'Tingkat kepuasan & keberhasilan lolos tender',
      badge: 'Verified Track Record',
    },
    {
      num: '04',
      tag: 'ROADMAP 2027',
      headline: 'Target Ekspansi Pasar & Profitabilitas Terukur',
      subtext: 'Format Master .PPTX 100% editable, bisa Anda modifikasi sewaktu-waktu tanpa batas.',
      stat: '100%',
      statLabel: 'Master file milik Anda seutuhnya (.PPTX & Keynote)',
      badge: 'Full Source Files',
    },
  ];

  const brandThemes = {
    gold: {
      bg: '#0f172a',
      accent: '#dfbe76',
      cardBg: '#1e293b',
      text: '#ffffff',
      name: 'Midnight Gold',
    },
    slate: {
      bg: '#1e293b',
      accent: '#38bdf8',
      cardBg: '#0f172a',
      text: '#f8fafc',
      name: 'Cyber Slate',
    },
    ivory: {
      bg: '#faf9f6',
      accent: '#b8933b',
      cardBg: '#ffffff',
      text: '#0f172a',
      name: 'Editorial Ivory',
    },
    teal: {
      bg: '#042f2e',
      accent: '#2dd4bf',
      cardBg: '#115e59',
      text: '#f0fdfa',
      name: 'Nordic Teal',
    },
  };

  const currentThemeObj = brandThemes[activeTheme];

  return (
    <div className="hero-interactive-stage interactive-sandbox-widget">
      {/* Floating Studio Quality Chip */}
      <div className="stage-floating-chip top-right interactive-chip">
        <IconShield size={13} color="#dfbe76" />
        <span>100% Master File Diberikan</span>
      </div>

      {/* Main Sandbox Frame */}
      <div className="stage-device-frame sandbox-frame">
        {/* Top OS Window Header */}
        <div className="frame-os-bar">
          <div className="os-traffic-lights">
            <span className="light red" />
            <span className="light yellow" />
            <span className="light green" />
          </div>

          {/* Interactive Mode Badge */}
          <div className="frame-meta-pill sandbox-meta-pill">
            <span className="meta-icon">
              {activeTab === 'presentation' && '📊'}
              {activeTab === 'web' && '🌐'}
              {activeTab === 'brand' && '✦'}
              {activeTab === 'packaging' && '📦'}
            </span>
            <span className="meta-text">
              {activeTab === 'presentation' && 'Live Slide Deck Preview (.PPTX)'}
              {activeTab === 'web' && 'supernovastudio.design/live-demo'}
              {activeTab === 'brand' && 'Vector Brand System & Swatches'}
              {activeTab === 'packaging' && '3D Physics Tilt & Print Finishing'}
            </span>
          </div>

          {/* Live Interactive Tag */}
          <div className="sandbox-live-badge">
            <span className="live-pulse-dot" />
            <span>INTERACTIVE PLAYGROUND</span>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="sandbox-mode-tabs">
          <button
            type="button"
            className={`sandbox-tab-btn ${activeTab === 'presentation' ? 'active' : ''}`}
            onClick={() => handleTabChange('presentation')}
          >
            <span>📊 Slide Deck (PPT)</span>
          </button>
          <button
            type="button"
            className={`sandbox-tab-btn ${activeTab === 'web' ? 'active' : ''}`}
            onClick={() => handleTabChange('web')}
          >
            <span>🌐 Website &amp; UI</span>
          </button>
          <button
            type="button"
            className={`sandbox-tab-btn ${activeTab === 'brand' ? 'active' : ''}`}
            onClick={() => handleTabChange('brand')}
          >
            <span>✦ Brand Identity</span>
          </button>
          <button
            type="button"
            className={`sandbox-tab-btn ${activeTab === 'packaging' ? 'active' : ''}`}
            onClick={() => handleTabChange('packaging')}
          >
            <span>📦 3D Packaging</span>
          </button>
        </div>

        {/* Dynamic Sandbox Canvas */}
        <div className="sandbox-viewport">
          {/* ================= MODE 1: PITCH DECK SLIDE STUDIO ================= */}
          {activeTab === 'presentation' && (
            <div className="sandbox-slide-deck">
              {/* Aspect Ratio & Format Controls */}
              <div className="slide-deck-controls">
                <span className="control-label">ASPEK RATIO:</span>
                <button
                  type="button"
                  className={`deck-pill-btn ${aspectMode === '16:9' ? 'active' : ''}`}
                  onClick={() => {
                    playClick();
                    setAspectMode('16:9');
                  }}
                >
                  16:9 Widescreen (HD)
                </button>
                <button
                  type="button"
                  className={`deck-pill-btn ${aspectMode === '4:3' ? 'active' : ''}`}
                  onClick={() => {
                    playClick();
                    setAspectMode('4:3');
                  }}
                >
                  4:3 iPad / Print
                </button>
              </div>

              {/* Live Slide Screen */}
              <div className={`slide-canvas-screen aspect-${aspectMode.replace(':', '-')}`}>
                <div className="slide-inner-content">
                  <div className="slide-top-row">
                    <span className="slide-tag-pill">{deckSlides[activeSlide].tag}</span>
                    <span className="slide-page-num">
                      SLIDE {deckSlides[activeSlide].num} / 04 • EDITABLE PPTX
                    </span>
                  </div>

                  <h3 className="slide-headline">{deckSlides[activeSlide].headline}</h3>
                  <p className="slide-subtext">{deckSlides[activeSlide].subtext}</p>

                  <div className="slide-metric-card">
                    <div className="metric-num-col">
                      <span className="metric-big-num">{deckSlides[activeSlide].stat}</span>
                      <span className="metric-sub-label">{deckSlides[activeSlide].statLabel}</span>
                    </div>
                    <div className="metric-badge-col">
                      <span className="metric-verified-chip">
                        <IconCheck size={12} color="#dfbe76" />
                        <span>{deckSlides[activeSlide].badge}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clickable Slide Selector Thumbnails */}
              <div className="slide-thumbnail-nav">
                <span className="thumb-nav-title">Pilih Slide untuk Uji Tampilan:</span>
                <div className="thumb-buttons-row">
                  {deckSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`slide-thumb-btn ${activeSlide === idx ? 'active' : ''}`}
                      onClick={() => {
                        playClick();
                        setActiveSlide(idx);
                      }}
                    >
                      <span className="thumb-idx">{slide.num}</span>
                      <span className="thumb-label">{slide.tag.replace('MARKET ', '')}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= MODE 2: WEB EXPERIENCE ================= */}
          {activeTab === 'web' && (
            <div className="sandbox-web-experience">
              <div className="web-viewport-bar">
                <div className="viewport-toggle-buttons">
                  <button
                    type="button"
                    className={`device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setDeviceView('desktop');
                    }}
                  >
                    💻 Desktop (1440px)
                  </button>
                  <button
                    type="button"
                    className={`device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setDeviceView('mobile');
                    }}
                  >
                    📱 Mobile (390px)
                  </button>
                </div>

                <div className="web-status-speed">
                  <span className="speed-pill">⚡ Speed: 0.3s (Lighthouse 99)</span>
                </div>
              </div>

              {/* Device Frame */}
              <div className={`web-device-holder ${deviceView}`}>
                <div className="simulated-web-screen">
                  <div className="sim-nav">
                    <strong className="sim-logo">ARCHITEKTON.</strong>
                    <div className="sim-nav-links">
                      <span>Works</span>
                      <span>Philosophy</span>
                      <span>Studio</span>
                    </div>
                  </div>

                  <div className="sim-hero">
                    <span className="sim-pill">ARCHITECTURE &amp; SPATIAL</span>
                    <h4>Crafting Spaces Beyond Contemporary Form</h4>
                    <p>Minimalist structural design for luxury residential and corporate headquarters.</p>
                    <div className="sim-btn-row">
                      <button
                        type="button"
                        className={`sim-cta-btn ${webLiked ? 'liked' : ''}`}
                        onClick={() => {
                          playClick();
                          setWebLiked(!webLiked);
                        }}
                      >
                        {webLiked ? '❤️ Disimpan ke Favorit' : '✨ Klik untuk Test Interaksi'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODE 3: BRAND IDENTITY ================= */}
          {activeTab === 'brand' && (
            <div className="sandbox-brand-experience">
              <div className="brand-controls-bar">
                <span className="brand-control-label">PILIH PALET WARNA BRAND:</span>
                <div className="color-swatches-row">
                  {Object.keys(brandThemes).map((key) => {
                    const theme = brandThemes[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`color-swatch-btn ${activeTheme === key ? 'active' : ''}`}
                        onClick={() => {
                          playClick();
                          setActiveTheme(key);
                        }}
                        title={theme.name}
                      >
                        <span
                          className="swatch-circle"
                          style={{ background: theme.accent, border: `2px solid ${theme.cardBg}` }}
                        />
                        <span className="swatch-label">{theme.name}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className={`grid-toggle-btn ${showGrid ? 'active' : ''}`}
                  onClick={() => {
                    playClick();
                    setShowGrid(!showGrid);
                  }}
                >
                  {showGrid ? 'Grid Vektor: ON' : 'Grid Vektor: OFF'}
                </button>
              </div>

              {/* Dynamic Brand Kit Display */}
              <div
                className={`brand-display-card ${showGrid ? 'show-vector-grid' : ''}`}
                style={{
                  backgroundColor: currentThemeObj.bg,
                  color: currentThemeObj.text,
                }}
              >
                <div className="brand-symbol-box" style={{ borderColor: currentThemeObj.accent }}>
                  <div
                    className="brand-symbol-icon"
                    style={{ color: currentThemeObj.accent }}
                  >
                    ✦
                  </div>
                  <strong className="brand-name" style={{ color: currentThemeObj.text }}>
                    VALKYRIE APPAREL
                  </strong>
                  <span className="brand-tagline" style={{ color: currentThemeObj.accent }}>
                    HAUTE COUTURE &amp; BESPOKE APPAREL
                  </span>
                </div>

                <div className="brand-specs-grid">
                  <div
                    className="brand-spec-box"
                    style={{ backgroundColor: currentThemeObj.cardBg }}
                  >
                    <span className="spec-title">PRIMARY FONT</span>
                    <strong className="spec-val">Plus Jakarta Sans</strong>
                  </div>
                  <div
                    className="brand-spec-box"
                    style={{ backgroundColor: currentThemeObj.cardBg }}
                  >
                    <span className="spec-title">HEX CODE</span>
                    <strong className="spec-val" style={{ color: currentThemeObj.accent }}>
                      {currentThemeObj.accent.toUpperCase()}
                    </strong>
                  </div>
                  <div
                    className="brand-spec-box"
                    style={{ backgroundColor: currentThemeObj.cardBg }}
                  >
                    <span className="spec-title">FORMATS</span>
                    <strong className="spec-val">SVG • AI • EPS • PNG</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODE 4: 3D PACKAGING TILT ================= */}
          {activeTab === 'packaging' && (
            <div className="sandbox-packaging-experience">
              <div className="packaging-controls-bar">
                <span className="control-label">FINISHING CETAK:</span>
                <div className="finish-pill-group">
                  <button
                    type="button"
                    className={`finish-pill ${finishMode === 'gold-foil' ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setFinishMode('gold-foil');
                    }}
                  >
                    ✨ Hot Stamping Gold Foil
                  </button>
                  <button
                    type="button"
                    className={`finish-pill ${finishMode === 'matte' ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setFinishMode('matte');
                    }}
                  >
                    🌑 Soft-Touch Velvet Doff
                  </button>
                  <button
                    type="button"
                    className={`finish-pill ${finishMode === 'emboss' ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setFinishMode('emboss');
                    }}
                  >
                    🏛 3D Emboss &amp; Deboss
                  </button>
                </div>
              </div>

              {/* 3D Tilt Stage */}
              <div
                className="packaging-3d-stage"
                onMouseMove={handleMouseMove3D}
                onMouseLeave={handleMouseLeave3D}
              >
                <div
                  className={`packaging-card-3d ${finishMode}`}
                  style={{
                    transform: `perspective(900px) rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg)`,
                  }}
                >
                  <div className="card-glare-overlay" />
                  <div className="pkg-header">
                    <span className="pkg-seal">ORIGIN CERTIFIED</span>
                    <span className="pkg-weight">250g / 8.8oz</span>
                  </div>

                  <div className="pkg-body">
                    <div className="pkg-brand-logo">AURA</div>
                    <div className="pkg-sub">ARTISAN ROASTERY</div>
                    <p className="pkg-desc">
                      Single Origin Specialty Coffee • Anaerobic Natural Process
                    </p>
                  </div>

                  <div className="pkg-footer">
                    <span className="pkg-finish-badge">
                      {finishMode === 'gold-foil' && '✦ Gold Foil Hot Stamp Stamped'}
                      {finishMode === 'matte' && '● Soft Touch Velvet Matte'}
                      {finishMode === 'emboss' && '▲ Raised Tactile Embossed'}
                    </span>
                    <span className="pkg-tip">Arahkan kursor untuk efek 3D tilt</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Specs & Action Footer */}
        <div className="sandbox-footer">
          <div className="sandbox-specs-list">
            <span className="sandbox-spec-chip">
              <IconCheck size={12} color="#dfbe76" />
              <span>Editable Master File</span>
            </span>
            <span className="sandbox-spec-chip">
              <IconCheck size={12} color="#dfbe76" />
              <span>Garansi Revisi Fleksibel</span>
            </span>
            <span className="sandbox-spec-chip">
              <IconCheck size={12} color="#dfbe76" />
              <span>Pengerjaan Cepat 48 Jam</span>
            </span>
          </div>

          <button
            type="button"
            className="sandbox-cta-link"
            onClick={() => {
              playClick();
              if (onOpenProjectModal) {
                onOpenProjectModal({
                  id: 'interactive-studio',
                  title: 'Konsultasi Solusi Kustom Supernova',
                  category: 'UNIVERSAL STUDIO SOLUTION',
                });
              } else {
                window.location.href = '/contact';
              }
            }}
          >
            <span>Bahas Proyek Serupa</span>
            <IconArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Floating Live Status Chip */}
      <div className="stage-floating-chip bottom-left interactive-chip">
        <span className="live-pulse-dot" />
        <span>Respon Cepat &lt; 30 Menit di Jam Kerja</span>
      </div>
    </div>
  );
}
