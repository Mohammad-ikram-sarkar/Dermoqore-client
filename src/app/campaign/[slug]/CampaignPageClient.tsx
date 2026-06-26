"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Phone,
  ShoppingCart,
  Star,
  ChevronDown,
  Loader2,
  CheckCheck,
  ArrowRight,
  Leaf,
  Droplets,
  ShieldCheck,
  Sparkles,
  Heart,
  Sun,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import type { Campaign } from "@/service/campaign.service";
import { CampaignService } from "@/service/campaign.service";
import { themeVars } from "@/lib/campaign-theme";
import Features from "@/components/campaign/Features";
import Skin from "@/components/home/Skin";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import IngredientsSection from "@/components/campaign/IngredientsSection";
import SkinConcernsSection from "@/components/campaign/SkinConcernsSection";
import Realface from "@/components/home/Realface";
import IngredientSpotlight from "@/components/home/IngredientSpotlight";
import CampaignRealface from "@/components/campaign/CampaignRealface";
import TrustBadges from "@/components/campaign/TrustBadges";

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? null;
}

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

/**
 * Split a why-section bullet into a FAQ question + answer.
 * Supports three conventions admins may type:
 *   "Q: How long? A: 2 weeks"   →  { question, answer }
 *   "How long?: 2 weeks"         →  { question, answer }
 *   "Just a statement"           →  { question, answer: null }
 */
function splitFaqItem(raw: string): { question: string; answer: string | null } {
  const text = raw.trim();

  // "Q: ... A: ..." style
  const qaMatch = text.match(/^Q[:.]?\s*(.+?)\s*A[:.]?\s*(.+)$/i);
  if (qaMatch) {
    return { question: qaMatch[1].trim(), answer: qaMatch[2].trim() };
  }

  // "Question?: answer" style (ends with ? or :)
  const colon = text.split(/(?<=[?:])\s+/);
  if (colon.length >= 2) {
    return { question: colon[0].trim(), answer: colon.slice(1).join(" ").trim() };
  }

  // No answer — use the text itself as the question heading
  return { question: text, answer: null };
}

