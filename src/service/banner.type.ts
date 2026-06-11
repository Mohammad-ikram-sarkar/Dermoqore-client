export interface Client {
  id: string;
  name: string;
  segment: string;
  status: string;
  avatar: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  title: string;
  tag: string;
  description: string | null;
  imageType: string;
  device: string;
  imageUrl: string | null;
  status: string;
  isActive: boolean;
  clientId: string;
  client: Client;
  createdAt: string;
  updatedAt: string;
}
