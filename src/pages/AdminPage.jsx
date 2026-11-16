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
} from '../components/Icons';

export default function AdminPage() {
  const {
    contactInfo,
    heroContent,
    projects,
    saveGeneralContent,
    saveProjects,
    defaultContact,
    defaultHero,
    defaultProjects,
  } = useSiteContent();

  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState('contact'); // 'contact', 'hero', 'projects'

  // Editable drafts
  const [draftContact, setDraftContact] = useState(contactInfo);
  const [draftHero, setDraftHero] = useState(heroContent);
  const [draftProjects, setDraftProjects] = useState(projects);

  // Saving indicator & toast
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Project modal state (editing or adding)
  const [editingProject, setEditingProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);

  useEffect(() => {
    if (!auth) {
      setAuthChecking(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  // Update local drafts when context data changes
  useEffect(() => {
    setDraftContact(contactInfo);
  }, [contactInfo]);

  useEffect(() => {
    setDraftHero(heroContent);
  }, [heroContent]);

  useEffect(() => {
    setDraftProjects(projects);
  }, [projects]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      if (!auth) {
        throw new Error('Firebase Auth belum terhubung. Periksa konfigurasi di .env.local');
      }
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      showToast('success', 'Selamat datang! Berhasil masuk ke CMS Supernova.');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setLoginError('Email atau password salah. Pastikan sudah didaftarkan di Firebase Console.');
      } else if (err.code === 'auth/user-not-found') {
        setLoginError('Akun belum terdaftar. Daftarkan email di tab Authentication Firebase.');
      } else {
        setLoginError(err.message || 'Gagal masuk. Periksa koneksi internet Anda.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      showToast('info', 'Anda telah keluar dari CMS.');
    }
  };

  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveGeneralContent(draftContact, draftHero);
      showToast('success', 'Konten kontak & teks berhasil disimpan ke Firebase!');
    } catch (err) {
      console.error(err);
      showToast('error', `Gagal menyimpan: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProjectModal = (e) => {
    e.preventDefault();
    if (!editingProject.title.trim()) {
      alert('Judul proyek wajib diisi.');
      return;
    }

    let updatedList;
    if (isNewProject) {
      const newId = editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      updatedList = [{ ...editingProject, id: newId }, ...draftProjects];
    } else {
      updatedList = draftProjects.map((p) =>
        p.id === editingProject.id ? editingProject : p
      );
    }

    setDraftProjects(updatedList);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Yakin ingin menghapus karya ini dari portofolio?')) {
      const filtered = draftProjects.filter((p) => p.id !== id);
      setDraftProjects(filtered);
    }
  };

  const handleSaveAllProjectsToFirebase = async () => {
    setIsSaving(true);
    try {
      await saveProjects(draftProjects);
      showToast('success', 'Seluruh data portofolio berhasil disimpan ke website!');
    } catch (err) {
      console.error(err);
      showToast('error', `Gagal menyimpan portofolio: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (authChecking) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner"></div>
        <p>Memeriksa autentikasi CMS...</p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-logo-coin">
              <img
                src="/assets/images/supernova-logo.jpg"
                alt="Supernova Emblem"
              />
            </div>
            <h2>SUPERNOVA CMS</h2>
            <p>Pusat Pengelolaan Konten &amp; Portofolio Studio</p>
          </div>

          {!isFirebaseConfigured && (
            <div className="admin-alert warning">
              ⚠️ Konfigurasi Firebase belum terpasang di file <code>.env.local</code>. Pastikan API key sudah dimasukkan.
            </div>
          )}

          {loginError && (
            <div className="admin-alert error">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label>Email Administrator</label>
              <input
                type="email"
                placeholder="admin@supernova.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="studio-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="studio-input"
              />
            </div>

            <button
              type="submit"
              className="studio-btn-primary"
              disabled={isLoggingIn}
              style={{ marginTop: '8px' }}
            >
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

  // DASHBOARD SCREEN
  return (
    <div className="admin-dashboard-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          <IconCheck size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-coin-small">
            <img src="/assets/images/supernova-logo.jpg" alt="Logo" />
          </div>
          <span className="admin-brand-name">
            SUPERNOVA <strong>CMS STUDIO</strong>
          </span>
          <span className="admin-user-pill">{user.email}</span>
        </div>

        <div className="admin-topbar-right">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="btn-outline-admin">
            Buka Website Publik ↗
          </Link>
          <button onClick={handleLogout} className="btn-logout-admin">
            Keluar (Logout)
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="admin-main-container">
        {/* Navigation Tabs */}
        <div className="admin-tabs-row">
          <button
            className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            📞 Kontak &amp; WhatsApp
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            ✏️ Teks Beranda (Hero)
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            📁 Katalog Portofolio ({draftProjects.length})
          </button>
        </div>

        {/* TAB 1: KONTAK & WHATSAPP */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSaveGeneral} className="admin-panel-card">
            <div className="panel-header">
              <h3>Kontak &amp; Komunikasi Studio</h3>
              <p>Perubahan di sini langsung mengubah tombol WhatsApp, Email, dan teks kontak di seluruh halaman website.</p>
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
                <label>Nomor WhatsApp Link API (Hanya angka tanpa simbol, misal: 6285714521584)</label>
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

        {/* TAB 2: TEKS BERANDA */}
        {activeTab === 'hero' && (
          <form onSubmit={handleSaveGeneral} className="admin-panel-card">
            <div className="panel-header">
              <h3>Teks Beranda (Hero Section)</h3>
              <p>Sesuaikan pesan pembuka, judul headline, dan metrik kepercayaan yang dilihat klien pertama kali.</p>
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
                  placeholder="Desain Presentasi, Identitas Brand & Web Modern."
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Deskripsi Subtitle</label>
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
                  placeholder="80+ Proyek Selesai"
                />
              </div>

              <div className="form-group">
                <label>Statistik 2</label>
                <input
                  type="text"
                  value={draftHero.stat2}
                  onChange={(e) => setDraftHero({ ...draftHero, stat2: e.target.value })}
                  className="studio-input"
                  placeholder="3–5 Hari Turnaround"
                />
              </div>

              <div className="form-group">
                <label>Statistik 3</label>
                <input
                  type="text"
                  value={draftHero.stat3}
                  onChange={(e) => setDraftHero({ ...draftHero, stat3: e.target.value })}
                  className="studio-input"
                  placeholder="100% Hak Milik"
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

        {/* TAB 3: PORTOFOLIO / WORKS */}
        {activeTab === 'projects' && (
          <div className="admin-panel-card">
            <div className="panel-header-with-action">
              <div>
                <h3>Kelola Portofolio &amp; Karya Studio</h3>
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
                      tags: ['PowerPoint', 'Pitch Deck'],
                      overview: '',
                      challenge: '',
                      solution: '',
                      results: ['Hasil karya siap pakai'],
                    });
                  }}
                >
                  + Tambah Proyek Baru
                </button>
                <button
                  type="button"
                  className="studio-btn-primary"
                  onClick={handleSaveAllProjectsToFirebase}
                  disabled={isSaving}
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Semua Proyek ke Website'}
                </button>
              </div>
            </div>

            <div className="admin-projects-grid">
              {draftProjects.map((p, index) => (
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
                        setEditingProject({ ...p });
                      }}
                    >
                      Edit
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
      </div>

      {/* PROJECT EDIT / ADD MODAL */}
      {editingProject && (
        <div className="modal-backdrop" onClick={() => setEditingProject(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{isNewProject ? 'Tambah Proyek Baru' : 'Edit Proyek'}</h3>
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
                  <label>Kategori Layanan</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      let label = 'Presentation & Pitch Deck (PPT)';
                      if (cat === 'web') label = 'Web Development & Landing Page';
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
                    <option value="web">Web Development &amp; Landing Page</option>
                    <option value="branding">Graphic Design &amp; Brand Identity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Badge / Highlight</label>
                  <input
                    type="text"
                    value={editingProject.badge || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                    placeholder="Contoh: Format PPTX • 16:9 HD"
                    className="studio-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>URL Gambar (Path lokal seperti /assets/images/... atau URL online)</label>
                <input
                  type="text"
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  placeholder="/assets/images/corporate.jpg"
                  className="studio-input"
                  required
                />
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
                  placeholder="Pitch Deck, Keynote, Infografik"
                  className="studio-input"
                />
              </div>

              <div className="form-group">
                <label>Ringkasan Proyek (Overview)</label>
                <textarea
                  rows="3"
                  value={editingProject.overview || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                  className="studio-textarea"
                  placeholder="Jelaskan secara singkat mengenai karya ini..."
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
    </div>
  );
}
