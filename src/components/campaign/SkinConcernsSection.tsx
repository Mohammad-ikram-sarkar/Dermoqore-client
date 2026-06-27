"use client";

import React from "react";
import type { SkinConcern } from "@/service/campaign.service";

const C = "#1a2466"; // navy stroke color

/* ── Clean cartoon face base (line-art, navy, ref-style) ──────────────────
   Round face, minimal features, all strokes in navy.
   ───────────────────────────────────────────────────────────────────────── */
function FaceBase() {
  return (
    <>
      {/* Face outline */}
      <ellipse cx="50" cy="54" rx="24" ry="28" fill="none" stroke={C} strokeWidth="1.8" />

      {/* Hair — simple arc on top */}
      <path d="M28 46 C26 26 74 26 72 46" fill="#d0d8f0" stroke={C} strokeWidth="1.6" strokeLinecap="round" />

      {/* Ears */}
      <path d="M26 52 C23 50 22 56 26 57" fill="none" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M74 52 C77 50 78 56 74 57" fill="none" stroke={C} strokeWidth="1.4" strokeLinecap="round" />

      {/* Neck */}
      <path d="M44 80 L44 86 Q50 88 56 86 L56 80" fill="none" stroke={C} strokeWidth="1.4" strokeLinecap="round" />

      {/* Eyebrows */}
      <path d="M37 46 Q41 43 45 45" fill="none" stroke={C} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 45 Q59 43 63 46" fill="none" stroke={C} strokeWidth="1.5" strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="41" cy="51" rx="3.5" ry="4" fill="none" stroke={C} strokeWidth="1.4" />
      <circle cx="41" cy="52" r="1.5" fill={C} />
      <ellipse cx="59" cy="51" rx="3.5" ry="4" fill="none" stroke={C} strokeWidth="1.4" />
      <circle cx="59" cy="52" r="1.5" fill={C} />

      {/* Nose */}
      <path d="M48 57 Q50 60 52 57" fill="none" stroke={C} strokeWidth="1.2" strokeLinecap="round" />

      {/* Mouth */}
      <path d="M44 65 Q50 70 56 65" fill="none" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
    </>
  );
}

/* ── 1. Dark Spots ──────────────────────────────────────────────────────── */
function IconDarkSpots() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* Hand touching cheek */}
      <path d="M18 64 C16 60 16 55 18 53 C20 51 22 52 23 54 L24 57 C24 57 25 53 27 52 C29 51 31 53 30 56 C30 56 32 53 34 53 C36 53 37 55 36 58 L34 65 C33 68 30 70 27 70 L22 70 Z"
        fill="none" stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spots on cheeks */}
      <circle cx="34" cy="55" r="2" fill={C} opacity={0.35} />
      <circle cx="36" cy="61" r="1.4" fill={C} opacity={0.3} />
      <circle cx="31" cy="59" r="1.2" fill={C} opacity={0.28} />
      <circle cx="66" cy="56" r="1.8" fill={C} opacity={0.32} />
      <circle cx="65" cy="62" r="1.2" fill={C} opacity={0.28} />
    </svg>
  );
}

/* ── 2. Melasma ─────────────────────────────────────────────────────────── */
function IconMelasma() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* Patch marks on both cheeks */}
      <ellipse cx="34" cy="57" rx="6" ry="4.5" fill={C} opacity={0.15} stroke={C} strokeWidth="0.8" strokeOpacity={0.3} />
      <ellipse cx="33" cy="55" rx="4" ry="3" fill={C} opacity={0.1} />
      <ellipse cx="66" cy="57" rx="6" ry="4.5" fill={C} opacity={0.15} stroke={C} strokeWidth="0.8" />
      <ellipse cx="67" cy="55" rx="4" ry="3" fill={C} opacity={0.1} />
      {/* Teardrop / concerned expression */}
      <path d="M27 63 C27 63 25 67 25 69 C25 71 26 72 27 72 C28 72 29 71 29 69 C29 67 27 63 27 63Z"
        fill="none" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── 3. Uneven Skin Tone ───────────────────────────────────────────────── */
