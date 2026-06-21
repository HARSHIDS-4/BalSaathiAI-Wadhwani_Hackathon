import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { SCREENING_QUESTIONS, FOLLOW_UP_QUESTIONS } from '../../data/demo-data';
import AnimatedButton from '../shared/AnimatedButton';
import StatusBadge from '../shared/StatusBadge';
import { predictRisk, PredictionRequest, PredictionResponse } from "../../services/api";
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

type QuestionAnswer = 'Yes' | 'Sometimes' | 'No';

const FIXED_DOMAINS = [
  { id: 'speech', name: 'Speech & Language', nameHindi: 'भाषण और भाषा', icon: MessageCircle, color: COLORS.primary, description: 'This section evaluates communication and language milestones.', descriptionHindi: 'यह अनुभाग संचार और भाषा के मील के पत्थर का मूल्यांकन करता है।' },
  { id: 'motor', name: 'Motor Skills', nameHindi: 'मोटर कौशल', icon: '🤸', color: COLORS.success, description: 'This section evaluates gross and fine motor skills.', descriptionHindi: 'यह अनुभाग सकल और सूक्ष्म मोटर कौशल का मूल्यांकन करता है।' },
  { id: 'social', name: 'Social & Emotional', nameHindi: 'सामाजिक और भावनात्मक', icon: Heart, color: COLORS.accent, description: 'This section evaluates social interaction and emotional development.', descriptionHindi: 'यह अनुभाग सामाजिक संपर्क और भावनात्मक विकास का मूल्यांकन करता है।' },
  { id: 'cognitive', name: 'Cognitive', nameHindi: 'संज्ञानात्मक', icon: '🧠', color: COLORS.watch, description: 'This section evaluates cognitive and problem-solving skills.', descriptionHindi: 'यह अनुभाग संज्ञानात्मक और समस्या-समाधान कौशल का मूल्यांकन करता है।' },
];

type FlowStep = 
  | 'age' 
  | 'gender' 
  | 'flashcard' 
  | 'questions' 
  | 'processing' 
  | 'result';

