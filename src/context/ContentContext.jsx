import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { PROJECTS_DATA } from '../data/projects';
import { FAQ_DATA } from '../data/faq';

const STORAGE_KEY_GENERAL = 'supernova_cms_general';
const STORAGE_KEY_PROJECTS = 'supernova_cms_projects';
const STORAGE_KEY_SERVICES = 'supernova_cms_services';
const STORAGE_KEY_TESTIMONIALS = 'supernova_cms_testimonials';
const STORAGE_KEY_FAQ = 'supernova_cms_faq';

const DEFAULT_CONTACT = {
  phone: '+62 857-1452-1584',
  waNumber: '6285714521584',
  email: 'chasupernova.studio@gmail.com',
  location: 'Jakarta Selatan, DKI Jakarta',
  hours: 'Senin – Sabtu (09:00 – 18:00 WIB)',
};

const DEFAULT_HERO = {
  badge: 'Studio Desain & Digital Independen',
  title: 'Desain Presentasi,\nIdentitas Brand & Web Modern.',
  desc: 'Membantu founder dan korporasi tampil berwibawa melalui slide pitch deck investor, identitas visual berkarakter, dan website berkinerja tinggi.',
  stat1: '80+ Proyek Selesai',
  stat2: '3–5 Hari Turnaround',
  stat3: '100% Hak Milik',
};

const DEFAULT_CTA = {
  tag: "LET'S TALK",
  title: 'Punya ide proyek atau kebutuhan mendesak?',
  desc: 'Diskusikan langsung dengan tim kami untuk mendapatkan estimasi transparan dan arahan konsep terbaik tanpa perantara.',
  btnText: 'Mulai Diskusi Proyek',
};

