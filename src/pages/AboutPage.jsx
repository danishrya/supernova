import React from 'react';
import { Link } from 'react-router-dom';
import Process from '../components/Process';
import {
  IconCheck,
  IconShield,
  IconArrowRight,
  IconLayers,
  IconBolt,
  IconPalette,
} from '../components/Icons';

export default function AboutPage() {
  const principles = [
    {
      num: '01',
      title: 'Clarity Over Clutter',
      desc: 'Desain yang kuat selalu berakar pada kejelasan pesan. Kami membuang ornamen yang tidak perlu dan fokus mempertajam apa yang paling ingin disampaikan kepada audiens.',
    },
    {
      num: '02',
      title: 'Obsesi pada Tipografi & Hierarki',
      desc: 'Setiap ukuran font, jarak antar-elemen (spacing), dan kontras warna dipilih dengan cermat agar nyaman dibaca dan membangun wibawa visual sejak detik pertama.',
    },
    {
      num: '03',
      title: 'Clean Craft & 100% Hak Milik',
      desc: 'Kami tidak menggunakan template instan atau aset generik. Seluruh master file (.PPTX editable, vektor AI/SVG, atau kode web) dirancang orisinal dan diserahkan penuh menjadi aset bisnis Anda.',
    },
    {
      num: '04',
      title: 'Kolaborasi Langsung Tanpa Perantara',
      desc: 'Anda berkomunikasi langsung dengan desainer dan teknisi yang memegang kendali atas proyek Anda, memastikan brief diterjemahkan secara presisi dan efisien.',
    },
  ];

  const teamMembers = [
    {
      name: 'Aditya Wirawan',
      role: 'Principal Digital & Web Architect',
      exp: '10+ Tahun Rekayasa Web & Bisnis',
      bio: 'Fokus merancang arsitektur website modern berperforma tinggi yang memuat instan di ponsel dan memberikan konversi nyata bagi bisnis.',
      skills: ['Arsitektur Web Modern', 'Performa Kilat (< 0.5s)', 'Keamanan Sistem', 'Integrasi WhatsApp'],
    },
    {
      name: 'Clarissa Valerie',
      role: 'Lead Presentation & Pitch Deck Designer',
      exp: '8+ Tahun Komunikasi Visual & Deck',
      bio: 'Spesialis dalam merancang slide presentasi PowerPoint dan Keynote berstandar investor yang persuasif, terstruktur, dan elegan.',
      skills: ['Slide Pitch Deck', 'Infografik Visual', 'Alur Storytelling', 'Master PPTX Editable'],
    },
    {
      name: 'Fakhri Ramadhan',
      role: 'Creative Director & Brand Identity Specialist',
      exp: '9+ Tahun Identitas Visual & Grafis',
      bio: 'Membangun identitas visual berwibawa mulai dari filosofi logo, palet warna, tipografi, hingga kemasan dan materi promosi siap cetak.',
      skills: ['Desain Logo Orisinal', 'Brand Guidelines', 'Social Media Kit', 'Materi Cetak HD'],
    },
  ];

  return (
    <div className="page-about">
      {/* Header Banner */}
      <section className="page-header-section">
        <div className="container">
          <div className="page-header-box text-center">
            <span className="section-tag">TENTANG SUPERNOVA STUDIO</span>
            <h1 className="page-main-title">
              Studio Desain &amp; Digital Independen <br />
              Untuk Brand yang Ingin Tampil Beda.
            </h1>
            <p className="page-main-subtitle">
              Supernova Studio didirikan untuk menjadi mitra kreatif &amp; teknologi terpercaya bagi para founder,
              korporasi, dan brand modern. Kami merancang slide presentasi pitch deck investor, identitas visual brand,
              dan website modern dengan standar estetika internasional.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Manifesto */}
      <section className="section manifesto-section">
        <div className="container">
          <div className="manifesto-card">
            <div className="manifesto-header">
              <div className="manifesto-coin-badge">
                <img
                  src="/assets/images/supernova-logo.jpg"
                  alt="Supernova Emblem"
                  className="manifesto-logo-img"
                />
              </div>
              <div>
                <span className="section-tag" style={{ margin: 0, marginBottom: 6 }}>FILOSOFI KERJA</span>
                <h3>Setiap Touchpoint Adalah Etalase Reputasi Bisnis Anda</h3>
              </div>
            </div>
            <div className="manifesto-content">
              <div className="manifesto-lead-note">
                <IconShield size={18} color="#b8933b" />
                <span>
                  <strong>Komitmen Mutu Supernova:</strong> Kami tidak pernah memakai template instan yang membosankan. Setiap website, slide presentasi, dan materi visual dirancang eksklusif, terarah, dan diserahkan lengkap dengan master file editable.
                </span>
              </div>
              <div className="manifesto-points-grid">
                <div className="m-point">
                  <span className="m-point-icon">
                    <IconCheck size={16} color="#b8933b" />
                  </span>
                  <div>
                    <strong>Penyusunan Alur Narasi</strong>
                    <p>Membantu merapikan bahan mentah menjadi alur cerita yang persuasif dan mudah dipahami.</p>
                  </div>
                </div>
                <div className="m-point">
                  <span className="m-point-icon">
                    <IconCheck size={16} color="#b8933b" />
                  </span>
                  <div>
                    <strong>Slide PPT Siap Presentasi</strong>
                    <p>Desain slide 16:9 HD dengan grafik rapi yang membuat audiens dan investor langsung terkesan.</p>
                  </div>
                </div>
                <div className="m-point">
                  <span className="m-point-icon">
                    <IconCheck size={16} color="#b8933b" />
                  </span>
                  <div>
                    <strong>Website Cepat &amp; Responsif</strong>
                    <p>Website terbuka instan di ponsel tanpa lag, terhubung langsung ke WhatsApp tim Anda.</p>
                  </div>
                </div>
                <div className="m-point">
                  <span className="m-point-icon">
                    <IconCheck size={16} color="#b8933b" />
                  </span>
                  <div>
                    <strong>Garansi &amp; Master File</strong>
                    <p>Master file editable (.PPTX, vektor AI/SVG, kode web) 100% menjadi aset milik bisnis Anda.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Guiding Principles (Replacing AI Comparison Matrix) */}
      <section className="section principles-section">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: 44 }}>
            <span className="section-tag">PRINSIP KERJA KAMI</span>
            <h2 className="section-title">Nilai yang Menjadi Landasan Setiap Karya</h2>
            <p className="section-subtitle">
              Pendekatan kami dalam mengeksekusi setiap proyek desain dan digital untuk menjamin hasil yang bertahan lama.
            </p>
          </div>

          <div className="principles-grid">
            {principles.map((pr, idx) => (
              <div key={idx} className="principle-card">
                <span className="principle-number">{pr.num}</span>
                <h3 className="principle-title">{pr.title}</h3>
                <p className="principle-desc">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Senior Team */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">TIM STUDIO</span>
            <h2 className="section-title">Ditangani Langsung oleh Praktisi Berpengalaman</h2>
            <p className="section-subtitle">
              Anda berdiskusi langsung dengan tim berpengalaman yang mengutamakan komunikasi lugas,
              transparan, dan mudah dipahami tanpa birokrasi berbelit.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-header">
                  <div className="team-avatar-box">
                    <span className="avatar-initials">{member.name.charAt(0)}</span>
                  </div>
                  <div className="team-title-box">
                    <h4>{member.name}</h4>
                    <span className="team-role">{member.role}</span>
                    <span className="team-exp">{member.exp}</span>
                  </div>
                </div>
                <p className="team-bio">{member.bio}</p>
                <div className="team-skills">
                  {member.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="team-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <Process />

      {/* Bottom CTA */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <span className="cta-banner-tag">KONSULTASI AWAL</span>
              <h2>Ingin Berdiskusi Mengenai Kebutuhan Bisnis Anda?</h2>
              <p>
                Ceritakan kebutuhan Anda — baik Desain Slide Presentasi (PPT), Pembuatan Website, maupun Identitas Visual Brand. Tim kami siap memberikan masukan dan rekomendasi solusi kustom terbaik.
              </p>
              <div className="cta-banner-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <span>Chat WhatsApp Kami Sekarang</span>
                  <IconArrowRight size={16} />
                </Link>
                <Link to="/catalog" className="btn btn-secondary btn-lg">
                  <span>Lihat Contoh Portofolio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
