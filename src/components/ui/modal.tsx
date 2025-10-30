'use client';

import { useEffect, useState } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlay?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlay = true,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full m-4',
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-all duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Overlay */}
      <div
        className={`
          absolute inset-0 bg-black/90 backdrop-blur-md
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Modal Content */}
      <div
        className={`
          relative w-full ${sizes[size]} gradient-dark border border-white/10
          rounded-2xl shadow-luxury
          transform transition-all duration-300
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                       hover:bg-white/10 text-gray-400 hover:text-white
                       transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
