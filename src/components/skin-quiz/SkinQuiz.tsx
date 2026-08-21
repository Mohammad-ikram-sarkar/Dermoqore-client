"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductService } from "@/service/product.service";
import type { Product } from "@/service/product.type";
import ProductCard from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Quiz model                                                         */
/* ------------------------------------------------------------------ */

type Option = {
  value: string;
  label: string;
  description?: string;
};

type Question = {
  id: string;
  eyebrow: string;
  question: string;
  subtitle?: string;
  options: Option[];
};

type ConcernKey =
  | "pigmentation"
  | "acne"
  | "dullness"
  | "dryness"
  | "aging"
  | "sensitivity";

type ConcernProfile = {
  label: string;
  focus: string;
  keyword: string;
  regimen: string[];
};

const CONCERNS: Record<ConcernKey, ConcernProfile> = {
  pigmentation: {
    label: "Dark spots & pigmentation",
    focus: "Brightening & tone correction",
    keyword: "tranexamic niacinamide alpha arbutin vitamin c",
    regimen: ["Gentle Cleanser", "Brightening Serum", "SPF 50 Protection"],
  },
  acne: {
    label: "Acne & breakouts",
    focus: "Clarifying & barrier repair",
    keyword: "salicylic niacinamide tea tree zinc",
    regimen: ["Purifying Cleanser", "Clarifying Serum", "Lightweight Moisturizer"],
  },
  dullness: {
    label: "Dullness & uneven tone",
    focus: "Radiance & smoother texture",
    keyword: "vitamin c alpha arbutin glow",
    regimen: ["Refreshing Cleanser", "Radiance Serum", "Moisturizer"],
  },
  dryness: {
    label: "Dryness & dehydration",
    focus: "Deep hydration & barrier",
    keyword: "hyaluronic ceramide panthenol",
    regimen: ["Cream Cleanser", "Hydrating Serum", "Rich Moisturizer"],
  },
  aging: {
    label: "Fine lines & aging",
    focus: "Firming & renewal",
    keyword: "retinol peptide peptide",
    regimen: ["Cleanser", "Renewal Serum", "Rich Moisturizer", "Eye Care"],
  },
  sensitivity: {
    label: "Sensitivity & redness",
    focus: "Soothing & calming",
    keyword: "centella aloe soothing ceramide",
    regimen: ["Soothing Cleanser", "Calming Serum", "Barrier Cream"],
  },
};

