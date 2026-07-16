import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { IMPACT_STATS } from '../../data/demo-data';
import AnimatedCounter from '../shared/AnimatedCounter';
import { Users, Heart, TrendingUp, MapPin, Award, Sparkles } from 'lucide-react';

const ImpactSection: React.FC = () => {
  const { isHindi } = useLanguage();

  const stats = [
    {
      value: IMPACT_STATS.childrenScreened,
      label: isHindi ? 'बच्चे स्क्रीन हुए' : 'Children Screened',
      icon: Users,
      color: COLORS.primary,
    },
    {
      value: IMPACT_STATS.childrenFlagged,
      label: isHindi ? 'बच्चे फ्लैग हुए' : 'Children Flagged',
      icon: Heart,
      color: COLORS.danger,
    },
    {
      value: IMPACT_STATS.referralsGenerated,
      label: isHindi ? 'रेफरल बनाए गए' : 'Referrals Generated',
      icon: TrendingUp,
      color: COLORS.accent,
    },
    {
      value: IMPACT_STATS.followUpsCompleted,
      label: isHindi ? 'फॉलो-अप पूरे हुए' : 'Follow-Ups Completed',
      icon: Award,
      color: COLORS.success,
    },
  ];

  const highlights = [
    {
      value: IMPACT_STATS.districts,
      label: isHindi ? 'जिले' : 'Districts',
      icon: MapPin,
    },
    {
      value: IMPACT_STATS.anganwadiWorkers,
      label: isHindi ? 'आंगनवाड़ी कार्यकर्ता' : 'Anganwadi Workers',
      icon: Users,
    },
    {
      value: `${IMPACT_STATS.accuracyRate}%`,
      label: isHindi ? 'सटीकता' : 'Accuracy',
      icon: Sparkles,
    },
    {
      value: `${IMPACT_STATS.parentSatisfaction}%`,
      label: isHindi ? 'माता-पिता संतुष्टि' : 'Parent Satisfaction',
      icon: Heart,
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
            {isHindi ? 'हर बच्चे को मदद मिल रही है' : 'Every Child Getting Help'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isHindi
              ? 'भारल के ग्रामीण इलाकों में बच्चों के विकास का सकारात्मक प्रभाव देखें'
              : 'See the positive impact on child development in rural India'}
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="relative p-6 md:p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)' }}
            >
              {/* Background gradient */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{ background: stat.color }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${stat.color}15` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </motion.div>

                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlight Bar */}
        <motion.div
          className="p-6 md:p-8 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
            boxShadow: `0 20px 60px ${COLORS.primary}30`,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <motion.div
                  className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <item.icon size={20} color="white" />
                </motion.div>
                <div className="text-2xl md:text-3xl font-bold text-white">{item.value}</div>
                <div className="text-sm text-white/80">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
