"use client";

import { useState } from "react";
import { trackClick } from "@/lib/api/links";

const LinkCard = ({ link, template }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = async () => {
    try { await trackClick(link._id); } catch { /* silent */ }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: template?.linkBg ?? "#ffffff",
        color: template?.linkColor ?? "#1a1a1a",
        borderColor: hovered ? template?.accentColor : "transparent",
        borderWidth: "2px",
        borderStyle: "solid",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.06)",
      }}
      className="flex items-center justify-between w-full px-6 py-4 rounded-2xl transition-all duration-200"
    >
      <span className="font-semibold text-sm">{link.title}</span>
      <span
        style={{ color: hovered ? template?.accentColor : template?.linkColor ?? "#aaaaaa" }}
        className="transition-colors duration-200 text-lg"
      >
        →
      </span>
    </a>
  );
};

export default LinkCard;
