import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../data/demo-data';

type LanguageCode = 'hi' | 'en' | 'bn' | 'mr' | 'ta' | 'te';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isHindi: boolean;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('hi');

  const t = (key: string): string => {
    const langTranslations = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langTranslations[key] || TRANSLATIONS.en[key] || key;
  };

  const isHindi = language === 'hi';

  useEffect(() => {
    // Save language preference
    localStorage.setItem('balsaathai-language', language);
  }, [language]);

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('balsaathai-language') as LanguageCode;
    if (savedLang && Object.keys(TRANSLATIONS).includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHindi, languages: LANGUAGES }}>
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

// App State Context
interface AppState {
  isLoading: boolean;
  isOffline: boolean;
  syncPending: number;
  showSplash: boolean;
  currentSection: string;
}

interface AppContextType {
  state: AppState;
  setLoading: (loading: boolean) => void;
  setOffline: (offline: boolean) => void;
  setSyncPending: (count: number) => void;
  setShowSplash: (show: boolean) => void;
  setCurrentSection: (section: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    isOffline: false,
    syncPending: 2,
    showSplash: true,
    currentSection: 'landing',
  });

  const setLoading = (loading: boolean) => setState(prev => ({ ...prev, isLoading: loading }));
  const setOffline = (offline: boolean) => setState(prev => ({ ...prev, isOffline: offline }));
  const setSyncPending = (count: number) => setState(prev => ({ ...prev, syncPending: count }));
  const setShowSplash = (show: boolean) => setState(prev => ({ ...prev, showSplash: show }));
  const setCurrentSection = (section: string) => setState(prev => ({ ...prev, currentSection: section }));

  return (
    <AppContext.Provider value={{ state, setLoading, setOffline, setSyncPending, setShowSplash, setCurrentSection }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};
