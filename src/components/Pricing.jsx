import React from 'react';
import { IconCheck, IconArrowRight } from './Icons';
import { useSiteContent } from '../context/ContentContext';

export default function Pricing({ onSelectPackage }) {
  const { servicesList } = useSiteContent();

  return (
    <section className="section pricing-section" id="services-scope">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: 36 }}>
          <span className="section-tag">CAPABILITIES</span>
          <h2 className="section-title">Layanan Studio</h2>
          <p className="section-subtitle">
            Pilih disiplin yang sesuai dengan kebutuhan Anda. Seluruh master file diserahkan 100% milik Anda.
          </p>
        </div>

        <div className="packages-grid universal-grid minimal-capabilities-grid">
          {(servicesList || []).map((pkg) => (
            <div key={pkg.id} className="package-card minimal-cap-card">
              <div className="pkg-header">
                <span className="pkg-badge">{pkg.badge}</span>
                <h3 className="pkg-name">{pkg.name}</h3>
                <p className="pkg-desc">{pkg.desc}</p>
                <div className="pkg-time-pill">
                  <span>{pkg.turnaround}</span>
                </div>
              </div>
              <ul className="pkg-features minimal-features">
                {(pkg.deliverables || []).map((item, idx) => (
                  <li key={idx}>
                    <IconCheck size={14} color="#b8933b" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-outline btn-block select-pkg-btn"
                onClick={() => onSelectPackage(pkg.name)}
              >
                <span>{pkg.btnLabel || 'Konsultasi'}</span>
                <IconArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
