"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    quote: "My dark spots have reduced so much! This serum is a game changer.",
    name: "Nusrat Jahan",
    initials: "NJ",
    tone: "bg-[#eac1ae]",
  },
  {
    quote: "Lightweight, non-sticky and works perfectly for my sensitive skin.",
    name: "Fariha Mim",
    initials: "FM",
    tone: "bg-[#d7b59d]",
  },
  {
    quote: "Visible difference in 3 weeks. Will repurchase for sure!",
    name: "Sadiya Islam",
    initials: "SI",
    tone: "bg-[#caa28f]",
  },
  {
    quote: "My skin feels calmer, brighter, and much smoother now.",
    name: "Tahmina Rahman",
    initials: "TR",
    tone: "bg-[#b98f7d]",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#d8a11d]" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-3 fill-current stroke-current" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function ReviewSection() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleReviews = Array.from({ length: 3 }).map((_, offset) => {
    return reviews[(startIndex + offset) % reviews.length];
  });

  const previous = () => {
    setStartIndex((index) => (index - 1 + reviews.length) % reviews.length);
  };

  const next = () => {
    setStartIndex((index) => (index + 1) % reviews.length);
  };

  return (
    <section className="w-full py-8 md:py-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2 className="mb-3 text-center text-sm font-black tracking-[0.18em] text-foreground uppercase md:text-base">
          What Our Customers Say
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous review"
            className="absolute top-1/2 left-0 z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted max-sm:hidden"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <div className="grid gap-4 md:grid-cols-3">
            {visibleReviews.map((review) => (
              <article
                key={review.name}
                className="min-h-[128px] rounded-md border border-border bg-background px-8 py-5 shadow-[0_1px_10px_rgba(0,0,0,0.04)]"
              >
                <Stars />
                <p className="mt-4 text-[13px] font-semibold leading-relaxed text-foreground">
                  &quot;{review.quote}&quot;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${review.tone}`}
                  >
                    {review.initials}
                  </div>
                  <p className="text-xs font-medium text-foreground">- {review.name}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next review"
            className="absolute top-1/2 right-0 z-10 flex size-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted max-sm:hidden"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous review"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-sm"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next review"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-sm"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
