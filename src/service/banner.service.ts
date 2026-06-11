import type { Banner } from "./banner.type";

const BASE = process.env.API_URL ?? "http://localhost:8000";

export const BannerService = {
  findAll: async (): Promise<Banner[]> => {
    const res = await fetch(`${BASE}/api/banner`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 s
    });
    if (!res.ok) throw new Error(`Failed to fetch banners: ${res.status}`);
    return res.json();
  },
};
