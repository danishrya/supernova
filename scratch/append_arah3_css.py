import sys

css_rules = """
/* =============================================================================
   ARAH 3: TACTILE STUDIO & ZINE CRAFT — MULTI-PAGE STYLING SYSTEM
   ============================================================================= */

/* 1. Global Signature Elements & Typography */
.supernova-signature-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: var(--color-accent-primary, #f59e0b);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
  margin-left: 6px;
  vertical-align: middle;
  animation: dotPulse 2.4s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.35); opacity: 1; }
}

.title-serif-accent,
.section-heading-fraunces,
.product-title-fraunces,
.notfound-title-fraunces,
.project-title-fraunces {
  font-family: 'Fraunces', Georgia, serif !important;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.heading-italic {
  font-style: italic;
  font-weight: 400;
  color: var(--color-accent-primary, #f59e0b);
}

.handwritten-annotation {
  font-family: 'Caveat', cursive, sans-serif;
  font-size: 1.35rem;
  color: var(--color-accent-primary, #f59e0b);
  margin: 6px 0 18px;
  transform: rotate(var(--annot-rot, 1.5deg));
  display: inline-block;
}

/* 2. Breadcrumbs */
.site-breadcrumb {
  padding: 24px 0 12px;
}
.breadcrumb-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
  color: #94a3b8;
}
.breadcrumb-link {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.15s ease;
}
.breadcrumb-link:hover {
  color: var(--color-accent-primary, #f59e0b);
}
.breadcrumb-separator {
  color: #475569;
}
.breadcrumb-current {
  color: #f1f5f9;
  font-weight: 600;
}

/* 3. Fullscreen Animated Mobile Menu */
.fullscreen-mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s ease;
}
.fullscreen-mobile-menu.is-open {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
.fs-menu-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 11, 14, 0.85);
  backdrop-filter: blur(8px);
}
.fs-menu-sheet {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 500px;
  height: 100%;
  margin-left: auto;
  background: #131417;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 24px 28px;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.fullscreen-mobile-menu.is-open .fs-menu-sheet {
  transform: translateX(0);
}
.fs-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
  margin-bottom: 24px;
}
.fs-brand-title {
  display: block;
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: 0.05em;
}
.fs-brand-badge {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  color: #94a3b8;
  letter-spacing: 0.08em;
}
.fs-close-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.fs-close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-accent-primary, #f59e0b);
}
.fs-nav-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 30px;
}
.fs-nav-item {
  display: flex;
  align-items: baseline;
  padding: 12px 14px;
  text-decoration: none;
  border-radius: 2px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.15s ease;
}
.fs-nav-item:hover,
.fs-nav-item.is-active {
  background: rgba(245, 158, 11, 0.08);
}
.fs-item-index {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-accent-primary, #f59e0b);
  margin-right: 14px;
}
.fs-item-title {
  font-family: 'Fraunces', serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #f1f5f9;
  flex: 1;
}
.fs-item-arrow {
  font-family: 'IBM Plex Mono', monospace;
  color: #64748b;
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}
.fs-nav-item:hover .fs-item-arrow {
  color: var(--color-accent-primary, #f59e0b);
  transform: translateX(4px);
}
.fs-quick-services {
  margin-bottom: 30px;
}
.fs-section-tag {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #94a3b8;
  margin-bottom: 10px;
  letter-spacing: 0.06em;
}
.fs-services-chips {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.fs-chip {
  display: block;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s ease;
}
.fs-chip:hover {
  border-color: var(--color-accent-primary, #f59e0b);
  color: #ffffff;
}
.fs-menu-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}
.fs-whatsapp-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 18px;
  background: #10b981;
  color: #ffffff;
  border-radius: 999px;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  transition: background 0.2s ease;
}
.fs-whatsapp-cta:hover {
  background: #059669;
}
.fs-guarantee-note {
  margin-top: 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  color: #94a3b8;
  text-align: center;
  line-height: 1.4;
}

/* 4. Command Palette Modal */
.cmd-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 80px 20px 20px;
}
.cmd-palette-card {
  width: 100%;
  max-width: 580px;
  background: #18191f;
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 2px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.cmd-search-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.cmd-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 1rem;
  font-family: inherit;
}
.cmd-close-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #94a3b8;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 2px;
  cursor: pointer;
}
.cmd-results-list {
  max-height: 320px;
  overflow-y: auto;
  padding: 8px;
}
.cmd-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.cmd-item:hover,
.cmd-item.selected {
  background: rgba(245, 158, 11, 0.12);
}
.cmd-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cmd-category-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  color: var(--color-accent-primary, #f59e0b);
}
.cmd-label {
  font-size: 0.92rem;
  color: #f1f5f9;
  font-weight: 500;
}
.cmd-path {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #64748b;
}
.cmd-empty {
  padding: 30px;
  text-align: center;
  font-size: 0.88rem;
  color: #94a3b8;
}
.cmd-footer {
  padding: 10px 16px;
  background: #111215;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  color: #64748b;
  text-align: center;
}

/* 5. Zine Stickers & Physical Guarantee Receipt */
.zine-sticker-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 2px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78rem;
  color: #fbbf24;
  letter-spacing: 0.04em;
  transform: rotate(var(--sticker-rot, 0deg));
  margin-bottom: 16px;
}
.zine-dot-pulse {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.zine-guarantee-receipt {
  margin-top: 28px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  position: relative;
}
.receipt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}
.receipt-mono {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #94a3b8;
  letter-spacing: 0.08em;
}
.receipt-stamp {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  color: #10b981;
  border: 1px solid #10b981;
  padding: 2px 6px;
  border-radius: 2px;
  letter-spacing: 0.06em;
}
.receipt-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.receipt-list li {
  display: flex;
  gap: 12px;
  font-size: 0.88rem;
  color: #cbd5e1;
  line-height: 1.5;
}
.receipt-num {
  font-family: 'IBM Plex Mono', monospace;
  color: var(--color-accent-primary, #f59e0b);
  font-weight: 600;
}

/* 6. Specimen Card Hero Stage */
.hero-specimen-card {
  background: #1a1b20;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  padding: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transform: rotate(var(--spec-rot, 0deg));
  transition: transform 0.3s ease;
}
.hero-specimen-card:hover {
  transform: rotate(0deg) translateY(-4px);
}
.specimen-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.specimen-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  color: #94a3b8;
}
.specimen-badge-accent {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #10b981;
  font-weight: 700;
}
.specimen-img-frame {
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  aspect-ratio: 16 / 10;
  background: #0f1013;
}
.specimen-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.specimen-overlay-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(10, 11, 14, 0.95), transparent);
  padding: 24px 14px 10px;
}
.specimen-label-title {
  display: block;
  font-family: 'Fraunces', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
}
.specimen-label-desc {
  display: block;
  font-size: 0.78rem;
  color: #cbd5e1;
}
.specimen-footer {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.specimen-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.specimen-mono {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  color: #64748b;
}
.specimen-link {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-accent-primary, #f59e0b);
  text-decoration: none;
}
.specimen-link:hover {
  text-decoration: underline;
}

/* 7. Editorial Services Grid */
.section-header-editorial {
  margin-bottom: 40px;
}
.section-index-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-accent-primary, #f59e0b);
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 8px;
}
.section-heading-fraunces {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  color: #f8fafc;
  margin: 0 0 12px;
  line-height: 1.25;
}
.section-subtext {
  font-size: 1rem;
  color: #94a3b8;
  max-width: 650px;
  line-height: 1.6;
}
.services-editorial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.service-editorial-card {
  background: #18191e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 3px solid var(--card-accent, #f59e0b);
  border-radius: 2px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.service-editorial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.2);
}
.card-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.service-number {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: #64748b;
}
.service-badge-pill {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  padding: 3px 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: #cbd5e1;
}
.service-card-title {
  font-family: 'Fraunces', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 12px;
  line-height: 1.35;
}
.service-card-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 18px;
}
.service-card-specs {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.82rem;
  color: #cbd5e1;
}
.service-card-actions {
  margin-top: auto;
}
.service-card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-accent-primary, #f59e0b);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
}
.service-card-link:hover {
  text-decoration: underline;
}
.editorial-view-all-cta {
  margin-top: 32px;
  text-align: center;
}

/* 8. Curated Portfolio Cards */
.curated-projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.curated-project-card {
  background: #18191e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.project-card-header {
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.project-index-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: var(--color-accent-primary, #f59e0b);
  margin-right: 8px;
}
.project-category-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #94a3b8;
}
.project-badge-pill {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  padding: 2px 6px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  border-radius: 2px;
}
.project-card-image-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #0f1013;
}
.project-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.project-card-image-wrap:hover .project-card-img {
  transform: scale(1.04);
}
.project-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(19, 20, 23, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
}
.project-card-image-wrap:hover .project-card-overlay {
  opacity: 1;
}
.overlay-btn-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
.project-card-body {
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-brief-overview {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.55;
  margin: 0 0 16px;
}
.project-key-results {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  padding: 12px 14px;
  border-radius: 2px;
  margin-bottom: 20px;
}
.result-heading {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #10b981;
  margin-bottom: 6px;
  letter-spacing: 0.06em;
}
.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.results-list li {
  display: flex;
  gap: 8px;
  font-size: 0.8rem;
  color: #cbd5e1;
  line-height: 1.4;
}
.check-bullet {
  color: #10b981;
}
.project-footer-row {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.project-case-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-accent-primary, #f59e0b);
  text-decoration: none;
}
.project-case-link:hover {
  text-decoration: underline;
}
.project-quick-preview-btn {
  background: transparent;
  border: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #64748b;
  cursor: pointer;
  text-decoration: underline;
}
.project-quick-preview-btn:hover {
  color: #94a3b8;
}

.portfolio-cta-strip {
  margin-top: 36px;
  padding: 20px 24px;
  background: #18191e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.strip-info {
  display: flex;
  flex-direction: column;
}
.strip-highlight {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #f8fafc;
}
.strip-sub {
  font-size: 0.85rem;
  color: #94a3b8;
}

/* 9. Zine CTA Box */
.zine-cta-box {
  background: #18191e !important;
  border: 1px solid rgba(245, 158, 11, 0.35) !important;
  border-radius: 2px !important;
  position: relative;
  padding: 48px 32px !important;
}
.cta-micro-specs {
  margin-top: 28px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #94a3b8;
}

/* 10. Multi-Page Layouts */
.portfolio-zine-card,
.digital-product-card,
.manifesto-card,
.deliverable-item-card,
.ppt-package-box,
.workbench-card,
.notfound-card {
  background: #18191e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}

.portfolio-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;
}
.zine-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.card-item-no {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-accent-primary, #f59e0b);
}
.card-item-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #94a3b8;
}
.zine-card-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #0f1013;
}
.zine-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.zine-card-media:hover .zine-card-img {
  transform: scale(1.04);
}
.zine-card-badge-overlay {
  position: absolute;
  inset: 0;
  background: rgba(19, 20, 23, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.zine-card-media:hover .zine-card-badge-overlay {
  opacity: 1;
}
.zine-card-badge-overlay span {
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
.zine-card-body {
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-cat-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: var(--color-accent-primary, #f59e0b);
  display: block;
  margin-bottom: 6px;
}
.card-project-title {
  font-family: 'Fraunces', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 10px;
  line-height: 1.35;
}
.card-project-overview {
  font-size: 0.86rem;
  color: #94a3b8;
  line-height: 1.55;
  margin-bottom: 16px;
}
.card-tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}
.card-mono-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  color: #cbd5e1;
}
.card-bottom-actions {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.card-detail-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-accent-primary, #f59e0b);
  text-decoration: none;
}
.card-detail-link:hover {
  text-decoration: underline;
}
.card-preview-btn {
  background: transparent;
  border: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #64748b;
  cursor: pointer;
}
.card-preview-btn:hover {
  color: #94a3b8;
}

/* 11. Digital Products Grid */
.digital-products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}
.digital-product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.25s ease;
}
.digital-product-card:hover {
  transform: translateY(-4px);
}
.card-product-top {
  padding: 12px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-category-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  color: var(--color-accent-primary, #f59e0b);
}
.card-badge-pill {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  padding: 2px 6px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  border-radius: 2px;
}
.card-media-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0f1013;
  display: block;
}
.card-product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.card-media-wrap:hover .card-product-img {
  transform: scale(1.03);
}
.card-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(19, 20, 23, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.card-media-wrap:hover .card-hover-overlay {
  opacity: 1;
}
.card-hover-overlay span {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
.card-product-body {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-product-title {
  font-family: 'Fraunces', serif;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 10px;
  line-height: 1.35;
}
.card-product-title a {
  color: #f8fafc;
  text-decoration: none;
}
.card-product-title a:hover {
  color: var(--color-accent-primary, #f59e0b);
}
.card-product-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 18px;
}
.card-specs-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}
.spec-bullet {
  display: flex;
  gap: 8px;
  font-size: 0.82rem;
  color: #cbd5e1;
}
.spec-bullet span:first-child {
  color: var(--color-accent-primary, #f59e0b);
}
.card-price-row {
  margin-top: auto;
  padding: 14px 0;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}
.price-block {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.price-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #94a3b8;
}
.price-value {
  font-family: 'Fraunces', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #10b981;
}
.card-actions-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
}

/* 12. 404 Creative Lost Satellite Card */
.notfound-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 40px 20px;
}
.notfound-card {
  max-width: 640px;
  width: 100%;
  padding: 40px 36px;
  text-align: center;
}
.notfound-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
}
.notfound-code-stamp {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #f59e0b;
}
.notfound-status-live {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #ef4444;
}
.huge-404 {
  font-family: 'Fraunces', serif;
  font-size: clamp(4rem, 10vw, 6.5rem);
  font-weight: 900;
  color: rgba(255, 255, 255, 0.1);
  display: block;
  line-height: 1;
}
.notfound-title-fraunces {
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  color: #f8fafc;
  margin: 16px 0 12px;
}
.notfound-desc {
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto 28px;
}
.notfound-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 360px;
  margin: 0 auto 24px;
}
.notfound-footer-note {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #64748b;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .services-editorial-grid,
  .curated-projects-grid,
  .portfolio-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .digital-products-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .services-editorial-grid,
  .curated-projects-grid,
  .portfolio-cards-grid {
    grid-template-columns: 1fr;
  }
  .notfound-card {
    padding: 24px 18px;
  }
  .card-actions-row {
    grid-template-columns: 1fr;
  }
}
"""

with open('src/index.css', 'a', encoding='utf-8') as f:
    f.write(css_rules)

print("CSS appended successfully.")
