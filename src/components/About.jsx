import React from 'react';
import { IconCheck, IconClose } from './Icons';

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">FILOSOFI REKAYASA</span>
          <h2 className="section-title">
            Mengapa Kualitas Kode Menentukan Masa Depan Bisnis Anda?
          </h2>
          <p className="section-subtitle">
            Banyak jasa pembuatan website hanya menginstall template bajakan yang berat, penuh celah
            keamanan, dan lambat diakses di ponsel. Di Supernova, kami memperlakukan
            website Anda sebagai aset digital jangka panjang.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="comparison-grid">
          <div className="comp-card card-bad">
            <div className="comp-badge bad">Jasa Web Biasa / Template Murahan</div>
            <h3 className="comp-title">Resiko Tersembunyi</h3>
            <ul className="comp-list">
              <li>
                <span className="icon-cross">
                  <IconClose size={14} color="#f43f5e" />
                </span>
                <div>
                  <strong>Loading Lambat (&gt; 4-6 detik)</strong>
                  <p>
                    Calon pembeli keburu meninggalkan halaman sebelum melihat produk Anda karena beban script usang.
                  </p>
                </div>
              </li>
              <li>
                <span className="icon-cross">
                  <IconClose size={14} color="#f43f5e" />
                </span>
                <div>
                  <strong>Desain Pasaran &amp; Kaku</strong>
                  <p>
                    Terlihat serupa dengan ribuan website lain; sulit dikustomisasi sesuai
                    identitas brand Anda.
                  </p>
                </div>
              </li>
              <li>
                <span className="icon-cross">
                  <IconClose size={14} color="#f43f5e" />
                </span>
                <div>
                  <strong>Rentan Celah Keamanan</strong>
                  <p>
                    Plugin pihak ketiga yang tidak terawat sering menjadi sasaran injeksi malware dan spam.
                  </p>
                </div>
              </li>
              <li>
                <span className="icon-cross">
                  <IconClose size={14} color="#f43f5e" />
                </span>
                <div>
                  <strong>Ketergantungan Vendor Sepihak</strong>
                  <p>
                    Kode tidak terstruktur sehingga developer lain kesulitan jika ingin melanjutkan pengembangan.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="comp-card card-good">
            <div className="comp-badge good">Standar Supernova Studio</div>
            <h3 className="comp-title">Rekayasa Software Profesional</h3>
            <ul className="comp-list">
              <li>
                <span className="icon-check">
                  <IconCheck size={14} color="#dfbe76" />
                </span>
                <div>
                  <strong>Kecepatan Ekstrem (&lt; 0.6 detik)</strong>
                  <p>
                    Arsitektur ringan dan aset teroptimasi. Mesin pencari Google memberi skor peringkat lebih tinggi.
                  </p>
                </div>
              </li>
              <li>
                <span className="icon-check">
                  <IconCheck size={14} color="#dfbe76" />
                </span>
                <div>
                  <strong>Desain Eksklusif Sesuai Karakter Brand</strong>
                  <p>
                    Dirancang unik dari nol dengan estetika modern, micro-interactions halus, dan psikologi konversi.
                  </p>
                </div>
              </li>
              <li>
                <span className="icon-check">
                  <IconCheck size={14} color="#dfbe76" />
                </span>
                <div>
                  <strong>Keamanan Standar Industri</strong>
                  <p>
                    Sanitasi input data, sertifikat SSL HTTPS ketat, dan hosting modern terlindungi.
                  </p>
                </div>
              </li>
              <li>
                <span className="icon-check">
                  <IconCheck size={14} color="#dfbe76" />
                </span>
                <div>
                  <strong>Kepemilikan Penuh &amp; Kode Bersih</strong>
                  <p>
                    Source code 100% milik Anda. Kode modular, bersih, dan berstandar internasional.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h4>Performance-Driven</h4>
            <p>
              Optimalisasi Core Web Vitals menyeluruh agar bounce rate rendah dan retensi pengunjung tinggi.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h4>Pixel-Perfect UI/UX</h4>
            <p>
              Tata letak dirancang teliti hingga hitungan piksel, responsif di segala ukuran layar modern.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h4>Clean Modular Code</h4>
            <p>
              Struktur kode rapi berstandar industri yang memudahkan pemeliharaan dan ekspansi jangka panjang.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h4>Garansi Pemeliharaan 60 Hari</h4>
            <p>
              Dukungan teknis pasca-peluncuran tanpa biaya tambahan untuk menjamin website Anda beroperasi mulus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
