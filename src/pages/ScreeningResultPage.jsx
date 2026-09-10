import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { ResultCard } from '../components/ResultCard';
import { RotateCcw, CalendarDays, BookOpen, ArrowLeft, Brain } from 'lucide-react';

export const ScreeningResultPage = () => {
  const { t } = useLanguage();

  const lastResult = storageService.getLastScreening();

  if (!lastResult) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-sky-100 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">No Screening Result Found</h2>
          <p className="text-xs text-slate-500 font-medium">Please complete the AI screening questionnaire first.</p>
          <Link
            to="/screening"
            className="inline-block px-6 py-3 rounded-xl bg-sky-600 text-white font-bold text-sm shadow-md hover:bg-sky-700"
          >
            Start Screening Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            to="/screening"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-sky-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Questionnaire
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-2 shadow-2xs">
            <Brain className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            AI-Assisted Health Analysis Report
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            CareLink Early Risk Assessment
          </p>
        </div>

        {/* Result Card Component */}
        <ResultCard result={lastResult} />

        {/* Secondary Action Grid */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <Link
            to="/screening"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-sky-300 hover:shadow-md transition-all text-center flex flex-col items-center gap-2"
          >
            <RotateCcw className="w-5 h-5 text-slate-600" />
            <span className="text-xs font-bold text-slate-700">Retake Screening</span>
          </Link>

          <Link
            to="/tracking"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-sky-300 hover:shadow-md transition-all text-center flex flex-col items-center gap-2"
          >
            <CalendarDays className="w-5 h-5 text-sky-600" />
            <span className="text-xs font-bold text-slate-700">Log Period Cycle</span>
          </Link>

          <Link
            to="/guidance"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-sky-300 hover:shadow-md transition-all text-center flex flex-col items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">Self-Care Guide</span>
          </Link>

        </div>

      </div>
    </div>
  );
};
