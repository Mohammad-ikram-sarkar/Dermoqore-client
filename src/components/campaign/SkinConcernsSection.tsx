"use client";

import React from "react";
import type { SkinConcern } from "@/service/campaign.service";

/* ─────────────────────────────────────────────────────────────────────────── */
/* Shared stroke props                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */
const S = {
  fill: "none" as const,
  stroke: "#2d3a8c",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* Shared face base                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */
function FaceBase() {
  return (
    <>
      <ellipse cx="50" cy="48" rx="22" ry="26" {...S} strokeWidth="1.6" />
      <path d="M28 44 C27 34 30 22 36 18 C40 15 45 14 50 14 C55 14 60 15 64 18 C70 22 73 34 72 44" {...S} strokeWidth="1.5" />
      <path d="M38 18 C38 14 42 12 50 12 C58 12 62 14 62 18" {...S} strokeWidth="1.2" />
      <path d="M28 46 C25 46 23 48 23 50 C23 52 25 54 28 54" {...S} strokeWidth="1.4" />
      <path d="M72 46 C75 46 77 48 77 50 C77 52 75 54 72 54" {...S} strokeWidth="1.4" />
      <path d="M37 37 Q41 34 45 36" {...S} strokeWidth="1.3" />
      <path d="M55 36 Q59 34 63 37" {...S} strokeWidth="1.3" />
      <ellipse cx="41" cy="42" rx="4" ry="2.8" {...S} strokeWidth="1.3" />
      <circle cx="41.5" cy="42" r="1.2" fill="#2d3a8c" stroke="none" />
      <ellipse cx="59" cy="42" rx="4" ry="2.8" {...S} strokeWidth="1.3" />
      <circle cx="59.5" cy="42" r="1.2" fill="#2d3a8c" stroke="none" />
      <path d="M50 43 L48 52 Q50 54 52 52 L50 43" {...S} strokeWidth="1.1" />
      <path d="M43 58 Q50 62 57 58" {...S} strokeWidth="1.3" />
      <path d="M44 72 C44 76 46 78 50 79 C54 78 56 76 56 72" {...S} strokeWidth="1.4" />
    </>
  );
}

function IconDarkSpots() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <circle cx="34" cy="50" r="2" fill="#2d3a8c" opacity={0.4} />
      <circle cx="36" cy="56" r="1.5" fill="#2d3a8c" opacity={0.35} />
      <circle cx="31" cy="54" r="1.3" fill="#2d3a8c" opacity={0.3} />
      <circle cx="65" cy="52" r="1.8" fill="#2d3a8c" opacity={0.38} />
      <circle cx="67" cy="58" r="1.2" fill="#2d3a8c" opacity={0.3} />
      <circle cx="50" cy="28" r="1.5" fill="#2d3a8c" opacity={0.28} />
      <path d="M18 62 C16 58 16 54 18 52 C20 50 22 51 23 53 L24 56 C24 56 25 52 27 51 C29 50 31 52 30 55 L30 58 C30 58 32 55 34 55 C36 55 37 57 36 60 L34 65 C33 68 30 70 27 70 L22 70 Z" {...S} strokeWidth="1.2" />
      <line x1="24" y1="56" x2="23" y2="53" {...S} strokeWidth="0.9" />
      <line x1="30" y1="58" x2="30" y2="55" {...S} strokeWidth="0.9" />
    </svg>
  );
}

function IconMelasma() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <ellipse cx="34" cy="53" rx="7" ry="5" fill="#2d3a8c" opacity={0.18} stroke="none" />
      <ellipse cx="33" cy="51" rx="5" ry="3" fill="#2d3a8c" opacity={0.14} stroke="none" />
      <ellipse cx="66" cy="53" rx="7" ry="5" fill="#2d3a8c" opacity={0.18} stroke="none" />
      <ellipse cx="67" cy="51" rx="5" ry="3" fill="#2d3a8c" opacity={0.14} stroke="none" />
      <path d="M45 57 Q50 59 55 57" stroke="#2d3a8c" strokeWidth="2" opacity={0.3} strokeLinecap="round" fill="none" />
      <path d="M27 60 C27 60 25 64 25 66 C25 68 26 69 27 69 C28 69 29 68 29 66 C29 64 27 60 27 60Z" {...S} strokeWidth="1.1" opacity={0.6} />
    </svg>
  );
}

