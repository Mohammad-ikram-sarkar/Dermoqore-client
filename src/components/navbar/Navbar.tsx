import Link from "next/link";
import NavbarClient from "./NavbarClient";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  cartCount?: number;
  activeHref?: string;
}

export default function Navbar({ cartCount = 2, activeHref = "/" }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* ── Logo ── */}
        <Link href="/" className="flex flex-col gap-0.5 no-underline">
          <span className="text-[22px] font-black tracking-[0.06em] leading-none text-foreground uppercase">
            Dermoqore
          </span>
          <span className="text-[8px] font-normal tracking-[0.28em] text-muted-foreground uppercase">
            Science · Skin · Confidence
          </span>
        </Link>

        <NavbarClient
          navLinks={navLinks}
          cartCount={cartCount}
          activeHref={activeHref}
        />
      </div>
    </header>
  );
}