/* Icon + color palette used by the Key Benefits cards */
const BENEFIT_ICONS: LucideIcon[] = [Leaf, Droplets, ShieldCheck, Sparkles, Heart, Sun, Flower2];
const BENEFIT_COLORS = [
  { bg: "bg-emerald-100", text: "text-emerald-600" },
  { bg: "bg-sky-100", text: "text-sky-600" },
  { bg: "bg-violet-100", text: "text-violet-600" },
  { bg: "bg-amber-100", text: "text-amber-600" },
  { bg: "bg-rose-100", text: "text-rose-600" },
  { bg: "bg-orange-100", text: "text-orange-600" },
  { bg: "bg-teal-100", text: "text-teal-600" },
];

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

  const ctaText = campaign.ctaText ?? "Order Now";
  const phone = campaign.phoneNumber;
  const videoId = campaign.videoUrl ? getYouTubeId(campaign.videoUrl) : null;

  // capture narrowed, non-empty optional arrays once (so callbacks keep the type)
  const whySections = campaign.whySections?.length ? campaign.whySections : null;
  const faqs = campaign.faqs?.length ? campaign.faqs : null;

  // Theme CSS vars scoped to the wrapper
  const vars = themeVars(campaign.theme);

  return (
    <div className="min-h-screen bg-background text-foreground" style={vars}>
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
                className="flex items-center gap-1.5 rounded-[5px] px-3 py-1.5 text-xs font-semibold text-white"
                style={{ background: "var(--cp, #171717)" }}
              >
                <Phone className="size-3" />
                {phone}
              </a>
            )}
            <button
              onClick={scrollToForm}
              className="rounded-[5px] bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:bg-foreground/90 transition-colors"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero section (full‑width banner like home page) ─────────────────── */}
      <section className="relative w-full overflow-hidden bg-secondary">
        <div className="relative h-[400px] w-full sm:h-[480px] md:h-[520px] lg:h-[550px]">
          <div className="absolute inset-0">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={campaign.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/5 md:via-background/55" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 py-5 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:py-14">
            <div className="max-w-xl">
              {campaign.offerBadge && (
                <span
                  className="inline-flex items-center gap-1 rounded-[5px] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow sm:gap-1.5 sm:px-4 sm:py-1.5 sm:text-xs"
                  style={{ background: "var(--cp, #059669)" }}
                >
                  {campaign.offerBadge}
                </span>
              )}
              <h1 className="mt-1.5 max-w-lg whitespace-pre-line text-2xl font-bold leading-tight text-foreground sm:mt-3 sm:text-4xl md:text-5xl md:leading-[0.98] lg:text-6xl">
                {campaign.title}
              </h1>
              {campaign.subtitle && (
                <p className="mt-2 max-w-md text-[11px] font-medium leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm md:mt-5 md:text-base">
                  {campaign.subtitle}
                </p>
              )}

              {/* Pricing */}
              <div className="mt-3 flex flex-wrap items-baseline gap-1.5 sm:mt-5 sm:gap-3 md:mt-6">
                {comparePrice && (
                  <span className="text-base text-muted-foreground line-through sm:text-xl">
                    {formatPrice(comparePrice)}
                  </span>
                )}
                <span className="text-2xl font-bold text-foreground sm:text-4xl md:text-5xl">
                  {formatPrice(campaignPrice)}
                </span>
                {comparePrice && (
                  <span
                    className="rounded-[5px] px-1.5 py-0.5 text-[10px] font-bold text-white sm:px-3 sm:py-1 sm:text-sm"
                    style={{ background: "var(--cp, #059669)" }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2 sm:mt-5 sm:gap-3 md:mt-6">
                <button
                  onClick={scrollToForm}
                  className="inline-flex h-9 items-center justify-center gap-1 rounded-[5px] bg-foreground px-5 text-[9px] font-bold tracking-[0.12em] text-background uppercase transition-opacity hover:opacity-80 sm:h-11 sm:px-8 sm:text-[11px] sm:gap-2"
                >
                  <ShoppingCart className="size-2.5 sm:size-4" />
                  {ctaText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Dynamic Features section (admin-controlled) ──────────────────────── */}
      {/* {campaign.features && campaign.features.length > 0 && (
        <section className="border-y border-border bg-background py-14">
          <Features features={campaign.features} />
        </section>
      )} */}

      {/* ── What's Your Skin Concern? ─────────────────────────────────────────── */}
      {/* <section className="border-b border-border">
        <Skin />
      </section> */}

      {/* ── Skin Concerns section (face SVG icons) — always shown ───────────── */}
      <section className="border-b border-border bg-background py-12">
        <SkinConcernsSection
          concerns={
            campaign.skinConcerns && campaign.skinConcerns.length > 0
              ? campaign.skinConcerns
              : [
                  { icon: "dark-spots",  label: "রণের পুরানো দাগ" },
                  { icon: "melasma",     label: "কালো ছোপ\n(হাইপারপিগমেন্টেশন)" },
                  { icon: "uneven-tone", label: "Uneven\nSkin Tone" },
                  { icon: "sun-spots",   label: "Sun Spots /\nPigmentation" },
                  { icon: "post-acne",   label: "মেসকা, পড়ার পর\nমুখের দাগ" },
                ]
          }
          heading={campaign.skinConcernsHeading ?? "এই সমস্যাগুলোর কি আপনিও ভুগছেন?"}
        />
      </section>

      {/* ── Ingredient Spotlight ──────────────────────────────────────────── */}
      <IngredientSpotlight />

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

      {/* ── Real Results section ───────────────────────────────────────────── */}
      <CampaignRealface customerReviews={campaign.customerReviews} />

      {/* ── Video section ──────────────────────────────────────────────────── */}
      {videoId && (
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 text-center">
            {campaign.videoTitle && (
              <h2 className="mb-2 text-3xl font-bold tracking-tight">{campaign.videoTitle}</h2>
            )}
            <p className={campaign.videoTitle ? "mb-8 text-sm text-muted-foreground" : "mb-8 hidden"}>
              See it in action
            </p>
            <div className="overflow-hidden rounded-[10px] shadow-xl ring-1 ring-border">
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
                className="inline-flex items-center gap-2 rounded-[5px] px-8 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
                style={{ background: "var(--cp, #171717)" }}
              >
                {ctaText} <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      )}
          {/* ── BTRI Lab Test Report section ──────────────────────────────────── */}
      {campaign.labReportImages && campaign.labReportImages.length > 0 && (
        <section className="py-10 px-4">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-6 rounded-2xl bg-[#eef1fa] px-6 py-8 sm:flex-row sm:items-center sm:gap-10 sm:px-10">

              {/* Left — text */}
              <div className="flex-1 space-y-3">
                <h2 className="text-xl font-bold text-[#1a2466]">
                  {campaign.labReportTitle ?? "BTRI Lab Test Report"}
                </h2>
                {campaign.labReportDescription && (
                  <p className="text-sm leading-relaxed text-[#3a4a7a]">
                    {campaign.labReportDescription}
                  </p>
                )}
                {campaign.labReportButtonUrl ? (
                  <a
                    href={campaign.labReportButtonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[6px] bg-[#1a2466] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-85"
                  >
                    {campaign.labReportButtonText ?? "সম্পূর্ণ রিপোর্ট দেখুন"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-[6px] bg-[#1a2466] px-5 py-2.5 text-sm font-bold text-white">
                    {campaign.labReportButtonText ?? "সম্পূর্ণ রিপোর্ট দেখুন"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                )}
              </div>

              {/* Right — report images + BTRI stamp */}
              <div className="relative flex shrink-0 items-end gap-2 sm:gap-3">
                {campaign.labReportImages.map((url, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-lg border border-white/60 bg-white shadow-md"
                    style={{
                      width: i === 0 ? "90px" : i === 1 ? "80px" : "75px",
                      height: i === 0 ? "118px" : i === 1 ? "108px" : "100px",
                      marginBottom: i === 0 ? "0px" : i === 1 ? "8px" : "16px",
                    }}
                  >
                    <img
                      src={url}
                      alt={`Lab report ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}

                {/* BTRI TESTED stamp — overlaid on last image */}
                <div
                  className="absolute -bottom-2 -right-2 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-[#3a4aaa] bg-white shadow-lg sm:h-[72px] sm:w-[72px]"
                  style={{ rotate: "-12deg" }}
                >
                  <span className="text-[9px] font-extrabold leading-none tracking-wide text-[#1a2466]">BTRI</span>
                  <span className="text-[8px] font-bold leading-none tracking-widest text-[#1a2466]">TESTED</span>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── FAQ + Order Form — side-by-side layout ─────────────────────────── */}
      <section ref={formRef} className="bg-muted/30 py-12 md:py-16" id="order-form">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2 md:items-start">

            {/* ── LEFT: FAQ accordion — driven by campaign.faqs ── */}
            <div className="rounded-[10px] border border-border bg-card shadow-sm overflow-hidden">
              {/* Header */}
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-xl font-bold tracking-tight">সাধারণ কিছু প্রশ্ন</h2>
              </div>

              {faqs && faqs.length > 0 ? (
                <Accordion multiple defaultValue={[]}>
                  {faqs.map((faq, i) => (
                    <AccordionItem
                      key={faq.id ?? i}
                      value={`faq-${i}`}
                      className="border-b border-border last:border-b-0"
                    >
                      <AccordionTrigger className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-foreground hover:bg-muted/20 hover:no-underline transition-colors [&>svg]:hidden">
                        <span className="text-left">{faq.question}</span>
                        <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-lg font-light text-muted-foreground leading-none">
                          +
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5 pt-1">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                /* fallback to whySections if no dedicated faqs yet */
                whySections && whySections.length > 0 ? (
                  <Accordion multiple defaultValue={[]}>
                    {whySections.flatMap((section, si) =>
                      section.items.filter(Boolean).map((item, ii) => {
                        const { question, answer } = splitFaqItem(item);
                        return (
                          <AccordionItem
                            key={`${si}-${ii}`}
                            value={`faq-${si}-${ii}`}
                            className="border-b border-border last:border-b-0"
                          >
                            <AccordionTrigger className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-foreground hover:bg-muted/20 hover:no-underline transition-colors [&>svg]:hidden">
                              <span className="text-left">{question}</span>
                              <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-lg font-light text-muted-foreground leading-none">
                                +
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-5 pt-1">
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {answer ?? item}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })
                    )}
                  </Accordion>
                ) : (
                  <p className="p-5 text-sm text-muted-foreground">কোনো প্রশ্ন পাওয়া যায়নি।</p>
                )
              )}
            </div>

            {/* ── RIGHT: Order form ── */}
            <div>
              <CampaignOrderForm
                campaign={campaign}
                campaignPrice={campaignPrice}
                comparePrice={comparePrice}
                discount={discount}
                ctaText={ctaText}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── What's included ────────────────────────────────────────────────── */}
      {/* {campaign.included && campaign.included.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-center text-3xl font-bold tracking-tight">What&apos;s Included</h2>
            <p className="mb-8 text-center text-sm text-muted-foreground">Everything you get in this pack</p>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <ul className="space-y-3">
                {campaign.included.filter(Boolean).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCheck className="size-5 shrink-0" style={{ color: "var(--cpt, #059669)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )} */}

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
     

      {/* ── Key Benefits section ──────────────────────────────────────────── */}
      {/* {campaign.benefits && campaign.benefits.length > 0 && (
        <section className="py-14 bg-background">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Key Benefits</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Why customers love this product
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(campaign.benefits ?? []).map((b, i) => {
                const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                const color = BENEFIT_COLORS[i % BENEFIT_COLORS.length];
                return (
                  <div
                    key={i}
                    className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${color.bg}`}>
                      <Icon className={`size-6 ${color.text}`} />
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{b}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )} */}
      {/* ── Dynamic Ingredients section (admin-controlled) ──────────────────── */}
      {campaign.ingredients && campaign.ingredients.length > 0 && (
        <IngredientsSection ingredients={campaign.ingredients} />
      )}
     
  
      <TrustBadges />


      <div className="mb-[-70px]" style={{ background: "#1a2466" }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">

          {/* Product image */}
          {(campaign.heroImages[0]?.url ?? campaign.product.images[0]?.url) && (
            <img
              src={campaign.heroImages[0]?.url ?? campaign.product.images[0]!.url}
              alt={campaign.product.name}
              className="h-12 w-10 shrink-0 rounded object-cover sm:h-14 sm:w-12"
            />
          )}

          {/* Product name + subtitle */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white sm:text-sm">
              {campaign.product.name}
            </p>
            <p className="truncate text-[10px] text-white/60 sm:text-xs">
              {campaign.subtitle ?? "Science Based Formula | BTRI Lab Tested"}
            </p>
          </div>

          {/* Price block */}
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-lg font-extrabold text-white sm:text-xl">
              {formatPrice(campaignPrice)}
            </span>
            {comparePrice && (
              <>
                <span className="text-xs text-white/50 line-through sm:text-sm">
                  {formatPrice(comparePrice)}
                </span>
                {discount > 0 && (
                  <span className="rounded-[4px] bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {discount}% ছাড়
                  </span>
                )}
              </>
            )}
          </div>

          {/* CTA button */}
          <button
            onClick={scrollToForm}
            className="ml-2 flex shrink-0 items-center gap-1.5 rounded-[5px] bg-white px-3 py-2.5 text-[11px] font-bold text-[#1a2466] transition-opacity hover:opacity-90 sm:px-5 sm:text-xs"
          >
            <ShoppingCart className="size-3.5 sm:size-4" />
            <span className="hidden sm:inline">অর্ডার করুন এখনই</span>
            <span className="sm:hidden">অর্ডার করুন</span>
          </button>

        </div>
      </div>

      {/* spacer so page content isn't hidden behind the sticky bar */}
      <div className="h-16" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Testimonials Section                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

const INITIAL_VISIBLE = 3;

type Testimonial = NonNullable<Campaign["testimonials"]>[number];

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [showAll, setShowAll] = useState(false);
  const hasMore = testimonials.length > INITIAL_VISIBLE;
  const visible = showAll ? testimonials : testimonials.slice(0, INITIAL_VISIBLE);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="mt-2 text-sm text-muted-foreground">Real reviews from verified buyers</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {visible.map((t, i) => (
            <div
              key={i}
              className="rounded-[5px] border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-border pt-3">
                <div className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "var(--cp, #171717)" }}>
                  {t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-2 rounded-[5px] border border-border bg-background px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              {showAll ? (
                <>Show Less</>
              ) : (
                <>
                  Show All {testimonials.length} Reviews
                  <ChevronDown className="size-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Order Form Component — matches the screenshot design exactly                */
/* ─────────────────────────────────────────────────────────────────────────── */

function CampaignOrderForm({
  campaign,
  campaignPrice,
  comparePrice,
  discount,
  ctaText,
}: {
  campaign: Campaign;
  campaignPrice: number;
  comparePrice: number | null;
  discount: number;
  ctaText: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zone, setZone] = useState<"INSIDE_DHAKA" | "OUTSIDE_DHAKA">("OUTSIDE_DHAKA");
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
      });
      setOrderNumber(result?.orderNumber ?? null);
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Order failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success state ── */
  if (success) {
    return (
      <div className="rounded-[10px] border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="size-8 text-emerald-500" />
        </div>
        <h3 className="mb-2 text-xl font-bold">অর্ডার সফলভাবে হয়েছে!</h3>
        {orderNumber && (
          <p className="mb-2 text-sm text-muted-foreground">
            অর্ডার নম্বর:{" "}
            <span className="font-mono font-semibold text-foreground">{orderNumber}</span>
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। ধন্যবাদ!
        </p>
        {campaign.phoneNumber && (
          <p className="mt-4 text-sm">
            যোগাযোগ:{" "}
            <a href={`tel:${campaign.phoneNumber}`} className="font-semibold hover:underline">
              {campaign.phoneNumber}
            </a>
          </p>
        )}
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="rounded-[10px] border border-border bg-card shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="border-b border-border bg-muted/20 px-5 py-4">
        <h2 className="text-lg font-bold tracking-tight">অর্ডার করতে ফর্মটি পূরণ করুন</h2>
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-5 space-y-3">

        {/* ── Price strip ── */}
        <div className="flex flex-wrap items-center gap-2 rounded-[6px] bg-muted/30 px-4 py-2.5 text-sm">
          {comparePrice && (
            <span className="text-muted-foreground">
              Regular Price:{" "}
              <span className="font-semibold line-through text-red-500">
                {formatPrice(comparePrice)}
              </span>
            </span>
          )}
          <span className="text-muted-foreground">
            Offer Price:{" "}
            <span className="font-bold text-green-600">{formatPrice(campaignPrice)}</span>
          </span>
          {discount > 0 && (
            <span className="rounded-[4px] bg-blue-600 px-2 py-0.5 text-[11px] font-bold text-white">
              {discount}% ছাড়
            </span>
          )}
        </div>

        {error && (
          <div className="rounded-[6px] border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* ── Name input ── */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম"
            className="h-11 w-full rounded-[6px] border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* ── Phone input ── */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.1 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.72 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.36 1.85.6 2.81.72A2 2 0 0 1 22 17z"/>
            </svg>
          </span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="মোবাইল নাম্বার"
            className="h-11 w-full rounded-[6px] border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* ── Address input ── */}
        <div className="relative">
          <span className="pointer-events-none absolute top-3 left-3 text-muted-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21C12 21 5 13.5 5 8.5a7 7 0 0 1 14 0C19 13.5 12 21 12 21z"/><circle cx="12" cy="8.5" r="2.5"/>
            </svg>
          </span>
          <textarea
            required
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="পূর্ণ ঠিকানা (বাড়ি, রোড, এলাকা)"
            className="w-full rounded-[6px] border border-input bg-background pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        {/* ── Quantity select ── */}
        <div className="relative">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="h-11 w-full appearance-none rounded-[6px] border border-input bg-background px-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n}টি পিস
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
            <ChevronDown className="size-4" />
          </span>
        </div>

        {/* ── Delivery zone ── */}
        <div className="grid grid-cols-2 gap-2">
          {(["INSIDE_DHAKA", "OUTSIDE_DHAKA"] as const).map((z) => (
            <label
              key={z}
              className={`flex cursor-pointer items-center gap-2 rounded-[6px] border px-3 py-2.5 text-xs font-medium transition-colors ${
                zone === z
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-border bg-background text-muted-foreground hover:bg-muted/30"
              }`}
            >
              <input
                type="radio"
                name="zone"
                checked={zone === z}
                onChange={() => setZone(z)}
                className="hidden"
              />
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${zone === z ? "border-blue-500" : "border-muted-foreground"}`}>
                {zone === z && <span className="h-2 w-2 rounded-full bg-blue-500" />}
              </span>
              <span>
                {z === "INSIDE_DHAKA" ? "ঢাকার ভেতরে" : "ঢাকার বাইরে"}
              </span>
            </label>
          ))}
        </div>

        {/* ── Fee rows ── */}
        <div className="space-y-2 rounded-[6px] bg-muted/20 px-4 py-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
            <span className="font-semibold">৳{shipping}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="font-bold">মোট পরিশোধযোগ্য</span>
            <span className="text-lg font-extrabold">৳{total.toLocaleString("en-BD")}</span>
          </div>
        </div>

        {/* ── Submit button ── */}
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-blue-600 py-3.5 text-sm font-bold text-white shadow transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <><Loader2 className="size-5 animate-spin" /> অপেক্ষা করুন...</>
          ) : (
            <><ShoppingCart className="size-5" /> অর্ডার কনফার্ম করুন</>
          )}
        </button>

        {/* ── Trust line ── */}
        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          আপনার তথ্য ১০০% সুরক্ষিত এবং গোপন রাখা হবে
        </p>

      </form>
    </div>
  );
}
