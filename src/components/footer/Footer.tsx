"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { FooterService } from "@/service/footer.service";
import type { FooterData } from "@/service/footer.type";

export function Footer() {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    FooterService.findAll()
      .then((list) => {
        if (list.length > 0) setData(list[0]);
      })
      .catch((err) => console.error("Footer fetch failed:", err));
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!data) return null;

  const navSection = data.sections[0];
  const addressLines = data.address?.split("\n") ?? [];

  return (
    <footer
      style={{ backgroundColor: "#f0ede6", fontFamily: "'Inter', sans-serif" }}
      className="w-full"
    >
      <div className="max-w-7xl mx-auto px-8 pt-14 pb-10 grid grid-cols-3 gap-8 border-b border-black/8">
        {data.address && (
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase mb-5" style={{ color: "#888" }}>
              Location
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1a1a1a" }}>
              {addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        )}

        {(data.phone || data.email) && (
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase mb-5" style={{ color: "#888" }}>
              Contact
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1a1a1a" }}>
              {data.phone && <span>{data.phone}<br /></span>}
              {data.email && <span>{data.email}</span>}
            </p>
          </div>
        )}

        {data.socialLinks.length > 0 && (
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase mb-5" style={{ color: "#888" }}>
              Follow
            </p>
            <ul className="flex flex-col gap-2">
              {data.socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    className="inline-flex items-center gap-1 text-sm transition-opacity duration-150 hover:opacity-50"
                    style={{ color: "#1a1a1a" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                    <ArrowUpRight size={12} style={{ color: "#c8a96e" }} strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {navSection && (
        <div className="max-w-7xl mx-auto px-8 pt-12 pb-10 grid grid-cols-[160px_1fr] gap-8 items-start">
          <p className="text-[10px] tracking-[0.18em] uppercase pt-3" style={{ color: "#888" }}>
            {navSection.title}
          </p>

          <nav>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(42px, 6vw, 80px)",
                color: "#1a1a1a",
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              {navSection.links.map((link, i) => (
                <span key={link.id} className="inline">
                  <a
                    href={link.href}
                    className="hover:opacity-40 transition-opacity duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                  {i < navSection.links.length - 1 && (
                    <span className="opacity-30"> / </span>
                  )}
                  {(i + 1) % 2 === 0 && i < navSection.links.length - 1 && <br />}
                </span>
              ))}
            </div>
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8 py-5 border-t border-black/8 flex items-center justify-between">
        <button
          onClick={scrollToTop}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#1a1a1a" }}
          className="inline-flex items-center gap-1 text-xs transition-opacity duration-150 hover:opacity-50"
        >
          Back To Top
          <ArrowUpRight size={11} style={{ color: "#c8a96e" }} strokeWidth={2} />
        </button>

        {data.copyright && (
          <p className="text-xs" style={{ color: "#888" }}>
            {data.copyright}
          </p>
        )}
      </div>
    </footer>
  );
}
