/**
 * 🎨 SOVEREIGN DESIGN SYSTEM
 * نظام تصميم سيادي متكامل بمعايير عالمية
 */

export const DesignSystem = {
  // 🎨 OKLCH Color Palette - Wide Gamut P3
  colors: {
    brand: {
      primary: {
        50: 'oklch(98% 0.02 280)',
        100: 'oklch(95% 0.05 280)',
        200: 'oklch(90% 0.08 280)',
        300: 'oklch(85% 0.12 280)',
        400: 'oklch(75% 0.16 280)',
        500: 'oklch(65% 0.20 280)', // Main brand
        600: 'oklch(55% 0.18 280)',
        700: 'oklch(45% 0.15 280)',
        800: 'oklch(35% 0.12 280)',
        900: 'oklch(25% 0.08 280)',
        950: 'oklch(15% 0.04 280)',
      },
      secondary: {
        500: 'oklch(70% 0.18 320)',
        600: 'oklch(60% 0.16 320)',
      },
      accent: {
        cyan: 'oklch(75% 0.15 200)',
        pink: 'oklch(70% 0.18 340)',
        gold: 'oklch(80% 0.12 80)',
      },
    },
    neutral: {
      0: 'oklch(100% 0 0)',
      50: 'oklch(98.5% 0.005 240)',
      100: 'oklch(97% 0.008 240)',
      200: 'oklch(94% 0.01 240)',
      300: 'oklch(88% 0.012 240)',
      400: 'oklch(75% 0.015 240)',
      500: 'oklch(60% 0.018 240)',
      600: 'oklch(45% 0.02 240)',
      700: 'oklch(35% 0.022 240)',
      800: 'oklch(25% 0.024 240)',
      900: 'oklch(15% 0.026 240)',
      950: 'oklch(10% 0.028 240)',
      1000: 'oklch(0% 0 0)',
    },
  },

  // 🎬 Animation System
  animation: {
    duration: {
      instant: '50ms',
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
      slowest: '750ms',
    },
    easing: {
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
};

export default DesignSystem;
