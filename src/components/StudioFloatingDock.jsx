import React, { useState, useEffect } from 'react';
import { IconWhatsApp, IconArrowRight } from './Icons';
import { useSiteContent } from '../context/ContentContext';
import { isSoundEnabled, toggleSound, playClick } from '../utils/sound';

export default function StudioFloatingDock() {
  const { contactInfo } = useSiteContent();
  const [soundOn, setSoundOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling down 180px
      if (window.scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    playClick();
    const email = contactInfo?.email || 'chasupernova.studio@gmail.com';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const scrollToArcade = (e) => {
    e.preventDefault();
    playClick();
    const el = document.getElementById('arcade');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const waUrl = `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${encodeURIComponent(
    'Halo Supernova Studio! Saya tertarik untuk konsultasi proyek desain & digital.'
  )}`;

  return (
    <aside
      aria-label="Studio Quick Actions"
      className={`studio-floating-dock ${isVisible ? 'dock-visible' : ''}`}
    >
      <div className="dock-pill-container">
        {/* Status Dot */}
        <div className="dock-status-item">
          <span className="dock-green-pulse" />
          <span className="dock-status-text">Studio Online</span>
        </div>

        <div className="dock-divider" />

        {/* Audio Toggle */}
        <button
          type="button"
          className="dock-btn sound-btn"
          onClick={handleToggleSound}
          title={soundOn ? 'Matikan Suara Interaksi' : 'Aktifkan Suara Interaksi'}
          aria-label={soundOn ? 'Matikan Suara' : 'Aktifkan Suara'}
        >
          <span>{soundOn ? '🔊' : '🔇'}</span>
        </button>

        {/* Mini Game Jump Shortcut */}
        <button
          type="button"
          className="dock-btn game-shortcut-btn"
          onClick={scrollToArcade}
          title="Mainkan Mini-Game Santai"
        >
          <span>🎮 Game</span>
        </button>

        {/* Quick Copy Email */}
        <button
          type="button"
          className="dock-btn copy-btn"
          onClick={handleCopyEmail}
          title="Salin Email Studio"
        >
          <span>{copied ? '✓ Tersalin!' : '✉ Salin Email'}</span>
        </button>

        <div className="dock-divider" />

        {/* Direct WhatsApp CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-wa-btn"
          onClick={() => playClick()}
          title="Chat Tim via WhatsApp"
        >
          <IconWhatsApp size={14} />
          <span>Chat WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
