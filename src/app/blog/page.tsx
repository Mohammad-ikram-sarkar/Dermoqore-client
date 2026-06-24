import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogService } from "@/service/blog.service";
import type { Blog } from "@/service/blog.type";

export const metadata = {
  title: "Blog - Dermoqore",
  description: "Read the latest news and articles from Dermoqore.",
};

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  let posts: Blog[] = [];
  try {
    const res = await BlogService.findPublished({ limit: 50 });
    posts = res.data;
  } catch {
    posts = [];
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-16 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-4xl text-foreground md:text-5xl lg:text-6xl">
            The Beauty Edit
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our latest tips, trends, and tutorials for a radiant you.
            Read insights from our skincare experts.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No articles published yet. Please check back soon.
          </p>
        ) : (
          /* Blog Grid */
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex cursor-pointer flex-col gap-6 sm:flex-row"
              >
                {/* Image Container */}
                <div
                  className="relative w-full overflow-hidden bg-gray-100 sm:w-1/2"
                  style={{ aspectRatio: "4/5" }}
                >
                  <img
                    src={post.featuredImage || PLACEHOLDER_IMAGE}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                </div>

                {/* Content Container */}
                <div className="flex w-full flex-col justify-center py-2 sm:w-1/2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block"
                  >
                    <h2 className="mb-3 font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-[#D46B5A] md:text-2xl lg:text-[1.7rem]">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mb-4 text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </p>
                  {post.excerpt && (
                    <p className="mb-6 leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex w-fit items-center text-sm font-semibold tracking-wide text-[#D46B5A] transition-colors hover:text-[#b85a4b]"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
