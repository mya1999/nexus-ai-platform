/**
 * Advanced UI Components - Centralized Export
 * All components follow Design System tokens and motion principles
 */

// Advanced Components
export { ButtonAdvanced, buttonVariants } from './button-advanced';
export type { ButtonProps } from './button-advanced';

export {
  CardAdvanced,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from './card-advanced';
export type { CardProps } from './card-advanced';

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonChatMessage,
  SkeletonList,
} from './skeleton-advanced';

export { ToastContainer, useToastAdvanced } from './toast-advanced';

// Legacy Components (for backwards compatibility)
export { default as Button } from './button';
export { default as Card } from './card';
export { default as Badge } from './badge';
export { default as Input } from './input';
export { default as Modal } from './modal';
export { Toaster } from './toaster';
export { useToast } from './use-toast';
