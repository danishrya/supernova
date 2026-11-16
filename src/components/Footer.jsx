import React from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconShield } from './Icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <div className="footer-coin-wrapper">
                <img
                  src="/assets/images/supernova-logo.jpg"
                  alt="Supernova Emblem"
                  className="footer-logo-img"
                />
              </div>
              <span className="footer-logo-text">
                SUPERNOVA<span className="logo-dot">.</span>
              </span>
            </div>
            <p className="footer-tagline">
              Studio Kreatif &amp; Digital Terpadu. Menghadirkan desain slide presentasi (PPT) kelas dunia,
              pengembangan website modern berkecepatan tinggi, dan identitas brand eksklusif yang mengangkat wibawa bisnis Anda.
            </p>
            <div className="footer-badges">
              <span className="footer-guarantee-badge">
                <IconShield size={13} color="#dfbe76" />
                <span>100% Kepemilikan Master File</span>
              </span>
              <span className="footer-guarantee-badge">
                <IconCheck size={13} color="#dfbe76" />
                <span>Garansi Revisi Terbimbing</span>
              </span>
            </div>
          </div>

          <div className="footer-nav-group">
            <h5>Navigasi Halaman</h5>
            <ul>
              <li><Link to="/">Home (Beranda)</Link></li>
              <li><Link to="/about">About (Tentang Kami)</Link></li>
              <li><Link to="/catalog">Works (Portofolio)</Link></li>
              <li><Link to="/services">Services (Layanan &amp; Spesifikasi)</Link></li>
              <li><Link to="/contact">Contact (Konsultasi)</Link></li>
            </ul>
          </div>

          <div className="footer-nav-group">
            <h5>Layanan Utama</h5>
            <ul>
              <li><Link to="/catalog?filter=presentation">Desain Presentasi &amp; Pitch Deck (PPT)</Link></li>
              <li><Link to="/catalog?filter=web">Website &amp; Landing Page Siap Pakai</Link></li>
              <li><Link to="/catalog?filter=branding">Brand Identity &amp; Desain Grafis</Link></li>
              <li><Link to="/services">Simulator Estimasi Proyek</Link></li>
            </ul>
          </div>

          <div className="footer-nav-group">
            <h5>Hubungi Kami</h5>
            <ul className="footer-contact-links">
              <li>
                <a href="https://wa.me/6285714521584" target="_blank" rel="noopener noreferrer">
                  +62 857-1452-1584 (WhatsApp)
                </a>
              </li>
              <li>
                <a href="mailto:chasupernova.studio@gmail.com">
                  chasupernova.studio@gmail.com
                </a>
              </li>
            </ul>
            <div className="footer-tech-chips" style={{ marginTop: '12px' }}>
              <span className="f-chip">Terima Jadi Siap Pakai</span>
              <span className="f-chip">Master File Editable (.PPTX / AI)</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 SUPERNOVA Studio. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="credit">
            Solusi desain presentasi, web berkelas, dan identitas visual berkinerja tinggi untuk brand &amp; korporasi modern.
          </p>
        </div>
      </div>
    </footer>
  );
}
