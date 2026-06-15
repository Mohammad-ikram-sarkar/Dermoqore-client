"use client";

import { useState } from "react";
import type { Ingredient, ProductUsageStep } from "@/service/product.type";
import TipTapRenderer from "./TipTapRenderer";

type Tab = "description" | "ingredients" | "how-to-use" | "benefits";

interface Props {
  description: string | null;
  ingredients: Ingredient[];
  howToUse: ProductUsageStep[];
  benefits: { id: string; title: string }[];
}

const tabConfig: { id: Tab; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "ingredients", label: "Ingredients" },
  { id: "how-to-use", label: "How to Use" },
  { id: "benefits", label: "Benefits" },
];

export default function ProductTabs({
  description,
  ingredients,
  howToUse,
  benefits,
}: Props) {
  /* Build visible tabs — only show tabs that have content */
  const visibleTabs = tabConfig.filter(({ id }) => {
    switch (id) {
      case "description":
        return !!description;
      case "ingredients":
        return ingredients.length > 0;
      case "how-to-use":
        return howToUse.length > 0;
      case "benefits":
        return benefits.length > 0;
      default:
        return false;
    }
  });

  const [active, setActive] = useState<Tab>(visibleTabs[0]?.id ?? "description");

  if (visibleTabs.length === 0) return null;

  return (
    <section className="space-y-0">
      {/* Tab bar */}
      <div className="relative border-b border-border">
        <div className="flex gap-0 overflow-x-auto">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative whitespace-nowrap px-6 py-4 text-sm font-semibold tracking-wide transition-colors ${
                active === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {/* Active underline */}
              {active === tab.id && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panels */}
      <div className="py-8">
        {/* Description */}
        {active === "description" && description && (
          <TipTapRenderer content={description} />
        )}

        {/* Ingredients */}
        {active === "ingredients" && ingredients.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Active ingredients in this formulation:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {ing.name}
                  </span>
                  {ing.percentage && (
                    <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-bold text-foreground">
                      {ing.percentage}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to Use */}
        {active === "how-to-use" && howToUse.length > 0 && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Follow these steps for best results:
            </p>
            <ol className="space-y-4">
              {howToUse.map((step) => (
                <li key={step.id} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                    {step.stepNumber}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-foreground/90">
                    {step.content}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Benefits */}
        {active === "benefits" && benefits.length > 0 && (
          <div className="space-y-4">
            <ul className="grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li
                  key={b.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <svg
                      className="size-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {b.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
