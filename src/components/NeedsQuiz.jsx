import React, { useState } from 'react';
import { IconArrowRight, IconWhatsApp } from './Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick, playPop } from '../utils/sound';

export default function NeedsQuiz() {
  const { contactInfo } = useSiteContent();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 'profile',
      tag: 'PERTANYAAN 01 / 03',
      title: 'Siapa Anda dan apa fokus utama proyek Anda saat ini?',
      options: [
        {
          key: 'business',
          title: 'Pemilik UMKM / Bisnis Lokal',
          desc: 'Ingin meningkatkan kredibilitas & penjualan produk secara profesional.',
        },
        {
          key: 'founder',
          title: 'Founder Startup / Profesional B2B',
          desc: 'Sedang persiapan pitching investor, proposal tender, atau pameran.',
        },
        {
          key: 'student',
          title: 'Mahasiswa / Akademisi / Freelancer',
          desc: 'Butuh slide sidang tugas akhir, seminar, atau portofolio kerja.',
        },
      ],
    },
    {
      id: 'painpoint',
      tag: 'PERTANYAAN 02 / 03',
      title: 'Tantangan visual apa yang paling mendesak untuk diselesaikan?',
      options: [
        {
          key: 'ppt',
          title: 'Slide Presentasi & Narasi Data',
          desc: 'Slide lama terlalu padat teks, grafiknya kaku, dan bikin audiens ngantuk.',
        },
        {
          key: 'web',
          title: 'Website Resmi & Toko Online',
          desc: 'Belum punya landing page modern yang cepat dan terhubung langsung ke WhatsApp.',
        },
        {
          key: 'branding',
          title: 'Identitas Brand & Konten Promosi',
          desc: 'Logo, warna, dan materi postingan medsos masih belum konsisten.',
        },
      ],
    },
    {
      id: 'timeline',
      tag: 'PERTANYAAN 03 / 03',
      title: 'Kapan hasil karya ini harus siap dipresentasikan atau diluncurkan?',
      options: [
        {
          key: 'express',
          title: '⚡ Sangat Mendesak (48 Jam / 2 Hari)',
          desc: 'Perlu jalur kilat lembur prioritas.',
        },
        {
          key: 'normal',
          title: '✦ Standar Normal (3 – 6 Hari Kerja)',
          desc: 'Alur desain tenang dengan kesempatan revisi bertahap.',
        },
        {
          key: 'relaxed',
          title: '☕ Rencana Jangka Panjang (> 1 Minggu)',
          desc: 'Masih dalam tahap persiapan materi dan riset ide.',
        },
      ],
    },
  ];

  const handleSelectOption = (qId, optionKey) => {
    playClick();
    const updated = { ...answers, [qId]: optionKey };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    playPop();
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Determine Recommendation
  const getRecommendation = () => {
    const { painpoint, profile } = answers;
    if (painpoint === 'ppt') {
      return {
        badge: 'REKOMENDASI TERBAIK',
        title: 'Paket Desain Presentasi & Pitch Deck (PPT)',
        desc: 'Sangat cocok untuk Anda yang butuh slide berbobot dengan alur cerita persuasif. Slide dirancang dengan format Master .PPTX sehingga bisa Anda edit bebas.',
        deliverables: ['Master PPTX 16:9 HD', 'Infografik Kustom', 'Alur Storytelling Persuasif'],
      };
    }
    if (painpoint === 'web') {
      return {
        badge: 'REKOMENDASI TERBAIK',
        title: 'Paket Website Profesional & Landing Page Kilat',
        desc: 'Solusi website ringan (loading < 0.4 detik), ramah ponsel, dan memiliki tombol WhatsApp otomatis yang memudahkan pelanggan Anda langsung menghubungi Anda.',
        deliverables: ['Website Responsif HP/PC', 'Alur Pesan WA Otomatis', 'Google SEO & Domain Setup'],
      };
    }
    return {
      badge: 'REKOMENDASI TERBAIK',
      title: 'Paket Identitas Brand & Template Media Sosial',
      desc: 'Membangun karakter visual yang kuat untuk bisnis Anda. Termasuk master vektor, palet warna, dan template Canva/Photoshop siap pakai harian.',
      deliverables: ['Logo & Brand Guidelines', 'Template Siap Edit di Canva', 'Master Vektor AI/SVG/EPS'],
    };
  };

  const recommendation = isCompleted ? getRecommendation() : null;

  const waMessage = recommendation
    ? encodeURIComponent(
        `Halo Min Cham! Saya baru saja mengisi kuis di website Supernova dan mendapatkan rekomendasi: *${recommendation.title}*. Bisa tolong jelaskan detail dan langkah diskusinya? Terima kasih!`
      )
    : '';

  const waUrl = `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${waMessage}`;

  return (
    <section className="section quiz-section" id="kuis">
      <div className="container">
        <div className="quiz-card-wrapper">
          {!isCompleted ? (
            <div className="quiz-active-box">
              {/* Progress Header */}
              <div className="quiz-header">
                <span className="quiz-tag">{questions[currentStep].tag}</span>
                <div className="quiz-step-dots">
                  {questions.map((_, idx) => (
                    <span
                      key={idx}
                      className={`step-dot ${currentStep === idx ? 'active' : currentStep > idx ? 'done' : ''}`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="quiz-question-title">{questions[currentStep].title}</h3>

              {/* Options */}
              <div className="quiz-options-list">
                {questions[currentStep].options.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    className="quiz-option-btn"
                    onClick={() => handleSelectOption(questions[currentStep].id, opt.key)}
                  >
                    <div className="opt-title">{opt.title}</div>
                    <div className="opt-desc">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Box */
            <div className="quiz-result-box">
              <span className="result-badge">{recommendation.badge}</span>
              <h3 className="result-title">{recommendation.title}</h3>
              <p className="result-desc">{recommendation.desc}</p>

              <div className="result-deliverables-pills">
                {recommendation.deliverables.map((item, idx) => (
                  <span key={idx} className="result-pill">
                    ✦ {item}
                  </span>
                ))}
              </div>

              <div className="result-action-row">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                  onClick={() => playClick()}
                >
                  <IconWhatsApp size={16} />
                  <span>Konsultasikan Rekomendasi Ini via WA</span>
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  <span>Ulangi Kuis ↺</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
