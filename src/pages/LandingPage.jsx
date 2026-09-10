import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { HeartPulse, Brain, ChartNoAxesCombined, Mic, ArrowRight, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen gradient-hero flex flex-col justify-between">
      
      {/* Landing Header with Prominent Language Selector */}
      <header className="bg-white/90 backdrop-blur-md border-b border-sky-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md">
              <HeartPulse className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Care<span className="text-sky-600">Link</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link to="/" className="text-sky-600 font-bold">{t.navHome}</Link>
            <a href="#about" className="hover:text-sky-600 transition-colors">{t.navAbout}</a>
            <a href="#services" className="hover:text-sky-600 transition-colors">{t.navServices}</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 hidden sm:inline uppercase tracking-wider">Language:</span>
              <LanguageSelector />
            </div>

            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all"
            >
              {t.login}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-8 shadow-2xs">
          <HeartPulse className="w-4 h-4 text-sky-600" />
          Rural Healthcare Innovation Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-4xl mx-auto leading-tight">
          Care<span className="text-sky-600">Link</span> — "{t.tagline}"
        </h1>

        <p className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 max-w-2xl mx-auto">
          {t.menstrualHeaderTagline}
        </p>

        <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
          {t.subTagline}
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg shadow-lg shadow-sky-200 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {t.getStarted}
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-sky-200 shadow-md hover:bg-sky-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {t.login}
          </Link>
        </div>

        {/* Privacy Callout */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-sky-100 shadow-2xs text-xs font-semibold text-slate-600 mb-16">
          <Lock className="w-4 h-4 text-sky-600" />
          {t.privacyNotice}
        </div>

        {/* Supporting Section */}
        <div id="about" className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            {t.whyChooseUsTitle}
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Empowering rural women with privacy, dignity, voice-enabled symptom intake, and intelligent early risk triage right from their mobile phones.
          </p>
        </div>

        {/* 3 Core Feature Cards */}
        <div id="services" className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          
          {/* Feature 1 */}
          <div className="glass-card p-8 rounded-3xl shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6 ring-8 ring-sky-50 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {t.feature1Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t.feature1Desc}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-8 rounded-3xl shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6 ring-8 ring-sky-50 group-hover:scale-110 transition-transform">
              <ChartNoAxesCombined className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {t.feature2Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t.feature2Desc}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-8 rounded-3xl shadow-lg border border-sky-100 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6 ring-8 ring-sky-50 group-hover:scale-110 transition-transform">
              <Mic className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {t.feature3Title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t.feature3Desc}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
