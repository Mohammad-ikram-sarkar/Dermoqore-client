"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShoppingCart,
  ChevronDown,
  Loader2,
} from "lucide-react";
import type { Campaign } from "@/service/campaign.service";
import { CampaignService } from "@/service/campaign.service";
import { themeVars } from "@/lib/campaign-theme";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import IngredientsSection from "@/components/campaign/IngredientsSection";
import SkinConcernsSection from "@/components/campaign/SkinConcernsSection";
import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignRealface from "@/components/campaign/CampaignRealface";
import VideoSection from "@/components/campaign/Videoapi";
import TrustBadges from "@/components/campaign/TrustBadges";
import BTRISection from "@/components/campaign/BTRISection";

const NAVY = "#1a2466";

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

const STATIC_FAQS = [
  {
    question: "Dermoqore Serum কতদিনে কাজ শুরু করে?",
    answer: "সাধারণত ২–৪ সপ্তাহ নিয়মিত ব্যবহারে ত্বকে উন্নতি দেখা যায়। সর্বোত্তম ফলাফলের জন্য ৮–১২ সপ্তাহ ব্যবহার করার পরামর্শ দেওয়া হয়।",
  },
  {
    question: "কোন ধরনের ত্বকের জন্য Dermoqore উপযুক্ত?",
    answer: "Dermoqore সব ধরনের ত্বকের জন্য উপযুক্ত — তৈলাক্ত, শুষ্ক, সংমিশ্রণ এবং সংবেদনশীল ত্বকেও ব্যবহার করা যায়।",
  },
  {
    question: "Dermoqore কি BTRI-তে পরীক্ষিত?",
    answer: "হ্যাঁ, Dermoqore Spot Correcting Serum বাংলাদেশ টেক্সটাইল রিসার্চ ইনস্টিটিউট (BTRI)-এর ল্যাবে পরীক্ষিত এবং নিরাপদ প্রমাণিত।",
  },
  {
    question: "কীভাবে ব্যবহার করতে হবে?",
    answer: "ত্বক পরিষ্কার করে রাতে ঘুমানোর আগে ৩–৪ ফোঁটা সিরাম সমস্যাযুক্ত স্থানে লাগান। ৩০ মিনিট পর ময়েশ্চারাইজার ব্যবহার করুন।",
  },
  {
    question: "পার্শ্বপ্রতিক্রিয়া আছে কি?",
    answer: "Dermoqore-এ কোনো স্টেরয়েড বা ক্ষতিকর উপাদান নেই। তবে প্রথমবার ব্যবহারের আগে কানের পিছনে বা কব্জিতে প্যাচ টেস্ট করে নেওয়া ভালো।",
  },
  {
    question: "ডেলিভারি কতদিনে পাব?",
    answer: "অর্ডার কনফার্ম হওয়ার পর ঢাকার মধ্যে ১–২ দিন এবং ঢাকার বাইরে ২–৪ দিনের মধ্যে পৌঁছে যাবে।",
  },
];

/**
 * Default "কেন Dermoqore কাজ করে?" ingredients — used as a fallback so the
 * section always renders like the reference. Admin-provided ingredients
 * (campaign.ingredients) override these when present.
 */
