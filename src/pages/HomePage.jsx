import React from 'react';
import { Link } from 'react-router-dom';
import ClientExperienceWidget from '../components/ClientExperienceWidget';
import TechRibbon from '../components/TechRibbon';
import VisualShowcaseGallery from '../components/VisualShowcaseGallery';
import StudioBentoGrid from '../components/StudioBentoGrid';
import Calculator from '../components/Calculator';
import StudioArcadeGame from '../components/StudioArcadeGame';
import ThreeStepEasyFlow from '../components/ThreeStepEasyFlow';
import Pricing from '../components/Pricing';
import StudioFloatingDock from '../components/StudioFloatingDock';
import { IconArrowRight } from '../components/Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick } from '../utils/sound';

export default function HomePage({ onOpenProjectModal, onSelectPackage }) {
  const { heroContent, testimonials, ctaContent } = useSiteContent();

  return (
    <div className="page-home">
      {/* 1. HERO SECTION: DYNAMIC, INTERACTIVE & CONFIDENT */}
      <section className="hero-section minimal-hero studio-hero-stage">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="status-indicator-dot" />
              <span className="status-pill-text">
                {heroContent?.badge || '✦ Universal Studio • PPT • Branding • Web'}
              </span>
            </div>

            <h1 className="hero-title interactive-hero-title" style={{ whiteSpace: 'pre-line' }}>
              {heroContent?.title || 'Desain Presisi Tinggi untuk Memikat Klien & Investor.'}
            </h1>

            <p className="hero-description minimal-hero-desc">
              {heroContent?.desc ||
                'Kami merancang slide presentasi (PPT) berkelas, identitas visual brand, dan website modern berkinerja tinggi. 100% master file milik Anda seutuhnya.'}
            </p>

            <div className="hero-cta-group">
              <Link
                to="/contact"
                className="btn btn-primary btn-lg"
                id="homeConsultBtn"
                onClick={() => playClick()}
              >
                <span>Mulai Konsultasi Proyek</span>
                <IconArrowRight size={16} />
              </Link>
              <Link
                to="/catalog"
                className="btn btn-secondary btn-lg"
                id="homeWorksBtn"
                onClick={() => playClick()}
              >
                <span>Jelajahi Portofolio</span>
              </Link>
            </div>

            {/* Interactive Key Value Stickers */}
            <div className="hero-stats-row minimal-hero-stats">
              <div className="stat-pill-item interactive-sticker-stat" style={{ '--rot': '-1deg' }}>
                <span className="stat-pill-num">{heroContent?.stat1 || '100% Hak Milik Master File'}</span>
              </div>
              <div className="stat-pill-divider" />
              <div className="stat-pill-item interactive-sticker-stat" style={{ '--rot': '1.5deg' }}>
                <span className="stat-pill-num">{heroContent?.stat2 || 'Pengerjaan Cepat 48 Jam'}</span>
              </div>
              <div className="stat-pill-divider" />
              <div className="stat-pill-item interactive-sticker-stat" style={{ '--rot': '-1deg' }}>
                <span className="stat-pill-num">{heroContent?.stat3 || 'Konsultasi Gratis via WA'}</span>
              </div>
            </div>
          </div>

          <div className="hero-preview-wrapper minimal-hero-widget">
            <ClientExperienceWidget onOpenProjectModal={onOpenProjectModal} />
          </div>
        </div>
      </section>

      {/* TECH TICKER / MARQUEE */}
      <TechRibbon />

      {/* 2. SELECTED WORKS (PORTFOLIO GALLERY) */}
      <VisualShowcaseGallery onOpenProjectModal={onOpenProjectModal} />

      {/* 3. STUDIO STANDARDS & SPOTLIGHT BENTO GRID */}
      <StudioBentoGrid />

      {/* 4. INTERACTIVE SIMULATOR (SCOPE & TIMELINE CALCULATOR) */}
      <div className="homepage-calculator-wrapper">
        <Calculator />
      </div>

      {/* 5. INTERACTIVE ARCADE MINI-GAME (VOYNANN-INSPIRED BREAK) */}
      <StudioArcadeGame />

      {/* 6. CAPABILITIES & SERVICES OVERVIEW */}
      <Pricing onSelectPackage={onSelectPackage} />

      {/* 7. HOW WE WORK (3 CLEAN STEPS) */}
      <ThreeStepEasyFlow />

      {/* 8. TESTIMONIALS (EDITORIAL SOCIAL PROOF) */}
      <section className="section testimonials-section minimal-testi-section">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: 36 }}>
            <span className="section-tag">TESTIMONIALS</span>
            <h2 className="section-title">Kata Founder &amp; Direktur Klien Kami</h2>
            <p className="section-subtitle">
              Hasil nyata yang telah kami buktikan bersama founder startup dan korporasi terkemuka.
            </p>
          </div>

          <div className="testimonials-grid editorial-grid">
            {(testimonials || []).map((t, idx) => (
              <div
                key={t.id || idx}
                className={`testi-card editorial-testi ${t.featured ? 'featured-testi' : ''}`}
              >
                <div className="testi-star-rating">★★★★★</div>
                <p className="testi-quote">"{t.quote}"</p>
                <div className="testi-author">
                  <div className="testi-avatar-pill">
                    {t.avatar || (t.name ? t.name.charAt(0) : 'K')}
                  </div>
                  <div>
                    <strong className="testi-name">{t.name}</strong>
                    <span className="testi-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION BANNER */}
      <section className="section cta-banner-section minimal-cta-section">
        <div className="container">
          <div className="cta-banner-card minimal-cta-card">
            <div className="cta-banner-content">
              <span className="cta-banner-tag">{ctaContent?.tag || "LET'S TALK"}</span>
              <h2>{ctaContent?.title || 'Punya Ide atau Proyek yang Ingin Diwujudkan?'}</h2>
              <p>
                {ctaContent?.desc ||
                  'Ceritakan kebutuhan Anda — baik slide presentasi (PPT), identitas brand, maupun website modern.'}
              </p>
              <div className="cta-banner-actions">
                <Link
                  to="/contact"
                  className="btn btn-primary btn-lg"
                  onClick={() => playClick()}
                >
                  <span>{ctaContent?.btnText || 'Mulai Diskusi via WhatsApp'}</span>
                  <IconArrowRight size={16} />
                </Link>
                <Link
                  to="/catalog"
                  className="btn btn-secondary btn-lg"
                  onClick={() => playClick()}
                >
                  <span>Lihat Portofolio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING DYNAMIC DOCK (QUICK ACTIONS, SOUND TOGGLE, WA) */}
      <StudioFloatingDock />
    </div>
  );
}
