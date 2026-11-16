/**
 * SUPERNOVA STUDIO — CORE LOGIC & INTERACTIVE SUITE
 * Architecture: Clean Vanilla JS, Reactive State Pattern
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTerminalTabs();
  initCatalog();
  initCalculator();
  initFaqAccordion();
  initContactForm();
  initPackageButtons();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER LOGIC
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Active link highlighter on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. HERO TERMINAL TABS
   ========================================================================== */
function initTerminalTabs() {
  const tabs = document.querySelectorAll('.t-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = `tab-${tab.getAttribute('data-tab')}`;

      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. CATALOG & PROJECT MODAL SHOWCASE
   ========================================================================== */
const PROJECTS_DATA = {
  'obsidian-saas': {
    title: 'Obsidian Capital — Financial Analytics Dashboard',
    category: 'SaaS & Web App',
    badge: '10k+ Daily Active Users • 0.3s Query Time',
    image: 'assets/images/saas.jpg',
    tags: ['React', 'TypeScript', 'Tailwind', 'WebSockets', 'PostgreSQL', 'Docker'],
    overview: 'Platform analisis portofolio keuangan tingkat institusi yang dirancang untuk mengolah ribuan transaksi aset per detik dengan visualisasi grafik interaktif minim latency.',
    challenge: 'Klien menghadapi masalah performa pada dashboard lama yang memakan waktu 4 detik untuk merender chart dan sering freeze saat data feed pasar modal update real-time.',
    solution: 'Kami merekayasa ulang arsitektur front-end menggunakan memoization ketat, WebSockets streaming binary data, dan virtualized table render. Query database dioptimalkan dengan indexing majemuk pada PostgreSQL.',
    results: [
      'Query latency terpangkas dari 4.2 detik menjadi 0.3 detik (P99)',
      'Konsumsi RAM browser berkurang hingga 65%',
      'Tingkat retensi pengguna aktif harian melonjak sebesar +38%'
    ]
  },
  'aurora-luxe': {
    title: 'Aurora Luxe — High-End Audio & Watch E-Commerce',
    category: 'E-Commerce',
    badge: '+85% Checkout Completion • 99 Lighthouse',
    image: 'assets/images/ecommerce.jpg',
    tags: ['Next.js 14', 'Stripe API', 'PostgreSQL', 'Framer Motion', 'Tailwind'],
    overview: 'Toko online eksklusif untuk produk audio audiophile dan jam tangan mewah dengan nuansa monokrom gelap, tipografi serif modern, serta transaksi instan.',
    challenge: 'Brand luxury membutuhkan pengalaman belanja yang sangat mulus tanpa refresh halaman sama sekali, serta integrasi multi-mata uang dan perhitungan pajak impor otomatis.',
    solution: 'Membangun headless commerce dengan Next.js Server Components. Keranjang belanja menggunakan optimistic UI update sehingga pembeli merasakan respon instan 0 milidetik saat menambahkan barang.',
    results: [
      'Skor Google Lighthouse 99 pada desktop dan 96 pada mobile',
      'Peningkatan konversi checkout selesai sebesar +85%',
      'Rata-rata waktu sesi belanja meningkat 2.4x lipat'
    ]
  },
  'architekton-corp': {
    title: 'A&E Architekton — Global Architecture Atelier',
    category: 'Company Profile',
    badge: 'Awwwards Nominee • 0.5s First Load',
    image: 'assets/images/corporate.jpg',
    tags: ['HTML5 Custom', 'CSS Grid', 'Vanilla JS', 'SEO Engine', 'Cloudflare'],
    overview: 'Website profil atelier arsitektur internasional yang memamerkan gedung pencakar langit dan desain struktural futuristik dalam kanvas visual gelap minimalis.',
    challenge: 'Menampilkan ratusan foto beresolusi tinggi (4K) tanpa mengorbankan kecepatan loading dan peringkat SEO di mesin pencari Google internasional.',
    solution: 'Implementasi progressive image loading (AVIF/WebP) dengan blur hash placeholder, dipadukan dengan markup Schema.org JSON-LD lengkap untuk indexing mesin pencari.',
    results: [
      'Waktu First Contentful Paint (FCP) tercapai hanya dalam 0.4 detik',
      'Masuk nominasi Website of the Day di kurasi desain web internasional',
      'Peningkatan 140% pengajuan proposal proyek arsitektur baru dari luar negeri'
    ]
  },
  'aether-flow': {
    title: 'Aether Flow — AI-Driven Workflow Automation',
    category: 'SaaS & Web App',
    badge: '+145% Lead Conversion • <0.4s FCP',
    image: 'assets/images/landing.jpg',
    tags: ['Vite', 'Monaco Editor', 'Tailwind', 'Supabase', 'Node.js'],
    overview: 'Landing page interaktif untuk developer tools berbasis kecerdasan buatan, dilengkapi demonstrasi langsung editor kode di browser tanpa perlu registrasi awal.',
    challenge: 'Produk teknis seringkali sulit dipahami jika hanya dijelaskan dengan teks biasa; audiens developer menuntut bukti fungsional secara instan.',
    solution: 'Menyematkan playground interaktif ringan (sandbox editor) langsung di hero section, memungkinkan developer mengetik dan melihat eksekusi AI dalam 1 detik.',
    results: [
      'Konversi pendaftaran free trial meningkat drastis +145%',
      'Bounce rate turun ke angka impresif di bawah 22%',
      'Viral di forum komunitas developer dan GitHub trending'
    ]
  },
  'valkyrie-energy': {
    title: 'Valkyrie Energy — International Natural Resources Holding',
    category: 'Company Profile',
    badge: 'B2B Tender Qualified • Multi-Bahasa',
    image: '',
    tags: ['Next.js 14', 'Headless CMS', 'i18n Multi-Lang', 'Cloudflare Enterprise'],
    overview: 'Portal korporasi holding pertambangan dan energi terbarukan dengan standar tata kelola B2B internasional, penyajian laporan keuangan investor, dan multi-bahasa.',
    challenge: 'Perusahaan membutuhkan website yang lolos audit keamanan tender B2B multinasional dengan waktu online (uptime) 99.99%.',
    solution: 'Arsitektur statis jamstack terdistribusi di edge server Cloudflare global dengan proteksi WAF, enkripsi SSL kelas militer, dan CMS terisolasi aman.',
    results: [
      'Memenuhi seluruh kepatuhan audit keamanan siber pihak ketiga',
      'Waktu akses seragam di bawah 1 detik dari Jakarta, Tokyo, dan London',
      'Pengelolaan konten 3 bahasa (ID/EN/CN) berjalan mandiri oleh tim humas'
    ]
  },
  'soleil-atelier': {
    title: 'Soleil Atelier — D2C Contemporary Apparel',
    category: 'E-Commerce',
    badge: '4x Penjualan D2C • Notifikasi WA Otomatis',
    image: '',
    tags: ['Vue 3', 'Node.js API', 'Midtrans Gateway', 'Redis Cache', 'PostgreSQL'],
    overview: 'Platform e-commerce pakaian minimalis direct-to-consumer dengan sistem checkout sub-detik dan integrasi kurir instan Indonesia.',
    challenge: 'Sering terjadi lonjakan trafik ribuan pengunjung serentak saat event flash sale peluncuran koleksi baru yang menyebabkan server sebelumnya down.',
    solution: 'Penerapan caching lapis ganda Redis, query lock untuk menghindari over-selling stok barang, dan payment gateway terintegrasi QRIS instan.',
    results: [
      'Mampu menangani 5.000 pesanan per menit tanpa latency gangguan',
      'Penjualan langsung (D2C) meningkat 4x lipat dalam kuartal pertama',
      'Konfirmasi pesanan otomatis terkirim ke WhatsApp pelanggan dalam 5 detik'
    ]
  }
};

function initCatalog() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');

  // Filter tab click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });

  // Card click & modal trigger
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      const project = PROJECTS_DATA[projectId];
      if (project) {
        openProjectModal(project);
      }
    });
  });

  // Modal open function
  function openProjectModal(p) {
    const imgHtml = p.image 
      ? `<div class="modal-img-wrap"><img src="${p.image}" alt="${p.title}"></div>`
      : '';

    const tagsHtml = p.tags
      .map(tag => `<span class="tech-tag">${tag}</span>`)
      .join('');

    const resultsHtml = p.results
      .map(res => `<li>${res}</li>`)
      .join('');

    modalContent.innerHTML = `
      ${imgHtml}
      <div class="modal-header-meta">
        <span class="modal-tag">${p.category}</span>
        <span class="modal-metric-badge">● ${p.badge}</span>
      </div>
      <h3 class="modal-title">${p.title}</h3>
      <p style="color: var(--text-secondary); line-height: 1.6; font-size: 1rem;">${p.overview}</p>

      <div class="modal-section-block">
        <h4>Tantangan Klien:</h4>
        <p>${p.challenge}</p>
      </div>

      <div class="modal-section-block">
        <h4>Solusi Rekayasa Supernova:</h4>
        <p>${p.solution}</p>
      </div>

      <div class="modal-section-block">
        <h4>Hasil & Dampak Bisnis:</h4>
        <ul class="modal-bullets">
          ${resultsHtml}
        </ul>
      </div>

      <div class="modal-section-block">
        <h4>Teknologi & Tools:</h4>
        <div class="modal-tech-row">${tagsHtml}</div>
      </div>

      <div class="modal-footer-cta">
        <button class="btn btn-primary" id="modalDiscussBtn" data-title="${p.title}">
          <span>Konsultasikan Proyek Serupa</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="btn btn-secondary" id="modalDismissBtn">Tutup</button>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook CTA inside modal
    document.getElementById('modalDiscussBtn')?.addEventListener('click', (e) => {
      closeProjectModal();
      const projectTitle = e.currentTarget.getAttribute('data-title');
      const briefTextarea = document.getElementById('projectBrief');
      if (briefTextarea) {
        briefTextarea.value = `Halo Supernova, saya tertarik membuat website dengan standar dan arsitektur serupa proyek: "${projectTitle}". Mohon informasi estimasi & ketersediaannya.`;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    document.getElementById('modalDismissBtn')?.addEventListener('click', closeProjectModal);
  }

  function closeProjectModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   4. INTERACTIVE COST & SCOPE CALCULATOR
   ========================================================================== */
function initCalculator() {
  const calcContainer = document.getElementById('costCalculator');
  if (!calcContainer) return;

  const typeRadios = document.querySelectorAll('input[name="projectType"]');
  const pageRadios = document.querySelectorAll('input[name="pageCount"]');
  const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
  const speedRadios = document.querySelectorAll('input[name="speedOption"]');

  const priceDisplay = document.getElementById('calcPriceDisplay');
  const timelineDisplay = document.getElementById('calcTimelineDisplay');
  const warrantyDisplay = document.getElementById('calcWarrantyDisplay');
  const whatsAppBtn = document.getElementById('calcWhatsAppBtn');

  // Base configurations
  const BASE_PRICES = {
    landing: { price: 3500000, days: 6, label: 'Landing Page' },
    company: { price: 6800000, days: 14, label: 'Company Profile Multi-Page' },
    ecommerce: { price: 11500000, days: 22, label: 'Toko Online E-Commerce' },
    webapp: { price: 16500000, days: 30, label: 'SaaS / Custom Web App' }
  };

  const PAGE_SURCHARGES = {
    '1': { price: 0, days: 0, label: '1 Halaman' },
    '5': { price: 900000, days: 3, label: '3 - 5 Halaman' },
    '10': { price: 1800000, days: 6, label: '6 - 12 Halaman' },
    '20': { price: 3500000, days: 10, label: '> 12 Halaman' }
  };

  function recalculate() {
    let selectedType = 'landing';
    typeRadios.forEach(r => {
      const card = r.closest('.calc-radio-card');
      if (r.checked) {
        selectedType = r.value;
        card?.classList.add('active');
      } else {
        card?.classList.remove('active');
      }
    });

    let selectedPage = '1';
    pageRadios.forEach(r => {
      const pill = r.closest('.calc-pill');
      if (r.checked) {
        selectedPage = r.value;
        pill?.classList.add('active');
      } else {
        pill?.classList.remove('active');
      }
    });

    let addonCost = 0;
    let addonDays = 0;
    const selectedAddonNames = [];

    addonCheckboxes.forEach(cb => {
      const card = cb.closest('.calc-check-card');
      if (cb.checked) {
        addonCost += parseInt(cb.getAttribute('data-cost') || '0', 10);
        addonDays += parseInt(cb.getAttribute('data-days') || '0', 10);
        card?.classList.add('checked');
        const title = card?.querySelector('strong')?.innerText;
        if (title) selectedAddonNames.push(title);
      } else {
        card?.classList.remove('checked');
      }
    });

    let isExpress = false;
    speedRadios.forEach(r => {
      const card = r.closest('.speed-card');
      if (r.checked) {
        if (r.value === 'express') isExpress = true;
        card?.classList.add('active');
      } else {
        card?.classList.remove('active');
      }
    });

    // Calculations
    const base = BASE_PRICES[selectedType] || BASE_PRICES.landing;
    const page = PAGE_SURCHARGES[selectedPage] || PAGE_SURCHARGES['1'];

    let subtotalPrice = base.price + page.price + addonCost;
    let totalDays = base.days + page.days + addonDays;

    if (isExpress) {
      subtotalPrice = Math.round(subtotalPrice * 1.25);
      totalDays = Math.max(5, Math.round(totalDays * 0.65));
    }

    // Format Rupiah
    const formattedPrice = 'Rp ' + subtotalPrice.toLocaleString('id-ID');
    const minDays = Math.max(3, totalDays - 3);
    const formattedTimeline = `${minDays} - ${totalDays} Hari Kerja`;

    priceDisplay.textContent = formattedPrice;
    timelineDisplay.textContent = formattedTimeline;

    if (selectedType === 'webapp' || selectedType === 'ecommerce') {
      warrantyDisplay.textContent = '90 Hari Penuh + SLA';
    } else {
      warrantyDisplay.textContent = '60 Hari Penuh';
    }

    // Attach WA message
    whatsAppBtn.onclick = () => {
      const addonsText = selectedAddonNames.length > 0 
        ? selectedAddonNames.map(a => `• ${a}`).join('\n') 
        : '• Tidak ada addon tambahan';

      const waMsg = `Halo Supernova Studio! 👋\n\nSaya telah menggunakan Kalkulator Estimasi Website di website Anda dengan rincian berikut:\n\n` +
        `📌 *Tipe Proyek*: ${base.label}\n` +
        `📄 *Estimasi Halaman*: ${page.label}\n` +
        `⚙️ *Fitur Tambahan*:\n${addonsText}\n` +
        `🚀 *Prioritas Waktu*: ${isExpress ? 'Prioritas Kilat / Express' : 'Standar Teratur'}\n\n` +
        `💰 *Estimasi Total*: ${formattedPrice}\n` +
        `⏱️ *Estimasi Timeline*: ${formattedTimeline}\n\n` +
        `Saya ingin berdiskusi lebih lanjut mengenai realisasi proyek ini. Terima kasih!`;

      const encoded = encodeURIComponent(waMsg);
      window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
    };
  }

  // Bind change events
  [...typeRadios, ...pageRadios, ...addonCheckboxes, ...speedRadios].forEach(input => {
    input.addEventListener('change', recalculate);
  });

  recalculate();
}

/* ==========================================================================
   5. PACKAGE SELECT BUTTONS
   ========================================================================== */
function initPackageButtons() {
  const pkgButtons = document.querySelectorAll('.select-pkg-btn');
  const typeSelect = document.getElementById('projectTypeSelect');
  const briefInput = document.getElementById('projectBrief');

  pkgButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkgName = btn.getAttribute('data-package');

      if (typeSelect) {
        if (pkgName.includes('Starter')) typeSelect.value = 'Landing Page';
        else if (pkgName.includes('Business')) typeSelect.value = 'Company Profile';
        else if (pkgName.includes('Custom')) typeSelect.value = 'Custom Web App';
      }

      if (briefInput) {
        briefInput.value = `Saya berminat untuk mengambil paket "${pkgName}". Mohon penjelasan jadwal pengerjaan dan langkah selanjutnya.`;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(i => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. CONTACT FORM & DIRECT WHATSAPP INTEGRATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const submitWaBtn = document.getElementById('submitWaBtn');
  const submitEmailBtn = document.getElementById('submitEmailBtn');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  function getFormData() {
    const name = document.getElementById('clientName')?.value.trim();
    const phone = document.getElementById('clientPhone')?.value.trim();
    const email = document.getElementById('clientEmail')?.value.trim();
    const type = document.getElementById('projectTypeSelect')?.value;
    const budget = document.getElementById('budgetRangeSelect')?.value;
    const brief = document.getElementById('projectBrief')?.value.trim();

    return { name, phone, email, type, budget, brief };
  }

  // Submit via WhatsApp
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();

    if (!data.name || !data.phone || !data.email) {
      alert('Mohon lengkapi Nama, No. WhatsApp, dan Email Anda.');
      return;
    }

    const message = `Halo tim Supernova Studio! 🚀\n\n` +
      `Saya ingin berkonsultasi mengenai proyek website dengan detail berikut:\n\n` +
      `👤 *Nama / Perusahaan*: ${data.name}\n` +
      `📱 *No. WhatsApp*: ${data.phone}\n` +
      `✉️ *Email*: ${data.email}\n` +
      `📁 *Kategori Proyek*: ${data.type}\n` +
      `💵 *Estimasi Budget*: ${data.budget}\n` +
      `📝 *Ringkasan Kebutuhan*:\n"${data.brief || 'Belum diisi - ingin diskusi langsung'}"\n\n` +
      `Mohon tanggapan dan ketersediaan waktu untuk sesi diskusi singkat. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');

    if (feedback) {
      feedback.className = 'form-feedback success';
      feedback.style.display = 'block';
      feedback.textContent = 'Pesan telah disiapkan! Anda dialihkan ke WhatsApp resmi Supernova Studio.';
    }
  });

  // Submit via Email
  submitEmailBtn?.addEventListener('click', () => {
    const data = getFormData();

    if (!data.name || !data.email) {
      alert('Mohon isi minimal Nama dan Email Anda untuk pengiriman via email.');
      return;
    }

    const subject = encodeURIComponent(`[Inquiry Proyek] ${data.type} — ${data.name}`);
    const body = encodeURIComponent(
      `Nama: ${data.name}\nWhatsApp: ${data.phone}\nEmail: ${data.email}\nKategori: ${data.type}\nBudget: ${data.budget}\n\nKebutuhan:\n${data.brief}`
    );

    window.location.href = `mailto:partnership@supernova.studio?subject=${subject}&body=${body}`;

    if (feedback) {
      feedback.className = 'form-feedback success';
      feedback.style.display = 'block';
      feedback.textContent = 'Aplikasi email Anda dibuka dengan draf proposal yang telah terisi rapi.';
    }
  });
}
