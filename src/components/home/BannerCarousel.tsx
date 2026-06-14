"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/service/banner.type";

interface BannerCarouselProps {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? banners.length - 1 : c - 1)),
    [banners.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c === banners.length - 1 ? 0 : c + 1)),
    [banners.length],
  );

  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [banners.length, next]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[200px] w-full sm:h-[400px] md:h-[300px] lg:h-[400px]">
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={banner.imageUrl!}
              alt={banner.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-12 lg:p-16">
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider md:text-sm"
                style={{ backgroundColor: banner.client.color }}
              >
                {banner.tag}
              </span>
              <h2 className="mt-3 text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {banner.title}
              </h2>
              {banner.description && (
                <p className="mt-2 max-w-xl text-sm text-white/80 md:text-base lg:text-lg">
                  {banner.description}
                </p>
              )}
              {/* CTA buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-lg bg-foreground px-7 py-3 text-[11px] font-semibold tracking-widest text-background uppercase transition-opacity hover:opacity-80"
                >
                  Shop Now
                </Link>
                <Link
                  href="/skin-quiz"
                  className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/10 px-7 py-3 text-[11px] font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Find Your Serum
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
