"use client";

import Image from "next/image";
import type { Ingredient } from "@/service/campaign.service";

function IngredientImage({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="relative mx-auto mb-5 h-24 w-24">
      {/* Soft gradient halo */}
      <div className="absolute inset-0 -m-1 rounded-full blur-[2px] transition-transform duration-300 group-hover:scale-105" style={{ background: "var(--cps, transparent)" }} />
      {/* Image circle */}
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-md ring-1 ring-black/5">
        <Image
          src={ingredient.image}
          alt={ingredient.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="96px"
          unoptimized
        />
      </div>
    </div>
  );
}

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="group relative overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl rounded-[10px]">
      {/* Top accent line that reveals on hover */}
      <div
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: "var(--cp, #171717)" }}
      />
      <div className="px-4 pb-5 pt-6 text-center">
        <IngredientImage ingredient={ingredient} />
        <h3 className="mb-2 text-base font-bold leading-snug">
          {ingredient.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {ingredient.description}
        </p>
      </div>
    </div>
  );
}

interface Props {
  ingredients: Ingredient[];
}

export default function IngredientsSection({ ingredients }: Props) {
  if (!ingredients?.length) return null;

  return (
    <section className="px-4 py-16 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <h2 className="text-2xl font-bold md:text-3xl">
              The Power of Natural Ingredients
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Key ingredients used in this formulation
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {ingredients.map((ingredient, i) => (
            <IngredientCard key={i} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </section>
  );
}