function IconUnevenTone() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* X marks showing uneven patches */}
      <line x1="31" y1="53" x2="37" y2="59" stroke={C} strokeWidth="1.6" strokeLinecap="round" opacity={0.5} />
      <line x1="37" y1="53" x2="31" y2="59" stroke={C} strokeWidth="1.6" strokeLinecap="round" opacity={0.5} />
      <line x1="63" y1="53" x2="69" y2="59" stroke={C} strokeWidth="1.6" strokeLinecap="round" opacity={0.5} />
      <line x1="69" y1="53" x2="63" y2="59" stroke={C} strokeWidth="1.6" strokeLinecap="round" opacity={0.5} />
      {/* Dotted patch */}
      <ellipse cx="34" cy="56" rx="5" ry="3.5" fill={C} opacity={0.1} />
      <ellipse cx="66" cy="56" rx="5" ry="3.5" fill={C} opacity={0.1} />
    </svg>
  );
}

/* ── 4. Sun Spots / Pigmentation ───────────────────────────────────────── */
function IconSunSpots() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* Small sun top-right */}
      <circle cx="75" cy="18" r="5" fill="none" stroke={C} strokeWidth="1.3" />
      <line x1="75" y1="10" x2="75" y2="8" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="75" y1="26" x2="75" y2="28" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="67" y1="18" x2="65" y2="18" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="83" y1="18" x2="85" y2="18" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="69.9" y1="12.9" x2="68.5" y2="11.5" stroke={C} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="80.1" y1="23.1" x2="81.5" y2="24.5" stroke={C} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="80.1" y1="12.9" x2="81.5" y2="11.5" stroke={C} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="69.9" y1="23.1" x2="68.5" y2="24.5" stroke={C} strokeWidth="1.1" strokeLinecap="round" />
      {/* Spots */}
      <circle cx="34" cy="55" r="2" fill={C} opacity={0.32} />
      <circle cx="66" cy="56" r="1.8" fill={C} opacity={0.3} />
      <circle cx="36" cy="61" r="1.4" fill={C} opacity={0.26} />
      <circle cx="50" cy="40" r="1.3" fill={C} opacity={0.24} />
    </svg>
  );
}

/* ── 5. Post-Acne / মেছতা ─────────────────────────────────────────────── */
function IconPostAcne() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      {/* Acne marks — small circles with dots */}
      <circle cx="33" cy="55" r="3" fill="none" stroke={C} strokeWidth="1.2" opacity={0.6} />
      <circle cx="33" cy="55" r="1" fill={C} opacity={0.5} />
      <circle cx="67" cy="56" r="2.5" fill="none" stroke={C} strokeWidth="1.2" opacity={0.6} />
      <circle cx="67" cy="56" r="1" fill={C} opacity={0.5} />
      <circle cx="44" cy="42" r="2" fill="none" stroke={C} strokeWidth="1.1" opacity={0.5} />
      <circle cx="44" cy="42" r="0.8" fill={C} opacity={0.45} />
      <circle cx="57" cy="41" r="1.8" fill="none" stroke={C} strokeWidth="1.1" opacity={0.5} />
      {/* Post-acne flat marks */}
      <ellipse cx="35" cy="62" rx="2.5" ry="1.5" fill={C} opacity={0.2} />
      <ellipse cx="65" cy="63" rx="2" ry="1.3" fill={C} opacity={0.18} />
    </svg>
  );
}

function IconAcne() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <circle cx="32" cy="54" r="3.5" fill="none" stroke={C} strokeWidth="1.3" />
      <circle cx="32" cy="54" r="1.4" fill={C} opacity={0.5} />
      <circle cx="68" cy="55" r="3" fill="none" stroke={C} strokeWidth="1.3" />
      <circle cx="68" cy="55" r="1.2" fill={C} opacity={0.5} />
      <circle cx="44" cy="40" r="2.5" fill="none" stroke={C} strokeWidth="1.2" />
      <circle cx="57" cy="39" r="2" fill="none" stroke={C} strokeWidth="1.2" />
      <circle cx="50" cy="64" r="2" fill="none" stroke={C} strokeWidth="1.1" />
    </svg>
  );
}

