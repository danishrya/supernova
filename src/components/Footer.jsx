import React from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconShield, IconWhatsApp } from './Icons';
import { STUDIO_CONFIG } from '../config/studioConfig';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-wordmark">
              <span>SUPERNOVA</span>
              <span className="footer-dot" />
            </Link>
            <p className="footer-tagline">
              Studio desain &amp; digital independen milik Min Cham. Kami membantu UMKM, founder, dan mahasiswa merapikan slide presentasi, membangun website kilat, dan menyediakan aset digital siap pakai.
            </p>
            <div className="footer-badges">
              <span className="footer-guarantee-badge">
                <IconShield size={13} color="#f59e0b" />
                <span>100% Hak Milik Master File</span>
              </span>
              <span className="footer-guarantee-badge">
                <IconCheck size={13} color="#10b981" />
                <span>Garansi Revisi Fleksibel</span>
              </span>
            </div>
          </div>

          <div className="footer-nav-group">
            <span className="footer-col-title">Navigasi</span>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/layanan">Layanan</Link></li>
              <li><Link to="/portofolio">Portofolio</Link></li>
              <li><Link to="/produk-digital">Produk Digital</Link></li>
              <li><Link to="/harga">Harga &amp; Estimasi</Link></li>
              <li><Link to="/tentang">Tentang Studio</Link></li>
              <li><Link to="/kontak">Kontak</Link></li>
            </ul>
          </div>

          <div className="footer-nav-group">
            <span className="footer-col-title">Spesialisasi</span>
            <ul>
              <li><Link to="/layanan/desain-ppt">Desain Slide Presentasi (PPT)</Link></li>
              <li><Link to="/layanan/website">Pembuatan Website &amp; Landing Page</Link></li>
              <li><Link to="/produk-digital">Template Pitch Deck &amp; Kit Sosmed</Link></li>
              <li><Link to="/harga">Kalkulator Biaya Proyek</Link></li>
            </ul>
          </div>

          <div className="footer-nav-group">
            <span className="footer-col-title">Kontak Langsung</span>
            <ul className="footer-contact-links">
              <li>
                <a
                  href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Halo%20Min%20Cham,%20saya%20mau%20konsultasi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-wa-link"
                >
                  <IconWhatsApp size={14} color="#10b981" />
                  <span>{STUDIO_CONFIG.phone} (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${STUDIO_CONFIG.email}`}>
                  {STUDIO_CONFIG.email}
                </a>
              </li>
              <li>
                <span className="footer-work-hours">{STUDIO_CONFIG.operatingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; 2026 Studio Supernova &bull; Dirancang &amp; dikerjakan langsung oleh Min Cham.
          </p>
          <div className="footer-bottom-links">
            <Link to="/admin" className="admin-portal-link">
              Portal CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
