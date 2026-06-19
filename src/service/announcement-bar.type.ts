export interface AnnouncementBar {
  id: string;
  message: string;
  link: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
}
