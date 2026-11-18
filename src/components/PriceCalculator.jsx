import React, { useState, useMemo } from 'react';
import { IconCheck, IconWhatsApp, IconArrowRight } from './Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick, playPop } from '../utils/sound';

// =============================================================================
// [ISI: DAFTAR HARGA & OPSIONAL ADDON STUDIO SUPERNOVA]
// Silakan sesuaikan angka dasar (Rp) dan tarif per halaman/slide di bawah ini.
// =============================================================================
export const PRICING_CONFIG = {
  // 1. Layanan Desain Slide Presentasi & Pitch Deck (PPT)
  presentation: {
    name: 'Desain Presentasi & Pitch Deck (PPT)',
    basePrice: 350000, // [ISI: Biaya dasar draf alur & template]
    pricePerUnit: 45000, // [ISI: Biaya per slide tambahan]
    unitLabel: 'Slide',
    minUnits: 6,
    defaultUnits: 15,
    maxUnits: 60,
    unitStep: 1,
    addons: [
      { id: 'storytelling', label: 'Bantuan Copywriting & Bedah Alur Narasi', price: 200000 },
      { id: 'infographics', label: 'Infografik Kustom & Redesain Grafik Data', price: 150000 },
      { id: 'print_pdf', label: 'Versi Ekspor PDF Cetak Resolusi Tinggi (Booklet)', price: 75000 },
    ],
  },

  // 2. Layanan Pembuatan Website & Landing Page
  website: {
    name: 'Pembuatan Website & Landing Page',
    basePrice: 750000, // [ISI: Biaya setup & 1 halaman landing]
    pricePerUnit: 250000, // [ISI: Biaya per halaman tambahan]
    unitLabel: 'Halaman',
    minUnits: 1,
    defaultUnits: 3,
    maxUnits: 12,
    unitStep: 1,
    addons: [
      { id: 'cms_admin', label: 'Panel CMS Kelola Konten Sendiri (Bisa Edit di HP)', price: 400000 },
      { id: 'wa_flow', label: 'Formulir Interaktif Tersambung Otomatis ke WhatsApp', price: 150000 },
      { id: 'google_seo', label: 'Pendaftaran Google Search Console & SEO Lokal', price: 200000 },
      { id: 'domain_setup', label: 'Bantuan Konfigurasi Domain .com & Cloud Cepat', price: 150000 },
    ],
  },

  // 3. Layanan Produk Digital & Kit Desain Sosmed
  digital_product: {
    name: 'Desain Identitas Brand & Template Sosmed',
    basePrice: 450000, // [ISI: Biaya paket logo dasar]
    pricePerUnit: 50000, // [ISI: Biaya per aset/template]
    unitLabel: 'Template Aset',
    minUnits: 4,
    defaultUnits: 8,
    maxUnits: 30,
    unitStep: 2,
    addons: [
      { id: 'canva_ready', label: 'File Mentahan Editable di Canva & Figma', price: 100000 },
      { id: 'brand_guide', label: 'Buku Panduan Brand Guideline (Warna, Font, Logo)', price: 200000 },
      { id: 'vector_master', label: 'Master File Vektor Lengkap (.AI / .SVG / .EPS)', price: 150000 },
    ],
  },
};

