"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  productId: string;
  name: string;
  slug: string;
  image?: string;
  price: number;
  comparePrice?: number;
};

type WishlistState = {
  items: WishlistItem[];

  toggleItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  count: () => number;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (item) => {
        if (get().items.some((i) => i.productId === item.productId)) {
          set({ items: get().items.filter((i) => i.productId !== item.productId) });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),

      isInWishlist: (productId) =>
        get().items.some((i) => i.productId === productId),

      count: () => get().items.length,
    }),
    {
      name: "wishlist-store",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