const DEFAULT_SERVICES = [
  {
    id: 'presentation',
    badge: 'PRESENTATION',
    name: 'Pitch Deck & PPT',
    desc: 'Slide investor & proposal tender dengan narasi terstruktur dan tampilan 16:9 HD.',
    turnaround: '3 – 5 Hari Kerja',
    deliverables: [
      'Master File PPTX 100% Editable',
      'Storytelling & Infografik Data',
      'PDF Siap Presentasi & Cetak',
    ],
    btnLabel: 'Konsultasi PPT',
  },
  {
    id: 'branding',
    badge: 'VISUAL SYSTEM',
    name: 'Brand Identity',
    desc: 'Identitas visual berwibawa: logo, warna, dan tipografi yang konsisten di semua media.',
    turnaround: '4 – 7 Hari Kerja',
    deliverables: [
      'Logo Utama & Monogram Vektor',
      'Brand Guidelines & Tipografi',
      'Template Medsos (Canva / PSD)',
    ],
    btnLabel: 'Konsultasi Brand',
  },
  {
    id: 'website',
    badge: 'DIGITAL CRAFT',
    name: 'Web & Digital',
    desc: 'Website modern berkinerja tinggi, memuat instan di ponsel tanpa kode berlebih.',
    turnaround: '7 – 14 Hari Kerja',
    deliverables: [
      'Landing Page / Company Profile',
      'Kecepatan Buka < 0.5s di HP',
      'Domain & Server Siap Pakai',
    ],
    btnLabel: 'Konsultasi Web',
  },
  {
    id: 'allinone',
    badge: 'ALL-IN-ONE',
    name: 'Studio Partnership',
    desc: 'Solusi terintegrasi lengkap: Web, Pitch Deck, dan Brand Kit untuk transformasi menyeluruh.',
    turnaround: 'Jadwal Prioritas',
    deliverables: [
      'Paket Lengkap Web + PPT + Brand',
      'Konsistensi Visual di Semua Media',
      'Komunikasi Langsung Desainer',
    ],
    btnLabel: 'Konsultasi Terpadu',
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 'testi-1',
    name: 'Reza Pratama',
    role: 'Co-Founder, Nexus Fintech',
    quote: 'Supernova merestrukturisasi narasi pitch deck kami dari awal. Alur ceritanya to-the-point dan kami sukses mengamankan seed funding sesuai target.',
    avatar: 'R',
    featured: false,
  },
  {
    id: 'testi-2',
    name: 'Hendrawan Kusuma',
    role: 'Managing Director, Holding Bisnis',
    quote: 'Website dan company profile resmi kami sangat prestisius. Mitra korporat dan panitia tender B2B langsung menaruh rasa percaya tinggi.',
    avatar: 'H',
    featured: true,
  },
  {
    id: 'testi-3',
    name: 'Diana Stephanie',
    role: 'Brand Lead, Amarta Luxe Bali',
    quote: 'Standar estetika visual mereka sangat tinggi. Master file yang diserahkan rapi, dan template Canva-nya mudah dipakai tim kami.',
    avatar: 'D',
    featured: false,
  },
];

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  // 1. Contact Info
  const [contactInfo, setContactInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GENERAL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.contact) return { ...DEFAULT_CONTACT, ...parsed.contact };
      }
    } catch (e) {
      console.warn(e);
    }
    return DEFAULT_CONTACT;
  });

  // 2. Hero Content
  const [heroContent, setHeroContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GENERAL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.hero) return { ...DEFAULT_HERO, ...parsed.hero };
      }
    } catch (e) {
      console.warn(e);
    }
    return DEFAULT_HERO;
  });

  // 3. CTA Content
  const [ctaContent, setCtaContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GENERAL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cta) return { ...DEFAULT_CTA, ...parsed.cta };
      }
    } catch (e) {
      console.warn(e);
    }
    return DEFAULT_CTA;
  });

  // 4. Projects Catalog
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return PROJECTS_DATA;
  });

  // 5. Services / Capabilities
  const [servicesList, setServicesList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SERVICES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return DEFAULT_SERVICES;
  });

  // 6. Testimonials
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TESTIMONIALS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return DEFAULT_TESTIMONIALS;
  });

  // 7. FAQ List
  const [faqList, setFaqList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAQ);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return FAQ_DATA;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Sync with Firestore if configured
  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    const unsubGeneral = onSnapshot(doc(db, 'content', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.contact) setContactInfo((prev) => ({ ...prev, ...data.contact }));
        if (data.hero) setHeroContent((prev) => ({ ...prev, ...data.hero }));
        if (data.cta) setCtaContent((prev) => ({ ...prev, ...data.cta }));
        setIsCloudSynced(true);
      }
    });

    const unsubProjects = onSnapshot(doc(db, 'content', 'projects'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setProjects(data.items);
          setIsCloudSynced(true);
        }
      }
    });

    const unsubServices = onSnapshot(doc(db, 'content', 'services'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setServicesList(data.items);
          setIsCloudSynced(true);
        }
      }
    });

    const unsubTesti = onSnapshot(doc(db, 'content', 'testimonials'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setTestimonials(data.items);
          setIsCloudSynced(true);
        }
      }
    });

    const unsubFaq = onSnapshot(doc(db, 'content', 'faq'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setFaqList(data.items);
          setIsCloudSynced(true);
        }
      }
    });

    return () => {
      unsubGeneral();
      unsubProjects();
      unsubServices();
      unsubTesti();
      unsubFaq();
    };
  }, []);

  // Save General (Contact, Hero, CTA)
  const saveGeneralContent = async (newContact, newHero, newCta) => {
    const finalContact = newContact || contactInfo;
    const finalHero = newHero || heroContent;
    const finalCta = newCta || ctaContent;

    try {
      localStorage.setItem(
        STORAGE_KEY_GENERAL,
        JSON.stringify({
          contact: finalContact,
          hero: finalHero,
          cta: finalCta,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn(e);
    }

    setContactInfo(finalContact);
    setHeroContent(finalHero);
    setCtaContent(finalCta);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(
          doc(db, 'content', 'general'),
          {
            contact: finalContact,
            hero: finalHero,
            cta: finalCta,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        setIsCloudSynced(true);
      } catch (err) {
        console.warn('Could not sync to Firestore:', err);
      }
    }
  };

  // Save Projects
  const saveProjects = async (newProjects) => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(newProjects));
    } catch (e) {
      console.warn(e);
    }
    setProjects(newProjects);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'content', 'projects'), { items: newProjects, updatedAt: new Date().toISOString() }, { merge: true });
        setIsCloudSynced(true);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Save Services
  const saveServices = async (newServices) => {
    try {
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(newServices));
    } catch (e) {
      console.warn(e);
    }
    setServicesList(newServices);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'content', 'services'), { items: newServices, updatedAt: new Date().toISOString() }, { merge: true });
        setIsCloudSynced(true);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Save Testimonials
  const saveTestimonials = async (newTestimonials) => {
    try {
      localStorage.setItem(STORAGE_KEY_TESTIMONIALS, JSON.stringify(newTestimonials));
    } catch (e) {
      console.warn(e);
    }
    setTestimonials(newTestimonials);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'content', 'testimonials'), { items: newTestimonials, updatedAt: new Date().toISOString() }, { merge: true });
        setIsCloudSynced(true);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Save FAQ
  const saveFaq = async (newFaq) => {
    try {
      localStorage.setItem(STORAGE_KEY_FAQ, JSON.stringify(newFaq));
    } catch (e) {
      console.warn(e);
    }
    setFaqList(newFaq);

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'content', 'faq'), { items: newFaq, updatedAt: new Date().toISOString() }, { merge: true });
        setIsCloudSynced(true);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Reset to original defaults
  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_GENERAL);
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
      localStorage.removeItem(STORAGE_KEY_SERVICES);
      localStorage.removeItem(STORAGE_KEY_TESTIMONIALS);
      localStorage.removeItem(STORAGE_KEY_FAQ);
    } catch (e) {
      console.warn(e);
    }
    setContactInfo(DEFAULT_CONTACT);
    setHeroContent(DEFAULT_HERO);
    setCtaContent(DEFAULT_CTA);
    setProjects(PROJECTS_DATA);
    setServicesList(DEFAULT_SERVICES);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setFaqList(FAQ_DATA);
  };

  return (
    <ContentContext.Provider
      value={{
        contactInfo,
        heroContent,
        ctaContent,
        projects,
        servicesList,
        testimonials,
        faqList,
        isLoading,
        isCloudSynced,
        isFirebaseConfigured,
        saveGeneralContent,
        saveProjects,
        saveServices,
        saveTestimonials,
        saveFaq,
        resetToDefaults,
        defaultContact: DEFAULT_CONTACT,
        defaultHero: DEFAULT_HERO,
        defaultCta: DEFAULT_CTA,
        defaultProjects: PROJECTS_DATA,
        defaultServices: DEFAULT_SERVICES,
        defaultTestimonials: DEFAULT_TESTIMONIALS,
        defaultFaq: FAQ_DATA,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a ContentProvider');
  }
  return context;
}
