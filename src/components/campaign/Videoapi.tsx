"use client";

import { useState } from "react";

const FEATURES = [
  {
    id: "science",
    label: "Science-Based Formula",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v7l3 9H6l3-9V3z" />
        <path d="M6 6h12" />
      </svg>
    ),
    blocked: false,
  },
  {
    id: "transparency",
    label: "Ingredient Transparency",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    blocked: false,
  },
  {
    id: "steroid",
    label: "No Steroid",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="9" width="16" height="6" rx="3" />
        <path d="M8 9V7m8 2V7" />
      </svg>
    ),
    blocked: true,
  },
  {
    id: "fragrance",
    label: "Fragrance Free",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 0-4 3-4 7s4 7 4 7 4-3 4-7-4-7-4-7z" />
        <path d="M8 18h8" />
        <path d="M10 21h4" />
      </svg>
    ),
    blocked: true,
  },
  {
    id: "gentle",
    label: "Gentle & Safe for Skin",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21C12 21 4 14 4 8.5a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 20 8.5C20 14 12 21 12 21z" />
      </svg>
    ),
    blocked: false,
  },
  {
    id: "bangladesh",
    label: "Made in Bangladesh",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
    blocked: false,
  },
];

interface VideoSectionProps {
  videoUrl?: string;
  videoTitle?: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function VideoSection({
  videoUrl = "",
  videoTitle = "২ মিনিটে জানুন কেন Dermoqore আলাদা?",
}: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);

  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left — Video */}
        <div>
          <div className="relative rounded-[10px] overflow-hidden bg-gray-100 aspect-video shadow-sm">
            {playing && videoId ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={videoTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#e8f0ea] flex items-center justify-center">
                    <span className="text-[#2d7a3a] text-sm font-medium opacity-50">
                      No video added
                    </span>
                  </div>
                )}

                {/* Play button */}
                <button
                  onClick={() => videoId && setPlaying(true)}
                  disabled={!videoId}
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-transform group-hover:scale-105 group-active:scale-95 disabled:opacity-40">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="#2d7a3a"
                      className="ml-1"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </span>
                </button>

                {/* Duration badge */}
                <span className="absolute bottom-3 right-3 text-xs text-white bg-black/70 px-2 py-0.5 rounded font-medium">
                  2:15
                </span>
              </>
            )}
          </div>

          {/* Caption */}
          <div className="mt-4 text-center">
            <p className="text-[15px] font-semibold text-gray-800 leading-snug">
              {videoTitle}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Founder-এর কাছ থেকে সরাসরি শুনুন
            </p>
          </div>
        </div>

        {/* Right — Features */}
        <div >
          <h2 className="text-xl font-semibold text-gray-900 mt-[-60px] ml-10 pb-10">
            Dermoqore কেন আলাদা?
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {FEATURES.map((feat) => (
              <div key={feat.id} className="flex flex-col items-center gap-2">
                <div className="relative w-[52px] h-[52px] rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500">
                  {feat.icon}
                  {feat.blocked && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-red-100 flex items-center justify-center">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="#c0392b"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M2 2l6 6M8 2l-6 6" />
                      </svg>
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-gray-500 text-center leading-tight font-medium">
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