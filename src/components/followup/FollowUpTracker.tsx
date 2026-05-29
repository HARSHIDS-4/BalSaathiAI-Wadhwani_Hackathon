import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { DEMO_CHILDREN } from '../../data/demo-data';
import GlassCard from '../shared/GlassCard';
import StatusBadge from '../shared/StatusBadge';
import AnimatedButton from '../shared/AnimatedButton';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  MoveHorizontal,
} from 'lucide-react';

interface FollowUpTrackerProps {
  onBack: () => void;
}

interface FollowUpChild {
  id: string;
  name: string;
  nameHindi: string;
  photo: string;
  referralDate: string;
  daysSinceReferral: number;
  status: 'pending' | 'visited' | 'needs-help';
}

const FollowUpTracker: React.FC<FollowUpTrackerProps> = ({ onBack }) => {
  const { t, isHindi } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Mock follow-up data
  const followUps: FollowUpChild[] = [
    {
      id: '1',
      name: 'Meena Kumari',
      nameHindi: 'मीना कुमारी',
      photo: DEMO_CHILDREN[0].photo,
      referralDate: '2026-05-26',
      daysSinceReferral: 3,
      status: 'pending',
    },
    {
      id: '2',
      name: 'Arjun Kumar',
      nameHindi: 'अर्जुन कुमार',
      photo: DEMO_CHILDREN[1].photo,
      referralDate: '2026-05-20',
      daysSinceReferral: 9,
      status: 'visited',
    },
    {
      id: '3',
      name: 'Kavya Sharma',
      nameHindi: 'काव्या शर्मा',
      photo: DEMO_CHILDREN[2].photo,
      referralDate: '2026-05-28',
      daysSinceReferral: 1,
      status: 'needs-help',
    },
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4,
      },
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % followUps.length);
    setShowSwipeHint(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + followUps.length) % followUps.length);
    setShowSwipeHint(false);
  };

  const statusConfig = {
    pending: { label: 'Pending', labelHindi: 'बाकी', color: COLORS.watch, bg: '#FFE5A0' },
    visited: { label: 'Visited', labelHindi: 'मिले', color: COLORS.success, bg: '#B7E4C7' },
    'needs-help': { label: 'Needs Help', labelHindi: 'मदद चाहिए', color: COLORS.danger, bg: '#FFB4B4' },
  };

  const currentFollowUp = followUps[currentIndex];

  const updateStatus = (newStatus: 'pending' | 'visited' | 'needs-help') => {
    // In real app, this would update the database
    console.log('Update status to:', newStatus);
  };

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
            {t('myFollowUps')}
          </h1>
          <p className="text-gray-500">
            {isHindi ? `${followUps.length} फॉलो-अप बाकी` : `${followUps.length} follow-ups pending`}
          </p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {followUps.map((_, i) => (
            <motion.button
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === currentIndex ? 24 : 8,
                height: 8,
                background: i === currentIndex ? COLORS.primary : '#E5E7EB',
              }}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        <AnimatePresence>
          {showSwipeHint && (
            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ background: `${COLORS.primary}10`, color: COLORS.primary }}
                animate={{ x: [0, 10, 0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MoveHorizontal size={16} />
                {isHindi ? 'स्वाइप करें' : 'Swipe to navigate'}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Carousel */}
        <div className="relative overflow-hidden min-h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <GlassCard className="h-full" padding="lg">
                {/* Child Info */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.img
                    src={currentFollowUp.photo}
                    alt={currentFollowUp.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>
                      {isHindi ? currentFollowUp.nameHindi : currentFollowUp.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar size={14} />
                      <span>
                        {isHindi ? `${currentFollowUp.daysSinceReferral} दिन पहले` : `${currentFollowUp.daysSinceReferral} days ago`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-6 p-4 rounded-xl" style={{ background: statusConfig[currentFollowUp.status].bg }}>
                  <div className="flex items-center gap-3">
                    <Clock size={24} style={{ color: statusConfig[currentFollowUp.status].color }} />
                    <div>
                      <div className="text-sm text-gray-600">{isHindi ? 'स्थिति' : 'Status'}</div>
                      <div className="font-semibold" style={{ color: statusConfig[currentFollowUp.status].color }}>
                        {isHindi ? statusConfig[currentFollowUp.status].labelHindi : statusConfig[currentFollowUp.status].label}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={currentFollowUp.status} size="md" />
                </div>

                {/* Timeline */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">
                    {isHindi ? 'समयरेखा' : 'Timeline'}
                  </h4>
                  <div className="space-y-3">
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${COLORS.danger}15` }}>
                        <AlertCircle size={16} style={{ color: COLORS.danger }} />
                      </div>
                      <div className="flex-1 text-sm">
                        <div className="font-medium">{isHindi ? 'रेफरल बनाया गया' : 'Referral Created'}</div>
                        <div className="text-gray-500">26 May 2026</div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center border-2" style={{ borderColor: COLORS.watch, background: 'white' }}>
                        <Clock size={16} style={{ color: COLORS.watch }} />
                      </div>
                      <div className="flex-1 text-sm text-gray-400">
                        <div className="font-medium">{isHindi ? 'विशेषज्ञ से मिलना' : 'Visit Specialist'}</div>
                        <div>{isHindi ? 'बाकी' : 'Pending'}</div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-600">
                    {isHindi ? 'स्थिति अपडेट करें' : 'Update Status'}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(['visited', 'pending', 'needs-help'] as const).map((status, i) => (
                      <motion.button
                        key={status}
                        className={`p-3 rounded-xl text-xs font-semibold`}
                        style={{
                          background: currentFollowUp.status === status ? statusConfig[status].bg : 'rgba(255,255,255,0.8)',
                          color: statusConfig[status].color,
                          border: currentFollowUp.status === status ? `2px solid ${statusConfig[status].color}` : '2px solid transparent',
                        }}
                        onClick={() => updateStatus(status)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isHindi ? statusConfig[status].labelHindi : statusConfig[status].label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Call Button */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <AnimatedButton
                    variant="accent"
                    size="lg"
                    fullWidth
                    icon={<Phone size={20} />}
                    onClick={() => {}}
                  >
                    {isHindi ? 'माता-पिता को कॉल करें' : 'Call Parent'}
                  </AnimatedButton>
                </motion.div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <AnimatedButton
            variant="ghost"
            size="md"
            onClick={onBack}
            icon={<ChevronLeft size={18} />}
            iconPosition="left"
          >
            {isHindi ? 'वापस' : 'Back'}
          </AnimatedButton>

          <div className="flex gap-3">
            <motion.button
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${COLORS.primary}15` }}
              onClick={prevSlide}
              whileHover={{ scale: 1.1, background: `${COLORS.primary}25` }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} style={{ color: COLORS.primary }} />
            </motion.button>
            <motion.button
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: COLORS.primary }}
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} color="white" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpTracker;
