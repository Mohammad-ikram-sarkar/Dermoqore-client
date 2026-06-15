export interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: number | string;
  comparePrice: number | string | null;
  stock: number;
  skinType: string | null;
  status: "DRAFT" | "ACTIVE" | "OUT_OF_STOCK" | "ARCHIVED";
  category: { id: string; name: string };
  brand: { id: string; name: string } | null;
  images: ProductImage[];
  benefits?: { id: string; title: string }[];
  createdAt: string;
}

export interface ProductListResponse {
  items: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  percentage: string | null;
}

export interface ProductUsageStep {
  id: string;
  stepNumber: number;
  content: string;
}

export interface ProductSEO {
  id: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeyword: string | null;
}

/** Full product detail — returned by GET /api/product/:slug */
export interface ProductDetail extends Product {
  description: string | null;
  ingredients: Ingredient[];
  howToUse: ProductUsageStep[];
  seo: ProductSEO | null;
  brand: { id: string; name: string; slug: string; logo: string | null } | null;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  skinType?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "nameAsc" | "priceAsc" | "priceDesc" | "newest";
}
