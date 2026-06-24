"use client"

import React from "react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Reduces Spots",
    description: "Helps reduce dark spots and sun damage on the face.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="14" stroke="#6b7280" strokeWidth="1.5" fill="none" />
        <circle cx="13" cy="15" r="3.5" stroke="#6b7280" strokeWidth="1.2" fill="none" />
        <circle cx="22" cy="13" r="2.5" stroke="#6b7280" strokeWidth="1.2" fill="none" />
        <circle cx="20" cy="22" r="3" stroke="#6b7280" strokeWidth="1.2" fill="none" />
        <line x1="16" y1="15" x2="19.5" y2="13.5" stroke="#6b7280" strokeWidth="1" strokeDasharray="2 1.5" />
        <line x1="17.5" y1="22" x2="20" y2="16" stroke="#6b7280" strokeWidth="1" strokeDasharray="2 1.5" />
      </svg>
    ),
  },
  {
    title: "Boosts Radiance",
    description: "Naturally brightens and revitalizes your skin tone.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 8 C13 8 10 12 10 16 C10 20 13 22 16 23 C16 25 17 27 18 28 C19 27 20 25 20 23 C23 22 26 20 26 16 C26 12 23 8 18 8Z"
          stroke="#6b7280"
          strokeWidth="1.4"
          fill="none"
        />
        <path d="M15 12 Q18 10 21 12" stroke="#6b7280" strokeWidth="1" fill="none" />
        <line x1="12" y1="15" x2="9" y2="13" stroke="#6b7280" strokeWidth="1.2" />
        <line x1="12" y1="18" x2="8" y2="18" stroke="#6b7280" strokeWidth="1.2" />
        <line x1="24" y1="15" x2="27" y2="13" stroke="#6b7280" strokeWidth="1.2" />
        <line x1="24" y1="18" x2="28" y2="18" stroke="#6b7280" strokeWidth="1.2" />
        <line x1="18" y1="8" x2="18" y2="5" stroke="#6b7280" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Deep Moisturize",
    description: "Locks in moisture deep within the skin all day long.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="18" cy="22" rx="10" ry="4" stroke="#6b7280" strokeWidth="1.3" fill="none" />
        <ellipse cx="18" cy="19" rx="8" ry="3" stroke="#6b7280" strokeWidth="1.3" fill="none" />
        <ellipse cx="18" cy="16" rx="5" ry="2" stroke="#6b7280" strokeWidth="1.3" fill="none" />
        <path d="M16 12 Q18 8 20 12" stroke="#6b7280" strokeWidth="1.3" fill="none" />
        <circle cx="18" cy="11" r="2" fill="#6b7280" opacity={0.3} />
        <path d="M18 9 L18 6 M15.5 7.5 L18 6 L20.5 7.5" stroke="#6b7280" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    title: "Skin Protection",
    description: "Shields skin from pollution, dust and environmental damage.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 8 L26 12 L26 20 C26 24 22 27.5 18 29 C14 27.5 10 24 10 20 L10 12 Z"
          stroke="#6b7280"
          strokeWidth="1.4"
          fill="none"
        />
        <polyline
          points="14,18 17,21 23,15"
          stroke="#6b7280"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Natural Ingredients",
    description: "Made with 100% natural ingredients, safe for all skin types.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 27 C18 27 10 22 10 16 C10 12 13.5 9 18 9 C22.5 9 26 12 26 16 C26 22 18 27 18 27Z"
          stroke="#6b7280"
          strokeWidth="1.4"
          fill="none"
        />
        <path d="M18 9 C18 9 15 6 13 5" stroke="#6b7280" strokeWidth="1.2" fill="none" />
        <path d="M18 9 C18 9 21 6.5 23 5.5" stroke="#6b7280" strokeWidth="1.2" fill="none" />
        <path d="M15 14 Q18 11 21 14 Q19 17 18 20 Q17 17 15 14Z" stroke="#6b7280" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-[10px] px-3 py-5 gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Icon Circle */}
            <div className="w-16 h-16 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
              {feature.icon}
            </div>

            {/* Title */}
            <p className="text-sm font-semibold text-gray-700 leading-snug">
              {feature.title}
            </p>

            {/* Description */}
            <p className="text-xs text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}