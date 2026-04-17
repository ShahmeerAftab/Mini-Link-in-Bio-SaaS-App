"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api/auth";

const perks = [
  { icon: "⚡", text: "Set up in under 2 minutes" },
  { icon: "🎨", text: "Beautiful profiles out of the box" },
  { icon: "📊", text: "Real-time click analytics" },
  { icon: "🔗", text: "Unlimited links on every plan" },
];

const inputClass =
  "px-4 py-3 rounded-xl border border-black/10 text-sm outline-none focus:border-[#111111] bg-white text-[#111111] placeholder:text-black/25 transition-colors shadow-sm";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    template: typeof window !== "undefined" && localStorage.getItem("pending_template")
      ? parseInt(localStorage.getItem("pending_template"))
      : 1,
  });

  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    const newValue = name === "username" ? value.toLowerCase().replace(/\s/g, "") : value;
    setForm({ ...form, [name]: newValue });
    setErrorMsg("");
  }

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.removeItem("pending_template");
      localStorage.setItem("token", data.token);
      localStorage.setItem("dashboard_username", data.user.username);
      router.push(`/dashboard/${data.user.username}`);
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data?.message || "Something went wrong. Please try again.");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (form.fullName.trim().length < 2) return setErrorMsg("Full name must be at least 2 characters.");
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username)) return setErrorMsg("Username must be 3–20 characters: letters, numbers, underscores only.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErrorMsg("Please enter a valid email address.");
    if (form.password.length < 8) return setErrorMsg("Password must be at least 8 characters.");

    register(form);
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#111111] flex-col justify-between p-12 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d2e823]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#d2e823]/5 rounded-full blur-3xl pointer-events-none" />

        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 bg-[#d2e823] rounded-xl flex items-center justify-center">
            <span className="text-[#0d0d0d] font-black text-sm">L</span>
          </div>
          <span className="text-white font-black text-xl tracking-tight">Lynkify</span>
        </Link>

        <div className="flex flex-col gap-8 relative z-10">
          <div>
            <p className="text-[#d2e823] text-xs font-bold uppercase tracking-widest mb-3">Free forever</p>
            <h2 className="text-4xl font-black text-white leading-tight">
              Join thousands of<br />
              <span className="text-[#d2e823]">creators.</span>
            </h2>
            <p className="text-white/40 mt-4 text-base leading-relaxed">
              Build your link-in-bio page in minutes. No credit card needed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {perks.map((perk) => (
              <div key={perk.text} className="bg-white/4 border border-white/6 rounded-2xl p-4 flex flex-col gap-2">
                <span className="text-xl">{perk.icon}</span>
                <p className="text-xs text-white/50 font-medium leading-snug">{perk.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/20 text-xs relative z-10">© 2025 Lynkify. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-[#fafaf8] flex flex-col items-center justify-center px-6 py-12">

        <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-[#111111] rounded-xl flex items-center justify-center">
            <span className="text-[#d2e823] font-black text-xs">L</span>
          </div>
          <span className="text-[#111111] font-black text-lg">Lynkify</span>
        </Link>

        <div className="w-full max-w-sm flex flex-col gap-8">

          <div>
            <h1 className="text-2xl font-black text-[#111111]">Create your account</h1>
            <p className="text-sm text-black/40 mt-1.5">Get started — its completely free</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Shahmeer Aftab"
                autoComplete="name"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Username</label>
              <div className="flex items-center bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden focus-within:border-[#111111] transition-colors">
                <span className="pl-4 pr-2 text-sm text-black/30 font-semibold select-none">lynkify.app/</span>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="yourname"
                  autoComplete="username"
                  className="flex-1 py-3 pr-4 text-sm outline-none bg-transparent text-[#111111] placeholder:text-black/25"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className={inputClass}
              />
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-xs font-semibold px-4 py-3 rounded-xl">
                ⚠ {errorMsg}
              </div>
            )}

            <p className="text-xs text-black/30 leading-relaxed">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-black/50 underline underline-offset-2">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="text-black/50 underline underline-offset-2">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              disabled={isPending}
              className="bg-[#d2e823] text-[#111111] py-3.5 rounded-xl text-sm font-bold hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#111]/20 border-t-[#111] rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create free account →"
              )}
            </button>

          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-black/8" />
            <p className="text-xs text-black/30 font-medium">Already have an account?</p>
            <div className="flex-1 h-px bg-black/8" />
          </div>

          <Link
            href="/login"
            className="w-full flex items-center justify-center bg-white border border-black/10 text-[#111111] py-3.5 rounded-xl text-sm font-bold hover:bg-black/4 active:scale-[0.98] transition-all shadow-sm"
          >
            Sign in instead
          </Link>

        </div>
      </div>

    </div>
  );
}
