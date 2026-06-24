import type {
  Blog,
  BlogListParams,
  BlogListResponse,
} from "./blog.type";

const BASE = process.env.API_URL ?? "http://localhost:8000";

function buildQuery(params: BlogListParams) {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 10));

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== "" &&
      key !== "page" &&
      key !== "limit"
    ) {
      query.set(key, String(value));
    }
  });

  return query.toString();
}

export const BlogService = {
  findPublished: async (
    params: BlogListParams = {},
  ): Promise<BlogListResponse> => {
    const res = await fetch(`${BASE}/api/blog/published?${buildQuery(params)}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    return res.json();
  },

  findFeatured: async (limit = 5): Promise<Blog[]> => {
    const res = await fetch(`${BASE}/api/blog/featured?limit=${limit}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch featured blogs: ${res.status}`);
    return res.json();
  },

  findBySlug: async (slug: string): Promise<Blog> => {
    const res = await fetch(`${BASE}/api/blog/slug/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);
    return res.json();
  },

  findRelated: async (
    id: string,
    categoryId: string,
    limit = 3,
  ): Promise<Blog[]> => {
    const res = await fetch(
      `${BASE}/api/blog/${id}/related?categoryId=${categoryId}&limit=${limit}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) throw new Error(`Failed to fetch related blogs: ${res.status}`);
    return res.json();
  },
};
