import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const ProgressBar = ({ currentStep, totalSteps }) => {
  const { t } = useLanguage();
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-800 text-sm font-bold">
          {t.step} {currentStep} {t.of} {totalSteps}
        </span>
        <span className="bg-sky-100 text-sky-900 px-3 py-1 rounded-full font-mono text-xs font-bold">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-sky-100/60 h-3 rounded-full overflow-hidden p-0.5 border border-sky-100">
        <div
          className="bg-sky-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
