import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS, rupiah, waLink, deckSlide } from '../data/products';
import Mock from '../components/ProductMock';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckGlyph } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

const STEPS = [
  ['Chat via WhatsApp', 'Klik tombol beli, pesannya udah otomatis terisi nama produk.'],
  ['Transfer & konfirmasi', 'Gue kirim detail pembayaran. Kirim bukti transfer di chat.'],
  ['File dikirim ke email', 'Link download file master langsung masuk ke email lo.'],
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.id === slug);
  const [zoom, setZoom] = useState(false);
  const [slide, setSlide] = useState(0);

  if (!product) {
    return (
      <div className="sn-page pd-page">
        <section className="sn-container pd-missing" data-reveal>
          <span className="sn-overline"><span className="sn-dot" /> PRODUK TIDAK DITEMUKAN</span>
          <h1 className="sn-display pd-missing__title">Produk ini udah nggak ada di rak.</h1>
          <p className="sn-body sn-body--lg">Mungkin namanya berubah atau udah ditarik. Cek katalog terbaru aja.</p>
          <Link to="/produk-digital" className="sn-btn sn-btn--primary sn-btn--lg" data-magnetic onClick={playClick}>
            Balik ke katalog <ArrowRight size={13} />
          </Link>
        </section>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id)
    .sort((a, b) => (b.cat === product.cat) - (a.cat === product.cat))
    .slice(0, 3);

  return (
    <div className="sn-page pd-page" data-name={`Produk — ${product.title}`}>
      <section className="sn-container pd-hero">
        {product.deck ? (
          <div className="pd-hero__visual pd-gallery" data-reveal="left">
            <button
              type="button"
              className="pd-gallery__main"
              onClick={() => {
                playClick();
                setSlide((v) => (v + 1) % product.slideLabels.length);
              }}
              aria-label="Slide berikutnya"
            >
              <img
                key={slide}
                src={deckSlide(product.deck, slide)}
                alt={`${product.title} — slide ${slide + 1}: ${product.slideLabels[slide]}`}
                width="1280"
                height="720"
                decoding="async"
              />
              <span className="pd-gallery__label">
                {String(slide + 1).padStart(2, '0')} / {product.slideLabels.length} · {product.slideLabels[slide]}
              </span>
            </button>
            <div className="pd-gallery__thumbs" role="tablist" aria-label="Pilih slide">
              {product.slideLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={i === slide}
                  aria-label={label}
                  className={i === slide ? 'is-active' : ''}
                  onClick={() => {
                    playClick();
                    setSlide(i);
                  }}
                >
                  <img src={deckSlide(product.deck, i, true)} alt="" width="320" height="180" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
            <span className="pd-hero__hint sn-caveat">klik slide-nya buat lanjut</span>
          </div>
        ) : (
        <div className="pd-hero__visual" data-reveal="left">
          <button
            type="button"
            className={`pd-stage${zoom ? ' is-zoom' : ''}${product.featured ? ' dp-mock--stacked' : ''}`}
            onClick={() => { playClick(); setZoom((z) => !z); }}
            aria-label={zoom ? 'Perkecil pratinjau' : 'Perbesar pratinjau'}
            data-tilt="6"
          >
            <div className="dp-mock__plane pd-stage__plane">
              <div className="dp-mock__head">
                <span>{product.tag}</span>
                {product.isNew ? <span className="dp-badge-new">BARU</span> : <span className="sn-dot" />}
              </div>
              <Mock p={product} />
            </div>
          </button>
          <span className="pd-hero__hint sn-caveat">{zoom ? 'klik lagi buat kecilin' : 'klik buat zoom pratinjau'}</span>
        </div>
        )}

        <div className="pd-hero__info">
          <nav className="cs-crumb" aria-label="Breadcrumb" data-reveal>
            <Link to="/produk-digital">PRODUK DIGITAL</Link>
            <span aria-hidden="true">/</span>
            <span className="cs-crumb__current">{product.catLabel}</span>
          </nav>
          <h1 className="sn-display pd-title" data-reveal data-reveal-delay="1">{product.title}</h1>
          <p className="sn-body sn-body--lg pd-desc" data-reveal data-reveal-delay="1">{product.desc}</p>

          <div className="pd-price" data-reveal data-reveal-delay="2">
            <span className="pd-price__value">{rupiah(product.price)}</span>
            <span className="pd-price__note">Bayar sekali · file milik lo selamanya</span>
          </div>

          <ul className="pd-includes" data-reveal data-reveal-delay="2">
            {product.includes.map((it) => (
              <li key={it}><CheckGlyph size={13} /> {it}</li>
            ))}
          </ul>

          <div className="pd-actions" data-reveal data-reveal-delay="3">
            <a href={waLink(product)} target="_blank" rel="noopener noreferrer" className="sn-btn sn-btn--primary sn-btn--lg" data-magnetic onClick={playClick}>
              Beli via WhatsApp <ArrowRight size={13} />
            </a>
            <span className="pd-format">{product.format}</span>
          </div>
        </div>
      </section>

      <section className="pd-how">
        <div className="sn-container">
          <span className="sn-mono sn-mono--12" data-reveal>CARA BELINYA</span>
          <ol className="pd-steps">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="pd-step" data-reveal data-reveal-delay={i}>
                <span className="pd-step__no">{String(i + 1).padStart(2, '0')}</span>
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sn-container pd-related">
        <div className="pd-related__head" data-reveal>
          <h2 className="sn-display pd-related__title">Mungkin lo juga butuh.</h2>
          <Link to="/produk-digital" className="sn-link-underline" onClick={playClick}>
            <ArrowLeft size={12} /> Semua produk
          </Link>
        </div>
        <div className="pd-related__grid">
          {related.map((p, i) => (
            <Link key={p.id} to={`/produk-digital/${p.id}`} className="sn-card pd-rel" onClick={playClick} data-tilt="5" data-spotlight data-reveal data-reveal-delay={i}>
              <div className="dp-mock">
                <div className="dp-mock__plane">
                  <div className="dp-mock__head"><span>{p.tag}</span></div>
                  <Mock p={p} />
                </div>
              </div>
              <span className="sn-mono">{p.catLabel}</span>
              <span className="sn-display pd-rel__title">{p.title}</span>
              <span className="pd-rel__foot"><b>{rupiah(p.price)}</b> <ArrowUpRight size={12} /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
