import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog - Dermoqore",
  description: "Read the latest news and articles from Dermoqore.",
};

const blogPosts = [
  {
    id: 1,
    title: "5 Must-Have Skincare Products for Glowing Skin",
    date: "January 2, 2025",
    excerpt: "Discover the ultimate skincare routine with these five essential products tha...",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    link: "/blog/must-have-skincare-products",
  },
  {
    id: 2,
    title: "Self-Care Sunday: How to Create a Relaxing Beauty Ritual",
    date: "December 20, 2024",
    excerpt: "Transform your Sundays with this step-by-step guide to creating a rejuvenati...",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    link: "/blog/self-care-sunday",
  },
  {
    id: 3,
    title: "The Top Makeup Trends for 2025 You Need to Try",
    date: "December 28, 2024",
    excerpt: "From bold eyes to natural finishes, explore the hottest makeup trends se...",
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=800",
    link: "/blog/makeup-trends-2025",
  },
  {
    id: 4,
    title: "Winter Beauty Hacks: Protect Your Skin from the Cold",
    date: "December 15, 2024",
    excerpt: "Learn how to keep your skin soft, hydrated, and glowing even during th...",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800",
    link: "/blog/winter-beauty-hacks",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FFFDFB] py-16 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-4xl text-foreground md:text-5xl lg:text-6xl">
            The Beauty Edit
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our latest tips, trends, and tutorials for a radiant you. Read insights from our skincare experts.
          </p>
        </div>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
          {blogPosts.map((post) => (
            <article key={post.id} className="group flex cursor-pointer flex-col gap-6 sm:flex-row">
              {/* Image Container */}
              <div className="relative w-full overflow-hidden bg-gray-100 sm:w-1/2" style={{ aspectRatio: '4/5' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              
              {/* Content Container */}
              <div className="flex w-full flex-col justify-center py-2 sm:w-1/2">
                <Link href={post.link} className="inline-block">
                  <h2 className="mb-3 font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-[#D46B5A] md:text-2xl lg:text-[1.7rem]">
                    {post.title}
                  </h2>
                </Link>
                <p className="mb-4 text-sm text-gray-500">{post.date}</p>
                <p className="mb-6 leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <Link 
                  href={post.link} 
                  className="inline-flex w-fit items-center text-sm font-semibold tracking-wide text-[#D46B5A] transition-colors hover:text-[#b85a4b]"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
