import type { AnnouncementBar } from "./announcement-bar.type";

const BASE = process.env.API_URL ?? "http://localhost:8000";

export const AnnouncementBarService = {
  findActive: async (): Promise<AnnouncementBar[]> => {
    const res = await fetch(`${BASE}/api/announcement-bar/active`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Failed to fetch announcement bars: ${res.status}`);
    return res.json();
  },
};
