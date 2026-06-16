"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import type { ProductDetail } from "@/service/product.type";

function formatPrice(price: number | string) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function getDiscountPercent(price: number | string, compare: number | string): number {
  const p = Number(price);
  const c = Number(compare);
  if (c <= 0) return 0;
  return Math.round(((c - p) / c) * 100);
}

interface Props {
  product: ProductDetail;
}

export default function ProductInfo({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);

  const isOutOfStock = product.stock === 0 || product.status === "OUT_OF_STOCK";
  const isLowStock = !isOutOfStock && product.stock > 0 && product.stock <= 5;

  const discount =
    product.comparePrice ? getDiscountPercent(product.price, product.comparePrice) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb-like context */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
        {product.brand && (
          <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
            {product.brand.name}
          </span>
        )}
        <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
          {product.category.name}
        </span>
        {product.skinType && (
          <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
            {product.skinType}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
        {product.name}
      </h1>

      {/* Short description */}
      {product.shortDescription && (
        <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      )}

      {/* Price block */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold tracking-tight text-foreground">
          {formatPrice(product.price)}
        </span>
        {product.comparePrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.comparePrice)}
            </span>
            {discount > 0 && (
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                -{discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Stock status */}
      <div className="flex items-center gap-2">
        {isOutOfStock ? (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-destructive">
            <span className="block size-2 rounded-full bg-destructive" />
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
            <span className="block size-2 rounded-full bg-amber-500" />
            Only {product.stock} left
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
            <span className="block size-2 rounded-full bg-emerald-500" />
            In Stock
          </span>
        )}
      </div>

      {/* Divider */}
      <hr className="border-border" />

      {/* Quantity + Add to Cart */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Quantity selector */}
        <div className="flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={isOutOfStock}
            className="grid size-11 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <input
            type="number"
            min={1}
            max={product.stock || 1}
            value={quantity}
            onChange={(e) => {
              const v = Math.max(1, Math.min(product.stock || 1, Number(e.target.value) || 1));
              setQuantity(v);
            }}
            disabled={isOutOfStock}
            className="w-12 border-x border-border bg-transparent text-center text-sm font-bold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            onClick={() =>
              setQuantity((q) => Math.min(product.stock || 1, q + 1))
            }
            disabled={isOutOfStock}
            className="grid size-11 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          disabled={isOutOfStock}
          className="group/btn flex h-12 flex-1 items-center justify-center gap-2.5 rounded-lg bg-foreground px-8 text-sm font-bold uppercase tracking-wider text-background transition-all hover:gap-3.5 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="size-[18px] transition-transform group-hover/btn:scale-110" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWished((w) => !w)}
          className={`grid size-12 shrink-0 place-items-center rounded-lg border transition-all ${
            isWished
              ? "border-red-200 bg-red-50 text-red-500"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`size-5 transition-transform ${isWished ? "scale-110 fill-current" : ""}`}
          />
        </button>
      </div>

      {/* Delivery hint */}
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-muted/50 px-4 py-3">
        <Truck className="size-5 shrink-0 text-muted-foreground" />
        <p className="text-[13px] text-muted-foreground">
          <span className="font-semibold text-foreground">Free delivery</span> on
          orders over ৳1,500 · Usually ships within 24 hours
        </p>
      </div>

      {/* Benefits quick list */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Key Benefits
          </p>
          <ul className="grid gap-1.5">
            {product.benefits.map((b) => (
              <li
                key={b.id}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-emerald-500" />
                {b.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
