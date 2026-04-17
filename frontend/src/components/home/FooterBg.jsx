import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const footerColumns = [
  {
    title: "Company",
    links: ["Blog", "About", "Careers", "Contact", "Link in Bio"],
  },
  {
    title: "Product",
    links: ["Features", "Templates", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Support",
    links: ["Help Center", "Getting Started", "FAQs", "Report a Problem"],
  },
  {
    title: "Legal",
    links: ["Terms & Conditions", "Privacy Policy", "Cookie Policy"],
  },
];

const storeButtons = [
  {
    label: "Google Play",
    icon: "M3.18 23.76c.3.17.64.24.99.2l13.2-11.88-2.97-2.97L3.18 23.76zM.54 1.46C.2 1.8 0 2.32 0 3v18c0 .68.2 1.2.55 1.54l.08.08L10.42 12v-.22L.62 1.38l-.08.08zM20.3 10.37l-2.93-2.93-1.1 1.1 2.96 2.96 1.07-1.13zM4.17.24l13.2 11.88-2.97 2.97L4.17.24z",
  },
  {
    label: "App Store",
    icon: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.16 1.3-2.14 3.81.03 3.02 2.65 4.03 2.68 4.04l-.09.27zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
  },
];

const socialIcons = [
  {
    name: "Threads",
    icon: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.012 5.307l-2.96.04c-.132-1.49-.832-2.7-2.102-3.654-1.13-.846-2.65-1.295-4.548-1.31-2.905.02-5.073.894-6.446 2.596-1.316 1.634-2 4.04-2.022 7.15.022 3.11.706 5.516 2.022 7.15 1.373 1.702 3.541 2.576 6.446 2.596 2.006-.014 3.59-.484 4.71-1.404.935-.772 1.57-1.92 1.87-3.395.12-.577.177-1.192.17-1.835a9.688 9.688 0 00-.065-1.12H12.18v-2.9h9.944c.073.43.117.9.128 1.405.01.47-.004.946-.043 1.424-.285 3.227-1.48 5.697-3.551 7.36-1.828 1.457-4.216 2.196-7.07 2.214l-.402.004z",
  },
  {
    name: "X",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Instagram",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// Renders one column of footer links
const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-widest">{title}</h4>
    <ul className="flex flex-col gap-2 text-sm text-[#6b6b6b]">
      {links.map((link) => (
        <li key={link} className="hover:text-[#1a1a1a] cursor-pointer transition-colors leading-8">
          {link}
        </li>
      ))}
    </ul>
  </div>
);

// Blue paint decoration on the left side
const LeftPaint = () => (
  <div className="absolute top-0 left-0 pointer-events-none">
    <svg viewBox="0 0 380 350" width="380" height="350" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="35%" stopColor="#4A90E2" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <filter id="paintBlur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Main paint body */}
      <path
        d="M0,0 C60,0 120,0 140,0 C180,10 200,40 190,80 C178,120 220,150 210,200 C198,255 240,280 228,340 C215,400 250,430 235,490 C220,545 260,570 240,630 C225,675 180,700 140,700 C90,700 30,680 0,660 Z"
        fill="url(#blueGrad)"
        opacity="0.82"
        filter="url(#paintBlur)"
      />

      {/* Drip 1 */}
      <path d="M180,620 C185,650 175,680 170,710" stroke="#60A5FA" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Drip 2 */}
      <path d="M220,580 C228,615 222,650 218,690" stroke="#93C5FD" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.45" />

      {/* Edge highlight */}
      <path d="M140,0 C170,30 200,80 185,140 C170,200 215,250 200,310 C185,370 225,410 210,470" stroke="#BFDBFE" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.35" />
    </svg>
  </div>
);

// Pink paint decoration on the right side
const RightPaint = () => (
  <div className="absolute bottom-0 right-0 pointer-events-none">
    <svg viewBox="0 350 380 350" width="380" height="350" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pinkGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BE185D" />
          <stop offset="35%" stopColor="#EC4899" />
          <stop offset="70%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#F9A8D4" />
        </linearGradient>
        <filter id="paintBlurRight">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Main paint body */}
      <path
        d="M380,700 C320,700 260,700 240,700 C200,690 180,660 190,620 C202,580 160,550 172,490 C185,430 150,400 165,340 C178,280 145,250 160,190 C175,135 120,110 140,50 C155,5 200,0 240,0 C290,0 350,20 380,40 Z"
        fill="url(#pinkGradRight)"
        opacity="0.82"
        filter="url(#paintBlurRight)"
      />

      {/* Drip 1 */}
      <path d="M200,80 C195,50 205,20 210,-10" stroke="#F472B6" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Drip 2 */}
      <path d="M160,110 C152,75 158,40 162,0" stroke="#F9A8D4" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.45" />

      {/* Edge highlight */}
      <path d="M240,700 C210,670 180,620 195,560 C210,500 165,450 180,390 C195,330 155,290 170,230" stroke="#FBCFE8" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.35" />
    </svg>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const FooterBg = () => {
  return (
    <section className="relative w-full bg-[#502274] overflow-hidden flex flex-col items-center py-16 gap-10">

      {/* Background paint decorations */}
      <LeftPaint />
      <RightPaint />

      {/* White Footer Card */}
      <div className="relative z-10 w-[80%] h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col justify-between p-12">

        {/* Footer Link Columns */}
        <div className="grid grid-cols-4 gap-10 w-full">
          {footerColumns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">

          {/* Left — Login + Get Started */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="bg-[#f3f3f1] text-[#1a1a1a] px-10 py-5 rounded-lg text-lg font-bold hover:bg-[#e8e8e6] transition-colors duration-200">
              Log in
            </Link>
            <Link href="/signup" className="bg-[#d2e823] text-[#1a1a1a] px-10 py-5 rounded-full text-lg font-bold hover:bg-[#bfd120] transition-colors duration-200">
              Get Started for Free
            </Link>
          </div>

          {/* Right — Store Buttons + Social Icons */}
          <div className="flex items-center gap-3">

            {/* App Store Buttons */}
            {storeButtons.map((btn) => (
              <button
                key={btn.label}
                className="bg-[#1a1a1a] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#333] transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={btn.icon} />
                </svg>
                {btn.label}
              </button>
            ))}

            {/* Social Icon Circles */}
            {socialIcons.map((social) => (
              <button
                key={social.name}
                aria-label={social.name}
                className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-[#333] transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.icon} />
                </svg>
              </button>
            ))}

          </div>
        </div>
      </div>

      {/* Flags + Acknowledgement */}
      <div className="relative z-30 flex flex-col items-center gap-3 pb-6">

        {/* Country Flags */}
        <div className="flex items-center gap-6">

          {/* Indonesia */}
          <svg width="65" height="44" viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" className="rounded-sm overflow-hidden">
            <rect width="28" height="10" fill="#CE1126" />
            <rect y="10" width="28" height="10" fill="#FFFFFF" />
          </svg>

          {/* Germany */}
          <svg width="65" height="44" viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" className="rounded-sm overflow-hidden">
            <rect width="28" height="6.66" fill="#000000" />
            <rect y="6.66" width="28" height="6.66" fill="#DD0000" />
            <rect y="13.32" width="28" height="6.68" fill="#FFCE00" />
          </svg>

        </div>

        {/* Acknowledgement Text */}
        <p className="text-[#f9a8d4] text-sm text-center max-w-2xl leading-relaxed px-6">
          © 2025 Lynkify. All rights reserved. Built for creators, by creators.
        </p>

      </div>
    </section>
  );
};

export default FooterBg;
