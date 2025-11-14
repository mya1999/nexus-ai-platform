'use client';

export default function ErrorPage({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-2xl font-bold">عذراً، حدث خطأ غير متوقع</h2>
        <p className="mb-6 text-gray-400">نحن نعمل على إصلاح المشكلة. يرجى المحاولة مرة أخرى.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-xl bg-white px-6 py-3 font-bold text-black transition-transform hover:scale-105"
          >
            حاول مرة أخرى
          </button>
          <button
            onClick={() => (globalThis.location.href = '/')}
            className="glass-dark border-luxury rounded-xl px-6 py-3 font-bold transition-colors hover:bg-white/5"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
