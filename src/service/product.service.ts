import type { Product, ProductDetail, ProductListParams, ProductListResponse } from "./product.type";

const BASE = process.env.API_URL ?? "http://localhost:8000";

function buildQuery(params: ProductListParams) {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 12));

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && key !== "page" && key !== "limit") {
      query.set(key, String(value));
    }
  });

  return query.toString();
}

export const ProductService = {
  findAll: async (params: ProductListParams = {}): Promise<ProductListResponse> => {
    const res = await fetch(`${BASE}/api/product?${buildQuery(params)}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    return res.json();
  },

  findBestSellers: async (limit = 8): Promise<Product[]> => {
    const res = await fetch(`${BASE}/api/product/best-sellers?limit=${limit}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch best sellers: ${res.status}`);
    return res.json();
  },

  findBySlug: async (slug: string): Promise<ProductDetail> => {
    const res = await fetch(`${BASE}/api/product/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
    return res.json();
  },

  findRelated: async (
    categoryId: string,
    excludeId: string,
    limit = 4,
  ): Promise<ProductListResponse> => {
    const res = await ProductService.findAll({
      categoryId,
      limit: limit + 1,
    });

    return {
      ...res,
      items: res.items.filter((p) => p.id !== excludeId).slice(0, limit),
    };
  },
};

