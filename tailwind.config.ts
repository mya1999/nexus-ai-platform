import type { Config } from 'tailwindcss';
import { designTokens } from './src/styles/tokens';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
      },
    },
    extend: {
      // 🎯 Design Tokens Integration
      spacing: designTokens.spacing,

      colors: {
        // 🎨 Shadcn/ui base colors (preserved for compatibility)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // 🌈 OKLCH Brand Colors - Full palette
        brand: {
          ...designTokens.colors.brand.primary,
          ...designTokens.colors.brand.secondary,
          ...designTokens.colors.brand.accent,
        },

        // 🎭 Semantic States
        success: designTokens.colors.semantic.success,
        warning: designTokens.colors.semantic.warning,
        error: designTokens.colors.semantic.error,
        info: designTokens.colors.semantic.info,

        // 🌑 Neutral Scale
        neutral: designTokens.colors.neutral,

        // 🪟 Surface Layers
        surface: designTokens.colors.surface,

        // 📝 Text Hierarchy
        text: designTokens.colors.text,
      },

      // Fluid Typography
      fontSize: {
        xs: designTokens.typography.fontSize.xs,
        sm: designTokens.typography.fontSize.sm,
        base: designTokens.typography.fontSize.base,
        lg: designTokens.typography.fontSize.lg,
        xl: designTokens.typography.fontSize.xl,
        '2xl': designTokens.typography.fontSize['2xl'],
        '3xl': designTokens.typography.fontSize['3xl'],
        '4xl': designTokens.typography.fontSize['4xl'],
        '5xl': designTokens.typography.fontSize['5xl'],
        '6xl': designTokens.typography.fontSize['6xl'],
      },

      fontWeight: designTokens.typography.fontWeight,
      lineHeight: designTokens.typography.lineHeight,
      letterSpacing: designTokens.typography.letterSpacing,

      borderRadius: {
        ...designTokens.borderRadius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      fontFamily: {
        sans: [...designTokens.typography.fontFamily.sans],
        mono: [...designTokens.typography.fontFamily.mono],
        display: [...designTokens.typography.fontFamily.display],
      },

      // Elevation Shadows
      boxShadow: {
        none: designTokens.elevation.none,
        sm: designTokens.elevation.sm,
        DEFAULT: designTokens.elevation.DEFAULT,
        md: designTokens.elevation.md,
        lg: designTokens.elevation.lg,
        xl: designTokens.elevation.xl,
        '2xl': designTokens.elevation['2xl'],
        '3xl': designTokens.elevation['3xl'],
        inner: designTokens.elevation.inner,
        // Glow effects with default variants
        'glow-purple': designTokens.elevation.glow.purple.DEFAULT,
        'glow-purple-sm': designTokens.elevation.glow.purple.sm,
        'glow-purple-lg': designTokens.elevation.glow.purple.lg,
        'glow-purple-xl': designTokens.elevation.glow.purple.xl,
        'glow-blue': designTokens.elevation.glow.blue.DEFAULT,
        'glow-blue-sm': designTokens.elevation.glow.blue.sm,
        'glow-blue-lg': designTokens.elevation.glow.blue.lg,
        'glow-blue-xl': designTokens.elevation.glow.blue.xl,
        'glow-pink': designTokens.elevation.glow.pink.DEFAULT,
        'glow-pink-sm': designTokens.elevation.glow.pink.sm,
        'glow-pink-lg': designTokens.elevation.glow.pink.lg,
        'glow-pink-xl': designTokens.elevation.glow.pink.xl,
        'glow-gradient': designTokens.elevation.glow.gradient,
      },

      // Z-Index Hierarchy
      zIndex: designTokens.zIndex,

      // ⏱️ Animation System
      transitionDuration: designTokens.animation.duration,

      transitionTimingFunction: {
        // Standard
        linear: designTokens.animation.easing.linear,
        ease: designTokens.animation.easing.ease,
        'ease-in': designTokens.animation.easing.easeIn,
        'ease-out': designTokens.animation.easing.easeOut,
        'ease-in-out': designTokens.animation.easing.easeInOut,
        // Apple
        'apple-ease': designTokens.animation.easing.appleEase,
        'apple-ease-in': designTokens.animation.easing.appleEaseIn,
        'apple-ease-out': designTokens.animation.easing.appleEaseOut,
        'apple-ease-in-out': designTokens.animation.easing.appleEaseInOut,
        // Material
        emphasized: designTokens.animation.easing.emphasized,
        'emphasized-decelerate': designTokens.animation.easing.emphasizedDecelerate,
        'emphasized-accelerate': designTokens.animation.easing.emphasizedAccelerate,
        // Spring
        spring: designTokens.animation.easing.spring,
        'spring-gentle': designTokens.animation.easing.springGentle,
        'spring-snappy': designTokens.animation.easing.springSnappy,
        // Power
        'power-in': designTokens.animation.easing.powerIn,
        'power-out': designTokens.animation.easing.powerOut,
        'power-in-out': designTokens.animation.easing.powerInOut,
        // Elite
        silk: designTokens.animation.easing.silk,
        snap: designTokens.animation.easing.snap,
        smooth: designTokens.animation.easing.smooth,
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        gradient: 'gradient 6s ease infinite',
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        spin: 'spin 1s linear infinite',
        bounce: 'bounce 0.6s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
