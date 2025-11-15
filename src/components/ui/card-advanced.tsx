/**
 * Advanced Card Component
 * Implements elevation system and glassmorphism effects
 */

'use client';

import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';
import * as React from 'react';

const cardVariants = {
  elevation: {
    flat: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },

  surface: {
    0: 'bg-surface-0',
    1: 'bg-surface-1',
    2: 'bg-surface-2',
    3: 'bg-surface-3',
    4: 'bg-surface-4',
  },

  border: {
    none: 'border-0',
    subtle: 'border border-white/5',
    default: 'border border-white/10',
    strong: 'border border-white/20',
  },

  glow: {
    none: '',
    purple: 'shadow-glow-purple',
    blue: 'shadow-glow-blue',
    pink: 'shadow-glow-pink',
  },
};

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  elevation?: keyof typeof cardVariants.elevation;
  surface?: keyof typeof cardVariants.surface;
  border?: keyof typeof cardVariants.border;
  glow?: keyof typeof cardVariants.glow;
  glassmorphism?: boolean;
  hoverable?: boolean;
  pressable?: boolean;
  children?: React.ReactNode;
}

const CardAdvanced = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      elevation = 'md',
      surface = 2,
      border = 'subtle',
      glow = 'none',
      glassmorphism = false,
      hoverable = false,
      pressable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'overflow-hidden rounded-2xl transition-all duration-normal',

          // Surface level
          !glassmorphism && cardVariants.surface[surface],

          // Glassmorphism effect
          glassmorphism && 'bg-surface-2/50 backdrop-blur-xl',

          // Elevation
          cardVariants.elevation[elevation],

          // Border
          cardVariants.border[border],

          // Glow effect
          cardVariants.glow[glow],

          // Custom className
          className
        )}
        // Hover effect
        whileHover={
          hoverable ? { y: -4, transition: { duration: 0.2, ease: 'easeOut' } } : undefined
        }
        // Press effect
        whileTap={pressable ? { scale: 0.98, transition: { duration: 0.1 } } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

CardAdvanced.displayName = 'CardAdvanced';

// Sub-components for better composition
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-2xl font-bold tracking-tight', className)} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('mt-2 text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-4', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  CardAdvanced,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
