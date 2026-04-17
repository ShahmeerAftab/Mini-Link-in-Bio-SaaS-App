import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d2e823]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#d2e823]/4 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#d2e823] rounded-xl flex items-center justify-center">
            <span className="text-[#0d0d0d] font-black text-xs">L</span>
          </div>
          <span className="text-white font-black text-lg tracking-tight">Lynkify</span>
        </Link>

        {/* 404 number */}
        <div className="relative">
          <p className="text-[160px] font-black text-white/5 leading-none select-none">
            404
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-7xl font-black text-[#d2e823] leading-none">
            404
          </p>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-black text-white">Page not found</h1>
          <p className="text-sm text-white/40 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <Link
            href="/"
            className="flex-1 bg-[#d2e823] text-[#111111] px-6 py-3.5 rounded-xl text-sm font-bold text-center hover:brightness-105 active:scale-[0.98] transition-all"
          >
            ← Go Home
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 bg-white/6 border border-white/8 text-white/70 px-6 py-3.5 rounded-xl text-sm font-bold text-center hover:bg-white/10 hover:text-white active:scale-[0.98] transition-all"
          >
            Open Dashboard
          </Link>
        </div>

      </div>

    </div>
  );
}
