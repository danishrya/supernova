import { STUDIO_CONFIG } from '../config/studioConfig';

// Products & copy from Figma frame 2001:1808 (Produk Digital).
export const PRODUCTS = [
  { id: 'pitch-deck-blueprint', order: 8, cat: 'ppt', catLabel: 'TEMPLATE PPT', title: 'Pitch Deck Blueprint v2.0', desc: 'Format teruji buat pitching investor & demo day.', format: 'PPTX • 24 SLIDE', price: 149000, mock: 'deck', tag: 'PPTX // V2.0', isNew: true, includes: ["24 slide 16:9 Full-HD siap isi", "Alur teruji: problem → solusi → traksi → ask", "File .PPTX & Keynote, font gratis", "Panduan singkat isi tiap slide"] },
  { id: 'brand-kit-umkm', order: 7, cat: 'sosmed', catLabel: 'DESAIN SOSMED', title: 'Brand Kit UMKM Pack', desc: 'Panduan visual komplit: palet warna, logo, dan aset sosmed.', format: 'FIGMA + CANVA', price: 189000, mock: 'brand', tag: 'FIGMA + CANVA', featured: true, includes: ["40+ aset: logo, palet warna, tipografi", "Template feed & story sosmed", "File Figma + Canva siap edit", "Panduan guideline penggunaan logo"] },
  { id: 'notion-freelance-os', order: 6, cat: 'uikit', catLabel: 'PRODUCTIVITY / OS', title: 'Notion Freelance OS', desc: 'Sistem kerja terintegrasi: CRM klien, invoice, dan pipeline.', format: 'NOTION TEMPLATE', price: 129000, mock: 'notion', tag: 'WORKSPACE // OS', includes: ["CRM klien & pipeline proyek", "Invoice & pencatatan pembayaran", "Auto revenue tracker bulanan", "Duplikat langsung ke workspace Notion lo"] },
  { id: 'portfolio-dark-html', order: 5, cat: 'web', catLabel: 'TEMPLATE WEB', title: 'Portfolio Dark HTML', desc: 'Website portofolio monokromatik yang ringan dan responsif.', format: 'HTML + TAILWIND', price: 199000, mock: 'web', tag: 'DEV // TAILWIND', includes: ["Template HTML + Tailwind responsif", "Tanpa JavaScript runtime, ringan", "Bagian hero, karya, tentang, kontak", "Siap deploy gratis (Netlify / Vercel)"] },
  { id: 'katalog-produk-ecommerce', order: 4, cat: 'sosmed', catLabel: 'DESAIN SOSMED', title: 'Katalog Produk E-Commerce', desc: 'Layout editorial buat katalog PDF dan versi cetak.', format: 'CANVA + INDESIGN', price: 159000, mock: 'catalog', tag: 'STORE // PRINT', includes: ["32 halaman katalog siap cetak", "Ukuran A4 + versi PDF digital", "File Canva + InDesign", "Layout produk, harga, dan kontak"] },
  { id: 'panduan-negosiasi-klien', order: 3, cat: 'ebook', catLabel: 'E-BOOK', title: 'Panduan Negosiasi Klien', desc: 'Skrip obrolan, handling komplain, dan cara jaga scope kerja.', format: 'PDF GUIDE', price: 89000, mock: 'ebook', tag: 'E-BOOK // ESSAY', includes: ["96 halaman (EPUB + PDF)", "Skrip chat untuk dealing & follow-up", "Cara jaga scope & batas revisi", "Template balasan komplain klien"] },
  { id: 'social-media-carousel-kit', order: 2, cat: 'sosmed', catLabel: 'DESAIN SOSMED', title: 'Social Media Carousel Kit', desc: 'Template konten edukasi Instagram & LinkedIn.', format: 'CANVA + FIGMA', price: 119000, mock: 'carousel', tag: 'CAROUSEL // FEED', includes: ["50 slide carousel siap pakai", "Struktur hook → value → CTA", "File Canva + Figma", "Ukuran feed Instagram & LinkedIn"] },
  { id: 'saas-wireframe-system', order: 1, cat: 'uikit', catLabel: 'UI KIT', title: 'SaaS Wireframe System', desc: 'Pondasi wireframing cepat untuk dashboard dan aplikasi SaaS.', format: 'FIGMA COMPONENT', price: 219000, mock: 'wireframe', tag: 'UI SYSTEM // V1', includes: ["120+ blok komponen wireframe", "Figma auto-layout, gampang disusun", "Pola dashboard, tabel, form, & modal", "Kontras dasar mengikuti WCAG 2.1"] },
];


export const rupiah = (n) => `Rp ${n.toLocaleString('id-ID')}`;
export const waLink = (p) =>
  `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Halo Min Cham, gue tertarik sama "${p.title}" (${rupiah(p.price)}). Masih tersedia?`
  )}`;

