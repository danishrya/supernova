import React from 'react';
import { deckSlide } from '../data/products';

// Small illustrated preview per product type (used on catalog cards and the detail page).
export default function Mock({ p }) {
  switch (p.mock) {
    case 'slides':
      return (
        <div className="dp-mock__art dp-art-slides">
          <div className="dp-art-slides__stack">
            <img src={deckSlide(p.deck, 3, true)} alt="" loading="lazy" decoding="async" draggable={false} onContextMenu={(e) => e.preventDefault()} />
            <img src={deckSlide(p.deck, 1, true)} alt="" loading="lazy" decoding="async" draggable={false} onContextMenu={(e) => e.preventDefault()} />
            <img src={deckSlide(p.deck, 0, true)} alt={`Pratinjau ${p.title}`} loading="lazy" decoding="async" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </div>
          <span className="dp-mock__foot">{p.slideLabels?.length || 10} SLIDE · PRATINJAU ASLI</span>
        </div>
      );
    case 'deck':
      return (
        <div className="dp-mock__art dp-art-deck">
          <i className="bar accent" style={{ width: '32%' }} />
          <i className="bar" />
          <i className="bar" style={{ width: '78%' }} />
          <div className="dp-art-deck__slides">
            <span>01/SLIDE</span>
            <span>02/DATA</span>
            <span>03/EXIT</span>
          </div>
          <span className="dp-mock__foot">16:9 FULL-HD</span>
        </div>
      );
    case 'brand':
      return (
        <div className="dp-mock__art dp-art-brand">
          <div className="dp-art-brand__row">
            <span className="dp-art-brand__aa">Aa</span>
            <i className="bar" style={{ width: 80, height: 8, background: 'var(--sn-meta)' }} />
          </div>
          <div className="dp-art-brand__swatches">
            <i style={{ background: 'var(--sn-orange)' }} />
            <i style={{ background: 'var(--sn-gold)' }} />
            <i style={{ background: '#f1eaf0' }} />
            <i style={{ background: '#121027', borderColor: 'var(--sn-border-warm)' }} />
          </div>
          <div className="dp-mock__foot dp-mock__foot--split">
            <span>LOGO / GUIDELINE</span>
            <span>40+ ASSETS</span>
          </div>
        </div>
      );
    case 'notion':
      return (
        <div className="dp-mock__art dp-art-notion">
          <span className="dp-art-notion__row">
            <i className="sn-dot" style={{ background: 'var(--sn-gold)' }} /> Active Pipeline (6)
          </span>
          <span className="dp-art-notion__row">
            <i className="sn-dot" style={{ background: 'var(--sn-green)' }} /> Invoice Paid (12)
          </span>
          <span className="dp-mock__foot">AUTO REVENUE TRACKER</span>
        </div>
      );
    case 'web':
      return (
        <div className="dp-mock__art dp-art-web">
          <div className="dp-art-web__browser">
            <div className="dp-art-web__chrome">
              <i style={{ background: 'var(--sn-red)' }} />
              <i style={{ background: 'var(--sn-gold)' }} />
              <i style={{ background: 'var(--sn-green)' }} />
            </div>
            <i className="bar accent" style={{ width: '60%', height: 8 }} />
            <i className="bar" style={{ width: '40%', background: 'var(--sn-meta)' }} />
          </div>
          <div className="dp-mock__foot dp-mock__foot--split">
            <span>RESPONSIVE</span>
            <span>NO JS RUNTIME</span>
          </div>
        </div>
      );
    case 'catalog':
      return (
        <div className="dp-mock__art dp-art-catalog">
          <div className="dp-art-catalog__grid">
            {[0, 1].map((k) => (
              <div key={k}>
                <i style={{ width: '70%', background: 'var(--sn-meta)' }} />
                <i style={{ width: '35%', background: 'var(--sn-orange)' }} />
              </div>
            ))}
          </div>
          <span className="dp-mock__foot">32 HALAMAN SIAP CETAK</span>
        </div>
      );
    case 'ebook':
      return (
        <div className="dp-mock__art dp-art-ebook">
          <div className="dp-art-ebook__page">
            <span className="tone-gold">BAB IV: SKRIP DEALING</span>
            <em>“Cara tolak revisi tanpa batas tanpa bikin klien kabur...”</em>
          </div>
          <div className="dp-mock__foot dp-mock__foot--split">
            <span>96 HALAMAN</span>
            <span>EPUB + PDF</span>
          </div>
        </div>
      );
    case 'carousel':
      return (
        <div className="dp-mock__art dp-art-carousel">
          <div className="dp-art-carousel__row">
            <span>#1 HOOK</span>
            <span>#2 VALUE</span>
            <span>#3 CTA</span>
          </div>
          <span className="dp-mock__foot">50 SLIDE SIAP PAKAI</span>
        </div>
      );
    case 'wireframe':
    default:
      return (
        <div className="dp-mock__art dp-art-wire">
          <i className="bar" style={{ height: 8, background: 'var(--sn-border-warm)' }} />
          <div className="dp-art-wire__grid">
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="dp-art-wire__input" />
          <div className="dp-mock__foot dp-mock__foot--split">
            <span>120+ BLOK KOMPONEN</span>
            <span>WCAG 2.1</span>
          </div>
        </div>
      );
  }
}

