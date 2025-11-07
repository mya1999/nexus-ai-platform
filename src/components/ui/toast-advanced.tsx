/**
 * Advanced Toast Notification Component
 * With semantic colors and animations
 */

'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import * as React from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

const toastIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: 'bg-success/10 border-success/20 text-success',
  error: 'bg-error/10 border-error/20 text-error',
  warning: 'bg-warning/10 border-warning/20 text-warning',
  info: 'bg-info/10 border-info/20 text-info',
};

interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const Icon = toastIcons[toast.type];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm',
        'shadow-xl min-w-[320px] max-w-md',
        toastStyles[toast.type]
      )}
    >
      <Icon className="w-5 h-5 mt-0.5 shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{toast.title}</p>
        {toast.description && (
          <p className="text-xs mt-1 opacity-80">{toast.description}</p>
        )}
      </div>

      <button
        onClick={() => onClose(toast.id)}
        className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Toast Container Component
export const ToastContainer: React.FC<{ toasts: Toast[]; onClose: (id: string) => void }> = ({
  toasts,
  onClose,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-notification pointer-events-none">
      <div className="flex flex-col gap-2 pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={onClose} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Toast Hook
export const useToastAdvanced = () => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substring(7);
      setToasts((prev) => [...prev, { ...toast, id }]);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = React.useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'success', title, description });
    },
    [addToast]
  );

  const error = React.useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'error', title, description });
    },
    [addToast]
  );

  const warning = React.useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'warning', title, description });
    },
    [addToast]
  );

  const info = React.useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'info', title, description });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
};