const DEFAULT_INGREDIENTS = [
  { name: "Transexamic Acid 2%", image: "/TranexamicAcid.png", description: "ডার্ক স্পট কমাতে সাহায্য করে" },
  { name: "Alpha Arbutin 2%", image: "/AlphaArbutin.png", description: "মেলানিন উৎপাদন কমিয়ে স্কিন টোন ইভেন করে" },
  { name: "Ascorbyl Glucoside 2%", image: "/aloe-vera.png", description: "ভিটামিন C ডেরিভেটিভ যা ত্বক উজ্জ্বল করে" },
  { name: "Niacinamide 3%", image: "/Niacinamide.jpg", description: "পোরস, ম্লানতা কমায় ও স্কিন টোন ইভেন করে" },
  { name: "Ceramide 1%", image: "/Ceramide.jpg", description: "স্কিন ব্যারিয়ার মজবুত করে ও হাইড্রেশন ধরে রাখে" },
  { name: "Sodium Hyaluronate", image: "/Panthenol.png", description: "ত্বকে আর্দ্রতা ধরে রাখতে সাহায্য করে" },
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

  const ctaText = "অর্ডার করুন এখনই";

  const vars = themeVars(campaign.theme);

  return (
    <div className="min-h-screen bg-background text-foreground" style={vars}>
      {/* ── Top bar — brand logo ─────────────────────────────────────────── */}
      <header className="w-full bg-[#FBF9F8]">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <Link href="/" className="inline-flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight sm:text-2xl" style={{ color: NAVY }}>
              DERMOQORE
            </span>
            <span className="mt-1 text-[8px] font-medium tracking-[0.28em] text-[#5a6488]">
              SCIENCE - SKIN - CONFIDENCE
            </span>
          </Link>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <CampaignHero
        campaign={campaign}
        comparePrice={comparePrice}
        campaignPrice={campaignPrice}
        discount={discount}
        ctaText={ctaText}
        primaryImage={primaryImage}
        scrollToForm={scrollToForm}
      />

      {/* ── এই সমস্যাগুলোর কি আপনিও ভুগছেন? ──────────────────────────────── */}
      <SkinConcernsSection
        concerns={[
          { icon: "dark-spots", label: "ব্রণের পুরানো দাগ" },
          { icon: "melasma", label: "কালো ছোপ\n(হাইপারপিগমেন্টেশন)" },
          { icon: "uneven-tone", label: "Uneven\nSkin Tone" },
          { icon: "sun-spots", label: "Sun Spots /\nPigmentation" },
          { icon: "post-acne", label: "মেছতা, গর্ভাবস্থার\nপর মুখের দাগ" },
        ]}
        heading="এই সমস্যাগুলোতে কি আপনিও ভুগছেন?"
      />

      {/* ── Dermoqore কেন আলাদা? (main video + why-different) ─────────────── */}
      <VideoSection videoUrl={campaign.videoUrl} />

      {/* ── কেন Dermoqore কাজ করে? (ingredients) ─────────────────────────── */}
      <IngredientsSection ingredients={DEFAULT_INGREDIENTS} />

      {/* ── বাস্তব ফলাফল + গ্রাহকরা যা বলেছেন ─────────────────────────────── */}
      <CampaignRealface customerReviews={campaign.customerReviews} />

      {/* ── BTRI Lab Test Report ─────────────────────────────────────────── */}
      <BTRISection images={campaign.labReportImages} />

      {/* ── সাধারণ কিছু প্রশ্ন + অর্ডার করতে ফর্মটি পূরণ করুন ───────────────── */}
      <section ref={formRef} className="bg-muted/30 py-12 md:py-16" id="order-form">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            {/* LEFT — FAQ (static) */}
            <div className="overflow-hidden rounded-[10px] border border-border bg-card shadow-sm">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-xl font-bold tracking-tight text-[#1a2466]">সাধারণ কিছু প্রশ্ন</h2>
              </div>
              <Accordion multiple defaultValue={[]}>
                {STATIC_FAQS.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border-b border-border last:border-b-0"
                  >
                    <AccordionTrigger className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted/20 hover:no-underline [&>svg]:hidden">
                      <span className="text-left">{faq.question}</span>
                      <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-lg font-light leading-none text-muted-foreground">
                        +
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 pt-1">
                      <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* RIGHT — Order form */}
            <div>
              <CampaignOrderForm
                campaign={campaign}
                campaignPrice={campaignPrice}
                comparePrice={comparePrice}
                discount={discount}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── কেন হাজারো মানুষের ভরসা Dermoqore? ───────────────────────────── */}
      <TrustBadges />

      {/* ── Sticky bottom order bar ──────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40" style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">
          {(campaign.heroImages[0]?.url ?? campaign.product.images[0]?.url) && (
            <img
              src={campaign.heroImages[0]?.url ?? campaign.product.images[0]!.url}
              alt={campaign.product.name}
              className="h-12 w-10 shrink-0 rounded object-cover sm:h-14 sm:w-12"
            />
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white sm:text-sm">
              {campaign.product.name}
            </p>
            <p className="truncate text-[10px] text-white/60 sm:text-xs">
              {campaign.subtitle ?? "Science Based Formula | BTRI Lab Tested"}
            </p>
          </div>

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
                  <span className="rounded-[4px] bg-[#2563eb] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {discount}% ছাড়
                  </span>
                )}
              </>
            )}
          </div>

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

      {/* spacer so content isn't hidden behind the fixed bar */}
      <div className="h-20" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Order Form Component                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

function CampaignOrderForm({
  campaign,
  campaignPrice,
  comparePrice,
  discount,
}: {
  campaign: Campaign;
  campaignPrice: number;
  comparePrice: number | null;
  discount: number;
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
      const result = (await CampaignService.placeOrder(campaign.slug, {
        campaignId: campaign.id,
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        deliveryZone: zone,
        quantity,
      })) as { orderNumber?: string };
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

  return (
    <div className="overflow-hidden rounded-[10px] border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-muted/20 px-5 py-4">
        <h2 className="text-lg font-bold tracking-tight text-[#1a2466]">অর্ডার করতে ফর্মটি পূরণ করুন</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 px-5 py-5">
        {/* Price strip */}
        <div className="flex flex-wrap items-center gap-2 rounded-[6px] bg-muted/30 px-4 py-2.5 text-sm">
          {comparePrice && (
            <span className="text-muted-foreground">
              Regular Price:{" "}
              <span className="font-semibold text-red-500 line-through">{formatPrice(comparePrice)}</span>
            </span>
          )}
          <span className="text-muted-foreground">
            Offer Price: <span className="font-bold text-green-600">{formatPrice(campaignPrice)}</span>
          </span>
          {discount > 0 && (
            <span className="rounded-[4px] bg-[#2563eb] px-2 py-0.5 text-[11px] font-bold text-white">
              {discount}% ছাড়
            </span>
          )}
        </div>

        {error && (
          <div className="rounded-[6px] border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
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

        {/* Phone */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.1 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.72 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.36 1.85.6 2.81.72A2 2 0 0 1 22 17z" />
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

        {/* Address */}
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-3 text-muted-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21C12 21 5 13.5 5 8.5a7 7 0 0 1 14 0C19 13.5 12 21 12 21z" /><circle cx="12" cy="8.5" r="2.5" />
            </svg>
          </span>
          <textarea
            required
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="পূর্ণ ঠিকানা (বাড়ি, রোড, এলাকা)"
            className="w-full resize-none rounded-[6px] border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Quantity */}
        <div className="relative">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="h-11 w-full cursor-pointer appearance-none rounded-[6px] border border-input bg-background px-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n}টি পিস</option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
            <ChevronDown className="size-4" />
          </span>
        </div>

        {/* Delivery zone */}
        <div className="grid grid-cols-2 gap-2">
          {(["INSIDE_DHAKA", "OUTSIDE_DHAKA"] as const).map((z) => (
            <label
              key={z}
              className={`flex cursor-pointer items-center gap-2 rounded-[6px] border px-3 py-2.5 text-xs font-medium transition-colors ${
                zone === z
                  ? "border-[#1a2466] bg-[#eef1fa] text-[#1a2466]"
                  : "border-border bg-background text-muted-foreground hover:bg-muted/30"
              }`}
            >
              <input type="radio" name="zone" checked={zone === z} onChange={() => setZone(z)} className="hidden" />
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${zone === z ? "border-[#1a2466]" : "border-muted-foreground"}`}>
                {zone === z && <span className="h-2 w-2 rounded-full bg-[#1a2466]" />}
              </span>
              <span>{z === "INSIDE_DHAKA" ? "ঢাকার ভেতরে" : "ঢাকার বাইরে"}</span>
            </label>
          ))}
        </div>

        {/* Fees */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#1a2466] py-3.5 text-sm font-bold text-white shadow transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <><Loader2 className="size-5 animate-spin" /> অপেক্ষা করুন...</>
          ) : (
            <><ShoppingCart className="size-5" /> অর্ডার কনফার্ম করুন</>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          আপনার তথ্য ১০০% সুরক্ষিত এবং গোপন রাখা হবে
        </p>
      </form>
    </div>
  );
}
