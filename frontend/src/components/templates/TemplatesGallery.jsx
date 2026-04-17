"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { templates } from "@/lib/templates";
import { getProfile, updateProfile } from "@/lib/api/profile";

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const PhoneMockup = ({ template }) => (
  <div
    style={{ backgroundColor: template.phoneBg }}
    className="w-[140px] rounded-[28px] p-2 shadow-xl"
  >
    <div
      style={{ backgroundColor: template.screenBg }}
      className="rounded-[22px] overflow-hidden"
    >
      {/* Status bar */}
      <div
        style={{ backgroundColor: template.statusBg }}
        className="px-3 py-1 flex justify-between items-center"
      >
        <span style={{ color: template.nameColor }} className="text-[8px] font-semibold opacity-70">9:41</span>
        <div className="flex gap-0.5">
          <div style={{ backgroundColor: template.nameColor }} className="w-2 h-1 rounded-sm opacity-60" />
          <div style={{ backgroundColor: template.nameColor }} className="w-2 h-1 rounded-sm opacity-40" />
          <div style={{ backgroundColor: template.nameColor }} className="w-2 h-1 rounded-sm opacity-20" />
        </div>
      </div>

      {/* Profile content */}
      <div className="px-3 py-4 flex flex-col items-center gap-2">
        <div
          style={{ backgroundColor: template.accentColor }}
          className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[9px]"
        >
          <span style={{ color: template.avatarTextColor }}>{template.avatarText}</span>
        </div>

        <div className="text-center">
          <p style={{ color: template.nameColor }} className="font-bold text-[9px]">Your Name</p>
          <p style={{ color: template.handleColor }} className="text-[8px]">@yourhandle</p>
        </div>

        <div className="flex flex-col gap-1 w-full mt-1">
          {template.links.map((link) => (
            <div
              key={link}
              style={{ backgroundColor: template.linkBg, color: template.linkColor }}
              className="rounded-lg py-1 text-center text-[8px] font-semibold"
            >
              {link}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Badge = ({ category }) => {
  const colors = {
    Dark:     "bg-[#1a1a1a] text-white",
    Light:    "bg-[#f3f3f1] text-[#1a1a1a]",
    Colorful: "bg-[#d2e823] text-[#1a1a1a]",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${colors[category]}`}>
      {category}
    </span>
  );
};

const TemplateCard = ({ template, onUse, loading }) => (
  <div className="bg-white rounded-3xl border border-[#e8e8e6] p-6 flex flex-col items-center gap-5 shadow-sm hover:shadow-md transition-shadow duration-200">
    <PhoneMockup template={template} />

    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-[#1a1a1a] text-sm">{template.name}</h3>
        <Badge category={template.category} />
      </div>

      <button
        onClick={() => onUse(template.id)}
        disabled={loading === template.id}
        className="w-full text-center bg-[#111111] text-white py-2.5 rounded-full text-xs font-bold hover:bg-[#222222] transition-colors duration-200 mt-1 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading === template.id ? (
          <>
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Applying…
          </>
        ) : (
          "Use Template →"
        )}
      </button>
    </div>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const TemplatesGallery = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(null); // template id being applied

  const handleUseTemplate = async (templateId) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const username = typeof window !== "undefined" ? localStorage.getItem("dashboard_username") : null;

    if (token && username) {
      // Already logged in — apply template directly to their profile
      setLoading(templateId);
      try {
        const profile = await getProfile(username);
        await updateProfile(profile._id, { template: templateId });
        router.push(`/dashboard/${username}`);
      } catch {
        // Fallback: go through signup
        localStorage.setItem("pending_template", String(templateId));
        router.push("/signup");
      } finally {
        setLoading(null);
      }
    } else {
      // Not logged in — save choice and send to signup
      localStorage.setItem("pending_template", String(templateId));
      router.push("/signup");
    }
  };

  return (
    <>
      {/* ── Top Banner ── */}
      <section className="w-full bg-[#d2e823] py-16 px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1a1a1a]">
          Template Gallery
        </span>
        <h1
          className="text-5xl md:text-6xl font-black text-[#000000] mt-3 leading-tight"
          style={{ WebkitTextStroke: "1px #000000" }}
        >
          Find your perfect <br /> template
        </h1>
        <p className="text-[#1a1a1a] font-medium text-base mt-4 max-w-md mx-auto">
          Choose from our collection of beautifully designed templates. Pick one and make it yours in seconds.
        </p>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="w-full bg-[#f3f3f1] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={handleUseTemplate}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TemplatesGallery;
