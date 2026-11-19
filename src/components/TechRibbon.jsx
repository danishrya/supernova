import React from 'react';

export default function TechRibbon() {
  const editorialNotes = [
    '100% Hak Milik Master File',
    'Bicara Langsung dengan Desainer',
    'Karya Kustom Orisinal',
    'Website Kilat < 0.4s di HP',
    'Garansi Revisi Sampai Puas',
  ];

  return (
    <div className="studio-dateline-strip" aria-label="Studio Guarantees">
      <div className="container">
        <div className="dateline-inner-row">
          <span className="dateline-stamp">STUDIO SUPERNOVA &bull; PRINSIP KERJA:</span>
          <div className="dateline-items-track">
            {editorialNotes.map((note, idx) => (
              <span key={idx} className="dateline-pill-item">
                <span className="pill-dot">✦</span>
                <span className="pill-label">{note}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
