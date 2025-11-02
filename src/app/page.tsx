export default function Home() {
  return (
    <main className="min-h-screen velvet-dark text-white">
      <nav className="glass-dark sticky top-0 z-50 border-b border-luxury">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-luxury-white animate-float-luxury">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-3xl font-black gradient-text-white">
              NexusAI
            </span>
          </div>
          <a href="/chat" className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform shadow-luxury-white hover:shadow-2xl">
            ابدأ الآن
          </a>
        </div>
      </nav>

      <section className="container mx-auto px-6 py-28 text-center">
        <div className="inline-block mb-8 px-6 py-2 glass-dark rounded-full text-gray-300 text-lg border-luxury animate-float-luxury">
          🚀 الجيل التالي من الذكاء الاصطناعي
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black mb-10 leading-tight">
          <span className="gradient-text-white animate-shimmer-white">
            قوة الذكاء
          </span>
          <br />
          <span className="opacity-90">في متناول يدك</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
          منصة ذكاء اصطناعي شاملة تجمع أقوى النماذج العالمية في مكان واحد.
          <span className="text-white font-bold"> GPT-4، Claude، Gemini</span> وأكثر.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <a href="/chat" className="w-64 px-8 py-5 bg-white text-black rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-luxury-white hover:shadow-2xl">
            ابدأ مجاناً
          </a>
          <button className="w-64 px-8 py-5 glass-dark border-luxury rounded-2xl font-bold text-xl hover:bg-white/5 transition-colors">
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
