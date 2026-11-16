import React from 'react';

export default function ThreeStepEasyFlow() {
  const steps = [
    {
      num: '01',
      title: 'Brief & Discovery',
      desc: 'Pemetaan pesan kunci, target audiens, dan referensi visual yang diinginkan.',
    },
    {
      num: '02',
      title: 'Design & Craft',
      desc: 'Penyusunan narasi slide, sistem visual brand, atau arsitektur web modern.',
    },
    {
      num: '03',
      title: 'Handover & Files',
      desc: 'Revisi terarah hingga selesai, dilanjutkan serah terima master file 100% hak milik Anda.',
    },
  ];

  return (
    <section className="section three-steps-section minimal-flow-section" id="howItWorks">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: 36 }}>
          <span className="section-tag">ALUR KERJA</span>
          <h2 className="section-title">Bagaimana Kami Bekerja</h2>
        </div>

        <div className="three-steps-grid minimal-steps-grid">
          {steps.map((s, idx) => (
            <div key={idx} className="step-flow-card minimal-step-card">
              <span className="step-big-number">{s.num}</span>
              <h3 className="step-flow-title">{s.title}</h3>
              <p className="step-flow-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
