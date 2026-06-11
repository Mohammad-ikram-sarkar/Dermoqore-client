"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const beforeAfterPairs = [
  {
    id: 1,
    before: "/before1.png",
    after: "/after.png",
  },
  {
    id: 2,
    before: "/before.png",
    after: "/after.png",
  },
  {
    id: 3,
    before: "/before2.png",
    after: "/after2.png",
  },
];

export default function Realface() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + beforeAfterPairs.length) % beforeAfterPairs.length);
  const next = () => setIndex((i) => (i + 1) % beforeAfterPairs.length);

  const current = beforeAfterPairs[index];
  const next1 = beforeAfterPairs[(index + 1) % beforeAfterPairs.length];

  return (
    <div className="size-full flex items-center justify-center bg-[#f5f0eb] mb-2">
      <section className="w-full max-w-5xl mx-auto px-6  flex flex-col md:flex-row items-center gap-10 py-2">

        {/* Left: text content */}
        <div className="md:w-[38%] flex flex-col gap-5 shrink-0">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#6b5e52]">
            Real People. Real Results.
          </p>
          <h2 className="text-2xl leading-[1.15] text-[#1a1209]" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 600 }}>
            Visible Transformation
          </h2>
          <p className="text-[0.92rem] text-[#5a4f45] font-medium">
            Results in just 4 weeks of consistent use.
          </p>
          <button
            className="mt-2 self-start px-6 py-3 bg-[#1a1209] text-[#f5f0eb] text-[0.72rem] tracking-[0.16em] uppercase transition-opacity hover:opacity-75 active:opacity-60 rounded-[5px]"
            style={{ letterSpacing: "0.15em" }}
          >
            See More Results
          </button>
        </div>

        {/* Right: carousel */}
        <div className="flex-1 relative flex items-center gap-3">

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="shrink-0 w-8 h-8 flex items-center justify-center text-[#1a1209] hover:opacity-60 transition-opacity z-10"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          {/* Photo pairs */}
          <div className="flex gap-3 flex-1 overflow-hidden">
            {/* Pair 1 (current) */}
            <div className="flex gap-1 flex-1">
              <div className="flex-1 flex flex-col gap-1">
                <div className="bg-[#d9cfc7] aspect-[4/5] overflow-hidden">
                  <img
                    src={current.before}
                    alt="Before treatment"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7a6f65] pt-1">Before</span>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="bg-[#d9cfc7] aspect-[4/5] overflow-hidden">
                  <img
                    src={current.after}
                    alt="After 4 weeks"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7a6f65] pt-1">After 4 Weeks</span>
              </div>
            </div>

            {/* Pair 2 (peek) */}
            <div className="flex gap-1 flex-1">
              <div className="flex-1 flex flex-col gap-1">
                <div className="bg-[#d9cfc7] aspect-[4/5] overflow-hidden">
                  <img
                    src={next1.before}
                    alt="Before treatment"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7a6f65] pt-1">Before</span>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="bg-[#d9cfc7] aspect-[4/5] overflow-hidden">
                  <img
                    src={next1.after}
                    alt="After 4 weeks"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7a6f65] pt-1">After 4 Weeks</span>
              </div>
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="shrink-0 w-8 h-8 flex items-center justify-center text-[#1a1209] hover:opacity-60 transition-opacity z-10"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>

      </section>
    </div>
  );
}
