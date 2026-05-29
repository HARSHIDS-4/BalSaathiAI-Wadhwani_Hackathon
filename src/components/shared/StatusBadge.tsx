import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/design-system';

type StatusType = 'on-track' | 'watch' | 'refer' | 'not-screened' | 'pending' | 'visited' | 'needs-help';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
  className?: string;
}

const statusConfig: Record<StatusType, { bg: string; color: string; gradient: string; labelEn: string; labelHi: string }> = {
  'on-track': {
    bg: COLORS.successLight,
    color: COLORS.success,
    gradient: `linear-gradient(135deg, ${COLORS.success} 0%, #B7E4C7 100%)`,
    labelEn: 'On Track',
    labelHi: 'सही राह पर',
  },
  watch: {
    bg: '#FFE5A0',
    color: COLORS.watch,
    gradient: `linear-gradient(135deg, ${COLORS.watch} 0%, #FFE5A0 100%)`,
    labelEn: 'Watch',
    labelHi: 'निगरानी',
  },
  refer: {
    bg: COLORS.dangerLight,
    color: COLORS.danger,
    gradient: `linear-gradient(135deg, ${COLORS.danger} 0%, ${COLORS.dangerLight} 100%)`,
    labelEn: 'Refer Now',
    labelHi: 'अभी रेफर करें',
  },
  'not-screened': {
    bg: '#E5E7EB',
    color: '#9CA3AF',
    gradient: 'linear-gradient(135deg, #9CA3AF 0%, #E5E7EB 100%)',
    labelEn: 'Not Screened',
    labelHi: 'स्क्रीन नहीं हुआ',
  },
  pending: {
    bg: '#FFE5A0',
    color: COLORS.watch,
    gradient: `linear-gradient(135deg, ${COLORS.watch} 0%, #FFE5A0 100%)`,
    labelEn: 'Pending',
    labelHi: 'बाकी',
  },
  visited: {
    bg: COLORS.successLight,
    color: COLORS.success,
    gradient: `linear-gradient(135deg, ${COLORS.success} 0%, #B7E4C7 100%)`,
    labelEn: 'Visited',
    labelHi: 'मिले',
  },
  'needs-help': {
    bg: COLORS.dangerLight,
    color: COLORS.danger,
    gradient: `linear-gradient(135deg, ${COLORS.danger} 0%, ${COLORS.dangerLight} 100%)`,
    labelEn: 'Needs Help',
    labelHi: 'मदद चाहिए',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showPulse = false, className = '' }) => {
  const config = statusConfig[status];

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full font-semibold inline-flex items-center gap-2 ${className}`}
      style={{
        background: config.gradient,
        color: '#fff',
        boxShadow: `0 4px 12px ${config.color}30`,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {showPulse && (
        <motion.span
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      <span>{config.labelEn}</span>
    </motion.div>
  );
};

export default StatusBadge;
