"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product, ProductImage } from "@/service/product.type";
import { useCheckoutStore } from "@/store/checkout-store";

function formatPrice(price: number | string) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function getPrimaryImage(product: Product): ProductImage | { url: string; alt: string } {
  return (
    product.images.find((image) => image.isPrimary) ??
    product.images[0] ?? {
      url: "/Niacinamide.jpg",
      alt: product.name,
    }
  );
}

export default function ProductCard({
  product,
  isBestSeller = false,
}: {
  product: Product;
  isBestSeller?: boolean;
}) {
  const router = useRouter();
  const addLine = useCheckoutStore((s) => s.addLine);
  const primaryImage = getPrimaryImage(product);

  return (
    <article className="group relative overflow-hidden rounded-md border border-border bg-card">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[1.08] bg-muted">
          {isBestSeller && (
            <span className="absolute left-3 top-3 z-10 rounded bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800 shadow-sm">
              Best Seller
            </span>
          )}
          <img
            src={primaryImage.url}
            alt={"alt" in primaryImage ? (primaryImage.alt ?? product.name) : product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="space-y-1.5 p-4">
          <h2 className="line-clamp-1 text-[15px] font-bold text-foreground">
            {product.name}
          </h2>
          <p className="line-clamp-1 text-xs font-medium text-muted-foreground">
            {product.shortDescription ?? product.skinType ?? product.category.name}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-extrabold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between px-4 pb-4">
        <button
          onClick={() => {
            addLine({
              productId: product.id,
              name: product.name,
              image: primaryImage.url,
              unitPrice: Number(product.price),
              quantity: 1,
            });
            router.push("/cart");
          }}
          className="h-8 rounded border border-foreground px-4 text-[11px] font-bold uppercase tracking-wide transition-colors hover:bg-foreground hover:text-background"
        >
          Add to Cart
        </button>
        <button
          className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`Save ${product.name}`}
        >
          <Heart className="size-4" />
        </button>
      </div>
    </article>
  );
}
