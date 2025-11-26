'use client';

import { motion } from 'framer-motion';

interface NeuralLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showText?: boolean;
}

const sizeMap = {
  sm: { container: 48, icon: 24, text: 'text-lg' },
  md: { container: 64, icon: 32, text: 'text-xl' },
  lg: { container: 96, icon: 48, text: 'text-3xl' },
  xl: { container: 128, icon: 64, text: 'text-5xl' },
};

export default function NeuralLogo({
  size = 'lg',
  animated = true,
  showText = true,
}: NeuralLogoProps) {
  const dimensions = sizeMap[size];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 🔮 Neural Glass Container */}
      <motion.div
        className="relative"
        style={{
          width: dimensions.container,
          height: dimensions.container,
        }}
        animate={
          animated
            ? {
                rotateY: [0, 360],
                rotateZ: [0, 5, 0, -5, 0],
              }
            : {}
        }
        transition={{
          rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
          rotateZ: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {/* 🌟 Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `
              conic-gradient(
                from 0deg,
                oklch(70% 0.30 195 / 0.6),
                oklch(70% 0.30 285 / 0.6),
                oklch(70% 0.30 330 / 0.6),
                oklch(70% 0.30 195 / 0.6)
              )
            `,
            filter: 'blur(20px)',
          }}
          animate={
            animated
              ? {
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        {/* 🔷 Glass Container */}
        <div
          className="relative h-full w-full overflow-hidden rounded-3xl"
          style={{
            background: `
              linear-gradient(
                135deg,
                oklch(20% 0.08 285 / 0.4) 0%,
                oklch(15% 0.06 330 / 0.3) 50%,
                oklch(18% 0.07 195 / 0.4) 100%
              )
            `,
            backdropFilter: 'blur(40px) saturate(180%)',
            border: '2px solid oklch(70% 0.30 285 / 0.3)',
            boxShadow: `
              inset 0 0 60px oklch(70% 0.30 285 / 0.2),
              inset 0 0 30px oklch(70% 0.30 330 / 0.15),
              0 0 80px oklch(70% 0.30 285 / 0.4),
              0 0 40px oklch(70% 0.30 195 / 0.3)
            `,
          }}
        >
          {/* 🌐 Neural Grid Pattern */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="neural-grid"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="1" fill="oklch(70% 0.30 285 / 0.4)" />
                <line
                  x1="10"
                  y1="10"
                  x2="20"
                  y2="10"
                  stroke="oklch(70% 0.30 285 / 0.2)"
                  strokeWidth="0.5"
                />
                <line
                  x1="10"
                  y1="10"
                  x2="10"
                  y2="20"
                  stroke="oklch(70% 0.30 285 / 0.2)"
                  strokeWidth="0.5"
                />
              </pattern>

              <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(70% 0.30 195)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="oklch(70% 0.30 285)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="oklch(70% 0.30 330)" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#neural-grid)" />
          </svg>

          {/* ⚡ Central Neural Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width={dimensions.icon}
              height={dimensions.icon}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={
                animated
                  ? {
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }
                  : {}
              }
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Neural Network Nodes */}
              <motion.circle
                cx="32"
                cy="16"
                r="4"
                fill="url(#neural-gradient)"
                animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.circle
                cx="16"
                cy="32"
                r="4"
                fill="url(#neural-gradient)"
                animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.circle
                cx="48"
                cy="32"
                r="4"
                fill="url(#neural-gradient)"
                animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
              <motion.circle
                cx="32"
                cy="48"
                r="4"
                fill="url(#neural-gradient)"
                animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
              />

              {/* Central Core */}
              <motion.circle
                cx="32"
                cy="32"
                r="8"
                fill="url(#neural-gradient)"
                animate={
                  animated
                    ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Neural Connections */}
              <motion.line
                x1="32"
                y1="16"
                x2="32"
                y2="24"
                stroke="url(#neural-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                animate={animated ? { opacity: [0.4, 1, 0.4] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.line
                x1="16"
                y1="32"
                x2="24"
                y2="32"
                stroke="url(#neural-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                animate={animated ? { opacity: [0.4, 1, 0.4] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.line
                x1="48"
                y1="32"
                x2="40"
                y2="32"
                stroke="url(#neural-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                animate={animated ? { opacity: [0.4, 1, 0.4] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
              <motion.line
                x1="32"
                y1="48"
                x2="32"
                y2="40"
                stroke="url(#neural-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                animate={animated ? { opacity: [0.4, 1, 0.4] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
              />

              {/* Diagonal Connections */}
              <motion.line
                x1="20"
                y1="20"
                x2="26"
                y2="26"
                stroke="url(#neural-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
                animate={animated ? { opacity: [0.3, 0.8, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              />
              <motion.line
                x1="44"
                y1="20"
                x2="38"
                y2="26"
                stroke="url(#neural-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
                animate={animated ? { opacity: [0.3, 0.8, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.line
                x1="20"
                y1="44"
                x2="26"
                y2="38"
                stroke="url(#neural-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
                animate={animated ? { opacity: [0.3, 0.8, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              />
              <motion.line
                x1="44"
                y1="44"
                x2="38"
                y2="38"
                stroke="url(#neural-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
                animate={animated ? { opacity: [0.3, 0.8, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 1.1 }}
              />

              {/* Glowing Core Effect */}
              <motion.circle
                cx="32"
                cy="32"
                r="12"
                fill="url(#neural-gradient)"
                animate={
                  animated
                    ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Enhanced Neural Effects */}
              <motion.circle
                cx="32"
                cy="32"
                r="20"
                fill="none"
                stroke="oklch(70% 0.30 285 / 0.1)"
                strokeWidth="1"
                animate={animated ? { scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="oklch(70% 0.30 330 / 0.05)"
                strokeWidth="1"
                animate={animated ? { scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] } : {}}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.svg>
          </div>
        </div>
      </motion.div>

      {/* 🧠 Neural Text */}
      {showText && (
        <motion.h1
          className={`font-bold ${dimensions.text} bg-clip-text text-transparent`}
          style={{
            background: `
              linear-gradient(
                45deg,
                oklch(70% 0.30 195),
                oklch(70% 0.30 285),
                oklch(70% 0.30 330)
              )
            `,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Neural
        </motion.h1>
      )}
    </div>
  );
}
