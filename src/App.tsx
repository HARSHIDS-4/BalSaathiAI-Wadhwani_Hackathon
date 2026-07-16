import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, AppProvider, useAppState, useLanguage } from './contexts/AppContext';
import ParticleBackground from './components/shared/ParticleBackground';
import SplashScreen from './components/splash/SplashScreen';
import Navigation from './components/navigation/Navigation';
import LandingPage from './components/landing/LandingPage';
import WorkerDashboard from './components/dashboard/WorkerDashboard';
import ScreeningFlow from './components/screening/ScreeningFlow';
import ReferralSystem from './components/referral/ReferralSystem';
import FollowUpTracker from './components/followup/FollowUpTracker';
import SupervisorAnalytics from './components/analytics/SupervisorAnalytics';
import TrainingModules from './components/training/TrainingModules';
import ImpactSection from './components/impact/ImpactSection';
import Footer from './components/footer/Footer';
import { COLORS } from './constants/design-system';

const MainApp: React.FC = () => {
  const { state, setShowSplash, setCurrentSection } = useAppState();
  const { t, isHindi } = useLanguage();

  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const [screeningResult, setScreeningResult] = useState<any>(null);

  useEffect(() => {
    // Hide splash after language selection
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (section: string) => {
    setCurrentScreen(section);
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleScreeningComplete = (result: any) => {
    setScreeningResult(result);
    if (result.status === 'refer') {
      setCurrentScreen('referral');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'demo':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <WorkerDashboard onNavigate={handleNavigate} />;
      case 'screening':
        return (
          <ScreeningFlow
            onComplete={handleScreeningComplete}
            onBack={() => handleNavigate('dashboard')}
          />
        );
      case 'referral':
        return (
          <ReferralSystem
            onComplete={() => handleNavigate('dashboard')}
            onBack={() => handleNavigate('screening')}
          />
        );
      case 'followups':
        return <FollowUpTracker onBack={() => handleNavigate('dashboard')} />;
      case 'analytics':
        return <SupervisorAnalytics />;
      case 'training':
        return (
          <div className="min-h-screen py-24 px-4 md:px-8">
            <TrainingModules />
          </div>
        );
      case 'impact':
        return (
          <div className="min-h-screen py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <ImpactSection />
            </div>
          </div>
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(135deg, #FFF6EA 0%, #FDFBF7 50%, #E8F5E9 100%)`,
        fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
      }}
    >
      {/* Background */}
      <ParticleBackground />

      {/* Splash Screen */}
      <AnimatePresence>
        {state.showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {!state.showSplash && (
        <>
          {/* Navigation */}
          <Navigation
            currentSection={currentScreen}
            onNavigate={handleNavigate}
          />

          {/* Main Screen */}
          <AnimatePresence mode="wait">
            <motion.div key={currentScreen}>
              {renderScreen()}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          {currentScreen === 'landing' && (
            <>
              <ImpactSection />
              <Footer />
            </>
          )}

          {/* Impact Section for other screens */}
          {currentScreen !== 'landing' && currentScreen !== 'screening' && currentScreen !== 'referral' && (
            <ImpactSection />
          )}
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
