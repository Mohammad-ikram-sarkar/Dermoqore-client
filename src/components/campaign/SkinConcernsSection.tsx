"use client";

import React from "react";
import type { SkinConcern } from "@/service/campaign.service";

/* ─────────────────────────────────────────────────────────────────────────── */
/* Face SVG icons — each represents a different skin concern                   */
/* All drawn at 64×64, line-art style matching the design in the screenshot   */
/* ─────────────────────────────────────────────────────────────────────────── */

function FaceSvg({ keyword }: { keyword: string }) {
  const s = {
    fill: "none" as const,
    stroke: "var(--cpt, #374151)",
    strokeWidth: "1.35",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  /* ── shared face base ── */
  const FaceBase = () => (
    <>
      {/* head */}
      <ellipse cx="32" cy="28" rx="16" ry="18" {...s} />
      {/* neck */}
      <path d="M26 44 C26 48 28 50 32 51 C36 50 38 48 38 44" {...s} />
      {/* hair top */}
      <path d="M16.5 24 C16 18 20 13 26 12 C28 11.5 30 11 32 11 C34 11 36 11.5 38 12 C44 13 48 18 47.5 24" {...s} />
      {/* left ear */}
      <path d="M16 26 C13.5 26 12 27.5 12 29 C12 30.5 13.5 32 16 32" {...s} />
      {/* right ear */}
      <path d="M48 26 C50.5 26 52 27.5 52 29 C52 30.5 50.5 32 48 32" {...s} />
      {/* left eye */}
      <ellipse cx="25" cy="27" rx="3" ry="2" {...s} />
      <circle cx="25.5" cy="27" r="0.8" fill="var(--cpt, #374151)" stroke="none" />
      {/* right eye */}
      <ellipse cx="39" cy="27" rx="3" ry="2" {...s} />
      <circle cx="39.5" cy="27" r="0.8" fill="var(--cpt, #374151)" stroke="none" />
      {/* nose */}
      <path d="M32 27 L30.5 33 Q32 34.5 33.5 33 L32 27" {...s} strokeWidth="1.1" />
      {/* mouth */}
      <path d="M27 37 Q32 40 37 37" {...s} strokeWidth="1.2" />
    </>
  );

  switch (keyword) {
    /* ── 1. Dark spots / old marks ── */
    case "dark-spots":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* scattered dark spots on cheeks and forehead */}
          <circle cx="21" cy="23" r="1.5" fill="var(--cpt, #374151)" opacity={0.45} stroke="none" />
          <circle cx="43" cy="22" r="1.2" fill="var(--cpt, #374151)" opacity={0.45} stroke="none" />
          <circle cx="19" cy="32" r="1.8" fill="var(--cpt, #374151)" opacity={0.45} stroke="none" />
          <circle cx="44" cy="33" r="1.4" fill="var(--cpt, #374151)" opacity={0.45} stroke="none" />
          <circle cx="32" cy="16" r="1.3" fill="var(--cpt, #374151)" opacity={0.4} stroke="none" />
          <circle cx="27" cy="39" r="1.1" fill="var(--cpt, #374151)" opacity={0.35} stroke="none" />
          <circle cx="38" cy="39" r="1.1" fill="var(--cpt, #374151)" opacity={0.35} stroke="none" />
        </svg>
      );

    /* ── 2. Melasma / hyperpigmentation ── */
    case "melasma":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* large blotchy patches on cheeks */}
          <ellipse cx="21" cy="32" rx="5" ry="3.5" fill="var(--cpt, #374151)" opacity={0.18} stroke="none" />
          <ellipse cx="43" cy="32" rx="5" ry="3.5" fill="var(--cpt, #374151)" opacity={0.18} stroke="none" />
          {/* forehead patch */}
          <ellipse cx="32" cy="18" rx="6" ry="2.5" fill="var(--cpt, #374151)" opacity={0.14} stroke="none" />
          {/* upper lip shadow */}
          <path d="M28 36 Q32 37.5 36 36" stroke="var(--cpt, #374151)" strokeWidth="2" opacity={0.25} strokeLinecap="round" fill="none" />
        </svg>
      );

    /* ── 3. Uneven skin tone ── */
    case "uneven-tone":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* cross / X marks indicating unevenness */}
          <line x1="19" y1="30" x2="23" y2="34" stroke="var(--cpt, #374151)" strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
          <line x1="23" y1="30" x2="19" y2="34" stroke="var(--cpt, #374151)" strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
          <line x1="41" y1="30" x2="45" y2="34" stroke="var(--cpt, #374151)" strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
          <line x1="45" y1="30" x2="41" y2="34" stroke="var(--cpt, #374151)" strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
          {/* uneven tone gradient patches */}
          <ellipse cx="20" cy="32" rx="4" ry="3" fill="var(--cpt, #374151)" opacity={0.12} stroke="none" />
          <ellipse cx="44" cy="32" rx="3" ry="2.5" fill="var(--cpt, #374151)" opacity={0.2} stroke="none" />
          <ellipse cx="32" cy="20" rx="5" ry="2" fill="var(--cpt, #374151)" opacity={0.1} stroke="none" />
        </svg>
      );

    /* ── 4. Sun spots / pigmentation ── */
    case "sun-spots":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* small sun rays above head */}
          <circle cx="50" cy="10" r="4" stroke="var(--cpt, #374151)" strokeWidth="1.2" fill="none" opacity={0.6} />
          <line x1="50" y1="4" x2="50" y2="2" stroke="var(--cpt, #374151)" strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
          <line x1="54.2" y1="5.8" x2="55.6" y2="4.4" stroke="var(--cpt, #374151)" strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
          <line x1="56" y1="10" x2="58" y2="10" stroke="var(--cpt, #374151)" strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
          <line x1="54.2" y1="14.2" x2="55.6" y2="15.6" stroke="var(--cpt, #374151)" strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
          <line x1="45.8" y1="5.8" x2="44.4" y2="4.4" stroke="var(--cpt, #374151)" strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
          <line x1="44" y1="10" x2="42" y2="10" stroke="var(--cpt, #374151)" strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
          {/* sun spots on face */}
          <circle cx="20" cy="31" r="2" fill="var(--cpt, #374151)" opacity={0.4} stroke="none" />
          <circle cx="43" cy="30" r="1.8" fill="var(--cpt, #374151)" opacity={0.4} stroke="none" />
          <circle cx="29" cy="21" r="1.3" fill="var(--cpt, #374151)" opacity={0.35} stroke="none" />
          <circle cx="36" cy="20" r="1.1" fill="var(--cpt, #374151)" opacity={0.3} stroke="none" />
        </svg>
      );

    /* ── 5. Post-acne / surgical marks ── */
    case "post-acne":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* small raised bump circles (acne) */}
          <circle cx="20" cy="30" r="2.2" stroke="var(--cpt, #374151)" strokeWidth="1.2" fill="none" opacity={0.55} />
          <circle cx="43" cy="31" r="1.8" stroke="var(--cpt, #374151)" strokeWidth="1.2" fill="none" opacity={0.55} />
          <circle cx="26" cy="24" r="1.5" stroke="var(--cpt, #374151)" strokeWidth="1.1" fill="none" opacity={0.5} />
          <circle cx="38" cy="22" r="1.3" stroke="var(--cpt, #374151)" strokeWidth="1.1" fill="none" opacity={0.45} />
          {/* small dots for marks */}
          <circle cx="21" cy="30" r="0.6" fill="var(--cpt, #374151)" stroke="none" opacity={0.5} />
          <circle cx="44" cy="31" r="0.6" fill="var(--cpt, #374151)" stroke="none" opacity={0.5} />
          {/* scar line */}
          <path d="M32 38 Q33 37 34 38.5" stroke="var(--cpt, #374151)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.4} />
        </svg>
      );

    /* ── 6. Acne / pimples ── */
    case "acne":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          <circle cx="19" cy="29" r="2.5" stroke="var(--cpt, #374151)" strokeWidth="1.3" fill="none" opacity={0.6} />
          <circle cx="19" cy="29" r="1" fill="var(--cpt, #374151)" stroke="none" opacity={0.4} />
          <circle cx="44" cy="30" r="2" stroke="var(--cpt, #374151)" strokeWidth="1.3" fill="none" opacity={0.6} />
          <circle cx="44" cy="30" r="0.9" fill="var(--cpt, #374151)" stroke="none" opacity={0.4} />
          <circle cx="27" cy="22" r="1.8" stroke="var(--cpt, #374151)" strokeWidth="1.2" fill="none" opacity={0.5} />
          <circle cx="37" cy="22" r="1.5" stroke="var(--cpt, #374151)" strokeWidth="1.2" fill="none" opacity={0.5} />
          <circle cx="32" cy="36" r="1.4" stroke="var(--cpt, #374151)" strokeWidth="1.2" fill="none" opacity={0.45} />
        </svg>
      );

    /* ── 7. Wrinkles / fine lines ── */
    case "wrinkles":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* forehead lines */}
          <path d="M22 19 Q32 17 42 19" stroke="var(--cpt, #374151)" strokeWidth="1" fill="none" opacity={0.45} />
          <path d="M24 22 Q32 20 40 22" stroke="var(--cpt, #374151)" strokeWidth="0.9" fill="none" opacity={0.35} />
          {/* crow's feet */}
          <path d="M21.5 25 L18 23 M21.5 26.5 L17.5 26.5 M21.5 28 L18 30" stroke="var(--cpt, #374151)" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity={0.4} />
          <path d="M42.5 25 L46 23 M42.5 26.5 L46.5 26.5 M42.5 28 L46 30" stroke="var(--cpt, #374151)" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity={0.4} />
          {/* nasolabial fold */}
          <path d="M27 34 Q25 37 27 39" stroke="var(--cpt, #374151)" strokeWidth="1" fill="none" opacity={0.4} />
          <path d="M37 34 Q39 37 37 39" stroke="var(--cpt, #374151)" strokeWidth="1" fill="none" opacity={0.4} />
        </svg>
      );

    /* ── 8. Dryness / flaking ── */
    case "dryness":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* small flake shapes scattered on face */}
          <path d="M19 28 L21 28 L20 26 Z" stroke="var(--cpt, #374151)" strokeWidth="0.9" fill="none" opacity={0.45} />
          <path d="M43 27 L45 27 L44 25 Z" stroke="var(--cpt, #374151)" strokeWidth="0.9" fill="none" opacity={0.45} />
          <path d="M26 20 L28 20 L27 18 Z" stroke="var(--cpt, #374151)" strokeWidth="0.9" fill="none" opacity={0.4} />
          <path d="M36 21 L38 21 L37 19 Z" stroke="var(--cpt, #374151)" strokeWidth="0.9" fill="none" opacity={0.4} />
          <path d="M20 35 L22 35 L21 33 Z" stroke="var(--cpt, #374151)" strokeWidth="0.9" fill="none" opacity={0.4} />
          <path d="M42 36 L44 36 L43 34 Z" stroke="var(--cpt, #374151)" strokeWidth="0.9" fill="none" opacity={0.4} />
          {/* crack lines on cheeks */}
          <path d="M18 31 Q20 32 19 34" stroke="var(--cpt, #374151)" strokeWidth="0.8" fill="none" opacity={0.35} strokeDasharray="1.5 1.5" />
          <path d="M46 30 Q44 32 45 34" stroke="var(--cpt, #374151)" strokeWidth="0.8" fill="none" opacity={0.35} strokeDasharray="1.5 1.5" />
        </svg>
      );

    /* ── 9. Oily skin ── */
    case "oily":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* shine / glare dots on T-zone */}
          <ellipse cx="32" cy="18" rx="2" ry="1.5" fill="var(--cpt, #374151)" opacity={0.2} stroke="none" />
          <ellipse cx="32" cy="22" rx="3" ry="1.5" fill="var(--cpt, #374151)" opacity={0.15} stroke="none" />
          {/* shine highlight lines */}
          <path d="M29 17 L30.5 15" stroke="var(--cpt, #374151)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.4} />
          <path d="M32 16 L32 14" stroke="var(--cpt, #374151)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.4} />
          <path d="M35 17 L36.5 15" stroke="var(--cpt, #374151)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.4} />
          {/* oil drops on cheeks */}
          <path d="M19 32 C19 32 17.5 34.5 19 36 C20.5 36 21 34.5 19 32Z" stroke="var(--cpt, #374151)" strokeWidth="1" fill="none" opacity={0.45} />
          <path d="M45 30 C45 30 43.5 32.5 45 34 C46.5 34 47 32.5 45 30Z" stroke="var(--cpt, #374151)" strokeWidth="1" fill="none" opacity={0.45} />
        </svg>
      );

    /* ── 10. Dark circles ── */
    case "dark-circles":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* dark arcs under each eye */}
          <path d="M21 30 Q25 33 29 30" stroke="var(--cpt, #374151)" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={0.5} />
          <path d="M35 30 Q39 33 43 30" stroke="var(--cpt, #374151)" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={0.5} />
          {/* shadow fill under eyes */}
          <ellipse cx="25" cy="30" rx="4" ry="1.5" fill="var(--cpt, #374151)" opacity={0.12} stroke="none" />
          <ellipse cx="39" cy="30" rx="4" ry="1.5" fill="var(--cpt, #374151)" opacity={0.12} stroke="none" />
        </svg>
      );

    /* ── Default / generic skin concern ── */
    default:
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <FaceBase />
          {/* generic star/sparkle to indicate a concern */}
          <path d="M32 16 L33 20 L37 20 L34 22.5 L35 26.5 L32 24 L29 26.5 L30 22.5 L27 20 L31 20 Z" stroke="var(--cpt, #374151)" strokeWidth="1" fill="none" opacity={0.5} />
        </svg>
      );
  }
}

