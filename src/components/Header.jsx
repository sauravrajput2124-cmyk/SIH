import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { 
  HeartPulse, 
  Menu, 
  X, 
  Brain, 
  CalendarDays, 
  ChartNoAxesCombined, 
  Stethoscope, 
  User, 
  BookOpen,
  Home
} from 'lucide-react';

export const Header = ({ onOpenComingSoon }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/home', label: t.navHome, icon: Home },
    { path: '/menstrual', label: t.navMenstrualHealth, icon: HeartPulse, highlight: true },
    { path: '/screening', label: t.navAiScreening, icon: Brain },
    { path: '/tracking', label: t.navPeriodTracking, icon: CalendarDays },
    { path: '/insights', label: t.navMyInsights, icon: ChartNoAxesCombined },
    { path: '/guidance', label: t.navGuidance, icon: BookOpen },
    { path: '/profile', label: t.navProfile, icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* CareLink Logo */}
          <Link to="/home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                Care<span className="text-sky-600">Link</span>
              </span>
              <span className="block text-[10px] text-sky-700 font-bold uppercase tracking-wider">
                Healthcare Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-sky-50 text-sky-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}

            {/* General Healthcare Disabled / Coming Soon */}
            <button
              onClick={onOpenComingSoon}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-slate-400" />
              {t.navGeneralHealthcare}
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                Soon
              </span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold ${
                  active
                    ? 'bg-sky-50 text-sky-700 font-bold'
                    : 'text-slate-700 hover:bg-sky-50/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenComingSoon();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-500 hover:bg-slate-50"
          >
            <Stethoscope className="w-5 h-5 text-slate-400" />
            {t.navGeneralHealthcare}
            <span className="ml-auto text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
              Coming Soon
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
