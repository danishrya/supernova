bricolage_css = """
/* =============================================================================
   BRICOLAGE GROTESQUE (700-800) + HANKEN GROTESK DESIGN SYSTEM
   Human-Crafted Editorial Studio Aesthetic • Eliminating AI Slop
   ============================================================================= */

:root, html, body {
  --font-display: 'Bricolage Grotesque', -apple-system, sans-serif !important;
  --font-heading: 'Bricolage Grotesque', -apple-system, sans-serif !important;
  --font-body: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif !important;
  --font-main: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif !important;
  --font-mono: 'IBM Plex Mono', monospace !important;
  --font-handwriting: 'Caveat', cursive !important;
}

body {
  font-family: var(--font-body) !important;
  background-color: #121316 !important;
  color: #f4f0ea !important;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6,
.hero-bricolage-headline,
.roster-main-title,
.cases-main-title,
.memo-title,
.entry-heading,
.case-heading,
.sheet-title,
.section-title,
.page-main-title,
.ruler-title,
.guarantee-col h4 {
  font-family: 'Bricolage Grotesque', sans-serif !important;
  font-weight: 800 !important;
  letter-spacing: -0.028em !important;
}

.headline-accent,
.title-quirk {
  color: #f59e0b !important;
  font-weight: 800 !important;
}

p, .hero-hanken-lead, .entry-desc, .case-overview-text, .memo-desc, .roster-sub-desc, .lead-text, .sheet-desc {
  font-family: 'Hanken Grotesk', sans-serif !important;
  font-weight: 400 !important;
  color: #cbd5e1 !important;
  line-height: 1.68 !important;
}

/* 1. Hero Broadsheet Layout */
.hero-editorial-broadsheet {
  padding-top: 130px;
  padding-bottom: 50px;
  background: #121316;
  position: relative;
}

.hero-ledger-top {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #94a3b8;
  letter-spacing: 0.08em;
  flex-wrap: wrap;
}
.ledger-dot {
  color: #f59e0b;
}
.ledger-badge {
  margin-left: auto;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 2px 8px;
  border-radius: 2px;
}

.hero-broadsheet-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: start;
  margin-bottom: 48px;
}

.hero-main-column {
  display: flex;
  flex-direction: column;
}

.hero-bricolage-headline {
  font-size: clamp(2.4rem, 4.4vw, 3.8rem);
  line-height: 1.12;
  color: #faf8f2;
  margin: 0 0 16px;
  letter-spacing: -0.03em;
}

.designer-handwritten-note {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  background: rgba(245, 158, 11, 0.1);
  border-left: 3px solid #f59e0b;
  padding: 8px 14px;
  margin: 0 0 20px;
  font-family: 'Caveat', cursive;
  font-size: 1.35rem;
  color: #fbbf24;
  line-height: 1.3;
}
.arrow-scribble {
  font-size: 1.2rem;
  font-weight: bold;
}
.signature-tag {
  font-size: 1.1rem;
  color: #f59e0b;
  margin-left: 6px;
}

.hero-hanken-lead {
  font-size: 1.05rem;
  color: #cbd5e1;
  max-width: 580px;
  margin: 0 0 28px;
}

.hero-actions-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-hero-wa {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #10b981;
  color: #ffffff !important;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 13px 24px;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
}
.btn-hero-wa:hover {
  background: #059669;
  transform: translateY(-2px);
}

.btn-hero-calc {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #faf8f2 !important;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 13px 22px;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.btn-hero-calc:hover {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b !important;
}

/* Right Specimen Card */
.specimen-physical-sheet {
  background: #18191f;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  padding: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  position: relative;
}
.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.14);
  margin-bottom: 14px;
}
.sheet-stamp-box {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sheet-id {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #f59e0b;
  font-weight: 700;
}
.sheet-status-pill {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 1px 6px;
  border-radius: 2px;
}
.sheet-category {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #94a3b8;
}
.sheet-preview-frame {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 2px;
  background: #0f1013;
  margin-bottom: 16px;
}
.sheet-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}
.sheet-preview-frame:hover .sheet-preview-img {
  transform: scale(1.03);
}
.sheet-preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(18, 19, 22, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.sheet-preview-frame:hover .sheet-preview-overlay {
  opacity: 1;
}
.sheet-preview-overlay span {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  color: #ffffff;
  padding: 6px 14px;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
.sheet-title {
  font-size: 1.15rem !important;
  color: #faf8f2 !important;
  margin: 0 0 8px;
  line-height: 1.3;
}
.sheet-desc {
  font-size: 0.88rem !important;
  color: #94a3b8 !important;
  line-height: 1.55;
  margin: 0 0 14px;
}
.sheet-results-table {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.12);
  padding: 10px 12px;
  border-radius: 2px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.table-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tbl-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #f59e0b;
}
.tbl-val {
  font-size: 0.8rem;
  color: #cbd5e1;
  line-height: 1.4;
}
.tbl-val.highlight-green {
  color: #10b981;
  font-weight: 600;
}
.sheet-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.sheet-mono-tools {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.66rem;
  color: #64748b;
}
.sheet-link {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  color: #f59e0b;
  text-decoration: none;
}
.sheet-link:hover {
  text-decoration: underline;
}

/* Bottom Guarantees Ledger */
.studio-guarantees-ledger {
  background: #18191f;
  border: 1px dashed rgba(255, 255, 255, 0.22);
  border-radius: 2px;
  padding: 24px 28px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}
.ledger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
  margin-bottom: 18px;
}
.ledger-title-mono {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #f59e0b;
  letter-spacing: 0.06em;
}
.ledger-stamp-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  color: #10b981;
  border: 1px solid #10b981;
  padding: 2px 6px;
  border-radius: 2px;
}
.ledger-columns-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.guarantee-col {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.col-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #f59e0b;
}
.col-content h4 {
  font-size: 0.98rem !important;
  color: #faf8f2 !important;
  margin: 0 0 6px !important;
}
.col-content p {
  font-size: 0.85rem !important;
  color: #94a3b8 !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

/* 2. Dateline Strip */
.studio-dateline-strip {
  background: #0e0f13;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 14px 0;
}
.dateline-inner-row {
  display: flex;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}
.dateline-inner-row::-webkit-scrollbar {
  display: none;
}
.dateline-stamp {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: #f59e0b;
  letter-spacing: 0.08em;
  flex-shrink: 0;
}
.dateline-items-track {
  display: flex;
  align-items: center;
  gap: 24px;
}
.dateline-pill-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: #cbd5e1;
}
.pill-dot {
  color: #10b981;
}

/* 3. Editorial Architectural Roster (Replacing Generic AI 3-Cards) */
.services-roster-section {
  padding: 80px 0;
  background: #121316;
}
.roster-header-spread {
  margin-bottom: 40px;
}
.section-index-stamp {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  color: #f59e0b;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.roster-main-title {
  font-size: clamp(2rem, 3.8vw, 3rem) !important;
  color: #faf8f2 !important;
  margin: 0 0 12px;
  line-height: 1.2;
}
.roster-sub-desc {
  font-size: 1.05rem !important;
  color: #94a3b8 !important;
  max-width: 680px;
  line-height: 1.6;
}
.editorial-roster-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.roster-entry-row {
  background: #18191f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid var(--accent-border, #f59e0b);
  border-radius: 2px;
  padding: 30px 28px;
  display: grid;
  grid-template-columns: 0.9fr 1.35fr 0.75fr;
  gap: 32px;
  align-items: center;
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.roster-entry-row:hover {
  transform: translateX(4px);
  border-color: rgba(255, 255, 255, 0.2);
}
.entry-left-col {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}
.entry-index-big {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 2.2rem;
  font-weight: 800;
  color: #64748b;
  line-height: 1;
}
.entry-tag {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #f59e0b;
  margin-bottom: 4px;
}
.entry-heading {
  font-size: 1.35rem !important;
  color: #faf8f2 !important;
  margin: 0;
  line-height: 1.3;
}
.entry-desc {
  font-size: 0.92rem !important;
  color: #cbd5e1 !important;
  margin: 0 0 14px;
  line-height: 1.6;
}
.entry-deliverables-chips {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.chip-item {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.76rem;
  color: #94a3b8;
}
.btn-roster-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  color: #faf8f2;
  text-decoration: none;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
  width: 100%;
}
.btn-roster-action:hover {
  background: rgba(245, 158, 11, 0.14);
  border-color: #f59e0b;
  color: #f59e0b;
}
.roster-footer-cta {
  margin-top: 32px;
  text-align: center;
}
.btn-editorial-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid #f59e0b;
  color: #f59e0b;
  background: transparent;
  border-radius: 999px;
  text-decoration: none;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  transition: all 0.2s ease;
}
.btn-editorial-outline:hover {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

/* 4. Craft Ruler Header (Before/After) */
.craft-ruler-header {
  margin-bottom: 24px;
}
.ruler-stamp {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #f59e0b;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 6px;
}
.ruler-title {
  font-size: 1.8rem !important;
  color: #faf8f2 !important;
  margin: 0 0 8px;
}
.ruler-sub {
  font-size: 0.95rem;
  color: #94a3b8;
  margin: 0;
}

/* 5. Cases Spread */
.curated-cases-spread-section {
  padding: 80px 0;
  background: #121316;
}
.cases-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 16px;
}
.cases-main-title {
  font-size: clamp(2rem, 3.8vw, 3rem) !important;
  color: #faf8f2 !important;
  margin: 6px 0 0;
}
.cases-duo-spread {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}
.case-spread-card {
  background: #18191f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.case-card-top-bar {
  padding: 12px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.case-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.74rem;
  color: #f59e0b;
}
.case-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #10b981;
}
.case-media-frame {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #0f1013;
}
.case-media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.case-media-frame:hover .case-media-img {
  transform: scale(1.03);
}
.case-hover-glass {
  position: absolute;
  inset: 0;
  background: rgba(18, 19, 22, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.case-media-frame:hover .case-hover-glass {
  opacity: 1;
}
.case-hover-glass span {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  color: #ffffff;
  padding: 6px 14px;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
.case-content-box {
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.case-category-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #f59e0b;
  display: block;
  margin-bottom: 6px;
}
.case-heading {
  font-size: 1.3rem !important;
  color: #faf8f2 !important;
  margin: 0 0 10px;
  line-height: 1.35;
}
.case-overview-text {
  font-size: 0.88rem !important;
  color: #94a3b8 !important;
  line-height: 1.6;
  margin: 0 0 16px;
}
.case-results-mini-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.12);
  padding: 12px 14px;
  border-radius: 2px;
  margin-bottom: 20px;
}
.res-title {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #10b981;
  margin-bottom: 6px;
}
.res-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.res-items li {
  display: flex;
  gap: 8px;
  font-size: 0.82rem;
  color: #cbd5e1;
  line-height: 1.4;
}
.case-bottom-links {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.case-direct-link {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #f59e0b;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.case-direct-link:hover {
  text-decoration: underline;
}
.case-preview-pill {
  background: transparent;
  border: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: #64748b;
  cursor: pointer;
  text-decoration: underline;
}
.case-preview-pill:hover {
  color: #94a3b8;
}

/* 6. Studio Invitation Memo (Final CTA) */
.final-memo-section {
  padding: 60px 0 90px;
  background: #121316;
}
.studio-invitation-memo {
  background: #18191f;
  border: 1px solid rgba(245, 158, 11, 0.4);
  border-radius: 2px;
  padding: 48px 40px;
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.5);
  position: relative;
}
.memo-header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
  margin-bottom: 24px;
}
.memo-stamp {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.74rem;
  color: #f59e0b;
  letter-spacing: 0.08em;
  font-weight: 700;
}
.memo-date {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.68rem;
  color: #10b981;
}
.memo-title {
  font-size: clamp(2rem, 3.8vw, 2.8rem) !important;
  color: #faf8f2 !important;
  margin: 0 0 16px;
  line-height: 1.25;
}
.memo-desc {
  font-size: 1.05rem !important;
  color: #cbd5e1 !important;
  max-width: 650px;
  margin: 0 0 32px;
  line-height: 1.65;
}
.memo-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.memo-footer-specs {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.74rem;
  color: #94a3b8;
}

/* Responsive Rules */
@media (max-width: 1024px) {
  .hero-broadsheet-grid {
    grid-template-columns: 1fr;
  }
  .roster-entry-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .ledger-columns-grid {
    grid-template-columns: 1fr;
  }
  .cases-duo-spread {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero-bricolage-headline {
    font-size: 2.1rem !important;
  }
  .studio-invitation-memo {
    padding: 28px 20px;
  }
}
"""

with open('src/index.css', 'a', encoding='utf-8') as f:
    f.write(bricolage_css)

print("Bricolage Grotesque & Hanken Grotesk CSS appended.")
