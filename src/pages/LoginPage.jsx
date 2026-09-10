import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { Phone, Lock, HeartPulse, UserCheck, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const current = storageService.getUserProfile();
    storageService.setUserProfile({
      ...current,
      mobile,
      isLoggedIn: true,
    });
    navigate('/home');
  };

  const handleContinueDemo = () => {
    storageService.resetDemoData();
    navigate('/home');
  };

  return (
    <div className="min-h-screen gradient-hero py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-sky-100 relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <HeartPulse className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">CareLink Healthcare Access</p>
        </div>

        {/* Demo Fast Login Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleContinueDemo}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
          >
            <UserCheck className="w-5 h-5 text-sky-400" />
            {t.continueDemoUser}
          </button>
          <p className="text-[11px] text-slate-400 text-center mt-1.5 font-medium">
            Instant entry for demo presentation
          </p>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase">Or login manually</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 text-xs p-3 rounded-xl mb-4 border border-rose-200 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              {t.mobileNumber}
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              {t.password}
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {t.login}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          <Link to="/register" className="font-bold text-sky-600 hover:underline">
            {t.dontHaveAccount}
          </Link>
        </div>

      </div>
    </div>
  );
};
