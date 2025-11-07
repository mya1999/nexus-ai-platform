'use client';

import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl';

    const variants = {
      primary: 'bg-white text-black hover:bg-gray-200 shadow-luxury-white hover:shadow-2xl hover:scale-105',
      secondary: 'bg-black/50 hover:bg-black/70 text-white border border-white/20 hover:border-white/40 backdrop-blur-xl',
      ghost: 'bg-transparent hover:bg-white/5 text-gray-300 hover:text-white',
      danger: 'bg-gray-800 hover:bg-gray-900 text-white border border-red-500/50 hover:border-red-500',
      success: 'bg-gray-800 hover:bg-gray-900 text-white border border-green-500/50 hover:border-green-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3.5 text-lg',
      xl: 'px-9 py-4 text-xl',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
