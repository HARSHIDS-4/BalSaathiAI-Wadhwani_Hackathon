import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { LANGUAGES } from '../../data/demo-data';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanguageSelector(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as 'hi' | 'en' | 'bn' | 'mr' | 'ta' | 'te');
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FFF6EA 0%, #FDFBF7 50%, #E8F5E9 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particle effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: i % 2 === 0 ? COLORS.primary : COLORS.accent,
              opacity: 0.3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Logo and Tagline */}
      <AnimatePresence>
        {!showLanguageSelector && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Logo Circle */}
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Ring */}
              <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                initial={{ rotate: -90 }}
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={COLORS.accent}
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke={COLORS.primary}
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
                />
              </motion.svg>

              {/* Child Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <svg viewBox="0 0 64 64" className="w-16 h-16 md:w-20 md:h-20">
                  {/* Hand */}
                  <motion.path
                    d="M10 40 L10 55 C10 60, 15 62, 25 62 L40 62"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  />
                  {/* Child */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <circle cx="32" cy="20" r="8" fill={COLORS.accent} />
                    <path d="M20 30 Q32 35, 44 30 L40 50 L24 50 Z" fill={COLORS.primary} />
                    <circle cx="29" cy="18" r="1" fill={COLORS.textPrimary} />
                    <circle cx="35" cy="18" r="1" fill={COLORS.textPrimary} />
                    <path d="M28 23 Q32 26, 36 23" stroke={COLORS.textPrimary} strokeWidth="1" fill="none" />
                  </motion.g>
                </svg>
              </motion.div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${COLORS.primary}20 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* App Name */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <h1
                className="text-3xl md:text-5xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                }}
              >
                BalSaathiAI
              </h1>
              <motion.p
                className="mt-2 text-sm md:text-base text-gray-600"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Har Baccha, Sahi Samay
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Selector */}
      <AnimatePresence>
        {showLanguageSelector && (
          <motion.div
            className="w-full max-w-2xl px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-xl md:text-2xl text-center mb-8 text-gray-700"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Select Your Language / अपनी भाषा चुनें
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {LANGUAGES.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  className="relative p-6 md:p-8 rounded-2xl overflow-hidden group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                  }}
                  onClick={() => handleLanguageSelect(lang.code)}
                  initial={{ opacity: 0, y: 30, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Flip effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{ backdropFilter: 'blur(10px)' }}
                  />

                  <div className="text-4xl mb-3">{lang.flag}</div>
                  <div className="text-lg font-semibold text-gray-800">{lang.name}</div>
                  <div
                    className="text-sm mt-1"
                    style={{
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      color: COLORS.textSecondary,
                    }}
                  >
                    {lang.nativeName}
                  </div>

                  {/* Selection indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SplashScreen;
