import type { FooterData } from "./footer.type";

const BASE = process.env.API_URL ?? "http://localhost:8000";

export const FooterService = {
  findAll: async (): Promise<FooterData[]> => {
    const res = await fetch(`${BASE}/api/footer`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch footer data");
    }
    return res.json();
  },
};
