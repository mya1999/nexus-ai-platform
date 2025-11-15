/**
 * Advanced Button Component
 * Following Material Design 3 and Apple HIG principles
 * Implements Design System tokens and motion variants
 */

'use client';

import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

// Button Variants
const buttonVariants = {
  // Variant styles
  variant: {
    primary: 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-surface-2 hover:bg-surface-3 text-foreground border border-white/10',
    success: 'bg-success hover:bg-success/90 text-white shadow-md hover:shadow-lg',
    warning: 'bg-warning hover:bg-warning/90 text-white shadow-md hover:shadow-lg',
    error: 'bg-error hover:bg-error/90 text-white shadow-md hover:shadow-lg',
    ghost: 'hover:bg-surface-1 text-foreground',
    link: 'text-brand-primary hover:text-brand-primary/80 underline-offset-4 hover:underline',
    outline:
      'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
  },

  // Size styles
  size: {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-base rounded-lg',
    lg: 'h-12 px-6 text-lg rounded-xl',
    xl: 'h-14 px-8 text-xl rounded-2xl',
    icon: 'h-10 w-10 rounded-lg',
  },

  // State styles
  state: {
    default: '',
    loading: 'cursor-wait opacity-80',
    disabled: 'cursor-not-allowed opacity-50',
  },
};

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const ButtonAdvanced = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'font-medium transition-all duration-normal',
          'focus-visible:ring-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',

          // Variant styles
          buttonVariants.variant[variant],

          // Size styles
          buttonVariants.size[size],

          // State styles
          loading && buttonVariants.state.loading,
          isDisabled && buttonVariants.state.disabled,

          // Full width
          fullWidth && 'w-full',

          // Custom className
          className
        )}
        disabled={isDisabled}
        // Motion effects
        whileHover={isDisabled ? undefined : { scale: 1.02 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}

        {!loading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {children}

        {!loading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

ButtonAdvanced.displayName = 'ButtonAdvanced';

export { ButtonAdvanced, buttonVariants };
