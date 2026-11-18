import React, { useState } from 'react';
import { IconCheck, IconArrowRight, IconClose, IconWhatsApp } from './Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick, playPop } from '../utils/sound';

export default function ServiceCardsExpanded({ onSelectPackage }) {
  const { contactInfo } = useSiteContent();
  const [expandedId, setExpandedId] = useState(null);

  const services = [
    {
      id: 'ppt',
      num: '01',
      title: 'Desain Presentasi & Pitch Deck (PPT)',
      shortDesc:
        'Mengubah materi mentahan (Word, PDF, atau slide kaku) menjadi presentasi visual berkelas yang siap memikat investor, dewan direksi, dan dosen penguji.',
      tags: ['16:9 Widescreen', '100% Editable .PPTX', 'Infografik Visual'],
      deliverables: [
        'Master File .PPTX & Keynote (100% bisa diedit teks, warna, dan grafiknya)',
        'Penyusunan alur narasi persuasif (Storytelling problem-solution)',
        'Grafik data & bagan visual kustom (Bukan tabel excel mentahan)',
        'Versi PDF resolusi tinggi siap cetak atau dibagikan via email',
        'Garansi revisi fleksibel hingga presentasi siap tayang',
      ],
      timeline: 'Normal: 3 – 5 Hari Kerja &bull; ⚡ Express: 48 Jam Prioritas',
      idealFor: 'Founder Startup mencari pendanaan, Proposal Tender Bisnis, Slide Sidang Tesis Mahasiswa.',
      sampleCase: 'Nexus Capital: Dari 40 slide padat teks diringkas jadi 18 slide tajam, sukses raih pendanaan $1.8M.',
    },
    {
      id: 'web',
      num: '02',
      title: 'Pembuatan Website & Landing Page',
      shortDesc:
        'Website kencang (Google Lighthouse 95+), ramah smartphone, dan dirancang khusus untuk mengalirkan calon pembeli langsung ke nomor WhatsApp bisnis Anda.',
      tags: ['Loading < 0.4 Detik', 'Alur WhatsApp Otomatis', 'Ramah Smartphone'],
      deliverables: [
        'Desain kustom tanpa template pasaran yang berat',
        'Formulir konsultasi yang langsung memformat pesan rapi ke WhatsApp',
        'Bantuan pendaftaran domain .com & cloud hosting super cepat',
        'Pendaftaran resmi ke Google Search Console & SEO lokal',
        'Panel admin mandiri (opsional) agar bisa update teks & foto sendiri',
      ],
      timeline: 'Normal: 5 – 7 Hari Kerja &bull; ⚡ Express: 72 Jam',
      idealFor: 'Pemilik UMKM lokal, Portofolio Freelance, Jasa Profesional, Bisnis F&B dan Retail.',
      sampleCase: 'Architekton Studio: Website dibuka dalam 0.3 detik di HP, menghasilkan 42 chat konsultasi di minggu pertama.',
    },
    {
      id: 'branding',
      num: '03',
      title: 'Produk Digital & Identitas Brand',
      shortDesc:
        'Paket visual terpadu agar bisnis Anda terlihat seperti brand terpercaya kelas atas, lengkap dengan template harian yang bisa Anda edit sendiri di Canva.',
      tags: ['Master Vektor .AI / .SVG', 'Template Siap Edit Canva', 'Brand Guidelines'],
      deliverables: [
        'Logo utama berfilosofi tajam, logo sekunder, dan monogram',
        'Brand guideline resmi (kode warna HEX/RGB/CMYK dan tipografi)',
        'Template postingan media sosial (Feed & Story) siap pakai di Canva',
        'Master berkas vektor resolusi tak terbatas (.AI, .EPS, .SVG, .PNG transparan)',
        'Dokumen panduan cara penggunaan aset agar tidak keliru',
      ],
      timeline: 'Normal: 4 – 6 Hari Kerja',
      idealFor: 'Brand yang ingin naik kelas, Toko Online Baru, Brand Fashion & Kuliner.',
      sampleCase: 'Aura Artisan Coffee: Rebranding kemasan dan feed medsos menghasilkan kenaikan penjualan retail +65%.',
    },
  ];

  const handleMouseMove3D = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(900px) rotateX(${-(y / rect.height) * 10}deg) rotateY(${(x / rect.width) * 10}deg) translateY(-4px)`;
  };

  const handleMouseLeave3D = (e) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const handleCardClick = (service) => {
    playClick();
    setExpandedId(service.id);
  };

  const activeService = services.find((s) => s.id === expandedId);

  const getWaUrl = (service) => {
    const text = `Halo Min Cham! Saya tertarik untuk konsultasi layanan *"${service.title}"*. Kapan ada waktu luang untuk ngobrol santai? Terima kasih!`;
    return `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="section services-expanded-section" id="layanan">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: 44 }}>
          <div className="section-note-pill">
            <span className="section-num">01</span>
            <span>LAYANAN UTAMA KARYA MIN CHAM</span>
          </div>
          <h2 className="section-title">
            Fokus Pada Hal yang Benar-Benar <span className="highlight-text">Membawa Hasil.</span>
          </h2>
          <p className="section-subtitle">
            Kami tidak menjual puluhan paket membingungkan. Tiga layanan inti ini kami sempurnakan agar memberikan dampak terbesar bagi bisnis Anda.
          </p>
        </div>

        {/* 3D Interactive Cards Grid */}
        <div className="services-3d-grid">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="service-card-3d"
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              onClick={() => handleCardClick(srv)}
              data-cursor="Lihat"
            >
              <div className="card-top-bar">
                <span className="srv-number">{srv.num}</span>
                <span className="srv-expand-hint">Klik untuk Detail +</span>
              </div>

              <h3 className="srv-card-title">{srv.title}</h3>
              <p className="srv-card-desc">{srv.shortDesc}</p>

              <div className="srv-tags-row">
                {srv.tags.map((tag, idx) => (
                  <span key={idx} className="srv-tag-chip">✦ {tag}</span>
                ))}
              </div>

              <div className="srv-card-bottom">
                <button
                  type="button"
                  className="srv-detail-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(srv);
                  }}
                >
                  <span>Buka Rincian &amp; Studi Kasus</span>
                  <IconArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Expanded Detail */}
        {activeService && (
          <div
            className="admin-modal-backdrop service-detail-backdrop"
            onClick={() => setExpandedId(null)}
          >
            <div
              className="admin-modal-card service-detail-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <span className="section-num">{activeService.num} &bull; DETAIL LAYANAN</span>
                  <h3 style={{ marginTop: 4 }}>{activeService.title}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setExpandedId(null)}
                >
                  <IconClose size={20} />
                </button>
              </div>

              <div className="modal-body">
                <p className="service-modal-lead">{activeService.shortDesc}</p>

                <div className="service-modal-box">
                  <h4>Apa yang Anda Dapatkan (Deliverables):</h4>
                  <ul className="service-deliverables-list">
                    {activeService.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <IconCheck size={14} color="#e2b764" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-meta-row">
                  <div className="meta-block">
                    <span className="meta-lbl">ESTIMASI WAKTU:</span>
                    <span
                      className="meta-val"
                      dangerouslySetInnerHTML={{ __html: activeService.timeline }}
                    />
                  </div>
                  <div className="meta-block">
                    <span className="meta-lbl">COCOK UNTUK:</span>
                    <span className="meta-val">{activeService.idealFor}</span>
                  </div>
                </div>

                <div className="service-case-highlight">
                  <span className="case-badge">BUKTI KASUS NYATA:</span>
                  <p>{activeService.sampleCase}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setExpandedId(null)}
                >
                  Tutup
                </button>
                <a
                  href={getWaUrl(activeService)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onClick={() => playClick()}
                >
                  <IconWhatsApp size={16} />
                  <span>Konsultasikan Layanan Ini via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
