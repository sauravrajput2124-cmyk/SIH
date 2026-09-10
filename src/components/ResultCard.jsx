import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, AlertTriangle, AlertOctagon, ArrowRight, HeartPulse, Hospital } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResultCard = ({ result }) => {
  const { t } = useLanguage();

  if (!result) return null;

  const category = result.category;

  const getTheme = () => {
    switch (category) {
      case 'HIGH':
        return {
          icon: AlertOctagon,
          title: t.highConcernTitle,
          text: t.highConcernText,
          guidance: t.highConcernGuidance,
          bgHeader: 'bg-rose-700 text-white',
          border: 'border-rose-300',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
          buttonPrimary: 'bg-rose-700 hover:bg-rose-800 text-white shadow-rose-200',
          bulletColor: 'text-rose-600',
        };
      case 'MODERATE':
        return {
          icon: AlertTriangle,
          title: t.modConcernTitle,
          text: t.modConcernText,
          guidance: t.modConcernGuidance,
          bgHeader: 'bg-amber-600 text-white',
          border: 'border-amber-300',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          buttonPrimary: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200',
          bulletColor: 'text-amber-600',
        };
      case 'LOW':
      default:
        return {
          icon: ShieldCheck,
          title: t.lowConcernTitle,
          text: t.lowConcernText,
          guidance: t.lowConcernGuidance,
          bgHeader: 'bg-emerald-700 text-white',
          border: 'border-emerald-300',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          buttonPrimary: 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-200',
          bulletColor: 'text-emerald-600',
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-2xl border-2 ${theme.border} max-w-2xl mx-auto my-6 animate-in fade-in zoom-in-95 duration-300`}>
      
      {/* Banner Header */}
      <div className={`p-6 sm:p-8 ${theme.bgHeader} flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90 block mb-0.5">
              AI-Assisted Health Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {theme.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Main Recommendation Text */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed mb-2">
            {theme.text}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-semibold">
            {theme.guidance}
          </p>
        </div>

        {/* Identified Factors */}
        {result.factors && result.factors.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-sky-600" />
              Observed Symptom Indicators ({result.factors.length})
            </h4>
            <div className="space-y-2">
              {result.factors.map((factor, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700 bg-sky-50/50 px-3.5 py-2.5 rounded-xl border border-sky-100/60">
                  <span className={`${theme.bulletColor} font-bold text-base`}>•</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/guidance"
            className={`flex-1 px-5 py-3.5 rounded-xl font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2 ${theme.buttonPrimary}`}
          >
            {t.viewGuidance}
            <ArrowRight className="w-4 h-4" />
          </Link>

          {category !== 'LOW' && (
            <button
              onClick={() => alert("Connecting to nearest ASHA Worker / Primary Health Center helpline (108 / 181)...")}
              className="flex-1 px-5 py-3.5 rounded-xl font-bold text-center text-sm bg-slate-900 text-white hover:bg-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Hospital className="w-4 h-4 text-sky-400" />
              {t.findSupport}
            </button>
          )}
        </div>

        {/* Mandatory Safety Disclaimer */}
        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-center">
          <p className="text-xs text-slate-700 font-medium">
            {t.safetyDisclaimer}
          </p>
        </div>

      </div>
    </div>
  );
};
