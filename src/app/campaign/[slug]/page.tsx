import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignService } from "@/service/campaign.service";
import { FooterServer } from "@/components/footer/FooterServer";
import CampaignPageClient from "./CampaignPageClient";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const campaign = await CampaignService.findBySlug(slug);
    return {
      title: `${campaign.title} | Dermoqore`,
      description: campaign.subtitle ?? `${campaign.title} — special offer from Dermoqore`,
      openGraph: {
        title: campaign.title,
        description: campaign.subtitle ?? campaign.title,
        images: campaign.heroImages.slice(0, 1).map((img) => ({ url: img.url })),
      },
    };
  } catch {
    return { title: "Campaign Not Found | Dermoqore" };
  }
}

export default async function CampaignPage({ params }: { params: Params }) {
  const { slug } = await params;

  let campaign;
  try {
    campaign = await CampaignService.findBySlug(slug);
  } catch {
    notFound();
  }

  if (campaign.status !== "ACTIVE") notFound();

  return (
    <>
      <CampaignPageClient campaign={campaign} />
      
    </>
  );
}
