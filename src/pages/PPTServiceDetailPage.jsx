import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconWhatsApp, IconArrowRight, IconCheck } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function PPTServiceDetailPage() {
  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Saya butuh bantuan desain slide presentasi/pitch deck PPT. Mau diskusi jadwal pengerjaan dan materi saya.'
  )}`;

  const deliverables = [
    {
      title: '100% Master File PowerPoint (.PPTX) & Keynote',
      desc: 'Bebas Anda edit kapan saja tanpa perlu software desain rumit. Font, bagan angka, dan warna bisa disesuaikan mandiri.',
    },
    {
      title: 'Struktur Alur Cerita (Storytelling) & Redaksi Teks',
      desc: 'Kami tidak sekadar menempel teks Anda ke template. Kami membedah poin penting agar audiens langsung paham dalam 5 detik pertama tiap slide.',
    },
    {
      title: 'Infografik Visual & Diagram Angka Kustom',
      desc: 'Tabel angka yang membosankan diubah menjadi visual data yang hidup, meyakinkan dewan direksi atau calon investor.',
    },
    {
      title: 'Versi Ekspor PDF Ringan Siap Kirim Email',
      desc: 'File PDF beresolusi tajam namun ukuran file tetap ramah kuota (< 8 MB), siap dilampirkan langsung ke investor tanpa tertolak server.',
    },
    {
      title: 'Garansi Pendampingan Revisi',
      desc: 'Penyesuaian teks, warna, atau urutan slide sampai Anda benar-benar siap dan percaya diri tampil di panggung presentasi.',
    },
  ];

  const packages = [
    {
      name: 'Pitch Deck Investor & Fundraise',
      slides: '15 – 25 Slide',
      time: '3 – 5 Hari Kerja',
      ideal: 'Startup tahap awal, UMKM mencari modal kemitraan, atau presentasi kompetisi bisnis.',
      highlights: ['Problem & Solution Framework', 'Diagram Ukuran Pasar (TAM/SAM/SOM)', 'Tabel Proyeksi Finansial', 'Slide Traction & Tim'],
    },
    {
      name: 'Company Profile & Tender B2B',
      slides: '20 – 40 Slide',
      time: '4 – 7 Hari Kerja',
      ideal: 'Perusahaan logistik, kontraktor, konsultan, pabrik, atau agensi yang bersiap maju tender.',
      highlights: ['Portofolio Proyek & Struktur Armada', 'Bagan Alur SOP & Legalitas Usaha', 'Tata Letak Formal & Berwibawa', 'Versi Siap Cetak Spiral/Hardcover'],
    },
    {
      name: 'Slide Sidang Skripsi & Akademik',
      slides: '10 – 18 Slide',
      time: '1 – 3 Hari Kerja (Kilat)',
      ideal: 'Mahasiswa D3/S1/S2 yang menghadapi sidang seminar proposal, skripsi, atau tesis.',
      highlights: ['Fokus Kerangka Pikir & Metodologi', 'Visualisasi Hasil Uji & Pembahasan', 'Tanpa Animasi Norak/Mengganggu', 'Tarif Ramah Kantong Mahasiswa'],
    },
  ];

  return (
    <div className="page-service-detail human-page-wrap">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Layanan', path: '/layanan' },
            { label: 'Desain Presentasi & Pitch Deck (PPT)' },
          ]}
        />
      </div>

      {/* Hero Header */}
      <section className="service-detail-hero">
        <div className="container">
          <div className="service-detail-meta-pill">
            <span className="dot-live" />
            <span>LAYANAN 01 &bull; SPESIALISASI MIN CHAM</span>
          </div>

          <h1 className="service-detail-title">
            Desain Slide Presentasi &amp; <span className="title-serif-accent">Pitch Deck (PPT)</span>
          </h1>

          <p className="service-detail-lead">
            Slide 40 halaman yang tadinya bikin dosen, klien, atau investor mengantuk—kami bedah ulang susunan narasinya dan kami sulap menjadi senjata visual yang tajam dan berwibawa.
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
              <span>Kirim Draf Slide ke WhatsApp</span>
            </a>

            <Link
              to="/harga"
              className="btn btn-secondary btn-lg"
              onClick={() => playClick()}
            >
              <span>Simulasikan Harga Slide</span>
              <IconArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Before / After Showcase */}
      <section className="section py-small">
        <div className="container">
          <div className="zine-notice-card">
            <span className="notice-tag">BUKTI PERUBAHAN NYATA</span>
            <h3 className="notice-title">Lihat Bagaimana Kami Merestrukturisasi Slide Klien:</h3>
            <p className="notice-desc">
              Geser slider di bawah ini untuk membandingkan slide sebelum kami revisi vs setelah sentuhan Studio Supernova.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Deliverables Checklist */}
      <section className="section deliverables-section">
        <div className="container">
          <div className="section-header-editorial">
            <span className="section-index-tag">DELIVERABLES</span>
            <h2 className="section-heading-fraunces">
              Apa saja yang Anda <span className="heading-italic">terima di tangan?</span>
            </h2>
            <p className="section-subtext">
              Kami tidak menyembunyikan file atau mengunci template. Seluruh hak cipta dan master file sepenuhnya milik Anda.
            </p>
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

      {/* Specific PPT Packages */}
      <section className="section ppt-packages-section">
        <div className="container">
          <div className="section-header-editorial">
            <span className="section-index-tag">PILIHAN KEBUTUHAN</span>
            <h2 className="section-heading-fraunces">
              Tipe presentasi yang biasa <span className="heading-italic">kami tangani.</span>
            </h2>
          </div>

          <div className="ppt-packages-grid">
            {packages.map((pkg, idx) => (
              <div key={idx} className="ppt-package-box">
                <span className="package-index">PAKET 0{idx + 1}</span>
                <h3 className="package-name">{pkg.name}</h3>
                <div className="package-meta-row">
                  <span className="meta-badge">{pkg.slides}</span>
                  <span className="meta-badge">{pkg.time}</span>
                </div>
                <p className="package-ideal"><strong>Cocok untuk:</strong> {pkg.ideal}</p>
                <div className="package-specs-list">
                  {pkg.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="spec-item">
                      <IconCheck size={14} color="#f59e0b" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Halo%20Min%20Cham,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(pkg.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-full"
                  onClick={() => playClick()}
                >
                  <span>Konsultasi Paket Ini &rarr;</span>
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
            <h2 className="cta-title">Slide Anda Besok Harus Ditampilkan?</h2>
            <p className="cta-desc">
              Kami menyediakan jalur pengerjaan ekspres untuk kebutuhan genting. Kirim materi mentahan (Word, catatan tangan, atau slide lama) ke WhatsApp Min Cham sekarang.
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
                <span>Diskusi Langsung dengan Min Cham</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
