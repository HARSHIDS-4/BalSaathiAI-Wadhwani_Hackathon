import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { SCREENING_QUESTIONS, FOLLOW_UP_QUESTIONS } from '../../data/demo-data';
import AnimatedButton from '../shared/AnimatedButton';
import StatusBadge from '../shared/StatusBadge';
import {
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Mic,
  Bot,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Clock,
  Heart,
  ArrowRight,
  Loader2,
} from 'lucide-react';

interface ScreeningFlowProps {
  onComplete: (result: ScreeningResult) => void;
  onBack: () => void;
}

interface ScreeningResult {
  status: 'on-track' | 'watch' | 'refer';
  domains: Record<string, string>;
  recommendations: string[];
  nextSteps: string[];
}

type QuestionAnswer = 'yes' | 'sometimes' | 'no';

const ScreeningFlow: React.FC<ScreeningFlowProps> = ({ onComplete, onBack }) => {
  const { t, isHindi } = useLanguage();
  const [step, setStep] = useState<'age' | 'domain' | 'questions' | 'processing' | 'result'>('age');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>({});
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0);
  const [showAiInsight, setShowAiInsight] = useState(false);

  const domains = [
    { id: 'speech', name: t('speechLanguage'), icon: MessageCircle, color: COLORS.primary },
    { id: 'motor', name: t('motorSkills'), icon: '🤸', color: COLORS.success },
    { id: 'social', name: t('socialEmotional'), icon: Heart, color: COLORS.accent },
    { id: 'cognitive', name: t('cognitive'), icon: '🧠', color: COLORS.watch },
  ];

  const ageOptions = [12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72];

  const getQuestionsForAge = useCallback(() => {
    if (!selectedAge || selectedDomains.length === 0) return [];

    const ageRange = selectedAge <= 24 ? '18-24' : '24-36';
    const allQuestions: any[] = [];

    selectedDomains.forEach((domain) => {
      const domainQuestions = SCREENING_QUESTIONS[domain]?.[ageRange] || [];
      allQuestions.push(...domainQuestions);
    });

    return allQuestions;
  }, [selectedAge, selectedDomains]);

  const questions = getQuestionsForAge();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: QuestionAnswer) => {
    if (!currentQuestion) return;

    const questionId = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (answer === 'no') {
      setShowFollowUp(true);
      setShowAiInsight(true);
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    setShowFollowUp(false);
    setShowAiInsight(false);
    setCurrentFollowUpIndex(0);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep('processing');
      setTimeout(() => {
        calculateResult();
      }, 3000);
    }
  };

  const handleFollowUpAnswer = (answer: QuestionAnswer) => {
    if (!currentQuestion) return;

    const followUps = FOLLOW_UP_QUESTIONS[currentQuestion.domain] || [];

    if (currentFollowUpIndex < followUps.length - 1 && answer === 'no') {
      setCurrentFollowUpIndex((prev) => prev + 1);
    } else {
      moveToNextQuestion();
    }
  };

  const calculateResult = () => {
    const noCount = Object.values(answers).filter((a) => a === 'no').length;
    const sometimesCount = Object.values(answers).filter((a) => a === 'sometimes').length;

    let status: 'on-track' | 'watch' | 'refer';
    if (noCount >= 2) {
      status = 'refer';
    } else if (noCount === 1 || sometimesCount >= 2) {
      status = 'watch';
    } else {
      status = 'on-track';
    }

    const result: ScreeningResult = {
      status,
      domains: selectedDomains.reduce(
        (acc, domain) => ({
          ...acc,
          [domain]: status,
        }),
        {}
      ),
      recommendations:
        status === 'refer'
          ? [isHindi ? 'विशेषज्ञ से मिलें' : 'Visit a specialist']
          : status === 'watch'
          ? [isHindi ? 'घर पर गतिविधियां करें' : 'Practice activities at home']
          : [isHindi ? 'नियमित जांच जारी रखें' : 'Continue regular screening'],
      nextSteps:
        status === 'refer'
          ? [isHindi ? 'रेफरल बनाएं' : 'Create Referral']
          : status === 'watch'
          ? [isHindi ? 'फॉलो-अप रिमाइंडर सेट करें' : 'Set Follow-up Reminder']
          : [isHindi ? 'अगली स्क्रीनिंग' : 'Next Screening'],
    };

    setStep('result');
  };

  const resultConfig = {
    'on-track': {
      gradient: `linear-gradient(135deg, ${COLORS.success} 0%, ${COLORS.successLight} 100%)`,
      icon: CheckCircle,
      title: isHindi ? 'बधाई हो!' : 'Congratulations!',
      message: isHindi ? 'बच्चा सही राह पर है।' : 'The child is on track.',
    },
    watch: {
      gradient: `linear-gradient(135deg, ${COLORS.watch} 0%, #FFE5A0 100%)`,
      icon: Clock,
      title: isHindi ? 'निगरानी आवश्यक' : 'Watch Closely',
      message: isHindi ? 'कुछ क्षेत्रों में ध्यान दें।' : 'Pay attention to some areas.',
    },
    refer: {
      gradient: `linear-gradient(135deg, ${COLORS.danger} 0%, ${COLORS.dangerLight} 100%)`,
      icon: AlertTriangle,
      title: isHindi ? 'विशेषज्ञ से मिलें' : 'Visit a Specialist',
      message: isHindi ? 'विशेषज्ञ से मिलने की सलाह है।' : 'Specialist consultation is recommended.',
    },
  };

  const progress = step === 'questions' ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        {step !== 'age' && step !== 'result' && step !== 'processing' && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {isHindi ? `प्रश्न ${currentQuestionIndex + 1}/${questions.length}` : `Question ${currentQuestionIndex + 1}/${questions.length}`}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Age Selection */}
          {step === 'age' && (
            <motion.div
              key="age"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: COLORS.textPrimary }}>
                {t('selectAge')}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {isHindi ? 'बच्चे की उम्र चुनें' : 'Select the child\'s age'}
              </p>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                {ageOptions.map((age) => (
                  <motion.button
                    key={age}
                    className={`p-4 md:p-6 rounded-2xl font-bold text-lg md:text-xl transition-all`}
                    style={{
                      background: selectedAge === age ? COLORS.primary : 'rgba(255, 255, 255, 0.9)',
                      color: selectedAge === age ? 'white' : COLORS.textPrimary,
                      boxShadow: selectedAge === age ? `0 8px 24px ${COLORS.primary}30` : '0 4px 16px rgba(0, 0, 0, 0.08)',
                    }}
                    onClick={() => setSelectedAge(age)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {age}
                    <div className="text-xs font-normal mt-1 opacity-80">
                      {isHindi ? 'महीने' : 'months'}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  disabled={!selectedAge}
                  onClick={() => setStep('domain')}
                  icon={<ChevronRight size={20} />}
                >
                  {isHindi ? 'आगे बढ़ें' : 'Continue'}
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          {/* Step 2: Domain Selection */}
          {step === 'domain' && (
            <motion.div
              key="domain"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'विकास के क्षेत्र चुनें' : 'Select Development Domains'}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {isHindi ? 'कम से कम एक चुनें' : 'Select at least one domain'}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {domains.map((domain) => (
                  <motion.button
                    key={domain.id}
                    className={`p-6 md:p-8 rounded-2xl text-left transition-all`}
                    style={{
                      background: selectedDomains.includes(domain.id) ? `${domain.color}15` : 'rgba(255, 255, 255, 0.9)',
                      border: selectedDomains.includes(domain.id) ? `2px solid ${domain.color}` : '2px solid transparent',
                      boxShadow: selectedDomains.includes(domain.id) ? `0 8px 24px ${domain.color}20` : '0 4px 16px rgba(0, 0, 0, 0.08)',
                    }}
                    onClick={() => {
                      setSelectedDomains((prev) =>
                        prev.includes(domain.id) ? prev.filter((d) => d !== domain.id) : [...prev, domain.id]
                      );
                    }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${domain.color}20` }}
                      >
                        {typeof domain.icon === 'string' ? (
                          <span className="text-2xl">{domain.icon}</span>
                        ) : (
                          <domain.icon size={24} style={{ color: domain.color }} />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-lg" style={{ color: COLORS.textPrimary }}>
                          {domain.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {isHindi ? 'मील पत्थर जांचें' : 'Check milestones'}
                        </div>
                      </div>
                      {selectedDomains.includes(domain.id) && (
                        <motion.div
                          className="ml-auto"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <CheckCircle size={24} style={{ color: domain.color }} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between">
                <AnimatedButton
                  variant="outline"
                  size="md"
                  onClick={() => setStep('age')}
                  icon={<ChevronLeft size={18} />}
                  iconPosition="left"
                >
                  {isHindi ? 'वापस' : 'Back'}
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  disabled={selectedDomains.length === 0}
                  onClick={() => setStep('questions')}
                  icon={<ChevronRight size={20} />}
                >
                  {isHindi ? 'स्क्रीनिंग शुरू करें' : 'Start Screening'}
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          {/* Step 3: Questions */}
          {step === 'questions' && currentQuestion && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {/* Question Card */}
              <motion.div
                className="p-8 md:p-10 rounded-3xl mb-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Milestone icon */}
                <motion.div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.accent}15 100%)`,
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={40} style={{ color: COLORS.primary }} />
                </motion.div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-semibold text-center mb-4" style={{ color: COLORS.textPrimary }}>
                  {isHindi ? currentQuestion.questionHindi : currentQuestion.question}
                </h3>

                {/* Milestone */}
                <p className="text-center text-gray-500 mb-6">
                  {isHindi ? 'मील पत्थर: ' : 'Milestone: '}
                  <span className="font-medium" style={{ color: COLORS.primary }}>
                    {isHindi ? currentQuestion.milestoneHindi : currentQuestion.milestone}
                  </span>
                </p>

                {/* Voice Button */}
                <motion.button
                  className="flex items-center gap-2 mx-auto mb-6 px-4 py-2 rounded-full"
                  style={{ background: `${COLORS.primary}10` }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic size={18} style={{ color: COLORS.primary }} />
                  <span className="text-sm" style={{ color: COLORS.primary }}>
                    {isHindi ? 'आवाज़ सुनें' : 'Listen'}
                  </span>
                </motion.button>

                {/* Answer Buttons */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { value: 'yes', label: t('yes'), color: COLORS.success, icon: '✓' },
                    { value: 'sometimes', label: t('sometimes'), color: COLORS.watch, icon: '~' },
                    { value: 'no', label: t('no'), color: COLORS.danger, icon: '✗' },
                  ].map((answer) => (
                    <motion.button
                      key={answer.value}
                      className={`p-6 md:p-8 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2`}
                      style={{
                        background: `${answer.color}15`,
                        color: answer.color,
                        border: `2px solid ${answer.color}30`,
                      }}
                      onClick={() => handleAnswer(answer.value as QuestionAnswer)}
                      whileHover={{ scale: 1.05, backgroundColor: `${answer.color}25` }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">{answer.icon}</span>
                      {answer.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* AI Follow-up Slide */}
              <AnimatePresence>
                {showFollowUp && (
                  <motion.div
                    initial={{ opacity: 0, x: 50, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 50, height: 0 }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      className="p-6 rounded-2xl mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.accent}10 0%, ${COLORS.accent}05 100%)`,
                        border: `1px solid ${COLORS.accent}20`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: COLORS.accent }}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Bot size={20} color="white" />
                        </motion.div>
                        <div>
                          <div className="font-semibold text-sm mb-1" style={{ color: COLORS.accent }}>
                            {isHindi ? 'AI अतिरिक्त प्रश्न' : 'AI Follow-up'}
                          </div>
                          {FOLLOW_UP_QUESTIONS[currentQuestion.domain]?.[currentFollowUpIndex] && (
                            <>
                              <p className="text-gray-700 mb-2">
                                {isHindi
                                  ? FOLLOW_UP_QUESTIONS[currentQuestion.domain][currentFollowUpIndex].questionHindi
                                  : FOLLOW_UP_QUESTIONS[currentQuestion.domain][currentFollowUpIndex].question}
                              </p>
                              <p className="text-sm text-gray-500 mb-4">
                                {isHindi
                                  ? FOLLOW_UP_QUESTIONS[currentQuestion.domain][currentFollowUpIndex].insightHindi
                                  : FOLLOW_UP_QUESTIONS[currentQuestion.domain][currentFollowUpIndex].insight}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                <motion.button
                                  className="p-3 rounded-xl text-sm font-medium"
                                  style={{ background: `${COLORS.success}15`, color: COLORS.success }}
                                  onClick={() => handleFollowUpAnswer('yes')}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {t('yes')}
                                </motion.button>
                                <motion.button
                                  className="p-3 rounded-xl text-sm font-medium"
                                  style={{ background: `${COLORS.danger}15`, color: COLORS.danger }}
                                  onClick={() => handleFollowUpAnswer('no')}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {t('no')}
                                </motion.button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Insight */}
              <AnimatePresence>
                {showAiInsight && !showFollowUp && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center gap-2 p-4 rounded-xl"
                    style={{ background: `${COLORS.primary}10` }}
                  >
                    <Sparkles size={18} style={{ color: COLORS.primary }} />
                    <span className="text-sm" style={{ color: COLORS.primary }}>
                      {isHindi ? 'AI अगला प्रश्न तैयार कर रहा है...' : 'AI preparing next question...'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Processing Screen */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-8 relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `4px solid ${COLORS.primary}20`,
                    borderTopColor: COLORS.primary,
                  }}
                />
                <div className="absolute inset-4 rounded-full flex items-center justify-center">
                  <Bot size={40} style={{ color: COLORS.primary }} />
                </div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'BalSaathiAI विश्लेषण कर रहा है...' : 'BalSaathiAI is analyzing...'}
              </h3>
              <p className="text-gray-500">
                {isHindi ? 'विकासात्मक पैटर्न की जांच' : 'Checking developmental patterns'}
              </p>
            </motion.div>
          )}

          {/* Result Screen */}
          {step === 'result' && (
            <motion.div
              key="result"
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Result Icon */}
              <motion.div
                className="w-40 h-40 mx-auto mb-8 rounded-full flex items-center justify-center"
                style={{
                  background: resultConfig[
                    Object.values(answers).filter((a) => a === 'no').length >= 2
                      ? 'refer'
                      : Object.values(answers).filter((a) => a === 'no').length === 1 ||
                        Object.values(answers).filter((a) => a === 'sometimes').length >= 2
                      ? 'watch'
                      : 'on-track'
                  ].gradient,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
              >
                {(() => {
                  const noCount = Object.values(answers).filter((a) => a === 'no').length;
                  const sometimesCount = Object.values(answers).filter((a) => a === 'sometimes').length;
                  const status = noCount >= 2 ? 'refer' : noCount === 1 || sometimesCount >= 2 ? 'watch' : 'on-track';
                  const IconComponent = resultConfig[status].icon;
                  return <IconComponent size={60} color="white" />;
                })()}
              </motion.div>

              {/* Result Text */}
              {(() => {
                const noCount = Object.values(answers).filter((a) => a === 'no').length;
                const sometimesCount = Object.values(answers).filter((a) => a === 'sometimes').length;
                const status = noCount >= 2 ? 'refer' : noCount === 1 || sometimesCount >= 2 ? 'watch' : 'on-track';
                const config = resultConfig[status];

                return (
                  <>
                    <motion.h2
                      className="text-3xl md:text-4xl font-bold mb-4"
                      style={{ color: COLORS.textPrimary }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {config.title}
                    </motion.h2>
                    <motion.p
                      className="text-xl mb-8"
                      style={{ color: COLORS.textSecondary }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {config.message}
                    </motion.p>

                    <motion.div
                      className="flex items-center justify-center gap-4 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <StatusBadge status={status} size="lg" showPulse={status !== 'on-track'} />
                    </motion.div>
                  </>
                );
              })()}

              {/* Actions */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {(() => {
                  const noCount = Object.values(answers).filter((a) => a === 'no').length;
                  const sometimesCount = Object.values(answers).filter((a) => a === 'sometimes').length;
                  const status = noCount >= 2 ? 'refer' : noCount === 1 || sometimesCount >= 2 ? 'watch' : 'on-track';

                  if (status === 'refer') {
                    return (
                      <>
                        <AnimatedButton
                          variant="danger"
                          size="lg"
                          onClick={() => onComplete({ status: 'refer', domains: {}, recommendations: [], nextSteps: [] })}
                          icon={<ArrowRight size={20} />}
                        >
                          {t('createReferral')}
                        </AnimatedButton>
                        <AnimatedButton variant="outline" size="lg" onClick={onBack}>
                          {t('home')}
                        </AnimatedButton>
                      </>
                    );
                  } else if (status === 'watch') {
                    return (
                      <>
                        <AnimatedButton
                          variant="accent"
                          size="lg"
                          onClick={() => onComplete({ status: 'watch', domains: {}, recommendations: [], nextSteps: [] })}
                          icon={<Clock size={20} />}
                          iconPosition="left"
                        >
                          {isHindi ? 'फॉलो-अप सेट करें' : 'Set Follow-up'}
                        </AnimatedButton>
                        <AnimatedButton variant="outline" size="lg" onClick={onBack}>
                          {t('home')}
                        </AnimatedButton>
                      </>
                    );
                  } else {
                    return (
                      <AnimatedButton
                        variant="success"
                        size="lg"
                        onClick={onBack}
                        icon={<CheckCircle size={20} />}
                        iconPosition="left"
                      >
                        {isHindi ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}
                      </AnimatedButton>
                    );
                  }
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScreeningFlow;
