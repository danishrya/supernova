import React, { useState, useEffect, useRef } from 'react';
import { IconCheck } from './Icons';
import { playClick } from '../utils/sound';

export default function InteractiveTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'Konsultasi Santai via WA',
      duration: 'Hari ke-1',
      badge: 'GRATIS TANPA SYARAT',
      desc: 'Ceritakan ide atau materi mentahan Anda (dokumen Word, catatan tangan, atau slide lama). Kita sepakati alur narasi, jumlah halaman, dan estimasi waktu yang masuk akal.',
      deliverable: 'Rangkuman kesepakatan brief & timeline pasti.',
    },
    {
      num: '02',
      title: 'Draf Konsep & Tata Letak Visual',
      duration: 'Hari ke-2 – 3',
      badge: 'FOKUS HIERARKI',
      desc: 'Min Cham langsung mengeksekusi slide kunci atau draf layout utama terlebih dahulu. Anda bisa melihat arah gaya visual, warna, dan keterbacaan teks sebelum pengerjaan penuh.',
      deliverable: 'Preview draf pertama via WhatsApp / Link interaktif.',
    },
    {
      num: '03',
      title: 'Revisi Terbimbing Tanpa Baper',
      duration: 'Hari ke-3 – 4',
      badge: 'REVISI FLEKSIBEL',
      desc: 'Beri masukan Anda secara spesifik. Kami poles tipografi, perbaiki grafik, dan sesuaikan detail kecil hingga Anda benar-benar puas dan bangga mempresentasikannya.',
      deliverable: 'Penyempurnaan detail berdasarkan catatan Anda.',
    },
    {
      num: '04',
      title: 'Serah Terima Seluruh Master File',
      duration: 'Hari ke-4 – 5',
      badge: '100% HAK MILIK',
      desc: 'Seluruh berkas mentahan resmi diserahkan: file .PPTX yang bisa diedit di PowerPoint, aset vektor (.AI / .SVG), template Canva, atau source code website bersih tanpa enkripsi.',
      deliverable: 'Folder ZIP rapi via Google Drive / Email.',
    },
  ];

  // Scroll spy to highlight steps as user scrolls past
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const stepElements = containerRef.current.querySelectorAll('.timeline-step-card');
      const windowCenter = window.innerHeight * 0.55;

      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowCenter && rect.bottom >= windowCenter) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section timeline-section" id="alur-kerja" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: 44 }}>
          <div className="section-note-pill">
            <span className="section-num">06</span>
            <span>ALUR KERJA TERSTRUKTUR</span>
          </div>
          <h2 className="section-title">
            Proses Kerja Sederhana. <span className="highlight-text">Tanpa Drama, Selesai Tepat Waktu.</span>
          </h2>
          <p className="section-subtitle">
            Alur 4 tahap transparan dari diskusi pertama hingga serah terima file akhir ke tangan Anda.
          </p>
        </div>

        {/* Timeline Horizontal / Stepper Indicator */}
        <div className="timeline-stepper-bar">
          {steps.map((st, idx) => (
            <button
              key={idx}
              type="button"
              className={`stepper-node-btn ${activeStep === idx ? 'active' : activeStep > idx ? 'completed' : ''}`}
              onClick={() => {
                playClick();
                setActiveStep(idx);
              }}
            >
              <span className="node-num">{st.num}</span>
              <span className="node-title">{st.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Timeline Step Cards Grid */}
        <div className="timeline-steps-grid">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                className={`timeline-step-card ${isActive ? 'active-step' : ''}`}
                onClick={() => {
                  playClick();
                  setActiveStep(idx);
                }}
              >
                <div className="step-card-header">
                  <span className="step-card-num">{step.num}</span>
                  <span className="step-card-duration">{step.duration}</span>
                </div>

                <div className="step-badge-pill">{step.badge}</div>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.desc}</p>

                <div className="step-deliverable-box">
                  <span className="deliverable-label">OUTPUT TAHAP INI:</span>
                  <div className="deliverable-text">
                    <IconCheck size={13} color="#e2b764" />
                    <span>{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
