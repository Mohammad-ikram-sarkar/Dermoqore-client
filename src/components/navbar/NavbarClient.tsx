"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { AccountIcon } from "./icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store/checkout-store";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarClientProps {
  navLinks: NavLink[];
}

export default function NavbarClient({
  navLinks,
}: NavbarClientProps) {
  const cartCount = useCheckoutStore((s) => s.itemCount());
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop nav ── */}
      <nav className="hidden lg:flex items-center gap-7">
        {navLinks.map(({ label, href }) => {
          const isActive = href === "/" ? pathname === href : pathname?.startsWith(href);
          
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative text-[11px] font-medium tracking-[0.13em] uppercase transition-all duration-300",
                "after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-[#D46B5A] after:transition-all after:duration-300 hover:after:w-full",
                isActive
                  ? "text-[#D46B5A] after:w-full"
                  : "text-muted-foreground hover:text-[#D46B5A]",
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* ── Icon group ── */}
      <div className="flex items-center gap-1">
        {/* Search — hidden on mobile, visible on lg+ */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-9 w-9 lg:flex"
          aria-label="Search"
        >
          <Search className="h-[18px] w-[18px]" />
        </Button>

        {/* Account — hidden on mobile, visible on lg+ */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-9 w-9 lg:flex"
          aria-label="Account"
          render={<Link href="/account" />}
        >
          <AccountIcon className="h-5 w-5" />
        </Button>

        {/* Cart */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9"
          aria-label={`Cart (${cartCount})`}
          render={<Link href="/cart" />}
        >
          <ShoppingBag className="h-[18px] w-[18px]" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center p-0 text-[9px] font-bold rounded-full bg-foreground text-background border-0 justify-center">
              {cartCount}
            </Badge>
          )}
        </Button>

        {/* ── Mobile hamburger ── */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px] px-0 pt-0">
            {/* Sheet header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[17px] font-black tracking-[0.06em] uppercase">
                  Dermoqore
                </span>
                <span className="text-[7.5px] tracking-[0.28em] text-muted-foreground uppercase">
                  Science · Skin · Confidence
                </span>
              </div>
              <SheetClose
                render={
                  <Button variant="ghost" size="icon" className="h-8 w-8" />
                }
              >
                <X className="h-4 w-4" />
              </SheetClose>
            </div>

            {/* Mobile links */}
            <nav className="flex flex-col px-6 pt-4 pb-6">
              {navLinks.map(({ label, href }, i) => {
                const isActive = href === "/" ? pathname === href : pathname?.startsWith(href);
                return (
                <div key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-3.5 text-[12px] font-medium tracking-[0.15em] uppercase transition-colors",
                      isActive
                        ? "text-[#D46B5A]"
                        : "text-muted-foreground hover:text-[#D46B5A]",
                    )}
                  >
                    {label}
                  </Link>
                  {i < navLinks.length - 1 && <Separator />}
                </div>
              )})}

              {/* Mobile icon row */}
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Account"
                  render={<Link href="/account" />}
                >
                  <AccountIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative h-9 w-9"
                  render={<Link href="/cart" aria-label="Cart" />}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center p-0 text-[9px] font-bold rounded-full bg-foreground text-background border-0 justify-center">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
