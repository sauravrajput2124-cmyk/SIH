import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Stethoscope, X, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComingSoonModal = ({ isOpen, onClose, featureName }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sky-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 mx-auto ring-8 ring-sky-50">
          <Stethoscope className="w-8 h-8" />
        </div>

        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            {t.comingSoonTitle}
          </span>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {featureName || t.cardGeneralHealth}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {t.comingSoonMsg}
          </p>

          <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 text-left mb-6">
            <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-sky-600" />
              Core Functional Modules
            </h4>
            <p className="text-xs text-sky-800 leading-snug">
              The primary functional prototype currently available is <strong>Menstrual Healthcare (AI Screening & Period Insights)</strong>.
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 cursor-pointer"
            >
              {t.comingSoonClose}
            </button>

            <Link
              to="/screening"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-md flex items-center gap-1.5"
            >
              <Brain className="w-4 h-4" />
              Try AI Screening
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
