'use client';

import { cn } from '@/lib/utils';
import { cubicBezier, motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import React from 'react';

interface BrandLogoProps extends HTMLMotionProps<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const sizeClasses = {
  sm: 'size-12',
  md: 'size-16',
  lg: 'size-24',
  xl: 'size-32',
};

const BrandLogoLuminous = React.forwardRef<HTMLDivElement, BrandLogoProps>(
  ({ className, size = 'md', animated = false, ...props }, ref) => {
    const logoSizeClass = sizeClasses[size] || sizeClasses.md;

    const entranceEase = cubicBezier(0.16, 1, 0.3, 1);

    const containerVariants: Variants = {
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: entranceEase },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center rounded-full',
          'bg-canvas-subtle/50 backdrop-blur-lg',
          'border border-white/20 shadow-lg shadow-black/5',
          logoSizeClass,
          className
        )}
        variants={animated ? containerVariants : undefined}
        initial={animated ? 'initial' : undefined}
        animate={animated ? 'animate' : undefined}
        {...props}
      >
        {/* Inner Gradient Emblem */}
        <div
          className={cn(
            'absolute inset-0 scale-[0.6] rounded-full',
            'from-brand-400 to-brand-600 bg-gradient-to-br',
            'opacity-80'
          )}
        />
        {/* Animated Shimmer */}
        {animated && (
          <div
            className={cn(
              'absolute inset-0 overflow-hidden rounded-full',
              'animate-shimmer bg-[linear-gradient(110deg,#0001,45%,#fff,55%,#0001)]',
              'bg-[length:200%_100%]'
            )}
          />
        )}
      </motion.div>
    );
  }
);

BrandLogoLuminous.displayName = 'BrandLogoLuminous';

export default BrandLogoLuminous;
