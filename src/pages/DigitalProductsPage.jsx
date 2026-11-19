import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ArrowRight, ArrowUpRight, ChevronDown, CheckGlyph } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

// Products & copy from Figma frame 2001:1808 (Produk Digital).
const PRODUCTS = [
  { id: 'pitch-deck-blueprint', order: 8, cat: 'ppt', catLabel: 'TEMPLATE PPT', title: 'Pitch Deck Blueprint v2.0', desc: 'Format teruji buat pitching investor & demo day.', format: 'PPTX • 24 SLIDE', price: 149000, mock: 'deck', tag: 'PPTX // V2.0', isNew: true },
  { id: 'brand-kit-umkm', order: 7, cat: 'sosmed', catLabel: 'DESAIN SOSMED', title: 'Brand Kit UMKM Pack', desc: 'Panduan visual komplit: palet warna, logo, dan aset sosmed.', format: 'FIGMA + CANVA', price: 189000, mock: 'brand', tag: 'FIGMA + CANVA', featured: true },
  { id: 'notion-freelance-os', order: 6, cat: 'uikit', catLabel: 'PRODUCTIVITY / OS', title: 'Notion Freelance OS', desc: 'Sistem kerja terintegrasi: CRM klien, invoice, dan pipeline.', format: 'NOTION TEMPLATE', price: 129000, mock: 'notion', tag: 'WORKSPACE // OS' },
  { id: 'portfolio-dark-html', order: 5, cat: 'web', catLabel: 'TEMPLATE WEB', title: 'Portfolio Dark HTML', desc: 'Website portofolio monokromatik yang ringan dan responsif.', format: 'HTML + TAILWIND', price: 199000, mock: 'web', tag: 'DEV // TAILWIND' },
  { id: 'katalog-produk-ecommerce', order: 4, cat: 'sosmed', catLabel: 'DESAIN SOSMED', title: 'Katalog Produk E-Commerce', desc: 'Layout editorial buat katalog PDF dan versi cetak.', format: 'CANVA + INDESIGN', price: 159000, mock: 'catalog', tag: 'STORE // PRINT' },
  { id: 'panduan-negosiasi-klien', order: 3, cat: 'ebook', catLabel: 'E-BOOK', title: 'Panduan Negosiasi Klien', desc: 'Skrip obrolan, handling komplain, dan cara jaga scope kerja.', format: 'PDF GUIDE', price: 89000, mock: 'ebook', tag: 'E-BOOK // ESSAY' },
  { id: 'social-media-carousel-kit', order: 2, cat: 'sosmed', catLabel: 'DESAIN SOSMED', title: 'Social Media Carousel Kit', desc: 'Template konten edukasi Instagram & LinkedIn.', format: 'CANVA + FIGMA', price: 119000, mock: 'carousel', tag: 'CAROUSEL // FEED' },
  { id: 'saas-wireframe-system', order: 1, cat: 'uikit', catLabel: 'UI KIT', title: 'SaaS Wireframe System', desc: 'Pondasi wireframing cepat untuk dashboard dan aplikasi SaaS.', format: 'FIGMA COMPONENT', price: 219000, mock: 'wireframe', tag: 'UI SYSTEM // V1' },
];

const TABS = [
  { key: 'all', label: 'SEMUA' },
  { key: 'ppt', label: 'TEMPLATE PPT' },
  { key: 'web', label: 'TEMPLATE WEBSITE' },
  { key: 'ebook', label: 'E-BOOK' },
  { key: 'uikit', label: 'UI KIT' },
  { key: 'sosmed', label: 'DESAIN SOSMED' },
];

const SORTS = [
  { key: 'newest', label: 'TERBARU' },
  { key: 'cheap', label: 'HARGA TERENDAH' },
  { key: 'pricey', label: 'HARGA TERTINGGI' },
];

