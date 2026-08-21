"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import type { Banner as ServiceBanner } from "@/service/banner.type";

type HeroBanner = Pick<
  ServiceBanner,
  "id" | "title" | "tag" | "description" | "imageUrl" | "device"
> & {
  client?: Pick<ServiceBanner["client"], "color">;
};

type Device = "mobile" | "desktop";

// Matches the admin banner preview background.
const BANNER_BG = "#F5EDE3";

const TRUST_POINTS = ["Dermatologically Inspired", "Transparent Ingredients", "Alcohol Free"];

const defaultTag = "Science-Backed Skincare";
const defaultDescription =
  "Target dark spots, uneven tone and repair your skin barrier with DermoQore Serums.";

/**
 * Picks the banner set for a given viewport. The CMS can ship separate
 * `device` images (e.g. a cropped portrait for phones, a wide hero for desktop).
 * Falls back gracefully when only one variant exists.
 */
function pickDeviceBanners(banners: HeroBanner[], device: Device): HeroBanner[] {
  if (banners.length <= 1) return banners;

  const byDevice = (d: Device) => banners.filter((b) => b.device === d);
  const primary = byDevice(device);
  if (primary.length > 0) return primary;

  // No variant for this device — use the opposite one as a fallback.
  const other = byDevice(device === "mobile" ? "desktop" : "mobile");
  return other.length > 0 ? other : banners;
}

interface BannerCarouselProps {
  banners: HeroBanner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");

  // Track viewport so the CMS can serve device-specific (desktop/mobile) images
  // and the layout can mirror the admin preview's desktop/mobile framing.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setDevice(mql.matches ? "mobile" : "desktop");
      setCurrent(0);
    };
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const slides = pickDeviceBanners(banners, device);
  const isMobile = device === "mobile";

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)),
    [slides.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)),
    [slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [slides.length, next]);

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: BANNER_BG }}>
      <div className="relative h-[440px] w-full sm:h-[480px] md:h-[520px] lg:h-[580px]">
        {slides.map((banner, i) => {
          const tag = banner.tag?.trim() || defaultTag;
          const description = banner.description?.trim() || defaultDescription;
          const isActive = i === current;

          return (
            <div
              key={banner.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: isActive ? 1 : 0, backgroundColor: BANNER_BG }}
              aria-hidden={!isActive}
            >
              <Image
                src={banner.imageUrl!}
                alt={banner.title}
                fill
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />

              <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between p-6 md:px-10 md:py-16 ">
                {/* Headline + CTAs */}
                <div className="flex items-start justify-between gap-6">
                  <div className={isMobile ? "max-w-[210px]" : "max-w-xl"}>
                    <p className="text-[9px] tracking-[0.2em] text-stone-500 uppercase md:text-[10px]">
                      {tag}
                    </p>
                    <h2
                      className={`mt-3 font-semibold leading-[1.05] text-stone-800 ${
                        isMobile ? "text-[18px]" : "text-4xl md:text-5xl"
                      }`}
                    >
                      {banner.title}
                    </h2>
                    <p className="mt-3 text-[11px] leading-relaxed text-stone-500 md:text-[13px]">
                      {description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href="/shop"
                        className="inline-flex items-center justify-center bg-stone-900 px-4 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-opacity hover:opacity-80 md:px-7 md:py-3 md:text-[11px]"
                      >
                        Shop Now
                      </Link>
                      <Link
                        href="/skin-quiz"
                        className="inline-flex items-center justify-center border border-stone-400 px-4 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-stone-700 uppercase transition-colors hover:bg-stone-900/5 md:px-7 md:py-3 md:text-[11px]"
                      >
                        Find Your Serum
                      </Link>
                    </div>
                  </div>

                  {/* Desktop-only clinical tag (mirrors admin preview) */}
                  {!isMobile && (
                    <div className="hidden text-right md:block">
                      <p className="text-[9px] tracking-[0.15em] text-stone-400 uppercase">
                        Clinical Formulas
                      </p>
                      <p className="text-[9px] tracking-[0.15em] text-stone-400 uppercase">
                        Visible Results
                      </p>
                    </div>
                  )}
                </div>

                {/* Desktop-only trust strip (mirrors admin preview) */}
                {!isMobile && (
                  <div className="flex flex-wrap gap-5">
                    {TRUST_POINTS.map((point) => (
                      <div key={point} className="flex items-center gap-1.5 text-stone-500">
                        <Check className="size-3.5" strokeWidth={2} />
                        <span className="text-[11px]">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/70 p-2 text-stone-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/70 p-2 text-stone-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-5 right-6 z-30 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-stone-800" : "w-2 bg-stone-400"
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
