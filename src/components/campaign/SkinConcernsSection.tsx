"use client";

import React from "react";
import type { SkinConcern } from "@/service/campaign.service";

/* ─────────────────────────────────────────────────────────────────────────── */
/* Shared stroke props — thin line-art style, navy/dark-blue tint              */
/* ─────────────────────────────────────────────────────────────────────────── */
const S = {
  fill: "none" as const,
  stroke: "#2d3a8c",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* Shared face base — same proportions across all icons                        */
/* ─────────────────────────────────────────────────────────────────────────── */
function FaceBase() {
  return (
    <>
      {/* ── Head / face outline ── */}
      <ellipse cx="50" cy="48" rx="22" ry="26" {...S} strokeWidth="1.6" />

      {/* ── Hair ── */}
      <path
        d="M28 44 C27 34 30 22 36 18 C40 15 45 14 50 14 C55 14 60 15 64 18 C70 22 73 34 72 44"
        {...S} strokeWidth="1.5"
      />
      {/* hair detail lines on top */}
      <path d="M38 18 C38 14 42 12 50 12 C58 12 62 14 62 18" {...S} strokeWidth="1.2" />

      {/* ── Left ear ── */}
      <path d="M28 46 C25 46 23 48 23 50 C23 52 25 54 28 54" {...S} strokeWidth="1.4" />

      {/* ── Right ear ── */}
      <path d="M72 46 C75 46 77 48 77 50 C77 52 75 54 72 54" {...S} strokeWidth="1.4" />

      {/* ── Left eyebrow ── */}
      <path d="M37 37 Q41 34 45 36" {...S} strokeWidth="1.3" />

      {/* ── Right eyebrow ── */}
      <path d="M55 36 Q59 34 63 37" {...S} strokeWidth="1.3" />

      {/* ── Left eye ── */}
      <ellipse cx="41" cy="42" rx="4" ry="2.8" {...S} strokeWidth="1.3" />
      <circle cx="41.5" cy="42" r="1.2" fill="#2d3a8c" stroke="none" />

      {/* ── Right eye ── */}
      <ellipse cx="59" cy="42" rx="4" ry="2.8" {...S} strokeWidth="1.3" />
      <circle cx="59.5" cy="42" r="1.2" fill="#2d3a8c" stroke="none" />

      {/* ── Nose ── */}
      <path d="M50 43 L48 52 Q50 54 52 52 L50 43" {...S} strokeWidth="1.1" />

      {/* ── Mouth ── */}
      <path d="M43 58 Q50 62 57 58" {...S} strokeWidth="1.3" />

      {/* ── Neck ── */}
      <path d="M44 72 C44 76 46 78 50 79 C54 78 56 76 56 72" {...S} strokeWidth="1.4" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Icon 1 — Dark spots / রণের পুরানো দাগ                                      */
/* Hand touching cheek + scattered spots                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
function IconDarkSpots() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* spots on cheeks and forehead */}
      <circle cx="34" cy="50" r="2" fill="#2d3a8c" opacity={0.4} />
      <circle cx="36" cy="56" r="1.5" fill="#2d3a8c" opacity={0.35} />
      <circle cx="31" cy="54" r="1.3" fill="#2d3a8c" opacity={0.3} />
      <circle cx="65" cy="52" r="1.8" fill="#2d3a8c" opacity={0.38} />
      <circle cx="67" cy="58" r="1.2" fill="#2d3a8c" opacity={0.3} />
      <circle cx="50" cy="28" r="1.5" fill="#2d3a8c" opacity={0.28} />
      {/* hand touching left cheek */}
      <path
        d="M18 62 C16 58 16 54 18 52 C20 50 22 51 23 53 L24 56 C24 56 25 52 27 51 C29 50 31 52 30 55 L30 58 C30 58 32 55 34 55 C36 55 37 57 36 60 L34 65 C33 68 30 70 27 70 L22 70 Z"
        {...S} strokeWidth="1.2"
      />
      {/* finger details */}
      <line x1="24" y1="56" x2="23" y2="53" {...S} strokeWidth="0.9" />
      <line x1="30" y1="58" x2="30" y2="55" {...S} strokeWidth="0.9" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Icon 2 — Melasma / কালো ছোপ (হাইপারপিগমেন্টেশন)                           */
/* Large dark blotchy patches on both cheeks + small teardrop/drip             */
/* ─────────────────────────────────────────────────────────────────────────── */
function IconMelasma() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* large blotch — left cheek */}
      <ellipse cx="34" cy="53" rx="7" ry="5" fill="#2d3a8c" opacity={0.18} stroke="none" />
      <ellipse cx="33" cy="51" rx="5" ry="3" fill="#2d3a8c" opacity={0.14} stroke="none" />
      {/* large blotch — right cheek */}
      <ellipse cx="66" cy="53" rx="7" ry="5" fill="#2d3a8c" opacity={0.18} stroke="none" />
      <ellipse cx="67" cy="51" rx="5" ry="3" fill="#2d3a8c" opacity={0.14} stroke="none" />
      {/* upper lip shadow */}
      <path d="M45 57 Q50 59 55 57" stroke="#2d3a8c" strokeWidth="2" opacity={0.3} strokeLinecap="round" fill="none" />
      {/* small drip/drop indicating pigment — left side */}
      <path
        d="M27 60 C27 60 25 64 25 66 C25 68 26 69 27 69 C28 69 29 68 29 66 C29 64 27 60 27 60Z"
        {...S} strokeWidth="1.1" opacity={0.6}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Icon 3 — Uneven skin tone                                                   */
/* X / cross marks on the skin indicating patchiness                          */
/* ─────────────────────────────────────────────────────────────────────────── */
function IconUnevenTone() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* X mark left cheek */}
      <line x1="30" y1="48" x2="37" y2="55" stroke="#2d3a8c" strokeWidth="1.8" strokeLinecap="round" opacity={0.55} />
      <line x1="37" y1="48" x2="30" y2="55" stroke="#2d3a8c" strokeWidth="1.8" strokeLinecap="round" opacity={0.55} />
      {/* X mark right cheek */}
      <line x1="63" y1="48" x2="70" y2="55" stroke="#2d3a8c" strokeWidth="1.8" strokeLinecap="round" opacity={0.55} />
      <line x1="70" y1="48" x2="63" y2="55" stroke="#2d3a8c" strokeWidth="1.8" strokeLinecap="round" opacity={0.55} />
      {/* small X on forehead */}
      <line x1="46" y1="28" x2="50" y2="32" stroke="#2d3a8c" strokeWidth="1.4" strokeLinecap="round" opacity={0.4} />
      <line x1="50" y1="28" x2="46" y2="32" stroke="#2d3a8c" strokeWidth="1.4" strokeLinecap="round" opacity={0.4} />
      {/* uneven tone patches */}
      <ellipse cx="33" cy="52" rx="5" ry="4" fill="#2d3a8c" opacity={0.1} stroke="none" />
      <ellipse cx="67" cy="51" rx="5" ry="3.5" fill="#2d3a8c" opacity={0.15} stroke="none" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Icon 4 — Sun spots / Pigmentation                                           */