function IconUnevenTone() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <line x1="30" y1="48" x2="37" y2="55" stroke="#2d3a8c" strokeWidth="1.8" strokeLinecap="round" opacity={0.55} />
      <line x1="37" y1="48" x2="30" y2="55" stroke="#2d3a8c" strokeWidth="1.8" strokeLinecap="round" opacity={0.55} />
      <line x1="63" y1="48" x2="70" y2="55" stroke="#2d3a8c" strokeWidth="1.8" strokeLinecap="round" opacity={0.55} />
      <line x1="70" y1="48" x2="63" y2="55" stroke="#2d3a8c" strokeWidth="1.8" strokeLinecap="round" opacity={0.55} />
      <line x1="46" y1="28" x2="50" y2="32" stroke="#2d3a8c" strokeWidth="1.4" strokeLinecap="round" opacity={0.4} />
      <line x1="50" y1="28" x2="46" y2="32" stroke="#2d3a8c" strokeWidth="1.4" strokeLinecap="round" opacity={0.4} />
      <ellipse cx="33" cy="52" rx="5" ry="4" fill="#2d3a8c" opacity={0.1} stroke="none" />
      <ellipse cx="67" cy="51" rx="5" ry="3.5" fill="#2d3a8c" opacity={0.15} stroke="none" />
    </svg>
  );
}

function IconSunSpots() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <circle cx="76" cy="16" r="6" stroke="#2d3a8c" strokeWidth="1.3" fill="none" opacity={0.7} />
      <line x1="76" y1="7" x2="76" y2="4" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="76" y1="25" x2="76" y2="28" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="67" y1="16" x2="64" y2="16" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="85" y1="16" x2="88" y2="16" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="69.6" y1="9.6" x2="67.4" y2="7.4" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="82.4" y1="22.4" x2="84.6" y2="24.6" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="82.4" y1="9.6" x2="84.6" y2="7.4" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="69.6" y1="22.4" x2="67.4" y2="24.6" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <circle cx="33" cy="50" r="2.5" fill="#2d3a8c" opacity={0.38} stroke="none" />
      <circle cx="36" cy="56" r="1.8" fill="#2d3a8c" opacity={0.32} stroke="none" />
      <circle cx="67" cy="50" r="2.2" fill="#2d3a8c" opacity={0.38} stroke="none" />
      <circle cx="65" cy="57" r="1.5" fill="#2d3a8c" opacity={0.3} stroke="none" />
      <circle cx="44" cy="32" r="1.4" fill="#2d3a8c" opacity={0.28} stroke="none" />
      <circle cx="56" cy="31" r="1.2" fill="#2d3a8c" opacity={0.25} stroke="none" />
      <circle cx="50" cy="35" r="1.3" fill="#2d3a8c" opacity={0.22} stroke="none" />
    </svg>
  );
}

function IconPostAcne() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <path d="M31 49 Q34 47 37 49" stroke="#2d3a8c" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity={0.5} />
      <path d="M30 54 Q33 52 36 54" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.45} />
      <path d="M63 49 Q66 47 69 49" stroke="#2d3a8c" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity={0.5} />
      <path d="M64 55 Q67 53 70 55" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.45} />
      <circle cx="33" cy="59" r="1.8" stroke="#2d3a8c" strokeWidth="1.1" fill="none" opacity={0.45} />
      <circle cx="67" cy="59" r="1.5" stroke="#2d3a8c" strokeWidth="1.1" fill="none" opacity={0.45} />
      <circle cx="47" cy="33" r="1.3" stroke="#2d3a8c" strokeWidth="1" fill="none" opacity={0.35} />
      <circle cx="33" cy="59" r="0.7" fill="#2d3a8c" stroke="none" opacity={0.4} />
      <circle cx="67" cy="59" r="0.7" fill="#2d3a8c" stroke="none" opacity={0.4} />
    </svg>
  );
}

