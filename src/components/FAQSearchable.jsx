import React, { useState, useMemo } from 'react';
import { IconSearch, IconChevronDown } from './Icons';
import { useSiteContent } from '../context/ContentContext';
import { playClick } from '../utils/sound';

export default function FAQSearchable() {
  const { faqList } = useSiteContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  // Filtered FAQ
  const filteredFaq = useMemo(() => {
    if (!searchQuery.trim()) return faqList || [];
    const q = searchQuery.toLowerCase();
    return (faqList || []).filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [faqList, searchQuery]);

  const toggleAccordion = (idx) => {
    playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section faq-searchable-section" id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: 36 }}>
          <div className="section-note-pill">
            <span className="section-num">07</span>
            <span>TRANSPARANSI DETAIL</span>
          </div>
          <h2 className="section-title">
            Pertanyaan yang Sering Diajukan. <span className="highlight-text">Jawaban Jujur &amp; Jelas.</span>
          </h2>
          <p className="section-subtitle">
            Punya keraguan sebelum mulai? Cari langsung topik yang Anda ingin ketahui di bawah ini.
          </p>

          {/* Quick Search Bar */}
          <div className="faq-search-box">
            <IconSearch size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Ketik kata kunci (misal: revisi, file pptx, waktu, pembayaran)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-container">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={item.id || idx}
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{item.question}</span>
                    <span className={`faq-chevron-icon ${isOpen ? 'rotated' : ''}`}>
                      <IconChevronDown size={18} />
                    </span>
                  </button>

                  <div className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}>
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="faq-empty-search text-center">
              <p>Tidak ditemukan pertanyaan dengan kata kunci "{searchQuery}".</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSearchQuery('')}
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
