'use client';

import LanguageToggle from '@/components/language-toggle';
import { translations } from '@/config/translations';
import { useLanguage } from '@/hooks';
import Link from 'next/link';

export default function Home() {
  const { language, mounted } = useLanguage();

  // استخدام اللغة المحفوظة أو الافتراضية
  const t = translations[language];

  // عرض شاشة فارغة حتى يتم تحميل اللغة من localStorage لتجنب الوميض
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Neural Network Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 animated-grid"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...new Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full particle"
            ></div>
          ))}
        </div>

        {/* Gradient Orbs - Neural Style */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 neural-orb"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 neural-orb delay-1"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 neural-orb delay-2"></div>
      </div>

      {/* Language Toggle - Neural Style */}
      <div className="fixed top-8 right-8 z-50">
        <div className="backdrop-blur-xl bg-white/5 border border-purple-500/20 rounded-2xl p-1 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
          <LanguageToggle />
        </div>
      </div>

      {/* Main Content - Premium Layout */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center space-y-12">

            {/* Logo Icon - 3D Effect */}
            <div className="flex justify-center perspective-1000">
              <div className="relative group transform hover:scale-110 transition-all duration-500">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 animate-pulse"></div>

                {/* 3D Icon Container */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-[0_20px_60px_rgba(168,85,247,0.4)] transform group-hover:rotate-y-12 transition-transform duration-500">
                    {/* AI Brain Icon */}
                    <svg className="w-20 h-20 text-white drop-shadow-2xl" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Title - Cinematic */}
            <div className="space-y-6">
              <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white animate-gradient-x">
                  ZORO
                </span>
                <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x">
                  AI
                </span>
              </h1>

              {/* Subtitle with Typewriter Effect */}
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-400 tracking-wide">
                {language === 'ar' ? (
                  <>
                    <span className="text-purple-400">الذكاء الاصطناعي</span>
                    {' '}• بلا حدود
                  </>
                ) : (
                  <>
                    <span className="text-purple-400">Artificial Intelligence</span>
                    {' '}• Unlimited
                  </>
                )}
              </p>
            </div>

            {/* AI Models - Premium Cards */}
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
              {['GPT-4', 'Claude 3', 'Gemini Pro'].map((model, index) => (
                <div
                  key={model}
                  className="group relative px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                    {model}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 rounded-2xl transition-all duration-300"></div>
                </div>
              ))}
            </div>

            {/* CTA Button - Magnetic Effect */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/chat"
                className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl font-bold text-xl text-white shadow-[0_20px_60px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_80px_rgba(168,85,247,0.6)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <span className="relative z-10 flex items-center gap-3">
                  {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              {/* Secondary Button */}
              <button className="px-12 py-6 border-2 border-purple-500/30 rounded-2xl font-semibold text-lg text-gray-300 hover:text-white hover:border-purple-500 backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300">
                {language === 'ar' ? 'اكتشف المزيد' : 'Explore More'}
              </button>
            </div>

            {/* Stats - World Class Design */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16">
              {[
                { value: '10M+', label: language === 'ar' ? 'مستخدم' : 'Users' },
                { value: '99.9%', label: language === 'ar' ? 'دقة' : 'Accuracy' },
                { value: '24/7', label: language === 'ar' ? 'دعم' : 'Support' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="text-center space-y-2 p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                    <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>      {/* Footer - Minimal */}
      <footer className="fixed bottom-6 left-0 right-0 z-10">
        <div className="text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} NexusAI</p>
        </div>
      </footer>
    </div>
  );
}