function IconWrinkles() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <path d="M37 33 Q50 30 63 33" stroke={C} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity={0.55} />
      <path d="M39 37 Q50 34 61 37" stroke={C} strokeWidth="1" fill="none" strokeLinecap="round" opacity={0.4} />
      <path d="M26 48 L22 46 M26 52 L21 52 M26 56 L22 58" stroke={C} strokeWidth="1.1" strokeLinecap="round" opacity={0.45} />
      <path d="M74 48 L78 46 M74 52 L79 52 M74 56 L78 58" stroke={C} strokeWidth="1.1" strokeLinecap="round" opacity={0.45} />
      <path d="M43 63 Q46 66 43 69" stroke={C} strokeWidth="1" fill="none" strokeLinecap="round" opacity={0.4} />
      <path d="M57 63 Q54 66 57 69" stroke={C} strokeWidth="1" fill="none" strokeLinecap="round" opacity={0.4} />
    </svg>
  );
}

function IconDarkCircles() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <path d="M37 56 Q41 60 45 56" stroke={C} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={0.55} />
      <path d="M55 56 Q59 60 63 56" stroke={C} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={0.55} />
      <ellipse cx="41" cy="55" rx="5.5" ry="2.5" fill={C} opacity={0.12} />
      <ellipse cx="59" cy="55" rx="5.5" ry="2.5" fill={C} opacity={0.12} />
    </svg>
  );
}

function IconOilySkin() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <FaceBase />
      <path d="M42 34 C42 34 41 30 43 29 C45 30 44 34 42 34Z" fill="none" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M50 31 C50 31 49 27 51 26 C53 27 52 31 50 31Z" fill="none" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M58 34 C58 34 57 30 59 29 C61 30 60 34 58 34Z" fill="none" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="34" cy="57" rx="3" ry="2" fill={C} opacity={0.15} />
      <ellipse cx="66" cy="57" rx="3" ry="2" fill={C} opacity={0.15} />
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
  { keyword: "dark-spots",   label: "ব্রণের পুরানো দাগ (Dark Spots)" },
  { keyword: "melasma",      label: "কালো ছোপ / মেলাসমা" },
  { keyword: "uneven-tone",  label: "Uneven Skin Tone" },
  { keyword: "sun-spots",    label: "Sun Spots / Pigmentation" },
  { keyword: "post-acne",    label: "মেছতা / Post-Acne Marks" },
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
    <section className="py-10 sm:py-12 px-4 sm:px-6 bg-background">
      <div className="mx-auto max-w-5xl">

        {heading && (
          <div className="mb-8 sm:mb-10 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1a2466" }}>
              {heading}
            </h2>
          </div>
        )}

        {/* Mobile: horizontal scroll */}
        <div className="sm:hidden overflow-x-auto pb-3 -mx-4 px-4">
          <div className="flex gap-5 w-max">
            {concerns.map((concern, i) => (
              <ConcernCard key={i} concern={concern} size="sm" />
            ))}
          </div>
        </div>

        {/* sm+: 5-column grid */}
        <div className="hidden grid-cols-5 justify-items-center gap-4 sm:grid md:gap-8">
          {concerns.map((concern, i) => (
            <ConcernCard key={i} concern={concern} size="md" />
          ))}
        </div>

      </div>
    </section>
  );
}

function ConcernCard({ concern, size }: { concern: SkinConcern; size: "sm" | "md" }) {
  const circleSize = size === "sm" ? "h-[80px] w-[80px]" : "h-[100px] w-[100px]";
  const wrapWidth  = size === "sm" ? "w-[84px]" : "w-full";

  return (
    <div className={`flex flex-col items-center gap-2.5 ${wrapWidth}`}>
      <div
        className={`flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 ${circleSize}`}
        style={{ background: "#eef0fa", border: "1.5px solid #c7cdf0" }}
      >
        <div className="h-[82%] w-[82%]">
          <SkinConcernIcon keyword={concern.icon ?? "dark-spots"} />
        </div>
      </div>

      <p
        className="text-center font-bold leading-snug whitespace-pre-line"
        style={{
          color: "#1a2466",
          fontSize: size === "sm" ? "10px" : "11.5px",
          fontWeight: 700,
          maxWidth: size === "sm" ? "80px" : "110px",
        }}
      >
        {concern.label}
      </p>
    </div>
  );
}
