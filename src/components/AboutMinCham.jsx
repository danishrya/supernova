import React from 'react';
import { IconWhatsApp } from './Icons';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { playClick } from '../utils/sound';

export default function AboutMinCham() {
  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Kami baru saja membaca profil Studio Supernova di website. Mau ngobrol santai untuk konsultasi ide proyek.'
  )}`;

  return (
    <section className="section about-mincham-section" id="tentang">
      <div className="container">
        <div className="about-mincham-grid">
          {/* Left: Min Cham Profile & Avatar Frame */}
          <div className="mincham-visual-card">
            <div className="mincham-avatar-frame">
              <div className="avatar-placeholder-box">
                {/* [ISI: FOTO ASLI MIN CHAM ATAU DOKUMENTASI MEJA KERJA] */}
                <div className="avatar-initial-badge">MC</div>
                <span className="avatar-photo-label">[FOTO MEJA KERJA / MIN CHAM]</span>
              </div>
              <div className="mincham-status-pill">
                <span className="status-live-dot" />
                <span>Founder &amp; Desainer Utama</span>
              </div>
            </div>

            <div className="mincham-contact-pills">
              <span className="contact-badge-pill">📍 Jakarta &bull; Melayani Seluruh Indonesia</span>
              <span className="contact-badge-pill">💬 WhatsApp: {STUDIO_CONFIG.phone}</span>
              <span className="contact-badge-pill">📸 Instagram: {STUDIO_CONFIG.instagram}</span>
              <span className="contact-badge-pill">🎵 TikTok: {STUDIO_CONFIG.tiktok}</span>
            </div>
          </div>

          {/* Right: Personal Manifesto Story */}
          <div className="mincham-story-col">
            <div className="section-index-stamp">
              <span>05 &bull; CERITA DI BALIK STUDIO</span>
            </div>

            <h2 className="section-title">
              Kenapa kami membangun <span className="highlight-text">Studio Supernova?</span>
            </h2>

            <div className="story-paragraphs">
              <p className="lead-text">
                "Halo! Saya <strong>Min Cham</strong>. Studio Supernova didirikan karena kami sering melihat pemilik bisnis kecil, mahasiswa, dan founder lokal yang kesulitan merapikan materi presentasi atau website mereka, lalu terjebak menggunakan template instan yang kaku dan tidak memikat audiens."
              </p>

              <p>
                Bagi kami, desain yang baik tidak harus rumit atau penuh ornamen berlebihan. Kuncinya sederhana: <strong>hierarki visual yang jelas, tipografi yang nyaman dibaca, dan pesan yang langsung dipahami audiens dalam beberapa detik pertama</strong>.
              </p>

              <p>
                Di Supernova, kamu tidak berhadapan dengan sales perantara atau birokrasi berbelit. Kamu berkomunikasi langsung dengan saya — orang yang menyusun grid, memoles tipografi, dan memastikan materi kamu siap tampil percaya diri.
              </p>
            </div>

            {/* 3 Principles */}
            <div className="mincham-principles-grid">
              <div className="principle-card">
                <div className="principle-num">01</div>
                <h4>Tanpa Template Asal Jadi</h4>
                <p>Setiap slide dan baris kode dirancang dengan logika estetika manusia serta kebutuhan nyata audiens kamu.</p>
              </div>

              <div className="principle-card">
                <div className="principle-num">02</div>
                <h4>Master File Milik Kamu 100%</h4>
                <p>Tidak ada format yang disandera. File PPTX, vektor SVG, atau source code diserahkan penuh untuk kebebasan mandiri kamu.</p>
              </div>

              <div className="principle-card">
                <div className="principle-num">03</div>
                <h4>Komunikasi Santai Tapi Tuntas</h4>
                <p>Konsultasi lewat WhatsApp seperti rekan kerja sendiri. Bebas diskusi tanpa bahasa korporat yang kaku.</p>
              </div>
            </div>

            <div className="mincham-action-row">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                onClick={() => playClick()}
                data-cursor="Chat"
              >
                <IconWhatsApp size={16} />
                <span>Konsultasi Langsung dengan Min Cham</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
