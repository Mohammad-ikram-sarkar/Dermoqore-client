import Link from "next/link";
import { ProductService } from "@/service/product.service";
import ProductCard from "@/components/shop/ProductCard";

export const metadata = {
  title: "Curated Kits & Bundles",
  description: "Take the guesswork out of your routine with our curated skincare kits.",
};

export default async function KitsPage() {
  // Fetch products to display as kits. In a real scenario, this could be filtered by categoryId or tag
  const productsResponse = await ProductService.findAll({ limit: 8 }).catch(() => ({ items: [] }));
  const kits = productsResponse.items;

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      {/* Hero Banner for Kits */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-gray-100 px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=2000"
            alt="Skincare Kits Banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Banner Content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-wide md:text-5xl lg:text-6xl">
            Curated Kits & Routines
          </h1>
          <p className="mb-8 text-lg font-medium text-white/90 md:text-xl">
            Take the guesswork out of skincare with our expertly designed bundles for every skin concern.
          </p>
        </div>
      </section>

      {/* Main Kits Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl text-foreground md:text-4xl">
            Shop Our Bundles
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Save up to 15% when you purchase our essentials together. Each kit is formulated to work in perfect harmony.
          </p>
        </div>

        {kits && kits.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {kits.map((kit) => (
              <ProductCard key={kit.id} product={kit} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border py-20 text-center">
            <h2 className="text-xl font-semibold text-foreground">No kits available right now</h2>
            <p className="mt-2 text-muted-foreground">
              Check back soon for new curated skincare routines.
            </p>
            <Link 
              href="/shop" 
              className="mt-6 inline-flex h-10 items-center justify-center rounded bg-[#D46B5A] px-6 text-sm font-bold text-white transition-colors hover:bg-[#b85a4b]"
            >
              Shop All Products
            </Link>
          </div>
        )}
      </section>

      {/* Routine Education Banner */}
      <section className="bg-[#FAF6F3] py-20 px-4 text-center md:px-8">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-8 font-serif text-2xl text-foreground md:text-3xl">
            Why Buy a Kit?
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-left">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h4 className="mb-3 font-serif text-lg font-bold text-foreground">Perfectly Paired</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ingredients selected by our experts to complement each other and maximize efficacy without irritation.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h4 className="mb-3 font-serif text-lg font-bold text-foreground">Built-in Savings</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Enjoy a discounted price compared to buying each step of the routine individually.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h4 className="mb-3 font-serif text-lg font-bold text-foreground">Simple Routine</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Follow an easy step-by-step process designed to optimize your skin barrier and deliver real results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
