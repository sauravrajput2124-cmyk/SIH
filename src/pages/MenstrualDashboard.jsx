import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { HeartPulse, Brain, CalendarDays, ChartNoAxesCombined, ArrowRight, ShieldCheck, CheckCircle2, PlayCircle } from 'lucide-react';

export const MenstrualDashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <HeartPulse className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            {t.navMenstrualHealth}
          </h1>
          <p className="text-base text-slate-600 font-medium">
            {t.menstrualHeaderTagline}
          </p>
        </div>

        {/* 3 Functional Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* MODULE 1 */}
          <div className="bg-gradient-to-br from-white via-sky-50/60 to-sky-100/50 p-6 rounded-3xl border-2 border-sky-200 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-sky-600 select-none">
              01
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                    {t.module1Label || "MODULE 1"}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    {t.cardScreeningTitle}
                  </h2>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                {t.cardScreeningDesc}
              </p>

              <ul className="space-y-2 mb-8 text-[11px] font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  {t.screeningBullet1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  {t.screeningBullet2}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  {t.screeningBullet3}
                </li>
              </ul>
            </div>

            <Link
              to="/screening"
              className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs text-center shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {t.startScreeningBtn || "Start AI Screening"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* MODULE 2 */}
          <div className="bg-gradient-to-br from-white via-sky-50/60 to-blue-100/50 p-6 rounded-3xl border-2 border-sky-200 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-blue-600 select-none">
              02
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {t.module2Label || "MODULE 2"}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    {t.cardTrackingTitle}
                  </h2>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                {t.cardTrackingDesc}
              </p>

              <ul className="space-y-2 mb-8 text-[11px] font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  {t.trackingBullet1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  {t.trackingBullet2}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  {t.trackingBullet3}
                </li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Link
                to="/tracking"
                className="flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                {t.logPeriodBtn || "Period Log"}
              </Link>
              <Link
                to="/insights"
                className="flex-1 py-3.5 rounded-2xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ChartNoAxesCombined className="w-3.5 h-3.5" />
                {t.navMyInsights || "Insights"}
              </Link>
            </div>
          </div>

          {/* MODULE 3: MY FIRST PERIOD - MENSTRUAL EDUCATION */}
          <div className="bg-gradient-to-br from-white via-sky-50/60 to-sky-100/50 p-6 rounded-3xl border-2 border-sky-200 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-sky-700 select-none">
              03
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                    {t.module3Label || "MODULE 3"}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    {t.eduCardTitle}
                  </h2>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                {t.eduCardDesc}
              </p>

              <ul className="space-y-2 mb-8 text-[11px] font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0" />
                  {t.eduBullet1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0" />
                  {t.eduBullet2}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0" />
                  {t.eduBullet3}
                </li>
              </ul>
            </div>

            <Link
              to="/first-period"
              className="w-full py-3.5 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs text-center shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              {t.watchAndLearn}
            </Link>
          </div>

        </div>

        {/* Privacy Note Callout */}
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-2xs flex items-center gap-4 max-w-2xl mx-auto text-xs text-slate-600 font-medium">
          <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0" />
          <p>
            {t.privacyNotice}
          </p>
        </div>

      </div>
    </div>
  );
};
