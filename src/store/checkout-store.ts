"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DeliveryZone = "INSIDE_DHAKA" | "OUTSIDE_DHAKA";

export type CheckoutLine = {
  productId: string;
  name: string;
  image?: string;
  unitPrice: number;
  quantity: number;
};

type CheckoutState = {
  lines: CheckoutLine[];
  shippingAddressId: string | null;
  deliveryZone: DeliveryZone;
  notes: string;

  cardholderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;

  setLines: (lines: CheckoutLine[]) => void;
  addLine: (line: CheckoutLine) => void;
  removeLine: (productId: string) => void;
  setLineQuantity: (productId: string, quantity: number) => void;
  clearLines: () => void;

  setShippingAddressId: (id: string | null) => void;
  setDeliveryZone: (zone: DeliveryZone) => void;
  setNotes: (notes: string) => void;

  setCard: (card: {
    cardholderName: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
  }) => void;
  clearCard: () => void;

  subtotal: () => number;
  itemCount: () => number;
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      lines: [],
      shippingAddressId: null,
      deliveryZone: "INSIDE_DHAKA",
      notes: "",

      cardholderName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",

      setLines: (lines) => set({ lines }),
      addLine: (line) => {
        const existing = get().lines.find((l) => l.productId === line.productId);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.productId === line.productId
                ? { ...l, quantity: l.quantity + line.quantity }
                : l,
            ),
          });
        } else {
          set({ lines: [...get().lines, line] });
        }
      },
      removeLine: (productId) => set({ lines: get().lines.filter((l) => l.productId !== productId) }),
      setLineQuantity: (productId, quantity) =>
        set({
          lines: quantity <= 0 ? get().lines.filter((l) => l.productId !== productId) : get().lines.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
        }),
      clearLines: () => set({ lines: [] }),

      setShippingAddressId: (id) => set({ shippingAddressId: id }),
      setDeliveryZone: (zone) => set({ deliveryZone: zone }),
      setNotes: (notes) => set({ notes }),

      setCard: (card) =>
        set({
          cardholderName: card.cardholderName,
          cardNumber: card.cardNumber,
          cardExpiry: card.cardExpiry,
          cardCvc: card.cardCvc,
        }),
      clearCard: () => set({ cardholderName: "", cardNumber: "", cardExpiry: "", cardCvc: "" }),

      subtotal: () => {
        const { lines } = get();
        return lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
      },

      itemCount: () => {
        const { lines } = get();
        return lines.reduce((sum, l) => sum + l.quantity, 0);
      },
    }),
    {
      name: "checkout-store",
      partialize: (state) => ({
        lines: state.lines,
        shippingAddressId: state.shippingAddressId,
        deliveryZone: state.deliveryZone,
        notes: state.notes,
        cardholderName: state.cardholderName,
        cardNumber: state.cardNumber,
        cardExpiry: state.cardExpiry,
        cardCvc: state.cardCvc,
      }),
    },
  ),
);

