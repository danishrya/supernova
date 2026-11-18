import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin.css';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { useSiteContent } from '../context/ContentContext';
import {
  IconShield,
  IconCheck,
  IconArrowRight,
  IconWhatsApp,
  IconMail,
  IconClose,
  IconChart,
  IconLayers,
  IconBolt,
  IconStar,
  IconSettings,
  IconGlobe,
  IconSearch,
  IconUserCheck,
} from '../components/Icons';

const DEFAULT_PASSCODE = 'supernova';

const IMAGE_PRESETS = [
  { label: 'Corporate / Pitch Deck', url: '/assets/images/corporate.jpg' },
  { label: 'CMS / Tablet Showcase', url: '/assets/images/cms-tablet.jpg' },
  { label: 'E-Commerce / Fashion', url: '/assets/images/ecommerce.jpg' },
  { label: 'Branding / Cafe & Retail', url: '/assets/images/resto-cafe.jpg' },
  { label: 'Landing Page / Agency', url: '/assets/images/landing.jpg' },
  { label: 'SaaS / Modern Platform', url: '/assets/images/saas.jpg' },
  { label: 'Architecture / Luxury', url: '/assets/images/villa-resort.jpg' },
  { label: 'Multi-Device Mockup', url: '/assets/images/devices-showcase.jpg' },
];

