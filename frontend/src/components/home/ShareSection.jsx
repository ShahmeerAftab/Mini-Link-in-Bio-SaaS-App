import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

// Each profile card has its own color theme
const profiles = [
  {
    name: "Luna Music",
    handle: "@lunamusic",
    avatarColor: "#a855f7",
    cardBg: "#1e1b4b",
    textColor: "#e9d5ff",
    linkBg: "#4c1d95",
    links: ["New Album Out Now", "Tour Dates 2024", "Merch Store"],
  },
  {
    name: "Feast & Co.",
    handle: "@feastandco",
    avatarColor: "#f97316",
    cardBg: "#fff7ed",
    textColor: "#7c2d12",
    linkBg: "#fed7aa",
    links: ["Today's Recipe", "YouTube Channel", "Cookbook Pre-Order"],
  },
  {
    name: "Zen Studio",
    handle: "@zenstudio",
    avatarColor: "#22c55e",
    cardBg: "#f0fdf4",
    textColor: "#14532d",
    linkBg: "#bbf7d0",
    links: ["Free Meditation", "Online Classes", "Instagram"],
  },
  {
    name: "Dev Patel",
    handle: "@devpatel",
    avatarColor: "#3b82f6",
    cardBg: "#eff6ff",
    textColor: "#1e3a8a",
    linkBg: "#bfdbfe",
    links: ["Portfolio", "GitHub Projects", "Tech Blog"],
  },
];

// ─── SUB-COMPONENT ────────────────────────────────────────────────────────────

// A single profile card with its own color theme
const ProfileCard = ({ profile }) => (
  <div
    style={{ backgroundColor: profile.cardBg }}
    className="rounded-2xl p-5 w-[230px] shadow-lg flex flex-col items-center gap-3"
  >
    {/* Avatar circle with initials */}
    <div
      style={{ backgroundColor: profile.avatarColor }}
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
    >
      {profile.name.slice(0, 2).toUpperCase()}
    </div>

    {/* Name and handle */}
    <div className="text-center">
      <p style={{ color: profile.textColor }} className="font-bold text-sm">
        {profile.name}
      </p>
      <p className="text-xs text-gray-400">{profile.handle}</p>
    </div>

    {/* Link buttons */}
    <div className="flex flex-col gap-2 w-full">
      {profile.links.map((link) => (
        <div
          key={link}
          style={{ backgroundColor: profile.linkBg, color: profile.textColor }}
          className="rounded-xl py-2 text-center text-xs font-medium"
        >
          {link}
        </div>
      ))}
    </div>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const ShareSection = () => {
  // Duplicate profiles so the scroll loop is seamless
  const loopedProfiles = [...profiles, ...profiles];

  return (
    <section className="w-full bg-[#f3f3f1] py-24 px-6">

      {/* CSS animation for the scrolling cards */}
      <style>{`
        @keyframes scrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .cards-scroll {
          animation: scrollUp 10s linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* ── Left Side ── */}
        <div className="flex-1 flex flex-col gap-6">

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            Share your Linktree <br /> anywhere you like!
          </h2>

          <p className="text-[#6b6b6b] text-base leading-relaxed max-w-md">
            Add your unique Linktree URL to all the platforms and places you find your audience.
            Then use your QR code to drive your offline traffic back to your link in bio.
          </p>

          <Link
            href="/signup"
            className="bg-pink-100 text-pink-700 px-8 py-4 rounded-full font-bold text-sm w-fit hover:bg-pink-200 transition-colors duration-200"
          >
            Get Started
          </Link>

        </div>

        {/* ── Right Side — Circulating Profile Cards ── */}
        <div className="flex-1 flex justify-center">

          {/* Overflow container with fade edges */}
          <div className="relative overflow-hidden h-[420px] w-[230px]">

            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#f3f3f1] to-transparent z-10 pointer-events-none" />

            {/* Scrolling cards */}
            <div className="cards-scroll flex flex-col gap-4">
              {loopedProfiles.map((profile, index) => (
                <ProfileCard key={index} profile={profile} />
              ))}
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#f3f3f1] to-transparent z-10 pointer-events-none" />

          </div>
        </div>

      </div>
    </section>
  );
};

export default ShareSection;
