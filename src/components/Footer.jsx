import React from 'react';
import { Link } from 'react-router-dom';
import { playClick } from '../utils/sound';

export default function Footer() {
  return (
    <footer className="figma-footer" data-name="Footer (Figma 2001:400)">
      <div className="figma-footer-container">
        {/* Col 1: Wordmark & Bio */}
        <div className="figma-footer-col-1">
          <div className="figma-brand-link">
            <span className="figma-brand-title">Supernova</span>
            <span className="figma-brand-studio">STUDIO</span>
            <span className="figma-brand-dot" />
          </div>
          <p className="figma-footer-bio">
            Studio kreatif digital kecil. Presentasi, website, dan produk digital buat bisnis kecil, freelancer, dan mahasiswa.
          </p>
          <div className="figma-footer-location">
            Jakarta &amp; Jambi, Indonesia
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="figma-footer-col-2">
          <div className="figma-footer-nav-col">
            <div className="figma-footer-col-title">NAVIGASI</div>
            <ul className="figma-footer-links-list">
              <li>
                <Link to="/" className="figma-footer-link" onClick={() => playClick()}>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="figma-footer-link" onClick={() => playClick()}>
                  Layanan
                </Link>
              </li>
              <li>
                <Link to="/portofolio" className="figma-footer-link" onClick={() => playClick()}>
                  Portofolio
                </Link>
              </li>
              <li>
                <Link to="/produk-digital" className="figma-footer-link" onClick={() => playClick()}>
                  Produk
                </Link>
              </li>
            </ul>
          </div>

          <div className="figma-footer-nav-col">
            <div className="figma-footer-col-title">EKSPLOR</div>
            <ul className="figma-footer-links-list">
              <li>
                <Link to="/harga" className="figma-footer-link" onClick={() => playClick()}>
                  Harga
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="figma-footer-link" onClick={() => playClick()}>
                  Tentang Min
                </Link>
              </li>
              <li>
                <a href="#kuis" className="figma-footer-link" onClick={() => playClick()}>
                  Kuis Kebutuhan
                </a>
              </li>
              <li>
                <Link to="/kontak" className="figma-footer-link" onClick={() => playClick()}>
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Col 3: Social & Copyright */}
        <div className="figma-footer-col-3">
          <div className="figma-footer-col-title">SOSIAL</div>
          <div className="figma-social-chips-grid">
            <a
              href="https://instagram.com/supernova.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="figma-social-chip"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@supernova.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="figma-social-chip"
            >
              TikTok
            </a>
            <a
              href="https://wa.me/6285714521584"
              target="_blank"
              rel="noopener noreferrer"
              className="figma-social-chip"
            >
              WhatsApp
            </a>
            <a
              href="mailto:studio@supernova.id"
              className="figma-social-chip"
            >
              Email
            </a>
          </div>

          <div className="figma-footer-copyright">
            &copy; 2026 Supernova Studio.
          </div>
        </div>
      </div>
    </footer>
  );
}
