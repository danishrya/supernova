import React from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconArrowRight, IconWhatsApp } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function NotFoundPage() {
  return (
    <div className="page-notfound human-page-wrap">
      <div className="container notfound-container">
        <div className="notfound-card">
          <div className="notfound-badge-row">
            <span className="notfound-code-stamp">ERROR 404 &bull; ORBIT TERLEWAT</span>
            <span className="notfound-status-live">STATUS: HILANG KONTAK</span>
          </div>

          <div className="notfound-illustration">
            <span className="huge-404">404</span>
            <div className="notfound-satellite-ring">
              <span className="supernova-signature-dot" />
            </div>
          </div>

          <h1 className="notfound-title-fraunces">
            Sinyal Terputus di Luar Jangkauan.
          </h1>

          <p className="notfound-desc">
            Halaman yang Anda cari sepertinya melayang di luar radar kami, telah dipindahkan ke arsip baru, atau alamat URL yang Anda ketik mengalami salah ketik.
          </p>

          <div className="notfound-actions">
            <Link to="/" className="btn btn-primary btn-lg" onClick={() => playClick()}>
              <span>Kembali ke Beranda Utama</span>
              <IconArrowRight size={15} />
            </Link>

            <Link to="/portofolio" className="btn btn-secondary btn-lg" onClick={() => playClick()}>
              <span>Jelajahi Portofolio Karya</span>
            </Link>

            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Halo%20Min%20Cham,%20saya%20menemukan%20halaman%20404%20di%20website`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              onClick={() => playClick()}
            >
              <IconWhatsApp size={16} />
              <span>Laporkan Tautan Rusak ke Min Cham</span>
            </a>
          </div>

          <div className="notfound-footer-note">
            <span>STUDIO SUPERNOVA &bull; TEKNOLOGI NAVIGASI TAHUN 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
