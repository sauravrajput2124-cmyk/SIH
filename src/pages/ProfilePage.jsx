import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { User, Phone, MapPin, RotateCcw, CheckCircle2, Brain } from 'lucide-react';

export const ProfilePage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [profile, setProfile] = useState(() => storageService.getUserProfile());
  const [savedMsg, setSavedMsg] = useState(false);

  const handleLangChange = (code) => {
    setLanguage(code);
    localStorage.setItem('carelink_language', code);
    const updated = { ...profile, language: code };
    storageService.setUserProfile(updated);
    setProfile(updated);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleResetAsha = () => {
    storageService.resetDemoData();
    const updated = storageService.getUserProfile();
    setProfile(updated);
    setLanguage(updated.language || 'mr');
    localStorage.setItem('carelink_language', updated.language || 'mr');
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.profileTitle}
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Profile & Preferences
          </p>
        </div>

        {savedMsg && (
          <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-200 font-bold text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Profile Preferences Updated!
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-xl space-y-6">
          
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2D9CDB] to-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {profile.fullName ? profile.fullName.charAt(0) : 'A'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{profile.fullName}</h3>
              <p className="text-xs text-slate-500 font-semibold">Rural User Session • Age {profile.age}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 font-semibold block">Mobile Number</span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-4 h-4 text-[#2D9CDB]" />
                {profile.mobile}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 font-semibold block">Village / Location</span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-[#2D9CDB]" />
                {profile.village}
              </span>
            </div>
          </div>

          {/* Language Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              {t.preferredLanguage}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { code: 'mr', name: 'मराठी' },
                { code: 'hi', name: 'हिंदी' },
                { code: 'en', name: 'English' },
              ].map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2D9CDB] text-white border-[#2D9CDB] shadow-md'
                        : 'bg-[#F3FAFF] text-sky-950 border-[#CFE8F7] hover:bg-sky-100'
                    }`}
                  >
                    {lang.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Asha Profile */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleResetAsha}
              className="flex-1 py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Brain className="w-4 h-4 text-[#2D9CDB]" />
              {t.loadAshaDemo}
            </button>

            <button
              onClick={handleResetAsha}
              className="py-3.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              Reset Local Storage
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
