"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, ShoppingCart, Star, ChevronDown, Loader2, CheckCheck, ArrowRight } from "lucide-react";
import type { Campaign } from "@/service/campaign.service";
import { CampaignService } from "@/service/campaign.service";

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? null;
}

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

interface Props {
  campaign: Campaign;
}

export default function CampaignPageClient({ campaign }: Props) {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const campaignPrice = campaign.campaignPrice
    ? Number(campaign.campaignPrice)
    : Number(campaign.product.price);
  const comparePrice = campaign.comparePrice
    ? Number(campaign.comparePrice)
    : campaign.product.comparePrice
    ? Number(campaign.product.comparePrice)
    : null;

  const discount = comparePrice
    ? Math.round(((comparePrice - campaignPrice) / comparePrice) * 100)
    : 0;

  const primaryImage =
    campaign.heroImages[0]?.url ??
    campaign.product.images.find((i) => i.isPrimary)?.url ??
    campaign.product.images[0]?.url;

  const ctaText = campaign.ctaText ?? "অর্ডার করুন";
  const phone = campaign.phoneNumber;
  const videoId = campaign.videoUrl ? getYouTubeId(campaign.videoUrl) : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top header bar ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-foreground text-background text-[10px] font-bold tracking-widest">
              DQ
            </div>
            <span className="font-semibold tracking-tight">Dermoqore</span>
          </Link>
          <div className="flex items-center gap-3">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                <Phone className="size-3" />
                {phone}
              </a>
            )}
            <button
              onClick={scrollToForm}
              className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:bg-foreground/90 transition-colors"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero section ───────────────────────────────────────────────────── */}
      <section className="bg-background py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Left — image */}
            <div className="flex justify-center">
              {primaryImage ? (
                <img
                  src={primaryImage}
                  alt={campaign.title}
                  className="max-h-[420px] w-full max-w-sm rounded-2xl object-cover shadow-xl"
                />
              ) : (
                <div className="flex h-80 w-full max-w-sm items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            {/* Right — info */}
            <div className="space-y-5">
              {campaign.offerBadge && (
                <span className="inline-block rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-destructive">
                  {campaign.offerBadge}
                </span>
              )}
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">{campaign.title}</h1>
              {campaign.subtitle && (
                <p className="text-base text-muted-foreground">{campaign.subtitle}</p>
              )}

              {/* Pricing */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-foreground">{formatPrice(campaignPrice)}</span>
                {comparePrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(comparePrice)}</span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm font-bold text-emerald-700">
                      {discount}% ছাড়
                    </span>
                  </>
                )}
              </div>

              {/* Benefits list */}
              {campaign.benefits && campaign.benefits.length > 0 && (
                <ul className="space-y-2">
                  {campaign.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToForm}
                  className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-bold text-background shadow-lg hover:bg-foreground/90 transition-colors"
                >
                  <ShoppingCart className="size-4" />
                  {ctaText}
                </button>
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold hover:bg-muted transition-colors"
                  >
                    <Phone className="size-4" />
                    {phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero image gallery (additional images) ─────────────────────────── */}
      {campaign.heroImages.length > 1 && (
        <section className="bg-muted/30 py-8">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {campaign.heroImages.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={img.alt ?? campaign.title}
                  className="aspect-square w-full rounded-xl object-cover shadow"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Video section ──────────────────────────────────────────────────── */}
      {videoId && (
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4 text-center">
            {campaign.videoTitle && (
              <h2 className="mb-6 text-2xl font-bold">{campaign.videoTitle}</h2>
            )}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={campaign.videoTitle ?? campaign.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-8 py-3.5 text-sm font-bold text-background hover:bg-foreground/90 transition-colors"
              >
                {ctaText} <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Why sections ───────────────────────────────────────────────────── */}
      {campaign.whySections && campaign.whySections.length > 0 && (
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-6xl px-4">
            {campaign.whySections.map((section, si) => (
              <div key={si} className="mb-10 last:mb-0">
                {section.heading && (
                  <h2 className="mb-6 text-center text-2xl font-bold">{section.heading}</h2>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  {section.items.filter(Boolean).map((item, ii) => (
                    <div
                      key={ii}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-8 text-center">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-8 py-3.5 text-sm font-bold text-background hover:bg-foreground/90 transition-colors"
              >
                {ctaText} <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── What's included ────────────────────────────────────────────────── */}
      {campaign.included && campaign.included.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-6 text-center text-2xl font-bold">এই প্যাকেজে যা পাচ্ছেন</h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <ul className="space-y-3">
                {campaign.included.filter(Boolean).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCheck className="size-5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── Phone bar ──────────────────────────────────────────────────────── */}
      {phone && (
        <section className="bg-foreground py-6">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="mb-2 text-sm font-medium text-background/80">
              যেকোনো সমস্যায় কল করুন — ২৪/৭ সাপোর্ট
            </p>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 text-2xl font-bold text-background hover:underline"
            >
              <Phone className="size-5" />
              {phone}
            </a>
          </div>
        </section>
      )}

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      {campaign.testimonials && campaign.testimonials.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">আমাদের গ্রাহকদের অভিজ্ঞতা</h2>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {campaign.testimonials.map((t, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Offer strip ────────────────────────────────────────────────────── */}
      <section className="bg-muted/40 py-10">
        <div className="mx-auto max-w-3xl px-4 text-center">
          {campaign.offerBadge && (
            <span className="mb-3 inline-block rounded-full bg-destructive/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-destructive">
              {campaign.offerBadge}
            </span>
          )}
          <div className="mt-2 flex flex-wrap items-baseline justify-center gap-3">
            <span className="text-6xl font-extrabold">{formatPrice(campaignPrice)}</span>
            {comparePrice && (
              <span className="text-xl text-muted-foreground line-through">{formatPrice(comparePrice)}</span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            + ডেলিভারি চার্জ: ঢাকায় ৳৬০ | ঢাকার বাইরে ৳১২০
          </p>
          <button
            onClick={scrollToForm}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-foreground px-10 py-4 text-base font-bold text-background shadow-lg hover:bg-foreground/90 transition-colors"
          >
            <ShoppingCart className="size-5" />
            {ctaText}
          </button>
          {phone && (
            <p className="mt-4 text-sm text-muted-foreground">
              অথবা কল করুন:{" "}
              <a href={`tel:${phone}`} className="font-semibold text-foreground hover:underline">
                {phone}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* ── Order form ─────────────────────────────────────────────────────── */}
      <section ref={formRef} className="py-12" id="order-form">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">
            {campaign.formTitle ?? "এখনই অর্ডার করুন"}
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            নিচের ফর্মটি পূরণ করুন — আমরা আপনার সাথে যোগাযোগ করব
          </p>
          <CampaignOrderForm campaign={campaign} campaignPrice={campaignPrice} ctaText={ctaText} />
        </div>
      </section>

      {/* ── Mini footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <Link href="/" className="mb-3 inline-flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-foreground text-background text-[9px] font-bold tracking-widest">
              DQ
            </div>
            <span className="text-sm font-semibold">Dermoqore</span>
          </Link>
          <p className="text-xs text-muted-foreground">
            বাংলাদেশে ডেলিভারি | ৭ দিনের রিটার্ন পলিসি | ১০০% অরিজিনাল পণ্য
          </p>
          {phone && (
            <p className="mt-2 text-xs text-muted-foreground">
              সাপোর্ট:{" "}
              <a href={`tel:${phone}`} className="font-medium text-foreground">{phone}</a>
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Order Form Component                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

function CampaignOrderForm({
  campaign,
  campaignPrice,
  ctaText,
}: {
  campaign: Campaign;
  campaignPrice: number;
  ctaText: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zone, setZone] = useState<"INSIDE_DHAKA" | "OUTSIDE_DHAKA">("OUTSIDE_DHAKA");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const shipping = zone === "INSIDE_DHAKA" ? 60 : 120;
  const subtotal = campaignPrice * quantity;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result: any = await CampaignService.placeOrder(campaign.slug, {
        campaignId: campaign.id,
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        deliveryZone: zone,
        quantity,
        notes: notes || undefined,
      });
      setOrderNumber(result?.orderNumber ?? null);
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "অর্ডার ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="size-8 text-emerald-600" />
        </div>
        <h3 className="mb-2 text-xl font-bold">অর্ডার সফলভাবে হয়েছে!</h3>
        {orderNumber && (
          <p className="mb-2 text-sm text-muted-foreground">
            অর্ডার নম্বর: <span className="font-mono font-semibold text-foreground">{orderNumber}</span>
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। ধন্যবাদ!
        </p>
        {campaign.phoneNumber && (
          <p className="mt-4 text-sm">
            যোগাযোগ করুন:{" "}
            <a href={`tel:${campaign.phoneNumber}`} className="font-semibold hover:underline">
              {campaign.phoneNumber}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Product summary */}
      <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
        {campaign.product.images[0]?.url && (
          <img
            src={campaign.heroImages[0]?.url ?? campaign.product.images[0].url}
            alt={campaign.product.name}
            className="size-16 rounded-lg object-cover"
          />
        )}
        <div>
          <p className="font-semibold">{campaign.product.name}</p>
          <p className="text-lg font-bold">{formatPrice(campaignPrice)}</p>
        </div>
      </div>

      {/* Quantity */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          পরিমাণ
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-xl font-bold hover:bg-muted transition-colors"
          >
            −
          </button>
          <span className="w-12 text-center text-lg font-bold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-xl font-bold hover:bg-muted transition-colors"
          >
            +
          </button>
          <span className="ml-2 text-sm text-muted-foreground">× {formatPrice(campaignPrice)} = {formatPrice(subtotal)}</span>
        </div>
      </div>

      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          আপনার নাম *
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="পূর্ণ নাম লিখুন"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          মোবাইল নম্বর *
        </label>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="01XXXXXXXXX"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          ঠিকানা *
        </label>
        <textarea
          required
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="বাড়ি / রোড / এলাকা / জেলা"
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      {/* Delivery zone */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          ডেলিভারি
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["INSIDE_DHAKA", "OUTSIDE_DHAKA"] as const).map((z) => (
            <button
              key={z}
              type="button"
              onClick={() => setZone(z)}
              className={`flex flex-col rounded-xl border p-3 text-left transition-colors ${
                zone === z
                  ? "border-foreground bg-muted"
                  : "border-border bg-background hover:bg-muted/50"
              }`}
            >
              <span className="text-sm font-semibold">
                {z === "INSIDE_DHAKA" ? "ঢাকার ভেতরে" : "ঢাকার বাইরে"}
              </span>
              <span className="text-xs text-muted-foreground">
                ডেলিভারি: ৳{z === "INSIDE_DHAKA" ? "৬০" : "১২০"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          বিশেষ নোট (ঐচ্ছিক)
        </label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Order summary */}
      <div className="rounded-xl bg-muted/40 p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">পণ্যের মূল্য ({quantity}টি)</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
          <span className="font-semibold">{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-base">
          <span className="font-bold">মোট</span>
          <span className="font-extrabold">{formatPrice(total)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-4 text-base font-bold text-background shadow-lg hover:bg-foreground/90 transition-colors disabled:opacity-60"
      >
        {submitting ? (
          <><Loader2 className="size-5 animate-spin" /> অপেক্ষা করুন...</>
        ) : (
          <><ShoppingCart className="size-5" /> {ctaText}</>
        )}
      </button>
    </form>
  );
}
