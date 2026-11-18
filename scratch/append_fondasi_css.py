fondasi_css = """
/* =============================================================================
   FONDASI FINAL: DESIGN TOKENS, BROWSER FIXES & ANTI-AI PURGE
   ============================================================================= */

/* 1. Global Reset & Tokens */
:root {
  --radius-box: 2px !important;
  --radius-pill: 999px !important;
  --color-base: #121316 !important;
  --color-card: #18191f !important;
  --color-border: rgba(255, 255, 255, 0.12) !important;
  --color-accent: #f59e0b !important;
  --color-text-main: #faf8f2 !important;
  --color-text-sub: #cbd5e1 !important;
  --color-text-muted: #94a3b8 !important;
}

/* Matikan Semua Animasi Infinite Berulang */
*, *::before, *::after {
  animation-iteration-count: 1 !important;
}
.supernova-signature-dot,
.wordmark-dot {
  animation: none !important;
}

/* 2. Navbar Baru: Wordmark Teks & Anti-Patah Baris */
.brand-wordmark-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  text-decoration: none !important;
  white-space: nowrap !important;
}
.wordmark-main {
  font-family: 'Bricolage Grotesque', sans-serif !important;
  font-size: 1.25rem !important;
  font-weight: 800 !important;
  color: #faf8f2 !important;
  letter-spacing: -0.02em !important;
}
.wordmark-dot {
  width: 7px !important;
  height: 7px !important;
  border-radius: 999px !important;
  background-color: #f59e0b !important;
  display: inline-block !important;
}
.logo-coin-wrapper,
.brand-logo-img,
.footer-coin-wrapper,
.footer-logo-img {
  display: none !important;
}

.floating-nav-links {
  display: flex !important;
  align-items: center !important;
  gap: 2px !important;
  white-space: nowrap !important;
}
.floating-nav-link {
  white-space: nowrap !important;
  padding: 8px 14px !important;
  font-size: 0.88rem !important;
}
.nav-label-text {
  white-space: nowrap !important;
}
.floating-cta-btn {
  white-space: nowrap !important;
  padding: 8px 16px !important;
  font-size: 0.84rem !important;
}

/* 3. Perbaikan Form Pencarian & Tombol Filter Portofolio (Anti-Browser Default) */
.portfolio-filter-toolbar {
  display: flex !important;
  flex-direction: column !important;
  gap: 18px !important;
  margin-bottom: 24px !important;
}

.portfolio-search-box {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  background: #18191f !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 2px !important;
  padding: 12px 16px !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}
.portfolio-search-box:focus-within {
  border-color: #f59e0b !important;
  box-shadow: 0 0 0 1px #f59e0b !important;
}
.portfolio-search-input {
  flex: 1 !important;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  color: #faf8f2 !important;
  font-family: 'Hanken Grotesk', sans-serif !important;
  font-size: 0.95rem !important;
  line-height: 1.4 !important;
}
.portfolio-search-input::placeholder {
  color: #64748b !important;
}
.clear-search-btn {
  background: rgba(255, 255, 255, 0.08) !important;
  border: none !important;
  color: #94a3b8 !important;
  width: 26px !important;
  height: 26px !important;
  border-radius: 999px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
}
.clear-search-btn:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  color: #ffffff !important;
}

.portfolio-tabs-row {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  flex-wrap: wrap !important;
}
.zine-filter-tab {
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 999px !important;
  color: #cbd5e1 !important;
  font-family: 'Hanken Grotesk', sans-serif !important;
  font-size: 0.86rem !important;
  font-weight: 500 !important;
  padding: 8px 18px !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  outline: none !important;
}
.zine-filter-tab:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
}
.zine-filter-tab:focus-visible {
  box-shadow: 0 0 0 2px #f59e0b !important;
}
.zine-filter-tab.is-active {
  background: #f59e0b !important;
  border-color: #f59e0b !important;
  color: #121316 !important;
  font-weight: 700 !important;
}

.portfolio-results-info {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 8px 0 16px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  margin-bottom: 24px !important;
}
.mono-count {
  font-family: 'IBM Plex Mono', monospace !important;
  font-size: 0.72rem !important;
  color: #94a3b8 !important;
  letter-spacing: 0.06em !important;
}

/* 4. Perbaikan Ruang Kosong Besar di Bawah Hero Portofolio & Produk Digital */
.site-breadcrumb {
  padding: 100px 0 12px !important;
}
.portfolio-header-section,
.digital-header-section,
.pricing-header-section,
.about-header-section,
.contact-header-section,
.service-detail-hero {
  padding-top: 10px !important;
  padding-bottom: 24px !important;
  min-height: auto !important;
}
.portfolio-controls-section,
.digital-catalog-section {
  padding-top: 0 !important;
}
.portfolio-header-content,
.digital-header-content {
  margin-bottom: 16px !important;
}
.portfolio-main-title,
.digital-main-title {
  margin: 8px 0 10px !important;
}
.portfolio-main-lead,
.digital-main-lead {
  margin-bottom: 0 !important;
}

/* 5. Hilangkan Badge Pill Miring (Gaya AI) */
.zine-sticker-tag,
.service-detail-meta-pill,
.cta-note-badge,
.hero-status-pill,
.section-note-pill {
  transform: none !important;
  border-radius: 2px !important;
}

/* 6. Penyesuaian Floating WhatsApp Button & Footer */
.smart-wa-floating-btn {
  position: fixed !important;
  bottom: 24px !important;
  right: 24px !important;
  z-index: 999 !important;
}
@media (max-width: 640px) {
  .smart-wa-floating-btn {
    bottom: 16px !important;
    right: 16px !important;
  }
}

.site-footer {
  background: #0f1013 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  padding: 60px 0 30px !important;
}
.footer-wordmark {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  text-decoration: none !important;
  font-family: 'Bricolage Grotesque', sans-serif !important;
  font-size: 1.4rem !important;
  font-weight: 800 !important;
  color: #faf8f2 !important;
  margin-bottom: 12px !important;
}
.footer-dot {
  width: 7px !important;
  height: 7px !important;
  border-radius: 999px !important;
  background-color: #f59e0b !important;
  display: inline-block !important;
}
.footer-tagline {
  font-size: 0.9rem !important;
  color: #94a3b8 !important;
  line-height: 1.6 !important;
  max-width: 360px !important;
  margin-bottom: 16px !important;
}
.footer-col-title {
  display: block !important;
  font-family: 'IBM Plex Mono', monospace !important;
  font-size: 0.74rem !important;
  color: #f59e0b !important;
  letter-spacing: 0.06em !important;
  margin-bottom: 14px !important;
  font-weight: 700 !important;
}
.footer-nav-group ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
}
.footer-nav-group ul li a {
  color: #cbd5e1 !important;
  text-decoration: none !important;
  font-size: 0.88rem !important;
  transition: color 0.15s ease !important;
}
.footer-nav-group ul li a:hover {
  color: #f59e0b !important;
}
"""

with open('src/index.css', 'a', encoding='utf-8') as f:
    f.write(fondasi_css)

print("Fondasi CSS appended.")
