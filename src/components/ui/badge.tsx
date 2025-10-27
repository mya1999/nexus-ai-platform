'use client';

import { HTMLAttributes } from 'react';

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
    primary: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    neutral: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
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