const ScreeningFlow: React.FC<ScreeningFlowProps> = ({ onComplete, onBack }) => {
  const { t, isHindi } = useLanguage();
  const [step, setStep] = useState<FlowStep>('age');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [ageInput, setAgeInput] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<'Male' | 'Female' | null>(null);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>({});
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, 'Yes' | 'No' | null>>({});
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentDomain = FIXED_DOMAINS[currentDomainIndex];

  const getQuestionsForDomain = useCallback((domainId: string) => {
    const ageRange = selectedAge && selectedAge <= 24 ? '18-24' : '24-36';
    return SCREENING_QUESTIONS[domainId]?.[ageRange] || [];
  }, [selectedAge]);

  const currentDomainQuestions = currentDomain ? getQuestionsForDomain(currentDomain.id) : [];
  const currentQuestion = currentDomainQuestions[currentQuestionIndex];

  const getFollowUpIdForQuestion = (questionId: string): string | null => {
    const match = questionId.match(/^(.+)_q(\d+)$/);
    if (!match) return null;
    return `${match[1]}_followup_q${match[2]}`;
  };

  const getFollowUpQuestion = (domain: string, questionId: string) => {
    const followUpId = getFollowUpIdForQuestion(questionId);
    if (!followUpId) return null;
    const followUps = FOLLOW_UP_QUESTIONS[domain] || [];
    return followUps.find(fq => fq.id === followUpId) || null;
  };

  const handleAgeSubmit = () => {
    const age = parseInt(ageInput, 10);
    if (isNaN(age) || age < 12 || age > 72) return;
    setSelectedAge(age);
    setStep('gender');
  };

  const handleAnswer = (answer: QuestionAnswer) => {
    if (!currentQuestion) return;

    const questionId = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (answer === 'No') {
      setShowFollowUp(true);
    } else {
      const followUpId = getFollowUpIdForQuestion(questionId);
      if (followUpId) {
        setFollowUpAnswers((prev) => ({ ...prev, [followUpId]: null }));
      }
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    setShowFollowUp(false);

    if (currentQuestionIndex < currentDomainQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Domain complete, move to next domain flashcard or submit
      if (currentDomainIndex < FIXED_DOMAINS.length - 1) {
        setCurrentDomainIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
        setStep('flashcard');
      } else {
        submitPrediction();
      }
    }
  };

  const handleFollowUpAnswer = (answer: 'Yes' | 'No') => {
    if (!currentQuestion) return;

    const followUpId = getFollowUpIdForQuestion(currentQuestion.id);
    if (followUpId) {
      setFollowUpAnswers((prev) => ({ ...prev, [followUpId]: answer }));
    }

    moveToNextQuestion();
  };

  const submitPrediction = async () => {
    setStep('processing');
    setError(null);

    try {
      const payload: PredictionRequest = {
        Age_Months: selectedAge || 0,
        Gender: selectedGender || 'Male',
        "Does child respond when called by name?": answers['speech_q1'] || 'Yes',
        "If not, does child react to familiar voices?": followUpAnswers['speech_followup_q1'] !== undefined ? followUpAnswers['speech_followup_q1'] : null,
        "Can child communicate basic needs using words or gestures?": answers['speech_q2'] || 'Yes',
        "If not, does child attempt communication through sounds or pointing?": followUpAnswers['speech_followup_q2'] !== undefined ? followUpAnswers['speech_followup_q2'] : null,
        "Can child walk without support?": answers['motor_q1'] || 'Yes',
        "If not, can child stand while holding furniture?": followUpAnswers['motor_followup_q1'] !== undefined ? followUpAnswers['motor_followup_q1'] : null,
        "Can child climb stairs or furniture independently?": answers['motor_q2'] || 'Yes',
        "If not, can child move independently between locations?": followUpAnswers['motor_followup_q2'] !== undefined ? followUpAnswers['motor_followup_q2'] : null,
        "Does child make eye contact during interaction?": answers['social_q1'] || 'Yes',
        "If not, does child respond to smiling faces?": followUpAnswers['social_followup_q1'] !== undefined ? followUpAnswers['social_followup_q1'] : null,
        "Does child engage in play with caregivers or peers?": answers['social_q2'] || 'Yes',
        "If not, does child show interest when others are playing nearby?": followUpAnswers['social_followup_q2'] !== undefined ? followUpAnswers['social_followup_q2'] : null,
        "Can child identify familiar people or objects?": answers['cognitive_q1'] || 'Yes',
        "If not, can child recognize their primary caregiver?": followUpAnswers['cognitive_followup_q1'] !== undefined ? followUpAnswers['cognitive_followup_q1'] : null,
        "Can child follow age-appropriate instructions?": answers['cognitive_q2'] || 'Yes',
        "If not, can child follow simple one-step commands?": followUpAnswers['cognitive_followup_q2'] !== undefined ? followUpAnswers['cognitive_followup_q2'] : null,
      };

      const result = await predictRisk(payload);
      setPredictionResult(result);
      setStep('result');
    } catch (err: any) {
      console.error("Prediction error:", err);
      setError(err.message || "Failed to get prediction");
      setStep('questions');
    }
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

  const domainProgress = step === 'flashcard' || step === 'questions' ? currentDomainIndex + 1 : 0;

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        {(step === 'flashcard' || step === 'questions') && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-3">
              {FIXED_DOMAINS.map((domain, idx) => (
                <div key={domain.id} className="flex items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      idx < currentDomainIndex
                        ? 'bg-green-500 text-white'
                        : idx === currentDomainIndex
                        ? 'text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                    style={idx === currentDomainIndex ? { background: domain.color } : {}}
                  >
                    {idx < currentDomainIndex ? '✓' : idx + 1}
                  </div>
                  <span
                    className={`text-xs hidden md:inline ${
                      idx === currentDomainIndex ? 'font-semibold text-gray-800' : 'text-gray-400'
                    }`}
                  >
                    {isHindi ? domain.nameHindi : domain.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
                initial={{ width: 0 }}
                animate={{ width: `${(domainProgress / FIXED_DOMAINS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {isHindi
                ? `${currentDomain.nameHindi} (${domainProgress}/${FIXED_DOMAINS.length})`
                : `${currentDomain.name} (${domainProgress}/${FIXED_DOMAINS.length})`
              }
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Age Input */}
          {step === 'age' && (
            <motion.div
              key="age"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'बच्चे की आयु दर्ज करें' : 'Enter Child\'s Age'}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {isHindi ? 'महीनों में आयु (12-72)' : 'Age in months (12-72)'}
              </p>

              <div className="max-w-xs mx-auto mb-8">
                <div className="relative">
                  <input
                    type="number"
                    min={12}
                    max={72}
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAgeSubmit(); }}
                    placeholder={isHindi ? 'महीने' : 'Months'}
                    className="w-full text-center text-5xl font-bold p-8 rounded-2xl outline-none transition-all"
                    style={{
                      color: COLORS.textPrimary,
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: `3px solid ${ageInput && parseInt(ageInput) >= 12 && parseInt(ageInput) <= 72 ? COLORS.primary : '#e5e7eb'}`,
                      boxShadow: ageInput ? `0 8px 24px ${COLORS.primary}30` : '0 4px 16px rgba(0, 0, 0, 0.08)',
                    }}
                  />
                </div>
                <p className="text-center text-sm text-gray-400 mt-2">
                  {isHindi ? '12 से 72 महीने के बीच' : 'Between 12 and 72 months'}
                </p>
                {ageInput && (parseInt(ageInput) < 12 || parseInt(ageInput) > 72) && (
                  <p className="text-center text-sm text-red-500 mt-2">
                    {isHindi ? 'कृपया 12-72 के बीच आयु दर्ज करें' : 'Please enter age between 12-72'}
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <AnimatedButton
                  variant="outline"
                  size="md"
                  onClick={onBack}
                  icon={<ChevronLeft size={18} />}
                  iconPosition="left"
                >
                  {isHindi ? 'वापस' : 'Back'}
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  disabled={!ageInput || parseInt(ageInput) < 12 || parseInt(ageInput) > 72}
                  onClick={handleAgeSubmit}
                  icon={<ChevronRight size={20} />}
                >
                  {isHindi ? 'आगे बढ़ें' : 'Continue'}
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          {/* Step 2: Gender Selection */}
          {step === 'gender' && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'बच्चे का लिंग चुनें' : 'Select Child\'s Gender'}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {isHindi ? 'लिंग चुनें' : 'Select gender'}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
                {['Male', 'Female'].map((gender) => (
                  <motion.button
                    key={gender}
                    className={`p-6 md:p-8 rounded-2xl font-bold text-lg md:text-xl transition-all`}
                    style={{
                      background: selectedGender === gender ? COLORS.primary : 'rgba(255, 255, 255, 0.9)',
                      color: selectedGender === gender ? 'white' : COLORS.textPrimary,
                      boxShadow: selectedGender === gender ? `0 8px 24px ${COLORS.primary}30` : '0 4px 16px rgba(0, 0, 0, 0.08)',
                    }}
                    onClick={() => setSelectedGender(gender as 'Male' | 'Female')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {gender === 'Male' ? (isHindi ? 'लड़का' : 'Male') : (isHindi ? 'लड़की' : 'Female')}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between">
                <AnimatedButton
                  variant="outline"
                  size="md"
                  onClick={() => { setStep('age'); setSelectedAge(null); }}
                  icon={<ChevronLeft size={18} />}
                  iconPosition="left"
                >
                  {isHindi ? 'वापस' : 'Back'}
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  disabled={!selectedGender}
                  onClick={() => {
                    setCurrentDomainIndex(0);
                    setCurrentQuestionIndex(0);
                    setStep('flashcard');
                  }}
                  icon={<ChevronRight size={20} />}
                >
                  {isHindi ? 'आगे बढ़ें' : 'Continue'}
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          {/* Step 3: Domain Flashcard */}
          {step === 'flashcard' && currentDomain && (
            <motion.div
              key={`flashcard-${currentDomain.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.div
                className="p-10 md:p-16 rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${currentDomain.color}10 0%, ${currentDomain.color}05 100%)`,
                  border: `2px solid ${currentDomain.color}20`,
                  boxShadow: `0 12px 40px ${currentDomain.color}15`,
                }}
              >
                {/* Domain Icon */}
                <motion.div
                  className="w-28 h-28 rounded-3xl mx-auto mb-8 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${currentDomain.color}20 0%, ${currentDomain.color}10 100%)` }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {typeof currentDomain.icon === 'string' ? (
                    <span className="text-5xl">{currentDomain.icon}</span>
                  ) : (
                    <currentDomain.icon size={56} style={{ color: currentDomain.color }} />
                  )}
                </motion.div>

                {/* Domain Title */}
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: currentDomain.color }}
                >
                  {isHindi ? currentDomain.nameHindi : currentDomain.name}
                </h2>

                {/* Domain Description */}
                <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                  {isHindi ? currentDomain.descriptionHindi : currentDomain.description}
                </p>

                {/* Start Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    className="px-10 py-5 text-lg rounded-2xl font-semibold flex items-center justify-center gap-3 text-white"
                    style={{
                      background: currentDomain.color,
                      boxShadow: `0 8px 24px ${currentDomain.color}40`,
                    }}
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setStep('questions');
                    }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isHindi ? 'शुरू करें' : 'Begin'}
                    <ArrowRight size={20} />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Questions */}
          {step === 'questions' && currentQuestion && (
            <motion.div
              key={`q-${currentDomain.id}-${currentQuestionIndex}`}
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
                {/* Question number */}
                <div className="text-sm text-gray-400 mb-4 text-center">
                  {isHindi
                    ? `प्रश्न ${currentQuestionIndex + 1}/${currentDomainQuestions.length}`
                    : `Question ${currentQuestionIndex + 1}/${currentDomainQuestions.length}`
                  }
                </div>

                {/* Milestone icon */}
                <motion.div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${currentDomain.color}15 0%, ${currentDomain.color}05 100%)`,
                    border: `1px solid ${currentDomain.color}20`,
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={40} style={{ color: currentDomain.color }} />
                </motion.div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-semibold text-center mb-4" style={{ color: COLORS.textPrimary }}>
                  {isHindi ? currentQuestion.questionHindi : currentQuestion.question}
                </h3>

                {/* Milestone */}
                <p className="text-center text-gray-500 mb-6">
                  {isHindi ? 'मील पत्थर: ' : 'Milestone: '}
                  <span className="font-medium" style={{ color: currentDomain.color }}>
                    {isHindi ? currentQuestion.milestoneHindi : currentQuestion.milestone}
                  </span>
                </p>

                {/* Voice Button */}
                <motion.button
                  className="flex items-center gap-2 mx-auto mb-6 px-4 py-2 rounded-full"
                  style={{ background: `${currentDomain.color}10` }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic size={18} style={{ color: currentDomain.color }} />
                  <span className="text-sm" style={{ color: currentDomain.color }}>
                    {isHindi ? 'आवाज़ सुनें' : 'Listen'}
                  </span>
                </motion.button>

                {/* Answer Buttons */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { value: 'Yes', label: t('yes'), color: COLORS.success, icon: '✓' },
                    { value: 'Sometimes', label: t('sometimes'), color: COLORS.watch, icon: '~' },
                    { value: 'No', label: t('no'), color: COLORS.danger, icon: '✗' },
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
                {error && (
                  <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-center">
                    {error}
                  </div>
                )}
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
                          {getFollowUpQuestion(currentQuestion.domain, currentQuestion.id) && (
                            (() => {
                              const followUpQ = getFollowUpQuestion(currentQuestion.domain, currentQuestion.id)!;
                              return (
                                <>
                                  <p className="text-gray-700 mb-2">
                                    {isHindi ? followUpQ.questionHindi : followUpQ.question}
                                  </p>
                                  <p className="text-sm text-gray-500 mb-4">
                                    {isHindi ? followUpQ.insightHindi : followUpQ.insight}
                                  </p>
                                  <div className="grid grid-cols-2 gap-2">
                                    <motion.button
                                      className="p-3 rounded-xl text-sm font-medium"
                                      style={{ background: `${COLORS.success}15`, color: COLORS.success }}
                                      onClick={() => handleFollowUpAnswer('Yes')}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      {t('yes')}
                                    </motion.button>
                                    <motion.button
                                      className="p-3 rounded-xl text-sm font-medium"
                                      style={{ background: `${COLORS.danger}15`, color: COLORS.danger }}
                                      onClick={() => handleFollowUpAnswer('No')}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      {t('no')}
                                    </motion.button>
                                  </div>
                                </>
                              );
                            })()
                          )}
                        </div>
                      </div>
                    </motion.div>
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
          {step === 'result' && predictionResult && (
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
                    predictionResult.predicted_category === 'Refer Now' ? 'refer' :
                    predictionResult.predicted_category === 'Watch' ? 'watch' : 'on-track'
                  ].gradient,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
              >
                {(() => {
                  const status = predictionResult.predicted_category === 'Refer Now' ? 'refer' :
                                 predictionResult.predicted_category === 'Watch' ? 'watch' : 'on-track';
                  const IconComponent = resultConfig[status].icon;
                  return <IconComponent size={60} color="white" />;
                })()}
              </motion.div>

              {/* Result Text */}
              {(() => {
                const status = predictionResult.predicted_category === 'Refer Now' ? 'refer' :
                               predictionResult.predicted_category === 'Watch' ? 'watch' : 'on-track';
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
                      {predictionResult.predicted_category}
                    </motion.h2>
                    <motion.p
                      className="text-xl mb-2"
                      style={{ color: COLORS.textSecondary }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {predictionResult.recommendation}
                    </motion.p>
                    <motion.p
                      className="text-md mb-8 text-gray-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      Confidence: {(predictionResult.confidence * 100).toFixed(1)}% | Next Action: {predictionResult.next_action}
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
                  const status = predictionResult.predicted_category === 'Refer Now' ? 'refer' :
                                 predictionResult.predicted_category === 'Watch' ? 'watch' : 'on-track';

                  if (status === 'refer') {
                    return (
                      <>
                        <AnimatedButton
                          variant="danger"
                          size="lg"
                          onClick={() => onComplete({ status: 'refer', domains: {}, recommendations: [predictionResult.recommendation], nextSteps: [predictionResult.next_action] })}
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
                          onClick={() => onComplete({ status: 'watch', domains: {}, recommendations: [predictionResult.recommendation], nextSteps: [predictionResult.next_action] })}
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