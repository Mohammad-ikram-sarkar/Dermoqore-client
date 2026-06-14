export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  products: { id: string }[];
  createdAt: string;
}
