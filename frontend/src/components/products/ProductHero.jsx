import Link from "next/link";

const ProductHero = () => {
  return (
    <section className="w-full bg-[#d2e823] py-16 px-6">
      <style>{`
        @keyframes circulateUp {
          0%   { transform: translateY(50px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        .phone-circulate {
          animation: circulateUp 3.5s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* ── Left Side — Content ── */}
        <div className="flex-1 flex flex-col items-start gap-6">

          {/* Label */}
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1a1a1a]">
            Lynkify Products
          </span>

          {/* Heading */}
          <h1
            className="text-5xl md:text-6xl font-black text-[#000000] leading-tight tracking-tight"
            style={{ WebkitTextStroke: "1px #000000" }}
          >
           A link in bio built for you.
          </h1>

          {/* Paragraph */}
          <p className="text-base text-[#1a1a1a] font-medium leading-relaxed max-w-md">
         Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          {/* CTA Button */}
          <Link
            href="/register"
            className="bg-[#14532d] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#166534] transition-colors duration-200 shadow-lg"
          >
            Get Started for Free
          </Link>

        </div>

        {/* ── Right Side — Animated Phone Mockup ── */}
        <div className="flex-1 flex justify-center">
          <div className="phone-circulate">

            {/* Phone frame */}
            <div className="w-[260px] bg-[#2e1065] rounded-[40px] p-3 shadow-2xl">

              {/* Screen */}
              <div className="bg-[#502274] rounded-[32px] overflow-hidden">

                {/* Status bar */}
                <div className="bg-[#3b0764] px-5 py-2 flex justify-between items-center">
                  <span className="text-[10px] font-semibold text-white">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-1.5 bg-white rounded-sm opacity-70" />
                    <div className="w-3 h-1.5 bg-white rounded-sm opacity-50" />
                    <div className="w-3 h-1.5 bg-white rounded-sm opacity-30" />
                  </div>
                </div>

                {/* Profile content */}
                <div className="px-5 py-6 flex flex-col items-center gap-3">

                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-[#d2e823] flex items-center justify-center text-[#1a1a1a] font-black text-xl">
                    L
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <p className="font-bold text-sm text-white">Lynkify User</p>
                    <p className="text-xs text-white opacity-60">@lynkifyuser</p>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col gap-2 w-full mt-1">
                    <div className="bg-white text-[#502274] text-center text-xs font-semibold py-2.5 rounded-xl">
                      My Portfolio
                    </div>
                    <div className="bg-white text-[#502274] text-center text-xs font-semibold py-2.5 rounded-xl">
                      YouTube Channel
                    </div>
                    <div className="bg-white text-[#502274] text-center text-xs font-semibold py-2.5 rounded-xl">
                      Shop My Products
                    </div>
                    <div className="bg-[#d2e823] text-[#1a1a1a] text-center text-xs font-semibold py-2.5 rounded-xl">
                      Book a Call
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductHero;
