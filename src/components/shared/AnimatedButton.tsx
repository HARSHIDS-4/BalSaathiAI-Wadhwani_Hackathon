import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/design-system';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'accent' | 'success' | 'watch' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'lg',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  disabled = false,
  loading = false,
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-xl rounded-3xl',
  };

  const variantStyles = {
    primary: {
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
      color: COLORS.white,
      boxShadow: `0 4px 14px rgba(45, 106, 79, 0.35)`,
    },
    accent: {
      background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accentLight} 100%)`,
      color: COLORS.textPrimary,
      boxShadow: `0 4px 14px rgba(244, 162, 97, 0.35)`,
    },
    success: {
      background: `linear-gradient(135deg, ${COLORS.success} 0%, ${COLORS.successLight} 100%)`,
      color: COLORS.white,
      boxShadow: `0 4px 14px rgba(82, 183, 136, 0.35)`,
    },
    watch: {
      background: `linear-gradient(135deg, ${COLORS.watch} 0%, #FFE5A0 100%)`,
      color: COLORS.textPrimary,
      boxShadow: `0 4px 14px rgba(255, 183, 3, 0.35)`,
    },
    danger: {
      background: `linear-gradient(135deg, ${COLORS.danger} 0%, ${COLORS.dangerLight} 100%)`,
      color: COLORS.white,
      boxShadow: `0 4px 14px rgba(230, 57, 70, 0.35)`,
    },
    outline: {
      background: 'transparent',
      color: COLORS.primary,
      boxShadow: 'none',
      border: `2px solid ${COLORS.primary}`,
    },
    ghost: {
      background: 'rgba(255, 255, 255, 0.7)',
      color: COLORS.textPrimary,
      boxShadow: SHADOWS_CARD,
      border: 'none',
    },
  };

  const SHADOWS_CARD = '0 4px 16px rgba(0, 0, 0, 0.08)';

  const hoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -3,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    tap: {
      scale: 0.97,
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.button
      className={`${sizeClasses[size]} font-semibold flex items-center justify-center gap-3 ${fullWidth ? 'w-full' : ''} ${className} transition-colors`}
      style={{
        ...variantStyles[variant],
        fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
      }}
      onClick={onClick}
      disabled={disabled || loading}
      initial="rest"
      whileHover={!disabled ? "hover" : "rest"}
      whileTap={!disabled ? "tap" : "rest"}
      variants={hoverVariants}
    >
      {loading ? (
        <motion.div
          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </motion.button>
  );
};

export default AnimatedButton;
