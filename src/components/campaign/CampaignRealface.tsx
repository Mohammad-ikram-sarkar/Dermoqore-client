"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import type { CustomerReview } from "@/service/campaign.service";

interface Props {
  customerReviews?: CustomerReview[];
}

const beforeAfterPairs = [
  { id: 1, before: "/before1.png", after: "/after.png" },
  { id: 2, before: "/before.png", after: "/after.png" },
  { id: 3, before: "/before2.png", after: "/after2.png" },
];

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

export default function CampaignRealface({ customerReviews }: Props) {
  const [index, setIndex] = useState(0);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const prev = () =>
    setIndex((i) => (i - 1 + beforeAfterPairs.length) % beforeAfterPairs.length);
  const next = () =>
    setIndex((i) => (i + 1) % beforeAfterPairs.length);

  const current = beforeAfterPairs[index];
  const next1 = beforeAfterPairs[(index + 1) % beforeAfterPairs.length];

  return (
    <div className="flex items-center justify-center bg-[#f5f0eb] mb-2">
      <section className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-stretch gap-10 py-6">

        {/* LEFT: Before/After Carousel */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Section title */}
          <h2 className="text-center text-[#1a1209] font-semibold text-base mb-4">
            বাস্তব ফলাফল
          </h2>

          <div className="relative flex items-center gap-3">
            {/* Prev arrow */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="shrink-0 w-8 h-8 flex items-center justify-center text-[#1a1209] hover:opacity-60 transition-opacity z-10"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>

            {/* Photo pairs */}
            <div className="flex gap-3 flex-1 overflow-hidden">
              {/* Pair 1 (current) */}
              <div className="flex gap-1 flex-1">
                <div className="flex-1 flex flex-col gap-1">
                  <div className="bg-[#d9cfc7] aspect-[4/5] overflow-hidden rounded-sm">
                    <img
                      src={current.before}
                      alt="Before treatment"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7a6f65] pt-1">
                    Before
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="bg-[#d9cfc7] aspect-[4/5] overflow-hidden rounded-sm">
                    <img
                      src={current.after}
                      alt="After 4 weeks"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7a6f65] pt-1">
                    After 4 Weeks
                  </span>
                </div>
              </div>

              {/* Pair 2 (peek) */}
              <div className="flex gap-1 flex-1">
                <div className="flex-1 flex flex-col gap-1">
                  <div className="bg-[#d9cfc7] aspect-[4/5] overflow-hidden rounded-sm">
                    <img
                      src={next1.before}
                      alt="Before treatment"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7a6f65] pt-1">
                    Before
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="bg-[#d9cfc7] aspect-[4/5] overflow-hidden rounded-sm">
                    <img
                      src={next1.after}
                      alt="After 4 weeks"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7a6f65] pt-1">
                    After 4 Weeks
                  </span>
                </div>
              </div>
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              aria-label="Next"
              className="shrink-0 w-8 h-8 flex items-center justify-center text-[#1a1209] hover:opacity-60 transition-opacity z-10"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          </div>

          <p className="text-center text-[0.65rem] text-[#7a6f65] mt-3 tracking-wide">
            * ফলাফল ব্যক্তি ভেদে ভিন্ন হতে পারে
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-[#d9cfc7] self-stretch" />

        {/* RIGHT: Customer Video Testimonials */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Section title */}
          <h2 className="text-[#1a1209] font-semibold text-base mb-4">
            গ্রাহকরা যা বলেছেন
          </h2>

          {customerReviews && customerReviews.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {customerReviews.map((r, i) => {
                const embedUrl = getYouTubeEmbedUrl(r.videoUrl);
                const thumb = getYouTubeThumbnail(r.videoUrl);
                return (
                <div key={i} className="flex flex-col gap-2">
                  <div
                    className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#d9cfc7] cursor-pointer group"
                    onClick={() => setPlayingUrl(r.videoUrl === playingUrl ? null : r.videoUrl)}
                  >
                    {playingUrl === r.videoUrl && embedUrl ? (
                      <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : thumb ? (
                      <>
                        <img
                          src={thumb}
                          alt={r.name}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Play
                              size={16}
                              className="text-[#1a1209] fill-[#1a1209] ml-0.5"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full h-full bg-[#d9cfc7] flex items-center justify-center text-[#7a6f65] text-xs px-2 text-center">
                          {r.title || r.name}
                        </div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Play
                              size={16}
                              className="text-[#1a1209] fill-[#1a1209] ml-0.5"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-[0.75rem] font-semibold text-[#1a1209] leading-tight">
                    {r.name}
                  </p>

                  {r.videoTitle && (
                    <p className="text-[0.7rem] font-medium text-[#1a1209] leading-tight">
                      {r.videoTitle}
                    </p>
                  )}

                  {r.videoDescription && (
                    <p className="text-[0.65rem] text-[#5a5047] leading-snug">
                      {r.videoDescription}
                    </p>
                  )}

                  {r.title && (
                    <p className="text-[0.65rem] text-[#5a5047] leading-snug">
                      {r.title}
                    </p>
                  )}
                </div>
              );
            })}
            </div>
          ) : (
            <p className="text-[0.75rem] text-[#7a6f65]">No reviews yet</p>
          )}
        </div>

      </section>
    </div>
  );
}