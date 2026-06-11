import { FooterService } from "@/service/footer.service";
import { Footer } from "./Footer";

export async function FooterServer() {
  const list = await FooterService.findAll().catch(() => []);
  if (list.length === 0) return null;
  return <Footer data={list[0]} />;
}
