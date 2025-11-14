'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
            <div className="max-w-md text-center">
              <h2 className="mb-4 text-2xl font-bold">عذراً، حدث خطأ غير متوقع</h2>
              <p className="mb-6 text-gray-400">
                نحن نعمل على إصلاح المشكلة. يرجى تحديث الصفحة أو المحاولة مرة أخرى لاحقاً.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-xl bg-white px-6 py-3 font-bold text-black transition-transform hover:scale-105"
              >
                تحديث الصفحة
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
