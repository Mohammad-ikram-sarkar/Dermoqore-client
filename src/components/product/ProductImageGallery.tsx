"use client";

import { useState, useRef, useCallback } from "react";
import type { ProductImage } from "@/service/product.type";

interface Props {
  images: ProductImage[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: Props) {
  const sortedImages = [...images].sort((a, b) => a.sortOrder - b.sortOrder);
  const fallback: ProductImage[] =
    sortedImages.length > 0
      ? sortedImages
      : [{ id: "fallback", url: "/Niacinamide.jpg", alt: productName, isPrimary: true, sortOrder: 0 }];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);

  const selected = fallback[selectedIndex];

  /* ---------- zoom handling ---------- */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPos({ x, y });
    },
    [],
  );

  /* ---------- touch swipe ---------- */
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0 && selectedIndex < fallback.length - 1) {
        setSelectedIndex((i) => i + 1);
      } else if (diff > 0 && selectedIndex > 0) {
        setSelectedIndex((i) => i - 1);
      }
    }
  };

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnail strip */}
      <div className="flex gap-2 md:flex-col md:gap-3">
        {fallback.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelectedIndex(i)}
            className={`relative size-16 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 md:size-[72px] ${
              i === selectedIndex
                ? "border-foreground ring-2 ring-foreground/20"
                : "border-border opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img.url}
              alt={img.alt ?? `${productName} thumbnail ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        ref={mainRef}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 cursor-crosshair overflow-hidden rounded-xl border border-border bg-muted"
      >
        <div className="relative aspect-square w-full">
          <img
            src={selected.url}
            alt={selected.alt ?? productName}
            className="h-full w-full object-cover transition-opacity duration-300"
            style={
              isZooming
                ? {
                    transform: "scale(2)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transition: "transform-origin 0.1s ease-out",
                  }
                : { transform: "scale(1)" }
            }
          />
        </div>

        {/* Dot indicators for mobile */}
        {fallback.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
            {fallback.map((_, i) => (
              <span
                key={i}
                className={`block size-2 rounded-full transition-all ${
                  i === selectedIndex
                    ? "scale-125 bg-foreground"
                    : "bg-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