function IconAcne() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <circle cx="32" cy="50" r="3.5" stroke="#2d3a8c" strokeWidth="1.3" fill="none" opacity={0.6} />
      <circle cx="32" cy="50" r="1.5" fill="#2d3a8c" stroke="none" opacity={0.45} />
      <circle cx="68" cy="51" r="3" stroke="#2d3a8c" strokeWidth="1.3" fill="none" opacity={0.6} />
      <circle cx="68" cy="51" r="1.3" fill="#2d3a8c" stroke="none" opacity={0.45} />
      <circle cx="43" cy="36" r="2.5" stroke="#2d3a8c" strokeWidth="1.2" fill="none" opacity={0.5} />
      <circle cx="57" cy="35" r="2" stroke="#2d3a8c" strokeWidth="1.2" fill="none" opacity={0.5} />
      <circle cx="50" cy="60" r="2" stroke="#2d3a8c" strokeWidth="1.1" fill="none" opacity={0.4} />
    </svg>
  );
}

function IconWrinkles() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <path d="M36 30 Q50 27 64 30" stroke="#2d3a8c" strokeWidth="1" fill="none" opacity={0.45} />
      <path d="M38 34 Q50 31 62 34" stroke="#2d3a8c" strokeWidth="0.9" fill="none" opacity={0.35} />
      <path d="M26 44 L22 42 M26 47 L21 47 M26 50 L22 52" stroke="#2d3a8c" strokeWidth="1" strokeLinecap="round" fill="none" opacity={0.4} />
      <path d="M74 44 L78 42 M74 47 L79 47 M74 50 L78 52" stroke="#2d3a8c" strokeWidth="1" strokeLinecap="round" fill="none" opacity={0.4} />
      <path d="M41 57 Q43 60 42 63" stroke="#2d3a8c" strokeWidth="1" fill="none" opacity={0.4} />
      <path d="M59 57 Q57 60 58 63" stroke="#2d3a8c" strokeWidth="1" fill="none" opacity={0.4} />
    </svg>
  );
}

function IconDarkCircles() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <path d="M36 46 Q41 51 46 46" stroke="#2d3a8c" strokeWidth="2" strokeLinecap="round" fill="none" opacity={0.55} />
      <path d="M54 46 Q59 51 64 46" stroke="#2d3a8c" strokeWidth="2" strokeLinecap="round" fill="none" opacity={0.55} />
      <ellipse cx="41" cy="46" rx="6" ry="2.5" fill="#2d3a8c" opacity={0.14} stroke="none" />
      <ellipse cx="59" cy="46" rx="6" ry="2.5" fill="#2d3a8c" opacity={0.14} stroke="none" />
    </svg>
  );
}

function IconOilySkin() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <ellipse cx="50" cy="30" rx="4" ry="2.5" fill="#2d3a8c" opacity={0.2} stroke="none" />
      <path d="M46 28 L47 25" stroke="#2d3a8c" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity={0.45} />
      <path d="M50 27 L50 24" stroke="#2d3a8c" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity={0.45} />
      <path d="M54 28 L55 25" stroke="#2d3a8c" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity={0.45} />
      <path d="M30 52 C30 52 28 56 28 59 C28 62 30 63 30 63 C30 63 32 62 32 59 C32 56 30 52 30 52Z" {...S} strokeWidth="1.1" opacity={0.5} />
      <path d="M70 50 C70 50 68 54 68 57 C68 60 70 61 70 61 C70 61 72 60 72 57 C72 54 70 50 70 50Z" {...S} strokeWidth="1.1" opacity={0.5} />
    </svg>
  );
}

function SkinConcernIcon({ keyword }: { keyword: string }) {
  switch (keyword) {
    case "dark-spots":   return <IconDarkSpots />;
    case "melasma":      return <IconMelasma />;
    case "uneven-tone":  return <IconUnevenTone />;
    case "sun-spots":    return <IconSunSpots />;
    case "post-acne":    return <IconPostAcne />;
    case "acne":         return <IconAcne />;
    case "wrinkles":     return <IconWrinkles />;
    case "dark-circles": return <IconDarkCircles />;
    case "oily":         return <IconOilySkin />;
    default:             return <IconDarkSpots />;
  }
}

