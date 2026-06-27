"use client";

import { useState } from "react";

const NAVY = "#1a2466";
const S = NAVY; // stroke color shorthand

const FEATURES = [
  {
    id: "science",
    label: "Science-Based\nFormula",
    icon: (
      /* Three circles connected in a triangular molecule */
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="7"  r="4" stroke={S} strokeWidth="1.5" />
        <circle cx="7"  cy="22" r="4" stroke={S} strokeWidth="1.5" />
        <circle cx="23" cy="22" r="4" stroke={S} strokeWidth="1.5" />
        <line x1="15" y1="11" x2="7"  y2="18" stroke={S} strokeWidth="1.4" />
        <line x1="15" y1="11" x2="23" y2="18" stroke={S} strokeWidth="1.4" />
        <line x1="11" y1="22" x2="19" y2="22" stroke={S} strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "transparency",
    label: "Ingredient\nTransparency",
    icon: (
      /* Circle with X cross inside — ⊗ */
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="10" stroke={S} strokeWidth="1.5" />
        <line x1="8.5"  y1="8.5"  x2="21.5" y2="21.5" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="21.5" y1="8.5"  x2="8.5"  y2="21.5" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "steroid",
    label: "No Steroid",
    icon: (
      /* Circle with diagonal slash — ⊘ / prohibition */
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="10" stroke={S} strokeWidth="1.5" />
        <line x1="8.5" y1="8.5" x2="21.5" y2="21.5" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="21.5" y1="8.5" x2="8.5"  y2="21.5" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="15" cy="15" r="4.5" stroke={S} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "fragrance",
    label: "Fragrance\nFree",
    icon: (
      /* 6-petal flower / asterisk */
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        {/* 6 petals via ellipses rotated around center */}
        <ellipse cx="15" cy="9"  rx="2.5" ry="4.5" stroke={S} strokeWidth="1.4" />
        <ellipse cx="15" cy="9"  rx="2.5" ry="4.5" stroke={S} strokeWidth="1.4" transform="rotate(60 15 15)" />
        <ellipse cx="15" cy="9"  rx="2.5" ry="4.5" stroke={S} strokeWidth="1.4" transform="rotate(120 15 15)" />
        <ellipse cx="15" cy="9"  rx="2.5" ry="4.5" stroke={S} strokeWidth="1.4" transform="rotate(180 15 15)" />
        <ellipse cx="15" cy="9"  rx="2.5" ry="4.5" stroke={S} strokeWidth="1.4" transform="rotate(240 15 15)" />
        <ellipse cx="15" cy="9"  rx="2.5" ry="4.5" stroke={S} strokeWidth="1.4" transform="rotate(300 15 15)" />
        <circle cx="15" cy="15" r="2.5" stroke={S} strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "gentle",
    label: "Gentle & Safe\nfor Skin",
    icon: (
      /* Pear / water-drop outline */
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M15 5 C15 5 9 10 9 17 C9 21.4 11.6 24.5 15 24.5 C18.4 24.5 21 21.4 21 17 C21 10 15 5 15 5Z"
          stroke={S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <path d="M12.5 19.5 C12.5 19.5 11 17.5 11.5 15" stroke={S} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "bangladesh",
    label: "Made in\nBangladesh",
    icon: (
      /* Shield with small inner circle */
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M15 5 L24 9 L24 17 C24 22 20 25.5 15 27.5 C10 25.5 6 22 6 17 L6 9 Z"
          stroke={S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="15" cy="16" r="4.5" stroke={S} strokeWidth="1.3" />
      </svg>
    ),
  },
];

interface VideoSectionProps {
  videoUrl?: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function VideoSection({ videoUrl = "" }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);

  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <section className="bg-background px-4 pt-12 md:pt-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 rounded-2xl bg-[#f3f6fc] px-8 py-10 md:grid-cols-2 md:gap-14">

        {/* ── Left: Video ─────────────────────────────────────────── */}
        <div>
          <div className="relative aspect-video overflow-hidden rounded-[12px] bg-[#dce3f0] shadow-md">
            {playing && videoId ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="Campaign video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {thumbnailUrl ? (
                  <img src={thumbnailUrl} alt="Video thumbnail" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-sm font-medium opacity-40" style={{ color: NAVY }}>No video added</span>
                  </div>
                )}

                <button
                  onClick={() => videoId && setPlaying(true)}
                  disabled={!videoId}
                  aria-label="Play video"
                  className="group absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-105 group-active:scale-95">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={NAVY} className="ml-1">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </span>
                </button>

                <span className="absolute bottom-3 right-3 rounded-[4px] bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white">
                  2:15
                </span>
              </>
            )}
          </div>

          <div className="mt-4 text-center">
            <p className="text-[16px] font-bold leading-snug" style={{ color: "#1a1a1a" }}>
              2 মিনিটে জানুন<br />কেন Dermoqore আলাদা?
            </p>
            <p className="mt-1.5 text-xs text-gray-400">
              Founder-এর কাছ থেকে সরাসরি শুনুন
            </p>
          </div>
        </div>

        {/* ── Right: Why Different ────────────────────────────────── */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="mb-7 text-[22px] font-bold sm:text-2xl" style={{ color: NAVY }}>
            Dermoqore কেন আলাদা?
          </h2>

          <div className="grid grid-cols-3 gap-x-4 gap-y-8">
            {FEATURES.map((feat) => (
              <div key={feat.id} className="flex flex-col items-center gap-3 text-center">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "#edf0fb",
                    border: "1.5px solid #b8c4e4",
                  }}
                >
                  {feat.icon}
                </div>
                <span
                  className="whitespace-pre-line text-[11.5px] font-medium leading-tight"
                  style={{ color: "#374270" }}
                >
                  {feat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
