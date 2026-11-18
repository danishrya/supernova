import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import AboutMinCham from '../components/AboutMinCham';
import InteractiveTimeline from '../components/InteractiveTimeline';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconArrowRight, IconWhatsApp } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function AboutPage() {
  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Saya baru membaca halaman Tentang Studio Supernova dan ingin ngobrol santai mengenai rencana proyek.'
  )}`;

  const manifestoItems = [
    {
      num: '01',
      title: 'Bicara Langsung dengan Pembuatnya',
      desc: 'Di banyak agensi besar, brief Anda berpindah dari sales ke account manager, lalu ke project manager, baru ke desainer magang. Di Studio Supernova, Anda bicara langsung dengan Min Cham. Satu kepala, satu visi, tanpa distorsi pesan.',
    },
    {
      num: '02',
      title: 'Tidak Ada Template Curian atau AI Slop',
      desc: 'Kami muak melihat ribuan website dan slide yang bentuknya seragam: font generik yang sama, tombol gradien ungu-biru yang sama, dan ilustrasi orang kartun korporat yang kaku. Setiap karya kami rancang dengan tipografi pilihan dan grid asimetris yang bernyawa.',
    },
    {
      num: '03',
      title: '100% Hak Milik Master File',
      desc: 'Bagi kami, menahan master file klien atau meminta uang tebusan untuk file mentah adalah praktik kuno yang tidak jujur. Setelah pelunasan, Anda menerima file .PPTX, file vektor SVG, atau source code bersih seutuhnya.',
    },
    {
      num: '04',
      title: 'Cepat & Ramah Kuota Ponsel',
      desc: 'Sebagus apa pun desain Anda, jika membutuhkan waktu 5 detik untuk loading di HP klien, mereka sudah keburu menutup tab. Kami mengoptimasi setiap baris kode dan aset gambar agar seringan mungkin di jaringan internet Indonesia.',
    },
  ];

  const toolsStack = [
    { category: 'Desain Presentasi', tools: 'Microsoft PowerPoint 365, Apple Keynote, Adobe Illustrator' },
    { category: 'UI & Web Development', tools: 'Figma, React, Vite, Tailwind CSS, Netlify, VS Code' },
    { category: 'Aset Digital & Dokumen', tools: 'Canva Pro, Google Docs, Notion, Markdown' },
    { category: 'Komunikasi Kerja', tools: 'WhatsApp Business (Utama), Google Meet, Email' },
  ];

  return (
    <div className="page-about human-page-wrap">
      <div className="container">
        <Breadcrumb items={[{ label: 'Tentang Studio' }]} />
      </div>

      {/* Hero Header */}
      <section className="about-header-section">
        <div className="container">
          <div className="about-header-content">
            <div className="zine-sticker-tag" style={{ '--sticker-rot': '-1.2deg' }}>
              <span className="zine-dot-pulse" />
              <span>MANIFESTO STUDIO &bull; DIBUAT DENGAN TANGAN</span>
            </div>
            <h1 className="about-main-title">
              Cerita di balik layar, <br />
              <span className="title-serif-accent">kenapa studio ini kami bangun.</span>
            </h1>
            <p className="about-main-lead">
              Studio Supernova lahir dari kegelisahan melihat betapa banyaknya pengusaha UMKM, mahasiswa, dan pemilik brand di Indonesia yang terjebak template kaku atau janji manis agensi yang lamban.
            </p>
          </div>
        </div>
      </section>

      {/* Main Min Cham Story Component */}
      <AboutMinCham />

      {/* Studio Manifesto */}
      <section className="section manifesto-section">
        <div className="container">
          <div className="section-header-editorial">
            <span className="section-index-tag">PRINSIP KERJA</span>
            <h2 className="section-heading-fraunces">
              Empat janji yang kami pegang <span className="heading-italic">di setiap proyek.</span>
            </h2>
          </div>

          <div className="manifesto-grid">
            {manifestoItems.map((item) => (
              <div key={item.num} className="manifesto-card">
                <span className="manifesto-num">{item.num}</span>
                <h3 className="manifesto-title">{item.title}</h3>
                <p className="manifesto-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Process / Workflow */}
      <InteractiveTimeline />

      {/* Workbench & Tools Spec */}
      <section className="section tools-workbench-section">
        <div className="container">
          <div className="workbench-card">
            <div className="workbench-header">
              <span className="workbench-mono">PERANGKAT &bull; WORKBENCH SETUP</span>
              <span className="workbench-badge">UPDATED 2026</span>
            </div>
            <h3 className="workbench-title">Alat yang Kami Gunakan untuk Berkarya:</h3>
            <div className="workbench-grid">
              {toolsStack.map((ts, idx) => (
                <div key={idx} className="workbench-item">
                  <span className="workbench-cat">{ts.category}</span>
                  <span className="workbench-tools">{ts.tools}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="section final-cta-section">
        <div className="container">
          <div className="final-cta-card zine-cta-box">
            <h2 className="cta-title">Mau Kenal Lebih Dekat atau Tanya-Tanya Dulu?</h2>
            <p className="cta-desc">
              Pintu studio selalu terbuka. Min Cham siap berdiskusi santai tentang ide, rencana bisnis, atau kendala desain yang sedang Anda hadapi.
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
                <span>Ngobrol Santai dengan Min Cham</span>
              </a>

              <Link to="/layanan" className="btn btn-secondary btn-lg" onClick={() => playClick()}>
                <span>Lihat Layanan Studio &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
