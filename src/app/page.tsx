export default function Home() {
  return (
    <main className="min-h-screen gradient-dark text-white">
      <nav className="backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-luxury-white">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-2xl font-bold gradient-text-white">
              NexusAI
            </span>
          </div>
          <a href="/chat" className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform hover:shadow-luxury-white">
            ابدأ الآن
          </a>
        </div>
      </nav>

      <section className="container mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-white/5 border border-white/20 rounded-full text-gray-300 text-sm">
          🚀 الجيل التالي من الذكاء الاصطناعي
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8">
          <span className="gradient-text-white">
            قوة الذكاء
          </span>
          <br />
          <span>في متناول يدك</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          منصة ذكاء اصطناعي شاملة تجمع أقوى النماذج العالمية في مكان واحد.
          <span className="text-white font-semibold"> GPT-4، Claude، Gemini</span> وأكثر.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="/chat" className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-luxury-white hover:shadow-2xl">
            ابدأ مجاناً
          </a>
          <button className="px-8 py-4 bg-black/50 border border-white/20 rounded-2xl font-semibold text-lg hover:bg-black/70 transition-colors backdrop-blur-xl">
            شاهد العرض التوضيحي
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="p-6 glass-dark rounded-2xl backdrop-blur-xl animate-glow-pulse">
            <div className="text-4xl mb-2">🤖</div>
            <div className="text-3xl font-bold text-white mb-1">10+</div>
            <div className="text-sm text-gray-400">نماذج AI</div>
          </div>
          <div className="p-6 glass-dark rounded-2xl backdrop-blur-xl animate-glow-pulse">
            <div className="text-4xl mb-2">💬</div>
            <div className="text-3xl font-bold text-white mb-1">1M+</div>
            <div className="text-sm text-gray-400">محادثة</div>
          </div>
          <div className="p-6 glass-dark rounded-2xl backdrop-blur-xl animate-glow-pulse">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="text-sm text-gray-400">وقت التشغيل</div>
          </div>
          <div className="p-6 glass-dark rounded-2xl backdrop-blur-xl animate-glow-pulse">
            <div className="text-4xl mb-2">🛟</div>
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-gray-400">دعم فني</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/20 py-12 text-center text-gray-400">
        <p>© 2025 NexusAI. جميع الحقوق محفوظة.</p>
      </footer>
    </main>
  );
}
