import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/service/product.type";
import ProductCard from "@/components/shop/ProductCard";

interface Props {
  products: Product[];
  categoryName: string;
  categoryId: string;
}

export default function RelatedProducts({
  products,
  categoryName,
  categoryId,
}: Props) {
  if (products.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            You may also like
          </p>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            More from {categoryName}
          </h2>
        </div>
        <Link
          href={`/shop?categoryId=${categoryId}`}
          className="group flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
        >
          View All
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