/* Small sun in corner + brown freckle dots across face                        */
/* ─────────────────────────────────────────────────────────────────────────── */
function IconSunSpots() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* small sun top-right corner */}
      <circle cx="76" cy="16" r="6" stroke="#2d3a8c" strokeWidth="1.3" fill="none" opacity={0.7} />
      <line x1="76" y1="7" x2="76" y2="4" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="76" y1="25" x2="76" y2="28" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="67" y1="16" x2="64" y2="16" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="85" y1="16" x2="88" y2="16" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="69.6" y1="9.6" x2="67.4" y2="7.4" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="82.4" y1="22.4" x2="84.6" y2="24.6" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="82.4" y1="9.6" x2="84.6" y2="7.4" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="69.6" y1="22.4" x2="67.4" y2="24.6" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      {/* sun spots / freckles on face */}
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

/* ─────────────────────────────────────────────────────────────────────────── */
/* Icon 5 — Post-acne / মেসকা, পড়ার পর মুখের দাগ                             */
/* Healed acne marks — small scar indentations on cheeks                       */
/* ─────────────────────────────────────────────────────────────────────────── */
function IconPostAcne() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* scar / indentation marks on left cheek */}
      <path d="M31 49 Q34 47 37 49" stroke="#2d3a8c" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity={0.5} />
      <path d="M30 54 Q33 52 36 54" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.45} />
      {/* scar marks on right cheek */}
      <path d="M63 49 Q66 47 69 49" stroke="#2d3a8c" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity={0.5} />
      <path d="M64 55 Q67 53 70 55" stroke="#2d3a8c" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.45} />
      {/* small round healed spots */}
      <circle cx="33" cy="59" r="1.8" stroke="#2d3a8c" strokeWidth="1.1" fill="none" opacity={0.45} />
      <circle cx="67" cy="59" r="1.5" stroke="#2d3a8c" strokeWidth="1.1" fill="none" opacity={0.45} />
      <circle cx="47" cy="33" r="1.3" stroke="#2d3a8c" strokeWidth="1" fill="none" opacity={0.35} />
      {/* tiny mark dots */}
      <circle cx="33" cy="59" r="0.7" fill="#2d3a8c" stroke="none" opacity={0.4} />
      <circle cx="67" cy="59" r="0.7" fill="#2d3a8c" stroke="none" opacity={0.4} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Additional icon variants                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */
function IconAcne() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
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
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <path d="M36 30 Q50 27 64 30" stroke="#2d3a8c" strokeWidth="1" fill="none" opacity={0.45} />
      <path d="M38 34 Q50 31 62 34" stroke="#2d3a8c" strokeWidth="0.9" fill="none" opacity={0.35} />
      <path d="M26 44 L22 42 M26 47 L21 47 M26 50 L22 52"
        stroke="#2d3a8c" strokeWidth="1" strokeLinecap="round" fill="none" opacity={0.4} />
      <path d="M74 44 L78 42 M74 47 L79 47 M74 50 L78 52"
        stroke="#2d3a8c" strokeWidth="1" strokeLinecap="round" fill="none" opacity={0.4} />
      <path d="M41 57 Q43 60 42 63" stroke="#2d3a8c" strokeWidth="1" fill="none" opacity={0.4} />
      <path d="M59 57 Q57 60 58 63" stroke="#2d3a8c" strokeWidth="1" fill="none" opacity={0.4} />
    </svg>
  );
}

function IconDarkCircles() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
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
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <ellipse cx="50" cy="30" rx="4" ry="2.5" fill="#2d3a8c" opacity={0.2} stroke="none" />
      <path d="M46 28 L47 25" stroke="#2d3a8c" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity={0.45} />
      <path d="M50 27 L50 24" stroke="#2d3a8c" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity={0.45} />
      <path d="M54 28 L55 25" stroke="#2d3a8c" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity={0.45} />
      <path d="M30 52 C30 52 28 56 28 59 C28 62 30 63 30 63 C30 63 32 62 32 59 C32 56 30 52 30 52Z"
        {...S} strokeWidth="1.1" opacity={0.5} />
      <path d="M70 50 C70 50 68 54 68 57 C68 60 70 61 70 61 C70 61 72 60 72 57 C72 54 70 50 70 50Z"
        {...S} strokeWidth="1.1" opacity={0.5} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Icon dispatcher                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────── */
/* Icon catalogue (used by admin form)                                         */
/* ─────────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────── */
/* Section component                                                           */
/* ─────────────────────────────────────────────────────────────────────────── */
interface Props {
  concerns: SkinConcern[];
  heading?: string;
}

export default function SkinConcernsSection({ concerns, heading }: Props) {
  if (!concerns?.length) return null;

  return (
    <section className="py-12 px-4 bg-background">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        {heading && (
          <div className="mb-10 text-center">
            <h2
              className="inline text-2xl font-bold tracking-tight md:text-3xl"
              style={{
                color: "#1e2a6e",
                borderBottom: "2px solid #1e2a6e",
                paddingBottom: "2px",
              }}
            >
              {heading}
            </h2>
          </div>
        )}

        {/* Icons row — centered, no card border, just circle + label */}
        <div className="flex flex-wrap justify-between gap-8 sm:gap-10">
          {concerns.map((concern, i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-[100px] sm:w-[110px]">

              {/* Circle background */}
              <div
                className="flex h-[96px] w-[96px] items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
                style={{
                  background: "#eef0fa",
                  border: "1.5px solid #c7cdf0",
                }}
              >
                <SkinConcernIcon keyword={concern.icon ?? "dark-spots"} />
              </div>

              {/* Label */}
              <p className="text-center text-xs font-medium leading-snug whitespace-pre-line" style={{ color: "#1e2a6e" }}>
                {concern.label}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
