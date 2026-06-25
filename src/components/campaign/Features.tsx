"use client";

import React from "react";
import type { Feature } from "@/service/campaign.service";

/* ─── Icon keyword → SVG map ────────────────────────────────────────── */

function IconSvg({ keyword }: { keyword: string }) {
  const p = { stroke: "var(--cpt, #6b7280)", strokeWidth: "1.4", fill: "none" };

  switch (keyword) {
    case "spot":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <circle cx="18" cy="18" r="14" strokeWidth="1.5" />
          <circle cx="13" cy="15" r="3.5" strokeWidth="1.2" />
          <circle cx="22" cy="13" r="2.5" strokeWidth="1.2" />
          <circle cx="20" cy="22" r="3" strokeWidth="1.2" />
          <line x1="16" y1="15" x2="19.5" y2="13.5" strokeWidth="1" strokeDasharray="2 1.5" />
          <line x1="17.5" y1="22" x2="20" y2="16" strokeWidth="1" strokeDasharray="2 1.5" />
        </svg>
      );
    case "radiance":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <path d="M18 8 C13 8 10 12 10 16 C10 20 13 22 16 23 C16 25 17 27 18 28 C19 27 20 25 20 23 C23 22 26 20 26 16 C26 12 23 8 18 8Z" />
          <path d="M15 12 Q18 10 21 12" strokeWidth="1" />
          <line x1="12" y1="15" x2="9" y2="13" strokeWidth="1.2" />
          <line x1="12" y1="18" x2="8" y2="18" strokeWidth="1.2" />
          <line x1="24" y1="15" x2="27" y2="13" strokeWidth="1.2" />
          <line x1="24" y1="18" x2="28" y2="18" strokeWidth="1.2" />
          <line x1="18" y1="8" x2="18" y2="5" strokeWidth="1.2" />
        </svg>
      );
    case "moisture":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <ellipse cx="18" cy="22" rx="10" ry="4" strokeWidth="1.3" />
          <ellipse cx="18" cy="19" rx="8" ry="3" strokeWidth="1.3" />
          <ellipse cx="18" cy="16" rx="5" ry="2" strokeWidth="1.3" />
          <path d="M16 12 Q18 8 20 12" strokeWidth="1.3" />
          <circle cx="18" cy="11" r="2" fill="var(--cpt, #6b7280)" opacity={0.3} />
          <path d="M18 9 L18 6 M15.5 7.5 L18 6 L20.5 7.5" strokeWidth="1" />
        </svg>
      );
    case "shield":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <path d="M18 8 L26 12 L26 20 C26 24 22 27.5 18 29 C14 27.5 10 24 10 20 L10 12 Z" />
          <polyline points="14,18 17,21 23,15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "leaf":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <path d="M18 27 C18 27 10 22 10 16 C10 12 13.5 9 18 9 C22.5 9 26 12 26 16 C26 22 18 27 18 27Z" />
          <path d="M18 9 C18 9 15 6 13 5" strokeWidth="1.2" />
          <path d="M18 9 C18 9 21 6.5 23 5.5" strokeWidth="1.2" />
          <path d="M15 14 Q18 11 21 14 Q19 17 18 20 Q17 17 15 14Z" strokeWidth="1" />
        </svg>
      );
    case "glow":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <circle cx="18" cy="18" r="8" />
          <line x1="18" y1="4" x2="18" y2="8" strokeWidth="1.5" />
          <line x1="18" y1="28" x2="18" y2="32" strokeWidth="1.5" />
          <line x1="4" y1="18" x2="8" y2="18" strokeWidth="1.5" />
          <line x1="28" y1="18" x2="32" y2="18" strokeWidth="1.5" />
          <line x1="8.1" y1="8.1" x2="10.9" y2="10.9" strokeWidth="1.5" />
          <line x1="25.1" y1="25.1" x2="27.9" y2="27.9" strokeWidth="1.5" />
          <line x1="8.1" y1="27.9" x2="10.9" y2="25.1" strokeWidth="1.5" />
          <line x1="25.1" y1="10.9" x2="27.9" y2="8.1" strokeWidth="1.5" />
        </svg>
      );
    case "sun":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <circle cx="18" cy="18" r="6" />
          <line x1="18" y1="6" x2="18" y2="10" strokeWidth="1.5" />
          <line x1="18" y1="26" x2="18" y2="30" strokeWidth="1.5" />
          <line x1="6" y1="18" x2="10" y2="18" strokeWidth="1.5" />
          <line x1="26" y1="18" x2="30" y2="18" strokeWidth="1.5" />
          <line x1="9.5" y1="9.5" x2="12.3" y2="12.3" strokeWidth="1.5" />
          <line x1="23.7" y1="23.7" x2="26.5" y2="26.5" strokeWidth="1.5" />
          <line x1="9.5" y1="26.5" x2="12.3" y2="23.7" strokeWidth="1.5" />
          <line x1="23.7" y1="12.3" x2="26.5" y2="9.5" strokeWidth="1.5" />
        </svg>
      );
    case "heart":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <path d="M18 28 C18 28 7 20 7 13 C7 9 10 7 14 9 C16 10 17.5 12 18 14 C18.5 12 20 10 22 9 C26 7 29 9 29 13 C29 20 18 28 18 28Z" />
        </svg>
      );
    case "droplets":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <path d="M12 10 C12 10 8 18 8 22 C8 26 12 28 12 28 C12 28 16 26 16 22 C16 18 12 10 12 10Z" />
          <path d="M24 6 C24 6 20 14 20 18 C20 22 24 24 24 24 C24 24 28 22 28 18 C28 14 24 6 24 6Z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <path d="M18 6 L19.5 16 L28 18 L19.5 20 L18 30 L16.5 20 L8 18 L16.5 16 Z" />
          <path d="M27 8 L27.8 13 L32 14 L27.8 15 L27 20 L26.2 15 L22 14 L26.2 13 Z" />
        </svg>
      );
    default:
      /* Fallback: generic star/feature icon */
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" {...p}>
          <circle cx="18" cy="18" r="12" strokeWidth="1.5" />
          <path d="M18 12 L18 24 M12 18 L24 18" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

