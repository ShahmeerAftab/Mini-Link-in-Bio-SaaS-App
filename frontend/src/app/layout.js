import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lynkify",
  description: "A Linktree-style link in bio tool",
};

// Root layout — wraps every page in the app
// Navbar and Footer are NOT here — they only appear on (site) pages

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
