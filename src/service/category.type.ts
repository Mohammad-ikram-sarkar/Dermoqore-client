export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  parent?: Category | null;
  children: Category[];
  createdAt: string;
  updatedAt: string;
}
