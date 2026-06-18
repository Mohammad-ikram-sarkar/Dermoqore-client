import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductService } from "@/service/product.service";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shop/ProductCard";

export default async function BestSellers() {
  const products = await ProductService.findBestSellers(4).catch(() => []);

  if (products.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Customer Favorites
            </p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              Best Sellers
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
            render={<Link href="/best-sellers" />}
          >
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isBestSeller />
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/best-sellers" />}
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
