"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

export default function CartPage() {
  const { lines, removeLine, setLineQuantity, subtotal, itemCount } =
    useCheckoutStore();

  if (lines.length === 0) {
    return (
      <main className="flex-1 bg-background">
        <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag className="mx-auto mb-6 size-16 text-muted-foreground/40" />
            <h1 className="mb-2 text-2xl font-semibold text-foreground">
              Your cart is empty
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              Looks like you haven&apos;t added anything yet. Browse our products
              and find what your skin needs.
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
              Your Cart
            </p>
            <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
              Review your items
            </h1>
          </div>
          <span className="text-sm text-muted-foreground">
            {itemCount()} {itemCount() === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Cart items */}
          <div className="space-y-4">
            {lines.map((line) => (
              <div
                key={line.productId}
                className="flex gap-4 rounded-md border border-border bg-card p-4"
              >
                {/* Image */}
                <div className="size-20 shrink-0 overflow-hidden rounded-md bg-muted md:size-24">
                  {line.image ? (
                    <img
                      src={line.image}
                      alt={line.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
                      <ShoppingBag className="size-8" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div className="flex justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        {line.name}
                      </h3>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {formatPrice(line.unitPrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeLine(line.productId)}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={`Remove ${line.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity */}
                    <div className="flex items-center rounded-md border border-border">
                      <button
                        onClick={() =>
                          setLineQuantity(line.productId, line.quantity - 1)
                        }
                        className="grid size-8 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="flex w-8 items-center justify-center text-xs font-bold">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() =>
                          setLineQuantity(line.productId, line.quantity + 1)
                        }
                        className="grid size-8 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>

                    <span className="ml-auto text-sm font-bold text-foreground">
                      {formatPrice(line.unitPrice * line.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary sidebar */}
          <aside className="h-fit rounded-md border border-border bg-card p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(subtotal())}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-foreground">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <Separator className="my-4" />

            <Button className="w-full" size="lg" render={<Link href="/checkout" />}>
              Checkout
            </Button>

            <Button
              variant="ghost"
              className="mt-3 w-full"
              size="sm"
              render={<Link href="/shop" />}
            >
              <ArrowLeft className="size-3.5" />
              Continue Shopping
            </Button>
          </aside>
        </div>
      </section>
    </main>
  );
}
