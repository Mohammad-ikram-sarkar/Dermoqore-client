import type { Metadata } from "next";
import { ProductService } from "@/service/product.service";
import ProductCard from "@/components/shop/ProductCard";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "Shop our most popular skincare products, loved by thousands.",
};

export default async function BestSellersPage() {
  const products = await ProductService.findBestSellers(12).catch(() => []);

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Curated Favorites
          </p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">
            Best Sellers
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            The products our customers love most — proven results, real
            reviews, and science-backed ingredients.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isBestSeller />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-border p-12 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              No best sellers yet
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Products will appear here once orders start coming in.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
