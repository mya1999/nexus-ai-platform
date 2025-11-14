export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-purple-600/20 blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Animated loader */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600/30"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600"></div>
          <div className="spin-reverse absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-purple-600"></div>
        </div>

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-8 w-8 animate-pulse text-white" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9" />
            <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-1/3 text-center">
        <p className="animate-pulse text-sm font-medium text-white/60">Loading NexusAI...</p>
      </div>
    </div>
  );
}
