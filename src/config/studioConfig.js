// =============================================================================
// STUDIO SUPERNOVA — SINGLE SOURCE OF TRUTH (CONFIG)
// Pemilik: Min Cham
// Tema: Arah 3 (Tactile Studio & Human Craft)
// =============================================================================

export const STUDIO_CONFIG = {
  name: 'Studio Supernova',
  tagline: 'Studio Desain & Digital Independen',
  owner: 'Min Cham',
  email: 'chasupernova.studio@gmail.com', // [ISI: Email resmi jika ingin diubah]
  phone: '+62 857-1452-1584', // [ISI: No WhatsApp tampilan]
  whatsappNumber: '6285714521584', // [ISI: No WhatsApp format internasional tanpa + atau spasi]
  instagram: '@supernova.studio', // [ISI: Username Instagram resmi]
  tiktok: '@supernova.studio', // [ISI: Username TikTok resmi]
  location: 'Jakarta &bull; Melayani Klien Seluruh Indonesia',
  operatingHours: 'Senin – Sabtu, 09:00 – 18:00 WIB',

  // Master File Guarantee
  guaranteeText: '100% Hak Milik Master File (.PPTX / Vektor AI-SVG / Source Code Web)',

  // Main Multi-Page Navigation Map
  navItems: [
    { label: 'Beranda', path: '/' },
    { label: 'Layanan', path: '/layanan' },
    { label: 'Portofolio', path: '/portofolio' },
    { label: 'Produk Digital', path: '/produk-digital' },
    { label: 'Harga & Estimasi', path: '/harga' },
    { label: 'Tentang', path: '/tentang' },
    { label: 'Kontak', path: '/kontak' },
  ],

  // Detail Sub-services
  subServices: [
    {
      id: 'desain-ppt',
      slug: 'desain-ppt',
      title: 'Desain Presentasi & Pitch Deck (PPT)',
      shortTitle: 'Desain PPT',
      path: '/layanan/desain-ppt',
      tag: 'LAYANAN 01',
      summary: 'Bedah total materi mentah menjadi slide berwibawa standar investor & dewan direksi.',
    },
    {
      id: 'website',
      slug: 'website',
      title: 'Pembuatan Website & Landing Page',
      shortTitle: 'Website Kilat',
      path: '/layanan/website',
      tag: 'LAYANAN 02',
      summary: 'Website kencang dibuka di HP (< 0.4 detik) dengan alur chat langsung ke WhatsApp.',
    },
  ],

  // Digital Products List
  digitalProducts: [
    {
      id: 'the-sovereign-pitch-deck',
      slug: 'the-sovereign-pitch-deck',
      category: 'TEMPLATE PPTX',
      title: 'The Sovereign Pitch Deck — 35 Slide Master PPTX',
      priceRp: 149000,
      badge: 'TERPOPULER',
      desc: 'Template PowerPoint & Keynote standar investor Silicon Valley. Lengkap dengan struktur problem-solution, diagram pasar, dan grafik finansial yang 100% bisa diedit.',
      image: '/assets/images/corporate.jpg',
      specs: [
        '35 Layout Slide 16:9 HD',
        'Master File .PPTX & Keynote',
        'Panduan Penggunaan Font & Warna',
        'Ekspor PDF Siap Cetak',
      ],
      suitableFor: 'Founder Startup, Pelaku Usaha yang Mau Pitching, Mahasiswa Sidang.',
      fileFormat: 'PowerPoint (.PPTX), Keynote (.KEY), PDF Cetak',
    },
    {
      id: 'aura-social-kit',
      slug: 'aura-social-kit',
      category: 'CANVA & FIGMA KIT',
      title: 'Aura Social Identity — 24 Feed & Story Kit',
      priceRp: 99000,
      badge: 'PRAKTIS',
      desc: 'Koleksi template media sosial siap edit di Canva (bahkan akun Canva gratis). Didesain dengan estetika editorial tenang untuk menaikkan trust toko Anda.',
      image: '/assets/images/ecommerce.jpg',
      specs: [
        '12 Template Feed Instagram (1:1 & 4:5)',
        '12 Template Story & Carousel (9:16)',
        'Bisa Diedit Bebas di HP atau Laptop',
        'Panduan Palet Warna & Font Gratis',
      ],
      suitableFor: 'Toko Online, Coffee Shop, Brand Fashion, Jasa Konsultan.',
      fileFormat: 'Canva Link Editable, Figma File (.FIG)',
    },
    {
      id: 'freelance-agency-toolkit',
      slug: 'freelance-agency-toolkit',
      category: 'E-BOOK & DOKUMEN',
      title: 'Freelance & Agency Toolkit: Kontrak, Invoice & Proposal',
      priceRp: 79000,
      badge: 'ANTI-RUGI',
      desc: 'Template draf perjanjian kerja sama hukum sederhana, template invoice otomatis, dan panduan cara negosiasi agar tidak terjebak revisi tanpa batas.',
      image: '/assets/images/cms-tablet.jpg',
      specs: [
        'Draf Kontrak SPK Siap Pakai (.DOCX)',
        'Format Invoice Otomatis (.XLSX)',
        'Checklist Serah Terima Master File',
        'Template Chat Negosiasi Klien Sulit',
      ],
      suitableFor: 'Freelance Desainer, Web Developer, Content Creator.',
      fileFormat: 'Microsoft Word (.DOCX), Excel (.XLSX), PDF',
    },
    {
      id: 'supernova-fast-landing',
      slug: 'supernova-fast-landing',
      category: 'SOURCE CODE REACT',
      title: 'Supernova Fast Landing — Next.js & Tailwind Boilerplate',
      priceRp: 199000,
      badge: 'SPEED < 0.4s',
      desc: 'Source code website landing page satu halaman yang sudah terintegrasi tombol WhatsApp otomatis dan Google Lighthouse skor 99.',
      image: '/assets/images/saas.jpg',
      specs: [
        'Source Code React / Vite Lengkap',
        'Komponen Siap Edit & Modifikasi',
        'Formulir WhatsApp Otomatis',
        'Panduan Deploy Gratis ke Netlify/Vercel',
      ],
      suitableFor: 'Developer, Agensi Pemula, Pemilik Bisnis Tech.',
      fileFormat: 'ZIP Source Code (Node.js/React)',
    },
  ],

  // Quick Command Palette Links
  quickCommands: [
    { label: 'Beranda Utama', path: '/', category: 'Halaman' },
    { label: 'Semua Layanan', path: '/layanan', category: 'Halaman' },
    { label: 'Desain Presentasi & PPT', path: '/layanan/desain-ppt', category: 'Layanan' },
    { label: 'Pembuatan Website', path: '/layanan/website', category: 'Layanan' },
    { label: 'Galeri Portofolio & Studi Kasus', path: '/portofolio', category: 'Halaman' },
    { label: 'Katalog Produk Digital', path: '/produk-digital', category: 'Halaman' },
    { label: 'Kalkulator Estimasi Biaya', path: '/harga', category: 'Alat' },
    { label: 'Tentang Min Cham & Studio', path: '/tentang', category: 'Halaman' },
    { label: 'Kontak & Konsultasi WhatsApp', path: '/kontak', category: 'Halaman' },
    { label: 'Panel CMS Admin', path: '/admin', category: 'Admin' },
  ],
};
