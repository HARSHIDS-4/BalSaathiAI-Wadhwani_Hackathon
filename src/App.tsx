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
import { DEMO_CHILDREN, REFERRAL_CENTRES, IMPACT_STATS } from './data/demo-data';
import { COLORS } from './constants/design-system';

const FALLBACK_CHILD_AVATAR = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f2d6b3" />
        <stop offset="100%" stop-color="#c79f7d" />
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="24" fill="url(#g)" />
    <circle cx="60" cy="48" r="22" fill="rgba(255,255,255,0.88)" />
    <path d="M30 105c7-20 21-30 30-30s23 10 30 30" fill="rgba(255,255,255,0.88)" />
  </svg>
`)}`;

const getChildStatusLabel = (status: string, isHindi: boolean) => {
  const labels: Record<string, { hi: string; en: string }> = {
    refer: { hi: 'अभी रेफर करें', en: 'Refer Now' },
    'on-track': { hi: 'सही राह पर', en: 'On Track' },
    watch: { hi: 'निगरानी', en: 'Watch' },
    'not-screened': { hi: 'स्क्रीन नहीं हुआ', en: 'Not Screened' },
  };

  const item = labels[status] || { hi: status, en: status };
  return isHindi ? item.hi : item.en;
};

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
      case 'children':
        return (
          <div className="min-h-screen py-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'मेरे बच्चे' : 'My Children'}
              </h1>
              <p className="text-gray-600 mb-8">
                {isHindi ? 'सभी बच्चों की स्थिति और अगला कदम देखें' : 'View all children, their status, and next steps'}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {DEMO_CHILDREN.map((child) => (
                  <div key={child.id} className="p-5 rounded-2xl bg-white/90" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <div className="flex items-center gap-4">
                      <img
                        src={child.photo}
                        alt={child.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                        onError={(event) => {
                          const target = event.currentTarget;
                          if (target.dataset.fallbackApplied === 'true') return;
                          target.dataset.fallbackApplied = 'true';
                          target.src = FALLBACK_CHILD_AVATAR;
                        }}
                      />
                      <div>
                        <h3 className="font-semibold text-lg" style={{ color: COLORS.textPrimary }}>
                          {isHindi ? child.nameHindi : child.name}
                        </h3>
                        <p className="text-sm text-gray-500">{isHindi ? child.motherNameHindi : child.motherName}</p>
                        <p className="text-sm text-gray-600 mt-1">{getChildStatusLabel(child.status, isHindi)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="min-h-screen py-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'गांव की रिपोर्ट' : 'Village Report'}
              </h1>
              <p className="text-gray-600 mb-8">
                {isHindi ? 'गांव स्तर पर स्क्रीनिंग और रेफरल का सारांश' : 'Village-level screening and referral summary'}
              </p>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: isHindi ? 'स्क्रीन किए गए' : 'Screened', value: IMPACT_STATS.childrenScreened },
                  { label: isHindi ? 'फ्लैग किए गए' : 'Flagged', value: IMPACT_STATS.childrenFlagged },
                  { label: isHindi ? 'रेफरल' : 'Referrals', value: IMPACT_STATS.referralsGenerated },
                  { label: isHindi ? 'फॉलो-अप' : 'Follow-ups', value: IMPACT_STATS.followUpsCompleted },
                ].map((item) => (
                  <div key={item.label} className="p-5 rounded-2xl bg-white/90" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="text-3xl font-bold mt-2" style={{ color: COLORS.primary }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/90" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
                    {isHindi ? 'रेफरल केंद्र' : 'Referral Centres'}
                  </h2>
                  <div className="space-y-4">
                    {REFERRAL_CENTRES.map((centre) => (
                      <div key={centre.id} className="p-4 rounded-xl" style={{ background: 'rgba(255, 246, 234, 0.6)' }}>
                        <div className="font-semibold" style={{ color: COLORS.textPrimary }}>
                          {isHindi ? centre.nameHindi : centre.name}
                        </div>
                        <div className="text-sm text-gray-600">{isHindi ? centre.landmarkHindi : centre.landmark}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/90" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
                    {isHindi ? 'मुख्य संकेत' : 'Key Highlights'}
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    <li>{isHindi ? '• इस सप्ताह 6 बच्चों को आगे की देखभाल के लिए भेजा गया।' : '• 6 children were referred for further care this week.'}</li>
                    <li>{isHindi ? '• सभी फॉलो-अप अगले 7 दिनों में ट्रैक किए जा रहे हैं।' : '• All follow-ups are being tracked over the next 7 days.'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
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
