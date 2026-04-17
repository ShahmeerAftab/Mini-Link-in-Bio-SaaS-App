import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

// 4 profile cards that orbit in a circle
const orbitProfiles = [
  {
    name: "Luna Music",
    handle: "@lunamusic",
    avatarColor: "#a855f7",
    cardBg: "#1e1b4b",
    textColor: "#e9d5ff",
  },
  {
    name: "Style by Maya",
    handle: "@stylebymaya",
    avatarColor: "#ec4899",
    cardBg: "#fdf4ff",
    textColor: "#701a75",
  },
  {
    name: "Dev Patel",
    handle: "@devpatel",
    avatarColor: "#3b82f6",
    cardBg: "#eff6ff",
    textColor: "#1e3a8a",
  },
  {
    name: "Zen Studio",
    handle: "@zenstudio",
    avatarColor: "#22c55e",
    cardBg: "#f0fdf4",
    textColor: "#14532d",
  },
];

// ─── SUB-COMPONENT ────────────────────────────────────────────────────────────

// Small profile card used inside the orbit
const OrbitCard = ({ profile }) => (
  <div
    style={{ backgroundColor: profile.cardBg }}
    className="w-[100px] flex flex-col items-center gap-2 p-3 rounded-2xl shadow-lg"
  >
    {/* Avatar */}
    <div
      style={{ backgroundColor: profile.avatarColor }}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
    >
      {profile.name.slice(0, 2).toUpperCase()}
    </div>

    {/* Name + handle */}
    <div className="text-center">
      <p style={{ color: profile.textColor }} className="font-bold text-[10px] leading-tight">
        {profile.name}
      </p>
      <p className="text-[9px] text-gray-400">{profile.handle}</p>
    </div>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const ProductShareSection = () => {
  return (
    <section className="w-full bg-[#f3f3f1] py-24 px-6">

      {/*
        Orbit animation:
        - Each card starts at the center of the container
        - rotate(Ndeg) spins the axis, translateX(radius) pushes it out
        - rotate(-Ndeg) keeps the card upright while orbiting
        - 4 cards are offset by 25% of the duration each (every -3s of a 12s loop)
      */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg)   translateX(140px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
        }
        .orbit-1 { animation: orbit 12s linear infinite; animation-delay:  0s; }
        .orbit-2 { animation: orbit 12s linear infinite; animation-delay: -3s; }
        .orbit-3 { animation: orbit 12s linear infinite; animation-delay: -6s; }
        .orbit-4 { animation: orbit 12s linear infinite; animation-delay: -9s; }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* ── Left Side — Content ── */}
        <div className="flex-1 flex flex-col gap-6">

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            Share everywhere, <br /> all at once
          </h2>

          <p className="text-[#6b6b6b] text-base leading-relaxed max-w-md">
            Add your Lynkify link to Instagram, TikTok, YouTube and more.
            One link that connects your whole world to your audience.
          </p>

          <Link
            href="/register"
            className="bg-pink-100 text-pink-700 px-8 py-4 rounded-full font-bold text-sm w-fit hover:bg-pink-200 transition-colors duration-200"
          >
            Get Started
          </Link>

        </div>

        {/* ── Right Side — Circular Orbit ── */}
        <div className="flex-1 flex justify-center items-center">

          {/* Orbit container — cards are positioned at the center and animated outward */}
          <div className="relative w-[340px] h-[340px] flex items-center justify-center">

            {/* Dashed orbit ring */}
            <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-dashed border-[#1a1a1a] opacity-10" />

            {/* Center logo */}
            <div className="w-16 h-16 rounded-full bg-[#14532d] flex items-center justify-center z-10 shadow-lg">
              <span className="text-white font-black text-lg">L</span>
            </div>

            {/* Orbiting profile cards */}
            {orbitProfiles.map((profile, i) => (
              <div
                key={profile.handle}
                className={`absolute orbit-${i + 1}`}
                style={{ top: "calc(50% - 50px)", left: "calc(50% - 50px)" }}
              >
                <OrbitCard profile={profile} />
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductShareSection;
