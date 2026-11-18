import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconSearch, IconClose } from './Icons';
import { playClick } from '../utils/sound';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Listen for / or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input/textarea
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

      if ((e.key === '/' && !isInput) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Filter commands
  const filtered = STUDIO_CONFIG.quickCommands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    playClick();
    setIsOpen(false);
    navigate(item.path);
  };

  const handleArrows = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={() => setIsOpen(false)}>
      <div className="cmd-palette-card" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-row">
          <IconSearch size={18} color="#f59e0b" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Ketik tujuan halaman atau tekan panah..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleArrows}
            className="cmd-input"
          />
          <button
            type="button"
            className="cmd-close-btn"
            onClick={() => setIsOpen(false)}
          >
            Esc
          </button>
        </div>

        <div className="cmd-results-list">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={item.path}
                className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="cmd-item-left">
                  <span className="cmd-category-tag">{item.category}</span>
                  <span className="cmd-label">{item.label}</span>
                </div>
                <span className="cmd-path">{item.path}</span>
              </div>
            ))
          ) : (
            <div className="cmd-empty">
              <span>Tidak ada halaman yang cocok dengan "{query}".</span>
            </div>
          )}
        </div>

        <div className="cmd-footer">
          <span>Tekan <strong>↵ Enter</strong> untuk membuka &bull; <strong>↑↓</strong> untuk navigasi &bull; <strong>Esc</strong> tutup</span>
        </div>
      </div>
    </div>
  );
}
