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
    setTheme('dark');
    setLang('en');
    localStorage.removeItem('portfolio_theme');
    localStorage.removeItem('portfolio_lang');

    // Apply classes and attributes
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  }, []);

  const toggleTheme = () => {
    setTheme('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
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
