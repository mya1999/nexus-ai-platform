"use client";

type Size = "sm" | "md" | "lg" | "xl";

interface BrandLogoProps {
  size?: Size;
  className?: string;
  animated?: boolean;
}

const sizeMap: Record<Size, { icon: string; text: string; gap: string; glow: string }> = {
  sm: {
    icon: "w-8 h-8",
    text: "text-xl",
    gap: "gap-2.5",
    glow: "shadow-[0_8px_24px_oklch(0.58_0.24_295/0.35)]"
  },
  md: {
    icon: "w-11 h-11",
    text: "text-3xl",
    gap: "gap-3.5",
    glow: "shadow-[0_12px_32px_oklch(0.58_0.24_295/0.40)]"
  },
  lg: {
    icon: "w-16 h-16",
    text: "text-6xl",
    gap: "gap-5",
    glow: "shadow-[0_16px_48px_oklch(0.58_0.24_295/0.45)]"
  },
  xl: {
    icon: "w-28 h-28",
    text: "text-[clamp(4rem,12vw,10rem)]",
    gap: "gap-7",
    glow: "shadow-[0_24px_64px_oklch(0.58_0.24_295/0.50),0_0_96px_oklch(0.60_0.26_240/0.30)]"
  },
};

export default function BrandLogo({
  size = "md",
  className = "",
  animated = true
}: BrandLogoProps) {
  const s = sizeMap[size];

  return (
    <div
      className={`flex items-center ${s.gap} ${className}`}
      aria-label="ZORO-AI"
      style={{
        filter: 'drop-shadow(0 0 1px oklch(0.98 0.002 270 / 0.1))'
      }}
    >
      {/* 💎 Premium Emblem with Glassmorphism */}
      <div
        className={`
          ${s.icon} ${s.glow}
          rounded-[28%] relative overflow-hidden
          ${animated ? 'transition-all duration-300 hover:scale-105 hover:rotate-3' : ''}
        `}
        style={{
          background: `
            linear-gradient(135deg,
              oklch(0.58 0.24 295) 0%,
              oklch(0.62 0.28 330) 50%,
              oklch(0.60 0.26 240) 100%
            )
          `,
        }}
      >
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 30% 30%,
                oklch(0.98 0.01 0 / 0.3) 0%,
                transparent 60%
              )
            `,
          }}
        />

        {/* Shimmer effect */}
        {animated && (
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `
                linear-gradient(135deg,
                  transparent 0%,
                  oklch(1 0 0 / 0.15) 50%,
                  transparent 100%
                )
              `,
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        )}

        {/* Premium Star Icon - Redesigned */}
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 m-auto w-[58%] h-[58%]"
          fill="none"
          style={{ filter: 'drop-shadow(0 2px 4px oklch(0 0 0 / 0.2))' }}
        >
          {/* Outer glow */}
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="oklch(0.98 0.01 0 / 0.95)"
            stroke="oklch(0.98 0.01 0 / 0.3)"
            strokeWidth="0.5"
          />
          {/* Inner detail */}
          <circle
            cx="12"
            cy="12"
            r="3"
            fill="oklch(0.98 0.01 0 / 0.25)"
            stroke="oklch(0.98 0.01 0 / 0.4)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* 🔤 Elite Wordmark */}
      <span
        className={`
          ${s.text} font-black tracking-[-0.03em] leading-none select-none
          ${animated ? 'transition-all duration-300' : ''}
        `}
        style={{
          fontFeatureSettings: '"ss01", "ss02", "cv01"',
          textRendering: 'optimizeLegibility',
        }}
      >
        <span
          className="inline-block"
          style={{
            color: 'oklch(0.98 0.002 270)',
            filter: 'drop-shadow(0 2px 8px oklch(0 0 0 / 0.3))',
          }}
        >
          ZORO
        </span>
        <span
          className="inline-block mx-1 opacity-60"
          style={{ color: 'oklch(0.78 0.008 270)' }}
        >
          -
        </span>
        <span
          className="inline-block bg-clip-text text-transparent font-black"
          style={{
            backgroundImage: `
              linear-gradient(135deg,
                oklch(0.70 0.28 330) 0%,
                oklch(0.65 0.26 300) 50%,
                oklch(0.68 0.24 240) 100%
              )
            `,
            filter: 'drop-shadow(0 0 12px oklch(0.62 0.28 330 / 0.4))',
          }}
        >
          AI
        </span>
      </span>

      {/* CSS Keyframes for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          50% { transform: translateX(200%) translateY(200%) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}
