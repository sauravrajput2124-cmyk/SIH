import React, { createContext, useContext, useState, useEffect } from 'react';
import { mr } from '../translations/mr';
import { hi } from '../translations/hi';
import { en } from '../translations/en';

const LanguageContext = createContext();

const translationsMap = { mr, hi, en };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('arogya_language') || 'mr';
  });

  useEffect(() => {
    localStorage.setItem('arogya_language', language);
  }, [language]);

  const t = translationsMap[language] || mr;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
