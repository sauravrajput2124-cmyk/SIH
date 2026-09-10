import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { ComingSoonModal } from './components/ComingSoonModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomeDashboard } from './pages/HomeDashboard';
import { MenstrualDashboard } from './pages/MenstrualDashboard';
import { ScreeningPage } from './pages/ScreeningPage';
import { ScreeningResultPage } from './pages/ScreeningResultPage';
import { PeriodTrackingPage } from './pages/PeriodTrackingPage';
import { InsightsPage } from './pages/InsightsPage';
import { ProfilePage } from './pages/ProfilePage';
import { GuidancePage } from './pages/GuidancePage';
import { FirstPeriodEducationPage } from './pages/FirstPeriodEducationPage';

const AppLayout = () => {
  const location = useLocation();
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');

  const isAuthOrLanding = ['/', '/login', '/register'].includes(location.pathname);

  const handleOpenComingSoon = (featureName = 'General Rural Healthcare') => {
    setComingSoonFeature(featureName);
    setComingSoonModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans selection:bg-sky-100 selection:text-sky-900">
      <div>
        <DisclaimerBanner />
        {!isAuthOrLanding && <Header onOpenComingSoon={() => handleOpenComingSoon()} />}

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/menstrual" element={<MenstrualDashboard />} />
            <Route path="/first-period" element={<FirstPeriodEducationPage />} />
            <Route path="/screening" element={<ScreeningPage />} />
            <Route path="/result" element={<ScreeningResultPage />} />
            <Route path="/tracking" element={<PeriodTrackingPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/guidance" element={<GuidancePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <Footer />

      <ComingSoonModal
        isOpen={comingSoonModalOpen}
        onClose={() => setComingSoonModalOpen(false)}
        featureName={comingSoonFeature}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppLayout />
      </Router>
    </LanguageProvider>
  );
}
