"use client";

import { memo } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FooterData } from "@/service/footer.type";

interface FooterProps {
  data: FooterData;
}

export const Footer = memo(function Footer({ data }: FooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const addressLines = data.address?.split("\n") ?? [];

  // Separate the big nav section (first section) from column link sections (rest)
  const [navSection, ...columnSections] = data.sections;

  return (
    <footer className="w-full bg-[#f0ede6]">

      {/* ── Top grid: logo/desc + link columns + contact + social ── */}
      <div className="mx-auto max-w-[1400px] border-b border-black/8 px-6 py-12 md:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(3,1fr)]">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[22px] font-black tracking-[0.06em] text-foreground uppercase">
                Dermoqore
              </span>
              <p className="mt-0.5 text-[8px] font-normal tracking-[0.28em] text-muted-foreground uppercase">
                Science · Skin · Confidence
              </p>
            </div>
            {data.description && (
              <p className="max-w-xs text-[12px] leading-relaxed text-muted-foreground">
                {data.description}
              </p>
            )}
            {data.socialLinks.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  Follow
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {data.socialLinks.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[12px] text-foreground transition-opacity hover:opacity-50"
                      >
                        {social.name}
                        <ArrowUpRight size={11} className="text-amber-600" strokeWidth={2} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Dynamic link columns */}
          {columnSections.map((section) => (
            <div key={section.id} className="flex flex-col gap-4">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {section.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-foreground transition-opacity hover:opacity-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          {(data.address || data.phone || data.email) && (
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Contact
              </p>
              <div className="flex flex-col gap-3 text-[12px] leading-relaxed text-foreground">
                {data.address && (
                  <p>
                    {addressLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < addressLines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )}
                {data.phone && (
                  <a href={`tel:${data.phone}`} className="transition-opacity hover:opacity-50">
                    {data.phone}
                  </a>
                )}
                {data.email && (
                  <a href={`mailto:${data.email}`} className="transition-opacity hover:opacity-50">
                    {data.email}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Big nav links ── */}
      {navSection && (
        <div className="mx-auto max-w-[1400px] border-b border-black/8 px-6 py-10 md:px-10">
          <p className="mb-4 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {navSection.title}
          </p>
          <nav
            className={cn(
              "font-heading font-normal leading-[1.15] text-foreground",
              "text-[clamp(28px,5vw,72px)]",
            )}
          >
            {navSection.links.map((link, i) => (
              <span key={link.id} className="inline">
                <a
                  href={link.href}
                  className="inline-block transition-opacity duration-200 hover:opacity-40"
                >
                  {link.label}
                </a>
                {i < navSection.links.length - 1 && (
                  <span className="opacity-30"> / </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      )}

      {/* ── Bottom bar ── */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row md:px-10">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 text-[11px] text-foreground transition-opacity hover:opacity-50"
        >
          Back To Top
          <ArrowUpRight size={11} className="text-amber-600" strokeWidth={2} />
        </button>

        {data.copyright && (
          <p className="text-[11px] text-muted-foreground">{data.copyright}</p>
        )}
      </div>

    </footer>
  );
});
