import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { DEMO_WORKER, DEMO_CHILDREN, ACTIVITY_TIMELINE, formatChildAge } from '../../data/demo-data';
import GlassCard from '../shared/GlassCard';
import AnimatedButton from '../shared/AnimatedButton';
import StatusBadge from '../shared/StatusBadge';
import AnimatedCounter from '../shared/AnimatedCounter';
import {
  User,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Mic,
  Flame,
  Wifi,
  WifiOff,
  ArrowRight,
  Activity,
  ChildProfile,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface WorkerDashboardProps {
  onNavigate: (section: string) => void;
}

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ onNavigate }) => {
  const { t, isHindi } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const quickStats = [
    {
      value: 3,
      label: t('screeningsPending'),
      icon: Clock,
      color: COLORS.watch,
      bg: '#FFE5A0',
    },
    {
      value: 1,
      label: t('followUpDue'),
      icon: FileText,
      color: COLORS.success,
      bg: '#B7E4C7',
    },
    {
      value: 2,
      label: t('childrenFlagged'),
      icon: AlertTriangle,
      color: COLORS.danger,
      bg: '#FFB4B4',
    },
  ];

  const actionCards = [
    {
      id: 'screen',
      title: t('screenChild'),
      icon: User,
      color: COLORS.primary,
      bg: `${COLORS.primary}15`,
    },
    {
      id: 'followups',
      title: t('myFollowUps'),
      icon: FileText,
      color: COLORS.accent,
      bg: `${COLORS.accent}15`,
    },
    {
      id: 'children',
      title: t('myChildren'),
      icon: Users,
      color: COLORS.success,
      bg: `${COLORS.success}15`,
    },
    {
      id: 'report',
      title: t('villageReport'),
      icon: FileText,
      color: COLORS.watch,
      bg: `${COLORS.watch}15`,
    },
  ];

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <img
                src={DEMO_WORKER.avatar}
                alt={DEMO_WORKER.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                style={{ border: `3px solid ${COLORS.primary}` }}
              />
              {/* Online indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                style={{ background: COLORS.success }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle size={12} color="white" />
              </motion.div>
            </motion.div>

            <div>
              <motion.h1
                className="text-2xl md:text-3xl font-bold"
                style={{ color: COLORS.textPrimary }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t('namaste')},{' '}
                <span style={{ color: COLORS.primary }}>
                  {isHindi ? DEMO_WORKER.nameHindi : DEMO_WORKER.name}
                </span>
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {DEMO_WORKER.village}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date().toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Sync Status & Streak */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Sync Status */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: COLORS.synced ? `${COLORS.success}15` : `${COLORS.watch}15`,
              }}
              animate={{
                boxShadow: [
                  `0 0 0 0 ${COLORS.success}30`,
                  `0 0 0 8px ${COLORS.success}00`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Wifi size={16} style={{ color: COLORS.success }} />
              </motion.div>
              <span className="text-sm font-medium" style={{ color: COLORS.success }}>
                {t('synced')}
              </span>
            </motion.div>

            {/* Streak Badge */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent}20 0%, ${COLORS.accent}10 100%)`,
                border: `1px solid ${COLORS.accent}30`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Flame size={18} style={{ color: COLORS.accent }} />
              </motion.div>
              <span className="text-sm font-semibold" style={{ color: COLORS.accent }}>
                {DEMO_WORKER.streak} {isHindi ? 'फॉलो-अप' : 'follow-ups'}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Smart Insight Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                background: stat.bg,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold" style={{ color: stat.color }}>
                    <AnimatedCounter target={stat.value} />
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{stat.label}</div>
                </div>
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: `${stat.color}20` }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {actionCards.map((card, i) => (
            <motion.div
              key={card.id}
              className="relative p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
              onClick={() => {
                if (card.id === 'screen') onNavigate('screening');
                else if (card.id === 'followups') onNavigate('followups');
                else if (card.id === 'children') onNavigate('children');
                else if (card.id === 'report') onNavigate('report');
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0"
                style={{ background: card.bg }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: card.bg }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <card.icon size={28} style={{ color: card.color }} />
                </motion.div>
                <h3 className="font-semibold text-base md:text-lg" style={{ color: COLORS.textPrimary }}>
                  {card.title}
                </h3>
              </div>

              {/* Arrow */}
              <motion.div
                className="absolute bottom-4 right-4 opacity-30"
                whileHover={{ opacity: 1, x: 5 }}
              >
                <ArrowRight size={20} style={{ color: card.color }} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity & Children Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Children List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
              {t('myChildren')}
            </h2>
            <div className="space-y-3">
              {DEMO_CHILDREN.slice(0, 4).map((child, i) => (
                <motion.div
                  key={child.id}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{
                    x: 5,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(event) => {
                      const target = event.currentTarget;
                      if (target.dataset.fallbackApplied === 'true') return;
                      target.dataset.fallbackApplied = 'true';
                      target.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
                          <defs>
                            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stop-color="#f2d6b3" />
                              <stop offset="100%" stop-color="#c79f7d" />
                            </linearGradient>
                          </defs>
                          <rect width="120" height="120" rx="60" fill="url(#g)" />
                          <circle cx="60" cy="48" r="22" fill="rgba(255,255,255,0.88)" />
                          <path d="M30 105c7-20 21-30 30-30s23 10 30 30" fill="rgba(255,255,255,0.88)" />
                        </svg>
                      `)}`;
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold" style={{ color: COLORS.textPrimary }}>
                      {isHindi ? child.nameHindi : child.name}
                    </div>
                    <div className="text-sm text-gray-500">{formatChildAge(child.age, isHindi)}</div>
                  </div>
                  <StatusBadge status={child.status as any} size="sm" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
              {isHindi ? 'हाल की गतिविधि' : 'Recent Activity'}
            </h2>
            <div className="space-y-3">
              {ACTIVITY_TIMELINE.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ x: -5 }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        activity.action === 'refer'
                          ? `${COLORS.danger}15`
                          : activity.action === 'watch'
                          ? `${COLORS.watch}15`
                          : `${COLORS.success}15`,
                    }}
                  >
                    <Activity
                      size={20}
                      style={{
                        color:
                          activity.action === 'refer'
                            ? COLORS.danger
                            : activity.action === 'watch'
                            ? COLORS.watch
                            : COLORS.success,
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm" style={{ color: COLORS.textPrimary }}>
                      {isHindi ? activity.childNameHindi : activity.childName}
                    </div>
                    <div className="text-xs text-gray-500">{isHindi ? activity.timestampHindi : activity.timestamp}</div>
                  </div>
                  <StatusBadge status={activity.action as any} size="sm" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Voice AI Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <motion.button
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
              boxShadow: `0 8px 32px ${COLORS.primary}40`,
            }}
            onClick={() => setIsListening(!isListening)}
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
          >
            {/* Ripple effect */}
            {isListening && (
              <>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${COLORS.primary}` }}
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </>
            )}
            <Mic size={28} color="white" />
          </motion.button>

          {/* Voice status label */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="absolute -top-12 right-0 px-4 py-2 rounded-full text-sm"
                style={{
                  background: COLORS.primary,
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {isHindi ? 'सुन रहा हूँ...' : 'Listening...'}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
