import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import AnimatedButton from '../shared/AnimatedButton';
import { Play, ArrowRight, Heart, Shield, Users, Sparkles, Activity, Phone } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (section: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { t, isHindi } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: Heart,
      title: isHindi ? 'जल्दी पता लगाएं' : 'Early Detection',
      description: isHindi
        ? 'विकासात्मक देरी को जल्दी पहचानें और बच्चों को सही समय पर मदद दें'
        : 'Identify developmental delays early and help children at the right time',
      color: COLORS.primary,
    },
    {
      icon: Shield,
      title: isHindi ? 'सरल और सुरक्षित' : 'Simple & Secure',
      description: isHindi
        ? 'आसान प्रश्न, आवाज सहायता, और पूरी डेटा सुरक्षा'
        : 'Easy questions, voice assistance, and complete data security',
      color: COLORS.accent,
    },
    {
      icon: Users,
      title: isHindi ? 'आंगनवाड़ी के लिए' : 'For Anganwadi Workers',
      description: isHindi
        ? 'ग्रामीण भारत के आंगनवाड़ी कार्यकर्ताओं के लिए विशेष रूप से डिज़ाइन किया गया'
        : 'Specifically designed for Anganwadi workers in rural India',
      color: COLORS.success,
    },
    {
      icon: Phone,
      title: isHindi ? 'ऑफ़लाइन काम करता है' : 'Works Offline',
      description: isHindi
        ? 'इंटरनेट के बिना भी काम करता है, बाद में सिंक होता है'
        : 'Works without internet, syncs when connected',
      color: COLORS.watch,
    },
  ];

  const stats = [
    { value: '15,000+', label: isHindi ? 'बच्चे स्क्रीन हुए' : 'Children Screened' },
    { value: '47', label: isHindi ? 'जिले' : 'Districts' },
    { value: '2,100+', label: isHindi ? 'कार्यकर्ता' : 'Workers' },
    { value: '94%', label: isHindi ? 'सटीकता' : 'Accuracy' },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Mesh */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 20%, rgba(45, 106, 79, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(244, 162, 97, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(255, 246, 234, 0.5) 0%, transparent 70%),
                linear-gradient(135deg, #FFF6EA 0%, #FDFBF7 50%, #E8F5E9 100%)
              `,
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Floating Decorative Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl opacity-30"
              style={{
                width: 300 + i * 50,
                height: 300 + i * 50,
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                background: i % 2 === 0 ? COLORS.primary : COLORS.accent,
              }}
              animate={{
                y: [0, 30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                delay: i * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 mt-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <motion.div
              style={{ y: y1, opacity }}
              className="text-center lg:text-left"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: `${COLORS.primary}15`,
                  border: `1px solid ${COLORS.primary}30`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles size={16} style={{ color: COLORS.primary }} />
                <span className="text-sm font-medium" style={{ color: COLORS.primary }}>
                  {isHindi ? 'AI-संचालित स्क्रीनिंग' : 'AI-Powered Screening'}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span style={{ color: COLORS.textPrimary }}>
                  {isHindi ? 'हर बच्चा.' : 'Har Baccha.'}
                </span>
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {isHindi ? 'सही समय.' : 'Sahi Samay.'}
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl mb-4 max-w-xl mx-auto lg:mx-0"
                style={{ color: COLORS.textSecondary }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {t('heroSubtitle')}
              </motion.p>

              <motion.p
                className="text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ color: COLORS.textSecondary, opacity: 0.8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {t('heroDescription')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('demo')}
                  icon={<ArrowRight size={20} />}
                >
                  {t('explorePlatform')}
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  onClick={() => {}}
                  icon={<Play size={20} />}
                  iconPosition="left"
                >
                  {t('watchDemo')}
                </AnimatedButton>
              </motion.div>
            </motion.div>

            {/* Right - Illustration */}
            <motion.div
              className="relative"
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Main Illustration Container */}
              <div className="relative w-full max-w-lg mx-auto">
                {/* Floating Tablet Illustration */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: `
                      0 20px 60px rgba(45, 106, 79, 0.15),
                      0 10px 30px rgba(0, 0, 0, 0.1)
                    `,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Screen Content Mockup */}
                  <div className="p-6 md:p-8 aspect-[4/3] bg-gradient-to-br from-green-50 to-orange-50">
                    {/* Worker Avatar */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="w-16 h-16 rounded-full overflow-hidden"
                        style={{ border: `3px solid ${COLORS.primary}` }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f9e37d05c26?w=100&h=100&fit=crop&crop=face"
                          alt="Anganwadi Worker"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div>
                        <div className="font-semibold text-gray-800">Savitri Devi</div>
                        <div className="text-sm text-gray-500">Anganwadi Centre 14</div>
                      </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '47', label: 'Screened', color: COLORS.primary },
                        { value: '6', label: 'Flagged', color: COLORS.watch },
                        { value: '4', label: 'Referrals', color: COLORS.danger },
                        { value: '2', label: 'Follow-ups', color: COLORS.success },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          className="p-4 rounded-xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                        >
                          <div
                            className="text-2xl font-bold"
                            style={{ color: stat.color }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating AI Card */}
                <motion.div
                  className="absolute -right-4 md:-right-12 top-1/4 p-4 rounded-2xl shadow-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    maxWidth: 180,
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -5, 0],
                  }}
                  transition={{
                    opacity: { delay: 1, duration: 0.5 },
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                      }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={16} color="white" />
                    </motion.div>
                    <span className="font-semibold text-sm">AI Insight</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {isHindi
                      ? '3 बच्चों की आज स्क्रीनिंग बाकी है'
                      : '3 screenings pending today'}
                  </p>
                </motion.div>

                {/* Floating Status Card */}
                <motion.div
                  className="absolute -left-4 md:-left-12 bottom-1/4 p-4 rounded-2xl shadow-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, 5, 0],
                  }}
                  transition={{
                    opacity: { delay: 1.2, duration: 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{ background: COLORS.success }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {isHindi ? 'सिंक पूरा हुआ' : 'Synced'}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-3 rounded-full"
              style={{ background: COLORS.primary }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-white/50" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
              {isHindi ? 'विशेषताएं' : 'Features'}
            </h2>
            <p className="text-lg" style={{ color: COLORS.textSecondary }}>
              {isHindi
                ? 'भारत के ग्रामीण इलाकों के लिए विशेष रूप से बनाया गया'
                : 'Built specifically for rural India'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}15` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon size={28} style={{ color: feature.color }} />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.textPrimary }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="p-8 md:p-12 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
              boxShadow: '0 20px 60px rgba(45, 106, 79, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: COLORS.textPrimary }}>
            {isHindi ? 'आज ही शुरू करें' : 'Get Started Today'}
          </h2>
          <p className="text-lg mb-8" style={{ color: COLORS.textSecondary }}>
            {isHindi
              ? 'हर बच्चे के विकास को जल्दी पहचानें और उन्हें सही समय पर मदद दें'
              : 'Screen every child early and help them at the right time'}
          </p>
          <AnimatedButton
            variant="accent"
            size="xl"
            onClick={() => onNavigate('dashboard')}
            icon={<ArrowRight size={24} />}
          >
            {isHindi ? 'डैशबोर्ड देखें' : 'View Dashboard'}
          </AnimatedButton>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