const ICON_OPTIONS: { keyword: string; label: string }[] = [
  { keyword: "spot", label: "Spot Reduction" },
  { keyword: "radiance", label: "Radiance / Brightness" },
  { keyword: "moisture", label: "Moisturize" },
  { keyword: "shield", label: "Protection / Shield" },
  { keyword: "leaf", label: "Natural / Herbal" },
  { keyword: "glow", label: "Glow" },
  { keyword: "sun", label: "Sun Care" },
  { keyword: "heart", label: "Self-Care / Love" },
  { keyword: "droplets", label: "Hydration" },
  { keyword: "sparkle", label: "Sparkle / Premium" },
];

/* ─── Component ────────────────────────────────────────────────────── */

interface Props {
  features: Feature[];
}

export default function Features({ features }: Props) {
  if (!features?.length) return null;

  return (
    <section className="py-10 px-4 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center border rounded-[10px] px-3 py-5 gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            style={{
              background: "var(--cps, #f3f4f6)",
              borderColor: "var(--cpr, #e5e7eb)",
            }}
          >
            {/* Icon Circle */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
              style={{
                border: "1.5px solid var(--cpr, #e5e7eb)",
                background: "var(--cps, #f3f4f6)",
              }}
            >
              <IconSvg keyword={feature.icon ?? "glow"} />
            </div>

            {/* Title */}
            <p
              className="text-sm font-semibold leading-snug"
              style={{ color: "var(--cpt, #374151)" }}
            >
              {feature.title}
            </p>

            {/* Description */}
            <p className="text-xs leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export { ICON_OPTIONS };
