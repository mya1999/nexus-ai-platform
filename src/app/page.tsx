export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
      <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Nexus AI
            </span>
          </div>
          <a href="/chat" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform">
            ابدأ الآن
          </a>
        </div>
      </nav>

      <section className="container mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm">
          �� الجيل التالي من الذكاء الاصطناعي
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            قوة الذكاء
          </span>
          <br />
          <span>في متناول يدك</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
          منصة ذكاء اصطناعي شاملة تجمع أقوى النماذج العالمية في مكان واحد.
          <span className="text-blue-400 font-semibold"> GPT-4، Claude، Gemini</span> وأكثر.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="/chat" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">
            ابدأ مجاناً
          </a>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-colors">
            شاهد العرض التوضيحي
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="text-4xl mb-2">🤖</div>
            <div className="text-3xl font-bold text-blue-400 mb-1">10+</div>
            <div className="text-sm text-slate-400">نماذج AI</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="text-4xl mb-2">💬</div>
            <div className="text-3xl font-bold text-blue-400 mb-1">1M+</div>
            <div className="text-sm text-slate-400">محادثة</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-3xl font-bold text-blue-400 mb-1">99.9%</div>
            <div className="text-sm text-slate-400">وقت التشغيل</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="text-4xl mb-2">🛟</div>
            <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
            <div className="text-sm text-slate-400">دعم فني</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-white/5 py-12 text-center text-slate-400">
        <p>© 2025 Nexus AI. جميع الحقوق محفوظة.</p>
      </footer>
    </main>
  );
}
