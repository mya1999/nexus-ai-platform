import LanguageToggle from '@/components/language-toggle';
import { translations } from '@/config/translations';
import Link from 'next/link';

// صفحة خادمية بالكامل لضمان عرض محتوى مبدئي حتى بدون تشغيل JavaScript
// ملاحظة: سيتم عرض المحتوى باللغة الإنجليزية افتراضيًا على الخادم.
// يمكن لاحقًا تحسينها لاختيار اللغة من الكوكيز/الرأس Accept-Language.
export default function Home() {
  const t = translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Modern Grid Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 grid-bg-64"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation - Centered Logo */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/50 border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-all"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold"><span className="text-white">NEXUS</span><span className="text-indigo-400">AI</span></span>
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Hero - Centered */}
      <main className="relative z-10">
        <section className="container mx-auto px-6 pt-32 pb-12">
          <div className="max-w-5xl text-center mx-auto">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Powered by Advanced AI</span>
            </div>

            {/* Main Title - CENTERED */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-5">
              <span className="block bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">{t.hero.title}</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mt-2">{t.hero.subtitle}</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">{t.hero.description}</p>

            {/* AI Badges */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl mb-8">
              <span className="text-lg font-semibold">GPT-4</span>
              <span className="text-gray-600">•</span>
              <span className="text-lg font-semibold">Claude</span>
              <span className="text-gray-600">•</span>
              <span className="text-lg font-semibold">Gemini</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/chat" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all">
                {t.hero.cta.primary} →
              </Link>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all">
                {t.hero.cta.secondary}
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { id: 'models', icon: '🤖', value: t.stats.models.title, label: t.stats.models.subtitle },
              { id: 'conversations', icon: '💬', value: t.stats.conversations.title, label: t.stats.conversations.subtitle },
              { id: 'uptime', icon: '⚡', value: t.stats.uptime.title, label: t.stats.uptime.subtitle },
              { id: 'support', icon: '🛡️', value: t.stats.support.title, label: t.stats.support.subtitle },
            ].map((stat) => (
              <div key={stat.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:scale-105 transition-all text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {[
              { id: 'ai-models', title: t.features.aiModels.title, description: t.features.aiModels.description, icon: '🧠' },
              { id: 'real-time', title: t.features.realTime.title, description: t.features.realTime.description, icon: '⚡' },
              { id: 'security', title: t.features.security.title, description: t.features.security.description, icon: '🔐' },
              { id: 'multi-modal', title: t.features.multiModal.title, description: t.features.multiModal.description, icon: '🎨' },
              { id: 'availability', title: t.features.availability.title, description: t.features.availability.description, icon: '🌐' },
              { id: 'api', title: t.features.api.title, description: t.features.api.description, icon: '🔌' },
            ].map((feature) => (
              <div key={feature.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-12 py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} NexusAI. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
