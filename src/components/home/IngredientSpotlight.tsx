import Image from "next/image";

const ingredients = [
  {
    name: "Niacinamide",
    description: "Minimizes pores, controls oil & improves skin texture.",
    src: "/Niacinamide.jpg",
  },
  {
    name: "Alpha Arbutin",
    description: "Reduces dark spots & evens out skin tone.",
    src: "/AlphaArbutin.png",
  },
  {
    name: "Tranexamic Acid",
    description: "Helps fade stubborn pigmentation.",
    src: "/TranexamicAcid.png",
  },
  {
    name: "Ceramide",
    description: "Strengthens skin barrier & locks in moisture.",
    src: "/Ceramide.jpg",
  },
  {
    name: "Panthenol",
    description: "Soothes, hydrates & improves skin healing.",
    src: "/Panthenol.png",
  },
];

export default function IngredientSpotlight() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Heading */}
        <h2 className="mb-8 text-center font-heading text-sm font-black tracking-[0.18em] text-foreground uppercase md:text-base">
          Ingredient Spotlight
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {ingredients.map(({ name, description, src }) => (
            <div
              key={name}
              className="flex flex-col overflow-hidden rounded-sm border border-border bg-background"
            >
              {/* Image area */}
              <div className="relative h-40 w-full bg-muted">
                <Image
                  src={src}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Text area */}
              <div className="flex flex-col gap-1.5 p-4">
                <span className="text-[10px] font-black tracking-[0.14em] text-foreground uppercase">
                  {name}
                </span>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
