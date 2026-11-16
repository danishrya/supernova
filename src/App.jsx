import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProjectModal from './components/ProjectModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { ContentProvider } from './context/ContentContext';

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
    } else if (lower.includes('bundling') || lower.includes('universal') || lower.includes('terpadu') || lower.includes('all-in-one')) {
      type = 'Bundling Universal Terpadu (All-in-One)';
    }

    setContactType(type);
    setContactBrief(
      `Saya berminat untuk mengambil layanan "${packageName}". Mohon penjelasan jadwal pengerjaan dan penawaran kustom langkah selanjutnya.`
    );
  };

  const handleConsultProject = (projectTitle) => {
    setSelectedProject(null);
    setContactBrief(
      `Halo Supernova, saya tertarik membuat karya dengan standar visual & kualitas serupa proyek: "${projectTitle}". Mohon informasi estimasi & ketersediaannya.`
    );
    navigate('/contact');
  };

  return (
    <div className="supernova-app">
      <ScrollToTop />

      {/* Header Navigation - Hidden on /admin */}
      {!isAdminRoute && <Navbar />}

      {/* Multi-Page Routes */}
      <main className={isAdminRoute ? 'admin-content-flow' : 'main-content-flow'}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenProjectModal={setSelectedProject}
                onSelectPackage={(pkg) => {
                  handleSelectPackage(pkg);
                  navigate('/contact');
                }}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/catalog"
            element={<CatalogPage onOpenProjectModal={setSelectedProject} />}
          />
          <Route
            path="/services"
            element={<ServicesPage onSelectPackage={handleSelectPackage} />}
          />
          <Route
            path="/contact"
            element={
              <ContactPage
                initialBrief={contactBrief}
                initialType={contactType}
              />
            }
          />
          <Route path="/admin" element={<AdminPage />} />
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
    <BrowserRouter>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </BrowserRouter>
  );
}
