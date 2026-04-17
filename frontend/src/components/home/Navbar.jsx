"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-[#d2e823] sticky top-0 z-50 px-[20px] py-[20px]">

      {/* Centered Navbar Container */}
      <nav className="max-w-7xl mx-auto bg-[#ffffff] border border-[#e8e8e6] rounded-full px-10 h-[90px] flex items-center justify-between shadow-sm">

        {/* Left Side — Logo + Nav Links */}
        <div className="flex items-center gap-12">

          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-[#1a1a1a] tracking-tight whitespace-nowrap">
            Lynkify
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[#6b6b6b] hover:text-[#1a1a1a] font-medium text-base transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side — Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {/* Login */}
          <Link
            href="/login"
            className="bg-[#f3f3f1] text-[#1a1a1a] px-8 py-4 rounded-full text-base font-bold hover:bg-[#e8e8e6] transition-colors duration-200"
          >
            Log in
          </Link>

          {/* Sign up */}
          <Link
            href="/signup"
            className="bg-[#111111] text-white px-8 py-4 rounded-full text-base font-bold hover:bg-[#222222] transition-colors duration-200"
          >
            Get Started →
          </Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 bg-white border border-[#e8e8e6] rounded-2xl px-6 py-5 flex flex-col gap-4 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#6b6b6b] hover:text-[#1a1a1a] font-medium text-sm transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-[#f3f3f1] text-[#1a1a1a] px-5 py-2.5 rounded-full text-sm font-bold text-center hover:bg-[#e8e8e6] transition-colors duration-200"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="bg-[#111111] text-white px-5 py-2.5 rounded-full text-sm font-bold text-center hover:bg-[#222222] transition-colors duration-200"
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
