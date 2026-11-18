import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { PROJECTS_DATA } from '../data/projects';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { IconArrowRight, IconWhatsApp, IconCheck } from '../components/Icons';
import { playClick } from '../utils/sound';

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const project = PROJECTS_DATA.find((p) => p.id === slug);

  if (!project) {
    return (
      <div className="page-case-study human-page-wrap">
        <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h1 className="notfound-title">Dokumen Tidak Ditemukan</h1>
          <p className="notfound-desc">
            Studi kasus yang Anda cari mungkin telah dipindahkan atau belum diterbitkan.
          </p>
          <Link to="/portofolio" className="btn btn-primary" onClick={() => playClick()}>
            <span>Kembali ke Galeri Portofolio &rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Halo Min Cham! Saya tertarik dengan studi kasus proyek "${project.title}". Apakah bisa konsultasi untuk kebutuhan serupa di bisnis saya?`
  )}`;

  return (
    <div className="page-case-study human-page-wrap">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Portofolio', path: '/portofolio' },
            { label: project.title },
          ]}
        />
      </div>

      {/* Case Study Header */}
      <section className="case-study-hero">
        <div className="container">
          <div className="case-study-meta-bar">
            <span className="case-badge-pill">{project.badge || project.categoryLabel}</span>
            <span className="case-mono-meta">DOKUMEN STUDI KASUS &bull; STUDIO SUPERNOVA</span>
          </div>

          <h1 className="case-study-title">{project.title}</h1>
          <p className="case-study-lead">{project.overview}</p>

          <div className="case-cta-top">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => playClick()}
            >
              <IconWhatsApp size={16} />
              <span>Pesan Kualitas Serupa</span>
            </a>

            <Link to="/portofolio" className="btn btn-secondary" onClick={() => playClick()}>
              <span>&larr; Lihat Karya Lain</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artwork Display */}
      <section className="section py-small">
        <div className="container">
          <div className="case-featured-image-frame">
            <img
              src={project.image}
              alt={project.title}
              className="case-featured-img"
            />
          </div>
        </div>
      </section>

      {/* Detailed Analysis: Challenge, Solution, Concrete Results */}
      <section className="section case-details-section">
        <div className="container">
          <div className="case-details-grid">
            {/* Left Column: Challenge & Solution */}
            <div className="case-details-narrative">
              <div className="case-block">
                <span className="case-block-label">01 &bull; TANTANGAN KLIEN</span>
                <h2 className="case-block-heading">Kondisi Awal Sebelum Ditangani</h2>
                <p className="case-block-text">{project.challenge}</p>
              </div>

              <div className="case-block">
                <span className="case-block-label">02 &bull; PENDEKATAN KAMI</span>
                <h2 className="case-block-heading">Solusi Visual &amp; Eksekusi</h2>
                <p className="case-block-text">{project.solution}</p>
              </div>
            </div>

            {/* Right Column: Tangible Results Box */}
            <div className="case-details-sidebar">
              <div className="case-results-card">
                <div className="results-card-header">
                  <span className="results-card-mono">HASIL TERUKUR</span>
                  <span className="results-card-badge">VERIFIED</span>
                </div>
                <h3 className="results-card-title">Dampak Nyata Pasca Pengerjaan:</h3>
                <ul className="results-card-list">
                  {project.results &&
                    project.results.map((res, idx) => (
                      <li key={idx}>
                        <IconCheck size={16} color="#10b981" />
                        <span>{res}</span>
                      </li>
                    ))}
                </ul>

                {project.tags && (
                  <div className="results-tags-wrap">
                    <span className="tags-label">Kategori / Spesifikasi:</span>
                    <div className="tags-pills">
                      {project.tags.map((t, idx) => (
                        <span key={idx} className="tag-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="results-card-cta">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-full"
                    onClick={() => playClick()}
                  >
                    <IconWhatsApp size={16} />
                    <span>Chat Min Cham untuk Proyek Ini</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
