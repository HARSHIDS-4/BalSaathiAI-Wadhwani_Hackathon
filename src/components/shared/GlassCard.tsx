import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { COLORS, SHADOWS, RADII } from '../../constants/design-system';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
  hover3D?: boolean;
  glow?: 'primary' | 'accent' | 'success' | 'watch' | 'danger' | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'elevated' | 'bordered';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  animate = true,
  hover3D = true,
  glow = 'none',
  padding = 'lg',
  variant = 'elevated',
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const glowColors = {
    primary: `0 0 60px rgba(45, 106, 79, 0.2)`,
    accent: `0 0 60px rgba(244, 162, 97, 0.25)`,
    success: `0 0 60px rgba(82, 183, 136, 0.2)`,
    watch: `0 0 60px rgba(255, 183, 3, 0.2)`,
    danger: `0 0 60px rgba(230, 57, 70, 0.15)`,
    none: 'none',
  };

  const variants = {
    default: `background-blur: 20px;`,
    elevated: 'backdrop-filter: blur(24px);',
    bordered: `border: 1px solid rgba(255, 255, 255, 0.3);`,
  };

  return (
    <motion.div
      className={`${paddingClasses[padding]} rounded-2xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 246, 234, 0.7) 100%)`,
        boxShadow: glow !== 'none' ? `${SHADOWS.floating}, ${glowColors[glow]}` : SHADOWS.card,
        border: variant === 'bordered' ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={onClick}
      initial={animate ? { opacity: 0, y: 20, scale: 0.95 } : false}
      animate={animate ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={
        hover3D
          ? {
              scale: 1.02,
              y: -5,
              boxShadow: glow !== 'none' ? `${SHADOWS.xl}, ${glowColors[glow]}` : SHADOWS.floating,
              transition: { duration: 0.3 },
            }
          : {}
      }
      whileTap={onClick ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
