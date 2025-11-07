/**
 * Motion Design System
 * Consistent animations and transitions across the application
 * Based on Material Design Motion principles
 */

/**
 * Animation Variants for Framer Motion
 */
export const motionVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
  },

  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  scaleInCenter: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      scale: { type: 'spring', stiffness: 300, damping: 25 }
    }
  },

  // Slide animations
  slideInFromRight: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },

  slideInFromLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },

  slideInFromTop: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },

  slideInFromBottom: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },

  // Stagger children animation
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },

  // Modal/Dialog animations
  modalOverlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },

  modalContent: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      scale: { type: 'spring', stiffness: 300, damping: 25 }
    }
  },

  // Drawer animations
  drawerOverlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },

  drawerContent: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },

  // Collapse/Expand animations
  collapse: {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  // Rotation animations
  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  },

  // Loading animations
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  },

  spin: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }
  },

  bounce: {
    animate: {
      y: [0, -10, 0],
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  },
} as const;

/**
 * Hover/Tap effects for interactive elements
 */
export const interactionEffects = {
  // Button interactions
  buttonPress: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },

  buttonPressStrong: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },

  // Card interactions
  cardHover: {
    whileHover: { y: -4, transition: { duration: 0.2 } },
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  },

  cardPress: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },

  // Icon interactions
  iconSpin: {
    whileHover: { rotate: 360 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  },

  iconBounce: {
    whileHover: { y: -2 },
    whileTap: { y: 0 },
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  },

  // Link interactions
  linkUnderline: {
    whileHover: { scaleX: 1 },
    initial: { scaleX: 0 },
    transition: { duration: 0.2 }
  },
} as const;

/**
 * Page transition variants
 */
export const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },

  slide: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },

  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
} as const;

/**
 * Skeleton loading animation
 */
export const skeletonAnimation = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear',
  },
} as const;

/**
 * Custom spring configurations
 */
export const springConfigs = {
  // Gentle spring
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
  },

  // Default spring
  default: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
  },

  // Bouncy spring
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 15,
  },

  // Stiff spring (fast)
  stiff: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
  },

  // Slow spring
  slow: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
  },
} as const;

// Type exports
export type MotionVariant = keyof typeof motionVariants;
export type InteractionEffect = keyof typeof interactionEffects;
export type PageTransition = keyof typeof pageTransitions;
export type SpringConfig = keyof typeof springConfigs;
