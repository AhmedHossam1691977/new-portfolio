'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TRANSLATIONS, Language, Theme } from '@/data/translations';

interface AppContextType {
  theme: Theme;
  lang: Language;
  toggleTheme: () => void;
  toggleLang: () => void;
  t: typeof TRANSLATIONS['en'];
  isArabic: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Restore saved theme or default to dark
    const saved = localStorage.getItem('portfolio_theme') as Theme | null;
    const initial = saved === 'light' ? 'light' : 'dark';
    setTheme(initial);
    applyTheme(initial);

    // Language defaults
    setLang('en');
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem('portfolio_theme', next);
  };

  const toggleLang = () => {
    setLang('en');
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  };

  const t = TRANSLATIONS.en;
  const isArabic = false;

  return (
    <AppContext.Provider
      value={{
        theme,
        lang,
        toggleTheme,
        toggleLang,
        t,
        isArabic,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
