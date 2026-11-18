import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import PriceCalculator from '../components/PriceCalculator';
import Pricing from '../components/Pricing';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconWhatsApp, IconArrowRight } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function PricingPage() {
  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Saya ingin konsultasi estimasi anggaran untuk proyek desain/website di Studio Supernova.'
  )}`;

  return (
    <div className="page-pricing human-page-wrap">
      <div className="container">
        <Breadcrumb items={[{ label: 'Harga & Estimasi' }]} />
      </div>

      {/* Hero Header */}
      <section className="pricing-header-section">
        <div className="container">
          <div className="pricing-header-content">
            <div className="zine-sticker-tag" style={{ '--sticker-rot': '-1deg' }}>
              <span className="zine-dot-pulse" />
              <span>TRANSPARANSI BIAYA &bull; TANPA BIAYA SILUMAN</span>
            </div>
            <h1 className="pricing-main-title">
              Kalkulator estimasi biaya, <br />
              <span className="title-serif-accent">jelas dan terukur sejak awal.</span>
            </h1>
            <p className="pricing-main-lead">
              Pilih jenis layanan, tentukan jumlah halaman/slide atau kompleksitas fitur yang Anda inginkan, dan dapatkan perkiraan biaya investasi secara real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Price Calculator */}
      <PriceCalculator />

      {/* Standard Studio Packages Table */}
      <section className="section py-small">
        <div className="container">
          <div className="section-header-editorial">
            <span className="section-index-tag">PAKET POPULER</span>
            <h2 className="section-heading-fraunces">
              Pilihan paket standar <span className="heading-italic">paling sering dipesan.</span>
            </h2>
            <p className="section-subtext">
              Jika Anda lebih menyukai paket terima beres tanpa harus memilih komponen satu per satu.
            </p>
          </div>

          <Pricing />
        </div>
      </section>

      {/* Pricing Policy Receipt */}
      <section className="section py-small">
        <div className="container">
          <div className="zine-guarantee-receipt">
            <div className="receipt-header">
              <span className="receipt-mono">KEBIJAKAN KEUANGAN STUDIO</span>
              <span className="receipt-stamp">TRANSPARAN</span>
            </div>
            <ul className="receipt-list">
              <li>
                <span className="receipt-num">01</span>
                <span><strong>Sistem Pembayaran Bertahap:</strong> Uang muka (DP) 50% untuk mengamankan slot pengerjaan, dan pelunasan 50% dilakukan setelah hasil selesai Anda review dan setujui.</span>
              </li>
              <li>
                <span className="receipt-num">02</span>
                <span><strong>100% Hak Milik Master File:</strong> Begitu pelunasan selesai, seluruh file sumber mentah (.PPTX, source code web, atau file vektor) diserahkan ke Anda tanpa watermark.</span>
              </li>
              <li>
                <span className="receipt-num">03</span>
                <span><strong>Invoice Resmi:</strong> Kami menyediakan tanda terima pembayaran dan invoice resmi untuk keperluan reimbursement kantor atau laporan keuangan UMKM Anda.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final Action */}
      <section className="section final-cta-section">
        <div className="container">
          <div className="final-cta-card zine-cta-box">
            <h2 className="cta-title">Punya Anggaran Khusus yang Ingin Disesuaikan?</h2>
            <p className="cta-desc">
              Kebutuhan tiap bisnis berbeda. Bicarakan anggaran yang Anda miliki dengan Min Cham, kami akan aturkan cakupan kerja yang paling pas dan berdampak maksimal.
            </p>
            <div className="cta-actions-group">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                onClick={() => playClick()}
              >
                <IconWhatsApp size={18} />
                <span>Konsultasi Anggaran via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
