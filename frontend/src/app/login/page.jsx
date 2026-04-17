"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/auth";

const features = [
  { icon: "⛓", text: "Manage all your links in one place" },
  { icon: "↗", text: "Track clicks and see what performs" },
  { icon: "◉", text: "Beautiful public profile page" },
];

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token + username for dashboard access
      localStorage.setItem("token", data.token);
      localStorage.setItem("dashboard_username", data.user.username);
      router.push(`/dashboard/${data.user.username}`);
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data?.message || "Invalid email or password.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left Panel — Branding ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#111111] flex-col justify-between p-12 relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d2e823]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#d2e823]/4 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 bg-[#d2e823] rounded-xl flex items-center justify-center">
            <span className="text-[#0d0d0d] font-black text-sm">L</span>
          </div>
          <span className="text-white font-black text-xl tracking-tight">Lynkify</span>
        </Link>

        {/* Center content */}
        <div className="flex flex-col gap-8 relative z-10">
          <div>
            <h2 className="text-4xl font-black text-white leading-tight">
              Your links.<br />
              <span className="text-[#d2e823]">Your audience.</span>
            </h2>
            <p className="text-white/40 mt-4 text-base leading-relaxed">
              One beautiful page that holds everything your audience needs.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {features.map((f) => (
              <div key={f.text} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-sm flex-shrink-0">
                  {f.icon}
                </div>
                <p className="text-sm text-white/50 font-medium">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-white/20 text-xs relative z-10">
          © 2025 Lynkify. All rights reserved.
        </p>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 bg-[#fafaf8] flex flex-col items-center justify-center px-6 py-12">

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-[#111111] rounded-xl flex items-center justify-center">
            <span className="text-[#d2e823] font-black text-xs">L</span>
          </div>
          <span className="text-[#111111] font-black text-lg">Lynkify</span>
        </Link>

        <div className="w-full max-w-sm flex flex-col gap-8">

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-black text-[#111111]">Welcome back</h1>
            <p className="text-sm text-black/40 mt-1.5">Sign in to your Lynkify account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="px-4 py-3 rounded-xl border border-black/10 text-sm outline-none focus:border-[#111111] bg-white text-[#111111] placeholder:text-black/25 transition-colors shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-black/40 uppercase tracking-widest">
                  Password
                </label>
                <Link href="#" className="text-xs text-[#111111] font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="px-4 py-3 rounded-xl border border-black/10 text-sm outline-none focus:border-[#111111] bg-white text-[#111111] placeholder:text-black/25 transition-colors shadow-sm"
              />
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-xs font-semibold px-4 py-3 rounded-xl">
                <span>⚠</span> {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-1 bg-[#111111] text-white py-3.5 rounded-xl text-sm font-bold hover:bg-[#222222] active:scale-[0.98] transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-black/8" />
            <p className="text-xs text-black/30 font-medium">New to Lynkify?</p>
            <div className="flex-1 h-px bg-black/8" />
          </div>

          {/* Sign up link */}
          <Link
            href="/signup"
            className="w-full flex items-center justify-center bg-[#d2e823] text-[#111111] py-3.5 rounded-xl text-sm font-bold hover:brightness-105 active:scale-[0.98] transition-all"
          >
            Create a free account →
          </Link>

        </div>
      </div>

    </div>
  );
}
