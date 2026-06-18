import Banner from "@/components/home/Banner";
import BenefitsSection from "@/components/home/BenefitsSection";
import BestSellers from "@/components/home/BestSellers";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import IngredientSpotlight from "@/components/home/IngredientSpotlight";
import Realface from "@/components/home/Realface";
import RoutineBanner from "@/components/home/RoutineBanner";
import Skin from "@/components/home/Skin";
import TrustBar from "@/components/home/TrustBar";

export default function Home() {
  return (
    <div>
      <Banner />
      
      <Skin />
      <FeaturedProducts />
      <BestSellers />
      <Realface />
      
      <BenefitsSection />
      <IngredientSpotlight />
      <RoutineBanner />
      <TrustBar />
    </div>
  );
}