const QUESTIONS: Question[] = [
  {
    id: "skinType",
    eyebrow: "Step 1",
    question: "What's your skin type?",
    subtitle: "Pick the option that feels closest to your everyday skin.",
    options: [
      { value: "oily", label: "Oily", description: "Shine-prone, visible pores" },
      { value: "dry", label: "Dry", description: "Tight, flaky or rough" },
      { value: "combination", label: "Combination", description: "Oily T-zone, normal cheeks" },
      { value: "normal", label: "Normal", description: "Balanced and comfortable" },
    ],
  },
  {
    id: "concern",
    eyebrow: "Step 2",
    question: "What's your main skin concern?",
    subtitle: "We'll build your routine around this goal.",
    options: [
      { value: "pigmentation", label: "Dark spots & pigmentation" },
      { value: "acne", label: "Acne & breakouts" },
      { value: "dullness", label: "Dullness & uneven tone" },
      { value: "dryness", label: "Dryness & dehydration" },
      { value: "aging", label: "Fine lines & aging" },
      { value: "sensitivity", label: "Sensitivity & redness" },
    ],
  },
  {
    id: "sensitivity",
    eyebrow: "Step 3",
    question: "How reactive is your skin?",
    options: [
      { value: "very", label: "Very sensitive", description: "Turns red easily" },
      { value: "sometimes", label: "Occasionally", description: "With new products" },
      { value: "rarely", label: "Rarely", description: "Pretty resilient" },
    ],
  },
  {
    id: "routine",
    eyebrow: "Step 4",
    question: "How much time for your routine?",
    subtitle: "More steps = a more complete regimen.",
    options: [
      { value: "minimal", label: "Minimal", description: "2 steps, keep it simple" },
      { value: "standard", label: "Standard", description: "3 steps, the essentials" },
      { value: "full", label: "Full regimen", description: "4+ steps, go all in" },
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length;

/* ------------------------------------------------------------------ */
/*  Steps                                                              */
/* ------------------------------------------------------------------ */

type Answers = Record<string, string>;

export default function SkinQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const isResults = started && step >= TOTAL_STEPS;
  const current = QUESTIONS[step];

  const select = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const goNext = () => {
    if (!answers[current.id]) return;
    setDirection("next");
    setStep((s) => s + 1);
  };

  const goPrev = () => {
    setDirection("prev");
    setStep((s) => Math.max(0, s - 1));
  };

  const restart = () => {
    setStarted(false);
    setStep(0);
    setAnswers({});
    setDirection("prev");
  };

  if (!started) {
    return <Intro onStart={() => setStarted(true)} />;
  }

  if (isResults) {
    return <Results answers={answers} onRestart={restart} />;
  }

  const progress = ((step + 1) / (TOTAL_STEPS + 1)) * 100;
  const selected = answers[current.id];

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          <span>{current.eyebrow}</span>
          <span>
            {step + 1} / {TOTAL_STEPS}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        key={current.id}
        className={cn(
          "transition-all duration-300",
          direction === "next" ? "animate-in fade-in slide-in-from-right-4" : "animate-in fade-in slide-in-from-left-4",
        )}
      >
        <h2 className="text-2xl font-black tracking-[0.04em] text-foreground md:text-3xl">
          {current.question}
        </h2>
        {current.subtitle && (
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{current.subtitle}</p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {current.options.map((opt) => {
            const active = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => select(opt.value)}
                aria-pressed={active}
                className={cn(
                  "flex items-start gap-3 border px-5 py-4 text-left transition-all duration-200",
                  active
                    ? "border-foreground bg-secondary"
                    : "border-border hover:border-foreground/40",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    active ? "border-foreground bg-foreground text-background" : "border-border",
                  )}
                >
                  {active && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                  {opt.description && (
                    <span className="mt-0.5 text-xs text-muted-foreground">{opt.description}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={goPrev} render={<button type="button" />}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          size="sm"
          onClick={goNext}
          disabled={!selected}
          render={<button type="button" />}
        >
          {step === TOTAL_STEPS - 1 ? "See results" : "Continue"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Intro                                                              */
/* ------------------------------------------------------------------ */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-border bg-secondary">
        <Sparkles className="size-6 text-foreground" strokeWidth={1.5} />
      </div>
      <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
        Find Your Serum
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[0.04em] text-foreground md:text-4xl">
        Build a routine for your skin
      </h2>
      <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-muted-foreground">
        Answer four quick questions and we&apos;ll recommend a science-backed regimen tailored to
        Bangladeshi skin — no guesswork, just what works.
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={onStart} render={<button type="button" />}>
          Start the quiz
          <ArrowRight className="size-4" />
        </Button>
      </div>
      <p className="mt-4 text-[11px] tracking-[0.04em] text-muted-foreground">
        Takes less than 60 seconds
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Results                                                            */
/* ------------------------------------------------------------------ */

function Results({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const concern = CONCERNS[(answers.concern as ConcernKey) ?? "pigmentation"];
  const routineDepth = answers.routine ?? "standard";

  const regimenSteps = useMemo(() => {
    const base = concern.regimen;
    if (routineDepth === "minimal") return base.slice(0, 2);
    if (routineDepth === "full") return base;
    return base.slice(0, Math.min(3, base.length));
  }, [concern, routineDepth]);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await ProductService.searchAll({ search: concern.keyword, limit: 4 }).catch(
        () => null,
      );
      let items = res?.items ?? [];
      if (items.length === 0) {
        items = await ProductService.findBestSellers(4).catch(() => []);
      }
      setProducts(items);
    } finally {
      setLoading(false);
    }
  }, [concern.keyword]);

  // Client-side fetch for recommended products — required here since results render on the client.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="text-center">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          Your Match
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[0.04em] text-foreground md:text-4xl">
          {concern.focus}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground">
          Based on your answers, here&apos;s a {routineDepth} routine for{" "}
          <span className="font-semibold text-foreground">{concern.label.toLowerCase()}</span>.
        </p>
      </div>

      {/* Regimen steps */}
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {regimenSteps.map((stepLabel, i) => (
          <div
            key={stepLabel}
            className="flex flex-col gap-2 border border-border bg-background p-5"
          >
            <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Step {i + 1}
            </span>
            <span className="text-sm font-semibold text-foreground">{stepLabel}</span>
          </div>
        ))}
      </div>

      {/* Recommended products */}
      <div className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Recommended for you
            </p>
            <h3 className="text-2xl font-semibold text-foreground md:text-3xl">Your Products</h3>
          </div>
          <Button variant="outline" size="sm" className="hidden md:inline-flex" render={<Link href="/shop" />}>
            <span>Shop all</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse bg-secondary" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 md:hidden">
          <Button variant="outline" size="sm" className="w-full" render={<Link href="/shop" />}>
            <span>Shop all products</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Restart */}
      <div className="mt-12 flex justify-center">
        <Button variant="ghost" size="sm" onClick={onRestart} render={<button type="button" />}>
          <RotateCcw className="size-4" />
          Retake quiz
        </Button>
      </div>
    </div>
  );
}
