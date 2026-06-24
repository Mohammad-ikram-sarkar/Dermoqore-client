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
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { Campaign } from "@/service/campaign.service";
import { CampaignService } from "@/service/campaign.service";
import Features from "@/components/campaign/Features";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import IngredientsSection from "@/components/campaign/IngredientsSection";

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
  const benefits = campaign.benefits?.length ? campaign.benefits : null;

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
                className="flex items-center gap-1.5 rounded-[5px] bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
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

      {/* ── Hero section ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden ">
        {/* decorative blurred blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 \ blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 size-80 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Left — text */}
            <div className="space-y-6 md:order-1 order-2">
              {campaign.offerBadge && (
                <span className="inline-flex items-center gap-1.5 rounded-[5px] bg-emerald-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow">
                
                  {campaign.offerBadge}
                </span>
              )}
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
                {campaign.title}
              </h1>
              {campaign.subtitle && (
                <p className="max-w-md text-lg text-muted-foreground">{campaign.subtitle}</p>
              )}

              {/* Star rating */}
              {/* <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  4.9 (2,500+ happy customers)
                </span>
              </div> */}

              {/* Pricing */}
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-5xl font-extrabold text-foreground">
                  {formatPrice(campaignPrice)}
                </span>
                {comparePrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(comparePrice)}
                    </span>
                    <span className="rounded-[5px] bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToForm}
                  className="flex items-center justify-center gap-2 rounded-[10px] bg-foreground px-8 py-2 text-base font-bold text-background shadow-xl transition-all hover:scale-[1.02] hover:bg-foreground/90"
                >
                  <ShoppingCart className="size-5" />
                  {ctaText}
                </button>
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 rounded-[10px] border-2 border-foreground/15 bg-background/60 px-6 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-muted"
                  >
                    <Phone className="size-4" />
                    {phone}
                  </a>
                )}
              </div>
            </div>

            {/* Right — image */}
            <div className="relative md:order-2 order-1">
              <div className="relative mx-auto flex max-w-md justify-center">
                {/* glow behind product */}
                <div className="absolute inset-0 m-auto size-72 rounded-full blur-2xl" />
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt={campaign.title}
                    className="relative max-h-[500px]   w-full rounded-[10px] object-cover shadow-2xl"
                  />
                ) : (
                  <div className="relative flex h-80 w-full items-center justify-center rounded-3xl bg-muted text-muted-foreground">
                    No image
                  </div>
                )}

                {/* floating discount badge */}
                {/* {discount > 0 && (
                  <div className="absolute -right-3 -top-3 flex size-20 flex-col items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg md:-right-4 md:-top-4">
                    <span className="text-lg font-extrabold leading-none">{discount}%</span>
                    <span className="text-[10px] font-bold uppercase">OFF</span>
                    <span className="text-[9px] font-medium opacity-80">Today</span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Benefits section ──────────────────────────────────────────── */}
         
      {campaign.benefits && campaign.benefits.length > 0 && (
        <section className="border-y border-border bg-background py-14">
          <Features/>
          
        </section>
      )}

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
                className="inline-flex items-center gap-2 rounded-[5px] bg-foreground px-8 py-2 text-sm font-bold text-background shadow-lg transition-all hover:scale-[1.02] hover:bg-foreground/90"
              >
                {ctaText} <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Why sections (FAQ accordion) ───────────────────────────────────── */}
      {whySections && (
        <section className="bg-muted/30 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                <HelpCircle className="size-3.5" />
                FAQ
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                {whySections.length > 1
                  ? "Questions & Answers"
                  : whySections[0]?.heading ?? "Frequently Asked Questions"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Everything you need to know before you order
              </p>
            </div>

            <div className="space-y-8">
              {whySections.map((section, si) => {
                const items = section.items.filter(Boolean);
                if (items.length === 0) return null;
                return (
                  <div key={si} className="rounded-[10px] border border-border bg-card px-5 shadow-sm">
                    {whySections.length > 1 && section.heading && (
                      <h3 className="border-b border-border py-4 text-sm font-bold uppercase tracking-wide text-foreground">
                        {section.heading}
                      </h3>
                    )}
                    <Accordion multiple defaultValue={["why-0-0"]}>
                      {items.map((item, ii) => {
                        const { question, answer } = splitFaqItem(item);
                        return (
                          <AccordionItem key={ii} value={`why-${si}-${ii}`}>
                            <AccordionTrigger className="items-center py-5 text-sm font-semibold text-foreground hover:no-underline">
                              <span className="flex items-center gap-3">
                                <span className="flex size-6 shrink-0 items-center justify-center rounded-[10px]  text-[11px] font-bold ">
                                  {ii + 1}
                                </span>
                                {question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="pl-9 text-sm leading-relaxed text-muted-foreground">
                                {answer ?? item}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-[5px] bg-foreground px-8 py-2 text-sm font-bold text-background shadow-lg transition-all hover:scale-[1.02] hover:bg-foreground/90"
              >
                {ctaText} <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── What's included ────────────────────────────────────────────────── */}
      {campaign.included && campaign.included.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-2 text-center text-3xl font-bold tracking-tight">What's Included</h2>
            <p className="mb-8 text-center text-sm text-muted-foreground">Everything you get in this pack</p>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
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
      {/* {phone && (
        <section className="bg-foreground py-6">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="mb-2 text-sm font-medium text-background/80">
              Call us 24/7 for any query
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
      )} */}

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      {campaign.testimonials && campaign.testimonials.length > 0 && (
        <TestimonialsSection testimonials={campaign.testimonials} />
      )}
 
      {/* ── Offer strip ────────────────────────────────────────────────────── */}
      {/* <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          {campaign.offerBadge && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow">
              <Sparkles className="size-3.5" />
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
            + Delivery: ৳60 (Inside Dhaka) | ৳120 (Outside Dhaka)
          </p>
          <button
            onClick={scrollToForm}
            className="mt-6 inline-flex items-center gap-2 rounded-[5px] bg-foreground px-10 py-2 text-base font-bold text-background shadow-xl transition-all hover:scale-[1.02] hover:bg-foreground/90"
          >
            <ShoppingCart className="size-5" />
            {ctaText}
          </button>
          {phone && (
            <p className="mt-4 text-sm text-muted-foreground">
              Or call:{" "}
              <a href={`tel:${phone}`} className="font-semibold text-foreground hover:underline">
                {phone}
              </a>
            </p>
          )}
        </div>
      </section> */}
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
                  <IngredientsSection/>

      {/* ── Order form ─────────────────────────────────────────────────────── */}
      <section ref={formRef} className="py-14" id="order-form">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight">
            {campaign.formTitle ?? "Order Now"}
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Fill out the form and we'll get back to you
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
            Delivery across Bangladesh | 7-Day Return Policy | 100% Authentic Products
          </p>
          {phone && (
            <p className="mt-2 text-xs text-muted-foreground">
              Support:{" "}
              <a href={`tel:${phone}`} className="font-medium text-foreground">{phone}</a>
            </p>
          )}
        </div>
      </footer>
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
                <div className="flex size-9 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
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
      setError(e instanceof Error ? e.message : "Order failed. Please try again.");
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
        <h3 className="mb-2 text-xl font-bold">Order Placed Successfully!</h3>
        {orderNumber && (
          <p className="mb-2 text-sm text-muted-foreground">
            Order Number: <span className="font-mono font-semibold text-foreground">{orderNumber}</span>
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          We will contact you shortly. Thank you!
        </p>
        {campaign.phoneNumber && (
          <p className="mt-4 text-sm">
            Contact:{" "}
            <a href={`tel:${campaign.phoneNumber}`} className="font-semibold hover:underline">
              {campaign.phoneNumber}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-border bg-card shadow-sm overflow-hidden">
      {/* ── Top: product image + title + trust icons ── */}
      <div className="flex flex-wrap items-center gap-4 border-b border-border bg-muted/30 px-6 py-4">
        {(campaign.heroImages[0]?.url ?? campaign.product.images[0]?.url) && (
          <img
            src={campaign.heroImages[0]?.url ?? campaign.product.images[0]!.url}
            alt={campaign.product.name}
            className="size-16 rounded-xl object-cover shadow"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base leading-tight">{campaign.product.name}</p>
          <p className="text-2xl font-extrabold mt-0.5">{formatPrice(campaignPrice)}</p>
        </div>
        {/* Trust strip */}
        <div className="flex items-center gap-5 text-xs text-muted-foreground ml-auto">
          <span className="flex flex-col items-center gap-1">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Nationwide
          </span>
          <span className="flex flex-col items-center gap-1">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            Cash on Delivery
          </span>
          <span className="flex flex-col items-center gap-1">
            <ShieldCheck className="size-5" />
            7-Day Return
          </span>
        </div>
      </div>

      {/* ── Main 2-column layout: form | summary ── */}
      <div className="grid md:grid-cols-[1fr_280px]">

        {/* ── Left: ORDER FORM ── */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6 border-r border-border">
          <h3 className="text-base font-bold uppercase tracking-wider text-muted-foreground">Order Form</h3>

          {error && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Name + Phone side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Your Name *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="h-10 w-full rounded-[5px] border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Phone Number *</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="h-10 w-full rounded-[5px] border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">Address *</label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House / Road / Area / District"
              className="w-full rounded-[5px] border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">Special Notes (Optional)</label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions"
              className="h-10 w-full rounded-[5px] border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-lg font-bold hover:bg-muted transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center text-base font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-lg font-bold hover:bg-muted transition-colors"
              >
                +
              </button>
              <span className="text-xs text-muted-foreground">× {formatPrice(campaignPrice)} = {formatPrice(subtotal)}</span>
            </div>
          </div>

          {/* Delivery zone */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">Delivery Zone</label>
            <div className="flex flex-col gap-2">
              {(["INSIDE_DHAKA", "OUTSIDE_DHAKA"] as const).map((z) => (
                <label key={z} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="zone"
                    checked={zone === z}
                    onChange={() => setZone(z)}
                    className="accent-foreground"
                  />
                  <span className="text-sm">
                    {z === "INSIDE_DHAKA" ? "Delivery Inside Dhaka" : "Outside Dhaka"}
                    <span className="ml-1 text-muted-foreground">(Fee: ৳{z === "INSIDE_DHAKA" ? "60" : "120"})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-[5px]-500 py-3 text-base font-bold text-white bg-black shadow-lg transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 rounded-[5px]"
          >
            {submitting ? (
              <><Loader2 className="size-5 animate-spin" /> Please wait...</>
            ) : (
              <><ShoppingCart className="size-5" /> {ctaText}</>
            )}
          </button>
        </form>

        {/* ── Right: ORDER SUMMARY ── */}
        <div className="p-6 bg-muted/20 flex flex-col gap-4">
          <h3 className="text-base font-bold uppercase tracking-wider text-center border-b border-border pb-3">
            Order Summary
          </h3>
          <div className="space-y-3 text-sm flex-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item Price ({quantity}pc)</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Charge</span>
              <span className="font-semibold">{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <span className="font-bold">Total</span>
              <span className="font-extrabold text-lg">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-auto space-y-2 pt-4 border-t border-border">
            {[
              { icon: <CheckCheck className="size-4 text-emerald-600" />, text: "100% Authentic Products" },
              { icon: <ShieldCheck className="size-4 text-emerald-600" />, text: "Secure Order Processing" },
              { icon: <CheckCircle2 className="size-4 text-emerald-600" />, text: "Cash on Delivery Available" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                {icon}
                {text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}


