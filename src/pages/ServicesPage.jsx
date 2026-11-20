import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { playClick } from '../utils/sound';
import {
  ServiceJumpNav,
  PptMorphVisual,
  WebResizeVisual,
  ProdukFanVisual,
  OrderTimeline,
} from '../components/LayananInteractive';

export default function ServicesPage() {
  // FAQ accordion active item state
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Berapa kali bisa revisi?',
      a: 'Standar 2-3 kali revisi minor sampai lo bener-bener sreg, asalkan nggak melenceng dari brief awal yang udah kita sepakati di awal. Kalau ada perombakan konsep total atau penambahan halaman di tengah jalan, baru kita hitung penyesuaian biaya secara transparan.',
    },
    {
      q: 'Berapa lama pengerjaannya?',
      a: 'Tergantung kompleksitas. PPT biasanya 3–5 hari kerja. Website rata-rata 7–14 hari kerja. Kalau butuh pengerjaan kilat 24–48 jam, ada opsi rush fee yang bisa dibicarakan di awal.',
    },
    {
      q: 'Bayarnya gimana?',
      a: 'DP 50% di awal sebelum pengerjaan dimulai untuk mengunci jadwal kalender. Sisa 50% dilunasi setelah hasil akhir disetujui, sebelum penyerahan seluruh file master. Pembayaran via transfer bank lokal atau QRIS.',
    },
    {
      q: 'File yang gue terima apa aja?',
      a: 'Untuk PPT: file master .PPTX yang bisa diedit mandiri + PDF high-res. Untuk Website: akses repository GitHub, hosting live, serta akun domain milik lo 100%. Untuk Produk: file master Figma/Notion/PPTX instan download.',
    },
    {
      q: 'Bisa yang mendesak?',
      a: 'Bisa banget! Kalau lo ada sidang mendadak, tender mepet, atau pitching investor besok lusa, chat gue langsung di WhatsApp dengan keterangan "URGENT". Selama slot darurat kosong, langsung gue gas.',
    },
  ];

  const waLayananUrl = (topic) =>
    `https://wa.me/6285714521584?text=${encodeURIComponent(
      `Halo Min Cham! Mau tanya estimasi dan jadwal untuk layanan: ${topic}.`
    )}`;

  return (
    <div className="figma-main-wrapper" data-name="Supernova Studio — Layanan (Figma 2001:454)">
      {/* Subtle Grain Overlay */}
      <div className="figma-grain-overlay" aria-hidden="true">
        <img src="/figma-assets/grain.svg" alt="" />
      </div>

      {/* =========================================================================
          SECTION 1: TOP EDITORIAL HEADER (Figma 2001:457)
          ========================================================================= */}
      <section className="figma-layanan-header-section" data-name="Section - TOP EDITORIAL HEADER">
        <div className="figma-layanan-header-container">
          {/* Tracker Row */}
          <div className="figma-layanan-tracker-row">
            <div className="figma-tracker-chip">
              <span className="figma-tag-dot" />
              <span>LAYANAN // CATALOGUE 2026</span>
            </div>

            <div className="figma-tracker-meta">
              <span>SOLO PRACTICE</span>
              <span>•</span>
              <span>YOGYAKARTA, ID</span>
              <span>•</span>
              <span className="highlight-slot">SLOT AKTIF TERSEDIA</span>
            </div>
          </div>

          {/* Headline & Handwritten Note */}
          <div className="figma-layanan-title-split">
            <div className="figma-layanan-title-left">
              <h1 className="figma-layanan-h1">
                Apa aja yang<br />
                bisa gue bikinin.
              </h1>
              <p className="figma-layanan-intro">
                Nggak perlu tim agensi puluhan orang buat dapet hasil visual yang berkelas dan tepat sasaran. Semua hal di bawah ini gue racik dari nol pake mata desainer dan nalar bisnis yang lurus.
              </p>
            </div>

            <div className="figma-layanan-title-right">
              <div className="figma-layanan-note-box">
                <img
                  src="/figma-assets/layanan-arrow-curved.svg"
                  alt=""
                  width="96"
                  height="48"
                  style={{ transform: 'rotate(180deg) scaleY(-1)', alignSelf: 'flex-end' }}
                />
                <span className="figma-layanan-note-text">
                  semuanya dikerjain satu pintu<br />sama gue langsung
                </span>
                <span className="figma-layanan-note-author">
                  — FOUNDER &amp; SOLO DESIGNER
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 3 BLOK LAYANAN BESAR (Figma 2001:490)
          ========================================================================= */}
      <ServiceJumpNav />

      <section className="figma-layanan-blocks-container" data-name="Section - 3 BLOK LAYANAN BESAR">
        {/* BLOK 1: DESAIN PRESENTASI (PPT) — Visual Kiri, Konten Kanan */}
        <article id="blok-ppt" className="figma-layanan-block" data-name="BLOK 1: DESAIN PRESENTASI (PPT)">
          {/* Visual Kiri: Wireframe Slide 16:9 Asimetris Stack */}
          <PptMorphVisual />

          {/* Konten Kanan: Penjelasan & CTA */}
          <div className="figma-layanan-block-content">
            <span className="figma-block-service-tag">01 / CORE SERVICE</span>
            <h2 className="figma-block-h2">Desain presentasi (PPT)</h2>
            <p className="figma-block-p">
              Pitch deck, company profile, presentasi kuliah atau sidang, laporan dan proposal. Gue rapikan alurnya, bukan cuma pindahin teks ke template. Setiap slide dibuat terarah biar audiens lo nggak ngantuk dan poin intinya langsung nancep.
            </p>

            <div className="figma-block-checklist">
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Alur cerita disusun ulang (storytelling &amp; visual hierarchy)</span>
              </div>
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Infografis, matriks, dan grafik yang jelas &amp; rapi</span>
              </div>
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>File PPTX yang bisa diedit sendiri + PDF high-res</span>
              </div>
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Revisi 3x minor sampai bener-bener sreg</span>
              </div>
            </div>

            <div className="figma-block-meta-row">
              ESTIMASI 3-5 HARI KERJA <span className="dot-sep">•</span> MULAI DARI RP 350.000 / DECK
            </div>

            <div className="figma-block-actions">
              <a
                href={waLayananUrl('Desain Presentasi & Pitch Deck PPT')}
                target="_blank"
                rel="noopener noreferrer"
                className="figma-block-cta-btn"
                onClick={() => playClick()}
              >
                <span>Minta estimasi PPT</span>
                <img src="/figma-assets/layanan-arrow-btn.svg" alt="" width="12" height="12" />
              </a>

              <Link
                to="/portofolio"
                className="figma-block-sublink"
                onClick={() => playClick()}
              >
                Lihat contoh deck &rarr;
              </Link>
            </div>
          </div>
        </article>

        {/* BLOK 2: PEMBUATAN WEBSITE — Konten Kiri, Visual Kanan */}
        <article id="blok-website" className="figma-layanan-block" data-name="BLOK 2: PEMBUATAN WEBSITE">
          {/* Konten Kiri: Penjelasan & CTA */}
          <div className="figma-layanan-block-content">
            <span className="figma-block-service-tag">02 / WEB &amp; DIGITAL PRESENCE</span>
            <h2 className="figma-block-h2">Pembuatan website</h2>
            <p className="figma-block-p">
              Company profile, portofolio, toko online, atau landing page. Responsif di HP dan laptop, tombol WhatsApp nyambung, SEO dasar. Nggak pake ribet urus hosting dan server sendiri kalau lo mau langsung beres.
            </p>

            <div className="figma-block-checklist">
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Desain custom (nggak pake template pasaran)</span>
              </div>
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Enak dibuka di HP, tablet, dan laptop (super ringan)</span>
              </div>
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Setup domain dan analitik dasar (Google Search &amp; Meta)</span>
              </div>
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Tombol WhatsApp langsung nyambung siap closing</span>
              </div>
            </div>

            <div className="figma-block-meta-row">
              DOMAIN &amp; HOSTING: TERMASUK SETUP <span className="dot-sep">•</span> ESTIMASI 7-14 HARI <span className="dot-sep">•</span> MULAI RP 1.200.000
            </div>

            <div className="figma-block-actions">
              <a
                href={waLayananUrl('Pembuatan Website & Landing Page')}
                target="_blank"
                rel="noopener noreferrer"
                className="figma-block-cta-btn"
                onClick={() => playClick()}
              >
                <span>Minta estimasi Website</span>
                <img src="/figma-assets/layanan-arrow-btn.svg" alt="" width="12" height="12" />
              </a>

              <Link
                to="/portofolio"
                className="figma-block-sublink"
                onClick={() => playClick()}
              >
                Lihat contoh web live &rarr;
              </Link>
            </div>
          </div>

          {/* Visual Kanan: Flat Mockup Browser + Phone Flat Outline */}
          <WebResizeVisual />
        </article>

        {/* BLOK 3: PRODUK DIGITAL — Visual Kiri, Konten Kanan */}
        <article id="blok-produk" className="figma-layanan-block" data-name="BLOK 3: PRODUK DIGITAL">
          {/* Visual Kiri: Fanned Out Cards Flat Wireframe */}
          <ProdukFanVisual />

          {/* Konten Kanan: Penjelasan & CTA */}
          <div className="figma-layanan-block-content">
            <span className="figma-block-service-tag">03 / READY-TO-USE ASSETS</span>
            <h2 className="figma-block-h2">Produk digital</h2>
            <p className="figma-block-p">
              Beli sekali, pakai berkali-kali. Template PPT dan website, e-book panduan praktis, UI kit figma, dan aset visual desain media sosial. Cocok buat lo yang punya waktu buat modifikasi sendiri tapi butuh pondasi visual yang udah matang.
            </p>

            <div className="figma-block-checklist">
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>File master siap edit langsung (PowerPoint, Figma, Notion)</span>
              </div>
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Panduan penggunaan ringkas, to-the-point &amp; jelas</span>
              </div>
              <div className="figma-block-check-item">
                <span className="figma-tag-dot" />
                <span>Update gratis seumur hidup jika ada revisi versi baru</span>
              </div>
            </div>

            <div className="figma-block-meta-row">
              INSTANT DOWNLOAD <span className="dot-sep">•</span> LISENSI KOMERSIAL UMKM <span className="dot-sep">•</span> MULAI DARI RP 49.000
            </div>

            <div className="figma-block-actions">
              <Link
                to="/produk-digital"
                className="figma-block-cta-btn"
                onClick={() => playClick()}
              >
                <span>Beli template sekarang</span>
                <img src="/figma-assets/layanan-bag-btn.svg" alt="" width="12" height="15" />
              </Link>

              <Link
                to="/produk-digital"
                className="figma-block-sublink"
                onClick={() => playClick()}
              >
                Katalog produk lengkap &rarr;
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* =========================================================================
          SECTION 3: SECTION ALUR ORDER (Tahapan Kerja 5 Titik) (Figma 2001:748)
          ========================================================================= */}
      <section id="alur-order" className="figma-layanan-timeline-section" data-name="Section - SECTION ALUR ORDER">
        <div className="figma-layanan-timeline-container">
          <div className="figma-section-header">
            <div className="figma-mono-tag">
              <span className="figma-tag-dot" />
              <span className="figma-tag-text">02 — TAHAPAN KERJA</span>
            </div>
            <h2 className="figma-section-h2" style={{ fontSize: '44px' }}>
              Alur order yang nggak bikin bingung.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--figma-text-secondary)', maxWidth: '576px', margin: '8px 0 0 0' }}>
              Prosesnya lugas tanpa birokrasi berbelit. Lo tau pasti lo lagi ada di langkah nomor berapa setiap saat.
            </p>
          </div>

          <OrderTimeline />
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SECTION FAQ (Figma 2001:819)
          ========================================================================= */}
      <section className="figma-layanan-faq-section" data-name="Section - SECTION FAQ">
        <div className="figma-layanan-faq-grid">
          {/* Sidebar FAQ Info */}
          <div className="figma-layanan-faq-sidebar">
            <div className="figma-mono-tag">
              <span className="figma-tag-dot" />
              <span className="figma-tag-text">— FOUNDER &amp; SOLO DESIGNER</span>
            </div>
            <h2 className="figma-section-h2" style={{ fontSize: '40px', lineHeight: '44px' }}>
              Pertanyaan yang<br />sering ditanyain.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: '24px', color: 'var(--figma-text-secondary)', marginTop: '16px' }}>
              Kalau pertanyaan lo belum terjawab di sini, langsung japri aja lewat WhatsApp. Santai, nggak pake format kaku.
            </p>
            <div style={{ marginTop: '32px' }}>
              <a
                href="https://wa.me/6285714521584?text=Halo%20Min%20Cham,%20saya%20mau%20tanya-tanya%20seputar%20layanan%20desain."
                target="_blank"
                rel="noopener noreferrer"
                className="figma-floating-wa"
                style={{ position: 'static', display: 'inline-flex', padding: '10px 18px' }}
                onClick={() => playClick()}
              >
                <span className="figma-wa-status-dot" />
                <span className="figma-wa-text" style={{ fontSize: '13px' }}>Tanya langsung di WA</span>
              </a>
            </div>
          </div>

          {/* Accordion Items */}
          <div className="figma-layanan-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="figma-faq-item-row">
                  <button
                    type="button"
                    className="figma-faq-question-btn"
                    onClick={() => {
                      playClick();
                      setOpenFaq(isOpen ? -1 : idx);
                    }}
                  >
                    <span className="figma-faq-q-text">{faq.q}</span>
                    <span className="figma-faq-toggle-icon">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="figma-faq-answer-box">
                      <p style={{ margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SECTION AJAKAN PENUTUP (Inverted Paper Cream) (Figma 2001:875)
          ========================================================================= */}
      <section className="figma-layanan-closing-section" data-name="Section - SECTION AJAKAN PENUTUP">
        <div className="figma-layanan-closing-container">
          <div className="figma-mono-tag">
            <span className="figma-tag-dot" style={{ backgroundColor: 'var(--figma-orange-light)' }} />
            <span className="figma-tag-text" style={{ color: 'var(--figma-text-muted)' }}>
              DISKUSI KEBUTUHAN // FREE KONSULTASI
            </span>
          </div>

          <h2 className="figma-closing-h2">
            Masih ragu mau pilih layanan yang mana?
          </h2>

          <p className="figma-closing-desc">
            Tanya-tanya aja dulu lewat WhatsApp. Ceritain situasi bisnis lo sekarang, nanti gue kasih saran mana format yang paling pas dan hemat biaya. Nggak bakal dipaksa beli apa-apa.
          </p>

          <div className="figma-closing-actions-wrap">
            <a
              href="https://wa.me/6285714521584?text=Halo%20Min%20Cham,%20saya%20mau%20konsultasi%20pilihan%20layanan%20yang%20paling%20cocok."
              target="_blank"
              rel="noopener noreferrer"
              className="figma-closing-wa-btn"
              onClick={() => playClick()}
            >
              <span className="figma-wa-status-dot" />
              <span>Ngobrol di WhatsApp</span>
              <img src="/figma-assets/layanan-wa-icon.svg" alt="" width="15" height="15" />
            </a>

            <Link
              to="/portofolio"
              className="figma-closing-portfolio-btn"
              onClick={() => playClick()}
            >
              <span>Lihat portofolio karya</span>
              <img src="/figma-assets/layanan-portfolio-icon.svg" alt="" width="12" height="12" />
            </Link>

            <div className="figma-closing-handwritten-note">
              <img src="/figma-assets/layanan-handwritten-arrow.svg" alt="" width="20" height="24" />
              <span>biasanya gue balas dalam 15 menit</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
