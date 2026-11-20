import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProjectModal from './components/ProjectModal';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import SmartWhatsAppButton from './components/SmartWhatsAppButton';
import CommandPalette from './components/CommandPalette';
import InteractionLayer from './components/InteractionLayer';

// Multi-Page Routes
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PPTServiceDetailPage from './pages/PPTServiceDetailPage';
import WebServiceDetailPage from './pages/WebServiceDetailPage';
import DigitalProductsPage from './pages/DigitalProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

import { ContentProvider } from './context/ContentContext';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactBrief, setContactBrief] = useState('');
  const [contactType, setContactType] = useState('Desain Presentasi & Pitch Deck (PPT)');

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleSelectPackage = (packageName) => {
    let type = 'Desain Presentasi & Pitch Deck (PPT)';
    const lower = packageName.toLowerCase();

    if (lower.includes('presentasi') || lower.includes('ppt') || lower.includes('deck')) {
      type = 'Desain Presentasi & Pitch Deck (PPT)';
    } else if (lower.includes('web') || lower.includes('website')) {
      type = 'Pembuatan Website Profesional';
    } else if (lower.includes('grafis') || lower.includes('brand') || lower.includes('logo')) {
      type = 'Desain Grafis & Brand Identity';
    } else if (lower.includes('bundling') || lower.includes('all-in-one')) {
      type = 'Bundling Terpadu (All-in-One)';
    }

    setContactType(type);
    setContactBrief(
      `Halo Min Cham, kami berminat dengan layanan "${packageName}". Mohon info jadwal pengerjaan dan penawaran langkah berikutnya.`
    );
  };

  const handleConsultProject = (projectTitle) => {
    setSelectedProject(null);
    setContactBrief(
      `Halo Min Cham, kami tertarik untuk membuat karya dengan kualitas serupa proyek: "${projectTitle}". Mohon informasi estimasi biaya dan jadwalnya.`
    );
    navigate('/kontak');
  };

  return (
    <div className="supernova-app">
      <ScrollToTop />
      <InteractionLayer />

      {/* Global Interactive Elements (Hidden on Admin) */}
      {!isAdminRoute && (
        <>
          <Preloader />
          <CustomCursor />
          <SmartWhatsAppButton />
          <CommandPalette />
          <Navbar />
        </>
      )}

      {/* Multi-Page Routes */}
      <main className={isAdminRoute ? 'admin-content-flow' : 'main-content-flow'}>
        <Routes>
          {/* 1. Beranda */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenProjectModal={setSelectedProject}
                onSelectPackage={(pkg) => {
                  handleSelectPackage(pkg);
                  navigate('/kontak');
                }}
              />
            }
          />

          {/* 2. Layanan & Detail Layanan */}
          <Route
            path="/layanan"
            element={<ServicesPage onSelectPackage={handleSelectPackage} />}
          />
          <Route path="/layanan/desain-ppt" element={<PPTServiceDetailPage />} />
          <Route path="/layanan/website" element={<WebServiceDetailPage />} />

          {/* 3. Portofolio dihapus — semua link lama diarahkan ke "Contoh karya" di Beranda */}
          <Route path="/portofolio" element={<Navigate to={{ pathname: '/', hash: '#portofolio' }} replace />} />
          <Route path="/portofolio/*" element={<Navigate to={{ pathname: '/', hash: '#portofolio' }} replace />} />
          <Route path="/catalog" element={<Navigate to={{ pathname: '/', hash: '#portofolio' }} replace />} />
          />

          {/* 4. Produk Digital & Detail Produk */}
          <Route path="/produk-digital" element={<DigitalProductsPage />} />
          <Route path="/produk-digital/:slug" element={<ProductDetailPage />} />

          {/* 5. Harga & Estimasi */}
          <Route path="/harga" element={<PricingPage />} />

          {/* 6. Tentang Studio & Min Cham */}
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/about" element={<Navigate to="/tentang" replace />} />

          {/* 7. Kontak & FAQ */}
          <Route
            path="/kontak"
            element={
              <ContactPage
                initialBrief={contactBrief}
                initialType={contactType}
              />
            }
          />
          <Route path="/contact" element={<Navigate to="/kontak" replace />} />

          {/* 8. Panel Admin CMS */}
          <Route path="/admin" element={<AdminPage />} />

          {/* 9. 404 Halaman Tidak Ditemukan */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer - Hidden on /admin */}
      {!isAdminRoute && <Footer />}

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsultProject={handleConsultProject}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ContentProvider>
          <AppContent />
        </ContentProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
