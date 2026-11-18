import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconArrowRight, IconWhatsApp } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function DigitalProductsPage() {
  const products = STUDIO_CONFIG.digitalProducts;

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="page-digital-products human-page-wrap">
      <div className="container">
        <Breadcrumb items={[{ label: 'Produk Digital' }]} />
      </div>

      {/* Header Banner */}
      <section className="digital-header-section">
        <div className="container">
          <div className="digital-header-content">
            <div className="zine-sticker-tag" style={{ '--sticker-rot': '1.2deg' }}>
              <span className="zine-dot-pulse" />
              <span>SIAP PAKAI &bull; UNDUH INSTAN</span>
            </div>
            <h1 className="digital-main-title">
              Katalog Template &amp; <br />
              <span className="title-serif-accent">Produk Digital Studio</span>
            </h1>
            <p className="digital-main-lead">
              Aset desain praktis, template slide terstruktur, draf kontrak freelance, dan source code website siap modifikasi. Dibuat langsung dengan standar studio profesional tanpa langganan mahal.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="section digital-catalog-section">
        <div className="container">
          <div className="digital-products-grid">
            {products.map((item) => {
              const waBuyUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Halo Min Cham! Saya ingin memesan produk digital "${item.title}" (${formatRupiah(item.priceRp)}). Mohon petunjuk pembayarannya.`
              )}`;

              return (
                <article key={item.id} className="digital-product-card">
                  <div className="card-product-top">
                    <span className="card-category-tag">{item.category}</span>
                    <span className="card-badge-pill">{item.badge}</span>
                  </div>

                  <Link to={`/produk-digital/${item.slug}`} className="card-media-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-product-img"
                      loading="lazy"
                    />
                    <div className="card-hover-overlay">
                      <span>Buka Rincian Produk &rarr;</span>
                    </div>
                  </Link>

                  <div className="card-product-body">
                    <h3 className="card-product-title">
                      <Link to={`/produk-digital/${item.slug}`} onClick={() => playClick()}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="card-product-desc">{item.desc}</p>

                    <div className="card-specs-list">
                      {item.specs.slice(0, 3).map((sp, idx) => (
                        <div key={idx} className="spec-bullet">
                          <span>✦</span>
                          <span>{sp}</span>
                        </div>
                      ))}
                    </div>

                    <div className="card-price-row">
                      <div className="price-block">
                        <span className="price-label">INVESTASI SEKALI:</span>
                        <span className="price-value">{formatRupiah(item.priceRp)}</span>
                      </div>
                    </div>

                    <div className="card-actions-row">
                      <Link
                        to={`/produk-digital/${item.slug}`}
                        className="btn btn-secondary btn-full"
                        onClick={() => playClick()}
                      >
                        <span>Lihat Rincian</span>
                      </Link>

                      <a
                        href={waBuyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-full"
                        onClick={() => playClick()}
                      >
                        <IconWhatsApp size={16} />
                        <span>Beli Cepat via WA</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="section py-small">
        <div className="container">
          <div className="zine-notice-card">
            <span className="notice-tag">GARANSI PENGGUNAAN</span>
            <h3 className="notice-title">Semua File 100% Bisa Dimodifikasi Penuh</h3>
            <p className="notice-desc">
              Setelah pembayaran diverifikasi lewat WhatsApp, Anda langsung menerima tautan unduhan Google Drive / file master resmi lengkap beserta panduan cara editnya. Tanpa watermark, tanpa batasan royalti.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
