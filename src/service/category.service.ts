import type { Category } from "./category.type";

const BASE = process.env.API_URL ?? "http://localhost:8000";

export const CategoryService = {
  findAll: async (): Promise<Category[]> => {
    const res = await fetch(`${BASE}/api/category`, {
      next: { revalidate: 300 }, // ISR: revalidate every 5 min
    });
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    return res.json();
  },
};
