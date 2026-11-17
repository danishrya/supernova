import React, { useState } from 'react';
import { useSiteContent } from '../context/ContentContext';
import { IconChevronDown } from './Icons';

export default function FAQ() {
  const { faqList } = useSiteContent();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const list = faqList || [];

  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-container">
        <div className="section-header text-center">
          <span className="section-tag">PERTANYAAN UMUM</span>
          <h2 className="section-title">Hal yang Sering Ditanyakan (FAQ)</h2>
          <p className="section-subtitle">
            Transparansi adalah prioritas kami. Temukan jawaban seputar alur kerja, garansi, dan hak cipta karya Anda.
          </p>
        </div>

        <div className="faq-accordion" id="faqAccordion">
          {list.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.id || idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className={`faq-chevron-icon ${isOpen ? 'rotated' : ''}`}>
                    <IconChevronDown size={18} color="#dfbe76" />
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
