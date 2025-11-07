'use client';

export default function ErrorPage({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">عذراً، حدث خطأ غير متوقع</h2>
        <p className="text-gray-400 mb-6">
          نحن نعمل على إصلاح المشكلة. يرجى المحاولة مرة أخرى.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform"
          >
            حاول مرة أخرى
          </button>
          <button
            onClick={() => globalThis.location.href = '/'}
            className="px-6 py-3 glass-dark border-luxury rounded-xl font-bold hover:bg-white/5 transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
