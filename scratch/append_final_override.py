final_css = """
/* =============================================================================
   REVISI FINAL: HIGH-CONTRAST READABILITY & TACTILE STUDIO CANVAS
   Semua warna nyaru dihilangkan, kontras 100% tajam, layout rapi & proporsional.
   ============================================================================= */

/* 1. Global Background & Color Variable Locks */
:root,
html,
body,
[data-theme="dark"],
[data-theme="light"] {
  --bg-base: #131417 !important;
  --bg-surface: #18191f !important;
  --bg-card: #18191f !important;
  --bg-card-hover: #22232c !important;
  --bg-glass: rgba(19, 20, 23, 0.94) !important;
  --bg-subtle: #1c1d24 !important;
  --bg-code: #1c1d24 !important;

  --space-dark: #131417 !important;
  --space-card: #18191f !important;
  --space-card-border: rgba(255, 255, 255, 0.12) !important;
  --space-card-hover: rgba(245, 158, 11, 0.45) !important;

  --color-accent-primary: #f59e0b !important;
  --color-accent-secondary: #10b981 !important;
  --supernova-gold: #f59e0b !important;
  --supernova-gold-hover: #fbbf24 !important;
  --supernova-gold-soft: rgba(245, 158, 11, 0.14) !important;
  --starlight-cyan: #10b981 !important;
  --starlight-cyan-soft: rgba(16, 185, 129, 0.14) !important;

  --text-primary: #faf8f2 !important;
  --text-secondary: #cbd5e1 !important;
  --text-muted: #94a3b8 !important;
  --text-main: #faf8f2 !important;
  --text-body: #cbd5e1 !important;
  --text-inverse: #131417 !important;

  --border-subtle: rgba(255, 255, 255, 0.1) !important;
  --border-focus: #f59e0b !important;
  --border-light: rgba(255, 255, 255, 0.16) !important;
}

html, body {
  background-color: #131417 !important;
  color: #faf8f2 !important;
  background-image: none !important;
  margin: 0;
  padding: 0;
}

.supernova-app,
.main-content-flow,
.page-home,
.page-services,
.page-service-detail,
.page-portfolio,
.page-case-study,
.page-digital-products,
.page-product-detail,
.page-pricing,
.page-about,
.page-contact,
.page-notfound,
.human-page-wrap,
section,
.section,
.hero-section,
.final-cta-section {
  background-color: #131417 !important;
}

/* 2. Absolute High-Contrast Headings & Body Typography */
h1, h2, h3, h4, h5, h6,
.hero-title,
.human-hero-title,
.section-heading-fraunces,
.service-card-title,
.project-title-fraunces,
.product-title-fraunces,
.cta-title,
.notfound-title-fraunces,
.case-study-title,
.case-block-heading,
.results-card-title,
.about-main-title,
.portfolio-main-title,
.digital-main-title,
.pricing-main-title,
.contact-main-title,
.service-detail-title,
.workbench-title,
.card-product-title a,
.card-project-title {
  color: #faf8f2 !important;
  font-family: 'Fraunces', Georgia, serif !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5) !important;
}

.headline-highlight,
.title-serif-accent,
.heading-italic,
.highlight-text,
.fs-item-index,
.receipt-num,
.service-number {
  color: #f59e0b !important;
}

/* Paragraphs & Descriptive Content - Never Washed Out */
p,
.hero-description,
.human-hero-desc,
.section-subtext,
.cta-desc,
.service-card-desc,
.project-brief-overview,
.card-product-desc,
.notfound-desc,
.case-block-text,
.service-detail-lead,
.portfolio-main-lead,
.digital-main-lead,
.pricing-main-lead,
.about-main-lead,
.contact-main-lead,
.manifesto-desc,
.deliverable-desc,
.package-ideal {
  color: #cbd5e1 !important;
  line-height: 1.65 !important;
}

/* 3. Handcrafted Stickers & Annotations */
.zine-sticker-tag,
.service-detail-meta-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: rgba(245, 158, 11, 0.16) !important;
  border: 1px solid rgba(245, 158, 11, 0.5) !important;
  border-radius: 2px !important;
  padding: 6px 14px !important;
  color: #fbbf24 !important;
  font-family: 'IBM Plex Mono', monospace !important;
  font-size: 0.8rem !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
}
.zine-sticker-text {
  color: #fbbf24 !important;
  font-weight: 600 !important;
}
.handwritten-annotation {
  font-family: 'Caveat', cursive, sans-serif !important;
  font-size: 1.35rem !important;
  color: #fbbf24 !important;
  margin: 6px 0 16px !important;
  display: inline-block !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4) !important;
}

/* Monospaced Technical Labels */
.section-index-tag,
.receipt-mono,
.project-index-num,
.specimen-mono,
.card-cat-label,
.card-category-tag,
.case-mono-meta,
.results-card-mono,
.price-label,
.workbench-mono,
.notfound-code-stamp,
.mono-count,
.fs-section-tag {
  color: #fbbf24 !important;
  font-family: 'IBM Plex Mono', monospace !important;
  font-weight: 600 !important;
  letter-spacing: 0.06em !important;
}

/* 4. Hero Section Spacing & Asymmetrical Stack */
.hero-section {
  padding-top: 135px !important;
  padding-bottom: 60px !important;
  background: #131417 !important;
}
.hero-container-stacked {
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 40px !important;
}
.hero-grid-split {
  display: grid !important;
  grid-template-columns: 1.15fr 0.85fr !important;
  gap: 40px !important;
  align-items: center !important;
}
.hero-content {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
}
.hero-title {
  font-size: clamp(2.2rem, 4.2vw, 3.4rem) !important;
  line-height: 1.18 !important;
  margin: 0 0 8px !important;
  letter-spacing: -0.025em !important;
}
.hero-description {
  font-size: 1.05rem !important;
  margin: 0 0 24px !important;
  max-width: 580px !important;
}
.hero-cta-group {
  display: flex !important;
  gap: 14px !important;
  flex-wrap: wrap !important;
}

/* Bottom Full-Width Guarantee Receipt */
.zine-guarantee-receipt {
  background: #18191f !important;
  border: 1px dashed rgba(255, 255, 255, 0.22) !important;
  border-radius: 2px !important;
  padding: 24px 28px !important;
  width: 100% !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
}
.receipt-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding-bottom: 12px !important;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.12) !important;
  margin-bottom: 18px !important;
}
.receipt-stamp {
  font-family: 'IBM Plex Mono', monospace !important;
  font-size: 0.7rem !important;
  font-weight: 700 !important;
  color: #10b981 !important;
  border: 1px solid #10b981 !important;
  padding: 3px 8px !important;
  border-radius: 2px !important;
}
.receipt-list-row {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 24px !important;
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
.receipt-col-item {
  display: flex !important;
  gap: 12px !important;
  align-items: flex-start !important;
}
.receipt-col-item strong {
  display: block !important;
  color: #faf8f2 !important;
  font-size: 0.95rem !important;
  margin-bottom: 4px !important;
}
.receipt-col-item p {
  color: #94a3b8 !important;
  font-size: 0.82rem !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

/* 5. Floating Navbar System */
.site-header-floating-wrap {
  position: fixed !important;
  top: 16px !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1000 !important;
  padding: 0 24px !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
.floating-navbar {
  max-width: 1180px !important;
  margin: 0 auto !important;
  height: 64px !important;
  background: rgba(19, 20, 23, 0.94) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 999px !important;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.6) !important;
  padding: 0 14px 0 22px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}
.brand-logo {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  text-decoration: none !important;
}
.brand-text {
  font-family: 'Fraunces', serif !important;
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  color: #faf8f2 !important;
  letter-spacing: 0.04em !important;
}
.brand-sub {
  color: #f59e0b !important;
  font-size: 0.72rem !important;
  letter-spacing: 0.12em !important;
  margin-left: 4px !important;
}
.floating-nav-links {
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
}
.floating-nav-link {
  color: #cbd5e1 !important;
  font-size: 0.88rem !important;
  font-weight: 500 !important;
  padding: 8px 16px !important;
  border-radius: 999px !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
}
.floating-nav-link:hover {
  color: #f59e0b !important;
  background: rgba(245, 158, 11, 0.1) !important;
}
.floating-nav-link.active {
  color: #f59e0b !important;
  background: rgba(245, 158, 11, 0.16) !important;
  font-weight: 600 !important;
}
.floating-cta-btn {
  background: #f59e0b !important;
  color: #131417 !important;
  font-size: 0.84rem !important;
  font-weight: 700 !important;
  padding: 9px 18px !important;
  border-radius: 999px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  transition: all 0.2s ease !important;
}
.floating-cta-btn:hover {
  background: #fbbf24 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3) !important;
}

/* 6. Inner Pages Header Spacing (Beneath Navbar) */
.service-detail-hero,
.portfolio-header-section,
.digital-header-section,
.pricing-header-section,
.about-header-section,
.contact-header-section,
.page-header-section {
  padding-top: 130px !important;
  padding-bottom: 40px !important;
  background: #131417 !important;
}

/* 7. Cards & Structural Elements on Matte Blackboard */
.service-editorial-card,
.curated-project-card,
.portfolio-zine-card,
.digital-product-card,
.deliverable-item-card,
.ppt-package-box,
.manifesto-card,
.workbench-card,
.case-results-card,
.case-block,
.notfound-card,
.hero-specimen-card,
.zine-speed-banner,
.zine-notice-card,
.portfolio-cta-strip {
  background: #18191f !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 2px !important;
}
.service-editorial-card:hover,
.curated-project-card:hover,
.portfolio-zine-card:hover,
.digital-product-card:hover {
  border-color: rgba(245, 158, 11, 0.4) !important;
}

/* 8. Tech Ribbon / Ticker */
.tech-ribbon,
.subtle-ticker-bar {
  background: #0d0e11 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}
.ticker-item,
.ribbon-track span {
  color: #94a3b8 !important;
}

/* 9. Buttons: Primary (WhatsApp Green) & Secondary (Amber/Outline) */
.btn-primary {
  background: #10b981 !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 999px !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25) !important;
}
.btn-primary:hover {
  background: #059669 !important;
  transform: translateY(-1px) !important;
}
.btn-secondary {
  background: rgba(255, 255, 255, 0.06) !important;
  color: #faf8f2 !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 999px !important;
  font-weight: 500 !important;
  padding: 12px 24px !important;
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: #f59e0b !important;
  color: #ffffff !important;
}
.btn-outline {
  border: 1px solid #f59e0b !important;
  color: #f59e0b !important;
  background: transparent !important;
  border-radius: 999px !important;
}
.btn-outline:hover {
  background: rgba(245, 158, 11, 0.12) !important;
  color: #fbbf24 !important;
}

/* 10. Responsive Breakpoints */
@media (max-width: 1024px) {
  .hero-grid-split {
    grid-template-columns: 1fr !important;
  }
  .receipt-list-row {
    grid-template-columns: 1fr !important;
  }
  .services-editorial-grid,
  .curated-projects-grid,
  .portfolio-cards-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .floating-navbar {
    height: 56px !important;
    padding: 0 10px 0 16px !important;
  }
  .floating-nav-links {
    display: none !important;
  }
  .floating-cta-btn {
    display: none !important;
  }
  .services-editorial-grid,
  .curated-projects-grid,
  .portfolio-cards-grid,
  .digital-products-grid {
    grid-template-columns: 1fr !important;
  }
  .hero-title {
    font-size: 2.1rem !important;
  }
}
"""

with open('src/index.css', 'a', encoding='utf-8') as f:
    f.write(final_css)

print("Final CSS appended successfully.")
