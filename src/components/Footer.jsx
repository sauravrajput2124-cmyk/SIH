import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HeartPulse, ShieldCheck, Lock } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">CareLink</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {t.subTagline}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              {t.privacyNotice}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-sky-400">✓</span> {t.feature1Title}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-400">✓</span> {t.feature2Title}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-400">✓</span> {t.feature3Title}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Simulated AI Health Triage
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="flex items-start gap-2 mb-2 text-sky-400">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <h5 className="font-semibold text-sm text-white">Prototype Safety Notice</h5>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-2">
              {t.prototypeDisclaimer}
            </p>
            <p className="text-slate-400 text-[11px] leading-tight italic">
              "CareLink provides early triage & health insights without replacing professional medical advice."
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            © 2026 CareLink Healthcare Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>मराठी</span> • <span>हिंदी</span> • <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
