"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  DropletOff,
  FlaskConical,
  Leaf,
  UserRoundCheck,
} from "lucide-react";
import type { Banner as ServiceBanner } from "@/service/banner.type";

type HeroBanner = Pick<
  ServiceBanner,
  "id" | "title" | "tag" | "description" | "imageUrl" | "device"
> & {
  client?: Pick<ServiceBanner["client"], "color">;
};

type Device = "mobile" | "desktop";

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

const trustItems = [
  {
    Icon: FlaskConical,
    label: "Dermatologically",
    detail: "Inspired",
  },
  {
    Icon: Leaf,
    label: "Transparent",
    detail: "Ingredients",
  },
  {
    Icon: UserRoundCheck,
    label: "Made for",
    detail: "Bangladeshi Skin",
  },
  {
    Icon: DropletOff,
    label: "Alcohol Free",
    detail: "& Fragrance Free",
  },
];

const defaultTag = "Science-Backed Skincare";
const defaultDescription =
  "Target dark spots, uneven tone and repair your skin barrier with DermoQore Serums.";

function ClinicalBadge() {
  return (
    <div className="absolute right-5 top-5 z-20 flex size-20 items-center justify-center rounded-full bg-white text-center text-[8px] font-black leading-[1.35] tracking-[0.14em] text-foreground uppercase shadow-sm ring-1 ring-black/5 sm:right-[9%] sm:top-8 sm:size-24 sm:text-[10px] lg:size-28 lg:text-[11px]">
      <span>
        Clinical
        <br />
        Formulas
        <span className="mx-auto my-1 block h-px w-9 bg-border" />
        Visible
        <br />
        Results
      </span>
    </div>
  );
}

function TrustStrip() {
  return (
    <div className="grid max-w-4xl grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6 lg:gap-10">
      {trustItems.map(({ Icon, label, detail }) => (
        <div key={label} className="flex min-w-0 items-center gap-2.5 text-foreground/75">
          <Icon className="size-6 shrink-0 stroke-[1.6] sm:size-7" aria-hidden="true" />
          <span className="text-[9px] font-semibold leading-tight tracking-[0.02em] sm:text-[10px]">
            {label}
            <br />
            {detail}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");

  // Track viewport so the CMS can serve device-specific (desktop/mobile) images.
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
    <section className="relative w-full overflow-hidden bg-secondary">
      <div className="relative h-[620px] w-full sm:h-[520px] md:h-[560px] lg:h-[600px]">
        {slides.map((banner, i) => {
          const tag = banner.tag?.trim() || defaultTag;
          const description = banner.description?.trim() || defaultDescription;
          const isActive = i === current;

          return (
            <div
              key={banner.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: isActive ? 1 : 0 }}
              aria-hidden={!isActive}
            >
              <Image
                src={banner.imageUrl!}
                alt={banner.title}
                fill
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/5 md:via-background/55" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background/80 to-transparent" />
              <ClinicalBadge />
              <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 py-8 md:px-10 md:py-12 lg:py-14">
                <div className="max-w-xl pt-6 sm:pt-8 lg:pt-2">
                  <span
                    className="text-[11px] font-black tracking-[0.16em] text-muted-foreground uppercase md:text-xs"
                    style={{ color: banner.client?.color }}
                  >
                    {tag}
                  </span>
                  <h2 className="mt-3 max-w-lg whitespace-pre-line text-4xl font-semibold leading-[0.98] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                    {banner.title}
                  </h2>
                  <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-muted-foreground md:text-base">
                    {description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/shop"
                      className="inline-flex h-11 items-center justify-center rounded-[5px] bg-foreground px-8 text-[11px] font-bold tracking-[0.12em] text-background uppercase transition-opacity hover:opacity-80"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href="/skin-quiz"
                      className="inline-flex h-11 items-center justify-center rounded-[5px] border border-foreground/30 bg-background/55 px-8 text-[11px] font-bold tracking-[0.12em] text-foreground uppercase backdrop-blur-sm transition-colors hover:bg-background/90"
                    >
                      Find Your Serum
                    </Link>
                  </div>
                </div>
                <TrustStrip />
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
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
                  i === current ? "w-6 bg-foreground" : "w-2 bg-foreground/35"
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
