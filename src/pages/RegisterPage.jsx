import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { User, Phone, MapPin, HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react';

export const RegisterPage = () => {
  const { t, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('21');
  const [mobile, setMobile] = useState('');
  const [village, setVillage] = useState('');
  const [prefLang, setPrefLang] = useState('mr');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName || !mobile || mobile.length < 10) {
      setError('Please fill in all required fields with a valid mobile number.');
      return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newProfile = {
      fullName,
      age: Number(age) || 21,
      mobile,
      village: village || 'Satara, Maharashtra',
      language: prefLang,
      isLoggedIn: true,
    };
    storageService.setUserProfile(newProfile);
    setLanguage(prefLang);
    localStorage.setItem('carelink_language', prefLang);

    setSuccess(true);
    setTimeout(() => {
      navigate('/home');
    }, 1200);
  };

  return (
    <div className="min-h-screen gradient-hero py-12 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 shadow-2xl border border-sky-100">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md">
            <HeartPulse className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">{t.registerTitle}</h2>
          <p className="text-xs text-slate-500 font-semibold">CareLink Healthcare Account Setup</p>
        </div>

        {success && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl mb-6 border border-emerald-200 text-center flex items-center justify-center gap-2 font-bold animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            {t.accountCreatedSuccess}
          </div>
        )}

        {error && (
          <div className="bg-rose-50 text-rose-700 text-xs p-3 rounded-xl mb-4 border border-rose-200 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Full Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.fullName} *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Asha Patil"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.age}</label>
              <input
                type="number"
                min="10"
                max="60"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile & Village */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.mobileNumber} *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.villageCity}</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="Satara, MH"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.preferredLanguage}</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: 'mr', label: 'मराठी' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'en', label: 'English' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setPrefLang(lang.code)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    prefLang === lang.code
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.confirmPassword}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {t.createAccount}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          <Link to="/login" className="font-bold text-sky-600 hover:underline">
            {t.alreadyAccount}
          </Link>
        </div>

      </div>
    </div>
  );
};
