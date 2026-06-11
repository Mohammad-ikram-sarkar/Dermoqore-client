import type { SVGProps } from "react";

function DeliveryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="9" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 13h5l3 4v4h-8V13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7" cy="23" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23" cy="23" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12h4M24 12h4M4 20h4M24 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ReturnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 16a10 10 0 1 1 2.5 6.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 22v-6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SupportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 16h4M24 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 8.7A10 10 0 0 1 16 6c2.4 0 4.6.8 6.3 2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.9 21A10 10 0 0 0 16 26c4 0 7.5-2.3 9.2-5.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const items = [
  {
    Icon: DeliveryIcon,
    title: "Fast Delivery",
    subtitle: "All over Bangladesh",
  },
  {
    Icon: CashIcon,
    title: "Cash on Delivery",
    subtitle: "Hassle-free payment",
  },
  {
    Icon: ReturnIcon,
    title: "Easy Returns",
    subtitle: "7 day return policy",
  },
  {
    Icon: SupportIcon,
    title: "24/7 Support",
    subtitle: "We're here to help",
  },
];

export default function TrustBar() {
  return (
    <section className="w-full border-y border-border py-5 mb-1">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex divide-x divide-border overflow-x-auto">
          {items.map(({ Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex min-w-[140px] flex-1 items-center gap-3 px-6 first:pl-0 last:pr-0"
            >
              <Icon className="h-9 w-9 shrink-0 text-foreground/70" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-foreground uppercase">
                  {title}
                </span>
                <span className="text-[10px] leading-snug tracking-[0.04em] text-muted-foreground">
                  {subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
