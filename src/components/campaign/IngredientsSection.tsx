"use client";

import type { Ingredient } from "@/service/campaign.service";

const NAVY = "#1a2466";

/* Soft pastel card backgrounds, cycled across the ingredient cards */
const CARD_TINTS = [
  "#eaf1fb",
  "#eafaf0",
  "#fef3e7",
  "#eafafd",
  "#f3f1fb",
  "#eef5fc",
];

function IngredientCard({ ingredient, tint }: { ingredient: Ingredient; tint: string }) {
  return (
    <div
      className="flex flex-col items-center rounded-[14px] px-3 py-5 text-center transition-transform duration-200 hover:-translate-y-0.5"
      style={{ background: tint }}
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white/70 ring-1 ring-black/5">
        {ingredient.image ? (
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <h3 className="text-[13px] font-bold leading-snug" style={{ color: NAVY }}>
        {ingredient.name}
      </h3>
      <p className="mt-1.5 text-[11px] leading-snug text-[#5a6488]">
        {ingredient.description}
      </p>
    </div>
  );
}

interface Props {
  ingredients: Ingredient[];
  heading?: string;
}

export default function IngredientsSection({ ingredients, heading }: Props) {
  if (!ingredients?.length) return null;

  return (
    <section className="bg-white px-4 py-10 md:py-12">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-8 text-center text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: NAVY }}
        >
          {heading ?? "কেন Dermoqore কাজ করে?"}
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ingredients.map((ingredient, i) => (
            <IngredientCard
              key={i}
              ingredient={ingredient}
              tint={CARD_TINTS[i % CARD_TINTS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
