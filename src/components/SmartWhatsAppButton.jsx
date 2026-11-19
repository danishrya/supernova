import React from 'react';
import { useSiteContent } from '../context/ContentContext';
import { playClick } from '../utils/sound';

export default function SmartWhatsAppButton() {
  const { contactInfo } = useSiteContent();

  const waUrl = `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${encodeURIComponent(
    'Halo Min Cham! Saya sedang melihat website Studio Supernova dan mau tanya-tanya seputar layanan desain.'
  )}`;

  return (
    <aside
      aria-label="Floating WhatsApp"
      data-name="Aside - FLOATING WHATSAPP PILL BUTTON (Bottom Right, 24px inset)"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="figma-floating-wa"
        onClick={() => playClick()}
      >
        <span className="figma-wa-status-dot" />
        <span className="figma-wa-text">Chat WhatsApp</span>
      </a>
    </aside>
  );
}
