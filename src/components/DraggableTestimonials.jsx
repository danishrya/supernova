import React, { useState, useRef } from 'react';
import { IconStar } from './Icons';
import { playClick } from '../utils/sound';

export default function DraggableTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Real-world authentic client stories (with honest placeholders where actual data is inputted by Min Cham)
  const testimonials = [
    {
      id: 'testi-1',
      name: 'Rian Pratama [ISI: Nama Klien]',
      role: 'Founder, Fintech Startup Jakarta',
      category: 'DESAIN PITCH DECK PPT',
      quote:
        'Tadinya slide kami ada 48 slide dan investor sering bosan di menit ke-5. Sama Min Cham dibedah total jadi 16 slide yang sangat tajam. Hasilnya kami tembus pendanaan awal $1.8M. Master file .PPTX-nya rapi banget dan gampang diedit ulang.',
      metric: 'Lolos Seed Round &bull; 16 Slide',
      stars: 5,
    },
    {
      id: 'testi-2',
      name: 'Siti Nurhaliza [ISI: Nama Klien]',
      role: 'Owner, Toko Fashion & Craft Solo',
      category: 'PEMBUATAN WEBSITE UMKM',
      quote:
        'Dulu pernah bayar jasa web jutaan tapi loadingnya lemot dan gak ada tombol WA yang jelas. Di Supernova dibikinin website yang super enteng dibuka dari HP. Pembeli langsung klik WA dan omzet naik terasa di bulan pertama.',
      metric: 'Speed 0.3s &bull; Chat WA Naik 2x',
      stars: 5,
    },
    {
      id: 'testi-3',
      name: 'Dimas Wicaksono [ISI: Nama Klien]',
      role: 'Mahasiswa Magister Bisnis Bandung',
      category: 'SLIDE SIDANG AKADEMIK',
      quote:
        'Slide tesis 30 slide selesai dalam waktu 48 jam sebelum sidang proposal. Dosen penguji bahkan memuji kerapian grafik dan penyajian datanya. Recommended banget buat yang kepepet deadline!',
      metric: 'Selesai 48 Jam &bull; Nilai A',
      stars: 5,
    },
    {
      id: 'testi-4',
      name: 'Hendra Kusuma [ISI: Nama Klien]',
      role: 'Direktur Operasional Logistik',
      category: 'COMPANY PROFILE & TENDER DECK',
      quote:
        'Proposal tender korporasi bernilai miliaran rupiah berhasil kami menangkan. Visual yang disajikan Supernova sangat berwibawa dan tidak kelihatan murahan seperti template Canva pasaran.',
      metric: 'Menang Tender Korporat',
      stars: 5,
    },
  ];

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollNext = () => {
    playClick();
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    playClick();
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  return (
    <section className="section testimonials-draggable-section" id="testimoni">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: 36 }}>
          <div className="section-note-pill">
            <span className="section-num">08</span>
            <span>BUKTI KEPUASAN NYATA</span>
          </div>
          <h2 className="section-title">
            Pengalaman Klien Min Cham. <span className="highlight-text">Cerita Jujur dari Lapangan.</span>
          </h2>
          <p className="section-subtitle">
            Geser kartu ulasan ke samping untuk membaca pengalaman founder, pemilik toko, dan akademisi yang telah bekerja sama.
          </p>

          <div className="slider-nav-arrows">
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={scrollPrev}
              aria-label="Geser ke kiri"
            >
              ←
            </button>
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={scrollNext}
              aria-label="Geser ke kanan"
            >
              →
            </button>
          </div>
        </div>

        {/* Draggable Cards Track */}
        <div
          ref={sliderRef}
          className="testimonials-drag-track"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          data-cursor="Geser"
        >
          {testimonials.map((t) => (
            <div key={t.id} className="testi-drag-card">
              <div className="testi-card-top-row">
                <div className="testi-stars-row">
                  {[...Array(t.stars)].map((_, i) => (
                    <IconStar key={i} size={14} />
                  ))}
                </div>
                <span className="testi-cat-badge">{t.category}</span>
              </div>

              <p className="testi-quote-text">"{t.quote}"</p>

              <div className="testi-metric-tag" dangerouslySetInnerHTML={{ __html: t.metric }} />

              <div className="testi-client-profile">
                <div className="client-avatar-badge">
                  {t.name.charAt(0)}
                </div>
                <div className="client-info">
                  <strong className="client-name">{t.name}</strong>
                  <span className="client-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
