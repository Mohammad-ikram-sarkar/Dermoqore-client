"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, PackageSearch } from "lucide-react";
import { ProductService } from "@/service/product.service";
import type { Product } from "@/service/product.type";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

function formatPrice(price: number | string) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function getPrimaryImage(product: Product) {
  return (
    product.images.find((image) => image.isPrimary) ??
    product.images[0] ?? {
      url: "/Niacinamide.jpg",
      alt: product.name,
    }
  );
}

export default function SearchOverlay({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="mx-auto w-full max-w-3xl sm:max-w-3xl">
        <SearchPanel key={open ? "open" : "closed"} onOpenChange={onOpenChange} />
      </SheetContent>
    </Sheet>
  );
}

function SearchPanel({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  function handleQueryChange(value: string) {
    setQuery(value);
    setError(false);
    if (value.trim().length === 0) {
      setProducts([]);
      setLoading(false);
      setError(false);
      setTouched(false);
    } else {
      setTouched(true);
      setLoading(true);
    }
  }

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length === 0) return;

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const res = await ProductService.searchAll(
          { search: trimmed, limit: 8 },
          { signal: controller.signal },
        );
        if (controller.signal.aborted) return;
        setProducts(res.items);
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  function goToShop() {
    const trimmed = query.trim();
    onOpenChange(false);
    router.push(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : "/shop");
  }

  return (
    <>
      <SheetHeader className="pb-0">
      <SheetTitle>Search</SheetTitle>
      <SheetDescription>Find the right product for your skin</SheetDescription>
    </SheetHeader>

    <div className="px-8 pt-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") goToShop();
          }}
          placeholder="Serum, cleanser, vitamin C..."
          autoFocus
          className="h-12 w-full rounded-md border border-input bg-background pl-9 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button
            onClick={() => handleQueryChange("")}
            className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>

    <div className="max-h-[45vh] overflow-y-auto px-8 py-4">
      {loading && (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Searching...
        </div>
      )}

      {!loading && error && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Something went wrong. Please try again.
        </p>
      )}

      {!loading && !error && touched && products.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <PackageSearch className="size-8 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-foreground">
            No products found
          </p>
          <p className="text-sm text-muted-foreground">
            Try a different keyword or browse the full shop.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ul className="divide-y divide-border">
          {products.map((product) => {
            const image = getPrimaryImage(product);
            return (
              <li key={product.id}>
                <SheetClose
                  render={
                    <Link
                      href={`/shop/${product.slug}`}
                      className="flex items-center gap-4 py-3 transition-colors hover:bg-muted"
                    />
                  }
                >
                  <div className="size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                      src={image.url}
                      alt={image.alt ?? product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">
                        {product.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {product.category.name}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-extrabold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </SheetClose>
              </li>
            );
          })}
        </ul>
      )}
    </div>

    <Separator />

    <div className="px-8 py-4">
      <button
        onClick={goToShop}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-foreground py-2.5 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-foreground hover:text-background"
      >
        <Search className="size-3.5" />
        View all results
      </button>
      </div>
    </>
  );
}