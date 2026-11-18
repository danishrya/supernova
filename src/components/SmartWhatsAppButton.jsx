import React, { useState, useEffect } from 'react';
import { IconWhatsApp } from './Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick } from '../utils/sound';

export default function SmartWhatsAppButton() {
  const { contactInfo } = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [contextData, setContextData] = useState({
    label: 'Chat Min Cham (Respon < 30m)',
    msg: 'Halo Min Cham! Saya sedang melihat website Studio Supernova dan tertarik untuk konsultasi proyek.',
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 250);

      // Section check based on viewport position
      const scrollPosition = scrollY + window.innerHeight * 0.45;

      const calcEl = document.getElementById('kalkulator');
      const compEl = document.getElementById('comparison');
      const prodEl = document.getElementById('produk-digital');
      const aboutEl = document.getElementById('tentang');
      const worksEl = document.getElementById('works');

      if (calcEl && scrollPosition >= calcEl.offsetTop && scrollPosition < calcEl.offsetTop + calcEl.offsetHeight) {
        setContextData({
          label: 'Diskusi Hasil Kalkulator via WA',
          msg: 'Halo Min Cham! Saya sedang cek Kalkulator Estimasi di website dan mau tanya ketersediaan slot pengerjaannya.',
        });
      } else if (compEl && scrollPosition >= compEl.offsetTop && scrollPosition < compEl.offsetTop + compEl.offsetHeight) {
        setContextData({
          label: 'Mau Bedah Slide/Web Anda?',
          msg: 'Halo Min Cham! Saya baru saja melihat perbandingan Before/After di website. Saya punya materi lama yang ingin di-bedah visualnya.',
        });
      } else if (prodEl && scrollPosition >= prodEl.offsetTop && scrollPosition < prodEl.offsetTop + prodEl.offsetHeight) {
        setContextData({
          label: 'Tanya Produk Digital via WA',
          msg: 'Halo Min Cham! Mau tanya ketersediaan dan cara beli produk digital/template di Studio Supernova.',
        });
      } else if (aboutEl && scrollPosition >= aboutEl.offsetTop && scrollPosition < aboutEl.offsetTop + aboutEl.offsetHeight) {
        setContextData({
          label: 'Ngobrol Langsung sama Min Cham',
          msg: 'Halo Min Cham! Saya tertarik dengan prinsip kerja Studio Supernova. Mau ngobrol santai untuk kerja sama.',
        });
      } else if (worksEl && scrollPosition >= worksEl.offsetTop && scrollPosition < worksEl.offsetTop + worksEl.offsetHeight) {
        setContextData({
          label: 'Tertarik Portofolio Kami?',
          msg: 'Halo Min Cham! Saya suka gaya portofolio karya Studio Supernova. Bisakah buatkan karya serupa untuk proyek saya?',
        });
      } else {
        setContextData({
          label: 'Chat Min Cham (Respon < 30m)',
          msg: 'Halo Min Cham! Saya sedang melihat website Studio Supernova dan tertarik untuk konsultasi proyek.',
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waUrl = `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${encodeURIComponent(
    contextData.msg
  )}`;

  return (
    <aside
      aria-label="Floating WhatsApp"
      className={`smart-wa-floating-btn ${isVisible ? 'visible' : ''}`}
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="smart-wa-anchor"
        onClick={() => playClick()}
        data-cursor="Chat"
      >
        <div className="wa-icon-glow">
          <IconWhatsApp size={20} color="#ffffff" />
          <span className="wa-pulse-ring" />
        </div>
        <div className="wa-text-content">
          <span className="wa-status-text">● Min Cham Online</span>
          <span className="wa-dynamic-label">{contextData.label}</span>
        </div>
      </a>
    </aside>
  );
}
