import Link from "next/link";
import { CategoryService } from "@/service/category.service";
import NavbarClient from "./NavbarClient";

interface NavbarProps {
  cartCount?: number;
  activeHref?: string;
}

export default async function Navbar({
  cartCount = 2,
  activeHref = "/",
}: NavbarProps) {
  const categories = await CategoryService.findAll().catch(() => []);

  const navLinks = categories.map((c) => ({
    label: c.name,
    href: `/${c.slug}`,
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* ── Logo ── */}
        <Link href="/" className="flex flex-col gap-0.5 no-underline">
          <span className="text-[22px] font-black tracking-[0.06em] leading-none text-muted-foreground uppercase">
            Dermoqore
          </span>
          <span className="text-[8px] font-normal tracking-[0.28em] text-muted-foreground uppercase">
            Science · Skin · Confidence
          </span>
        </Link>

        {/* Nav + icons delegated to client component for interactivity */}
        <NavbarClient
          navLinks={navLinks}
          cartCount={cartCount}
          activeHref={activeHref}
        />
      </div>
    </header>
  );
}
