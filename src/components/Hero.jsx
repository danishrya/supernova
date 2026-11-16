import React from 'react';
import { IconShield, IconArrowRight } from './Icons';

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge-pill">
            <IconShield size={14} color="#dfbe76" />
            <span className="badge-text">
              Senior Engineering Craftsmanship &bull; Powered by React &amp; Vite
            </span>
          </div>

          <h1 className="hero-title">
            Website Berkelas Dunia <br />
            Untuk Bisnis yang Ingin Tampil Terdepan.
          </h1>

          <p className="hero-description">
            Kami merancang dan memprogram website dari baris kode pertama &mdash; bukan asal pasang
            template bajakan. Hasilnya: website berkecepatan tinggi, aman, dan berkelas tinggi.
          </p>

          <div className="hero-cta-group">
            <a href="#catalog" className="btn btn-primary btn-lg" id="heroExploreBtn">
              <span>Eksplorasi Katalog Karya</span>
              <IconArrowRight size={16} />
            </a>
            <a href="#calculator" className="btn btn-secondary btn-lg" id="heroCalcBtn">
              <span>Hitung Estimasi Biaya</span>
            </a>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-value">0.38s</span>
              <span className="metric-label">Avg. Page Load</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-value">100</span>
              <span className="metric-label">Lighthouse Score</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-value">60 Hari</span>
              <span className="metric-label">Garansi Kode</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
