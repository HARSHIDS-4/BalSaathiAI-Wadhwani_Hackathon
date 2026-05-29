import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { DEMO_WORKER, IMPACT_STATS } from '../../data/demo-data';
import AnimatedCounter from '../shared/AnimatedCounter';
import GlassCard from '../shared/GlassCard';
import {
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  MapPin,
  Calendar,
  ArrowUpRight,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

const SupervisorAnalytics: React.FC = () => {
  const { isHindi } = useLanguage();

  const metrics = [
    {
      label: isHindi ? 'स्क्रीन हुए बच्चे' : 'Children Screened',
      value: DEMO_WORKER.totalScreenings,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: COLORS.primary,
    },
    {
      label: isHindi ? 'फ्लैग हुए बच्चे' : 'Children Flagged',
      value: DEMO_WORKER.totalFlagged,
      change: '+3%',
      trend: 'down',
      icon: AlertTriangle,
      color: COLORS.watch,
    },
    {
      label: isHindi ? 'रेफरल बनाए गए' : 'Referrals Generated',
      value: DEMO_WORKER.totalReferrals,
      change: '+8%',
      trend: 'up',
      icon: ArrowUpRight,
      color: COLORS.accent,
    },
    {
      label: isHindi ? 'फॉलो-अप पूरे हुए' : 'Follow-Ups Completed',
      value: DEMO_WORKER.totalFollowUps,
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: COLORS.success,
    },
  ];

  const villages = [
    { name: 'Rampur', screened: 47, flagged: 6, color: COLORS.primary },
    { name: 'Lakshmipur', screened: 32, flagged: 3, color: COLORS.accent },
    { name: 'Sitapur', screened: 28, flagged: 2, color: COLORS.success },
    { name: 'Ganeshpur', screened: 21, flagged: 4, color: COLORS.watch },
  ];

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
            {isHindi ? 'सुपरवाइजर डैशबोर्ड' : 'Supervisor Dashboard'}
          </h1>
          <p className="text-gray-600">
            {isHindi ? `${DEMO_WORKER.district} जिले का विश्लेषण` : `Analytics for ${DEMO_WORKER.district} district`}
          </p>
        </motion.div>

        {/* Risk Pulse AI Card */}
        <motion.div
          className="mb-8 p-6 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
            boxShadow: `0 20px 60px ${COLORS.primary}20`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 0 0 rgba(255, 255, 255, 0.3)',
                  '0 0 20px 10px rgba(255, 255, 255, 0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={28} color="white" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/80 text-sm font-medium">
                  {isHindi ? 'AI जोखम डाला' : 'Risk Pulse AI'}
                </span>
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-white text-lg">
                {isHindi
                  ? 'रामपुर गांव में इस महीने सबसे ज्यादा फ्लैग हुए मामले हैं। एक केंद्रित स्क्रीनिंग शिविर पर विचार करें।'
                  : 'Rampur village has the highest flagged cases this month. Consider a focused screening camp.'}
              </p>
            </div>
            <motion.button
              className="px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
              whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isHindi ? 'विवरण देखें' : 'View Details'}
            </motion.button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${metric.color}15` }}
                  whileHover={{ scale: 1.1 }}
                >
                  <metric.icon size={20} style={{ color: metric.color }} />
                </motion.div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {metric.change}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: metric.color }}>
                <AnimatedCounter target={metric.value} />
              </div>
              <div className="text-sm text-gray-500">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Village-wise Analytics */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
            {isHindi ? 'गांव-वार स्क्रीनिंग' : 'Village-wise Screening'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {villages.map((village, i) => (
              <motion.div
                key={village.name}
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} style={{ color: village.color }} />
                  <span className="font-semibold" style={{ color: COLORS.textPrimary }}>
                    {village.name}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">{isHindi ? 'स्क्रीन' : 'Screened'}</span>
                    <span className="font-medium">{village.screened}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: village.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(village.screened / 50) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle size={14} style={{ color: COLORS.watch }} />
                  <span className="text-gray-600">
                    {village.flagged} {isHindi ? 'फ्लैग' : 'flagged'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${COLORS.success}15` }}
              >
                <CheckCircle size={20} style={{ color: COLORS.success }} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'सकारात्मक प्रगति' : 'Positive Progress'}
              </h3>
            </div>
            <ul className="space-y-2">
              {[
                isHindi ? 'लक्ष्मीपुर में स्क्रीनिंग में 25% वृद्धि' : '25% increase in screening at Lakshmipur',
                isHindi ? 'फॉलो-अप दर में सुधार' : 'Improvement in follow-up rate',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <CheckCircle size={14} style={{ color: COLORS.success }} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${COLORS.watch}15` }}
              >
                <Lightbulb size={20} style={{ color: COLORS.watch }} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'सुझाव' : 'Recommendations'}
              </h3>
            </div>
            <ul className="space-y-2">
              {[
                isHindi ? 'रामपुर में स्क्रीनिंग शिविर' : 'Screening camp in Rampur',
                isHindi ? 'गनेशपुर में कार्यकर्ता प्रशिक्षण' : 'Worker training in Ganeshpur',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Lightbulb size={14} style={{ color: COLORS.watch }} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SupervisorAnalytics;
