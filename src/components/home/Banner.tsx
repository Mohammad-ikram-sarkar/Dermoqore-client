import { BannerService } from "@/service/banner.service";
import BannerCarousel from "./BannerCarousel";

export default async function Banner() {
  const data = await BannerService.findAll().catch(() => []);

  const banners = data.filter((b) => b.isActive && b.imageUrl);

  if (banners.length === 0) return null;

  return <BannerCarousel banners={banners} />;
}
