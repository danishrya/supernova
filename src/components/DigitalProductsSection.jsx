import React, { useState } from 'react';
import { IconArrowRight, IconCheck, IconWhatsApp, IconClose } from './Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick, playPop } from '../utils/sound';

export default function DigitalProductsSection() {
  const { contactInfo } = useSiteContent();
  const [activePreview, setActivePreview] = useState(null);

  const products = [
    {
      id: 'template-pitch-deck',
      category: 'TEMPLATE PPTX',
      title: 'The Sovereign Pitch Deck — 35 Slide Master PPTX',
      price: 'Rp 149.000',
      badge: 'TERPOPULER',
      desc: 'Template PowerPoint & Keynote standar investor Silicon Valley. Lengkap dengan struktur problem-solution, diagram pasar, dan grafik finansial yang 100% bisa diedit.',
      image: '/assets/images/corporate.jpg',
      specs: [
        '35 Layout Slide 16:9 HD',
        'Master File .PPTX & Keynote',
        'Panduan Penggunaan Font & Warna',
        'Ekspor PDF Siap Cetak',
      ],
      suitableFor: 'Founder Startup, Pelaku Usaha yang Mau Pitching, Mahasiswa Sidang.',
    },
    {
      id: 'template-sosmed-canva',
      category: 'CANVA & FIGMA KIT',
      title: 'Aura Social Identity — 24 Feed & Story Kit',
      price: 'Rp 99.000',
      badge: 'PRAKTIS',
      desc: 'Koleksi template media sosial siap edit di Canva (bahkan akun Canva gratis). Didesain dengan estetika editorial tenang untuk menaikkan trust toko Anda.',
      image: '/assets/images/ecommerce.jpg',
      specs: [
        '12 Template Feed Instagram (1:1 & 4:5)',
        '12 Template Story & Carousel (9:16)',
        'Bisa Diedit Bebas di HP atau Laptop',
        'Panduan Palet Warna & Font Gratis',
      ],
      suitableFor: 'Toko Online, Coffee Shop, Brand Fashion, Jasa Konsultan.',
    },
    {
      id: 'freelance-contract-kit',
      category: 'E-BOOK & DOKUMEN',
      title: 'Freelance & Agency Toolkit: Kontrak, Invoice & Proposal',
      price: 'Rp 79.000',
      badge: 'ANTI-RUGI',
      desc: 'Template draf perjanjian kerja sama hukum sederhana, template invoice otomatis, dan panduan cara negosiasi agar tidak terjebak revisi tanpa batas.',
      image: '/assets/images/cms-tablet.jpg',
      specs: [
        'Draf Kontrak SPK Siap Pakai (.DOCX)',
        'Format Invoice Otomatis (.XLSX)',
        'Checklist Serah Terima Master File',
        'Template Chat Negosiasi Klien Sulit',
      ],
      suitableFor: 'Freelance Desainer, Web Developer, Content Creator.',
    },
    {
      id: 'web-landing-starter',
      category: 'SOURCE CODE REACT',
      title: 'Supernova Fast Landing — Next.js & Tailwind Boilerplate',
      price: 'Rp 199.000',
      badge: 'SPEED < 0.4s',
      desc: 'Source code website landing page satu halaman yang sudah terintegrasi tombol WhatsApp otomatis dan Google Lighthouse skor 99.',
      image: '/assets/images/saas.jpg',
      specs: [
        'Source Code React / Vite Lengkap',
        'Komponen Siap Edit & Modifikasi',
        'Formulir WhatsApp Otomatis',
        'Panduan Deploy Gratis ke Netlify/Vercel',
      ],
      suitableFor: 'Developer, Agensi Pemula, Pemilik Bisnis Tech.',
    },
  ];

  const handleOpenPreview = (product) => {
    playClick();
    setActivePreview(product);
  };

  const getWaUrl = (product) => {
    const text = `Halo Min Cham! Saya ingin beli/tanya produk digital *"${product.title}"* (${product.price}). Bagaimana alur pembelian dan pengiriman file-nya? Terima kasih!`;
    return `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="section digital-products-section" id="produk-digital">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: 44 }}>
          <div className="section-note-pill">
            <span className="section-num">04</span>
            <span>SIAP PAKAI &amp; HEMAT WAKTU</span>
          </div>
          <h2 className="section-title">
            Produk Digital Studio. <span className="highlight-text">Aset Siap Edit Karya Min Cham.</span>
          </h2>
          <p className="section-subtitle">
            Butuh solusi cepat tanpa perlu sewa jasa dari nol? Beli template dan toolkit profesional kami dengan harga terjangkau.
          </p>
        </div>

        {/* Products Grid */}
        <div className="digital-products-grid">
          {products.map((p) => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => handleOpenPreview(p)}
              data-cursor="Lihat"
            >
              <div className="product-media-wrap">
                <img src={p.image} alt={p.title} className="product-thumb" />
                <span className="product-category-tag">{p.category}</span>
                {p.badge && <span className="product-badge-flag">{p.badge}</span>}
              </div>

              <div className="product-card-body">
                <div className="product-price-row">
                  <span className="product-price">{p.price}</span>
                  <span className="product-onetime">Sekali Bayar</span>
                </div>

                <h3 className="product-title">{p.title}</h3>
                <p className="product-desc">{p.desc}</p>

                <div className="product-specs-list">
                  {p.specs.slice(0, 3).map((spec, i) => (
                    <div key={i} className="product-spec-item">
                      <IconCheck size={12} color="#e2b764" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="product-card-footer">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenPreview(p);
                    }}
                  >
                    <span>Detail &amp; Preview</span>
                  </button>
                  <a
                    href={getWaUrl(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    data-cursor="Beli"
                  >
                    <IconWhatsApp size={14} />
                    <span>Beli via WA</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Preview Product */}
        {activePreview && (
          <div
            className="admin-modal-backdrop product-modal-backdrop"
            onClick={() => setActivePreview(null)}
          >
            <div
              className="admin-modal-card product-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <span className="product-category-tag">{activePreview.category}</span>
                  <h3 style={{ marginTop: 4 }}>{activePreview.title}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setActivePreview(null)}
                >
                  <IconClose size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-product-image-box">
                  <img src={activePreview.image} alt={activePreview.title} />
                </div>

                <div className="modal-product-price-highlight">
                  <span className="price-tag">{activePreview.price}</span>
                  <span className="price-sub">Master file langsung dikirim ke WhatsApp / Email Anda</span>
                </div>

                <p className="modal-product-description">{activePreview.desc}</p>

                <div className="modal-product-specs">
                  <h4>Apa yang Anda Dapatkan:</h4>
                  <ul>
                    {activePreview.specs.map((s, idx) => (
                      <li key={idx}>✦ {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-product-target">
                  <strong>Cocok untuk:</strong> {activePreview.suitableFor}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setActivePreview(null)}
                >
                  Tutup
                </button>
                <a
                  href={getWaUrl(activePreview)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onClick={() => playClick()}
                >
                  <IconWhatsApp size={16} />
                  <span>Beli via WhatsApp Sekarang</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
