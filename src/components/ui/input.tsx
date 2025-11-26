'use client';

import type { InputHTMLAttributes } from 'react';
import { forwardRef, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = false, className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && <label className="mb-2 block text-sm font-medium text-gray-300">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-500 focus:border-white focus:bg-black/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${icon ? 'pr-12' : ''} ${error ? 'border-red-500 focus:border-red-500' : ''} ${isFocused ? 'shadow-luxury' : ''} ${className} `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
            <span>⚠️</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
