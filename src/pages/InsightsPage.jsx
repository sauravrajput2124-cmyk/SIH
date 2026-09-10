import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { InsightsCharts } from '../components/InsightsCharts';
import { Brain, ChartNoAxesCombined, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InsightsPage = () => {
  const { t } = useLanguage();
  const logs = storageService.getPeriodLogs();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ChartNoAxesCombined className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.insightsHeader}
          </h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Automated cycle trend analytics and non-diagnostic pattern observations
          </p>
        </div>

        {/* AI Observations Box */}
        <div className="bg-gradient-to-br from-white via-sky-50/50 to-sky-100/40 p-6 sm:p-8 rounded-3xl border-2 border-sky-200 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-sky-900 font-bold text-base uppercase tracking-wider">
            <Brain className="w-5 h-5 text-sky-600" />
            AI Pattern Summary
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="p-3.5 bg-white rounded-2xl border border-sky-100 flex items-start gap-2 shadow-2xs">
              <span className="text-sky-600 font-extrabold">1.</span>
              <span>{t.insight1}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-sky-100 flex items-start gap-2 shadow-2xs">
              <span className="text-sky-600 font-extrabold">2.</span>
              <span>{t.insight2}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-sky-100 flex items-start gap-2 shadow-2xs">
              <span className="text-sky-600 font-extrabold">3.</span>
              <span>{t.insight3}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-sky-100 flex items-start gap-2 shadow-2xs">
              <span className="text-sky-600 font-extrabold">4.</span>
              <span>{t.insight4}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-sky-100">
            <span className="flex items-center gap-1 text-sky-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Non-diagnostic pattern tracking
            </span>
            <Link to="/screening" className="font-bold text-sky-600 hover:underline">
              Run Full AI Screening →
            </Link>
          </div>
        </div>

        {/* Visual Charts */}
        <InsightsCharts logs={logs} />

      </div>
    </div>
  );
};
