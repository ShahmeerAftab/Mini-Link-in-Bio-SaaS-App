"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api/profile";
import ProfileSection from "./ProfileSection";
import LinksSection from "./LinksSection";

// ── Sidebar Nav Item ──────────────────────────────────────────────────────────

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left ${
      active
        ? "bg-[#d2e823] text-[#0d0d0d]"
        : "text-white/45 hover:text-white hover:bg-white/6"
    }`}
  >
    <span className={`text-base w-5 text-center ${active ? "opacity-100" : "opacity-60"}`}>
      {icon}
    </span>
    {label}
    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0d0d0d]/40" />}
  </button>
);

// ── Main Dashboard ────────────────────────────────────────────────────────────

const DashboardPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dashboard_username");
    setUsername(saved || "");
  }, []);

  const handleLogout = () => {
    // Clear both token and username on logout
    localStorage.removeItem("token");
    localStorage.removeItem("dashboard_username");
    router.push("/login");
  };

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
    enabled: !!username,
  });

  // ── Not loaded yet (avoid flash of form) ─────────────────────────────────
  if (username === null) {
    return <div className="min-h-screen bg-[#0d0d0d]" />;
  }

  // ── No username — not logged in, send to login page ─────────────────────
  if (!username) {
    router.push("/login");
    return null;
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-[#d2e823]/30 border-t-[#d2e823] rounded-full animate-spin" />
        <p className="text-white/30 text-sm">Loading dashboard…</p>
      </div>
    );
  }

  // ── Profile not found ─────────────────────────────────────────────────────
  if (isError || !profile) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
        <div className="bg-[#171717] border border-white/8 rounded-2xl p-10 text-center flex flex-col gap-4 max-w-sm w-full">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-400 text-xl">!</span>
          </div>
          <div>
            <p className="font-bold text-white">Profile not found</p>
            <p className="text-sm text-white/35 mt-1">
              No profile for <span className="text-white font-semibold">@{username}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/8 text-white/70 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/12 transition-colors"
          >
            Try different username
          </button>
        </div>
      </div>
    );
  }

  // ── Full dashboard ────────────────────────────────────────────────────────

  const tabs = [
    { id: "profile", label: "Profile",   icon: "▣" },
    { id: "links",   label: "My Links",  icon: "⛓" },
  ];

  return (
    <div className="h-screen bg-[#f5f5f3] flex overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#111111] z-30 flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
      `}>

        {/* Brand */}
        <div className="px-5 pt-6 pb-5 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#d2e823] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-[#0d0d0d] font-black text-xs">L</span>
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-tight">Lynkify</p>
            <p className="text-white/25 text-[10px] font-medium">Creator Dashboard</p>
          </div>
        </div>

        {/* Section label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Menu</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 flex flex-col gap-0.5">
          {tabs.map((tab) => (
            <NavItem
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              active={activeTab === tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
            />
          ))}
        </nav>

        {/* Bottom user card */}
        <div className="border-t border-white/5 p-4 flex flex-col gap-3">

          {/* Public profile link */}
          <Link
            href={`/u/${profile.username}`}
            target="_blank"
            className="flex items-center justify-center gap-2 text-xs font-semibold text-[#d2e823] bg-[#d2e823]/8 border border-[#d2e823]/15 px-3 py-2.5 rounded-xl hover:bg-[#d2e823]/15 transition-colors"
          >
            <span>View Public Profile</span>
            <span className="text-[10px]">↗</span>
          </Link>

          {/* User info row */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-[#d2e823] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-black text-[#0d0d0d]">
                {profile.fullName?.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{profile.fullName}</p>
              <p className="text-[10px] text-white/30 truncate">@{profile.username}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="text-white/25 hover:text-white/60 transition-colors text-sm flex-shrink-0"
            >
              ⏻
            </button>
          </div>

        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur border-b border-black/5 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 items-center"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="w-5 h-0.5 bg-[#1a1a1a] rounded-full" />
            <span className="w-5 h-0.5 bg-[#1a1a1a] rounded-full" />
            <span className="w-3 h-0.5 bg-[#1a1a1a] rounded-full self-start ml-1" />
          </button>

          <div>
            <h1 className="text-base font-black text-[#111111]">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-black/35 hidden sm:block">
              Manage your {activeTab === "profile" ? "profile details" : "links and URLs"}
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Quick profile badge */}
          <div className="hidden sm:flex items-center gap-2 bg-[#f5f5f3] border border-black/6 rounded-full px-3 py-1.5">
            <div className="w-5 h-5 rounded-full bg-[#d2e823] flex items-center justify-center">
              <span className="text-[8px] font-black text-[#0d0d0d]">
                {profile.fullName?.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#111111]">@{profile.username}</span>
          </div>

        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          {activeTab === "profile" && <ProfileSection profile={profile} />}
          {activeTab === "links"   && <LinksSection profileId={profile._id} />}
        </main>

      </div>
    </div>
  );
};

export default DashboardPage;
