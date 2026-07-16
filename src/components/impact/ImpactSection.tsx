import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { Users, Heart, TrendingUp, MapPin, Award, Sparkles } from 'lucide-react';

const ImpactSection: React.FC = () => {
  const { isHindi } = useLanguage();

  const problemStats = [
    {
      value: '13.7M',
      label: isHindi ? 'भारत में विकासात्मक अक्षमताओं वाले बच्चे' : 'Children with developmental disabilities in India',
      color: '#E63946',
      subtext: null,
    },
    {
      value: '0-3 Yrs',
      label: isHindi ? 'महत्वपूर्ण हस्तक्षेप विंडो' : 'Critical intervention window',
      color: '#FFB703',
      subtext: isHindi ? 'औसत निदान उम्र 5-6 साल' : 'Average diagnosis happens at age 5-6',
    },
    {
      value: '1.4M',
      label: isHindi ? 'स्क्रीनिंग टूल नहीं रखने वाले आंगनवाड़ी कार्यकर्ता' : 'Anganwadi workers with no screening tool',
      color: '#E63946',
      subtext: null,
    },
    {
      value: '0',
      label: isHindi ? 'स्केलेबल गांव-स्तरीय स्क्रीनिंग सिस्टम' : 'Scalable village-level screening systems',
      color: '#2D6A4F',
      subtext: isHindi ? 'अब तक।' : 'Until now.',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white/50 to-white" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{
              background: `${COLORS.primary}15`,
              border: `1px solid ${COLORS.primary}30`,
            }}
          >
            <TrendingUp size={16} style={{ color: COLORS.primary }} />
            <span className="text-sm font-medium" style={{ color: COLORS.primary }}>
              {isHindi ? 'वास्तविक प्रभाव' : 'Real Impact'}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
            {isHindi ? 'हर बच्चे को मदद मिल रही है' : 'The Window Is Closing'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isHindi
              ? 'भारल के ग्रामीण इलाकों में बच्चों के विकास का सकारात्मक प्रभाव देखें'
              : "And most of India doesn't know it."}
          </p>
        </motion.div>

        

        {/* Problem-side Stats Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {problemStats.map((stat, i) => (
            <motion.div
              key={i}
              className="relative p-6 md:p-8 rounded-2xl overflow-hidden text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-700 mb-1">{stat.label}</div>
                {stat.subtext && (
                  <div className="text-xs text-gray-500">{stat.subtext}</div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto text-center mt-4">
          <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
            BalSaathiAI is a triage and referral support tool — not a diagnostic system. Screening logic is adapted from the globally validated ASQ-3 framework. This platform is currently at prototype stage.
          </p>
        </div>

        {/* Visual Impact */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Story Cards */}
          {[
            {
              title: isHindi ? 'सावित्री की कहानी' : "Savitri's Story",
              description: isHindi
                ? 'जब सावित्री ने बच्चे की देरी को जल्दी पहचाना, उसे सही समय पर मदद मिली।'
                : 'When Savitri identified a child\'s delay early, timely help was provided.',
              color: COLORS.primary,
            },
            {
              title: isHindi ? 'रामपुर गांव' : 'Rampur Village',
              description: isHindi
                ? '47 बच्चों की स्क्रीनिंग, 6 को मदद दी गई।'
                : '47 children screened, 6 received help.',
              color: COLORS.accent,
            },
          ].map((story, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)' }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center"
                style={{ background: `${story.color}15` }}
                whileHover={{ scale: 1.05 }}
              >
                <Heart size={32} style={{ color: story.color }} />
              </motion.div>
              <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
                {story.title}
              </h3>
              <p className="text-gray-600">{story.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
