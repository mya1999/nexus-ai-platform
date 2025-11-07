import type { Config } from "tailwindcss";
import { designTokens } from "./src/styles/tokens";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Design Tokens Integration
      spacing: designTokens.spacing,

      colors: {
        // Shadcn/ui colors (preserved)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Design System Semantic Colors
        success: {
          light: `hsl(${designTokens.colors.semantic.success.light})`,
          DEFAULT: `hsl(${designTokens.colors.semantic.success.DEFAULT})`,
          dark: `hsl(${designTokens.colors.semantic.success.dark})`,
        },
        warning: {
          light: `hsl(${designTokens.colors.semantic.warning.light})`,
          DEFAULT: `hsl(${designTokens.colors.semantic.warning.DEFAULT})`,
          dark: `hsl(${designTokens.colors.semantic.warning.dark})`,
        },
        error: {
          light: `hsl(${designTokens.colors.semantic.error.light})`,
          DEFAULT: `hsl(${designTokens.colors.semantic.error.DEFAULT})`,
          dark: `hsl(${designTokens.colors.semantic.error.dark})`,
        },
        info: {
          light: `hsl(${designTokens.colors.semantic.info.light})`,
          DEFAULT: `hsl(${designTokens.colors.semantic.info.DEFAULT})`,
          dark: `hsl(${designTokens.colors.semantic.info.dark})`,
        },

        // Brand Colors
        brand: {
          primary: `hsl(${designTokens.colors.brand.primary})`,
          secondary: `hsl(${designTokens.colors.brand.secondary})`,
          accent: `hsl(${designTokens.colors.brand.accent})`,
        },

        // Surface Elevation
        surface: {
          0: `hsl(${designTokens.colors.surface[0]})`,
          1: `hsl(${designTokens.colors.surface[1]})`,
          2: `hsl(${designTokens.colors.surface[2]})`,
          3: `hsl(${designTokens.colors.surface[3]})`,
          4: `hsl(${designTokens.colors.surface[4]})`,
        },

        // Legacy nexus colors (preserved for backwards compatibility)
        nexus: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          pink: "#EC4899",
          orange: "#F97316",
          cyan: "#06B6D4",
          dark: "#0A0E27",
          darker: "#050816",
        },
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        inner: designTokens.elevation.inner,
        'glow-purple': designTokens.elevation.glow.purple,
        'glow-blue': designTokens.elevation.glow.blue,
        'glow-pink': designTokens.elevation.glow.pink,
      },

      // Z-Index
      zIndex: designTokens.zIndex,

      // Animation Duration & Timing
      transitionDuration: {
        instant: designTokens.animation.duration.instant,
        fast: designTokens.animation.duration.fast,
        normal: designTokens.animation.duration.normal,
        slow: designTokens.animation.duration.slow,
        slower: designTokens.animation.duration.slower,
        slowest: designTokens.animation.duration.slowest,
      },

      transitionTimingFunction: {
        emphasized: designTokens.animation.easing.emphasized,
        'emphasized-decelerate': designTokens.animation.easing.emphasizedDecelerate,
        'emphasized-accelerate': designTokens.animation.easing.emphasizedAccelerate,
        bounce: designTokens.animation.easing.bounce,
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 6s ease infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-in-up": "fade-in-up 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        spin: "spin 1s linear infinite",
        bounce: "bounce 0.6s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
