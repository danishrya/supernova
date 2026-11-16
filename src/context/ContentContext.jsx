import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { PROJECTS_DATA } from '../data/projects';

const STORAGE_KEY_GENERAL = 'supernova_cms_general';
const STORAGE_KEY_PROJECTS = 'supernova_cms_projects';

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

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  // Initialize state from localStorage if available, or fall back to defaults
  const [contactInfo, setContactInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GENERAL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.contact) return { ...DEFAULT_CONTACT, ...parsed.contact };
      }
    } catch (e) {
      console.warn('Failed to parse saved contact from localStorage:', e);
    }
    return DEFAULT_CONTACT;
  });

  const [heroContent, setHeroContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GENERAL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.hero) return { ...DEFAULT_HERO, ...parsed.hero };
      }
    } catch (e) {
      console.warn('Failed to parse saved hero from localStorage:', e);
    }
    return DEFAULT_HERO;
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved projects from localStorage:', e);
    }
    return PROJECTS_DATA;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // If Firebase is configured, sync with Firestore in real-time
  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      return;
    }

    // Subscribe to general content (contact & hero)
    const unsubGeneral = onSnapshot(
      doc(db, 'content', 'general'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.contact) {
            setContactInfo((prev) => ({ ...prev, ...data.contact }));
          }
          if (data.hero) {
            setHeroContent((prev) => ({ ...prev, ...data.hero }));
          }
          setIsCloudSynced(true);
        }
      },
      (error) => {
        console.warn('Firestore general content warning:', error);
      }
    );

    // Subscribe to projects content
    const unsubProjects = onSnapshot(
      doc(db, 'content', 'projects'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (Array.isArray(data.items) && data.items.length > 0) {
            setProjects(data.items);
            setIsCloudSynced(true);
          }
        }
      },
      (error) => {
        console.warn('Firestore projects warning:', error);
      }
    );

    return () => {
      unsubGeneral();
      unsubProjects();
    };
  }, []);

  // Save General (Contact + Hero)
  const saveGeneralContent = async (newContact, newHero) => {
    // 1. Always save to localStorage immediately for instant live updates
    try {
      localStorage.setItem(
        STORAGE_KEY_GENERAL,
        JSON.stringify({
          contact: newContact,
          hero: newHero,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }

    setContactInfo(newContact);
    setHeroContent(newHero);

    // 2. If Firestore is active, push to cloud
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(
          doc(db, 'content', 'general'),
          {
            contact: newContact,
            hero: newHero,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        setIsCloudSynced(true);
      } catch (err) {
        console.warn('Could not sync general content to Firestore:', err);
      }
    }
  };

  // Save Projects
  const saveProjects = async (newProjects) => {
    // 1. Always save to localStorage immediately
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(newProjects));
    } catch (e) {
      console.warn('Error saving projects to localStorage:', e);
    }

    setProjects(newProjects);

    // 2. If Firestore is active, push to cloud
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(
          doc(db, 'content', 'projects'),
          {
            items: newProjects,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        setIsCloudSynced(true);
      } catch (err) {
        console.warn('Could not sync projects to Firestore:', err);
      }
    }
  };

  // Reset to original defaults
  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_GENERAL);
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
    } catch (e) {
      console.warn(e);
    }
    setContactInfo(DEFAULT_CONTACT);
    setHeroContent(DEFAULT_HERO);
    setProjects(PROJECTS_DATA);
  };

  return (
    <ContentContext.Provider
      value={{
        contactInfo,
        heroContent,
        projects,
        isLoading,
        isCloudSynced,
        isFirebaseConfigured,
        saveGeneralContent,
        saveProjects,
        resetToDefaults,
        defaultContact: DEFAULT_CONTACT,
        defaultHero: DEFAULT_HERO,
        defaultProjects: PROJECTS_DATA,
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
