import React from 'react';
import { Link } from 'react-router-dom';
import ClientExperienceWidget from '../components/ClientExperienceWidget';
import TechRibbon from '../components/TechRibbon';
import VisualShowcaseGallery from '../components/VisualShowcaseGallery';
import ThreeStepEasyFlow from '../components/ThreeStepEasyFlow';
import Pricing from '../components/Pricing';
import { IconArrowRight } from '../components/Icons';
import { useSiteContent } from '../context/ContentContext';

export default function HomePage({ onOpenProjectModal, onSelectPackage }) {
  const { heroContent } = useSiteContent();

  return (
    <div className="page-home">
      {/* 1. HERO SECTION: VISUAL, CONFIDENT & MINIMAL */}
      <section className="hero-section minimal-hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="status-indicator-dot" />
              <span className="status-pill-text">
                {heroContent.badge}
              </span>
            </div>

            <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
              {heroContent.title}
            </h1>

            <p className="hero-description minimal-hero-desc">
              {heroContent.desc}
            </p>

            <div className="hero-cta-group">
              <Link to="/contact" className="btn btn-primary btn-lg" id="homeConsultBtn">
                <span>Mulai Proyek</span>
                <IconArrowRight size={16} />
              </Link>
              <Link to="/catalog" className="btn btn-secondary btn-lg" id="homeWorksBtn">
                <span>Lihat Karya</span>
              </Link>
            </div>

            {/* Clean Minimal Stat Strip */}
            <div className="hero-minimal-stats">
              <span className="stat-pill-item">{heroContent.stat1}</span>
              <span className="stat-bullet">&bull;</span>
              <span className="stat-pill-item">{heroContent.stat2}</span>
              <span className="stat-bullet">&bull;</span>
              <span className="stat-pill-item">{heroContent.stat3}</span>
            </div>
          </div>

          {/* Interactive Minimalist Hero Showcase Card */}
          <div className="hero-preview-wrapper">
            <ClientExperienceWidget />
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <TechRibbon />

      {/* 2. SELECTED WORKS (IMAGE-LED SHOWCASE) */}
      <VisualShowcaseGallery onOpenProjectModal={onOpenProjectModal} />

      {/* 3. CAPABILITIES & SCOPE */}
      <Pricing onSelectPackage={onSelectPackage} />

      {/* 4. HOW WE WORK (3 CLEAN STEPS) */}
      <ThreeStepEasyFlow />

      {/* 5. TESTIMONIALS (CLEAN & SHORT) */}
      <section className="section testimonials-section minimal-testi-section">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: 36 }}>
            <span className="section-tag">TESTIMONIALS</span>
            <h2 className="section-title">Kata Klien Kami</h2>
          </div>

          <div className="testimonials-grid editorial-grid">
            <div className="testi-card editorial-testi">
              <p className="testi-quote">
                "Supernova merestrukturisasi narasi pitch deck kami dari awal. Alur ceritanya to-the-point dan kami sukses mengamankan seed funding sesuai target."
              </p>
              <div className="testi-author">
                <div className="testi-avatar-pill">R</div>
                <div>
                  <strong className="testi-name">Reza Pratama</strong>
                  <span className="testi-role">Co-Founder, Nexus Fintech</span>
                </div>
              </div>
            </div>

            <div className="testi-card editorial-testi featured-testi">
              <p className="testi-quote">
                "Website dan company profile resmi kami sangat prestisius. Mitra korporat dan panitia tender B2B langsung menaruh rasa percaya tinggi."
              </p>
              <div className="testi-author">
                <div className="testi-avatar-pill">H</div>
                <div>
                  <strong className="testi-name">Hendrawan Kusuma</strong>
                  <span className="testi-role">Managing Director, Holding Bisnis</span>
                </div>
              </div>
            </div>

            <div className="testi-card editorial-testi">
              <p className="testi-quote">
                "Standar estetika visual mereka sangat tinggi. Master file yang diserahkan rapi, dan template Canva-nya mudah dipakai tim kami."
              </p>
              <div className="testi-author">
                <div className="testi-avatar-pill">D</div>
                <div>
                  <strong className="testi-name">Diana Stephanie</strong>
                  <span className="testi-role">Brand Lead, Amarta Luxe Bali</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="section cta-banner-section minimal-cta-section">
        <div className="container">
          <div className="cta-banner-card minimal-cta-card">
            <div className="cta-banner-content">
              <span className="cta-banner-tag">LET'S TALK</span>
              <h2>Punya Ide atau Proyek yang Ingin Diwujudkan?</h2>
              <p>
                Ceritakan kebutuhan Anda — baik slide presentasi (PPT), identitas brand, maupun website modern.
              </p>
              <div className="cta-banner-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <span>Mulai Diskusi via WhatsApp</span>
                  <IconArrowRight size={16} />
                </Link>
                <Link to="/catalog" className="btn btn-secondary btn-lg">
                  <span>Lihat Portofolio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
