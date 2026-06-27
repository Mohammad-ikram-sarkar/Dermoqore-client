"use client";

import { useState } from "react";
import { Play, Star, ArrowRight } from "lucide-react";
import type { CustomerReview } from "@/service/campaign.service";

const NAVY = "#1a2466";
const CARD_BG = "#edf0fb";

interface Props {
  customerReviews?: CustomerReview[];
}

const RESULTS = [
  { before: "/before1.png", after: "/after.png",  week: "4 Weeks" },
  { before: "/before.png",  after: "/after.png",  week: "6 Weeks" },
  { before: "/before2.png", after: "/after2.png", week: "8 Weeks" },
];

const INITIAL_REVIEWS = 3;

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function BeforeAfter({ before, after, week }: (typeof RESULTS)[number]) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex w-full gap-0.5 overflow-hidden rounded-md">
        <div className="relative flex-1">
          <div className="aspect-[3/4] overflow-hidden bg-[#cdd5e8]">
            <img src={before} alt="Before" className="h-full w-full object-cover object-top" />
          </div>
          <span className="absolute bottom-1 left-1 rounded-sm bg-black/50 px-1 py-px text-[7px] font-semibold uppercase text-white">
            Before
          </span>
        </div>
        <div className="relative flex-1">
          <div className="aspect-[3/4] overflow-hidden bg-[#cdd5e8]">
            <img src={after} alt="After" className="h-full w-full object-cover object-top" />
          </div>
          <span className="absolute bottom-1 right-1 rounded-sm bg-black/50 px-1 py-px text-[7px] font-semibold uppercase text-white">
            After
          </span>
        </div>
      </div>
      <span className="text-[11px] font-semibold" style={{ color: NAVY }}>
        {week}
      </span>
    </div>
  );
}

export default function CampaignRealface({ customerReviews }: Props) {
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const reviews = customerReviews ?? [];
  const visible = showAll ? reviews : reviews.slice(0, INITIAL_REVIEWS);

  return (
    <section className="bg-white px-4 py-10 md:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-stretch md:gap-6">

        {/* ── LEFT — বাস্তব ফলাফল ── */}
        <div className="flex flex-1 flex-col rounded-2xl px-5 py-5" style={{ background: CARD_BG }}>
          <h2 className="mb-4 text-center text-[15px] font-bold" style={{ color: NAVY }}>
            বাস্তব ফলাফল
          </h2>

          <div className="grid grid-cols-3 gap-2.5">
            {RESULTS.map((r) => (
              <BeforeAfter key={r.week} {...r} />
            ))}
          </div>

          <p className="mt-3 text-center text-[10.5px]" style={{ color: "#6b7a9e" }}>
            * ফলাফল ব্যক্তি ভেদে ভিন্ন হতে পারে
          </p>
        </div>

        {/* ── RIGHT — গ্রাহকরা যা বলেছেন ── */}
        <div className="flex flex-1 flex-col rounded-2xl px-5 py-5" style={{ background: CARD_BG }}>
          <h2 className="mb-4 text-[15px] font-bold" style={{ color: NAVY }}>
            গ্রাহকরা যা বলেছেন
          </h2>

          {reviews.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-3">
                {visible.map((r, i) => {
                  const videoId = getYouTubeId(r.videoUrl);
                  const embedUrl = videoId
                    ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
                    : null;
                  const thumb = videoId
                    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                    : null;
                  const desc = r.videoDescription || r.title;

                  return (
                    <div key={i} className="flex flex-col gap-1.5">
                      {/* Landscape thumbnail — matches ref ratio */}
                      <div
                        className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-[#cdd5e8]"
                        onClick={() =>
                          setPlayingUrl(r.videoUrl === playingUrl ? null : r.videoUrl)
                        }
                      >
                        {playingUrl === r.videoUrl && embedUrl ? (
                          <iframe
                            src={embedUrl}
                            className="h-full w-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        ) : (
                          <>
                            {thumb && (
                              <img
                                src={thumb}
                                alt={r.name}
                                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform group-hover:scale-110">
                                <Play size={13} className="ml-0.5 fill-[#1a2466] text-[#1a2466]" />
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      <p className="text-[11.5px] font-semibold leading-tight" style={{ color: NAVY }}>
                        {r.name}
                      </p>
                      <Stars />
                      {desc && (
                        <p className="text-[10px] leading-snug text-[#5a6488]">
                          {desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

            </>
          ) : (
            <p className="text-[12px]" style={{ color: "#6b7a9e" }}>এখনও কোনো রিভিউ নেই</p>
          )}
        </div>

      </div>

      {/* Button OUTSIDE both cards */}
      {reviews.length > 0 && (
        <div className="mx-auto mt-4 flex max-w-6xl gap-6">
          <div className="flex-1" />
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-2 rounded-full border border-[#1a2466]/25 bg-white px-5 py-2 text-[12px] font-semibold transition-colors hover:bg-[#edf0fb]"
              style={{ color: NAVY }}
            >
              {showAll ? "কম দেখুন" : "আরও রিভিউ দেখুন"}
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
