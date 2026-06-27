"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const NAVY = "#1a2466";
const FALLBACK = ["/brti1.jpeg", "/btri2.jpeg"];

interface Props {
  images?: string[];
}

export default function BTRISection({ images }: Props) {
  const reportImages = images?.length ? images : FALLBACK;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const open = (idx: number) => setLightboxIdx(idx);
  const close = () => setLightboxIdx(null);
  const prev = () =>
    setLightboxIdx((i) => (i !== null ? (i - 1 + reportImages.length) % reportImages.length : 0));
  const next = () =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % reportImages.length : 0));

  return (
    <>
      <section className="bg-white px-4 py-10 md:py-12">
        <div
          className="mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-8 sm:flex-row sm:items-center sm:gap-10 sm:px-10"
          style={{ background: "#edf0fb" }}
        >
          {/* ── Left: text ── */}
          <div className="flex-1 space-y-3">
            <h2 className="text-xl font-bold" style={{ color: NAVY }}>
              BTRI Lab Test Report
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#3a4a7a" }}>
              Dermoqore Spot Correcting Serum বাংলাদেশ টেক্সটাইল রিসার্চ ইনস্টিটিউট (BTRI)
              কর্তৃক পরীক্ষিত এবং নিরাপদ প্রমাণিত।
            </p>
            <button
              onClick={() => open(0)}
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: NAVY }}
            >
              সম্পূর্ণ রিপোর্ট দেখুন
              <ArrowRight className="size-3.5" />
            </button>
          </div>

          {/* ── Right: report image cards + BTRI stamp ── */}
          <div className="relative flex shrink-0 items-center justify-center gap-3">
            {reportImages.map((src, i) => (
              <button
                key={i}
                onClick={() => open(i)}
                className="group relative h-36 w-24 overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/8 transition-transform hover:-translate-y-1 hover:shadow-lg sm:h-44 sm:w-28"
              >
                <img
                  src={src}
                  alt={`BTRI Lab Report ${i + 1}`}
                  className="h-full w-full object-cover object-top"
                />
              </button>
            ))}

            {/* BTRI TESTED stamp — overlapping last card */}
            <div
              className="absolute -bottom-4 -right-4 flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 bg-white shadow-xl sm:h-24 sm:w-24"
              style={{ borderColor: NAVY }}
            >
              <span className="text-[11px] font-extrabold leading-none tracking-widest" style={{ color: NAVY }}>
                BTRI
              </span>
              <span className="mt-0.5 text-[8px] font-bold leading-none tracking-widest" style={{ color: NAVY }}>
                TESTED
              </span>
              <span className="mt-1 px-1 text-center text-[7px] font-medium leading-tight" style={{ color: "#3a4a7a" }}>
                BANGLADESH
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </button>

          {/* Prev */}
          {reportImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[88vh] max-w-3xl overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={reportImages[lightboxIdx]}
              alt={`BTRI Report ${lightboxIdx + 1}`}
              className="h-full max-h-[88vh] w-auto object-contain"
            />
            <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-[11px] text-white">
              {lightboxIdx + 1} / {reportImages.length}
            </span>
          </div>

          {/* Next */}
          {reportImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight className="size-5" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