const rupiah = (n) => `Rp ${n.toLocaleString('id-ID')}`;
const waLink = (p) =>
  `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Halo Min Cham, gue tertarik sama "${p.title}" (${rupiah(p.price)}). Masih tersedia?`
  )}`;

function Mock({ p }) {
  switch (p.mock) {
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
            <i style={{ background: '#e9e1dd' }} />
            <i style={{ background: '#100e0c', borderColor: 'var(--sn-border-warm)' }} />
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

function ProductCard({ p, index }) {
  return (
    <article
      className={`sn-card dp-card${p.featured ? ' dp-card--featured' : ''}`}
      data-tilt="5"
      data-spotlight
      data-reveal
      data-reveal-delay={index % 4}
    >
      <div className={`dp-mock${p.featured ? ' dp-mock--stacked' : ''}`}>
        <div className="dp-mock__plane">
          <div className="dp-mock__head">
            <span className={p.featured ? 'tone-gold' : ''}>{p.tag}</span>
            {p.isNew ? (
              <span className="dp-badge-new">BARU</span>
            ) : p.mock === 'web' ? (
              <span>99.8/100</span>
            ) : p.mock === 'catalog' ? (
              <span>A4 + PDF</span>
            ) : p.mock === 'wireframe' ? (
              <span>FIGMA AUTO-LAYOUT</span>
            ) : (
              <span className="sn-dot" style={{ background: p.mock === 'ebook' ? 'var(--sn-gold)' : 'var(--sn-orange)' }} />
            )}
          </div>
          <Mock p={p} />
        </div>
      </div>

      <div className="dp-card__details">
        <span className={`sn-mono${p.featured ? ' tone-peach' : ''}`}>{p.catLabel}</span>
        <h4 className="sn-display dp-card__title">{p.title}</h4>
        <p className="dp-card__desc">{p.desc}</p>
      </div>

      <div className="dp-card__foot">
        <div className="dp-card__price-row">
          <span>{p.format}</span>
          <strong>{rupiah(p.price)}</strong>
        </div>
        <a
          href={waLink(p)}
          target="_blank"
          rel="noopener noreferrer"
          className="dp-card__ask"
          onClick={playClick}
        >
          TANYA VIA WHATSAPP <ArrowUpRight size={10} />
        </a>
      </div>
    </article>
  );
}

export default function DigitalProductsPage() {
  const [tab, setTab] = useState('all');
  const [sort, setSort] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    if (!sortOpen) return undefined;
    const close = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [sortOpen]);

  const list = useMemo(() => {
    const items = PRODUCTS.filter((p) => tab === 'all' || p.cat === tab);
    const sorted = [...items];
    if (sort === 'cheap') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'pricey') sorted.sort((a, b) => b.price - a.price);
    else sorted.sort((a, b) => b.order - a.order);
    return sorted;
  }, [tab, sort]);

  const counts = useMemo(() => {
    const c = { all: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      c[p.cat] = (c[p.cat] || 0) + 1;
    });
    return c;
  }, []);

  return (
    <div className="sn-page dp-page" data-name="Supernova Studio — Produk Digital">
      {/* Header + filters */}
      <section className="sn-container dp-header">
        <div className="dp-header__top">
          <div className="dp-header__copy" data-reveal>
            <span className="dp-eyebrow">
              <span className="sn-dot" /> PRODUK DIGITAL · SUPERNOVA VAULT
            </span>
            <h1 className="sn-display dp-header__h1">Beli sekali, pakai berkali-kali.</h1>
            <p className="sn-body sn-body--lg">
              Tinggal ganti teks dan gambar. Asset siap pakai tanpa ribet setup dari nol.
            </p>
          </div>
          <div className="dp-callout" data-reveal="right" data-reveal-delay="2">
            <img src="/figma-assets/arrow-caveat.svg" alt="" aria-hidden="true" className="dp-callout__arrow" />
            <span className="dp-callout__note">file master siap edit, langsung dikirim ke email lo ⚡</span>
          </div>
        </div>

        <div className="dp-bar">
          <div className="dp-tabs" role="tablist" aria-label="Kategori produk">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                className={`dp-tab${tab === t.key ? ' is-active' : ''}`}
                onClick={() => {
                  playClick();
                  setTab(t.key);
                }}
              >
                {t.label}
                <sup>{counts[t.key] || 0}</sup>
              </button>
            ))}
          </div>

          <div className="dp-sort" ref={sortRef}>
            <button
              type="button"
              className={`dp-sort__btn${sortOpen ? ' is-open' : ''}`}
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((o) => !o)}
            >
              URUTKAN: {SORTS.find((s) => s.key === sort).label}
              <ChevronDown size={10} />
            </button>
            {sortOpen && (
              <ul className="dp-sort__menu" role="listbox">
                {SORTS.map((s) => (
                  <li key={s.key}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={sort === s.key}
                      onClick={() => {
                        playClick();
                        setSort(s.key);
                        setSortOpen(false);
                      }}
                    >
                      {s.label}
                      {sort === s.key && <CheckGlyph size={11} />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="sn-container dp-grid-section">
        <div className="dp-grid" key={`${tab}-${sort}`}>
          {list.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </section>

      {/* Cream callout ribbon */}
      <section className="sn-container dp-ribbon-wrap">
        <div className="dp-ribbon" data-reveal="scale">
          <div className="dp-ribbon__stamp">
            <span>SUPERNOVA BESPOKE · CUSTOM ORDER</span>
            <span>
              <span className="sn-dot sn-dot--green sn-dot--pulse" /> SLOT BULAN INI: TERSEDIA 2/4
            </span>
          </div>
          <div className="dp-ribbon__grid">
            <div className="dp-ribbon__copy">
              <h2 className="sn-display dp-ribbon__title">Nggak nemu yang pas? Gue bikinin custom.</h2>
              <p>
                Ceritain kebutuhan lo, format yang lo mau, dan deadline-nya. Gue bikinin khusus buat lo.
              </p>
            </div>
            <div className="dp-ribbon__action">
              <Link to="/harga" className="sn-btn sn-btn--primary sn-btn--md" data-magnetic onClick={playClick}>
                Minta estimasi <ArrowRight size={12} />
              </Link>
              <span className="dp-ribbon__note">
                <img src="/figma-assets/layanan-handwritten-arrow.svg" alt="" aria-hidden="true" />
                ngobrol dulu aja, santai ✨
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
