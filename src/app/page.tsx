/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  ZORO-AI Landing Page - Premium Design                       ║
 * ║  Modern UI/UX with Advanced AI Chat Interface                ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

'use client';

import BrandLogo from '@/components/brand-logo';
import LanguageToggle from '@/components/language-toggle';
import { useLanguage } from '@/hooks';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted for proper hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Translations for bilingual support
  const t = {
    en: {
      hero: {
        title: 'Experience the Future of',
        subtitle: 'Artificial Intelligence',
        description:
          'ZORO-AI brings you the most advanced AI conversation experience, combining cutting-edge technology with intuitive design.',
        cta: {
          primary: 'Start Chatting',
          secondary: 'Explore Features',
        },
      },
      features: {
        title: 'Powered by Advanced AI',
        models: ['GPT-4 Turbo', 'Claude 3 Sonnet', 'Gemini Pro'],
      },
      stats: {
        users: '10M+',
        usersLabel: 'Users',
        accuracy: '99.9%',
        accuracyLabel: 'Accuracy',
        support: '24/7',
        supportLabel: 'Support',
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} ZORO-AI - Advanced AI Platform`,
      },
    },
    ar: {
      hero: {
        title: 'اختبر مستقبل',
        subtitle: 'الذكاء الاصطناعي',
        description:
          'ZORO-AI يقدم لك تجربة محادثة ذكاء اصطناعي متقدمة، يجمع بين أحدث التقنيات والتصميم البديهي.',
        cta: {
          primary: 'ابدأ المحادثة',
          secondary: 'استكشف الميزات',
        },
      },
      features: {
        title: 'مدعوم بذكاء اصطناعي متقدم',
        models: ['GPT-4 Turbo', 'Claude 3 Sonnet', 'Gemini Pro'],
      },
      stats: {
        users: '10م+',
        usersLabel: 'مستخدم',
        accuracy: '99.9%',
        accuracyLabel: 'دقة',
        support: '24/7',
        supportLabel: 'دعم',
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} ZORO-AI - منصة ذكاء اصطناعي متقدمة`,
      },
    },
  };

  const translations = t[language];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* 🌌 Animated Neural Network Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Radial Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-indigo-900/20 via-black to-black"></div>

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Particles Animation */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }, (_, i) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute h-1 w-1 rounded-full bg-purple-500/40"
                initial={{
                  x: `${randomX}%`,
                  y: `${randomY}%`,
                }}
                animate={{
                  y: [`${randomY}%`, `${(randomY + Math.random() * 20 - 10) % 100}%`],
                  x: [`${randomX}%`, `${(randomX + Math.random() * 20 - 10) % 100}%`],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>

        {/* Gradient Orbs - Neural Network Style */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* 🌐 Language Toggle - Premium Position */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed right-8 top-8 z-50"
      >
        <div className="rounded-2xl border border-purple-500/30 bg-white/5 p-1 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
          <LanguageToggle />
        </div>
      </motion.div>

      {/* 📄 Main Content - Premium Layout */}
      <main className="relative z-10 w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="space-y-16 text-center">
            {/* 🎯 Hero Section - Logo & Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Premium Logo with 3D Effect */}
              <div className="perspective-1000 flex justify-center">
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-50 blur-3xl group-hover:opacity-70 transition-opacity duration-500"></div>

                  {/* 3D Icon Container */}
                  <div className="relative">
                    <motion.div
                      className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 shadow-[0_20px_60px_rgba(168,85,247,0.5)] transition-all duration-500 sm:h-40 sm:w-40"
                      whileHover={{ rotateY: 12, rotateX: 5 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* AI Brain Icon */}
                      <svg
                        className="h-20 w-20 text-white drop-shadow-2xl sm:h-24 sm:w-24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.5" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* ZORO-AI Brand Logo - Premium Frame */}
              <div className="relative py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                  >
                    {/* Glow Frame */}
                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 blur-2xl"></div>
                    {/* Premium Frame */}
                    <div className="relative flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 sm:p-8 lg:p-10">
                      <BrandLogo size="xl" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Hero Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="text-white">{translations.hero.title}</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    {translations.hero.subtitle}
                  </span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">
                  {translations.hero.description}
                </p>
              </motion.div>
            </motion.div>

            {/* 🤖 AI Models - Premium Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4"
            >
              {translations.features.models.map((model, index) => (
                <motion.div
                  key={model}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                >
                  <span className="relative z-10 text-lg font-semibold text-gray-200 transition-colors group-hover:text-white">
                    {model}
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 transition-all duration-300 group-hover:from-purple-600/20 group-hover:to-pink-600/20"></div>
                </motion.div>
              ))}
            </motion.div>

            {/* 🚀 CTA Buttons - Premium Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
            >
              <Link
                href="/chat"
                className="group relative transform overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-10 py-5 text-lg font-bold text-white shadow-[0_20px_60px_rgba(168,85,247,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_80px_rgba(168,85,247,0.6)] sm:px-12 sm:py-6 sm:text-xl"
              >
                {/* Animated Gradient Background */}
                <div className="animate-gradient-x absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                </div>

                <span className="relative z-10 flex items-center gap-3">
                  {translations.hero.cta.primary}
                  <svg
                    className="h-5 w-5 transform transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>

              {/* Secondary Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl border-2 border-purple-500/30 bg-transparent px-10 py-5 text-lg font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/10 hover:text-white sm:px-12 sm:py-6"
              >
                {translations.hero.cta.secondary}
              </motion.button>
            </motion.div>

            {/* 📊 Stats - World Class Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mx-auto grid max-w-4xl grid-cols-1 gap-6 pt-12 sm:grid-cols-3 sm:gap-8"
            >
              {[
                {
                  value: translations.stats.users,
                  label: translations.stats.usersLabel,
                },
                {
                  value: translations.stats.accuracy,
                  label: translations.stats.accuracyLabel,
                },
                {
                  value: translations.stats.support,
                  label: translations.stats.supportLabel,
                },
              ].map((stat, index) => (
                <motion.div
                  key={`stat-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative"
                >
                  <div className="space-y-2 rounded-2xl border border-purple-500/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-black text-transparent sm:text-4xl lg:text-5xl">
                      {stat.value}
                    </div>
                    <div className="text-sm uppercase tracking-wider text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* 📄 Footer - Premium Design */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="relative z-10 border-t border-purple-500/10 bg-black/50 backdrop-blur-xl"
      >
        <div className="px-6 py-8 text-center">
          <p className="text-sm text-gray-500">{translations.footer.copyright}</p>
        </div>
      </motion.footer>
    </div>
  );
}
