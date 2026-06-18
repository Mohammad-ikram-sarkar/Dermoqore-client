import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductService } from "@/service/product.service";
import { Button } from "@/components/ui/button";

function formatPrice(price: number | string) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

export default async function FeaturedProducts() {
  const { items } = await ProductService.findAll({
    limit: 1,
    sort: "newest",
  }).catch(() => ({ items: [], meta: { page: 1, limit: 1, total: 0, totalPages: 1 } }));

  const product = items[0];
  if (!product) return null;

  const primaryImage =
    product.images.find((i) => i.isPrimary)?.url ??
    product.images[0]?.url ??
    "/Niacinamide.jpg";

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Featured Product
          </p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Product of the Week
          </h2>
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="group grid overflow-hidden rounded-sm border border-border bg-card md:grid-cols-2"
        >
          <div className="aspect-[4/3] bg-muted md:aspect-auto">
            <img
              src={primaryImage}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10">
            <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {product.category.name}
            </span>
            <h3 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              {product.name}
            </h3>
            {product.shortDescription && (
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {product.shortDescription}
              </p>
            )}
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            <Button
              size="lg"
              className="w-fit"
              render={<Link href={`/shop/${product.slug}`} />}
            >
              <span>Shop Now</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Link>

       
      </div>
    </section>
  );
}
