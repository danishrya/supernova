import React from 'react';
import { IconCheck, IconArrowRight } from './Icons';

export default function Pricing({ onSelectPackage }) {
  const capabilities = [
    {
      id: 'presentation',
      badge: 'PRESENTATION',
      name: 'Pitch Deck & PPT',
      desc: 'Slide investor & proposal tender dengan narasi terstruktur dan tampilan 16:9 HD.',
      turnaround: '3 – 5 Hari Kerja',
      deliverables: [
        'Master File PPTX 100% Editable',
        'Storytelling & Infografik Data',
        'PDF Siap Presentasi & Cetak',
      ],
      btnLabel: 'Konsultasi PPT',
    },
    {
      id: 'branding',
      badge: 'VISUAL SYSTEM',
      name: 'Brand Identity',
      desc: 'Identitas visual berwibawa: logo, warna, dan tipografi yang konsisten di semua media.',
      turnaround: '4 – 7 Hari Kerja',
      deliverables: [
        'Logo Utama & Monogram Vektor',
        'Brand Guidelines & Tipografi',
        'Template Medsos (Canva / PSD)',
      ],
      btnLabel: 'Konsultasi Brand',
    },
    {
      id: 'website',
      badge: 'DIGITAL CRAFT',
      name: 'Web & Digital',
      desc: 'Website modern berkinerja tinggi, memuat instan di ponsel tanpa kode berlebih.',
      turnaround: '7 – 14 Hari Kerja',
      deliverables: [
        'Landing Page / Company Profile',
        'Kecepatan Buka < 0.5s di HP',
        'Domain & Server Siap Pakai',
      ],
      btnLabel: 'Konsultasi Web',
    },
    {
      id: 'allinone',
      badge: 'ALL-IN-ONE',
      name: 'Studio Partnership',
      desc: 'Solusi terintegrasi lengkap: Web, Pitch Deck, dan Brand Kit untuk transformasi menyeluruh.',
      turnaround: 'Jadwal Prioritas',
      deliverables: [
        'Paket Lengkap Web + PPT + Brand',
        'Konsistensi Visual di Semua Media',
        'Komunikasi Langsung Desainer',
      ],
      btnLabel: 'Konsultasi Terpadu',
    },
  ];

  return (
    <section className="section pricing-section" id="services-scope">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: 36 }}>
          <span className="section-tag">CAPABILITIES</span>
          <h2 className="section-title">Layanan Studio</h2>
          <p className="section-subtitle">
            Pilih disiplin yang sesuai dengan kebutuhan Anda. Seluruh master file diserahkan 100% milik Anda.
          </p>
        </div>

        <div className="packages-grid universal-grid minimal-capabilities-grid">
          {capabilities.map((pkg) => (
            <div key={pkg.id} className="package-card minimal-cap-card">
              <div className="pkg-header">
                <span className="pkg-badge">{pkg.badge}</span>
                <h3 className="pkg-name">{pkg.name}</h3>
                <p className="pkg-desc">{pkg.desc}</p>
                <div className="pkg-time-pill">
                  <span>{pkg.turnaround}</span>
                </div>
              </div>
              <ul className="pkg-features minimal-features">
                {pkg.deliverables.map((item, idx) => (
                  <li key={idx}>
                    <IconCheck size={14} color="#b8933b" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-outline btn-block select-pkg-btn"
                onClick={() => onSelectPackage(pkg.name)}
              >
                <span>{pkg.btnLabel}</span>
                <IconArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
