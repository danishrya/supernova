import React, { useState, useEffect } from 'react';
import {
  IconWhatsApp,
  IconMail,
  IconGlobe,
  IconShield,
  IconArrowRight,
  IconCheck,
} from './Icons';

export default function Contact({
  initialBrief = '',
  initialType = 'Desain Presentasi & Pitch Deck (PPT)',
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: initialType,
    urgency: 'Standar (Sesuai Alur Normal)',
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

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Mohon masukkan Nama dan No. WhatsApp aktif Anda.');
      return;
    }

    const message =
      `Halo Tim Supernova Studio,\n\n` +
      `Saya ingin berkonsultasi mengenai proyek kreatif untuk bisnis saya:\n\n` +
      `• Nama / Usaha: ${formData.name}\n` +
      `• No. WhatsApp: ${formData.phone}\n` +
      `• Email: ${formData.email || '-'}\n` +
      `• Kategori Layanan: ${formData.type}\n` +
      `• Target Waktu: ${formData.urgency}\n` +
      `• Ringkasan Kebutuhan:\n"${formData.brief || 'Ingin konsultasi & diskusi kebutuhan terlebih dahulu'}"\n\n` +
      `Mohon informasi penawaran dan ketersediaan jadwal tim Supernova. Terima kasih.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');

    setFeedback({
      type: 'success',
      text: 'Pesan telah disiapkan. Anda dialihkan ke WhatsApp resmi Supernova Studio.',
    });
  };

  const handleSendEmail = () => {
    if (!formData.name || !formData.email) {
      alert('Mohon isi minimal Nama dan Email Anda untuk pengiriman via email.');
      return;
    }

    const subject = encodeURIComponent(`[Konsultasi Proyek Kreatif] ${formData.type} — ${formData.name}`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nWhatsApp: ${formData.phone}\nEmail: ${formData.email}\nLayanan: ${formData.type}\nTarget Waktu: ${formData.urgency}\n\nKebutuhan Proyek:\n${formData.brief}`
    );

    window.location.href = `mailto:partnership@supernova.studio?subject=${subject}&body=${body}`;

    setFeedback({
      type: 'success',
      text: 'Aplikasi email Anda dibuka dengan draf konsultasi yang telah terisi rapi.',
    });
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-card-wrapper">
          <div className="contact-grid">
            {/* Left Info */}
            <div className="contact-info">
              <span className="section-tag">KONSULTASI AWAL GRATIS</span>
              <h2 className="contact-title">Mari Realisasikan Solusi Desain &amp; Digital Terbaik Anda</h2>
              <p className="contact-desc">
                Bingung menentukan format atau spesifikasi yang tepat untuk bisnis Anda? Tim kami siap berdiskusi
                dan merekomendasikan solusi yang paling efisien — baik Website, Slide Presentasi (PPT), maupun Desain Identitas Brand.
              </p>

              <div className="contact-channels">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card"
                >
                  <div className="ch-icon wa">
                    <IconWhatsApp size={22} color="#34d399" />
                  </div>
                  <div className="ch-text">
                    <span className="ch-label">WhatsApp Resmi (Respon Cepat)</span>
                    <strong className="ch-val">+62 812-3456-7890</strong>
                    <span className="ch-sub">Senin – Sabtu (09:00 – 18:00 WIB)</span>
                  </div>
                </a>

                <a
                  href="mailto:partnership@supernova.studio"
                  className="channel-card"
                >
                  <div className="ch-icon email">
                    <IconMail size={22} color="#b8933b" />
                  </div>
                  <div className="ch-text">
                    <span className="ch-label">Email Proposal Resmi</span>
                    <strong className="ch-val">partnership@supernova.studio</strong>
                    <span className="ch-sub">Untuk proposal tender &amp; korporasi</span>
                  </div>
                </a>

                <div className="channel-card">
                  <div className="ch-icon location">
                    <IconGlobe size={22} color="#2563eb" />
                  </div>
                  <div className="ch-text">
                    <span className="ch-label">Creative &amp; Engineering Studio</span>
                    <strong className="ch-val">Jakarta Selatan, DKI Jakarta</strong>
                    <span className="ch-sub">Melayani klien di seluruh Indonesia &amp; mancanegara</span>
                  </div>
                </div>
              </div>

              <div className="guarantee-box">
                <div className="g-icon-wrap">
                  <IconShield size={20} color="#b8933b" />
                </div>
                <p>
                  <strong>Jaminan Konsultasi Bebas Tekanan:</strong> Seluruh konsultasi awal bersifat gratis,
                  tidak mengikat, dan transparan. Kami fokus membantu merumuskan solusi kreatif yang paling memberikan dampak nyata bagi bisnis Anda.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="contact-form-panel">
              <form className="consultation-form" onSubmit={handleSubmitWhatsApp}>
                <h3 className="form-heading">Formulir Diskusi Proyek</h3>
                <p className="form-subheading">
                  Isi informasi singkat di bawah untuk langsung tersambung ke WhatsApp tim Supernova:
                </p>

                {feedback && (
                  <div className={`feedback-alert ${feedback.type}`}>
                    <IconCheck size={16} />
                    <span>{feedback.text}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="clientName">Nama Lengkap / Nama Bisnis *</label>
                    <input
                      type="text"
                      id="clientName"
                      name="name"
                      placeholder="Contoh: Hendra Kusuma"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="clientPhone">No. WhatsApp Aktif *</label>
                    <input
                      type="tel"
                      id="clientPhone"
                      name="phone"
                      placeholder="Contoh: 081234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="clientEmail">Email (Opsional)</label>
                    <input
                      type="email"
                      id="clientEmail"
                      name="email"
                      placeholder="nama@perusahaan.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serviceType">Kategori Layanan Utama</label>
                    <select
                      id="serviceType"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="Desain Presentasi & Pitch Deck (PPT)">Desain Presentasi &amp; Pitch Deck (PPT)</option>
                      <option value="Pembuatan Website Profesional">Pembuatan Website Profesional</option>
                      <option value="Desain Grafis & Brand Identity">Desain Grafis &amp; Brand Identity</option>
                      <option value="Bundling Universal Terpadu (All-in-One)">Bundling Universal Terpadu (All-in-One)</option>
                      <option value="Konsultasi Kustom / Kebutuhan Lainnya">Konsultasi Kustom / Kebutuhan Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="clientUrgency">Target Waktu Pengerjaan</label>
                  <select
                    id="clientUrgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                  >
                    <option value="Standar (Sesuai Alur Normal)">Standar (Sesuai Alur Normal Proyek)</option>
                    <option value="Prioritas / Kilat (Express Delivery)">Prioritas / Kilat (Express Delivery)</option>
                    <option value="Fleksibel / Diskusi Terlebih Dahulu">Fleksibel / Diskusi Terlebih Dahulu</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="projectBrief">Ceritakan Kebutuhan Proyek Anda</label>
                  <textarea
                    id="projectBrief"
                    name="brief"
                    rows="4"
                    placeholder="Contoh: Kami sedang persiapan fundraising ke investor dan butuh slide pitch deck 15 slide yang persuasif & elegan, sekaligus revisi logo perusahaan..."
                    value={formData.brief}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-actions-row">
                  <button type="submit" className="btn btn-primary btn-block btn-lg" id="submitWaBtn">
                    <IconWhatsApp size={18} />
                    <span>Lanjutkan ke WhatsApp Resmi</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={handleSendEmail}
                    id="submitEmailBtn"
                  >
                    <IconMail size={18} />
                    <span>Kirim via Email Resmi</span>
                  </button>
                </div>

                <p className="form-disclaimer">
                  Kerahasiaan data dan materi bisnis Anda 100% terjaga dan aman.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
