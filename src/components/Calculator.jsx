import React, { useState, useMemo } from 'react';
import { IconCheck, IconClock, IconShield, IconArrowRight, IconWhatsApp } from './Icons';

const SERVICES_CONFIG = {
  presentation: {
    label: 'Desain Presentasi & Pitch Deck (PPT)',
    baseDays: 4,
    scales: [
      { value: 'compact', label: '8 – 12 Slide (Ringkas / Pitch Kilat)', days: 0 },
      { value: 'standard', label: '15 – 20 Slide (Standar Investor & Tender)', days: 2 },
      { value: 'extended', label: '25 – 35 Slide (Profil Perusahaan Lengkap)', days: 4 },
      { value: 'annual', label: '> 35 Slide (Komprehensif / Dokumen Tahunan)', days: 7 },
    ],
    addons: [
      { id: 'storytelling', title: 'Penyusunan Alur Narasi & Copywriting', sub: 'Merapikan poin pembicaraan agar memikat dan persuasif', days: 2 },
      { id: 'motion', title: 'Animasi & Transisi Slide Interaktif', sub: 'Pergerakan visual yang halus dan berkelas saat presentasi', days: 1 },
      { id: 'infographics', title: 'Infografik & Visualisasi Grafik Kustom', sub: 'Mengubah angka rumit menjadi bagan visual yang mudah dipahami', days: 2 },
      { id: 'print_ready', title: 'Versi Ekspor PDF Cetak Beresolusi Tinggi', sub: 'Siap dicetak sebagai booklet atau proposal resmi', days: 1 },
    ],
  },
  website: {
    label: 'Pembuatan Website Profesional',
    baseDays: 7,
    scales: [
      { value: 'landing', label: '1 Halaman (Landing Page Promosi Cepat)', days: 0 },
      { value: 'company', label: '3 – 6 Halaman (Website Profil Perusahaan)', days: 4 },
      { value: 'ecommerce', label: 'Toko Online (Katalog & Keranjang Belanja)', days: 8 },
      { value: 'custom_portal', label: 'Portal / Web App Kustom Bisnis', days: 12 },
    ],
    addons: [
      { id: 'admin_panel', title: 'Panel Admin Kelola Konten Mandiri', sub: 'Bisa update teks, foto produk, dan promo sendiri dari ponsel', days: 3 },
      { id: 'seo_indexing', title: 'Pendaftaran Resmi ke Google (SEO)', sub: 'Terindex Google Search Console dan Google Maps', days: 2 },
      { id: 'wa_flow', title: 'Alur WhatsApp Order Otomatis', sub: 'Data formulir dan pesanan langsung tersusun rapi di WhatsApp', days: 1 },
      { id: 'domain_cloud', title: 'Setup Domain & Cloud Server Cepat', sub: 'Konfigurasi domain .com dan server SSL HTTPS aman', days: 1 },
    ],
  },
  branding: {
    label: 'Desain Grafis & Brand Identity',
    baseDays: 5,
    scales: [
      { value: 'logo_only', label: 'Desain Logo Utama & Filosofi', days: 0 },
      { value: 'guidelines', label: 'Logo + Brand Guidelines (Warna & Font)', days: 2 },
      { value: 'social_kit', label: 'Identitas Visual + Template Medsos (Feed/Story)', days: 4 },
      { value: 'full_collateral', label: 'Paket Komplit (Logo, Kit Sosmed, Brosur, Kemasan)', days: 7 },
    ],
    addons: [
      { id: 'source_files', title: 'Master File Vektor Lengkap (AI / SVG / EPS)', sub: 'File mentahan resolusi tak terbatas untuk kebutuhan masa depan', days: 1 },
      { id: 'packaging', title: 'Desain Label Kemasan & Box Produk', sub: 'Format siap cetak pisau pond (die-cut template)', days: 3 },
      { id: 'canva_template', title: 'Template Siap Edit di Canva / Figma', sub: 'Tim Anda bisa membuat materi promosi harian dengan mudah', days: 2 },
      { id: 'marketing_flyer', title: 'Brosur & Standing Banner Promosi', sub: 'Layout siap cetak untuk pameran atau event bisnis', days: 2 },
    ],
  },
  allinone: {
    label: 'Bundling Universal Terpadu (All-in-One)',
    baseDays: 14,
    scales: [
      { value: 'starter_bundle', label: 'Starter: Landing Page + Slide Pitch Deck Ringkas', days: 0 },
      { value: 'business_bundle', label: 'Bisnis: Website Profil + PPT Investor + Logo Brand', days: 5 },
      { value: 'complete_bundle', label: 'Enterprise: Full Web + PPT Tender + Total Brand Identity', days: 10 },
    ],
    addons: [
      { id: 'dedicated_team', title: 'Tim Kreatif Khusus & Prioritas Review', sub: 'Jalur komunikasi khusus untuk diskusi langsung dan iterasi cepat', days: 0 },
      { id: 'bilingual', title: 'Dukungan Dua Bahasa (Indonesia & Inggris)', sub: 'Materi web, slide, dan branding siap untuk audiens internasional', days: 3 },
      { id: 'video_walkthrough', title: 'Dokumentasi & Video Serah Terima Lengkap', sub: 'Panduan lengkap cara pemakaian seluruh aset digital', days: 1 },
    ],
  },
};

