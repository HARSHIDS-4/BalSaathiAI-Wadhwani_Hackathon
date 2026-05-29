import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { TRAINING_MODULES } from '../../data/demo-data';
import AnimatedButton from '../shared/AnimatedButton';
import {
  BookOpen,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Play,
  Clock,
  X,
  Lightbulb,
} from 'lucide-react';

const TrainingModules: React.FC = () => {
  const { isHindi } = useLanguage();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const iconMap: Record<string, React.ElementType> = {
    'message-circle': MessageCircle,
    'share-2': Share2,
    'heart': Heart,
  };

  // Story-style slides for training
  const trainingSlides = [
    {
      content: isHindi
        ? 'स्क्रीनिंग के दौरान, हमेशा एक दोस्ताना अंदाज़ में बात करें।'
        : 'During screening, always speak in a friendly manner.',
      emoji: '👋',
    },
    {
      content: isHindi
        ? 'बच्चे की मां से उसकी भाषा में बात करें।'
        : 'Talk to the mother in her language.',
      emoji: '🗣️',
    },
    {
      content: isHindi
        ? 'सरल शब्दों में सवाल पूछें।'
        : 'Ask questions in simple words.',
      emoji: '❓',
    },
    {
      content: isHindi
        ? 'अगर कोई चीज़ समझ नहीं आए, तो विनम्रता से फिर पूछें।'
        : 'If something is not clear, ask politely again.',
      emoji: '🔄',
    },
    {
      content: isHindi
        ? 'बच्चे की प्रगति पर मां की मदद लें।'
        : 'Take the mother\'s input on the child\'s progress.',
      emoji: '👩',
    },
    {
      content: isHindi
        ? 'बहुत बढ़िया! आप अभी तैयार हैं।'
        : 'Great! You are now ready.',
      emoji: '✨',
    },
  ];

  const currentModule = TRAINING_MODULES.find((m) => m.id === selectedModule);

  const handleStartModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    setCurrentSlide(0);
  };

  const handleExitModule = () => {
    setSelectedModule(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (currentSlide < trainingSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleExitModule();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{
              background: `${COLORS.accent}15`,
              border: `1px solid ${COLORS.accent}30`,
            }}
          >
            <BookOpen size={16} style={{ color: COLORS.accent }} />
            <span className="text-sm font-medium" style={{ color: COLORS.accent }}>
              {t('training')}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
            {isHindi ? 'प्रशिक्षण मॉड्यूल' : 'Training Modules'}
          </h2>
          <p className="text-lg text-gray-600">
            {isHindi
              ? 'सरल और आकर्षक तरीके से सीखें'
              : 'Learn in a simple and engaging way'}
          </p>
        </motion.div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TRAINING_MODULES.map((module, i) => {
            const Icon = iconMap[module.icon] || BookOpen;

            return (
              <motion.div
                key={module.id}
                className={`relative p-6 rounded-2xl overflow-hidden cursor-pointer`}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                  border: module.completed ? `2px solid ${COLORS.success}` : 'none',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)' }}
                onClick={() => handleStartModule(module.id)}
              >
                {/* Completed badge */}
                {module.completed && (
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <CheckCircle size={24} style={{ color: COLORS.success }} />
                  </motion.div>
                )}

                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${COLORS.accent}15` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon size={28} style={{ color: COLORS.accent }} />
                </motion.div>

                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
                  {isHindi ? module.titleHindi : module.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {isHindi ? module.descriptionHindi : module.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{module.duration}</span>
                  </div>
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: module.completed ? `${COLORS.success}15` : `${COLORS.primary}15` }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {module.completed ? (
                      <CheckCircle size={20} style={{ color: COLORS.success }} />
                    ) : (
                      <Play size={18} style={{ color: COLORS.primary }} />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Story-style Training Modal */}
        <AnimatePresence>
          {selectedModule && currentModule && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={handleExitModule}
              />

              {/* Modal */}
              <motion.div
                className="relative w-full max-w-lg mx-4 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #FFF6EA 0%, #FDFBF7 100%)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                }}
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
              >
                {/* Close button */}
                <motion.button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{ background: 'rgba(0, 0, 0, 0.05)' }}
                  onClick={handleExitModule}
                  whileHover={{ scale: 1.1, background: 'rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} style={{ color: COLORS.textPrimary }} />
                </motion.button>

                {/* Progress */}
                <div className="p-6 pb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ background: COLORS.primary }}
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentSlide + 1) / trainingSlides.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {currentSlide + 1}/{trainingSlides.length}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 min-h-[350px] flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="text-center"
                    >
                      {/* Emoji */}
                      <motion.div
                        className="text-7xl mb-6"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: currentSlide === trainingSlides.length - 1 ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {trainingSlides[currentSlide].emoji}
                      </motion.div>

                      {/* Text */}
                      <p className="text-xl md:text-2xl font-medium text-center px-4" style={{ color: COLORS.textPrimary }}>
                        {trainingSlides[currentSlide].content}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="p-6 pt-0 flex items-center justify-between">
                  <motion.button
                    className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                      currentSlide === 0 ? 'opacity-50' : ''
                    }`}
                    style={{
                      background: 'rgba(0, 0, 0, 0.05)',
                      color: COLORS.textPrimary,
                    }}
                    disabled={currentSlide === 0}
                    onClick={prevSlide}
                    whileHover={currentSlide > 0 ? { scale: 1.05 } : {}}
                  >
                    <ChevronLeft size={18} />
                    {isHindi ? 'पिछला' : 'Previous'}
                  </motion.button>

                  <AnimatedButton
                    variant={currentSlide === trainingSlides.length - 1 ? 'success' : 'primary'}
                    size="md"
                    onClick={nextSlide}
                    icon={currentSlide === trainingSlides.length - 1 ? <CheckCircle size={18} /> : <ChevronRight size={18} />}
                  >
                    {currentSlide === trainingSlides.length - 1
                      ? isHindi
                        ? 'पूरा करें'
                        : 'Complete'
                      : isHindi
                      ? 'आगे'
                      : 'Next'}
                  </AnimatedButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TrainingModules;
