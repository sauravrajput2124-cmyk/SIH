import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { ComingSoonModal } from '../components/ComingSoonModal';
import { 
  Brain, 
  CalendarDays, 
  ChartNoAxesCombined, 
  HeartPulse, 
  Stethoscope, 
  Pill, 
  Hospital, 
  UserRound,
  ArrowRight,
  MapPin,
  PlayCircle
} from 'lucide-react';

export const HomeDashboard = () => {
  const { t } = useLanguage();
  const user = storageService.getUserProfile();

  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const openComingSoon = (featureTitle) => {
    setSelectedFeature(featureTitle);
    setComingSoonModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Welcome Header - Ice Sky Blue Theme */}
        <div className="bg-gradient-to-r from-[#EAF7FF] via-[#D7F0FC] to-[#E0F2FE] rounded-3xl p-6 sm:p-8 text-slate-900 border border-[#B8E1F5] shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/80 text-sky-900 border border-[#B8E1F5] px-3 py-1 rounded-full backdrop-blur-xs">
              CareLink Rural Healthcare Platform
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {t.welcomeUser}, {user.fullName || 'Asha'}
            </h1>
            <p className="text-slate-600 text-sm font-semibold max-w-xl flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              {user.village ? `Village: ${user.village}` : 'Rural Health Access Center'}
            </p>
          </div>

          <div className="relative z-10 flex gap-3">
            <Link
              to="/screening"
              className="px-5 py-3 rounded-2xl bg-white text-sky-700 font-bold text-sm border border-[#B8E1F5] shadow-md hover:bg-sky-50 transition-all flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-sky-600" />
              {t.cardScreeningTitle}
            </Link>
          </div>
        </div>

        {/* SECTION 1: MENSTRUAL HEALTH CORE */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-6 h-6 text-sky-600" />
                {t.menstrualSectionTitle}
              </h2>
              <p className="text-sm text-slate-500 font-medium">{t.menstrualSectionDesc}</p>
            </div>
            <span className="text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full border border-sky-200">
              CORE FUNCTIONAL MODULES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: AI Screening */}
            <Link
              to="/screening"
              className="bg-gradient-to-br from-white via-sky-50/40 to-sky-100/50 p-6 rounded-3xl border-2 border-sky-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {t.cardScreeningTitle}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed font-medium">
                  {t.cardScreeningDesc}
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-sky-600 group-hover:gap-2 transition-all">
                <span>Start Screening</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Card 2: Period Tracking */}
            <Link
              to="/tracking"
              className="bg-gradient-to-br from-white via-sky-50/40 to-sky-100/50 p-6 rounded-3xl border-2 border-sky-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {t.cardTrackingTitle}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed font-medium">
                  {t.cardTrackingDesc}
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-sky-600 group-hover:gap-2 transition-all">
                <span>Open Period Log</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Card 3: Health Insights */}
            <Link
              to="/insights"
              className="bg-gradient-to-br from-white via-sky-50/40 to-sky-100/50 p-6 rounded-3xl border-2 border-sky-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  <ChartNoAxesCombined className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {t.cardInsightsTitle}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed font-medium">
                  {t.cardInsightsDesc}
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-sky-600 group-hover:gap-2 transition-all">
                <span>View Analytics</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Card 4: My First Period – Menstrual Education */}
            <Link
              to="/first-period"
              className="bg-gradient-to-br from-white via-sky-50/40 to-sky-100/50 p-6 rounded-3xl border-2 border-sky-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {t.eduCardTitle || "My First Period – Menstrual Education"}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed font-medium">
                  {t.eduCardDesc || "Learn about menstruation, what to expect during your first period, and basic menstrual hygiene."}
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-sky-600 group-hover:gap-2 transition-all">
                <span>{t.watchAndLearn || "Watch & Learn"}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

          </div>
        </div>

        {/* SECTION 2: GENERAL RURAL HEALTHCARE PLATFORM */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-slate-600" />
                {t.generalSectionTitle}
              </h2>
              <p className="text-sm text-slate-500 font-medium">{t.generalSectionDesc}</p>
            </div>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-bold">
              FUTURE EXTENSION
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* General Health */}
            <button
              onClick={() => openComingSoon(t.cardGeneralHealth)}
              className="bg-white p-6 rounded-3xl border border-slate-200 text-left hover:border-sky-300 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3 group-hover:bg-sky-100 group-hover:text-sky-600">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">{t.cardGeneralHealth}</h4>
              <p className="text-xs text-slate-500 leading-snug font-medium">Primary care triage & wellness modules.</p>
              <span className="inline-block mt-3 text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Coming Soon
              </span>
            </button>

            {/* Medicines */}
            <button
              onClick={() => openComingSoon(t.cardMedicines)}
              className="bg-white p-6 rounded-3xl border border-slate-200 text-left hover:border-sky-300 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3 group-hover:bg-sky-100 group-hover:text-sky-600">
                <Pill className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">{t.cardMedicines}</h4>
              <p className="text-xs text-slate-500 leading-snug font-medium">Essential rural pharmacy inventory check.</p>
              <span className="inline-block mt-3 text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Coming Soon
              </span>
            </button>

            {/* Healthcare Facilities */}
            <button
              onClick={() => openComingSoon(t.cardHealthcareServices)}
              className="bg-white p-6 rounded-3xl border border-slate-200 text-left hover:border-sky-300 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3 group-hover:bg-sky-100 group-hover:text-sky-600">
                <Hospital className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">{t.cardHealthcareServices}</h4>
              <p className="text-xs text-slate-500 leading-snug font-medium">Nearest PHC & Sub-center directory.</p>
              <span className="inline-block mt-3 text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Coming Soon
              </span>
            </button>

            {/* Doctor Consultation */}
            <button
              onClick={() => openComingSoon(t.cardDoctorConsultation)}
              className="bg-white p-6 rounded-3xl border border-slate-200 text-left hover:border-slate-300 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-3 group-hover:bg-sky-100 group-hover:text-sky-600">
                <UserRound className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">{t.cardDoctorConsultation}</h4>
              <p className="text-xs text-slate-500 leading-snug font-medium">Tele-consultation with ASHA & Doctors.</p>
              <span className="inline-block mt-3 text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Coming Soon
              </span>
            </button>

          </div>
        </div>

      </div>

      <ComingSoonModal
        isOpen={comingSoonModalOpen}
        onClose={() => setComingSoonModalOpen(false)}
        featureName={selectedFeature}
      />
    </div>
  );
};
