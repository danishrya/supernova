import React from 'react';

export default function TechRibbon() {
  const marqueeItems = [
    'INVESTOR PITCH DECKS',
    'BRAND IDENTITY SYSTEMS',
    'DIGITAL & WEB EXPERIENCES',
    'CORPORATE PRESENTATIONS',
    'VENTURE CAPITAL & STARTUPS',
    'LUXURY & HOSPITALITY',
    'EDITORIAL & MARKETING COLLATERAL',
    '100% MASTER FILES INCLUDED',
  ];

  return (
    <div className="studio-marquee-strip">
      <div className="marquee-inner">
        <div className="marquee-content">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <span key={idx} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <span className="marquee-separator">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
