import React from 'react';
import { Link } from 'react-router-dom';
import ClientExperienceWidget from '../components/ClientExperienceWidget';
import TechRibbon from '../components/TechRibbon';
import ServiceCardsExpanded from '../components/ServiceCardsExpanded';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import VisualShowcaseGallery from '../components/VisualShowcaseGallery';
import PriceCalculator from '../components/PriceCalculator';
import NeedsQuiz from '../components/NeedsQuiz';
import DigitalProductsSection from '../components/DigitalProductsSection';
import InteractiveTimeline from '../components/InteractiveTimeline';
import AboutMinCham from '../components/AboutMinCham';
import DraggableTestimonials from '../components/DraggableTestimonials';
import StudioArcadeGame from '../components/StudioArcadeGame';
import FAQSearchable from '../components/FAQSearchable';
import { IconArrowRight, IconWhatsApp } from '../components/Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick } from '../utils/sound';

export default function HomePage({ onOpenProjectModal, onSelectPackage }) {
  const { contactInfo } = useSiteContent();

  const waUrl = `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${encodeURIComponent(
    'Halo Min Cham! Saya mau konsultasi santai untuk pembuatan proyek desain/digital.'
  )}`;

  return (
    <div className="page-home">
      {/* =========================================================================
          HERO SECTION: DIBUAT TANGAN, TEMA LUAR ANGKASA ELEGAN, TANPA GRADIENT AI
          ========================================================================= */}
      <section className="hero-section space-hero-stage" id="hero">
        <div className="container hero-container">
          <div className="hero-content">
            {/* Note-Style Badge Sticker */}
            <div className="hero-status-pill" style={{ '--rot': '-1.5deg' }}>
              <span className="status-indicator-dot" />
              <span className="status-pill-text">
                ✦ Studio Kreatif Independen &bull; Min Cham
              </span>
            </div>

            {/* Bold Headline with Emphasized Words */}
            <h1 className="hero-title human-hero-title">
              Bukan Template AI Pasaran.{' '}
              <span className="headline-highlight">Desain Presisi</span> yang Bikin Audiens Percaya.
            </h1>

            {/* Punchy, Non-Cliché Copywriting */}
            <p className="hero-description human-hero-desc">
              Slide PPT 40 halaman yang tadinya bikin dosen atau investor ngantuk, kami bedah jadi visual tajam yang meyakinkan.
              Website lambat kami sulap jadi mesin konversi kilat yang mengalir langsung ke WhatsApp Anda.
            </p>

            {/* CTA Group */}
            <div className="hero-cta-group">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                id="homeConsultBtn"
                onClick={() => playClick()}
                data-cursor="Chat"
              >
                <IconWhatsApp size={18} />
                <span>Diskusi Langsung via WhatsApp</span>
              </a>

              <a
                href="#kalkulator"
                className="btn btn-secondary btn-lg"
                id="homeCalcBtn"
                onClick={() => playClick()}
                data-cursor="Hitung"
              >
                <span>Hitung Estimasi Harga</span>
              </a>
            </div>

            {/* Handcrafted Note Badges */}
            <div className="hero-handcrafted-notes">
              <div className="note-item" style={{ '--rot': '-1deg' }}>
                <span className="note-check">✓</span>
                <span>100% Hak Milik Master File (.PPTX / Vektor / Source Code)</span>
              </div>
              <div className="note-item" style={{ '--rot': '1.2deg' }}>
                <span className="note-check">✓</span>
                <span>Bicara Langsung dengan Desainer (Tanpa Sales Perantara)</span>
              </div>
              <div className="note-item" style={{ '--rot': '-0.8deg' }}>
                <span className="note-check">✓</span>
                <span>Garansi Revisi Fleksibel Sampai Siap Presentasi</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Sandbox Preview */}
          <div className="hero-preview-wrapper">
            <ClientExperienceWidget onOpenProjectModal={onOpenProjectModal} />
          </div>
        </div>
      </section>

      {/* SUBTLE TICKER BAR */}
      <TechRibbon />

      {/* 01. LAYANAN UTAMA (EXPANDABLE 3D TILT CARDS) */}
      <ServiceCardsExpanded onSelectPackage={onSelectPackage} />

      {/* 02. BUKTI NYATA BEFORE / AFTER (DRAGGABLE SLIDER) */}
      <BeforeAfterSlider />

      {/* 03. PORTOFOLIO & KARYA TERPILIH */}
      <VisualShowcaseGallery onOpenProjectModal={onOpenProjectModal} />

      {/* 04. KALKULATOR ESTIMASI REALTIME (RP + KIRIM WA) */}
      <PriceCalculator />

      {/* 05. MINI QUIZ "KAMU BUTUH APA?" */}
      <NeedsQuiz />

      {/* 06. PRODUK DIGITAL & TEMPLATE SIAP PAKAI */}
      <DigitalProductsSection />

      {/* 07. ALUR KERJA INTERAKTIF (TIMELINE 4 TAHAP) */}
      <InteractiveTimeline />

      {/* 08. TENTANG MIN CHAM & MANIFESTO STUDIO */}
      <AboutMinCham />

      {/* 09. ULASAN & TESTIMONI KLIEN (DRAGGABLE SLIDER) */}
      <DraggableTestimonials />

      {/* 10. MINI GAME SANTAI (SHIP IT PAST THE BUGS) */}
      <StudioArcadeGame />

      {/* 11. FAQ SEARCHABLE & ACCORDION */}
      <FAQSearchable />

      {/* 12. CALL TO ACTION BANNER FINAL */}
      <section className="section final-cta-section">
        <div className="container">
          <div className="final-cta-card">
            <div className="cta-note-badge">09 &bull; MARI MULAI KERJA SAMA</div>
            <h2 className="cta-title">
              Punya Deadline Mendesak atau <span className="highlight-text">Ide yang Ingin Diwujudkan?</span>
            </h2>
            <p className="cta-desc">
              Kirimkan draft atau materi mentahan Anda ke WhatsApp Min Cham. Kami akan bedah alur visualnya secara gratis sebelum Anda memutuskan untuk bekerja sama.
            </p>

            <div className="cta-actions-group">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                onClick={() => playClick()}
                data-cursor="Chat"
              >
                <IconWhatsApp size={18} />
                <span>Chat Min Cham via WhatsApp</span>
              </a>

              <Link
                to="/catalog"
                className="btn btn-secondary btn-lg"
                onClick={() => playClick()}
              >
                <span>Lihat Portofolio Karya</span>
                <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
