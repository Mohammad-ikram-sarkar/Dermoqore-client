import { Leaf, ShieldCheck, Heart, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Us - Dermoqore",
  description: "Learn more about Dermoqore and our commitment to clean, effective skincare.",
};

const values = [
  {
    icon: Leaf,
    title: "Clean Ingredients",
    description: "We source only the highest quality, clean ingredients that are safe for you and the environment.",
  },
  {
    icon: ShieldCheck,
    title: "Dermatologist Tested",
    description: "Every formulation is rigorously tested to ensure efficacy and safety for all skin types.",
  },
  {
    icon: Heart,
    title: "Cruelty-Free",
    description: "We love animals. Our products are never tested on animals, and we are proudly leaping bunny certified.",
  },
  {
    icon: Sparkles,
    title: "Visible Results",
    description: "We believe in skincare that actually works, delivering noticeable improvements you can see and feel.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDFB] pb-0">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center md:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 font-serif text-4xl text-foreground md:text-5xl lg:text-6xl">
            Redefining Skincare
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            At Dermoqore, we believe that healthy skin is the foundation of confidence. 
            Our mission is to create effective, science-backed formulas that nourish and protect.
          </p>
        </div>
      </section>

      {/* Hero Image Full Width */}
      <section className="px-4 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden bg-gray-100 h-[300px] md:h-[500px]">
          <img

                src="/ChatGPT Image Jun 12, 2026, 10_30_13 AM.png"

alt="Our Origin"

className="h-full w-full object-cover"

/>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 lg:px-16">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
              <img
                src="/ChatGPT Image Jun 12, 2026, 10_30_13 AM.png"
                alt="Our Origin"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 font-serif text-3xl text-foreground md:text-4xl">
              The Story Behind The Glow
            </h2>
            <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2024, Dermoqore was born out of a simple frustration: the skincare market was saturated with products full of empty promises and harsh chemicals. We wanted something better—skincare that works with your skin, not against it.
              </p>
              <p>
                We spent years collaborating with top dermatologists and cosmetic chemists to formulate products that prioritize skin barrier health. By combining the best of nature and science, we’ve developed a line of essentials that are both gentle and powerfully effective.
              </p>
              <p>
                Every drop, every cream, and every serum is meticulously crafted. We strip away the unnecessary fillers, focusing only on potent active ingredients that deliver real results. Welcome to the new era of conscious skincare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#FAF6F3] py-24 px-4 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-16 font-serif text-3xl text-foreground md:text-4xl">
            Our Core Pillars
          </h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="group flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm text-[#D46B5A] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md">
                  <value.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-serif text-xl text-foreground">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
