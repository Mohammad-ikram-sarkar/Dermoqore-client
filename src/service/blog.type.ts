export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  /** TipTap JSON document (Prisma `Json`). */
  content: unknown;
  featuredImage: string | null;
  status: BlogStatus;
  featured: boolean;
  categoryId: string;
  authorId: string;
  category: BlogCategory;
  author: BlogAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  data: Blog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type BlogSort = "titleAsc" | "titleDesc" | "newest" | "oldest";

export interface BlogListParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  authorId?: string;
  status?: BlogStatus;
  sort?: BlogSort;
  featured?: boolean;
}