export default function Calculator() {
  const [selectedService, setSelectedService] = useState('presentation');
  const [selectedScale, setSelectedScale] = useState('standard');
  const [activeAddons, setActiveAddons] = useState({
    storytelling: true,
    infographics: true,
  });
  const [isExpress, setIsExpress] = useState(false);

  const currentServiceData = SERVICES_CONFIG[selectedService];

  // Switch service and reset scale/addons appropriately
  const handleServiceChange = (serviceKey) => {
    setSelectedService(serviceKey);
    const firstScale = SERVICES_CONFIG[serviceKey].scales[1] || SERVICES_CONFIG[serviceKey].scales[0];
    setSelectedScale(firstScale.value);
    // Reset addons with first addon active
    const newAddons = {};
    if (SERVICES_CONFIG[serviceKey].addons[0]) {
      newAddons[SERVICES_CONFIG[serviceKey].addons[0].id] = true;
    }
    setActiveAddons(newAddons);
  };

  const toggleAddon = (id) => {
    setActiveAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const calculation = useMemo(() => {
    const srv = currentServiceData;
    const scaleObj = srv.scales.find((s) => s.value === selectedScale) || srv.scales[0];

    let addonDays = 0;
    const activeTitles = [];

    srv.addons.forEach((a) => {
      if (activeAddons[a.id]) {
        addonDays += a.days;
        activeTitles.push(a.title);
      }
    });

    let totalDays = srv.baseDays + scaleObj.days + addonDays;

    if (isExpress) {
      totalDays = Math.max(3, Math.round(totalDays * 0.65));
    }

    const minDays = Math.max(2, totalDays - 2);

    return {
      serviceLabel: srv.label,
      scaleLabel: scaleObj.label,
      addonsCount: activeTitles.length,
      addonsList: activeTitles,
      timelineDisplay: `${minDays} – ${totalDays} Hari Kerja`,
    };
  }, [currentServiceData, selectedScale, activeAddons, isExpress]);

  const handleConsultWhatsApp = () => {
    const addonsText =
      calculation.addonsList.length > 0
        ? calculation.addonsList.map((t) => `  • ${t}`).join('\n')
        : '  • Standar tanpa add-on tambahan';

    const message =
      `Halo Tim Supernova Studio,\n\n` +
      `Saya tertarik berkonsultasi mengenai proyek dengan spesifikasi berikut:\n\n` +
      `• Kategori Layanan: ${calculation.serviceLabel}\n` +
      `• Skala / Ruang Lingkup: ${calculation.scaleLabel}\n` +
      `• Kebutuhan Spesifik:\n${addonsText}\n` +
      `• Target Pengerjaan: ${calculation.timelineDisplay} (${isExpress ? 'Prioritas / Express' : 'Jadwal Standar'})\n\n` +
      `Mohon informasi penawaran kustom (quotation) dan ketersediaan jadwal tim Supernova. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
  };

  return (
    <section className="section calculator-section" id="calculator">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">SIMULATOR ESTIMASI PROYEK</span>
          <h2 className="section-title">Rencanakan Kebutuhan &amp; Estimasi Waktu</h2>
          <p className="section-subtitle">
            Pilih layanan, tentukan skala, dan sesuaikan fitur yang Anda butuhkan.
            Simulator ini membantu merangkum spesifikasi proyek Anda sebelum berkonsultasi langsung dengan tim kami.
          </p>
        </div>

        <div className="calc-layout-grid">
          {/* Left Form Panel */}
          <div className="calc-form-panel">
            {/* 1. Service Selector */}
            <div className="calc-group">
              <label className="calc-label">1. Pilih Kategori Layanan</label>
              <div className="calc-radio-grid">
                {Object.entries(SERVICES_CONFIG).map(([key, item]) => (
                  <div
                    key={key}
                    className={`calc-radio-card ${selectedService === key ? 'active' : ''}`}
                    onClick={() => handleServiceChange(key)}
                  >
                    <div className="radio-circle">
                      {selectedService === key && <div className="radio-inner" />}
                    </div>
                    <div className="radio-text">
                      <strong className="r-title">{item.label}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Scale Selector */}
            <div className="calc-group">
              <label className="calc-label">2. Tentukan Skala / Volume Kebutuhan</label>
              <div className="calc-scale-pills">
                {currentServiceData.scales.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className={`scale-pill-btn ${selectedScale === s.value ? 'active' : ''}`}
                    onClick={() => setSelectedScale(s.value)}
                  >
                    <IconCheck size={14} color={selectedScale === s.value ? '#b8933b' : '#94a3b8'} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Add-ons Selector */}
            <div className="calc-group">
              <label className="calc-label">3. Fitur Tambahan &amp; Spesifikasi Khusus</label>
              <div className="calc-addons-grid">
                {currentServiceData.addons.map((addon) => {
                  const isChecked = !!activeAddons[addon.id];
                  return (
                    <div
                      key={addon.id}
                      className={`addon-checkbox-card ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div className="addon-checkbox">
                        {isChecked && <IconCheck size={14} color="#0f172a" />}
                      </div>
                      <div className="addon-text">
                        <strong className="addon-title">{addon.title}</strong>
                        <p className="addon-desc">{addon.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Express Speed Toggle */}
            <div className="calc-group">
              <div className="express-toggle-box">
                <div className="express-info">
                  <strong>Pengerjaan Prioritas / Kilat (Express Delivery)</strong>
                  <p>Alokasi tim dedikasi penuh untuk menyelesaikan proyek dalam durasi waktu lebih cepat.</p>
                </div>
                <button
                  type="button"
                  className={`toggle-switch-btn ${isExpress ? 'active' : ''}`}
                  onClick={() => setIsExpress(!isExpress)}
                  aria-pressed={isExpress}
                >
                  <span className="toggle-switch-thumb" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div className="calc-summary-panel">
            <div className="summary-sticky-card">
              <div className="sum-header">
                <span className="sum-badge">RINGKASAN ESTIMASI PROYEK</span>
                <h3 className="sum-title">{calculation.serviceLabel}</h3>
              </div>

              {/* Scope & Timeline Highlights */}
              <div className="sum-timeline-box">
                <div className="sum-time-row">
                  <div className="sum-time-icon">
                    <IconClock size={20} color="#b8933b" />
                  </div>
                  <div>
                    <span className="sum-time-label">Estimasi Waktu Pengerjaan</span>
                    <strong className="sum-time-val">{calculation.timelineDisplay}</strong>
                  </div>
                </div>
                <div className="sum-status-chip">
                  <span className="live-dot-pulse"></span>
                  <span>100% Terima Jadi + Master File Lengkap</span>
                </div>
              </div>

              {/* Selected Scope Details */}
              <div className="summary-detail-row">
                <div className="s-col">
                  <span className="s-label">Skala Proyek:</span>
                  <strong className="s-val">{calculation.scaleLabel}</strong>
                </div>
                <div className="s-col">
                  <span className="s-label">Fitur Tambahan:</span>
                  <strong className="s-val">{calculation.addonsCount} Spesifikasi Dipilih</strong>
                </div>
              </div>

              {/* Guarantees */}
              <div className="sum-guarantees">
                <div className="sum-g-item">
                  <IconCheck size={14} color="#059669" />
                  <span>Penawaran Kustom (Custom Quote) Transparan</span>
                </div>
                <div className="sum-g-item">
                  <IconCheck size={14} color="#059669" />
                  <span>Garansi Revisi Terarah hingga Sesuai Target</span>
                </div>
                <div className="sum-g-item">
                  <IconCheck size={14} color="#059669" />
                  <span>Kepemilikan Hak Cipta &amp; Master File 100%</span>
                </div>
              </div>

              {/* CTA Action */}
              <div className="sum-action-box">
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  onClick={handleConsultWhatsApp}
                >
                  <IconWhatsApp size={18} />
                  <span>Minta Penawaran via WhatsApp</span>
                </button>
                <p className="sum-sub-note">
                  Spesifikasi di atas akan otomatis terangkum rapi di chat WhatsApp Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
