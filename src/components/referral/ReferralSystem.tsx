import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import { REFERRAL_CENTRES, PARENT_EXPLAINER_STEPS, DEMO_CHILDREN, formatChildAge } from '../../data/demo-data';
import AnimatedButton from '../shared/AnimatedButton';
import GlassCard from '../shared/GlassCard';
import {
  MapPin,
  Phone,
  Clock,
  Landmark,
  MessageCircle,
  Printer,
  Share2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Heart,
  Users,
  BookOpen,
  CheckCircle,
} from 'lucide-react';

interface ReferralSystemProps {
  childId?: string;
  onBack: () => void;
  onComplete: () => void;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ childId, onBack, onComplete }) => {
  const { t, isHindi } = useLanguage();
  const [step, setStep] = useState<'select' | 'centres' | 'explainer' | 'share' | 'complete'>('select');
  const [selectedCentre, setSelectedCentre] = useState<string | null>(null);
  const [explainerStep, setExplainerStep] = useState(0);

  const child = DEMO_CHILDREN[0]; // Demo: Meena

  const handleShare = (method: 'whatsapp' | 'print') => {
    setTimeout(() => {
      setStep('complete');
    }, 1500);
  };

  const generateWhatsAppMessage = () => {
    const centre = REFERRAL_CENTRES.find(c => c.id === selectedCentre);
    if (!centre) return '';

    return isHindi
      ? `🙏 नमस्ते,\n\nआपके बच्चे ${child.nameHindi} की स्क्रीनिंग हुई है। हमें लगता है कि विशेषज्ञ से मिलना अच्छा रहेगा।\n\n🏥 केंद्र: ${centre.nameHindi}\n📍 पता: ${centre.landmarkHindi}\n📞 फोन: ${centre.phone}\n⏰ समय: ${centre.timings}\n\nकोई चिंता नहीं, जल्दी मदद बहुत फायदेमंद होती है। 💪`
      : `🙏 Namaste,\n\nYour child ${child.name} has been screened. We recommend visiting a specialist for further evaluation.\n\n🏥 Centre: ${centre.name}\n📍 Address: ${centre.landmark}\n📞 Phone: ${centre.phone}\n⏰ Timings: ${centre.timings}\n\nNo need to worry, early help is very beneficial. 💪`;
  };

  const currentExplainer = PARENT_EXPLAINER_STEPS[explainerStep];

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Child */}
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'रेफरल बनाएं' : 'Create Referral'}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {isHindi ? 'बच्चे की जानकारी' : 'Child information'}
              </p>

              {/* Child Card */}
              <GlassCard className="mb-8 max-w-xl mx-auto">
                <div className="flex items-center gap-4">
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="w-20 h-20 rounded-2xl object-cover"
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
                          <rect width="120" height="120" rx="24" fill="url(#g)" />
                          <circle cx="60" cy="48" r="22" fill="rgba(255,255,255,0.88)" />
                          <path d="M30 105c7-20 21-30 30-30s23 10 30 30" fill="rgba(255,255,255,0.88)" />
                        </svg>
                      `)}`;
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>
                      {isHindi ? child.nameHindi : child.name}
                    </h3>
                    <p className="text-gray-500">{formatChildAge(child.age, isHindi)}</p>
                    <p className="text-sm" style={{ color: COLORS.danger }}>
                      {isHindi ? 'विशेषज्ञ से मिलें' : 'Visit Specialist'}
                    </p>
                  </div>
                </div>
              </GlassCard>

              <div className="flex justify-center">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={() => setStep('centres')}
                  icon={<ChevronRight size={20} />}
                >
                  {isHindi ? 'रेफरल केंद्र देखें' : 'View Referral Centres'}
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Centre */}
          {step === 'centres' && (
            <motion.div
              key="centres"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'नजदीकी केंद्र' : 'Nearby Centres'}
              </h2>
              <p className="text-center text-gray-600 mb-8">
                {isHindi ? 'सबसे नजदीकी रेफरल केंद्र चुनें' : 'Select the nearest referral centre'}
              </p>

              <div className="space-y-4 mb-8">
                {REFERRAL_CENTRES.map((centre, i) => (
                  <motion.div
                    key={centre.id}
                    className={`p-6 rounded-2xl cursor-pointer transition-all`}
                    style={{
                      background: selectedCentre === centre.id ? `${COLORS.primary}10` : 'rgba(255, 255, 255, 0.9)',
                      border: selectedCentre === centre.id ? `2px solid ${COLORS.primary}` : '2px solid transparent',
                      boxShadow: selectedCentre === centre.id ? `0 8px 24px ${COLORS.primary}20` : '0 2px 12px rgba(0, 0, 0, 0.06)',
                    }}
                    onClick={() => setSelectedCentre(centre.id)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ background: COLORS.primaryLight, color: 'white' }}
                          >
                            {centre.type}
                          </span>
                          <span className="text-sm text-gray-500">{centre.distance}</span>
                        </div>

                        <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.textPrimary }}>
                          {isHindi ? centre.nameHindi : centre.name}
                        </h3>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} style={{ color: COLORS.primary }} />
                            <span>{isHindi ? centre.landmarkHindi : centre.landmark}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={16} style={{ color: COLORS.accent }} />
                            <span>{centre.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} style={{ color: COLORS.success }} />
                            <span>{centre.timings}</span>
                          </div>
                        </div>
                      </div>

                      {selectedCentre === centre.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <CheckCircle size={24} style={{ color: COLORS.primary }} />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between">
                <AnimatedButton
                  variant="outline"
                  size="md"
                  onClick={() => setStep('select')}
                  icon={<ChevronLeft size={18} />}
                  iconPosition="left"
                >
                  {isHindi ? 'वापस' : 'Back'}
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  disabled={!selectedCentre}
                  onClick={() => setStep('explainer')}
                  icon={<ChevronRight size={20} />}
                >
                  {isHindi ? 'माता-पिता को समझाएं' : 'Explain to Parent'}
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          {/* Step 3: Parent Explainer (Comics-style) */}
          {step === 'explainer' && currentExplainer && (
            <motion.div
              key="explainer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'समझाएं' : 'Understanding'}
              </h2>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-8">
                {PARENT_EXPLAINER_STEPS.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full`}
                    style={{
                      background: i <= explainerStep ? COLORS.primary : '#E5E7EB',
                      width: i === explainerStep ? 24 : 8,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              {/* Explainer Card */}
              <GlassCard className="mb-8 max-w-2xl mx-auto">
                <motion.div
                  key={explainerStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  {/* Illustration placeholder */}
                  <motion.div
                    className="w-full h-48 md:h-64 rounded-2xl mb-6 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.primary}10 0%, ${COLORS.accent}10 100%)`,
                    }}
                  >
                    {currentExplainer.illustration === 'screening' && (
                      <Users size={80} style={{ color: COLORS.primary, opacity: 0.5 }} />
                    )}
                    {currentExplainer.illustration === 'early-help' && (
                      <Heart size={80} style={{ color: COLORS.accent, opacity: 0.5 }} />
                    )}
                    {currentExplainer.illustration === 'referral-centre' && (
                      <Landmark size={80} style={{ color: COLORS.success, opacity: 0.5 }} />
                    )}
                    {currentExplainer.illustration === 'parent-love' && (
                      <Heart size={80} style={{ color: COLORS.danger, opacity: 0.5 }} />
                    )}
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-center" style={{ color: COLORS.textPrimary }}>
                    {isHindi ? currentExplainer.titleHindi : currentExplainer.title}
                  </h3>
                  <p className="text-center text-gray-600 text-lg">
                    {isHindi ? currentExplainer.descriptionHindi : currentExplainer.description}
                  </p>
                </motion.div>
              </GlassCard>

              {/* Navigation */}
              <div className="flex justify-between max-w-2xl mx-auto">
                <AnimatedButton
                  variant="outline"
                  size="md"
                  disabled={explainerStep === 0}
                  onClick={() => setExplainerStep(prev => prev - 1)}
                  icon={<ChevronLeft size={18} />}
                  iconPosition="left"
                >
                  {isHindi ? 'पिछला' : 'Previous'}
                </AnimatedButton>

                {explainerStep < PARENT_EXPLAINER_STEPS.length - 1 ? (
                  <AnimatedButton
                    variant="primary"
                    size="lg"
                    onClick={() => setExplainerStep(prev => prev + 1)}
                    icon={<ChevronRight size={20} />}
                  >
                    {isHindi ? 'आगे' : 'Next'}
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    variant="primary"
                    size="lg"
                    onClick={() => setStep('share')}
                    icon={<Share2 size={20} />}
                  >
                    {isHindi ? 'शेयर करें' : 'Share'}
                  </AnimatedButton>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Share */}
          {step === 'share' && (
            <motion.div
              key="share"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'रेफरल शेयर करें' : 'Share Referral'}
              </h2>
              <p className="text-gray-600 mb-8">
                {isHindi ? 'माता-पिता को रेफरल भेजें' : 'Send referral to parent'}
              </p>

              {/* Message Preview */}
              <GlassCard className="mb-8 max-w-xl mx-auto text-left">
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: COLORS.success }}
                  >
                    <MessageCircle size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-2">WhatsApp</div>
                    <div
                      className="p-4 rounded-xl text-sm whitespace-pre-line"
                      style={{ background: '#DCF8C6' }}
                    >
                      {generateWhatsAppMessage()}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  variant="success"
                  size="lg"
                  onClick={() => handleShare('whatsapp')}
                  icon={<MessageCircle size={20} />}
                  iconPosition="left"
                >
                  {t('sendWhatsApp')}
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare('print')}
                  icon={<Printer size={20} />}
                  iconPosition="left"
                >
                  {t('printReferral')}
                </AnimatedButton>
              </div>

              <AnimatedButton
                variant="ghost"
                size="md"
                className="mt-6"
                onClick={() => setStep('explainer')}
              >
                {isHindi ? 'वापस समझाएं' : 'Explain Again'}
              </AnimatedButton>
            </motion.div>
          )}

          {/* Step 5: Complete */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.success} 0%, ${COLORS.successLight} 100%)`,
                  boxShadow: `0 20px 60px ${COLORS.success}30`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <CheckCircle size={60} color="white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'रेफरल भेजा गया!' : 'Referral Sent!'}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {isHindi
                  ? 'माता-पिता को WhatsApp पर संदेश भेज दिया गया है'
                  : 'Message sent to parent via WhatsApp'}
              </p>

              <AnimatedButton variant="primary" size="lg" onClick={onComplete} icon={<ChevronRight size={20} />}>
                {isHindi ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}
              </AnimatedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReferralSystem;
