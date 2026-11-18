import React from 'react';
import { IconCheck, IconWhatsApp, IconArrowRight } from './Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick } from '../utils/sound';

export default function AboutMinCham() {
  const { contactInfo } = useSiteContent();

  const waUrl = `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${encodeURIComponent(
    'Halo Min Cham! Saya baru saja membaca profil Anda di website Supernova. Mau ngobrol santai untuk konsultasi ide proyek.'
  )}`;

  return (
    <section className="section about-mincham-section" id="tentang">
      <div className="container">
        <div className="about-mincham-grid">
          {/* Left: Min Cham Profile & Photo / Avatar Card */}
          <div className="mincham-visual-card">
            <div className="mincham-avatar-frame">
              <div className="avatar-placeholder-box">
                {/* [ISI: FOTO ASLI MIN CHAM ATAU ILUSTRASI BESPOKE] */}
                <div className="avatar-initial-badge">MC</div>
                <span className="avatar-photo-label">[FOTO ASLI MIN CHAM]</span>
              </div>
              <div className="mincham-status-pill">
                <span className="status-live-dot" />
                <span>Founder &amp; Lead Designer</span>
              </div>
            </div>

            <div className="mincham-contact-pills">
              <span className="contact-badge-pill">📍 Jakarta &bull; Remote Indonesia</span>
              <span className="contact-badge-pill">☕ WhatsApp: {contactInfo?.phone || '+62 857-1452-1584'}</span>
              <span className="contact-badge-pill">📸 IG: @supernova.studio [ISI: username]</span>
              <span className="contact-badge-pill">🎵 TikTok: @supernova.studio [ISI: username]</span>
            </div>
          </div>

          {/* Right: Personal Manifesto Story */}
          <div className="mincham-story-col">
            <div className="section-note-pill">
              <span className="section-num">05</span>
              <span>DIBUAT DENGAN JIWA &bull; BUKAN TEMPLATE AI</span>
            </div>

            <h2 className="section-title">
              Kenapa Saya Membangun <span className="highlight-text">Studio Supernova?</span>
            </h2>

            <div className="story-paragraphs">
              <p className="lead-text">
                "Halo! Saya <strong>Min Cham</strong>. Saya membangun Studio Supernova karena merasa jengah melihat banyaknya pemilik bisnis kecil, mahasiswa, dan founder lokal yang membuang uang jutaan rupiah untuk desain template AI generik yang kaku dan tidak memikat siapapun."
              </p>

              <p>
                Banyak orang mengira desain bagus itu harus rumit dan penuh efek heboh. Padahal rahasianya sederhana: <strong>hierarki visual yang jelas, rasa nyaman saat dilihat, dan pesan yang langsung dipahami audiens dalam 3 detik pertama</strong>.
              </p>

              <p>
                Di Supernova, Anda tidak berbicara dengan sales perantara atau customer service korporat yang kaku. Anda berbicara langsung dengan saya — orang yang akan membuka laptop, menyusun grid, memoles tipografi, dan memastikan proyek Anda selesai tepat waktu.
              </p>
            </div>

            {/* 3 Personal Principles */}
            <div className="mincham-principles-grid">
              <div className="principle-card">
                <div className="principle-num">01</div>
                <h4>Tanpa Gimmick AI Palsu</h4>
                <p>Setiap slide dan baris kode dirancang manual dengan logika estetika manusia dan kebutuhan nyata audiens Anda.</p>
              </div>

              <div className="principle-card">
                <div className="principle-num">02</div>
                <h4>Master File Milik Anda 100%</h4>
                <p>Tidak ada format yang disandera. File PPTX, AI vektor, atau source code web diserahkan penuh agar Anda mandiri di masa depan.</p>
              </div>

              <div className="principle-card">
                <div className="principle-num">03</div>
                <h4>Komunikasi Santai Tapi Tuntas</h4>
                <p>Konsultasi lewat WhatsApp seperti teman kerja sendiri. Bebas diskusi, tanpa bahasa korporat yang berbelit.</p>
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
                <span>Ngobrol Langsung dengan Min Cham</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
