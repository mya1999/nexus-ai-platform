import { designTokens } from './tokens';

/**
 * Luminous Sovereignty Theme
 * A light, airy, and professional theme designed for focus and clarity.
 * Utilizes the OKLCH color space for perceptually uniform and vibrant colors.
 */
export const theme = {
  ...designTokens,
  colors: {
    ...designTokens.colors,
    // -- Base Palette --
    canvas: {
      DEFAULT: 'oklch(98.5% 0.005 240)', // A very light, near-white with a hint of cool gray
      subtle: 'oklch(95% 0.01 240)', // Slightly darker for subtle backgrounds
      inset: 'oklch(93% 0.015 240)', // For inset elements like input fields
    },
    ink: {
      DEFAULT: 'oklch(35% 0.03 250)', // High-contrast, dark text for readability
      muted: 'oklch(55% 0.02 250)', // Softer text for secondary information
    },
    // -- Accent Palette (Vibrant Teal) --
    accent: {
      DEFAULT: 'oklch(65% 0.18 190)', // A vibrant, yet soothing teal
      fg: 'oklch(20% 0.05 190)', // High-contrast foreground for use on accent backgrounds
    },
    // -- UI States --
    brand: designTokens.colors.brand, // Keep the original brand colors
    neutral: designTokens.colors.neutral, // Keep original neutrals for reference
    // Semantic colors can be mapped from the new palette if needed
    // e.g., success, warning, danger
  },
};

export type AppTheme = typeof theme;
