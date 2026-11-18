import React from 'react';

export default function TechRibbon() {
  const editorialNotes = [
    '100% MASTER FILE .PPTX & KODE DISERAHKAN PENUH',
    'NGOBROL LANGSUNG DENGAN MIN CHAM (TANPA SALES PERANTARA)',
    'BUKAN TEMPLATE AI PASARAN',
    'WEBSITE KILAT TERBUKA < 0.4 DETIK DI HP',
    'GARANSI REVISI FLEKSIBEL SAMPAI SIAP TAMPIL',
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
