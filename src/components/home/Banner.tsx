import { BannerService } from "@/service/banner.service";
import BannerCarousel from "./BannerCarousel";

const fallbackBanner = {
  id: "dermoqore-serum-hero",
  title: "Real Ingredients.\nReal Results.",
  tag: "Science-Backed Skincare",
  description:
    "Target dark spots, uneven tone and repair your skin barrier with DermoQore Serums.",
  imageUrl: "/ChatGPT Image Jun 12, 2026, 10_30_13 AM.png",
};

export default async function Banner() {
  const data = await BannerService.findAll().catch(() => []);

  const banners = data.filter((b) => b.isActive && b.imageUrl);

  return <BannerCarousel banners={banners.length > 0 ? banners : [fallbackBanner]} />;
}
