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
