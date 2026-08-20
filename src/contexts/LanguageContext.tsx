import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  languages: { code: Language; label: string; flag: string; nativeLabel: string }[];
}

const availableLanguages: { code: Language; label: string; flag: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', nativeLabel: 'English' },
  { code: 'fr', label: 'French', flag: '🇫🇷', nativeLabel: 'Français' },
  { code: 'rw', label: 'Kinyarwanda', flag: '🇷🇼', nativeLabel: 'Ikinyarwanda' },
  { code: 'sw', label: 'Kiswahili', flag: '🇹🇿', nativeLabel: 'Kiswahili' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mcr_language');
    if (saved === 'en' || saved === 'fr' || saved === 'rw' || saved === 'sw') {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mcr_language', lang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language] || translations.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const defaultDict = translations.en;
    if (defaultDict && defaultDict[key]) {
      return defaultDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
