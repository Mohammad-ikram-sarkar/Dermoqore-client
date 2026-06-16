import type { SVGProps } from "react";

/* ── Inline SVG icons (thin line-art style) ── */

function ScienceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18 6v18L8 38a4 4 0 0 0 3.2 6.4h25.6A4 4 0 0 0 40 38L30 24V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15" cy="34" r="2" fill="currentColor" />
      <circle cx="24" cy="38" r="2" fill="currentColor" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}

function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 42C24 42 8 34 8 18C8 10 14 6 22 6C28 6 36 8 38 18C40 28 32 38 24 42Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 42V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 30C20 26 14 22 12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FaceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="20" r="2" fill="currentColor" />
      <circle cx="30" cy="20" r="2" fill="currentColor" />
      <path d="M18 30c1.5 2 4.5 3 6 3s4.5-1 6-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function VeganIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 40C24 40 10 30 10 18a8 8 0 0 1 14-5.3A8 8 0 0 1 38 18c0 12-14 22-14 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 40V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 28c-3-3-7-4-9-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 32c3-3 7-4 9-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NoChemIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 6L8 36h32L24 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 20v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="32" r="1.5" fill="currentColor" />
      <path d="M10 42h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

function TrustedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 4L6 12v14c0 10 8 18 18 20 10-2 18-10 18-20V12L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 24l6 6 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ── */

const benefits = [
  {
    Icon: ScienceIcon,
    line1: "Science",
    line2: "Backed Formulas",
  },
  {
    Icon: LeafIcon,
    line1: "Safe & Effective",
    line2: "Ingredients",
  },
  {
    Icon: FaceIcon,
    line1: "Made for",
    line2: "Bangladeshi Skin",
  },
  {
    Icon: VeganIcon,
    line1: "Cruelty Free",
    line2: "& Vegan",
  },
  {
    Icon: NoChemIcon,
    line1: "No Harmful",
    line2: "Chemicals",
  },
  {
    Icon: TrustedIcon,
    line1: "Trusted by",
    line2: "Thousands",
  },
];

/* ── Component ── */

export default function BenefitsSection() {
  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Heading */}
        <h2 className="mb-6 text-center text-sm font-black tracking-[0.18em] text-foreground uppercase md:text-base">
          Why Choose Dermoqore?
        </h2>

        {/* Benefits bar */}
        <div className="flex divide-x divide-border overflow-x-auto rounded-sm border border-border">
          {benefits.map(({ Icon, line1, line2 }) => (
            <div
              key={line1}
              className="flex min-w-[120px] flex-1 items-center gap-3 px-5 py-4 md:px-6 md:py-5"
            >
              <Icon className="h-9 w-9 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold leading-tight tracking-[0.06em] text-foreground uppercase">
                  {line1}
                </span>
                <span className="text-[10px] leading-tight tracking-[0.06em] text-muted-foreground uppercase">
                  {line2}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
