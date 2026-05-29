import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isHindi } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'landing', label: t('home') },
    { id: 'demo', label: t('demo') },
    { id: 'dashboard', label: t('dashboard') },
    { id: 'training', label: t('training') },
    { id: 'impact', label: t('impact') },
  ];

  const languages = [
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'English' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 rounded-full"
          style={{
            background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          whileHover={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('landing')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20 Q12 16, 18 20" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="font-bold text-lg hidden md:block" style={{ color: COLORS.primary }}>
              BalSaathiAI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors relative"
                style={{
                  color: currentSection === item.id ? COLORS.primary : COLORS.textSecondary,
                }}
                onClick={() => onNavigate(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {currentSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: COLORS.primary }}
                    layoutId="navIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-2 ml-2 md:ml-4">
            <motion.button
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: language === 'hi' ? COLORS.primaryLight : 'transparent',
                color: language === 'hi' ? 'white' : COLORS.textSecondary,
              }}
              onClick={() => setLanguage('hi')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              हिंदी
            </motion.button>
            <motion.button
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: language === 'en' ? COLORS.primaryLight : 'transparent',
                color: language === 'en' ? 'white' : COLORS.textSecondary,
              }}
              onClick={() => setLanguage('en')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EN
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-full"
            style={{ background: 'rgba(0,0,0,0.05)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              className="absolute top-20 left-4 right-4 rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="p-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className="w-full px-4 py-3 text-left rounded-xl font-medium transition-colors"
                    style={{
                      background: currentSection === item.id ? `${COLORS.primaryLight}20` : 'transparent',
                      color: currentSection === item.id ? COLORS.primary : COLORS.textPrimary,
                    }}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
