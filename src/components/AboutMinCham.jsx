import React from 'react';
import { IconWhatsApp } from './Icons';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { playClick } from '../utils/sound';

export default function AboutMinCham() {
  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Halo Min Cham! Saya ingin konsultasi santai mengenai desain presentasi/website di Studio Supernova.'
  )}`;

  return (
    <section className="section about-mincham-section" id="tentang">
      <div className="container">
        <div className="about-mincham-card">
          <div className="mincham-profile-col">
            <div className="avatar-initial-badge">MC</div>
            <div className="mincham-meta">
              <h3 className="mincham-name">Min Cham</h3>
              <span className="mincham-role">Founder &amp; Desainer Utama</span>
              <span className="mincham-loc">📍 Jakarta, Indonesia</span>
            </div>
          </div>

          <div className="mincham-quote-col">
            <div className="section-index-stamp">
              <span>04 &bull; TENTANG STUDIO</span>
            </div>
            <p className="mincham-lead-quote">
              "Studio Supernova didirikan agar UMKM dan founder punya presentasi serta website berkelas tanpa birokrasi agensi mahal atau template kaku pasaran. Kamu berdiskusi langsung dengan saya dari draf awal hingga materi siap tampil."
            </p>

            <div className="mincham-quick-facts">
              <span className="fact-item">✦ 100% Master File Milik Klien</span>
              <span className="fact-item">✦ Komunikasi Langsung via WA</span>
              <span className="fact-item">✦ Garansi Revisi Sampai Puas</span>
            </div>

            <div className="mincham-cta-wrap">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-hero-wa"
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
