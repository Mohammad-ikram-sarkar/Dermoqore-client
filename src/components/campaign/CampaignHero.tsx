"use client";

import {
  ShoppingCart,
  FlaskConical,
  Microscope,
  Wind,
  BadgeCheck,
  ShieldCheck,
  Droplet,
  Banknote,
  Truck,
} from "lucide-react";
import type { Campaign } from "@/service/campaign.service";

const NAVY = "#1a2466";

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

interface Props {
  campaign: Campaign;
  comparePrice: number | null;
  campaignPrice: number;
  discount: number;
  ctaText: string;
  primaryImage: string;
  scrollToForm: () => void;
}

/* Static trust signals shown under the product name */
const TRUST_ICONS = [
  { icon: FlaskConical, label: "BTRI Lab\nLab Tested" },
  { icon: Microscope, label: "Science Based\nFormula" },
  { icon: Wind, label: "Fragrance\nFree" },
  { icon: BadgeCheck, label: "Made in\nBangladesh" },
];

/* Static delivery assurances shown under the CTA */
const DELIVERY_ITEMS = [
  { icon: Banknote, label: "Cash on Delivery" },
  { icon: Truck, label: "সারা বাংলাদেশে ডেলিভারি" },
  { icon: ShieldCheck, label: "সুরক্ষিত পেমেন্ট" },
];

export default function CampaignHero({
  campaign,
  comparePrice,
  campaignPrice,
  discount,
  ctaText,
  primaryImage,
  scrollToForm,
}: Props) {
  return (
    <section className="w-full bg-gradient-to-br from-[#FBF9F8] via-[#FBF9F8] to-[#FBF9F8]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-0 px-4 sm:px-6 md:grid-cols-2 md:min-h-130">
        {/* LEFT SIDE */}
        <div className="order-2 flex flex-col justify-center pb-10 md:order-1 md:pb-14">
          {/* Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-[#c7d4ec] bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide"
              style={{ color: NAVY }}
            >
              <ShieldCheck className="size-3.5 text-[#1A6FC0]" /> <p className="text-[#1A6FC0]">BTRI Lab Tested</p>
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-[#c7d4ec] bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide"
              style={{ color: NAVY }}
            >
              <Droplet className="size-3.5" /> Fragrance Free
            </span>
          </div>

          {/* Static heading */}
          <h1
            className="mt-4 text-2xl font-extrabold leading-[1.18] tracking-tight sm:text-3xl md:text-[2.1rem] lg:text-[2.5rem]"
            style={{ color: NAVY }}
          >
            দাগ-ছোপ, ব্রণের দাগ ও<br />
            Uneven Skin Tone কমাতে<br />
            বিজ্ঞানভিত্তিক সমাধান
          </h1>

          {/* Dynamic product name — colored blue like ref */}
          <p className="mt-3 text-base font-semibold sm:text-lg" style={{ color: "#1a6ab5" }}>
            {campaign.product.name}
          </p>

          {/* Trust icons */}
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
            {TRUST_ICONS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/70 ring-1 ring-[#c7d4ec]">
                  <Icon className="size-4" style={{ color: NAVY }} />
                </span>
                <span
                  className="whitespace-pre-line text-[10.5px] font-medium leading-tight"
                  style={{ color: "#33407e" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {comparePrice && (
              <span className="text-base font-medium text-rose-500 line-through sm:text-lg">
                {formatPrice(comparePrice)}
              </span>
            )}
            <span className="text-3xl font-extrabold sm:text-4xl" style={{ color: NAVY }}>
              {formatPrice(campaignPrice)}
            </span>
            {comparePrice && discount > 0 && (
              <span className="rounded-[5px] bg-[#2563eb] px-2 py-1 text-xs font-bold text-white">
                {discount}% ছাড়
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={scrollToForm}
            className="mt-5 flex w-full max-w-md items-center justify-center gap-2 rounded-[6px] py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ background: NAVY }}
          >
            <ShoppingCart className="size-4" />
            {ctaText}
          </button>

          {/* Delivery assurances */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {DELIVERY_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[#5a6488]">
                <Icon className="size-4 shrink-0" style={{ color: NAVY }} />
                <span className="text-[11px] font-medium sm:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — banner image (single, from admin) */}
        <div className="order-1 relative min-h-72 sm:max-h-full md:order-2 md:min-h-0 mb-12">
          {primaryImage && (
            <img
              src={primaryImage}
              alt={campaign.product.name}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
        </div>
      </div>
    </section>
  );
}
