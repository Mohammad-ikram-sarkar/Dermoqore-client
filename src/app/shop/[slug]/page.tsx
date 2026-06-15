import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductService } from "@/service/product.service";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

type Params = Promise<{ slug: string }>;

/* ---------- dynamic metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await ProductService.findBySlug(slug);

    const title = product.seo?.metaTitle ?? product.name;
    const description =
      product.seo?.metaDescription ??
      product.shortDescription ??
      `${product.name} — premium skincare by Dermoqore`;

    return {
      title: `${title} | Dermoqore`,
      description,
      keywords: product.seo?.metaKeyword ?? undefined,
      openGraph: {
        title,
        description,
        images: product.images
          .filter((img) => img.url)
          .slice(0, 3)
          .map((img) => ({ url: img.url, alt: img.alt ?? product.name })),
      },
    };
  } catch {
    return { title: "Product Not Found | Dermoqore" };
  }
}

/* ---------- page ---------- */
export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await ProductService.findBySlug(slug);
  } catch {
    notFound();
  }

  /* Fetch related products (same category) */
  const related = await ProductService.findRelated(
    product.category.id,
    product.id,
  ).catch(() => ({ items: [], meta: { page: 1, limit: 4, total: 0, totalPages: 1 } }));

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-6 md:px-10 md:py-10">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <ChevronRight className="size-3" />
          <Link
            href={`/shop?categoryId=${product.category.id}`}
            className="transition-colors hover:text-foreground"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="size-3" />
          <span className="truncate text-foreground">{product.name}</span>
        </nav>

        {/* Product hero section */}
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
          <ProductInfo product={product} />
        </section>

        {/* Tabs section */}
        <section className="mt-16">
          <ProductTabs
            description={product.description}
            ingredients={product.ingredients}
            howToUse={product.howToUse}
            benefits={product.benefits ?? []}
          />
        </section>

        {/* Related products */}
        <section className="mt-20 mb-12">
          <RelatedProducts
            products={related.items}
            categoryName={product.category.name}
            categoryId={product.category.id}
          />
        </section>
      </div>
    </main>
  );
}
