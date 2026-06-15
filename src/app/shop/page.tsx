import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { CategoryService } from "@/service/category.service";
import { ProductService } from "@/service/product.service";
import ProductCard from "@/components/shop/ProductCard";

type ShopSearchParams = Promise<Record<string, string | string[] | undefined>>;

const skinTypes = ["All Skin Types", "Normal", "Oily", "Dry", "Combination", "Sensitive"];

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function buildHref(
  params: Record<string, string | string[] | undefined>,
  updates: Record<string, string | number | undefined>,
) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    const normalized = Array.isArray(value) ? value[0] : value;
    if (normalized) query.set(key, normalized);
  });

  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      query.delete(key);
    } else {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}


export default async function ShopPage({
  searchParams,
}: {
  searchParams: ShopSearchParams;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(getParam(params, "page") ?? 1));
  const search = getParam(params, "search") ?? "";
  const categoryId = getParam(params, "categoryId") ?? "";
  const skinType = getParam(params, "skinType") ?? "";
  const sort = getParam(params, "sort") ?? "newest";

  const [products, categories] = await Promise.all([
    ProductService.findAll({
      page,
      limit: 8,
      search,
      categoryId,
      skinType: skinType === "All Skin Types" ? "" : skinType,
      sort: sort as "nameAsc" | "priceAsc" | "priceDesc" | "newest",
    }).catch(() => ({
      items: [],
      meta: { page: 1, limit: 8, total: 0, totalPages: 1 },
    })),
    CategoryService.findAll().catch(() => []),
  ]);

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Shop Skincare
            </p>
            <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
              Products for every routine
            </h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Browse active formulas, filter by concern, and choose the right care
            for your skin.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-md border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <SlidersHorizontal className="size-4" />
              <h2 className="text-sm font-bold uppercase tracking-wide">Filters</h2>
            </div>

            <form action="/shop" className="space-y-5">
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Search
                </span>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    name="search"
                    defaultValue={search}
                    placeholder="Serum, cleanser..."
                    className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Category
                </span>
                <select
                  name="categoryId"
                  defaultValue={categoryId}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Skin Type
                </span>
                <select
                  name="skinType"
                  defaultValue={skinType}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  {skinTypes.map((item) => (
                    <option key={item} value={item === "All Skin Types" ? "" : item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Sort
                </span>
                <select
                  name="sort"
                  defaultValue={sort}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="newest">Newest</option>
                  <option value="nameAsc">Name A-Z</option>
                  <option value="priceAsc">Price Low to High</option>
                  <option value="priceDesc">Price High to Low</option>
                </select>
              </label>

              <button className="h-10 w-full rounded-md bg-primary px-4 text-sm font-bold uppercase tracking-wide text-primary-foreground">
                Apply
              </button>
            </form>
          </aside>

          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {products.items.length} of {products.meta.total} products
              </p>
              {(search || categoryId || skinType) && (
                <Link
                  href="/shop"
                  className="text-sm font-semibold text-foreground underline underline-offset-4"
                >
                  Clear filters
                </Link>
              )}
            </div>

            {products.items.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {products.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-border p-12 text-center">
                <h2 className="text-lg font-semibold text-foreground">No products found</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another search or clear the filters.
                </p>
              </div>
            )}

            {products.meta.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link
                  href={buildHref(params, { page: Math.max(1, page - 1) })}
                  aria-disabled={page <= 1}
                  className="rounded-md border border-border px-4 py-2 text-sm font-semibold aria-disabled:pointer-events-none aria-disabled:opacity-40"
                >
                  Previous
                </Link>
                <span className="text-sm text-muted-foreground">
                  Page {products.meta.page} of {products.meta.totalPages}
                </span>
                <Link
                  href={buildHref(params, {
                    page: Math.min(products.meta.totalPages, page + 1),
                  })}
                  aria-disabled={page >= products.meta.totalPages}
                  className="rounded-md border border-border px-4 py-2 text-sm font-semibold aria-disabled:pointer-events-none aria-disabled:opacity-40"
                >
                  Next
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