export default function PriceCalculator() {
  const { contactInfo } = useSiteContent();

  const [serviceKey, setServiceKey] = useState('presentation');
  const [unitCount, setUnitCount] = useState(15);
  const [selectedAddons, setSelectedAddons] = useState({
    storytelling: true,
    infographics: true,
  });
  const [isExpress, setIsExpress] = useState(false);

  const currentService = PRICING_CONFIG[serviceKey];

  const handleServiceChange = (key) => {
    playPop();
    setServiceKey(key);
    setUnitCount(PRICING_CONFIG[key].defaultUnits);
    // Reset default addons
    const newAddons = {};
    if (PRICING_CONFIG[key].addons[0]) {
      newAddons[PRICING_CONFIG[key].addons[0].id] = true;
    }
    setSelectedAddons(newAddons);
  };

  const toggleAddon = (id) => {
    playClick();
    setSelectedAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate Total Realtime
  const calculation = useMemo(() => {
    const srv = currentService;
    const unitsCost = Math.max(0, unitCount - srv.minUnits) * srv.pricePerUnit;
    const baseSubtotal = srv.basePrice + unitsCost;

    let addonsCost = 0;
    const activeAddonNames = [];
    srv.addons.forEach((ad) => {
      if (selectedAddons[ad.id]) {
        addonsCost += ad.price;
        activeAddonNames.push(ad.label);
      }
    });

    const subtotal = baseSubtotal + addonsCost;
    // Express: +30% surcharge
    const expressSurcharge = isExpress ? Math.round(subtotal * 0.3) : 0;
    const total = subtotal + expressSurcharge;

    // Timeline estimate
    let days = serviceKey === 'presentation' ? 3 : serviceKey === 'website' ? 5 : 4;
    if (unitCount > 20) days += 3;
    if (isExpress) days = Math.max(2, Math.floor(days * 0.5));

    return {
      subtotal,
      expressSurcharge,
      total,
      estimatedDays: days,
      activeAddonNames,
    };
  }, [currentService, unitCount, selectedAddons, isExpress, serviceKey]);

  // Format currency
  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // WhatsApp formatted string
  const waMessage = useMemo(() => {
    const text = `Halo Min Cham (Studio Supernova)! 👋
Saya baru saja mencoba Kalkulator Estimasi di website dan ingin konsultasi kebutuhan berikut:

📋 *Layanan:* ${currentService.name}
📊 *Jumlah:* ${unitCount} ${currentService.unitLabel}
⚡ *Kecepatan:* ${isExpress ? 'KILAT (Express 48 Jam)' : 'Standar Normal (' + calculation.estimatedDays + ' Hari Kerja)'}
✦ *Fitur Tambahan:*
${calculation.activeAddonNames.length > 0 ? calculation.activeAddonNames.map((a) => '  • ' + a).join('\n') : '  • Tanpa tambahan'}

💰 *Perkiraan Estimasi:* ~${formatRupiah(calculation.total)}

Kira-kira slot pengerjaan minggu ini masih tersedia? Terima kasih!`;
    return encodeURIComponent(text);
  }, [currentService, unitCount, isExpress, calculation]);

  const waUrl = `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${waMessage}`;

  return (
    <section className="section calculator-section" id="kalkulator">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: 40 }}>
          <div className="section-note-pill">
            <span className="section-num">03</span>
            <span>TRANSPARANSI PENUH</span>
          </div>
          <h2 className="section-title">
            Kalkulator Estimasi Biaya &amp; Waktu. <span className="highlight-text">Tanpa Biaya Tersembunyi.</span>
          </h2>
          <p className="section-subtitle">
            Pilih kebutuhan Anda di bawah ini untuk melihat simulasi anggaran dan timeline secara transparan.
          </p>
        </div>

        {/* Main Interactive Calculator Grid */}
        <div className="calc-interactive-layout">
          {/* LEFT: Controls Panel */}
          <div className="calc-controls-card">
            {/* Step 1: Service Selector */}
            <div className="calc-group">
              <label className="calc-label">
                <span className="step-badge">1</span>
                <span>Pilih Layanan Utama:</span>
              </label>
              <div className="calc-service-pills">
                {Object.keys(PRICING_CONFIG).map((k) => {
                  const s = PRICING_CONFIG[k];
                  const isActive = serviceKey === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      className={`service-pill-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleServiceChange(k)}
                    >
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Slider for Units (Slides/Pages) */}
            <div className="calc-group">
              <div className="calc-label-row">
                <label className="calc-label">
                  <span className="step-badge">2</span>
                  <span>Jumlah {currentService.unitLabel}:</span>
                </label>
                <span className="calc-counter-pill">
                  {unitCount} {currentService.unitLabel}
                </span>
              </div>

              <div className="calc-range-wrapper">
                <input
                  type="range"
                  min={currentService.minUnits}
                  max={currentService.maxUnits}
                  step={currentService.unitStep}
                  value={unitCount}
                  onChange={(e) => {
                    setUnitCount(parseInt(e.target.value, 10));
                  }}
                  className="calc-range-slider"
                />
                <div className="range-marks">
                  <span>{currentService.minUnits} {currentService.unitLabel}</span>
                  <span>{currentService.maxUnits} {currentService.unitLabel}</span>
                </div>
              </div>
            </div>

            {/* Step 3: Addons */}
            <div className="calc-group">
              <label className="calc-label">
                <span className="step-badge">3</span>
                <span>Fitur Tambahan (Opsional):</span>
              </label>
              <div className="calc-addons-list">
                {currentService.addons.map((ad) => {
                  const isChecked = !!selectedAddons[ad.id];
                  return (
                    <div
                      key={ad.id}
                      className={`addon-item ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleAddon(ad.id)}
                    >
                      <div className="addon-checkbox">
                        {isChecked && <IconCheck size={12} color="#0f172a" />}
                      </div>
                      <div className="addon-text">
                        <span className="addon-name">{ad.label}</span>
                        <span className="addon-price">+{formatRupiah(ad.price)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Speed Toggle */}
            <div className="calc-group">
              <label className="calc-label">
                <span className="step-badge">4</span>
                <span>Kecepatan Pengerjaan:</span>
              </label>
              <div className="calc-speed-toggle">
                <button
                  type="button"
                  className={`speed-btn ${!isExpress ? 'active' : ''}`}
                  onClick={() => {
                    playClick();
                    setIsExpress(false);
                  }}
                >
                  <span className="speed-title">Standar Normal</span>
                  <span className="speed-sub">Sesuai Alur Desain Tenang</span>
                </button>
                <button
                  type="button"
                  className={`speed-btn express ${isExpress ? 'active' : ''}`}
                  onClick={() => {
                    playClick();
                    setIsExpress(true);
                  }}
                >
                  <span className="speed-title">⚡ Express Kilat (48 Jam)</span>
                  <span className="speed-sub">Prioritas Pengerjaan Lembur (+30%)</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Realtime Quotation Summary Box */}
          <div className="calc-summary-card">
            <div className="summary-header">
              <span className="summary-tag">ESTIMASI REAL-TIME</span>
              <h3>Rangkuman Paket Anda</h3>
              <p className="summary-service-name">{currentService.name}</p>
            </div>

            <div className="summary-body">
              <div className="summary-row">
                <span className="label">Spesifikasi Volume:</span>
                <span className="val">{unitCount} {currentService.unitLabel}</span>
              </div>
              <div className="summary-row">
                <span className="label">Estimasi Waktu Kerja:</span>
                <span className="val highlight-gold">~{calculation.estimatedDays} Hari Kerja</span>
              </div>
              <div className="summary-row">
                <span className="label">Fitur Tambahan:</span>
                <span className="val">{calculation.activeAddonNames.length} Dipilih</span>
              </div>
              <div className="summary-row">
                <span className="label">Format Berkas:</span>
                <span className="val">Master File 100% Hak Milik</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-total-box">
                <span className="total-label">Perkiraan Biaya Investasi:</span>
                <div className="total-number">{formatRupiah(calculation.total)}</div>
                <span className="total-note">*Harga final dapat disesuaikan kembali saat diskusi brief</span>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block calc-cta-btn"
                onClick={() => playClick()}
                data-cursor="Chat"
              >
                <IconWhatsApp size={18} />
                <span>Kirim Estimasi ke WhatsApp Min Cham</span>
              </a>

              <div className="summary-trust-badges">
                <span>✓ Konsultasi Awal Gratis</span>
                <span>✓ Garansi Revisi Fleksibel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
