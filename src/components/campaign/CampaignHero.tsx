"use client";

import { ShoppingCart, FlaskConical, Microscope, Leaf, BadgeCheck } from "lucide-react";
import type { Campaign } from "@/service/campaign.service";
import { TrustBadgeStrip } from "@/components/campaign/TrustBadgeStrip";

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
    <section className="w-full bg-secondary">
      <div className="mx-auto grid min-h-[550px] max-w-[1400px] grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex items-center px-6 py-10 md:px-10 lg:px-14">
          <div className="max-w-xl">
            {campaign.offerBadge && (
              <span
                className="inline-flex items-center gap-1 rounded-[5px] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow"
                style={{ background: "var(--cp, #059669)" }}
              >
                {campaign.offerBadge}
              </span>
            )}

            <h1 className="mt-4 whitespace-pre-line text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {campaign.title}
            </h1>

            {campaign.subtitle && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {campaign.subtitle}
              </p>
            )}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
  {[
    { icon: FlaskConical, label: "Lab Tested" },
    { icon: Microscope, label: "Science Based Formula" },
    { icon: Leaf, label: "Fragrance Free" },
    { icon: BadgeCheck, label: "Made in Bangladesh" },
  ].map((item) => {
    const Icon = item.icon;

    return (
      <div key={item.label} className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
          <Icon className="h-5 w-5 text-primary" />
        </div>

        <span className="text-xs font-medium leading-tight text-foreground md:text-sm">
          {item.label}
        </span>
      </div>
    );
  })}
</div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              {comparePrice && (
                <span className="text-lg text-muted-foreground line-through md:text-xl">
                  {formatPrice(comparePrice)}
                </span>
              )}

              <span className="text-3xl font-bold text-foreground md:text-5xl">
                {formatPrice(campaignPrice)}
              </span>

              {comparePrice && (
                <span
                  className="rounded-[5px] px-3 py-1 text-xs font-bold text-white sm:text-sm"
                  style={{ background: "var(--cp, #059669)" }}
                >
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={scrollToForm}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[5px] bg-foreground px-8 text-xs font-bold uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-80"
              >
                <ShoppingCart className="size-4" />
                {ctaText}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FULL HEIGHT IMAGE */}
        <div className="h-[320px] md:h-full">
          {primaryImage && (
            <img
              src={primaryImage}
              alt={campaign.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      <TrustBadgeStrip />
    </section>
  );
}
