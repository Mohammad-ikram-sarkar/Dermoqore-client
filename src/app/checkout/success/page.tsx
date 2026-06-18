"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const [reference] = useState(() =>
    `DRM-${Date.now().toString(36).toUpperCase()}`,
  );

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-md text-center">
          <CheckCircle className="mx-auto mb-6 size-16 text-emerald-500" />
          <h1 className="mb-2 text-2xl font-semibold text-foreground">
            Order placed successfully!
          </h1>
          <p className="mb-2 text-sm text-muted-foreground">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </p>
          <p className="mb-8 text-xs text-muted-foreground">
            Order reference:{" "}
            <span className="font-mono font-semibold text-foreground">
              {reference}
            </span>
          </p>
          <Button render={<Link href="/shop" />}>
            Continue Shopping
          </Button>
        </div>
      </section>
    </main>
  );
}
