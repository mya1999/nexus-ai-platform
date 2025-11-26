'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
}: FeatureCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="group relative h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-xl"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20 ${gradient}`}
        />

        {/* Icon */}
        <div className="relative z-10 mb-6 inline-flex rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4">
          <Icon className="h-8 w-8 text-purple-400" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>

        {/* Shine effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
