/**
 * Skeleton Loading Components
 * Provides visual feedback during content loading
 */

'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', animation = 'pulse', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface-2',
          // Variant styles
          variant === 'text' && 'h-4 rounded',
          variant === 'circular' && 'rounded-full',
          variant === 'rectangular' && 'rounded-lg',

          // Animation styles
          animation === 'pulse' && 'animate-pulse',
          animation === 'wave' &&
            'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',

          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

// Pre-built skeleton patterns
const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className,
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={`skeleton-text-${i}-${lines}`}
        variant="text"
        className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')}
      />
    ))}
  </div>
);

const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return <Skeleton variant="circular" className={cn(sizeClasses[size], className)} />;
};

const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('bg-surface-1 space-y-4 rounded-2xl p-6', className)}>
    <div className="flex items-center gap-4">
      <SkeletonAvatar size="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="h-5 w-32" />
        <Skeleton variant="text" className="h-4 w-48" />
      </div>
    </div>
    <SkeletonText lines={4} />
    <div className="flex gap-2">
      <Skeleton className="h-10 w-24 rounded-lg" />
      <Skeleton className="h-10 w-24 rounded-lg" />
    </div>
  </div>
);

const SkeletonChatMessage: React.FC<{ isUser?: boolean }> = ({ isUser = false }) => (
  <div className={cn('mb-4 flex items-start gap-3', isUser && 'flex-row-reverse')}>
    <SkeletonAvatar />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <Skeleton variant="text" className="h-4 w-4/6" />
    </div>
  </div>
);

const SkeletonList: React.FC<{ items?: number; className?: string }> = ({
  items = 5,
  className,
}) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={`skeleton-list-item-${i}-${items}`} className="flex items-center gap-3">
        <SkeletonAvatar size="sm" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="h-4 w-2/3" />
          <Skeleton variant="text" className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonChatMessage, SkeletonList, SkeletonText };
