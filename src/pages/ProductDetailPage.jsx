import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconArrowRight, IconWhatsApp, IconCheck } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = STUDIO_CONFIG.digitalProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="page-product-detail human-page-wrap">
        <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h1 className="notfound-title">Produk Tidak Ditemukan</h1>
          <p className="notfound-desc">
            Produk digital yang Anda cari tidak tersedia atau tautannya sudah diperbarui.
          </p>
          <Link to="/produk-digital" className="btn btn-primary" onClick={() => playClick()}>
            <span>Kembali ke Katalog Produk Digital &rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const waBuyUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Halo Min Cham! Saya ingin membeli produk digital "${product.title}" (${formatRupiah(product.priceRp)}). Mohon arahan nomor rekening dan akses unduhnya.`
  )}`;

  return (
    <div className="page-product-detail human-page-wrap">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Produk Digital', path: '/produk-digital' },
            { label: product.title },
          ]}
        />
      </div>

      {/* Hero Showcase */}
      <section className="product-detail-hero">
        <div className="container">
          <div className="product-detail-layout">
            {/* Left: Media Preview */}
            <div className="product-media-column">
              <div className="product-image-frame">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-main-img"
                />
                <span className="product-corner-badge">{product.badge}</span>
              </div>
            </div>

            {/* Right: Info & Purchase Action */}
            <div className="product-info-column">
              <span className="product-meta-category">{product.category}</span>
              <h1 className="product-title-fraunces">{product.title}</h1>
              <p className="product-lead-desc">{product.desc}</p>

              <div className="product-price-box">
                <span className="price-tag-label">INVESTASI SEKALI:</span>
                <span className="price-tag-amount">{formatRupiah(product.priceRp)}</span>
                <span className="price-tag-sub">✦ Tanpa langganan bulanan &bull; Akses selamanya</span>
              </div>

              <div className="product-specs-box">
                <h3 className="specs-title">Apa Saja yang Anda Dapatkan?</h3>
                <ul className="specs-items-list">
                  {product.specs.map((sp, idx) => (
                    <li key={idx}>
                      <IconCheck size={16} color="#10b981" />
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-context-row">
                <div className="context-item">
                  <span className="context-label">Cocok Untuk:</span>
                  <span className="context-val">{product.suitableFor}</span>
                </div>
                <div className="context-item">
                  <span className="context-label">Format File:</span>
                  <span className="context-val">{product.fileFormat}</span>
                </div>
              </div>

              <div className="product-actions-bar">
                <a
                  href={waBuyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg btn-full"
                  onClick={() => playClick()}
                >
                  <IconWhatsApp size={18} />
                  <span>Beli Sekarang via WhatsApp ({formatRupiah(product.priceRp)})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