export const SKIN_CONCERN_OPTIONS: { keyword: string; label: string }[] = [
  { keyword: "dark-spots",   label: "রণের পুরানো দাগ (Dark Spots)" },
  { keyword: "melasma",      label: "কালো ছোপ / মেসমা (Melasma)" },
  { keyword: "uneven-tone",  label: "Uneven Skin Tone" },
  { keyword: "sun-spots",    label: "Sun Spots / Pigmentation" },
  { keyword: "post-acne",    label: "মেসকা / পড়ার পর মুখের দাগ (Post-Acne)" },
  { keyword: "acne",         label: "Acne / Pimples" },
  { keyword: "wrinkles",     label: "Wrinkles / Fine Lines" },
  { keyword: "dark-circles", label: "Dark Circles" },
  { keyword: "oily",         label: "Oily Skin" },
];

interface Props {
  concerns: SkinConcern[];
  heading?: string;
}

export default function SkinConcernsSection({ concerns, heading }: Props) {
  if (!concerns?.length) return null;

  return (
    <section className="py-10 sm:py-12 px-4 bg-background ">
      <div className="mx-auto max-w-7xl ">

        {/* Heading */}
        {heading && (
          <div className="mb-8 sm:mb-10 text-center">
            <h2
              className=" text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
              style={{
                color: "#1e2a6e",
            
                paddingBottom: "2px",
              }}
            >
              {heading}
            </h2>
          </div>
        )}

        {/*
          ── Responsive grid ──────────────────────────────────────────────────
          xs  (<360px): horizontal scroll row — all items in one line,
                        no wrapping, so nothing gets clipped or squashed
          sm  (≥480px): 3-column grid
          md  (≥768px): 4–5 columns (auto-fill, min 100px)
          lg  (≥1024px): up to 9 items naturally in one row via justify-between
          ─────────────────────────────────────────────────────────────────── */}

        {/* Mobile scroll container — only active below sm */}
        <div className="sm:hidden overflow-x-auto pb-3 -mx-4 px-4">
          <div className="flex gap-5 w-max">
            {concerns.map((concern, i) => (
              <ConcernCard key={i} concern={concern} size="sm" />
            ))}
          </div>
        </div>

        {/* sm and up — wrapping grid */}
        <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fit,minmax(100px,120px))] gap-6 justify-center">
          {concerns.map((concern, i) => (
            <ConcernCard key={i} concern={concern} size="md" />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Card sub-component keeps the two layouts DRY ─────────────────────────── */
function ConcernCard({
  concern,
  size,
}: {
  concern: SkinConcern;
  size: "sm" | "md";
}) {
  const circleSize = size === "sm" ? "h-[76px] w-[76px]" : "h-[88px] w-[88px] sm:h-[96px] sm:w-[96px]";
  const wrapWidth  = size === "sm" ? "w-[80px]" : "w-full";

  return (
    <div className={`flex flex-col items-center  gap-2.5 ${wrapWidth}`}>
      <div
        className={`flex items-center justify-center rounded-full transition-transform duration-200 active:scale-95 hover:scale-105 ${circleSize}`}
        style={{
          background: "#eef0fa",
          border: "1.5px solid #c7cdf0",
        }}
      >
        {/* SVG is fluid inside a fixed container — no clipping at any size */}
        <div className="h-[70%] w-[70%]">
          <SkinConcernIcon keyword={concern.icon ?? "dark-spots"} />
        </div>
      </div>

      <p
        className="text-center leading-snug whitespace-pre-line"
        style={{
          color: "#1e2a6e",
          fontSize: size === "sm" ? "10px" : "11px",
          fontWeight: 500,
          maxWidth: size === "sm" ? "76px" : "100px",
        }}
      >
        {concern.label}
      </p>
    </div>
  );
}