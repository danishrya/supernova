import React from 'react';
import { IconCheck, IconArrowRight, IconLayers, IconPalette, IconBolt } from './Icons';
import { Link } from 'react-router-dom';

export default function InteractiveVideoDemo() {
  const pillars = [
    {
      icon: IconLayers,
      num: '01',
      title: 'Storytelling & Pitch Deck',
      subtitle: 'Memikat Investor & Menangkan Tender',
      desc: 'Bukan sekadar slide yang rapi. Kami membedah data yang rumit, menyederhanakan grafik angka, dan menyusun narasi persuasif agar audiens langsung menangkap potensi bisnis Anda.',
      points: [
        'Master File PowerPoint (.PPTX) & Keynote 100% Editable',
        'Visualisasi Data & Infografik Kustom Berstandar Investor',
        'Hierarki Informasi yang Jelas & Langsung To The Point',
      ],
      mediaImg: '/assets/images/corporate.jpg',
    },
    {
      icon: IconPalette,
      num: '02',
      title: 'Brand Identity & Visual System',
      subtitle: 'Karakter Kuat yang Tak Lekang Waktu',
      desc: 'Identitas visual yang dirancang untuk membangun rasa percaya. Kami merumuskan logo orisinal, pedoman tipografi tegas, dan materi promosi yang konsisten di semua media.',
      points: [
        'Logo Utama, Monogram & Panduan Palet Warna',
        'Kit Media Sosial Siap Pakai di Canva & Photoshop',
        'File Master Resolusi Tinggi (Vektor AI, SVG & PDF Cetak)',
      ],
      mediaImg: '/assets/images/ecommerce.jpg',
    },
    {
      icon: IconBolt,
      num: '03',
      title: 'Digital & Web Experience',
      subtitle: 'Ringan, Elegan & Buka Kilat di HP',
      desc: 'Website dibangun dengan kode bersih React berperforma tinggi. Loading instan di semua smartphone, langsung terhubung ke WhatsApp bisnis Anda tanpa hambatan.',
      points: [
        'Kecepatan Buka Super Ringan (< 0.5 Detik di Ponsel)',
        'Alur Kontak WhatsApp Otomatis Siap Closing',
        'Kepemilikan Penuh Kode & Akun Domain Anda Sendiri',
      ],
      mediaImg: '/assets/images/devices-showcase.jpg',
    },
  ];

  return (
    <section className="section studio-pillars-section" id="craft">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: 48 }}>
          <span className="section-tag">FILOSOFI STUDIO</span>
          <h2 className="section-title">
            Tiga Disiplin Kreatif. Satu Standar Mutu.
          </h2>
          <p className="section-subtitle">
            Kami tidak menggunakan template instan pasaran. Setiap karya dipikirkan matang dari kekuatan narasi,
            presisi estetika visual, hingga kehandalan teknis saat digunakan.
          </p>
        </div>

        <div className="pillars-cards-grid">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div key={idx} className="pillar-feature-card">
                <div className="pillar-media-frame">
                  <img
                    src={pillar.mediaImg}
                    alt={pillar.title}
                    className="pillar-preview-img"
                    loading="lazy"
                  />
                  <div className="pillar-num-badge">{pillar.num}</div>
                </div>

                <div className="pillar-content-box">
                  <div className="pillar-header-row">
                    <div className="pillar-icon-box">
                      <IconComp size={18} color="#b8933b" />
                    </div>
                    <div>
                      <h3 className="pillar-card-title">{pillar.title}</h3>
                      <span className="pillar-card-sub">{pillar.subtitle}</span>
                    </div>
                  </div>

                  <p className="pillar-card-desc">{pillar.desc}</p>

                  <ul className="pillar-card-points">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx}>
                        <IconCheck size={14} color="#b8933b" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
