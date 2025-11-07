export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative">
        {/* Animated loader */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-indigo-600/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-purple-600 rounded-full animate-spin spin-reverse"></div>
        </div>

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-white animate-pulse" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
            <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-1/3 text-center">
        <p className="text-white/60 text-sm font-medium animate-pulse">Loading NexusAI...</p>
      </div>
    </div>
  );
}
