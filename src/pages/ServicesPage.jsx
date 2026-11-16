import React from 'react';
import { useNavigate } from 'react-router-dom';
import Pricing from '../components/Pricing';
import Calculator from '../components/Calculator';
import { IconCheck } from '../components/Icons';

export default function ServicesPage({ onSelectPackage }) {
  const navigate = useNavigate();

  const handlePackageClick = (pkgName) => {
    onSelectPackage(pkgName);
    navigate('/contact');
  };

  const comparisonFeatures = [
    {
      name: 'Format Master File Diserahkan',
      ppt: 'PPTX & Keynote 100% Editable',
      web: 'Akses Penuh Kode & Akun Domain',
      brand: 'Vektor Master AI, SVG, EPS & PDF',
    },
    {
      name: 'Penyusunan Alur Narasi & Teks',
      ppt: 'Termasuk (Struktur Storytelling)',
      web: 'Termasuk (Copywriting Penjualan)',
      brand: 'Termasuk (Slogan & Filosofi Brand)',
    },
    {
      name: 'Kustomisasi Desain Visual',
      ppt: 'Rasio 16:9 HD Eksklusif & Modern',
      web: 'Desain Kustom Responsif Semua HP',
      brand: 'Logo Orisinal & Brand Guidelines',
    },
    {
      name: 'Infografik & Aset Pendukung',
      ppt: 'Grafik & Bagan Angka Kustom',
      web: 'Galeri Foto HD & Kompresi Cepat',
      brand: 'Kit Template Sosmed & Kemasan',
    },
    {
      name: 'Koneksi Kontak & WhatsApp',
      ppt: 'Tautan Interaktif Langsung',
      web: 'Integrasi Alur WhatsApp Otomatis',
      brand: 'QR Code & Materi Kartu Nama',
    },
    {
      name: 'Kesiapan Penggunaan Aset',
      ppt: 'Siap Presentasi & Siap Cetak PDF',
      web: 'Website Online Siap Terima Order',
      brand: 'Siap Posting Medsos & Siap Cetak',
    },
    {
      name: 'Garansi & Pendampingan Revisi',
      ppt: 'Revisi Terarah hingga Sesuai',
      web: 'Garansi Bebas Kendala 60 Hari',
      brand: 'Revisi Terbimbing hingga Tuntas',
    },
    {
      name: 'Rata-rata Waktu Pengerjaan',
      ppt: '3 – 5 Hari Kerja',
      web: '7 – 14 Hari Kerja',
      brand: '4 – 7 Hari Kerja',
    },
  ];

  return (
    <div className="page-services">
      {/* Header Banner */}
      <section className="page-header-section">
        <div className="container">
          <div className="page-header-box text-center">
            <span className="section-tag">LAYANAN &amp; SPESIFIKASI PROYEK</span>
            <h1 className="page-main-title">
              Solusi Kreatif Universal, <br />
              Terima Jadi Sesuai Kebutuhan Anda.
            </h1>
            <p className="page-main-subtitle">
              Pilih layanan yang paling relevan dengan tujuan bisnis Anda — mulai dari Desain Slide Presentasi (PPT),
              Pembuatan Website Profesional, hingga Desain Grafis &amp; Identitas Brand. Seluruh aset diserahkan lengkap
              dengan file master yang dapat diedit mandiri.
            </p>
          </div>
        </div>
      </section>

      {/* Universal Service Cards */}
      <Pricing onSelectPackage={handlePackageClick} />

      {/* Feature Comparison Matrix Table */}
      <section className="section comparison-table-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">MATRIKS FASILITAS LAYANAN</span>
            <h2 className="section-title">Rincian Deliverables Tiap Layanan</h2>
            <p className="section-subtitle">
              Setiap karya yang kami hasilkan memenuhi standar profesional tertinggi agar bisnis Anda tampil percaya diri di hadapan klien dan investor.
            </p>
          </div>

          <div className="table-responsive-wrapper">
            <table className="features-matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '34%' }}>Fasilitas &amp; Standar Mutu</th>
                  <th style={{ width: '22%' }}>Desain Presentasi (PPT)</th>
                  <th style={{ width: '22%' }} className="featured-col">Website &amp; Digital</th>
                  <th style={{ width: '22%' }}>Brand &amp; Desain Grafis</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((f, idx) => (
                  <tr key={idx}>
                    <td><strong>{f.name}</strong></td>
                    <td>
                      <span className="table-check-wrap">
                        <IconCheck size={14} color="#b8933b" />
                        <span>{f.ppt}</span>
                      </span>
                    </td>
                    <td className="featured-col">
                      <span className="table-check-wrap">
                        <IconCheck size={14} color="#b8933b" />
                        <span>{f.web}</span>
                      </span>
                    </td>
                    <td>
                      <span className="table-check-wrap">
                        <IconCheck size={14} color="#b8933b" />
                        <span>{f.brand}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Project Cost & Scope Simulator */}
      <Calculator />
    </div>
  );
}
