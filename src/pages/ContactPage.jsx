import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Contact from '../components/Contact';
import FAQSearchable from '../components/FAQSearchable';
import { STUDIO_CONFIG } from '../config/studioConfig';

export default function ContactPage({ initialBrief, initialType }) {
  return (
    <div className="page-contact human-page-wrap">
      <div className="container">
        <Breadcrumb items={[{ label: 'Kontak & Konsultasi' }]} />
      </div>

      {/* Header Banner */}
      <section className="contact-header-section">
        <div className="container">
          <div className="contact-header-content">
            <div className="zine-sticker-tag" style={{ '--sticker-rot': '-1deg' }}>
              <span className="zine-dot-pulse" />
              <span>RESPON CEPAT &bull; LANGSUNG KE MIN CHAM</span>
            </div>
            <h1 className="contact-main-title">
              Mulai obrolan santai, <br />
              <span className="title-serif-accent">tanpa tekanan atau birokrasi kaku.</span>
            </h1>
            <p className="contact-main-lead">
              Kirim draf slide, coretan kasar, atau rencana website Anda. Konsultasi awal 100% gratis dan Anda berbicara langsung dengan desainer penanggung jawab proyek.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Form & Channels */}
      <Contact initialBrief={initialBrief} initialType={initialType} />

      {/* Integrated Searchable FAQ */}
      <FAQSearchable />
    </div>
  );
}
