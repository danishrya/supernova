import React from 'react';
import { IconShield, IconBolt, IconCheck, IconLayers, IconArrowRight } from './Icons';
import { Link } from 'react-router-dom';

export default function StudioBentoGrid() {
  return (
    <section className="section bento-section" id="standards">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: 44 }}>
          <span className="section-tag">STANDAR STUDIO</span>
          <h2 className="section-title">Mengapa Founder &amp; Bisnis Memilih Supernova</h2>
          <p className="section-subtitle">
            Kombinasi standar visual kelas dunia, kecepatan eksekusi, dan transparansi penuh tanpa perantara berbelit.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Master Files (Span 2 columns on desktop) */}
          <div className="bento-card bento-feature-card">
            <div className="bento-card-top">
              <div className="bento-icon-wrap">
                <IconShield size={22} color="#0f172a" />
              </div>
              <span className="bento-badge">100% OWNERSHIP</span>
            </div>
            <h3 className="bento-title">Master File Asli Terbuka — Tanpa Kunci &amp; Tanpa Ketergantungan</h3>
            <p className="bento-desc">
              Kami tidak pernah mengunci slide dalam PDF statis atau menahan kode website Anda.
              Seluruh aset diserahkan 100% dalam format asli yang dapat Anda edit bebas di masa depan.
            </p>
            <div className="bento-file-pills">
              <span className="bento-pill">✦ Master .PPTX Editable (PowerPoint/Keynote)</span>
              <span className="bento-pill">✦ Vektor Orisinal (.AI / .SVG / .EPS)</span>
              <span className="bento-pill">✦ Template Canva &amp; Photoshop Siap Pakai</span>
              <span className="bento-pill">✦ Source Code Web Bersih &amp; Ringan</span>
            </div>
          </div>

          {/* Card 2: Direct WhatsApp Chat */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-icon-wrap">
                <IconBolt size={22} color="#0f172a" />
              </div>
              <span className="bento-badge live-badge">
                <span className="badge-pulse-dot" />
                <span>DIRECT ACCESS</span>
              </span>
            </div>
            <h3 className="bento-title">Komunikasi Langsung Desainer</h3>
            <p className="bento-desc">
              Bicara langsung via WhatsApp dengan desainer dan teknisi yang mengeksekusi proyek Anda.
              Tanpa sales perantara atau alur email berhari-hari.
            </p>
            <div className="bento-chat-preview">
              <div className="chat-bubble client">
                <span>"Bisa tolong buatkan slide pitch deck 15 slide untuk investor besok lusa?"</span>
              </div>
              <div className="chat-bubble studio">
                <span className="chat-author">Supernova Lead</span>
                <span>"Siap, kami siapkan draf alur narasi dan layout pertama dalam 24 jam."</span>
              </div>
            </div>
          </div>

          {/* Card 3: World-Class Visual Craft */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-icon-wrap">
                <IconLayers size={22} color="#0f172a" />
              </div>
              <span className="bento-badge">ELITE AESTHETICS</span>
            </div>
            <h3 className="bento-title">Standar Visual Internasional</h3>
            <p className="bento-desc">
              Tipografi berkarakter, hierarki informasi tajam, dan komposisi 16:9 sinematik yang dirancang
              untuk membangun rasa percaya seketika di mata investor dan dewan direksi.
            </p>
            <div className="bento-metrics-row">
              <div className="bento-metric-box">
                <span className="m-val">16:9 HD</span>
                <span className="m-lbl">Rasio Presentasi</span>
              </div>
              <div className="bento-metric-box">
                <span className="m-val">&lt; 0.4s</span>
                <span className="m-lbl">Kecepatan Buka Web</span>
              </div>
              <div className="bento-metric-box">
                <span className="m-val">300 DPI</span>
                <span className="m-lbl">Resolusi Cetak Vektor</span>
              </div>
            </div>
          </div>

          {/* Card 4: Revision & Partnership (Span 2 columns) */}
          <div className="bento-card bento-action-card">
            <div className="bento-action-content">
              <span className="bento-badge">COLLABORATION</span>
              <h3 className="bento-title">Garansi Revisi Terbimbing &amp; Bebas Tekanan</h3>
              <p className="bento-desc">
                Konsultasi awal gratis, estimasi transparan, dan revisi terarah hingga seluruh hasil karya
                siap Anda presentasikan atau luncurkan ke pasar dengan penuh percaya diri.
              </p>
              <div className="bento-action-btn-row">
                <Link to="/contact" className="btn btn-primary btn-md">
                  <span>Konsultasi Proyek Sekarang</span>
                  <IconArrowRight size={15} />
                </Link>
                <Link to="/catalog" className="btn btn-secondary btn-md">
                  <span>Lihat Galeri Karya</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
