import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Brain, CheckCircle, Loader2 } from 'lucide-react';

export const AIAnalysisAnimation = ({ onComplete }) => {
  const { t } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    t.checkingSymptoms,
    t.checkingCycle,
    t.checkingPain,
    t.checkingHistory,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-sky-100 max-w-lg mx-auto text-center my-8">
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 via-blue-600 to-sky-700 animate-spin blur-xs opacity-75" />
        <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Brain className="w-10 h-10 text-sky-600 animate-pulse" />
        </div>
      </div>

      <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-700 to-blue-800 bg-clip-text text-transparent mb-2">
        {t.analyzingTitle}
      </h3>

      <p className="text-xs font-mono text-sky-700 bg-sky-50 px-3 py-1 rounded-full inline-block mb-6 border border-sky-200 font-bold">
        AI HEALTH TRIAGE IN PROGRESS
      </p>

      <div className="space-y-3 text-left max-w-sm mx-auto bg-slate-50 p-5 rounded-2xl border border-slate-200/80 mb-6">
        {steps.map((text, idx) => {
          const isDone = idx < stepIndex;
          const isCurrent = idx === stepIndex;

          return (
            <div key={idx} className="flex items-center gap-3 text-sm font-medium">
              {isDone ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-sky-600 animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
              )}
              <span className={isDone ? 'text-slate-900 font-bold' : isCurrent ? 'text-sky-700 font-bold' : 'text-slate-400'}>
                {text}
              </span>
            </div>
          );
        })}
      </div>

      {stepIndex >= steps.length && (
        <div className="text-emerald-600 font-bold text-base flex items-center justify-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          {t.analysisDone}
        </div>
      )}
    </div>
  );
};
