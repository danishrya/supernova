import React, { useState, useEffect } from 'react';
import {
  IconWhatsApp,
  IconMail,
  IconGlobe,
  IconShield,
  IconArrowRight,
  IconCheck,
} from './Icons';

const SERVICE_OPTIONS = [
  { id: 'presentation', label: 'Slide Presentasi & Pitch Deck (PPT)' },
  { id: 'web', label: 'Pembuatan Website Profesional' },
  { id: 'branding', label: 'Desain Grafis & Brand Identity' },
  { id: 'bundle', label: 'Bundling Studio Terpadu' },
  { id: 'custom', label: 'Konsultasi Kustom / Lainnya' },
];

const TIMELINE_OPTIONS = [
  'Fleksibel',
  'Standar (1-2 Minggu)',
  'Prioritas / Kilat',
];

export default function Contact({
  initialBrief = '',
  initialType = 'Slide Presentasi & Pitch Deck (PPT)',
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: initialType,
    urgency: 'Standar (1-2 Minggu)',
    brief: initialBrief,
  });

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (initialBrief) {
      setFormData((prev) => ({ ...prev, brief: initialBrief }));
    }
  }, [initialBrief]);

  useEffect(() => {
    if (initialType) {
      setFormData((prev) => ({ ...prev, type: initialType }));
    }
  }, [initialType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (label) => {
    setFormData((prev) => ({ ...prev, type: label }));
  };

  const handleSelectTimeline = (timeline) => {
    setFormData((prev) => ({ ...prev, urgency: timeline }));
  };

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Mohon masukkan Nama dan No. WhatsApp aktif Anda.');
      return;
    }

    const message =
      `Halo Tim Supernova Studio,\n\n` +
      `Saya ingin berkonsultasi mengenai proyek kreatif untuk bisnis saya:\n\n` +
      `• Nama / Bisnis: ${formData.name.trim()}\n` +
      `• No. WhatsApp: ${formData.phone.trim()}\n` +
      `• Email: ${formData.email.trim() || '-'}\n` +
      `• Layanan: ${formData.type}\n` +
      `• Timeline: ${formData.urgency}\n` +
      `• Catatan Kebutuhan:\n"${formData.brief.trim() || 'Ingin konsultasi & diskusi kebutuhan terlebih dahulu'}"\n\n` +
      `Mohon informasi penawaran dan ketersediaan jadwal tim Supernova. Terima kasih.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6285714521584?text=${encoded}`, '_blank');

    setFeedback({
      type: 'success',
      text: 'Pesan telah disiapkan. Menghubungkan Anda langsung ke WhatsApp resmi Supernova Studio...',
    });
  };

  const handleSendEmail = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Mohon isi Nama dan Email Anda untuk pengiriman via email.');
      return;
    }

    const subject = encodeURIComponent(`[Konsultasi Proyek] ${formData.type} — ${formData.name}`);
    const body = encodeURIComponent(
      `Nama / Bisnis: ${formData.name}\nWhatsApp: ${formData.phone}\nEmail: ${formData.email}\nLayanan: ${formData.type}\nTimeline: ${formData.urgency}\n\nKebutuhan Proyek:\n${formData.brief || 'Konsultasi awal'}`
    );

    window.location.href = `mailto:chasupernova.studio@gmail.com?subject=${subject}&body=${body}`;

    setFeedback({
      type: 'success',
      text: 'Aplikasi email Anda dibuka dengan draf konsultasi yang siap dikirim.',
    });
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-card-wrapper">
          <div className="contact-grid">
            {/* Left Column: Studio Contacts */}
            <div className="contact-info">
              <div className="contact-header-block">
                <span className="section-tag">KONSULTASI AWAL GRATIS</span>
                <h2 className="contact-title">Mulai Diskusi Proyek Anda</h2>
                <p className="contact-desc">
                  Konsultasi awal 100% gratis dan transparan. Ceritakan visi proyek Anda —
                  baik slide pitch deck investor, website siap pakai, maupun identitas visual brand,
                  kami siap merumuskan solusi paling efisien.
                </p>
              </div>

              <div className="contact-channels">
                <a
                  href="https://wa.me/6285714521584"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card"
                >
                  <div className="ch-icon wa">
                    <IconWhatsApp size={20} color="#059669" />
                  </div>
                  <div className="ch-text">
                    <div className="ch-header-row">
                      <span className="ch-label">WhatsApp Studio</span>
                      <span className="live-status-pill">
                        <span className="live-status-dot"></span>
                        <span>Respon Cepat</span>
                      </span>
                    </div>
                    <strong className="ch-val">+62 857-1452-1584</strong>
                    <span className="ch-sub">Senin – Sabtu (09:00 – 18:00 WIB)</span>
                  </div>
                </a>

                <a
                  href="mailto:chasupernova.studio@gmail.com"
                  className="channel-card"
                >
                  <div className="ch-icon email">
                    <IconMail size={20} color="#0f172a" />
                  </div>
                  <div className="ch-text">
                    <span className="ch-label">Email Proposal Resmi</span>
                    <strong className="ch-val">chasupernova.studio@gmail.com</strong>
                    <span className="ch-sub">Untuk proposal tender, NDA, &amp; korporasi</span>
                  </div>
                </a>

                <div className="channel-card location-card">
                  <div className="ch-icon location">
                    <IconGlobe size={20} color="#475569" />
                  </div>
                  <div className="ch-text">
                    <span className="ch-label">Studio Base</span>
                    <strong className="ch-val">Jakarta Selatan, DKI Jakarta</strong>
                    <span className="ch-sub">Melayani klien di seluruh Indonesia &amp; global</span>
                  </div>
                </div>
              </div>

              <div className="studio-trust-box">
                <div className="trust-icon-wrap">
                  <IconShield size={18} color="#0f172a" />
                </div>
                <div className="trust-content">
                  <strong>Privasi &amp; Kualitas Terjamin</strong>
                  <p>
                    Data bisnis dan materi pitch deck dijaga kerahasiaannya. Setiap output disertai master file terbuka (.PPTX / source code) siap pakai.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Modern Studio Form */}
            <div className="contact-form-panel">
              <form className="consultation-form" onSubmit={handleSubmitWhatsApp}>
                <div className="form-header-area">
                  <h3 className="form-heading">Detail Kebutuhan Proyek</h3>
                  <p className="form-subheading">
                    Pilih kategori dan isi data singkat untuk langsung terhubung dengan lead desainer kami:
                  </p>
                </div>

                {feedback && (
                  <div className={`feedback-alert ${feedback.type}`}>
                    <IconCheck size={16} />
                    <span>{feedback.text}</span>
                  </div>
                )}

                {/* Service Selection via Modern Interactive Pills */}
                <div className="form-field-group">
                  <label className="field-label">Kategori Layanan Utama</label>
                  <div className="service-pills-grid">
                    {SERVICE_OPTIONS.map((srv) => {
                      const isSelected = formData.type === srv.label;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          className={`service-pill-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => handleSelectService(srv.label)}
                        >
                          <span className="pill-check">{isSelected ? '✓' : '+'}</span>
                          <span>{srv.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & WhatsApp Row */}
                <div className="form-row">
                  <div className="form-field-group">
                    <label htmlFor="clientName" className="field-label">
                      Nama / Nama Bisnis <span className="req-dot">*</span>
                    </label>
                    <input
                      type="text"
                      id="clientName"
                      name="name"
                      className="studio-input"
                      placeholder="Nama Anda atau bisnis"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="clientPhone" className="field-label">
                      No. WhatsApp Aktif <span className="req-dot">*</span>
                    </label>
                    <input
                      type="tel"
                      id="clientPhone"
                      name="phone"
                      className="studio-input"
                      placeholder="08xxxxxxxxxx"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="form-field-group">
                  <label htmlFor="clientEmail" className="field-label">
                    Alamat Email <span className="opt-tag">(Opsional)</span>
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="email"
                    className="studio-input"
                    placeholder="nama@perusahaan.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Timeline Selector Pills */}
                <div className="form-field-group">
                  <label className="field-label">Target Waktu Pengerjaan</label>
                  <div className="timeline-pills-row">
                    {TIMELINE_OPTIONS.map((t) => {
                      const isSelected = formData.urgency === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          className={`timeline-pill ${isSelected ? 'active' : ''}`}
                          onClick={() => handleSelectTimeline(t)}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Brief */}
                <div className="form-field-group">
                  <label htmlFor="projectBrief" className="field-label">
                    Ceritakan Kebutuhan Proyek Anda
                  </label>
                  <textarea
                    id="projectBrief"
                    name="brief"
                    rows="3"
                    className="studio-textarea"
                    placeholder="Ceritakan gambaran singkat proyek, tujuan yang ingin dicapai, atau referensi desain yang diinginkan..."
                    value={formData.brief}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Form Actions */}
                <div className="form-actions-stack">
                  <button type="submit" className="studio-btn-primary" id="submitWaBtn">
                    <IconWhatsApp size={18} color="#25D366" />
                    <span>Lanjutkan ke WhatsApp Studio</span>
                    <IconArrowRight size={16} />
                  </button>

                  <div className="form-divider-row">
                    <span>atau lebih nyaman via email?</span>
                  </div>

                  <button
                    type="button"
                    className="studio-btn-secondary"
                    onClick={handleSendEmail}
                    id="submitEmailBtn"
                  >
                    <IconMail size={16} />
                    <span>Kirim Draf ke Email Resmi</span>
                  </button>
                </div>

                <p className="form-disclaimer">
                  🔒 Data bisnis dan materi diskusi Anda 100% terjaga dan aman. Tidak ada spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
