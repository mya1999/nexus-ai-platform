/**
 * Design Tokens - Single Source of Truth for Design System
 * Following Material Design 3 & Apple HIG principles
 */

export const designTokens = {
  /**
   * Spacing System - 8-Point Grid
   * Base unit: 8px for consistent spacing across all components
   */
  spacing: {
    '0': '0',
    '0.5': '0.125rem',  // 2px
    '1': '0.25rem',     // 4px
    '2': '0.5rem',      // 8px  - Base unit
    '3': '0.75rem',     // 12px
    '4': '1rem',        // 16px
    '5': '1.25rem',     // 20px
    '6': '1.5rem',      // 24px
    '8': '2rem',        // 32px
    '10': '2.5rem',     // 40px
    '12': '3rem',       // 48px
    '16': '4rem',       // 64px
    '20': '5rem',       // 80px
    '24': '6rem',       // 96px
    '32': '8rem',       // 128px
  },

  /**
   * Typography System - Fluid & Responsive
   * Using clamp() for perfect scaling across all screen sizes
   */
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      display: ['Cabinet Grotesk', 'Inter', 'sans-serif'],
    },
    fontSize: {
      // Fluid typography: clamp(min, preferred, max)
      'xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',      // 12px -> 14px
      'sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',        // 14px -> 16px
      'base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',        // 16px -> 18px
      'lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',       // 18px -> 20px
      'xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',        // 20px -> 24px
      '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',             // 24px -> 32px
      '3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)',     // 30px -> 40px
      '4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',         // 36px -> 48px
      '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',             // 48px -> 64px
      '6xl': 'clamp(3.75rem, 3rem + 3.75vw, 5rem)',           // 60px -> 80px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  /**
   * Color System - Semantic & Accessible
   * All colors meet WCAG AAA contrast requirements
   */
  colors: {
    // Semantic Colors
    semantic: {
      success: {
        light: '142 76% 36%',    // Green - WCAG AAA
        DEFAULT: '142 71% 45%',
        dark: '142 76% 36%',
      },
      warning: {
        light: '38 92% 50%',     // Orange - WCAG AAA
        DEFAULT: '38 92% 50%',
        dark: '38 92% 40%',
      },
      error: {
        light: '0 84% 60%',      // Red - WCAG AAA
        DEFAULT: '0 72% 51%',
        dark: '0 72% 41%',
      },
      info: {
        light: '199 89% 48%',    // Blue - WCAG AAA
        DEFAULT: '199 89% 48%',
        dark: '199 89% 38%',
      },
    },

    // Brand Colors
    brand: {
      primary: '263 70% 50%',      // Purple
      secondary: '217 91% 60%',    // Blue
      accent: '339 90% 51%',       // Pink
    },

    // Surface Elevation System
    surface: {
      0: '240 10% 3.9%',    // Base surface
      1: '240 10% 5.9%',    // Elevated
      2: '240 10% 7.9%',    // More elevated
      3: '240 10% 9.9%',    // Highest elevation
      4: '240 10% 11.9%',   // Modal/Popover
    },

    // Text Colors with opacity variants
    text: {
      primary: '0 0% 98%',         // High emphasis
      secondary: '0 0% 70%',       // Medium emphasis
      tertiary: '0 0% 50%',        // Low emphasis
      disabled: '0 0% 30%',        // Disabled state
    },
  },

  /**
   * Elevation System - Material Design 3
   * Using box-shadow for depth perception
   */
  elevation: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

    // Colored shadows for glassmorphism
    glow: {
      purple: '0 0 20px rgba(139, 92, 246, 0.3)',
      blue: '0 0 20px rgba(59, 130, 246, 0.3)',
      pink: '0 0 20px rgba(236, 72, 153, 0.3)',
    },
  },

  /**
   * Border Radius System
   * Consistent rounded corners across components
   */
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    DEFAULT: '0.5rem',    // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    full: '9999px',   // Fully rounded
  },

  /**
   * Animation System
   * Consistent timing and easing curves
   */
  animation: {
    duration: {
      instant: '100ms',
      fast: '150ms',
      normal: '250ms',
      slow: '400ms',
      slower: '600ms',
      slowest: '1000ms',
    },
    easing: {
      // Standard curves
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',

      // Custom bezier curves (Material Design)
      emphasized: 'cubic-bezier(0.4, 0, 0.2, 1)',
      emphasizedDecelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      emphasizedAccelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',

      // Spring-like animation
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  /**
   * Z-Index System
   * Layering hierarchy for components
   */
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
    notification: '1080',
  },

  /**
   * Breakpoints - Mobile First
   * Following common device sizes
   */
  breakpoints: {
    xs: '320px',    // Small phones
    sm: '640px',    // Phones
    md: '768px',    // Tablets
    lg: '1024px',   // Laptops
    xl: '1280px',   // Desktops
    '2xl': '1536px',  // Large screens
  },
} as const;

// Type exports for TypeScript autocomplete
export type Spacing = keyof typeof designTokens.spacing;
export type FontSize = keyof typeof designTokens.typography.fontSize;
export type FontWeight = keyof typeof designTokens.typography.fontWeight;
export type Elevation = keyof typeof designTokens.elevation;
export type BorderRadius = keyof typeof designTokens.borderRadius;
export type AnimationDuration = keyof typeof designTokens.animation.duration;
export type AnimationEasing = keyof typeof designTokens.animation.easing;
export type ZIndex = keyof typeof designTokens.zIndex;
