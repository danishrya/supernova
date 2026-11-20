import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Dark by default. Only an explicit toggle is remembered (new key: the old one
  // was written on every visit, so it can't tell a real choice from the old default).
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('supernova_theme_choice');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      /* storage blocked: fall through to the default */
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('supernova_theme_choice', next);
      } catch {
        /* not persisted; still switches for this visit */
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: 'light',
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return ctx;
}
