import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

// Row 1 — scrolls left
const row1Profiles = [
  {
    name: "Sofia Lens",
    handle: "@sofialens",
    avatarColor: "#64748b",
    cardBg: "#0f172a",
    textColor: "#e2e8f0",
    linkBg: "#1e293b",
    links: ["Photography Portfolio", "Booking Calendar", "Prints Shop"],
  },
  {
    name: "The Daily Pod",
    handle: "@thedailypod",
    avatarColor: "#eab308",
    cardBg: "#fefce8",
    textColor: "#713f12",
    linkBg: "#fef08a",
    links: ["Latest Episode", "Spotify & Apple", "Support the Show"],
  },
  {
    name: "Aria Beats",
    handle: "@ariabeats",
    avatarColor: "#f43f5e",
    cardBg: "#fff1f2",
    textColor: "#9f1239",
    linkBg: "#fecdd3",
    links: ["Stream My Music", "Upcoming Events", "Buy Merch"],
  },
  {
    name: "Nomad Tales",
    handle: "@nomadtales",
    avatarColor: "#0ea5e9",
    cardBg: "#f0f9ff",
    textColor: "#0c4a6e",
    linkBg: "#bae6fd",
    links: ["Travel Blog", "Destination Guides", "Photo Presets"],
  },
];

// Row 2 — scrolls right (different profiles for variety)
const row2Profiles = [
  {
    name: "Style by Maya",
    handle: "@stylebymaya",
    avatarColor: "#ec4899",
    cardBg: "#fdf4ff",
    textColor: "#701a75",
    linkBg: "#f5d0fe",
    links: ["Shop My Looks", "Fashion Blog", "Collabs & Press"],
  },
  {
    name: "Coach Marcus",
    handle: "@coachmarcus",
    avatarColor: "#14b8a6",
    cardBg: "#042f2e",
    textColor: "#ccfbf1",
    linkBg: "#134e4a",
    links: ["Free Workout Plan", "1-on-1 Coaching", "YouTube Channel"],
  },
  {
    name: "Green Plate",
    handle: "@greenplate",
    avatarColor: "#22c55e",
    cardBg: "#f0fdf4",
    textColor: "#14532d",
    linkBg: "#bbf7d0",
    links: ["Weekly Recipes", "Meal Plans", "Cooking Classes"],
  },
  {
    name: "Pixel & Co.",
    handle: "@pixelandco",
    avatarColor: "#8b5cf6",
    cardBg: "#faf5ff",
    textColor: "#4c1d95",
    linkBg: "#ddd6fe",
    links: ["Design Portfolio", "Figma Templates", "Hire Me"],
  },
];

// ─── SUB-COMPONENT ────────────────────────────────────────────────────────────

// Compact horizontal card — wider than tall to fit nicely in a row
const ProfileCard = ({ profile }) => (
  <div
    style={{ backgroundColor: profile.cardBg }}
    className="rounded-2xl p-4 w-[190px] flex-shrink-0 shadow-md flex flex-col items-center gap-3"
  >
    {/* Avatar with initials */}
    <div
      style={{ backgroundColor: profile.avatarColor }}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
    >
      {profile.name.slice(0, 2).toUpperCase()}
    </div>

    {/* Name and handle */}
    <div className="text-center">
      <p style={{ color: profile.textColor }} className="font-bold text-xs">
        {profile.name}
      </p>
      <p className="text-[10px] text-gray-400">{profile.handle}</p>
    </div>

    {/* Link buttons */}
    <div className="flex flex-col gap-1.5 w-full">
      {profile.links.map((link) => (
        <div
          key={link}
          style={{ backgroundColor: profile.linkBg, color: profile.textColor }}
          className="rounded-lg py-1.5 text-center text-[10px] font-medium"
        >
          {link}
        </div>
      ))}
    </div>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const TemplatesSection = () => {
  // Duplicate each row for seamless infinite loop
  const row1 = [...row1Profiles, ...row1Profiles];
  const row2 = [...row2Profiles, ...row2Profiles];

  return (
    <section className="w-full bg-white py-24 px-6">

      {/* CSS animations — row 1 slides left, row 2 slides right */}
      <style>{`
        @keyframes slideLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .row-slide-left  { animation: slideLeft  14s linear infinite; }
        .row-slide-right { animation: slideRight 11s linear infinite; }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* ── Left Side — Two Horizontal Scrolling Rows ── */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Row 1 — slides left */}
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-14 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="row-slide-left flex flex-row gap-4">
              {row1.map((profile, i) => (
                <ProfileCard key={i} profile={profile} />
              ))}
            </div>
            <div className="absolute top-0 right-0 h-full w-14 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>

          {/* Row 2 — slides right */}
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-14 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="row-slide-right flex flex-row gap-4">
              {row2.map((profile, i) => (
                <ProfileCard key={i} profile={profile} />
              ))}
            </div>
            <div className="absolute top-0 right-0 h-full w-14 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>

        </div>

        {/* ── Right Side — Content ── */}
        <div className="flex-1 flex flex-col gap-6">

          <span className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]">
            Hundreds of Templates
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            Pick a template <br /> that fits your vibe
          </h2>

          <p className="text-[#6b6b6b] text-base leading-relaxed max-w-md">
            From photographers to podcasters, we have stunning templates ready to go.
            Customize colors, fonts, and layouts to match your brand in just a few clicks.
          </p>

          <Link
            href="/signup"
            className="bg-violet-100 text-violet-700 px-8 py-4 rounded-full font-bold text-sm w-fit hover:bg-violet-200 transition-colors duration-200"
          >
            Browse Templates
          </Link>

        </div>

      </div>
    </section>
  );
};

export default TemplatesSection;
