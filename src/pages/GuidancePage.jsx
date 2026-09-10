import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { guidanceData } from '../data/guidanceData';
import { BookOpen, CheckCircle, PhoneCall } from 'lucide-react';

export const GuidancePage = () => {
  const { language } = useLanguage();
  const data = guidanceData[language] || guidanceData.mr;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {data.title}
          </h1>
          <p className="text-base text-slate-600 font-semibold mt-1">
            {data.subtitle}
          </p>
        </div>

        {/* Categories List */}
        <div className="space-y-6">
          {data.categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-md hover:shadow-lg transition-all"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 text-sky-700">
                {cat.title}
              </h3>

              <div className="space-y-2.5">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 bg-sky-50/40 p-3.5 rounded-2xl border border-sky-100/50">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rural Emergency Callout */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
              <PhoneCall className="w-5 h-5 text-sky-400" />
              Rural Medical Helplines (24/7)
            </h4>
            <p className="text-xs text-sky-200 font-medium">
              Free emergency medical ambulance & healthcare guidance numbers.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="tel:108"
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md"
            >
              Ambulance: 108
            </a>
            <a
              href="tel:181"
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-md"
            >
              Helpline: 181
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
