// =============================================================================
// STUDIO SUPERNOVA — SINGLE SOURCE OF TRUTH (CONFIG)
// Pemilik: Min Cham
// Sudut Pandang Teks: 'kami / kamu' (Konsisten di seluruh halaman & microcopy)
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
  location: 'Jakarta • Melayani Klien Seluruh Indonesia',
  operatingHours: 'Senin – Sabtu, 09:00 – 18:00 WIB',

  // Master File Guarantee (Jujur & Transparan)
  guaranteeText: '100% Hak Milik Master File (.PPTX / Vektor SVG / Source Code Web)',

  // Main Multi-Page Navigation Map (Label ringkas agar tidak patah baris di navbar)
  navItems: [
    { label: 'Beranda', path: '/' },
    { label: 'Layanan', path: '/layanan' },
    { label: 'Produk', path: '/produk-digital' },
    { label: 'Harga', path: '/harga' },
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
      summary: 'Menyusun alur cerita materi mentah menjadi slide berwibawa untuk presentasi bisnis, investor, atau sidang akademik.',
    },
    {
      id: 'website',
      slug: 'website',
      title: 'Pembuatan Website & Landing Page',
      shortTitle: 'Website Kilat',
      path: '/layanan/website',
      tag: 'LAYANAN 02',
      summary: 'Website ringan yang cepat dibuka di ponsel calon pembeli dengan alur tombol yang terhubung langsung ke WhatsApp.',
    },
  ],

  // Digital Products List (Gambar berbeda dari portofolio untuk mencegah duplikasi)
  digitalProducts: [
    {
      id: 'the-sovereign-pitch-deck',
      slug: 'the-sovereign-pitch-deck',
      category: 'TEMPLATE PPTX',
      title: 'The Sovereign Pitch Deck — 35 Slide Master PPTX',
      priceRp: 149000,
      badge: 'FORMAT POPULER',
      desc: 'Template PowerPoint dan Keynote dengan struktur alur problem-solution, diagram pasar, dan grafik finansial yang 100% bisa diedit mandiri.',
      image: '/assets/images/saas.jpg',
      specs: [
        '35 Layout Slide Rasio 16:9 HD',
        'Master File .PPTX & Keynote',
        'Panduan Penggunaan Font & Warna',
        'Ekspor PDF Siap Cetak',
      ],
      suitableFor: 'Founder startup, pelaku UMKM yang butuh presentasi rapi, atau mahasiswa sidang.',
      fileFormat: 'PowerPoint (.PPTX), Keynote (.KEY), PDF Cetak',
    },
    {
      id: 'aura-social-kit',
      slug: 'aura-social-kit',
      category: 'CANVA & FIGMA KIT',
      title: 'Aura Social Identity — 24 Template Feed & Story',
      priceRp: 99000,
      badge: 'SIAP EDIT DI HP',
      desc: 'Koleksi template media sosial yang bisa diedit di aplikasi Canva gratis maupun Figma, didesain tenang dan rapi untuk akun jualan kamu.',
      image: '/assets/images/villa-resort.jpg',
      specs: [
        '12 Template Feed Instagram (1:1 & 4:5)',
        '12 Template Story & Carousel (9:16)',
        'Bisa Diedit Bebas di HP atau Laptop',
        'Panduan Font Gratis dari Google Fonts',
      ],
      suitableFor: 'Toko online, coffee shop, brand pakaian, dan jasa freelance.',
      fileFormat: 'Canva Link Editable, Figma File (.FIG)',
    },
    {
      id: 'freelance-agency-toolkit',
      slug: 'freelance-agency-toolkit',
      category: 'DOKUMEN KERJA',
      title: 'Freelance Toolkit: Draf Kontrak, Invoice & SOP',
      priceRp: 79000,
      badge: 'FORMAT RESMI',
      desc: 'Template draf perjanjian kerja sama (SPK) sederhana, format invoice otomatis di Excel, dan checklist serah terima master file.',
      image: '/assets/images/cms-tablet.jpg',
      specs: [
        'Draf Kontrak SPK Siap Pakai (.DOCX)',
        'Format Invoice Otomatis (.XLSX)',
        'Checklist Serah Terima Master File',
        'Draf Pesan Negosiasi Pembayaran',
      ],
      suitableFor: 'Desainer grafis freelance, web developer, dan kreator konten.',
      fileFormat: 'Microsoft Word (.DOCX), Excel (.XLSX), PDF',
    },
    {
      id: 'supernova-fast-landing',
      slug: 'supernova-fast-landing',
      category: 'SOURCE CODE WEB',
      title: 'Fast Landing Page — Boilerplate React & Tailwind',
      priceRp: 199000,
      badge: 'KODE BERSIH',
      desc: 'Source code website landing page satu halaman yang sudah dilengkapi tombol WhatsApp otomatis dan panduan deploy gratis ke Netlify.',
      image: '/assets/images/landing.jpg',
      specs: [
        'Source Code React / Vite Lengkap',
        'Komponen Mudah Dimodifikasi',
        'Integrasi Tombol WhatsApp Otomatis',
        'Panduan Deploy Gratis ke Netlify/Vercel',
      ],
      suitableFor: 'Web developer pemula, pemilik bisnis, atau agensi kecil.',
      fileFormat: 'ZIP Source Code (Node.js/React)',
    },
  ],

  // Quick Command Palette Links
  quickCommands: [
    { label: 'Beranda Utama', path: '/', category: 'Halaman' },
    { label: 'Semua Layanan', path: '/layanan', category: 'Halaman' },
    { label: 'Desain Presentasi & PPT', path: '/layanan/desain-ppt', category: 'Layanan' },
    { label: 'Pembuatan Website', path: '/layanan/website', category: 'Layanan' },
    { label: 'Contoh Karya', path: '/#portofolio', category: 'Halaman' },
    { label: 'Katalog Produk Digital', path: '/produk-digital', category: 'Halaman' },
    { label: 'Kalkulator Estimasi Biaya', path: '/harga', category: 'Alat' },
    { label: 'Tentang Min Cham & Studio', path: '/tentang', category: 'Halaman' },
    { label: 'Kontak & WhatsApp', path: '/kontak', category: 'Halaman' },
    { label: 'Panel CMS Admin', path: '/admin', category: 'Admin' },
  ],
};
