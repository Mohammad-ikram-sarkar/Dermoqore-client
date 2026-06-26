// components/TrustBadges.tsx
// "কেন হাজারো মানুষের ভরসা Dermoqore?" — Trust badges section
"use client"
import React from "react";

interface Badge {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
}

const BtriIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="24" cy="24" r="22" stroke="#1a1a1a" strokeWidth="2" fill="#f4f4f4" />
    <path d="M16 32V16h8a6 6 0 0 1 0 12h-8" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 24h6a4 4 0 0 1 0 8h-6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 20l4-4M34 20l-4-4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ScienceIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="24" cy="24" r="22" stroke="#1a1a1a" strokeWidth="2" fill="#f4f4f4" />
    <path d="M19 14v12l-5 8a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3l-5-8V14" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 14h14" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="31" r="1.5" fill="#1a1a1a" />
    <circle cx="27" cy="33" r="1.5" fill="#1a1a1a" />
    <circle cx="24" cy="28" r="1.5" fill="#1a1a1a" />
  </svg>
);

const IngredientIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="24" cy="24" r="22" stroke="#1a1a1a" strokeWidth="2" fill="#f4f4f4" />
    <rect x="14" y="13" width="20" height="24" rx="2" stroke="#1a1a1a" strokeWidth="2" />
    <path d="M18 19h12M18 24h12M18 29h8" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="31" r="5" fill="#f4f4f4" stroke="#1a1a1a" strokeWidth="2" />
    <path d="M30 31l1.5 1.5L34 29" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NoSteroidIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="24" cy="24" r="22" stroke="#1a1a1a" strokeWidth="2" fill="#f4f4f4" />
    <circle cx="24" cy="24" r="10" stroke="#1a1a1a" strokeWidth="2" />
    <path d="M17 17l14 14" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 24c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FragranceFreeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="24" cy="24" r="22" stroke="#1a1a1a" strokeWidth="2" fill="#f4f4f4" />
    <path d="M24 32V20" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 24c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <rect x="18" y="32" width="12" height="5" rx="1.5" stroke="#1a1a1a" strokeWidth="2" />
    <path d="M20 20c-2-4-2-8 4-8 6 0 6 4 4 8" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 15l18 18" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MadeInBDIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <circle cx="24" cy="24" r="22" stroke="#1a1a1a" strokeWidth="2" fill="#f4f4f4" />
    {/* Bangladesh flag simplified */}
    <rect x="13" y="17" width="22" height="14" rx="1.5" fill="#006a4e" />
    <circle cx="23" cy="24" r="5" fill="#f42a41" />
  </svg>
);

const badges: Badge[] = [
  {
    id: "btri",
    label: "BTRI",
    sublabel: "Lab Tested",
    icon: <BtriIcon />,
  },
  {
    id: "science",
    label: "Science-Based",
    sublabel: "Formula",
    icon: <ScienceIcon />,
  },
  {
    id: "ingredient",
    label: "Ingredient",
    sublabel: "Transparency",
    icon: <IngredientIcon />,
  },
  {
    id: "steroid",
    label: "No",
    sublabel: "Steroid",
    icon: <NoSteroidIcon />,
  },
  {
    id: "fragrance",
    label: "Fragrance",
    sublabel: "Free",
    icon: <FragranceFreeIcon />,
  },
  {
    id: "made-in-bd",
    label: "Made in",
    sublabel: "Bangladesh",
    icon: <MadeInBDIcon />,
  },
];

export default function TrustBadges() {
  return (
    <section className="w-full bg-white py-10 px-4 border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-gray-800 text-lg md:text-xl font-semibold mb-8 leading-snug">
          কেন হাজারো মানুষের ভরসা{" "}
          <span className="text-[#2d7a3a] font-bold">Dermoqore?</span>
        </h2>

        {/* Badges */}
        <div className="grid grid-cols-6 gap-2">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-2 group"
            >
              {/* Icon circle */}
              <div className="transition-transform duration-200 group-hover:scale-110">
                {badge.icon}
              </div>

              {/* Label */}
              <div className="text-center leading-tight">
                <p className="text-xs font-semibold text-gray-700">
                  {badge.label}
                </p>
                {badge.sublabel && (
                  <p className="text-xs text-gray-500">{badge.sublabel}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}