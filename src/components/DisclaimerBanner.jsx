import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DisclaimerBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-sky-900 text-sky-100 text-xs py-1.5 px-4 text-center font-semibold flex items-center justify-center gap-2 border-b border-sky-800">
      <ShieldAlert className="w-4 h-4 shrink-0 text-sky-400" />
      <span>
        {t.prototypeDisclaimer}
      </span>
      <span className="hidden sm:inline text-sky-300">
        (AI screening logic is simulated for presentation purposes)
      </span>
    </div>
  );
};
