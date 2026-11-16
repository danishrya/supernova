import React from 'react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Konsultasi & Pemetaan Kebutuhan',
      desc: 'Diskusikan visi, materi, dan target audiens bisnis Anda. Kami bantu merumuskan struktur materi yang tepat tanpa kerumitan teknis.',
    },
    {
      num: '02',
      title: 'Penyusunan Alur & Desain Konseptual',
      desc: 'Kami merancang konsep visual eksklusif — baik tata letak slide presentasi, antarmuka website, maupun sketsa identitas brand yang selaras dengan karakter bisnis Anda.',
    },
    {
      num: '03',
      title: 'Produksi Presisi & Standar Kualitas',
      desc: 'Slide PPT diperkuat infografik data jernih; website direkayasa dengan kode ringan super cepat; aset grafis diekspor dalam format vektor resolusi tinggi.',
    },
    {
      num: '04',
      title: 'Serah Terima Lengkap & Master File',
      desc: 'Seluruh berkas master (.PPTX, kode web, atau vektor AI/SVG) diserahkan 100% menjadi milik Anda, didukung garansi revisi terarah hingga tuntas.',
    },
  ];

  return (
    <section className="section process-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">ALUR KERJA TRANSPARAN</span>
          <h2 className="section-title">
            4 Langkah Terstruktur Menuju Karya Berstandar Global
          </h2>
          <p className="section-subtitle">
            Kami menjaga komunikasi yang teratur dan transparan di setiap fase, memastikan proyek Anda
            selesai tepat waktu dengan standar mutu tinggi.
          </p>
        </div>

        <div className="process-steps-grid">
          {steps.map((s, idx) => (
            <div key={idx} className="process-step-card">
              <div className="step-number">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
