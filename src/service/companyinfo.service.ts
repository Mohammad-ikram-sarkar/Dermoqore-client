import type { CompanyInfo } from "./companyinfo.type";

const BASE = process.env.API_URL ?? "http://localhost:8000";

export const CompanyInfoService = {
  findFirst: async (): Promise<CompanyInfo | null> => {
    try {
      const res = await fetch(`${BASE}/api/companyinfo`, {
        next: { revalidate: 300 },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) ? (data[0] ?? null) : null;
    } catch {
      return null;
    }
  },
};
