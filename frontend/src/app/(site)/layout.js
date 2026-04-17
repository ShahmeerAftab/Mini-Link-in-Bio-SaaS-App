import Navbar from "@/components/home/Navbar";
import FooterBg from "@/components/home/FooterBg";

// This layout wraps all public site pages (home, products, contact, pricing, templates)
// Pages under /u/[username] and /dashboard do NOT use this layout

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <FooterBg />
    </>
  );
}
