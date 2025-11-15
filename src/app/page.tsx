'use client';

import BrandLogo from '@/components/brand-logo';
import LanguageToggle from '@/components/language-toggle';
import { useLanguage } from '@/hooks';
import Link from 'next/link';

export default function Home() {
  const { language } = useLanguage();

  // تحميل فوري بدون انتظار

  return (
    <div className="relative w-full bg-black text-white">
      {/* Neural Network Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>

        {/* Animated Grid */}
        <div className="animated-grid absolute inset-0"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`particle-${i}`}
              className="particle absolute h-1 w-1 rounded-full bg-purple-500/30"
            ></div>
          ))}
        </div>

        {/* Gradient Orbs - Neural Style */}
        <div className="neural-orb absolute left-1/4 top-1/4 h-96 w-96"></div>
        <div className="neural-orb delay-1 absolute bottom-1/4 right-1/4 h-96 w-96"></div>
        <div className="neural-orb delay-2 absolute left-1/2 top-1/2 h-64 w-64"></div>
      </div>
      {/* Language Toggle - Neural Style */}
      <div className="fixed right-8 top-8 z-50">
        <div className="rounded-2xl border border-purple-500/20 bg-white/5 p-1 shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-xl">
          <LanguageToggle />
        </div>
      </div>
      {/* Main Content - Premium Layout */}
      <main className="relative z-10 w-full px-6 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="space-y-12 text-center">
            {/* Logo Icon - 3D Effect */}
            <div className="perspective-1000 flex justify-center">
              <div className="group relative transform transition-all duration-500 hover:scale-110">
                {/* Glow Effect */}
                <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-50 blur-3xl group-hover:opacity-100"></div>

                {/* 3D Icon Container */}
                <div className="relative">
                  <div className="group-hover:rotate-y-12 flex h-32 w-32 transform items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 shadow-[0_20px_60px_rgba(168,85,247,0.4)] transition-transform duration-500">
                    {/* AI Brain Icon */}
                    <svg
                      className="h-20 w-20 text-white drop-shadow-2xl"
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
                  </div>
                </div>
              </div>
            </div>

            {/* Project Title - Framed ZORO-AI only */}
            <div className="relative py-10">
              <div className="mx-auto max-w-6xl px-6">
                {/* إطار هندسي فخم */}
                <div className="relative">
                  <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-purple-600/25 via-pink-600/25 to-blue-600/25 blur-2xl" />
                  <div className="relative flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
                    {/* شعار موحّد + العنوان */}
                    <BrandLogo size="xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Models - Premium Cards */}
            <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-4">
              {['GPT-4', 'Claude 3', 'Gemini Pro'].map(model => (
                <div
                  key={model}
                  className="group relative rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-500/50"
                >
                  <span className="relative z-10 text-lg font-semibold text-gray-200 transition-colors group-hover:text-white">
                    {model}
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 transition-all duration-300 group-hover:from-purple-600/20 group-hover:to-pink-600/20"></div>
                </div>
              ))}
            </div>

            {/* CTA Button - Magnetic Effect */}
            <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
              <Link
                href="/chat"
                className="group relative transform overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-12 py-6 text-xl font-bold text-white shadow-[0_20px_60px_rgba(168,85,247,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_80px_rgba(168,85,247,0.6)]"
              >
                {/* Animated Gradient Background */}
                <div className="animate-gradient-x absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                </div>

                <span className="relative z-10 flex items-center gap-3">
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                  <svg
                    className="h-6 w-6 transform transition-transform group-hover:translate-x-1"
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
              <button className="rounded-2xl border-2 border-purple-500/30 px-12 py-6 text-lg font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/10 hover:text-white">
                {language === 'ar' ? 'اكتشف المزيد' : 'Explore More'}
              </button>
            </div>

            {/* Stats - World Class Design */}
            <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8 pt-16">
              {[
                { value: '10M+', label: language === 'ar' ? 'مستخدم' : 'Users' },
                { value: '99.9%', label: language === 'ar' ? 'دقة' : 'Accuracy' },
                { value: '24/7', label: language === 'ar' ? 'دعم' : 'Support' },
              ].map(stat => (
                <div key={`stat-${stat.value}-${stat.label}`} className="group relative">
                  <div className="space-y-2 rounded-2xl border border-purple-500/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
                      {stat.value}
                    </div>
                    <div className="text-sm uppercase tracking-wider text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Sticky */}
      <footer className="relative z-10 border-t border-purple-500/10 bg-black/50 backdrop-blur-xl">
        <div className="px-6 py-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NexusAI - AI Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
