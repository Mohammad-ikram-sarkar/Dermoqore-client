import type { Brand } from "./brand.type";

export const BrandService = {
  findAll: async (): Promise<Brand[]> => {
    const res = await fetch("/api/brand");
    if (!res.ok) throw new Error("Failed to fetch brands");
    return res.json();
  },

  findById: async (id: string): Promise<Brand> => {
    const res = await fetch(`/api/brand/${id}`);
    if (!res.ok) throw new Error("Failed to fetch brand");
    return res.json();
  },

  create: async (data: { name: string; slug?: string }): Promise<Brand> => {
    const res = await fetch("/api/brand/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create brand");
    return res.json();
  },

  update: async (id: string, data: { name?: string; slug?: string }): Promise<Brand> => {
    const res = await fetch(`/api/brand/admin/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update brand");
    return res.json();
  },

  remove: async (id: string): Promise<void> => {
    const res = await fetch(`/api/brand/admin/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete brand");
  },
};
