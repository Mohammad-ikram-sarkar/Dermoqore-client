"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Ingredient {
  id: number;
  name: string;
  src: string;
  description: string;
  ring: string;
}

const ingredients: Ingredient[] = [
  {
    id: 1,
    name: "Aloe Vera",
    src: "/aloe-vera.png",
    description: "Soothes and deeply moisturizes the skin",
    ring: "from-green-200/60 to-emerald-100/40",
  },
  {
    id: 2,
    name: "Green Tea Extract",
    src: "/GreenTeaExtract.png",
    description: "Rich in antioxidants, keeps skin refreshed and protected",
    ring: "from-emerald-200/60 to-green-100/40",
  },
  {
    id: 3,
    name: "Vitamin E",
    src: "/VitaminE .png",
    description: "Nourishes skin and helps prevent signs of aging",
    ring: "from-amber-200/60 to-yellow-100/40",
  },
  {
    id: 4,
    name: "Shea Butter",
    src: "/SheaButter.jpeg",
    description: "Helps keep skin soft, smooth, and supple",
    ring: "from-orange-200/60 to-amber-100/40",
  },
  {
    id: 5,
    name: "Neem Extract",
    src: "/NeemExtract.jpeg",
    description: "Reduces acne and keeps skin clear and clean",
    ring: "from-lime-200/60 to-green-100/40",
  },
];

function IngredientImage({
  ingredient,
}: {
  ingredient: Ingredient;
}) {
  return (
    <div className="relative mx-auto mb-5 h-24 w-24">
      {/* Soft gradient halo */}
      <div
        className={`absolute inset-0 -m-1 rounded-full bg-gradient-to-br ${ingredient.ring} blur-[2px] transition-transform duration-300 group-hover:scale-105`}
      />
      {/* Image circle */}
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-md ring-1 ring-black/5">
        <Image
          src={ingredient.src}
          alt={ingredient.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="96px"
        />
      </div>
    </div>
  );
}

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <Card className="group relative overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300  hover:shadow-xl rounded-[10px] ">
      {/* Top accent line that reveals on hover */}
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0  transition-transform duration-300 group-hover:scale-x-100" />
      <CardContent className="px-4 pb-5 pt-6 text-center">
        <IngredientImage ingredient={ingredient} />
        <h3 className="mb-2 text-base font-bold leading-snug">
          {ingredient.name}
        </h3>
        <p className="text-sm leading-relaxed text-gray-500">
          {ingredient.description}
        </p>
      </CardContent>
    </Card>
  );
}

export default function IngredientsSection() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              The Power of Natural Ingredients
            </h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Key ingredients used in Dermoqore formulation
          </p>
          {/* Green underline accent */}
          
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </section>
  );
}
