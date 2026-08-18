"use client";

import Link from "next/link";
import { Heart, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addLine = useCheckoutStore((s) => s.addLine);

  if (items.length === 0) {
    return (
      <main className="flex-1 bg-background">
        <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <div className="mx-auto max-w-md text-center">
            <Heart className="mx-auto mb-6 size-16 text-muted-foreground/40" />
            <h1 className="mb-2 text-2xl font-semibold text-foreground">
              Your wishlist is empty
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              Save the products you love and they&apos;ll be waiting for you here.
            </p>
            <Button render={<Link href="/shop" />}>
              Browse Products
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Your Wishlist
            </p>
            <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
              Saved for later
            </h1>
          </div>
          <span className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="group flex flex-col overflow-hidden rounded-md border border-border bg-card"
            >
              {/* Image */}
              <Link href={`/shop/${item.slug}`} className="block">
                <div className="relative aspect-[1.08] bg-muted">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
                      <Heart className="size-10" />
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(item.productId);
                    }}
                    className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-muted-foreground shadow-sm transition-colors hover:text-destructive"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </Link>

              {/* Details */}
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <Link href={`/shop/${item.slug}`}>
                  <h2 className="line-clamp-1 text-[15px] font-bold text-foreground hover:text-[#D46B5A]">
                    {item.name}
                  </h2>
                </Link>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-extrabold text-foreground">
                    {formatPrice(item.price)}
                  </span>
                  {item.comparePrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(item.comparePrice)}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-3">
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => {
                      addLine({
                        productId: item.productId,
                        name: item.name,
                        image: item.image,
                        unitPrice: item.price,
                        quantity: 1,
                      });
                      removeItem(item.productId);
                    }}
                  >
                    <ShoppingBag className="size-3.5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <Button variant="ghost" size="sm" render={<Link href="/shop" />}>
          <ArrowLeft className="size-3.5" />
          Continue Shopping
        </Button>
      </section>
    </main>
  );
}
