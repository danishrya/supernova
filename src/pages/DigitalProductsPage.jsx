import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, rupiah, waLink } from '../data/products';
import Mock from '../components/ProductMock';
import { ArrowRight, ArrowUpRight, ChevronDown, CheckGlyph } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

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

function ProductCard({ p, index }) {
  return (
    <article
      className={`sn-card dp-card${p.featured ? ' dp-card--featured' : ''}`}
      data-tilt="5"
      data-spotlight
      data-reveal
      data-reveal-delay={index % 4}
    >
      <Link to={`/produk-digital/${p.id}`} className="dp-card__link" onClick={playClick} aria-label={`Lihat detail ${p.title}`}>
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

      </Link>

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
