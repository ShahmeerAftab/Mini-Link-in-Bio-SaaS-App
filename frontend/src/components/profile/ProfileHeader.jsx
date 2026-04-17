import Link from "next/link";

// Left panel — avatar, name, handle, bio — styled with the user's chosen template

const ProfileHeader = ({ profile, isLoading, template }) => {
  const logoTextColor = template?.panelDark ? "#ffffff" : "#111111";
  const logoBadgeBg   = "#d2e823"; // always Lynkify yellow-green

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="flex flex-col justify-between p-10 min-h-[40vh] md:min-h-screen animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/10" />
          <div className="h-4 w-20 rounded-full bg-white/10" />
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="w-28 h-28 rounded-full bg-white/10" />
          <div className="h-6 w-40 rounded-full bg-white/20" />
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="h-3 w-56 rounded-full bg-white/10" />
        </div>
        <div className="h-8 w-36 rounded-full bg-white/6 mx-auto" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-between p-10 min-h-[40vh] md:min-h-screen overflow-hidden">

      {/* Accent glow blobs */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-15"
        style={{ backgroundColor: template.accentColor }}
      />
      <div
        className="absolute top-1/4 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ backgroundColor: template.accentColor }}
      />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 relative z-10">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: logoBadgeBg }}
        >
          <span className="text-[#0d0d0d] font-black text-xs">L</span>
        </div>
        <span className="font-black text-lg tracking-tight" style={{ color: logoTextColor }}>
          Lynkify
        </span>
      </Link>

      {/* Center — avatar + info */}
      <div className="flex flex-col items-center text-center gap-5 relative z-10">

        {/* Avatar */}
        {profile?.profileImage ? (
          <img
            src={profile.profileImage}
            alt={profile.fullName}
            className="w-28 h-28 rounded-full object-cover shadow-2xl"
            style={{ outline: `4px solid ${template.accentColor}20` }}
          />
        ) : (
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: template.accentColor }}
          >
            <span
              className="text-3xl font-black"
              style={{ color: template.avatarTextColor }}
            >
              {profile?.fullName?.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Name + handle */}
        <div>
          <h1 className="text-2xl font-black leading-tight" style={{ color: template.nameColor }}>
            {profile?.fullName}
          </h1>
          <p className="text-sm mt-1 font-medium" style={{ color: template.handleColor }}>
            @{profile?.username}
          </p>
        </div>

        {/* Bio */}
        {profile?.bio && (
          <p
            className="text-sm max-w-xs leading-relaxed"
            style={{ color: template.handleColor }}
          >
            {profile.bio}
          </p>
        )}

      </div>

      {/* Bottom — Powered by badge */}
      <div className="flex justify-center relative z-10">
        <div
          className="px-4 py-2 rounded-full border"
          style={{
            backgroundColor: `${template.accentColor}12`,
            borderColor: `${template.accentColor}25`,
          }}
        >
          <p
            className="text-[10px] uppercase tracking-widest font-semibold"
            style={{ color: template.handleColor }}
          >
            Powered by Lynkify
          </p>
        </div>
      </div>

    </div>
  );
};

export default ProfileHeader;
