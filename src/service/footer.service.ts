import type { FooterData } from "./footer.type";

export const FooterService = {
  findAll: async (): Promise<FooterData[]> => {
    const res = await fetch("/api/footer");
    if (!res.ok) {
      throw new Error("Failed to fetch footer data");
    }
    return res.json();
  },
};
