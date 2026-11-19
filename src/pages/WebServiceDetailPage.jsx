import React from 'react';
import ServiceDetail, { DevicePreview, SpeedRace } from '../components/ServiceDetail';

const DATA = {
  crumb: 'Pembuatan Website',
  overline: 'LAYANAN 02 // WEBSITE & LANDING PAGE',
  title: 'Website yang kebuka cepat,',
  titleAccent: 'langsung ke WhatsApp.',
  lead:
    'Website yang kencang dibuka di HP, dirancang khusus buat ngalirin calon pembeli langsung ke chat WhatsApp lo tanpa ribet teknis.',
  waText: 'Halo Min Cham! Gue mau konsultasi soal pembuatan website / landing page buat bisnis gue.',
  primaryCta: 'Konsultasi website via WhatsApp',
  facts: [
    { value: '< 0,4 dtk', label: 'target tampil di HP' },
    { value: '3–10 hari', label: 'waktu pengerjaan' },
    { value: '100%', label: 'kode milik lo' },
  ],
  heroVisual: <DevicePreview />,
  proof: {
    kicker: 'KENAPA KECEPATAN PENTING',
    title: 'Satu detik telat, pembeli kabur.',
    desc: 'Mayoritas calon pelanggan buka website lewat HP dengan kuota pas-pasan. Kodenya gue racik dari awal supaya halaman lo kebuka duluan.',
    content: <SpeedRace />,
  },
  delivTitle: 'Fasilitas tanpa biaya tersembunyi.',
  deliverables: [
    { title: 'Kebuka kilat di HP', desc: 'Kode dioptimasi dan gambar dikompres supaya halaman muncul sekejap mata, bahkan di koneksi seluler yang lagi lemot.' },
    { title: 'Tombol WhatsApp otomatis', desc: 'Pengunjung yang klik tombol langsung masuk ke chat WhatsApp bisnis lo dengan pesan pengantar yang sudah terisi rapi.' },
    { title: 'Desain kustom, bukan template pasaran', desc: 'Tipografi terkurasi dan hierarki visual yang ngarahin mata pengunjung langsung ke penawaran utama lo.' },
    { title: 'Kode milik lo, tanpa biaya bulanan berat', desc: 'Dibangun dengan teknologi modern yang bisa di-hosting gratis atau sangat hemat, tanpa sewa server ratusan ribu per bulan.' },
    { title: 'Pendampingan 30 hari setelah tayang', desc: 'Mau ganti kontak, teks harga, atau foto produk setelah website online? Tetap gue bantu.' },
  ],
  pkgKicker: 'STRUKTUR PAKET',
  pkgTitle: 'Format website yang bisa lo pilih.',
  pkgLabel: 'FORMAT',
  featuredPackage: 1,
  packages: [
    { name: 'Landing Page Kilat', slides: '1 halaman konversi', time: '3–5 hari kerja', ideal: 'UMKM, jualan produk tunggal, jasa freelance, atau kampanye iklan (Meta Ads / TikTok Ads).', highlights: ['Hero dengan copywriting tajam', 'Galeri produk / bukti karya', 'Tombol order WhatsApp melayang', 'Google Analytics & Meta Pixel'] },
    { name: 'Website Katalog & Profil Bisnis', slides: 'Multi-halaman', time: '7–10 hari kerja', ideal: 'Brand fashion, bengkel, klinik, kantor hukum, studio interior, atau perusahaan B2B.', highlights: ['Beranda, katalog, tentang, kontak', 'Panel kelola konten sederhana', 'SEO dasar & terdaftar di Google', 'Panduan update produk mandiri'] },
  ],
  cta: {
    kicker: 'BELUM PUNYA APA-APA?',
    title: 'Belum punya domain atau teks konten?',
    desc: 'Santai. Gue bantu susun draf tulisan penawaran lo dan pilih nama domain yang pas buat bisnis lo.',
    button: 'Konsultasi santai sama Min Cham',
  },
};

export default function WebServiceDetailPage() {
  return <ServiceDetail data={DATA} />;
}
