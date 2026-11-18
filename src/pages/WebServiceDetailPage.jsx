import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconWhatsApp, IconArrowRight, IconCheck } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function WebServiceDetailPage() {
  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Saya ingin berkonsultasi mengenai pembuatan website/landing page untuk bisnis saya.'
  )}`;

  const deliverables = [
    {
      title: 'Kecepatan Terbuka Kilat (< 0.4 Detik di HP)',
      desc: 'Mayoritas calon pelanggan di Indonesia membuka website lewat smartphone dengan kuota data. Kami optimasi kode dan kompres gambar agar halaman muncul sekejap mata.',
    },
    {
      title: 'Tombol WhatsApp Terintegrasi Otomatis',
      desc: 'Setiap pengunjung yang mengklik tombol akan langsung diarahkan ke chat WhatsApp bisnis Anda dengan pesan pengantar yang sudah otomatis terisi rapi.',
    },
    {
      title: 'Desain Kustom Orisinal (Bukan Template Pasaran)',
      desc: 'Tipografi terkurasi, tata letak asimetris yang elegan, dan hierarki visual yang membimbing mata pengunjung langsung ke penawaran utama Anda.',
    },
    {
      title: '100% Hak Milik Kode & Bebas Biaya Bulanan Berat',
      desc: 'Kami bangun website Anda dengan teknologi modern yang bisa dihosting gratis atau sangat hemat tanpa perlu menyewa server ratusan ribu per bulan.',
    },
    {
      title: 'Garansi Bebas Bug & Pendampingan 30 Hari',
      desc: 'Setelah website tayang, kami tetap mendampingi jika Anda ingin mengubah kontak, teks harga, atau foto produk.',
    },
  ];

  const packages = [
    {
      name: 'Landing Page Kilat (1 Halaman Konversi)',
      time: '3 – 5 Hari Kerja',
      ideal: 'Pelaku UMKM, jualan produk tunggal, jasa freelance, atau kampanye iklan berbayar (Meta Ads / TikTok Ads).',
      highlights: [
        'Hero Menarik dengan Copywriting Tajam',
        'Galeri Produk / Foto Bukti Karya',
        'Tombol Order WhatsApp Melayang',
        'Integrasi Google Analytics & Meta Pixel',
      ],
    },
    {
      name: 'Website Katalog Bisnis & Profil Korporat',
      time: '7 – 10 Hari Kerja',
      ideal: 'Brand fashion, bengkel, klinik, kantor hukum, studio interior, atau perusahaan B2B.',
      highlights: [
        'Multi-halaman (Beranda, Katalog, Tentang, Kontak)',
        'Panel Kelola Konten Sederhana (CMS)',
        'SEO Friendly Terdaftar di Google Search',
        'Panduan Update Produk Mandiri',
      ],
    },
  ];

  return (
    <div className="page-service-detail human-page-wrap">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Layanan', path: '/layanan' },
            { label: 'Pembuatan Website & Landing Page' },
          ]}
        />
      </div>

      {/* Hero Header */}
      <section className="service-detail-hero">
        <div className="container">
          <div className="service-detail-meta-pill">
            <span className="dot-live" />
            <span>LAYANAN 02 &bull; DIGITAL CRAFT</span>
          </div>

          <h1 className="service-detail-title">
            Pembuatan Website &amp; <span className="title-serif-accent">Landing Page Kilat</span>
          </h1>

          <p className="service-detail-lead">
            Website kencang dibuka di HP UMKM, dirancang khusus untuk mengalirkan calon pembeli langsung ke chat WhatsApp Anda tanpa rintangan teknis.
          </p>

          <div className="service-hero-cta-row">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              onClick={() => playClick()}
              data-cursor="Chat"
            >
              <IconWhatsApp size={18} />
              <span>Konsultasi Website via WhatsApp</span>
            </a>

            <Link
              to="/harga"
              className="btn btn-secondary btn-lg"
              onClick={() => playClick()}
            >
              <span>Hitung Estimasi Biaya</span>
              <IconArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Speed & Human Craft Guarantee */}
      <section className="section py-small">
        <div className="container">
          <div className="zine-speed-banner">
            <div className="speed-metric">
              <span className="speed-number">0.38s</span>
              <span className="speed-label">Rata-rata First Contentful Paint</span>
            </div>
            <div className="speed-text">
              <h3>Kenapa Kecepatan Sangat Penting di Indonesia?</h3>
              <p>
                Setiap 1 detik waktu loading yang tertunda membuang lebih dari 30% calon pembeli yang tidak sabar. Kami merakit kode dari awal dengan standar performa ekstrem agar website Anda terbuka seketika bahkan saat koneksi ponsel klien sedang melemah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Checklist */}
      <section className="section deliverables-section">
        <div className="container">
          <div className="section-header-editorial">
            <span className="section-index-tag">DELIVERABLES</span>
            <h2 className="section-heading-fraunces">
              Fasilitas yang Anda peroleh <span className="heading-italic">tanpa biaya tersembunyi.</span>
            </h2>
          </div>

          <div className="deliverables-editorial-list">
            {deliverables.map((item, idx) => (
              <div key={idx} className="deliverable-item-card">
                <div className="deliverable-num">0{idx + 1}</div>
                <div className="deliverable-text">
                  <h3 className="deliverable-title">{item.title}</h3>
                  <p className="deliverable-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section ppt-packages-section">
        <div className="container">
          <div className="section-header-editorial">
            <span className="section-index-tag">STRUKTUR PAKET</span>
            <h2 className="section-heading-fraunces">
              Format website yang <span className="heading-italic">bisa Anda pilih.</span>
            </h2>
          </div>

          <div className="ppt-packages-grid">
            {packages.map((pkg, idx) => (
              <div key={idx} className="ppt-package-box">
                <span className="package-index">FORMAT 0{idx + 1}</span>
                <h3 className="package-name">{pkg.name}</h3>
                <div className="package-meta-row">
                  <span className="meta-badge">Estimasi: {pkg.time}</span>
                </div>
                <p className="package-ideal"><strong>Cocok untuk:</strong> {pkg.ideal}</p>
                <div className="package-specs-list">
                  {pkg.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="spec-item">
                      <IconCheck size={14} color="#10b981" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Halo%20Min%20Cham,%20saya%20tertarik%20dengan%20paket%20website%20${encodeURIComponent(pkg.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-full"
                  onClick={() => playClick()}
                >
                  <span>Diskusikan Rencana Website Ini &rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="section final-cta-section">
        <div className="container">
          <div className="final-cta-card zine-cta-box">
            <h2 className="cta-title">Belum Punya Domain atau Konten Teks?</h2>
            <p className="cta-desc">
              Tenang saja. Kami bisa bantu bantu menyusun draf tulisan penawaran Anda serta memandu pemilihan nama domain yang pas untuk bisnis Anda.
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
                <span>Konsultasi Santai dengan Min Cham</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
