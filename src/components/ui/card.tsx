'use client';

import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'glass' | 'bordered';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      hover = false,
      padding = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl transition-all duration-300';

    const variants = {
      default: 'bg-slate-900/50 border border-white/10',
      gradient: 'bg-gradient-to-br from-slate-900/80 to-blue-900/30 border border-white/10',
      glass: 'backdrop-blur-xl bg-white/5 border border-white/10',
      bordered: 'bg-transparent border-2 border-slate-700 hover:border-blue-500',
    };

    const hoverStyles = hover
      ? 'hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer hover:border-blue-500/50'
      : '';

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
