import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { BlogService } from "@/service/blog.service";
import type { Blog } from "@/service/blog.type";
import BlogContent from "@/components/blog/BlogContent";

type Params = Promise<{ slug: string }>;

/* ---------- dynamic metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await BlogService.findBySlug(slug);

    return {
      title: `${blog.title} | Dermoqore`,
      description: blog.excerpt ?? `${blog.title} — from the Dermoqore blog`,
      openGraph: {
        title: blog.title,
        description: blog.excerpt ?? blog.title,
        images: blog.featuredImage ? [{ url: blog.featuredImage }] : undefined,
      },
    };
  } catch {
    return { title: "Article Not Found | Dermoqore" };
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* ---------- page ---------- */
export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params;

  let blog: Blog;
  try {
    blog = await BlogService.findBySlug(slug);
  } catch {
    notFound();
  }

  // Don't expose draft/archived posts on the public client.
  if (blog.status !== "PUBLISHED") notFound();

  const related = await BlogService.findRelated(
    blog.id,
    blog.category.id,
    3,
  ).catch(() => [] as Blog[]);

  return (
    <main className="flex-1 bg-[#FFFDFB]">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <ChevronRight className="size-3" />
          <span className="truncate text-foreground">{blog.title}</span>
        </nav>

        {/* Hero */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link
              href={`/blog?categoryId=${blog.category.id}`}
              className="rounded-full bg-muted px-3 py-1 font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {blog.category.name}
            </Link>
            <span>·</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>

          <h1 className="mb-4 font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {blog.excerpt}
            </p>
          )}

          <p className="mt-5 text-sm text-muted-foreground">
            By <span className="font-medium text-foreground/80">{blog.author.name}</span>
          </p>
        </header>

        {/* Featured image */}
        {blog.featuredImage && (
          <div className="mb-10 overflow-hidden rounded-xl bg-gray-100">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Body */}
        <article>
          <BlogContent content={blog.content} />
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border/60 pt-10">
            <h2 className="mb-6 font-serif text-2xl text-foreground">
              Read More
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3"
                >
                  <div
                    className="relative w-full overflow-hidden bg-gray-100"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="font-serif text-base leading-snug text-foreground transition-colors group-hover:text-[#D46B5A]">
                    {post.title}
                  </h3>
                  <span className="inline-flex w-fit items-center text-sm font-semibold tracking-wide text-[#D46B5A]">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