/* ─── Icon keyword catalogue (used by admin form) ──────────────────────── */
export const SKIN_CONCERN_OPTIONS: { keyword: string; label: string }[] = [
  { keyword: "dark-spots", label: "রণের পুরানো দাগ (Dark Spots)" },
  { keyword: "melasma", label: "কালো ছোপ / মেসমা (Melasma)" },
  { keyword: "uneven-tone", label: "Uneven Skin Tone" },
  { keyword: "sun-spots", label: "Sun Spots / Pigmentation" },
  { keyword: "post-acne", label: "মেসকা / পড়ার পর মুখের দাগ (Post-Acne)" },
  { keyword: "acne", label: "Acne / Pimples" },
  { keyword: "wrinkles", label: "Wrinkles / Fine Lines" },
  { keyword: "dryness", label: "Dryness / Flaking" },
  { keyword: "oily", label: "Oily Skin" },
  { keyword: "dark-circles", label: "Dark Circles" },
];

/* ─── Component ─────────────────────────────────────────────────────────── */

interface Props {
  concerns: SkinConcern[];
  heading?: string;
}

export default function SkinConcernsSection({ concerns, heading }: Props) {
  if (!concerns?.length) return null;

  return (
    <section className="py-12 px-4 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        {heading && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{heading}</h2>
          </div>
        )}

        {/* Icons row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {concerns.map((concern, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 w-[110px] sm:w-[120px]"
            >
              {/* Circle icon container */}
              <div
                className="flex h-[88px] w-[88px] items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
                style={{
                  background: "var(--cps, #f3f4f6)",
                  border: "1.5px solid var(--cpr, #e5e7eb)",
                }}
              >
                <FaceSvg keyword={concern.icon ?? "dark-spots"} />
              </div>

              {/* Label */}
              <p
                className="text-xs font-semibold leading-snug"
                style={{ color: "var(--cpt, #374151)" }}
              >
                {concern.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
