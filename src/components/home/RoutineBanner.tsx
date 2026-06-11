import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { SVGProps } from "react";

/* ── Icons ── */
function BundleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="6" y="10" width="20" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 18h10M16 13v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 4h10l14 14-10 10L4 14V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

function BottleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 4h8v4l3 4v14a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V12l3-4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 4h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const features = [
  { Icon: BundleIcon, label: "Special Bundle\nOffers" },
  { Icon: TagIcon,   label: "Save More on\nCombos" },
  { Icon: BottleIcon, label: "Complete Skincare\nSolutions" },
];

export default function RoutineBanner() {
  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center overflow-hidden rounded-sm bg-[#f0ece6] px-6 py-8 md:px-10 md:py-10">

          {/* Product image */}
          <div className="relative mr-8 hidden h-36 w-32 shrink-0 md:block lg:h-44 lg:w-40">
            <Image
              src="/Niacinamide.jpg"
              alt="Skincare routine products"
              fill
              className="object-contain drop-shadow-md"
              sizes="160px"
            />
          </div>

          {/* Headline + CTA */}
          <div className="mr-auto flex flex-col gap-3">
            <h2 className="font-heading text-2xl font-black leading-tight tracking-[0.04em] text-foreground uppercase md:text-3xl">
              Build Your<br />Perfect Routine
            </h2>
            <p className="text-[12px] tracking-[0.06em] text-muted-foreground">
              Cleanse. Treat. Moisturize. Protect.
            </p>
            <Button
              className="mt-1 w-fit"
              size="sm"
              render={<Link href="/shop/kits" />}
            >
              Shop Routine Kits
            </Button>
          </div>

          {/* Feature icons */}
          <div className="ml-6 hidden items-center gap-8 lg:flex">
            {features.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="h-9 w-9 text-foreground/70" aria-hidden="true" />
                <span className="whitespace-pre-line text-[10px] font-medium leading-snug tracking-[0.08em] text-foreground/80 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