export default function AdminPage() {
  const {
    contactInfo,
    heroContent,
    ctaContent,
    projects,
    servicesList,
    testimonials,
    faqList,
    saveGeneralContent,
    saveProjects,
    saveServices,
    saveTestimonials,
    saveFaq,
    resetToDefaults,
    isCloudSynced,
  } = useSiteContent();

  const [user, setUser] = useState(() => {
    const localSession = sessionStorage.getItem('supernova_admin_session');
    if (localSession === 'true') {
      return { email: 'admin@supernova.studio', isLocal: true };
    }
    return null;
  });

  const [authChecking, setAuthChecking] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active dashboard tab
  // 'contact', 'hero', 'projects', 'services', 'testimonials', 'faq', 'security'
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Editable drafts
  const [draftContact, setDraftContact] = useState(contactInfo);
  const [draftHero, setDraftHero] = useState(heroContent);
  const [draftCta, setDraftCta] = useState(ctaContent);
  const [draftProjects, setDraftProjects] = useState(projects);
  const [draftServices, setDraftServices] = useState(servicesList);
  const [draftTestimonials, setDraftTestimonials] = useState(testimonials);
  const [draftFaq, setDraftFaq] = useState(faqList);

  // Search filter for projects
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('all');

  // Modals state
  const [editingProject, setEditingProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingTesti, setEditingTesti] = useState(null);
  const [isNewTesti, setIsNewTesti] = useState(false);

  const [editingFaq, setEditingFaq] = useState(null);
  const [isNewFaq, setIsNewFaq] = useState(false);

  const [editingService, setEditingService] = useState(null);

  // Security passcode change state
  const [newPasscode, setNewPasscode] = useState('');

  // Saving indicator & toast
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Check Firebase Auth if configured
  useEffect(() => {
    if (auth && isFirebaseConfigured) {
      setAuthChecking(true);
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        }
        setAuthChecking(false);
      });
      return () => unsubscribe();
    }
  }, []);

  // Sync drafts when context changes
  useEffect(() => { setDraftContact(contactInfo); }, [contactInfo]);
  useEffect(() => { setDraftHero(heroContent); }, [heroContent]);
  useEffect(() => { setDraftCta(ctaContent); }, [ctaContent]);
  useEffect(() => { setDraftProjects(projects); }, [projects]);
  useEffect(() => { setDraftServices(servicesList); }, [servicesList]);
  useEffect(() => { setDraftTestimonials(testimonials); }, [testimonials]);
  useEffect(() => { setDraftFaq(faqList); }, [faqList]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const inputPass = loginPassword.trim();
    const storedPass = localStorage.getItem('supernova_admin_passcode') || DEFAULT_PASSCODE;

    // 1. Built-in Passcode check (Zero-Setup)
    if (inputPass === storedPass || inputPass === DEFAULT_PASSCODE) {
      sessionStorage.setItem('supernova_admin_session', 'true');
      setUser({ email: loginEmail || 'admin@supernova.studio', isLocal: true });
      setIsLoggingIn(false);
      showToast('success', 'Selamat datang di CMS Supernova Studio.');
      return;
    }

    // 2. Firebase Auth if configured
    if (auth && isFirebaseConfigured) {
      try {
        const userCred = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        setUser(userCred.user);
        sessionStorage.setItem('supernova_admin_session', 'true');
        showToast('success', 'Berhasil masuk via Firebase Auth.');
        setIsLoggingIn(false);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    setLoginError(`Password salah. Gunakan passcode studio: "${storedPass}"`);
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    sessionStorage.removeItem('supernova_admin_session');
    if (auth && isFirebaseConfigured) {
      try { await signOut(auth); } catch (e) { console.warn(e); }
    }
    setUser(null);
    showToast('info', 'Anda telah keluar dari CMS.');
  };

  // Change Passcode
  const handleChangePasscode = (e) => {
    e.preventDefault();
    if (newPasscode.trim().length < 4) {
      alert('Password minimal 4 karakter.');
      return;
    }
    localStorage.setItem('supernova_admin_passcode', newPasscode.trim());
    setNewPasscode('');
    showToast('success', 'Password CMS berhasil diperbarui!');
  };

  // Save General (Contact, Hero, CTA)
  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveGeneralContent(draftContact, draftHero, draftCta);
      showToast('success', 'Konten teks & kontak berhasil disimpan ke website!');
    } catch (err) {
      showToast('error', `Gagal menyimpan: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Save Projects
  const handleSaveAllProjects = async () => {
    setIsSaving(true);
    try {
      await saveProjects(draftProjects);
      showToast('success', 'Daftar portofolio karya berhasil disimpan!');
    } catch (err) {
      showToast('error', `Gagal menyimpan: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProjectModal = async (e) => {
    e.preventDefault();
    if (!editingProject.title.trim()) {
      alert('Judul proyek wajib diisi.');
      return;
    }

    let updatedList;
    if (isNewProject) {
      const newId = editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
      updatedList = [{ ...editingProject, id: newId }, ...draftProjects];
    } else {
      updatedList = draftProjects.map((p) => (p.id === editingProject.id ? editingProject : p));
    }

    setDraftProjects(updatedList);
    setEditingProject(null);
    try {
      await saveProjects(updatedList);
      showToast('success', isNewProject ? 'Proyek baru berhasil ditambahkan dan langsung aktif di website!' : 'Perubahan proyek berhasil disimpan ke website!');
    } catch (err) {
      showToast('error', `Gagal menyimpan: ${err.message}`);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Hapus proyek ini dari portofolio?')) {
      const updated = draftProjects.filter((p) => p.id !== id);
      setDraftProjects(updated);
      try {
        await saveProjects(updated);
        showToast('success', 'Proyek berhasil dihapus dari website!');
      } catch (err) {
        showToast('error', `Gagal menghapus: ${err.message}`);
      }
    }
  };

  // Save Services
  const handleSaveAllServices = async () => {
    setIsSaving(true);
    try {
      await saveServices(draftServices);
      showToast('success', 'Layanan & spesifikasi berhasil diperbarui di website!');
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveServiceModal = async (e) => {
    e.preventDefault();
    const updated = draftServices.map((s) => (s.id === editingService.id ? editingService : s));
    setDraftServices(updated);
    setEditingService(null);
    try {
      await saveServices(updated);
      showToast('success', 'Layanan berhasil disimpan ke website!');
    } catch (err) {
      showToast('error', err.message);
    }
  };

  // Save Testimonials
  const handleSaveAllTestimonials = async () => {
    setIsSaving(true);
    try {
      await saveTestimonials(draftTestimonials);
      showToast('success', 'Ulasan testimoni klien berhasil disimpan ke website!');
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTestiModal = async (e) => {
    e.preventDefault();
    if (!editingTesti.name.trim() || !editingTesti.quote.trim()) {
      alert('Nama dan kutipan ulasan wajib diisi.');
      return;
    }
    let updated;
    if (isNewTesti) {
      const newId = 'testi-' + Date.now();
      updated = [{ ...editingTesti, id: newId }, ...draftTestimonials];
    } else {
      updated = draftTestimonials.map((t) => (t.id === editingTesti.id ? editingTesti : t));
    }
    setDraftTestimonials(updated);
    setEditingTesti(null);
    try {
      await saveTestimonials(updated);
      showToast('success', isNewTesti ? 'Testimoni baru berhasil ditambahkan!' : 'Perubahan testimoni berhasil disimpan!');
    } catch (err) {
      showToast('error', err.message);
    }
  };

  const handleDeleteTesti = async (id) => {
    if (window.confirm('Hapus testimoni ini?')) {
      const updated = draftTestimonials.filter((t) => t.id !== id);
      setDraftTestimonials(updated);
      try {
        await saveTestimonials(updated);
        showToast('success', 'Testimoni dihapus dari website!');
      } catch (err) {
        showToast('error', err.message);
      }
    }
  };

  // Save FAQ
  const handleSaveAllFaq = async () => {
    setIsSaving(true);
    try {
      await saveFaq(draftFaq);
      showToast('success', 'Daftar FAQ berhasil disimpan ke website!');
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveFaqModal = async (e) => {
    e.preventDefault();
    if (!editingFaq.question.trim() || !editingFaq.answer.trim()) {
      alert('Pertanyaan dan jawaban wajib diisi.');
      return;
    }
    let updated;
    if (isNewFaq) {
      const newId = 'faq-' + Date.now();
      updated = [...draftFaq, { ...editingFaq, id: newId }];
    } else {
      updated = draftFaq.map((f, idx) => (f.id === editingFaq.id || idx === editingFaq._index ? editingFaq : f));
    }
    setDraftFaq(updated);
    setEditingFaq(null);
    try {
      await saveFaq(updated);
      showToast('success', isNewFaq ? 'Pertanyaan FAQ baru berhasil ditambahkan!' : 'Perubahan FAQ berhasil disimpan!');
    } catch (err) {
      showToast('error', err.message);
    }
  };

  const handleDeleteFaq = async (idxOrId) => {
    if (window.confirm('Hapus pertanyaan FAQ ini?')) {
      const updated = draftFaq.filter((f, idx) => (f.id ? f.id !== idxOrId : idx !== idxOrId));
      setDraftFaq(updated);
      try {
        await saveFaq(updated);
        showToast('success', 'FAQ dihapus dari website!');
      } catch (err) {
        showToast('error', err.message);
      }
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      contact: draftContact,
      hero: draftHero,
      cta: draftCta,
      projects: draftProjects,
      services: draftServices,
      testimonials: draftTestimonials,
      faq: draftFaq,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `supernova-studio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('success', 'File backup data website lengkap berhasil diunduh!');
  };

  // Reset all
  const handleReset = () => {
    if (window.confirm('Yakin ingin mereset SELURUH konten website kembali ke data bawaan awal?')) {
      resetToDefaults();
      showToast('info', 'Konten dikembalikan ke template awal.');
    }
  };

  // Filtered projects
  const filteredProjects = draftProjects.filter((p) => {
    const matchesCat = projectCategoryFilter === 'all' || p.category === projectCategoryFilter;
    const matchesSearch =
      !projectSearch ||
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.overview && p.overview.toLowerCase().includes(projectSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  if (authChecking) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner"></div>
        <p>Memeriksa autentikasi CMS...</p>
      </div>
    );
  }

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!user) {
    const storedPass = localStorage.getItem('supernova_admin_passcode') || DEFAULT_PASSCODE;
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-logo-coin">
              <img src="/assets/images/supernova-logo.jpg" alt="Supernova Emblem" />
            </div>
            <h2>SUPERNOVA CMS</h2>
            <p>Pusat Pengelolaan Konten &amp; Portofolio Studio</p>
          </div>

          <div
            className="admin-alert info"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              color: '#93c5fd',
            }}
          >
            💡 <strong>CMS Langsung Siap Pakai:</strong> Masuk dengan passcode studio: <code>{storedPass}</code>
          </div>

          {loginError && <div className="admin-alert error">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label>Email Admin (Opsional)</label>
              <input
                type="email"
                placeholder="admin@supernova.studio"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="studio-input"
              />
            </div>

            <div className="form-group">
              <label>Passcode / Password Studio</label>
              <input
                type="password"
                placeholder={`Ketik: ${storedPass}`}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="studio-input"
                autoFocus
              />
            </div>

            <button type="submit" className="studio-btn-primary" disabled={isLoggingIn} style={{ marginTop: '8px' }}>
              {isLoggingIn ? 'Memverifikasi...' : 'Masuk ke Dashboard CMS'}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link to="/" className="back-link">
              &larr; Kembali ke Website Publik
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD SCREEN (V2 CLEAN WHITE THEME)
  // ==========================================
  return (
    <div className="admin-v2-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          <IconCheck size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* LEFT SIDEBAR (PAULCODES & VOYNANN GRADE) */}
      <aside className={`admin-v2-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-coin">
            <img src="/assets/images/supernova-logo.jpg" alt="Supernova Emblem" />
          </div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-title">SUPERNOVA</span>
            <span className="sidebar-brand-badge">STUDIO CMS V2</span>
          </div>
        </div>

        <nav className="sidebar-nav-groups">
          {/* Group 1: OVERVIEW */}
          <div className="nav-group">
            <div className="nav-group-title">OVERVIEW</div>
            <div className="nav-group-items">
              <button
                type="button"
                className={`sidebar-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('overview');
                  setSidebarOpen(false);
                }}
              >
                <div className="nav-btn-left">
                  <span className="nav-btn-icon">📊</span>
                  <span>Ringkasan Studio</span>
                </div>
              </button>

              <button
                type="button"
                className={`sidebar-nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('projects');
                  setSidebarOpen(false);
                }}
              >
                <div className="nav-btn-left">
                  <span className="nav-btn-icon">📁</span>
                  <span>Portofolio &amp; Karya</span>
                </div>
                <span className="nav-badge-pill">{draftProjects.length}</span>
              </button>
            </div>
          </div>

          {/* Group 2: KONTEN STUDIO */}
          <div className="nav-group">
            <div className="nav-group-title">KONTEN STUDIO</div>
            <div className="nav-group-items">
              <button
                type="button"
                className={`sidebar-nav-btn ${activeTab === 'services' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('services');
                  setSidebarOpen(false);
                }}
              >
                <div className="nav-btn-left">
                  <span className="nav-btn-icon">🛠️</span>
                  <span>Layanan Studio</span>
                </div>
                <span className="nav-badge-pill">{draftServices.length}</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('testimonials');
                  setSidebarOpen(false);
                }}
              >
                <div className="nav-btn-left">
                  <span className="nav-btn-icon">💬</span>
                  <span>Testimoni Klien</span>
                </div>
                <span className="nav-badge-pill">{draftTestimonials.length}</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-btn ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('faq');
                  setSidebarOpen(false);
                }}
              >
                <div className="nav-btn-left">
                  <span className="nav-btn-icon">❓</span>
                  <span>FAQ &amp; Bantuan</span>
                </div>
                <span className="nav-badge-pill">{draftFaq.length}</span>
              </button>

              <button
                type="button"
                className={`sidebar-nav-btn ${activeTab === 'hero' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('hero');
                  setSidebarOpen(false);
                }}
              >
                <div className="nav-btn-left">
                  <span className="nav-btn-icon">✏️</span>
                  <span>Beranda &amp; Banner</span>
                </div>
              </button>

              <button
                type="button"
                className={`sidebar-nav-btn ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('contact');
                  setSidebarOpen(false);
                }}
              >
                <div className="nav-btn-left">
                  <span className="nav-btn-icon">📞</span>
                  <span>Kontak &amp; WhatsApp</span>
                </div>
              </button>
            </div>
          </div>

          {/* Group 3: SISTEM */}
          <div className="nav-group">
            <div className="nav-group-title">SISTEM</div>
            <div className="nav-group-items">
              <button
                type="button"
                className={`sidebar-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('security');
                  setSidebarOpen(false);
                }}
              >
                <div className="nav-btn-left">
                  <span className="nav-btn-icon">🔐</span>
                  <span>Keamanan &amp; Backup</span>
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer User Profile */}
        <div className="sidebar-footer">
          <div className="sidebar-user-card">
            <div className="user-avatar-pill">A</div>
            <div className="user-info-col">
              <span className="user-email-text">{user.email || 'Admin Studio'}</span>
              <span className="user-status-text">
                <span className="user-status-dot" />
                <span>Online &bull; {isCloudSynced ? 'Cloud' : 'Browser'}</span>
              </span>
            </div>
            <button
              type="button"
              className="user-logout-btn"
              onClick={handleLogout}
              title="Keluar dari CMS"
            >
              ⎋
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="admin-v2-main">
        {/* TOP HEADER */}
        <header className="admin-v2-header">
          <div className="header-left-col">
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Buka Menu"
            >
              ☰
            </button>
            <div className="header-titles">
              <h1 className="header-page-title">
                {activeTab === 'overview' && 'Ringkasan & Analytics Studio'}
                {activeTab === 'projects' && 'Kelola Portofolio & Karya'}
                {activeTab === 'services' && 'Layanan Studio & Spesifikasi'}
                {activeTab === 'testimonials' && 'Testimoni & Ulasan Klien'}
                {activeTab === 'faq' && 'Daftar FAQ & Informasi Klien'}
                {activeTab === 'hero' && 'Pengaturan Teks Beranda & Banner'}
                {activeTab === 'contact' && 'Kontak WhatsApp & Komunikasi'}
                {activeTab === 'security' && 'Keamanan Sandi & Backup Sistem'}
              </h1>
              <span className="header-page-breadcrumb">
                CMS Supernova &bull; {activeTab.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="header-right-col">
            <span className={`status-pill ${isCloudSynced ? 'online' : 'local'}`}>
              <span className="dot"></span>
              {isCloudSynced ? 'Cloud Synced' : 'Live di Browser'}
            </span>

            <button
              type="button"
              onClick={handleExportJSON}
              className="header-action-btn"
              title="Unduh Backup Lengkap JSON"
            >
              <span>📥 Backup JSON</span>
            </button>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-action-btn primary"
            >
              <span>Lihat Website ↗</span>
            </Link>
          </div>
        </header>

        {/* CONTENT VIEWPORT */}
        <main className="admin-v2-content">

        {/* ==========================================
            TAB 0: RINGKASAN & ANALYTICS (VOYNANN & PAULCODES STYLE)
            ========================================== */}
        {activeTab === 'overview' && (
          <div className="admin-overview-view" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Welcome Banner */}
            <div className="overview-welcome-card">
              <div className="overview-welcome-text">
                <h2>Selamat Datang, Admin Studio 👋</h2>
                <p>
                  Pusat kontrol konten Supernova Studio. Seluruh perubahan pada portofolio, nomor WhatsApp,
                  dan materi publikasi langsung aktif secara instan di website utama.
                </p>
              </div>
              <div className="overview-welcome-actions">
                <button
                  type="button"
                  className="studio-btn-primary"
                  onClick={() => {
                    setIsNewProject(true);
                    setEditingProject({
                      title: '',
                      category: 'presentation',
                      overview: '',
                      deliverables: '',
                      thumbnail: '/assets/images/corporate.jpg',
                      specs: ['18 Slide Persuasif', 'Master PPTX Editable'],
                      metrics: 'Lolos Tahap Pitching Investor',
                    });
                  }}
                >
                  <span>+ Tambah Proyek Baru</span>
                </button>
              </div>
            </div>

            {/* 4 Stats Cards (Analytics V2 from Paulcodes video) */}
            <div className="admin-stats-grid">
              {/* Card 1: Portofolio */}
              <div className="admin-stat-card" onClick={() => setActiveTab('projects')}>
                <div className="stat-card-top">
                  <span className="stat-card-label">Total Portofolio</span>
                  <div className="stat-icon-wrapper blue">
                    <IconLayers size={20} />
                  </div>
                </div>
                <h3 className="stat-card-value">{draftProjects.length} Karya</h3>
                <div className="stat-card-bottom">
                  <span className="stat-trend-badge positive">▲ +2 bulan ini</span>
                  <span>Aktif di Galeri Publik</span>
                </div>
              </div>

              {/* Card 2: Layanan */}
              <div className="admin-stat-card" onClick={() => setActiveTab('services')}>
                <div className="stat-card-top">
                  <span className="stat-card-label">Layanan Studio</span>
                  <div className="stat-icon-wrapper gold">
                    <IconBolt size={20} />
                  </div>
                </div>
                <h3 className="stat-card-value">{draftServices.length} Solusi</h3>
                <div className="stat-card-bottom">
                  <span className="stat-trend-badge gold">✦ Universal</span>
                  <span>PPT, Web, Branding, All-in-One</span>
                </div>
              </div>

              {/* Card 3: Testimoni */}
              <div className="admin-stat-card" onClick={() => setActiveTab('testimonials')}>
                <div className="stat-card-top">
                  <span className="stat-card-label">Ulasan Klien</span>
                  <div className="stat-icon-wrapper emerald">
                    <IconStar size={20} />
                  </div>
                </div>
                <h3 className="stat-card-value">{draftTestimonials.length} Klien</h3>
                <div className="stat-card-bottom">
                  <span className="stat-trend-badge positive">★ 5.0 Rating</span>
                  <span>Founder &amp; Direktur Korporat</span>
                </div>
              </div>

              {/* Card 4: WhatsApp & Kontak */}
              <div className="admin-stat-card" onClick={() => setActiveTab('contact')}>
                <div className="stat-card-top">
                  <span className="stat-card-label">Kontak WhatsApp</span>
                  <div className="stat-icon-wrapper emerald">
                    <IconWhatsApp size={20} />
                  </div>
                </div>
                <h3 className="stat-card-value" style={{ fontSize: '1.45rem' }}>{draftContact.phone || '+62 857-1452-1584'}</h3>
                <div className="stat-card-bottom">
                  <span className="stat-trend-badge positive">● Respon Aktif</span>
                  <span>{draftContact.email || 'chasupernova.studio@gmail.com'}</span>
                </div>
              </div>
            </div>

            {/* Quick Management Hub */}
            <div className="admin-panel-card">
              <div className="panel-header">
                <h3>Pintasan Aksi Cepat (Quick Actions)</h3>
                <p>Akses cepat untuk menambah atau memperbarui bagian penting website studio.</p>
              </div>

              <div className="quick-hub-grid">
                <div
                  className="quick-hub-card"
                  onClick={() => {
                    setIsNewProject(true);
                    setEditingProject({
                      title: '',
                      category: 'presentation',
                      overview: '',
                      deliverables: '',
                      thumbnail: '/assets/images/corporate.jpg',
                      specs: ['18 Slide Persuasif', 'Master PPTX Editable'],
                      metrics: 'Lolos Tahap Pitching Investor',
                    });
                  }}
                >
                  <div className="quick-hub-icon">📁</div>
                  <div className="quick-hub-text">
                    <h4>+ Portofolio Baru</h4>
                    <p>Upload karya atau studi kasus</p>
                  </div>
                </div>

                <div
                  className="quick-hub-card"
                  onClick={() => {
                    setIsNewTesti(true);
                    setEditingTesti({
                      name: '',
                      role: 'Founder & CEO',
                      quote: '',
                      avatar: 'K',
                      featured: true,
                    });
                  }}
                >
                  <div className="quick-hub-icon">💬</div>
                  <div className="quick-hub-text">
                    <h4>+ Testimoni Klien</h4>
                    <p>Tambah ulasan kepuasan klien</p>
                  </div>
                </div>

                <div
                  className="quick-hub-card"
                  onClick={() => {
                    setIsNewFaq(true);
                    setEditingFaq({
                      question: '',
                      answer: '',
                      category: 'Umum',
                    });
                  }}
                >
                  <div className="quick-hub-icon">❓</div>
                  <div className="quick-hub-text">
                    <h4>+ Pertanyaan FAQ</h4>
                    <p>Tambah panduan atau tanya-jawab</p>
                  </div>
                </div>

                <div className="quick-hub-card" onClick={() => setActiveTab('contact')}>
                  <div className="quick-hub-icon">📞</div>
                  <div className="quick-hub-text">
                    <h4>Edit Kontak &amp; WA</h4>
                    <p>Perbarui nomor WA &amp; email</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Projects Preview Table */}
            <div className="admin-panel-card">
              <div className="panel-header-with-action">
                <div>
                  <h3>Portofolio Terkini ({draftProjects.length} Proyek)</h3>
                  <p>Daftar karya yang sedang tampil di halaman depan dan katalog portofolio.</p>
                </div>
                <button
                  type="button"
                  className="header-action-btn primary"
                  onClick={() => setActiveTab('projects')}
                >
                  <span>Lihat Semua Portofolio &rarr;</span>
                </button>
              </div>

              <div className="admin-projects-grid">
                {draftProjects.slice(0, 3).map((p) => (
                  <div key={p.id} className="admin-project-card">
                    <div className="project-card-media">
                      <img src={p.thumbnail || p.image} alt={p.title} />
                      <span className="project-card-badge">{p.category}</span>
                    </div>
                    <div className="project-card-body">
                      <h4 className="project-card-title">{p.title}</h4>
                      <p className="project-card-desc">{p.overview || p.desc}</p>
                      <div className="project-card-actions">
                        <button
                          type="button"
                          className="btn-card-action edit"
                          onClick={() => {
                            setIsNewProject(false);
                            setEditingProject({ ...p });
                          }}
                        >
                          ✏️ Edit Proyek
                        </button>
                        <button
                          type="button"
                          className="btn-card-action delete"
                          onClick={() => handleDeleteProject(p.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* ==========================================
            TAB 1: KONTAK & WHATSAPP
            ========================================== */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSaveGeneral} className="admin-panel-card">
            <div className="panel-header">
              <h3>Kontak &amp; Komunikasi Studio</h3>
              <p>Perubahan nomor WhatsApp, email, dan alamat langsung aktif di tombol WhatsApp, formulir konsultasi, dan footer seluruh website.</p>
            </div>

            <div className="admin-form-grid">
              <div className="form-group">
                <label>Nomor WhatsApp Tampilan (dengan spasi/tanda hubung)</label>
                <input
                  type="text"
                  value={draftContact.phone}
                  onChange={(e) => setDraftContact({ ...draftContact, phone: e.target.value })}
                  placeholder="+62 857-1452-1584"
                  className="studio-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Nomor WhatsApp Link API (Hanya angka tanpa spasi/simbol)</label>
                <input
                  type="text"
                  value={draftContact.waNumber}
                  onChange={(e) => setDraftContact({ ...draftContact, waNumber: e.target.value })}
                  placeholder="6285714521584"
                  className="studio-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Alamat Email Resmi</label>
                <input
                  type="email"
                  value={draftContact.email}
                  onChange={(e) => setDraftContact({ ...draftContact, email: e.target.value })}
                  placeholder="chasupernova.studio@gmail.com"
                  className="studio-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Lokasi Studio</label>
                <input
                  type="text"
                  value={draftContact.location}
                  onChange={(e) => setDraftContact({ ...draftContact, location: e.target.value })}
                  placeholder="Jakarta Selatan, DKI Jakarta"
                  className="studio-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Jam Operasional</label>
                <input
                  type="text"
                  value={draftContact.hours}
                  onChange={(e) => setDraftContact({ ...draftContact, hours: e.target.value })}
                  placeholder="Senin – Sabtu (09:00 – 18:00 WIB)"
                  className="studio-input"
                />
              </div>
            </div>

            <div className="panel-actions">
              <button type="submit" className="studio-btn-primary" disabled={isSaving}>
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan Kontak ke Website'}
              </button>
            </div>
          </form>
        )}

        {/* ==========================================
            TAB 2: BERANDA & BANNER
            ========================================== */}
        {activeTab === 'hero' && (
          <form onSubmit={handleSaveGeneral} className="admin-panel-card">
            <div className="panel-header">
              <h3>Teks Beranda &amp; Banner CTA</h3>
              <p>Sesuaikan pesan pembuka utama, statistik pencapaian, dan kalimat penutup penawaran proyek.</p>
            </div>

            <div className="admin-form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Status Badge / Tagline Atas</label>
                <input
                  type="text"
                  value={draftHero.badge}
                  onChange={(e) => setDraftHero({ ...draftHero, badge: e.target.value })}
                  className="studio-input"
                  placeholder="Studio Desain & Digital Independen"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Judul Headline Utama (Gunakan Enter untuk baris baru)</label>
                <textarea
                  rows="2"
                  value={draftHero.title}
                  onChange={(e) => setDraftHero({ ...draftHero, title: e.target.value })}
                  className="studio-textarea"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Deskripsi Subtitle Beranda</label>
                <textarea
                  rows="3"
                  value={draftHero.desc}
                  onChange={(e) => setDraftHero({ ...draftHero, desc: e.target.value })}
                  className="studio-textarea"
                />
              </div>

              <div className="form-group">
                <label>Statistik 1</label>
                <input
                  type="text"
                  value={draftHero.stat1}
                  onChange={(e) => setDraftHero({ ...draftHero, stat1: e.target.value })}
                  className="studio-input"
                />
              </div>

              <div className="form-group">
                <label>Statistik 2</label>
                <input
                  type="text"
                  value={draftHero.stat2}
                  onChange={(e) => setDraftHero({ ...draftHero, stat2: e.target.value })}
                  className="studio-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Statistik 3</label>
                <input
                  type="text"
                  value={draftHero.stat3}
                  onChange={(e) => setDraftHero({ ...draftHero, stat3: e.target.value })}
                  className="studio-input"
                />
              </div>

              {/* CTA Banner Section */}
              <div className="form-group" style={{ gridColumn: '1 / -1', borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#0f172a' }}>Banner Penutup Bawah (CTA Section)</h4>
              </div>

              <div className="form-group">
                <label>Tag Banner</label>
                <input
                  type="text"
                  value={draftCta?.tag || "LET'S TALK"}
                  onChange={(e) => setDraftCta({ ...draftCta, tag: e.target.value })}
                  className="studio-input"
                />
              </div>

              <div className="form-group">
                <label>Teks Tombol Banner</label>
                <input
                  type="text"
                  value={draftCta?.btnText || 'Mulai Diskusi via WhatsApp'}
                  onChange={(e) => setDraftCta({ ...draftCta, btnText: e.target.value })}
                  className="studio-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Judul Ajakan Banner</label>
                <input
                  type="text"
                  value={draftCta?.title || ''}
                  onChange={(e) => setDraftCta({ ...draftCta, title: e.target.value })}
                  className="studio-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Deskripsi Ajakan Banner</label>
                <textarea
                  rows="2"
                  value={draftCta?.desc || ''}
                  onChange={(e) => setDraftCta({ ...draftCta, desc: e.target.value })}
                  className="studio-textarea"
                />
              </div>
            </div>

            <div className="panel-actions">
              <button type="submit" className="studio-btn-primary" disabled={isSaving}>
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan Teks ke Website'}
              </button>
            </div>
          </form>
        )}

        {/* ==========================================
            TAB 3: PORTOFOLIO / WORKS
            ========================================== */}
        {activeTab === 'projects' && (
          <div className="admin-panel-card">
            <div className="panel-header-with-action">
              <div>
                <h3>Kelola Portofolio &amp; Karya ({draftProjects.length})</h3>
                <p>Tambah, edit, atau hapus proyek karya yang tampil di Galeri Beranda dan Halaman Works.</p>
              </div>
              <div className="header-action-buttons">
                <button
                  type="button"
                  className="studio-btn-secondary"
                  onClick={() => {
                    setIsNewProject(true);
                    setEditingProject({
                      id: '',
                      title: '',
                      category: 'presentation',
                      categoryLabel: 'Presentation & Pitch Deck (PPT)',
                      badge: 'Format PPTX & PDF 16:9',
                      image: '/assets/images/corporate.jpg',
                      tags: ['PowerPoint', 'Pitch Deck Investor'],
                      overview: '',
                      challenge: '',
                      solution: '',
                      results: ['Hasil karya siap pakai dan bergaransi'],
                    });
                  }}
                >
                  + Tambah Proyek Baru
                </button>
                <button
                  type="button"
                  className="studio-btn-primary"
                  onClick={handleSaveAllProjects}
                  disabled={isSaving}
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Semua Proyek'}
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Cari judul proyek..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="studio-input"
                style={{ maxWidth: '300px' }}
              />
              <div style={{ display: 'flex', gap: '6px' }}>
                {['all', 'presentation', 'web', 'branding'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProjectCategoryFilter(cat)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      background: projectCategoryFilter === cat ? '#0f172a' : '#ffffff',
                      color: projectCategoryFilter === cat ? '#ffffff' : '#475569',
                    }}
                  >
                    {cat === 'all' ? 'Semua' : cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-projects-grid">
              {filteredProjects.map((p, index) => (
                <div key={p.id || index} className="admin-project-item">
                  <div className="p-item-thumb">
                    <img src={p.image} alt={p.title} />
                    <span className="p-item-badge">{p.category}</span>
                  </div>
                  <div className="p-item-body">
                    <h4>{p.title}</h4>
                    <p className="p-item-overview">{p.overview}</p>
                    <div className="p-item-tags">
                      {(p.tags || []).slice(0, 3).map((tag, i) => (
                        <span key={i} className="p-tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-item-actions">
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => {
                        setIsNewProject(false);
                        setEditingProject({
                          ...p,
                          results: Array.isArray(p.results) ? p.results : [p.results || ''],
                        });
                      }}
                    >
                      Edit Lengkap
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeleteProject(p.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 4: LAYANAN & KAPABILITAS
            ========================================== */}
        {activeTab === 'services' && (
          <div className="admin-panel-card">
            <div className="panel-header-with-action">
              <div>
                <h3>Layanan &amp; Spesifikasi Studio ({draftServices.length})</h3>
                <p>Edit nama layanan, estimasi waktu turnaround, deskripsi, dan daftar hasil yang diterima klien.</p>
              </div>
              <button
                type="button"
                className="studio-btn-primary"
                onClick={handleSaveAllServices}
                disabled={isSaving}
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Layanan ke Website'}
              </button>
            </div>

            <div className="admin-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {draftServices.map((srv) => (
                <div
                  key={srv.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', color: '#b8933b', background: 'rgba(184,147,59,0.1)', padding: '3px 8px', borderRadius: '6px' }}>
                      {srv.badge}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                      ⏱️ {srv.turnaround}
                    </span>
                  </div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>{srv.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>{srv.desc}</p>
                  
                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                    <strong style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase' }}>Hasil Deliverables:</strong>
                    <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', fontSize: '0.82rem', color: '#334155', lineHeight: 1.5 }}>
                      {(srv.deliverables || []).map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="studio-btn-secondary"
                    onClick={() => setEditingService({ ...srv })}
                    style={{ marginTop: '12px' }}
                  >
                    Edit Layanan Ini
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 5: ULASAN & TESTIMONI KLIEN
            ========================================== */}
        {activeTab === 'testimonials' && (
          <div className="admin-panel-card">
            <div className="panel-header-with-action">
              <div>
                <h3>Testimoni &amp; Kata Klien ({draftTestimonials.length})</h3>
                <p>Tambah atau sesuaikan ulasan dari founder, direktur, dan brand lead yang ditampilkan di Beranda.</p>
              </div>
              <div className="header-action-buttons">
                <button
                  type="button"
                  className="studio-btn-secondary"
                  onClick={() => {
                    setIsNewTesti(true);
                    setEditingTesti({
                      name: '',
                      role: '',
                      quote: '',
                      avatar: '',
                      featured: false,
                    });
                  }}
                >
                  + Tambah Testimoni
                </button>
                <button
                  type="button"
                  className="studio-btn-primary"
                  onClick={handleSaveAllTestimonials}
                  disabled={isSaving}
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Semua Testimoni'}
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {draftTestimonials.map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    position: 'relative',
                  }}
                >
                  {t.featured && (
                    <span style={{ position: 'absolute', top: 12, right: 12, fontSize: '0.7rem', background: '#0f172a', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>
                      Featured
                    </span>
                  )}
                  <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto', paddingTop: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#0f172a',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {t.avatar || t.name.charAt(0)}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.92rem', color: '#0f172a' }}>{t.name}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.role}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => {
                        setIsNewTesti(false);
                        setEditingTesti({ ...t });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeleteTesti(t.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 6: PERTANYAAN UMUM (FAQ)
            ========================================== */}
        {activeTab === 'faq' && (
          <div className="admin-panel-card">
            <div className="panel-header-with-action">
              <div>
                <h3>Pertanyaan Umum (FAQ) ({draftFaq.length})</h3>
                <p>Kelola pertanyaan dan jawaban yang tampil di Beranda dan Halaman Kontak.</p>
              </div>
              <div className="header-action-buttons">
                <button
                  type="button"
                  className="studio-btn-secondary"
                  onClick={() => {
                    setIsNewFaq(true);
                    setEditingFaq({ question: '', answer: '' });
                  }}
                >
                  + Tambah FAQ Baru
                </button>
                <button
                  type="button"
                  className="studio-btn-primary"
                  onClick={handleSaveAllFaq}
                  disabled={isSaving}
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Semua FAQ'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {draftFaq.map((item, idx) => (
                <div
                  key={item.id || idx}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>
                      {idx + 1}. {item.question}
                    </strong>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() => {
                          setIsNewFaq(false);
                          setEditingFaq({ ...item, _index: idx });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => handleDeleteFaq(item.id || idx)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 7: KEAMANAN & BACKUP
            ========================================== */}
        {activeTab === 'security' && (
          <div className="admin-panel-card">
            <div className="panel-header">
              <h3>Keamanan Akun &amp; Backup Sistem</h3>
              <p>Ubah password masuk CMS, unduh salinan data seluruh website, atau reset ke pengaturan awal.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {/* Change Passcode */}
              <form onSubmit={handleChangePasscode} style={{ background: '#0f172a', color: '#fff', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ margin: 0, color: '#fff' }}>🔐 Ubah Password Masuk CMS</h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Ganti passcode studio bawaan ("{localStorage.getItem('supernova_admin_passcode') || DEFAULT_PASSCODE}") dengan password rahasia baru Anda.
                </p>
                <div className="form-group">
                  <label style={{ color: '#cbd5e1' }}>Password Baru</label>
                  <input
                    type="text"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Minimal 4 karakter"
                    className="studio-input"
                    style={{ background: '#1e293b', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}
                    required
                  />
                </div>
                <button type="submit" className="studio-btn-primary" style={{ background: '#dfbe76', color: '#0f172a', borderColor: '#dfbe76' }}>
                  Simpan Password Baru
                </button>
              </form>

              {/* Backup & Export */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, color: '#0f172a' }}>📥 Download Seluruh Data (JSON)</h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                  Unduh backup lengkap yang mencakup data Kontak, Hero, Portofolio Proyek, Layanan, Testimoni, dan FAQ dalam satu file JSON.
                </p>
                <button type="button" onClick={handleExportJSON} className="studio-btn-primary" style={{ marginTop: 'auto' }}>
                  Unduh File Backup JSON
                </button>
              </div>

              {/* Reset to Factory Defaults */}
              <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, color: '#9f1239' }}>⚠️ Kembalikan ke Data Bawaan</h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#881337', lineHeight: 1.5 }}>
                  Reset seluruh konten kembali ke data bawaan awal template Supernova Studio. Seluruh draf lokal akan diganti.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="studio-btn-secondary"
                  style={{ marginTop: 'auto', borderColor: '#fda4af', color: '#9f1239' }}
                >
                  Reset Konten Bawaan
                </button>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>

      {/* ==========================================
          PROJECT MODAL (FULL CAPABILITY)
          ========================================== */}
      {editingProject && (
        <div className="admin-modal-backdrop" onClick={() => setEditingProject(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{isNewProject ? 'Tambah Proyek Baru' : 'Edit Detail Proyek'}</h3>
              <button className="modal-close-btn" onClick={() => setEditingProject(null)}>✕</button>
            </div>

            <form onSubmit={handleSaveProjectModal} className="admin-modal-form">
              <div className="form-group">
                <label>Judul Proyek</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Contoh: Nexus Capital — Investor Pitch Deck PPT"
                  className="studio-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      let label = 'Presentation & Pitch Deck (PPT)';
                      if (cat === 'web') label = 'Website & Digital Experience';
                      if (cat === 'branding') label = 'Graphic Design & Brand Identity';
                      setEditingProject({
                        ...editingProject,
                        category: cat,
                        categoryLabel: label,
                      });
                    }}
                    className="studio-input"
                  >
                    <option value="presentation">Presentation &amp; Pitch Deck (PPT)</option>
                    <option value="web">Website &amp; Digital Experience</option>
                    <option value="branding">Graphic Design &amp; Brand Identity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Badge / Highlight</label>
                  <input
                    type="text"
                    value={editingProject.badge || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                    placeholder="Contoh: Lolos Seed Round • 16:9 HD"
                    className="studio-input"
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div className="form-group">
                <label>URL / Path Gambar Proyek</label>
                <input
                  type="text"
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  placeholder="/assets/images/corporate.jpg"
                  className="studio-input"
                  required
                />
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                    Pilih Cepat dari Gambar Bawaan Studio:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {IMAGE_PRESETS.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, image: preset.url })}
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: editingProject.image === preset.url ? '#0f172a' : '#ffffff',
                          color: editingProject.image === preset.url ? '#ffffff' : '#334155',
                          cursor: 'pointer',
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Tags (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Pitch Deck, Master PPTX, Infografik"
                  className="studio-input"
                />
              </div>

              <div className="form-group">
                <label>Ringkasan Proyek (Overview)</label>
                <textarea
                  rows="2"
                  value={editingProject.overview || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                  className="studio-textarea"
                  placeholder="Gambaran umum singkat tentang proyek ini..."
                />
              </div>

              <div className="form-group">
                <label>Tantangan Klien (Challenge)</label>
                <textarea
                  rows="2"
                  value={editingProject.challenge || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                  className="studio-textarea"
                  placeholder="Masalah atau kebutuhan klien sebelum datang ke Supernova..."
                />
              </div>

              <div className="form-group">
                <label>Solusi Studio (Solution)</label>
                <textarea
                  rows="2"
                  value={editingProject.solution || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  className="studio-textarea"
                  placeholder="Langkah desain atau rekayasa yang kami terapkan..."
                />
              </div>

              <div className="form-group">
                <label>Dampak / Hasil Nyata (Pisahkan tiap poin dengan Enter)</label>
                <textarea
                  rows="3"
                  value={Array.isArray(editingProject.results) ? editingProject.results.join('\n') : editingProject.results}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      results: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="studio-textarea"
                  placeholder="Contoh:&#10;Lolos pendanaan sesuai target&#10;Waktu presentasi 40% lebih efisien&#10;Master file 100% editable"
                />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="studio-btn-secondary" onClick={() => setEditingProject(null)}>
                  Batal
                </button>
                <button type="submit" className="studio-btn-primary">
                  {isNewProject ? 'Tambahkan ke Daftar' : 'Perbarui Proyek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          SERVICE MODAL
          ========================================== */}
      {editingService && (
        <div className="admin-modal-backdrop" onClick={() => setEditingService(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Edit Layanan: {editingService.name}</h3>
              <button className="modal-close-btn" onClick={() => setEditingService(null)}>✕</button>
            </div>

            <form onSubmit={handleSaveServiceModal} className="admin-modal-form">
              <div className="form-group">
                <label>Nama Layanan</label>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="studio-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Badge Kategori</label>
                  <input
                    type="text"
                    value={editingService.badge}
                    onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                    className="studio-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estimasi Turnaround</label>
                  <input
                    type="text"
                    value={editingService.turnaround}
                    onChange={(e) => setEditingService({ ...editingService, turnaround: e.target.value })}
                    className="studio-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Deskripsi Singkat</label>
                <textarea
                  rows="2"
                  value={editingService.desc}
                  onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                  className="studio-textarea"
                />
              </div>

              <div className="form-group">
                <label>Hasil Serah Terima / Deliverables (Satu per baris)</label>
                <textarea
                  rows="4"
                  value={Array.isArray(editingService.deliverables) ? editingService.deliverables.join('\n') : editingService.deliverables}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      deliverables: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="studio-textarea"
                  placeholder="Master File PPTX&#10;PDF Siap Cetak&#10;Infografik Data"
                />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="studio-btn-secondary" onClick={() => setEditingService(null)}>
                  Batal
                </button>
                <button type="submit" className="studio-btn-primary">
                  Perbarui Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          TESTIMONIAL MODAL
          ========================================== */}
      {editingTesti && (
        <div className="admin-modal-backdrop" onClick={() => setEditingTesti(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{isNewTesti ? 'Tambah Testimoni' : 'Edit Testimoni'}</h3>
              <button className="modal-close-btn" onClick={() => setEditingTesti(null)}>✕</button>
            </div>

            <form onSubmit={handleSaveTestiModal} className="admin-modal-form">
              <div className="form-group">
                <label>Nama Klien</label>
                <input
                  type="text"
                  value={editingTesti.name}
                  onChange={(e) => setEditingTesti({ ...editingTesti, name: e.target.value })}
                  placeholder="Contoh: Reza Pratama"
                  className="studio-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Jabatan / Perusahaan</label>
                <input
                  type="text"
                  value={editingTesti.role}
                  onChange={(e) => setEditingTesti({ ...editingTesti, role: e.target.value })}
                  placeholder="Co-Founder, Nexus Fintech"
                  className="studio-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Isi Kutipan Ulasan</label>
                <textarea
                  rows="3"
                  value={editingTesti.quote}
                  onChange={(e) => setEditingTesti({ ...editingTesti, quote: e.target.value })}
                  placeholder="Tulis testimoni positif dari klien..."
                  className="studio-textarea"
                  required
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={Boolean(editingTesti.featured)}
                  onChange={(e) => setEditingTesti({ ...editingTesti, featured: e.target.checked })}
                />
                <label htmlFor="featuredCheck" style={{ margin: 0, textTransform: 'none', fontWeight: 500 }}>
                  Sorot testimoni ini sebagai kartu utama (Featured)
                </label>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="studio-btn-secondary" onClick={() => setEditingTesti(null)}>
                  Batal
                </button>
                <button type="submit" className="studio-btn-primary">
                  {isNewTesti ? 'Tambahkan Testimoni' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          FAQ MODAL
          ========================================== */}
      {editingFaq && (
        <div className="admin-modal-backdrop" onClick={() => setEditingFaq(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{isNewFaq ? 'Tambah Pertanyaan FAQ' : 'Edit Pertanyaan FAQ'}</h3>
              <button className="modal-close-btn" onClick={() => setEditingFaq(null)}>✕</button>
            </div>

            <form onSubmit={handleSaveFaqModal} className="admin-modal-form">
              <div className="form-group">
                <label>Pertanyaan</label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  placeholder="Contoh: Berapa lama waktu pengerjaan?"
                  className="studio-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Jawaban Lengkap</label>
                <textarea
                  rows="4"
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  placeholder="Jelaskan secara transparan dan detail..."
                  className="studio-textarea"
                  required
                />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="studio-btn-secondary" onClick={() => setEditingFaq(null)}>
                  Batal
                </button>
                <button type="submit" className="studio-btn-primary">
                  {isNewFaq ? 'Tambahkan ke FAQ' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
