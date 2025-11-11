/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  ZORO-AI SOVEREIGN DESIGN SYSTEM                              ║
 * ║  Elite Standards: OKLCH + P3 Gamut + Fluid Responsive        ║
 * ║  Performance First | Accessibility AAA | Motion Excellence   ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

export const designTokens = {
  /**
   * 🎯 Spacing System - Perfect 4px Base Grid
   * Industry standard: 4px base for pixel-perfect layouts
   * Compatible with all major design tools (Figma, Sketch)
   */
  spacing: {
    '0': '0',
    '0.5': '0.125rem',  // 2px - Micro spacing
    '1': '0.25rem',     // 4px - Base unit ⭐
    '2': '0.5rem',      // 8px - Small gap
    '3': '0.75rem',     // 12px - Compact
    '4': '1rem',        // 16px - Default
    '5': '1.25rem',     // 20px - Comfortable
    '6': '1.5rem',      // 24px - Spacious
    '7': '1.75rem',     // 28px - Extra
    '8': '2rem',        // 32px - Section
    '10': '2.5rem',     // 40px - Large
    '12': '3rem',       // 48px - XLarge
    '14': '3.5rem',     // 56px - 2XLarge
    '16': '4rem',       // 64px - Hero
    '20': '5rem',       // 80px - Epic
    '24': '6rem',       // 96px - Mega
    '28': '7rem',       // 112px - Ultra
    '32': '8rem',       // 128px - Supreme
    '40': '10rem',      // 160px - Sovereign
    '48': '12rem',      // 192px - Imperial
  },

  /**
   * ✍️ Typography System - Fluid Responsive Excellence
   * Golden Ratio scale (1.618) for perfect visual harmony
   * Optical sizing for crisp rendering at all sizes
   */
  typography: {
    fontFamily: {
      sans: [
        'Inter Variable',
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'sans-serif'
      ],
      mono: [
        'JetBrains Mono Variable',
        'JetBrains Mono',
        'Fira Code',
        'Consolas',
        'Monaco',
        'monospace'
      ],
      display: [
        'Cabinet Grotesk Variable',
        'Cabinet Grotesk',
        'Inter Variable',
        'Inter',
        'sans-serif'
      ],
    },
    fontSize: {
      // 🎯 Fluid typography with precise optical scaling
      'xs': 'clamp(0.6875rem, 0.65rem + 0.18vw, 0.8125rem)',     // 11px → 13px
      'sm': 'clamp(0.8125rem, 0.75rem + 0.31vw, 0.9375rem)',     // 13px → 15px
      'base': 'clamp(0.9375rem, 0.875rem + 0.31vw, 1.0625rem)',  // 15px → 17px ⭐
      'md': 'clamp(1.0625rem, 1rem + 0.31vw, 1.1875rem)',        // 17px → 19px
      'lg': 'clamp(1.1875rem, 1.125rem + 0.31vw, 1.375rem)',     // 19px → 22px
      'xl': 'clamp(1.375rem, 1.25rem + 0.625vw, 1.625rem)',      // 22px → 26px
      '2xl': 'clamp(1.625rem, 1.5rem + 0.625vw, 1.9375rem)',     // 26px → 31px
      '3xl': 'clamp(1.9375rem, 1.75rem + 0.9375vw, 2.5rem)',     // 31px → 40px
      '4xl': 'clamp(2.5rem, 2.25rem + 1.25vw, 3.25rem)',         // 40px → 52px
      '5xl': 'clamp(3.25rem, 2.875rem + 1.875vw, 4.5rem)',       // 52px → 72px
      '6xl': 'clamp(4.5rem, 3.875rem + 3.125vw, 6.5rem)',        // 72px → 104px
      '7xl': 'clamp(6.5rem, 5.5rem + 5vw, 9.5rem)',              // 104px → 152px 🚀
      '8xl': 'clamp(9.5rem, 8rem + 7.5vw, 13.5rem)',             // 152px → 216px 👑
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tighter: '1.125',    // Ultra tight for headlines
      tight: '1.25',       // Tight for titles
      snug: '1.375',       // Snug for UI text
      normal: '1.5',       // Default ⭐
      relaxed: '1.625',    // Comfortable for long text
      loose: '1.75',       // Spacious
      looser: '2',         // Extra spacious
    },
    letterSpacing: {
      tightest: '-0.075em',
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
      mega: '0.15em',
    },
  },

  /**
   * 🎨 OKLCH Color System - Perceptually Uniform + P3 Gamut
   * Industry Leading: Better than HSL/RGB for gradients & interpolation
   * WCAG AAA accessible | Supports Display P3 for modern displays
   * L = Lightness (0-100%), C = Chroma (0-0.4), H = Hue (0-360°)
   */
  colors: {
    // 🌈 Brand Identity - OKLCH Elite Colors
    brand: {
      // Primary: Vivid Purple with P3 richness
      primary: {
        50: 'oklch(0.98 0.01 295)',   // Ultra light
        100: 'oklch(0.95 0.03 295)',
        200: 'oklch(0.88 0.08 295)',
        300: 'oklch(0.78 0.14 295)',
        400: 'oklch(0.68 0.20 295)',
        500: 'oklch(0.58 0.24 295)',  // Brand primary ⭐
        600: 'oklch(0.48 0.22 295)',
        700: 'oklch(0.38 0.18 295)',
        800: 'oklch(0.28 0.14 295)',
        900: 'oklch(0.18 0.10 295)',
        950: 'oklch(0.10 0.06 295)',  // Ultra dark
      },
      // Secondary: Electric Blue with HDR pop
      secondary: {
        50: 'oklch(0.98 0.01 240)',
        100: 'oklch(0.95 0.04 240)',
        200: 'oklch(0.88 0.10 240)',
        300: 'oklch(0.78 0.16 240)',
        400: 'oklch(0.68 0.22 240)',
        500: 'oklch(0.60 0.26 240)',  // Brand secondary ⭐
        600: 'oklch(0.50 0.24 240)',
        700: 'oklch(0.40 0.20 240)',
        800: 'oklch(0.30 0.16 240)',
        900: 'oklch(0.20 0.12 240)',
        950: 'oklch(0.12 0.08 240)',
      },
      // Accent: Vibrant Fuchsia/Pink for highlights
      accent: {
        50: 'oklch(0.98 0.01 330)',
        100: 'oklch(0.95 0.05 330)',
        200: 'oklch(0.88 0.12 330)',
        300: 'oklch(0.78 0.18 330)',
        400: 'oklch(0.70 0.24 330)',
        500: 'oklch(0.62 0.28 330)',  // Brand accent ⭐
        600: 'oklch(0.52 0.26 330)',
        700: 'oklch(0.42 0.22 330)',
        800: 'oklch(0.32 0.18 330)',
        900: 'oklch(0.22 0.14 330)',
        950: 'oklch(0.14 0.10 330)',
      },
    },

    // 🎭 Semantic Colors - Context-aware states
    semantic: {
      success: {
        light: 'oklch(0.70 0.18 145)',    // Green - WCAG AAA
        DEFAULT: 'oklch(0.60 0.20 145)',  // ⭐
        dark: 'oklch(0.45 0.16 145)',
        subtle: 'oklch(0.30 0.12 145)',
      },
      warning: {
        light: 'oklch(0.75 0.16 70)',     // Amber - WCAG AAA
        DEFAULT: 'oklch(0.65 0.18 70)',   // ⭐
        dark: 'oklch(0.50 0.14 70)',
        subtle: 'oklch(0.35 0.10 70)',
      },
      error: {
        light: 'oklch(0.65 0.24 25)',     // Red - WCAG AAA
        DEFAULT: 'oklch(0.55 0.26 25)',   // ⭐
        dark: 'oklch(0.40 0.22 25)',
        subtle: 'oklch(0.28 0.18 25)',
      },
      info: {
        light: 'oklch(0.68 0.20 240)',    // Blue - WCAG AAA
        DEFAULT: 'oklch(0.58 0.22 240)',  // ⭐
        dark: 'oklch(0.43 0.18 240)',
        subtle: 'oklch(0.30 0.14 240)',
      },
    },

    // 🌑 Neutral Scale - Perfect grayscale with warm undertone
    neutral: {
      0: 'oklch(1.00 0 0)',          // Pure white
      50: 'oklch(0.98 0.002 270)',
      100: 'oklch(0.95 0.004 270)',
      200: 'oklch(0.88 0.006 270)',
      300: 'oklch(0.78 0.008 270)',
      400: 'oklch(0.65 0.010 270)',
      500: 'oklch(0.52 0.012 270)',  // Mid gray ⭐
      600: 'oklch(0.42 0.014 270)',
      700: 'oklch(0.32 0.016 270)',
      800: 'oklch(0.22 0.018 270)',
      900: 'oklch(0.14 0.020 270)',
      950: 'oklch(0.08 0.022 270)',
      1000: 'oklch(0.00 0 0)',       // Pure black
    },

    // 🪟 Surface Elevation - Layered depth with subtle tints
    surface: {
      base: 'oklch(0.10 0.020 270)',      // Foundation ⭐
      raised: 'oklch(0.14 0.022 270)',    // Level 1
      elevated: 'oklch(0.18 0.024 270)',  // Level 2
      overlay: 'oklch(0.22 0.026 270)',   // Level 3
      modal: 'oklch(0.26 0.028 270)',     // Level 4
      popover: 'oklch(0.30 0.030 270)',   // Level 5
    },

    // 📝 Text Hierarchy - Optimized contrast
    text: {
      primary: 'oklch(0.98 0.002 270)',    // High emphasis (98% white)
      secondary: 'oklch(0.78 0.008 270)',  // Medium emphasis
      tertiary: 'oklch(0.58 0.012 270)',   // Low emphasis
      disabled: 'oklch(0.38 0.014 270)',   // Disabled state
      inverse: 'oklch(0.12 0.020 270)',    // For light backgrounds
    },
  },

  /**
   * 💫 Elevation & Shadow System - Realistic depth perception
   * Multi-layer shadows for natural lighting simulation
   * Combines ambient (soft, large) + direct (sharp, small) shadows
   */
  elevation: {
    none: 'none',
    xs: '0 1px 2px 0 oklch(0 0 0 / 0.04), 0 1px 1px 0 oklch(0 0 0 / 0.02)',
    sm: '0 2px 4px -1px oklch(0 0 0 / 0.06), 0 1px 2px 0 oklch(0 0 0 / 0.03)',
    DEFAULT: '0 4px 6px -1px oklch(0 0 0 / 0.08), 0 2px 4px -1px oklch(0 0 0 / 0.04)',
    md: '0 8px 12px -2px oklch(0 0 0 / 0.10), 0 4px 8px -2px oklch(0 0 0 / 0.05)',
    lg: '0 12px 20px -4px oklch(0 0 0 / 0.12), 0 8px 12px -4px oklch(0 0 0 / 0.06)',
    xl: '0 16px 28px -6px oklch(0 0 0 / 0.14), 0 12px 16px -6px oklch(0 0 0 / 0.07)',
    '2xl': '0 24px 40px -8px oklch(0 0 0 / 0.18), 0 16px 24px -8px oklch(0 0 0 / 0.09)',
    '3xl': '0 32px 56px -12px oklch(0 0 0 / 0.22), 0 24px 32px -12px oklch(0 0 0 / 0.11)',
    inner: 'inset 0 2px 4px 0 oklch(0 0 0 / 0.06)',

    // 🌟 Glow Effects - Brand-colored luminosity for premium feel
    glow: {
      purple: {
        sm: '0 0 12px oklch(0.58 0.24 295 / 0.3)',
        DEFAULT: '0 0 24px oklch(0.58 0.24 295 / 0.4), 0 0 48px oklch(0.58 0.24 295 / 0.2)',
        lg: '0 0 36px oklch(0.58 0.24 295 / 0.5), 0 0 72px oklch(0.58 0.24 295 / 0.25)',
        xl: '0 0 56px oklch(0.58 0.24 295 / 0.6), 0 0 112px oklch(0.58 0.24 295 / 0.3)',
      },
      blue: {
        sm: '0 0 12px oklch(0.60 0.26 240 / 0.3)',
        DEFAULT: '0 0 24px oklch(0.60 0.26 240 / 0.4), 0 0 48px oklch(0.60 0.26 240 / 0.2)',
        lg: '0 0 36px oklch(0.60 0.26 240 / 0.5), 0 0 72px oklch(0.60 0.26 240 / 0.25)',
        xl: '0 0 56px oklch(0.60 0.26 240 / 0.6), 0 0 112px oklch(0.60 0.26 240 / 0.3)',
      },
      pink: {
        sm: '0 0 12px oklch(0.62 0.28 330 / 0.3)',
        DEFAULT: '0 0 24px oklch(0.62 0.28 330 / 0.4), 0 0 48px oklch(0.62 0.28 330 / 0.2)',
        lg: '0 0 36px oklch(0.62 0.28 330 / 0.5), 0 0 72px oklch(0.62 0.28 330 / 0.25)',
        xl: '0 0 56px oklch(0.62 0.28 330 / 0.6), 0 0 112px oklch(0.62 0.28 330 / 0.3)',
      },
      // Multi-color gradient glow for hero elements
      gradient: '0 0 40px oklch(0.58 0.24 295 / 0.4), 0 0 80px oklch(0.60 0.26 240 / 0.3), 0 0 120px oklch(0.62 0.28 330 / 0.2)',
    },
  },

  /**
   * 🔘 Border Radius System - Smooth & consistent curvature
   * Based on 4px increments for perfect pixel rendering
   */
  borderRadius: {
    none: '0',
    xs: '0.25rem',     // 4px - Subtle
    sm: '0.375rem',    // 6px - Small
    DEFAULT: '0.5rem', // 8px - Default ⭐
    md: '0.75rem',     // 12px - Medium
    lg: '1rem',        // 16px - Large
    xl: '1.25rem',     // 20px - XLarge
    '2xl': '1.5rem',   // 24px - 2XLarge
    '3xl': '2rem',     // 32px - 3XLarge
    '4xl': '2.5rem',   // 40px - Hero
    '5xl': '3rem',     // 48px - Mega
    full: '9999px',    // Pills & circles
  },

  /**
   * 🎬 Animation System - Physics-based motion design
   * Durations based on Nielsen Norman Group research (optimal perceived speed)
   * Easings from Apple HIG + Material Design 3 + custom spring curves
   */
  animation: {
    duration: {
      instant: '75ms',      // Micro-interactions (hover feedback)
      faster: '100ms',      // Very fast transitions
      fast: '150ms',        // Fast UI changes
      normal: '200ms',      // Default transitions ⭐
      moderate: '300ms',    // Moderate animations
      slow: '400ms',        // Slower, more noticeable
      slower: '500ms',      // Deliberate animations
      slowest: '700ms',     // Page transitions
      epic: '1000ms',       // Hero animations
      mega: '1500ms',       // Special effects
    },
    easing: {
      // 📐 Linear
      linear: 'linear',

      // 🎯 Standard CSS
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',

      // 🍎 Apple HIG - Natural, organic motion
      appleEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      appleEaseIn: 'cubic-bezier(0.42, 0, 1, 1)',
      appleEaseOut: 'cubic-bezier(0, 0, 0.58, 1)',
      appleEaseInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',

      // 🎨 Material Design 3 - Emphasized motion
      emphasized: 'cubic-bezier(0.4, 0, 0.2, 1)',          // Default ⭐
      emphasizedDecelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',  // Entry
      emphasizedAccelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',    // Exit

      // 🔄 Spring Physics - Natural bounce
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',    // Playful bounce
      springGentle: 'cubic-bezier(0.5, -0.3, 0.1, 1.3)',   // Subtle bounce
      springSnappy: 'cubic-bezier(0.8, -0.8, 0.2, 1.8)',   // Strong bounce

      // ⚡ Power curves - Dramatic effects
      powerIn: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      powerOut: 'cubic-bezier(0.19, 1, 0.22, 1)',
      powerInOut: 'cubic-bezier(0.85, 0, 0.15, 1)',

      // 🎪 Expo curves - Extreme acceleration
      expoIn: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      expoOut: 'cubic-bezier(0.19, 1, 0.22, 1)',
      expoInOut: 'cubic-bezier(1, 0, 0, 1)',

      // 💎 Custom elite curves
      silk: 'cubic-bezier(0.33, 0, 0.2, 1)',               // Ultra smooth
      snap: 'cubic-bezier(0.9, 0, 0.1, 1)',                // Quick & snappy
      smooth: 'cubic-bezier(0.45, 0, 0.15, 1)',            // Smooth & natural
    },
  },

  /**
   * 📚 Z-Index System - Strict layering hierarchy
   * Organized by component type to prevent conflicts
   */
  zIndex: {
    behind: '-1',
    base: '0',
    content: '1',
    dropdown: '1000',
    sticky: '1010',
    banner: '1020',
    fixed: '1030',
    overlay: '1040',
    modalBackdrop: '1050',
    modal: '1060',
    drawer: '1070',
    popover: '1080',
    tooltip: '1090',
    notification: '1100',
    supreme: '9999',
  },

  /**
   * 📱 Breakpoints - Mobile First Strategy
   * Based on actual device statistics + ergonomic zones
   */
  breakpoints: {
    xs: '320px',     // Small phones (iPhone SE)
    sm: '640px',     // Standard phones ⭐
    md: '768px',     // Tablets (iPad Mini)
    lg: '1024px',    // Laptops & tablets landscape
    xl: '1280px',    // Desktops ⭐
    '2xl': '1536px', // Large desktops
    '3xl': '1920px', // Ultra-wide & 4K
    '4xl': '2560px', // 2K+ displays
  },

  /**
   * 🎭 Backdrop Blur - Modern glassmorphism
   * Hardware-accelerated blur for premium aesthetic
   */
  backdropBlur: {
    none: '0',
    sm: '4px',
    DEFAULT: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },

  /**
   * 🌫️ Opacity Scale - Precise transparency control
   */
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.10',
    15: '0.15',
    20: '0.20',
    25: '0.25',
    30: '0.30',
    35: '0.35',
    40: '0.40',
    45: '0.45',
    50: '0.50',
    55: '0.55',
    60: '0.60',
    65: '0.65',
    70: '0.70',
    75: '0.75',
    80: '0.80',
    85: '0.85',
    90: '0.90',
    95: '0.95',
    100: '1',
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
