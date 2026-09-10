import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageSelector = ({ variant = 'default' }) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'mr', name: 'मराठी' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'en', name: 'English' },
  ];

  const handleSelect = (code) => {
    setLanguage(code);
    localStorage.setItem('carelink_language', code);
  };

  return (
    <div className="flex items-center gap-1 bg-white border border-sky-200 rounded-xl p-1 shadow-2xs">
      <Languages className="w-4 h-4 text-sky-600 ml-2 mr-1 hidden sm:inline" />
      {languages.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-sky-700 hover:bg-sky-50'
            }`}
          >
            {lang.name}
          </button>
        );
      })}
    </div>
  );
};
