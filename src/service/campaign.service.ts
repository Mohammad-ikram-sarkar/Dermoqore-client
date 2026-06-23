const BASE = process.env.API_URL ?? "http://localhost:8000";
const PUBLIC_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type CampaignStatus = "DRAFT" | "ACTIVE" | "ENDED";

export interface CampaignImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
}

export interface WhySection {
  heading: string;
  items: string[];
}

export interface Testimonial {
  name: string;
  location?: string;
  text: string;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number;
    images: { url: string; alt?: string; isPrimary: boolean; sortOrder: number }[];
    category: { id: string; name: string };
    brand?: { id: string; name: string; logo?: string };
  };
  heroImages: CampaignImage[];
  videoUrl?: string;
  videoTitle?: string;
  campaignPrice?: number;
  comparePrice?: number;
  whySections?: WhySection[];
  benefits?: string[];
  testimonials?: Testimonial[];
  included?: string[];
  offerBadge?: string;
  ctaText?: string;
  phoneNumber?: string;
  formTitle?: string;
  status: CampaignStatus;
  createdAt: string;
}

export interface PlaceCampaignOrderPayload {
  campaignId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryZone: "INSIDE_DHAKA" | "OUTSIDE_DHAKA";
  quantity: number;
  notes?: string;
}

export const CampaignService = {
  findBySlug: async (slug: string): Promise<Campaign> => {
    const res = await fetch(`${BASE}/api/campaign/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Campaign not found: ${res.status}`);
    return res.json();
  },

  placeOrder: async (slug: string, payload: PlaceCampaignOrderPayload): Promise<unknown> => {
    const res = await fetch(`${PUBLIC_BASE}/api/campaign/${slug}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Order failed" }));
      throw new Error(err.message ?? "Order failed");
    }
    return res.json();
  },
};
