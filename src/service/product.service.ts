import type { ProductListParams, ProductListResponse } from "./product.type";

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
};
