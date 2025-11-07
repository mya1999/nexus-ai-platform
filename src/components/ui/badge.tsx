'use client';

import type { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  pulse?: boolean;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  pulse = false,
  className = '',
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-white/10 text-white border-white/30',
    success: 'bg-white/10 text-gray-200 border-green-500/50',
    warning: 'bg-white/10 text-gray-200 border-yellow-500/50',
    danger: 'bg-white/10 text-gray-200 border-red-500/50',
    info: 'bg-white/10 text-gray-200 border-gray-500/50',
    neutral: 'bg-black/50 text-gray-300 border-gray-500/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        transition-all duration-300
        ${variants[variant]} ${sizes[size]}
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
