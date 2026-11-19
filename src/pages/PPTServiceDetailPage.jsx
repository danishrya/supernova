import React from 'react';
import ServiceDetail, { DeckFan, CompareSlider } from '../components/ServiceDetail';

const DATA = {
  crumb: 'Desain Presentasi',
  overline: 'LAYANAN 01 // DESAIN PRESENTASI & PITCH DECK',
  title: 'Slide yang bikin orang',
  titleAccent: 'nggak ngantuk.',
  lead:
    'Slide 40 halaman yang tadinya bikin dosen, klien, atau investor mengantuk — gue bedah ulang susunan narasinya dan gue ubah jadi visual yang tajam dan berwibawa.',
  waText: 'Halo Min Cham! Gue butuh bantuan desain slide presentasi / pitch deck. Mau diskusi jadwal dan materinya.',
  primaryCta: 'Kirim draf slide ke WhatsApp',
  facts: [
    { value: '1–5 hari', label: 'waktu pengerjaan' },
    { value: '.PPTX', label: 'master file milik lo' },
    { value: '16:9', label: 'siap layar & cetak' },
  ],
  heroVisual: <DeckFan />,
  proof: {
    kicker: 'SEBELUM / SESUDAH',
    title: 'Geser, lihat bedanya.',
    desc: 'Draf lama yang penuh paragraf vs. slide yang udah dibedah alurnya. Geser tuas di tengah.',
    content: (
      <CompareSlider
        before={{
          label: 'SEBELUM — DRAF LAMA',
          headline: 'Slide penuh paragraf, pesan utama tenggelam',
          points: ['Paragraf teks menumpuk bikin audiens bosan', 'Tabel angka mentahan tanpa penekanan', 'Pesan utama susah ditangkap cepat'],
          badge: 'Template jadul',
        }}
        after={{
          label: 'SESUDAH — SUPERNOVA',
          headline: 'Satu slide, satu pesan. Langsung ketangkep.',
          points: ['Alur cerita terarah & meyakinkan', 'Data jadi infografik yang gampang dibaca', 'Master .PPTX tetap bisa lo edit sendiri'],
          badge: 'Grid presisi & tipografi tegas',
        }}
      />
    ),
  },
  delivTitle: 'Yang lo terima di tangan.',
  deliverables: [
    { title: 'Master file PowerPoint (.PPTX) & Keynote', desc: 'Bebas lo edit kapan aja tanpa software desain rumit. Font, bagan angka, dan warna bisa disesuaikan sendiri.' },
    { title: 'Struktur alur cerita & redaksi teks', desc: 'Gue nggak sekadar nempel teks lo ke template. Poin pentingnya dibedah supaya audiens paham dalam 5 detik pertama tiap slide.' },
    { title: 'Infografik & diagram angka kustom', desc: 'Tabel angka yang membosankan diubah jadi visual data yang hidup dan meyakinkan direksi atau calon investor.' },
    { title: 'Versi PDF ringan siap kirim email', desc: 'PDF tajam tapi ukurannya tetap ramah kuota (< 8 MB), siap dilampirkan ke investor tanpa ditolak server.' },
    { title: 'Pendampingan revisi', desc: 'Penyesuaian teks, warna, atau urutan slide sampai lo benar-benar siap dan percaya diri tampil.' },
  ],
  pkgKicker: 'PILIHAN KEBUTUHAN',
  pkgTitle: 'Tipe presentasi yang biasa gue tangani.',
  pkgLabel: 'PAKET',
  featuredPackage: 0,
  packages: [
    { name: 'Pitch Deck Investor & Fundraise', slides: '15–25 slide', time: '3–5 hari kerja', ideal: 'Startup tahap awal, UMKM cari modal kemitraan, atau kompetisi bisnis.', highlights: ['Problem & solution framework', 'Diagram ukuran pasar (TAM/SAM/SOM)', 'Tabel proyeksi finansial', 'Slide traction & tim'] },
    { name: 'Company Profile & Tender B2B', slides: '20–40 slide', time: '4–7 hari kerja', ideal: 'Perusahaan logistik, kontraktor, konsultan, pabrik, atau agensi yang mau maju tender.', highlights: ['Portofolio proyek & struktur armada', 'Bagan alur SOP & legalitas usaha', 'Tata letak formal & berwibawa', 'Versi siap cetak spiral / hardcover'] },
    { name: 'Slide Sidang Skripsi & Akademik', slides: '10–18 slide', time: '1–3 hari kerja', ideal: 'Mahasiswa D3/S1/S2 yang mau sidang proposal, skripsi, atau tesis.', highlights: ['Fokus kerangka pikir & metodologi', 'Visualisasi hasil uji & pembahasan', 'Tanpa animasi norak', 'Tarif ramah kantong mahasiswa'] },
  ],
  cta: {
    kicker: 'BESOK UDAH HARUS TAMPIL?',
    title: 'Slide lo besok harus ditampilin?',
    desc: 'Ada jalur kilat buat yang genting. Kirim materi mentah (Word, catatan tangan, atau slide lama) ke WhatsApp sekarang.',
    button: 'Diskusi langsung sama Min Cham',
  },
};

export default function PPTServiceDetailPage() {
  return <ServiceDetail data={DATA} />;
}
