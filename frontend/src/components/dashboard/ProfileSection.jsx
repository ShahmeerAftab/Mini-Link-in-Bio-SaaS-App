"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, uploadImage } from "@/lib/api/profile";
import { templates } from "@/lib/templates";

const ProfileSection = ({ profile }) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: profile.fullName || "",
    bio: profile.bio || "",
    profileImage: profile.profileImage || "",
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const avatarInputRef = useRef(null);

  // Keep form in sync when profile data refreshes from server
  useEffect(() => {
    setForm({
      fullName: profile.fullName || "",
      bio: profile.bio || "",
      profileImage: profile.profileImage || "",
    });
  }, [profile._id, profile.profileImage]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: (data) => updateProfile(profile._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setEditing(false);
    },
  });

  const { mutate: applyTemplate, isPending: applyingTemplate } = useMutation({
    mutationFn: (templateId) => updateProfile(profile._id, { template: templateId }),
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile(form);
  };

  const handleAvatarUpload = async (file) => {
    if (!file) return;
    setUploadError("");
    setUploadingAvatar(true);
    try {
      const { url } = await uploadImage(file);
      const updated = { ...form, profileImage: url };
      setForm(updated);
      saveProfile(updated);
    } catch (err) {
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="max-w-2xl flex flex-col gap-6">

      {/* ── Profile card ── */}
      <div className="bg-white rounded-2xl border border-black/6 shadow-sm overflow-hidden">

        {/* Banner */}
        <div className="h-24 bg-gradient-to-br from-[#111111] to-[#2a2a2a] relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #d2e823 0%, transparent 60%)" }}
          />
        </div>

        {/* Avatar + name row */}
        <div className="px-8 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-5">

            {/* Clickable avatar */}
            <div
              className="relative group cursor-pointer"
              onClick={() => avatarInputRef.current?.click()}
              title="Click to change profile photo"
            >
              {form.profileImage ? (
                <img
                  src={form.profileImage}
                  alt={profile.fullName}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#d2e823] border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-2xl font-black text-[#0d0d0d]">
                    {profile.fullName?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-2xl bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                {uploadingAvatar ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-white text-base">📷</span>
                    <span className="text-white text-[10px] font-bold leading-none">Change</span>
                  </>
                )}
              </div>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleAvatarUpload(e.target.files[0])}
                onClick={(e) => { e.target.value = null; }}
              />
            </div>

            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 bg-[#111111] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#222222] transition-colors"
              >
                <span>✎</span> Edit Profile
              </button>
            )}
          </div>

          <h2 className="text-xl font-black text-[#111111]">{profile.fullName}</h2>
          <p className="text-sm text-black/40 mt-0.5">@{profile.username}</p>
          {profile.bio && (
            <p className="text-sm text-black/60 mt-3 leading-relaxed">{profile.bio}</p>
          )}

          <p className="text-[11px] text-black/25 mt-3">Click your photo to update it</p>

          {/* Upload error */}
          {uploadError && (
            <p className="text-xs text-red-500 font-semibold mt-2">{uploadError}</p>
          )}
        </div>
      </div>

      {/* ── Edit form ── */}
      {editing && (
        <div className="bg-white rounded-2xl border border-black/6 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-black text-[#111111]">Edit Profile</h3>
            <button
              onClick={() => setEditing(false)}
              className="text-black/30 hover:text-black/60 text-xl transition-colors"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="px-4 py-3 rounded-xl border border-black/8 text-sm outline-none focus:border-[#111111] bg-[#f9f9f7] text-[#111111] placeholder:text-black/25 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell your audience about yourself…"
                rows={3}
                className="px-4 py-3 rounded-xl border border-black/8 text-sm outline-none focus:border-[#111111] bg-[#f9f9f7] text-[#111111] placeholder:text-black/25 resize-none transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#111111] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#222222] transition-colors disabled:opacity-40"
              >
                {isPending ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-black/5 text-[#111111] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black/8 transition-colors"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ── Template switcher ── */}
      <div className="bg-white rounded-2xl border border-black/6 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-[#111111]">Profile Template</h3>
            <p className="text-xs text-black/35 mt-0.5">Choose how your public profile looks</p>
          </div>
          {applyingTemplate && (
            <span className="text-xs text-black/40 flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-black/20 border-t-black/60 rounded-full animate-spin" />
              Saving…
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {templates.map((t) => {
            const active = (profile.template || 1) === t.id;
            return (
              <button
                key={t.id}
                onClick={() => applyTemplate(t.id)}
                disabled={applyingTemplate}
                title={t.name}
                className={`flex flex-col items-center gap-2 p-2.5 rounded-xl border-2 transition-all ${
                  active
                    ? "border-[#111111] scale-[1.03]"
                    : "border-transparent hover:border-black/15"
                }`}
              >
                {/* Mini color swatch */}
                <div
                  className="w-full h-10 rounded-lg flex items-end justify-center pb-1.5 relative overflow-hidden"
                  style={{ backgroundColor: t.panelBg }}
                >
                  {/* Accent dot */}
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: t.accentColor }}
                  />
                  {active && (
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[8px] text-[#111111] font-black">✓</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-black/50 leading-none text-center">
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Info rows ── */}
      <div className="bg-white rounded-2xl border border-black/6 shadow-sm p-6 flex flex-col gap-0 divide-y divide-black/4">
        <div className="flex items-center justify-between py-3.5">
          <p className="text-xs font-bold text-black/35 uppercase tracking-widest">Username</p>
          <p className="text-sm font-semibold text-[#111111]">@{profile.username}</p>
        </div>
        <div className="flex items-center justify-between py-3.5">
          <p className="text-xs font-bold text-black/35 uppercase tracking-widest">Full Name</p>
          <p className="text-sm font-semibold text-[#111111]">{profile.fullName}</p>
        </div>
        <div className="flex items-center justify-between py-3.5">
          <p className="text-xs font-bold text-black/35 uppercase tracking-widest">Bio</p>
          <p className="text-sm text-[#111111] max-w-xs text-right">
            {profile.bio || <span className="text-black/25 italic">No bio yet</span>}
          </p>
        </div>
      </div>

    </div>
  );
};

export default ProfileSection;
