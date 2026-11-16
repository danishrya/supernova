import React, { useEffect } from 'react';
import { IconClose, IconArrowRight, IconCheck } from './Icons';

export default function ProjectModal({ project, onClose, onConsultProject }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop open"
      id="projectModal"
      aria-hidden="false"
      onClick={(e) => {
        if (e.target.classList.contains('modal-backdrop')) onClose();
      }}
    >
      <div className="modal-container" role="dialog" aria-modal="true">
        <button
          className="modal-close-btn"
          id="modalCloseBtn"
          aria-label="Tutup Dialog"
          onClick={onClose}
        >
          <IconClose size={18} />
        </button>

        <div className="modal-body" id="modalContent">
          {project.image && (
            <div className="modal-img-wrap">
              <img src={project.image} alt={project.title} />
            </div>
          )}

          <div className="modal-header-meta">
            <span className="modal-tag">{project.categoryLabel}</span>
            <span className="modal-metric-badge">{project.badge}</span>
          </div>

          <h3 className="modal-title">{project.title}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.96rem' }}>
            {project.overview}
          </p>

          <div className="modal-section-block">
            <h4>Tantangan &amp; Kebutuhan Klien:</h4>
            <p>{project.challenge}</p>
          </div>

          <div className="modal-section-block">
            <h4>Solusi Rekayasa Supernova:</h4>
            <p>{project.solution}</p>
          </div>

          <div className="modal-section-block">
            <h4>Dampak Nyata Bagi Bisnis:</h4>
            <ul className="modal-bullets">
              {project.results.map((res, idx) => (
                <li key={idx}>
                  <IconCheck size={14} color="#b8933b" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section-block">
            <h4>Spesifikasi Fitur Utama:</h4>
            <div className="modal-tech-row">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-footer-cta">
            <button
              className="btn btn-primary"
              id="modalDiscussBtn"
              onClick={() => onConsultProject(project.title)}
            >
              <span>Konsultasikan Proyek Serupa</span>
              <IconArrowRight size={16} />
            </button>
            <button className="btn btn-secondary" id="modalDismissBtn" onClick={onClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
