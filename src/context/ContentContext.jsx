import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { PROJECTS_DATA } from '../data/projects';

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
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT);
  const [heroContent, setHeroContent] = useState(DEFAULT_HERO);
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setIsLoading(false);
      return;
    }

    // Subscribe to general content (contact & hero)
    const unsubGeneral = onSnapshot(
      doc(db, 'content', 'general'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.contact) setContactInfo((prev) => ({ ...prev, ...data.contact }));
          if (data.hero) setHeroContent((prev) => ({ ...prev, ...data.hero }));
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
          }
        }
        setIsLoading(false);
      },
      (error) => {
        console.warn('Firestore projects warning:', error);
        setIsLoading(false);
      }
    );

    return () => {
      unsubGeneral();
      unsubProjects();
    };
  }, []);

  const saveGeneralContent = async (newContact, newHero) => {
    if (!db) throw new Error('Database Firebase belum terhubung.');
    await setDoc(
      doc(db, 'content', 'general'),
      {
        contact: newContact,
        hero: newHero,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    setContactInfo(newContact);
    setHeroContent(newHero);
  };

  const saveProjects = async (newProjects) => {
    if (!db) throw new Error('Database Firebase belum terhubung.');
    await setDoc(
      doc(db, 'content', 'projects'),
      {
        items: newProjects,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    setProjects(newProjects);
  };

  return (
    <ContentContext.Provider
      value={{
        contactInfo,
        heroContent,
        projects,
        isLoading,
        saveGeneralContent,
        saveProjects,
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
