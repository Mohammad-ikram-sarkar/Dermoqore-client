"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, Lock, Truck } from "lucide-react";
import { useCheckoutStore, type DeliveryZone } from "@/store/checkout-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { divisions, districts, upazilas } from "@/lib/data/bangladesh";

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    lines,
    deliveryZone,
    notes,
    cardholderName,
    cardNumber,
    cardExpiry,
    cardCvc,
    setDeliveryZone,
    setNotes,
    setCard,
    clearCard,
    clearLines,
    subtotal,
  } = useCheckoutStore();

  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredDistricts = useMemo(
    () => districts.filter((d) => d.divisionId === selectedDivision),
    [selectedDivision],
  );

  const filteredUpazilas = useMemo(
    () => upazilas.filter((u) => u.districtId === selectedDistrict),
    [selectedDistrict],
  );

  const derivedZone: DeliveryZone =
    selectedDivision === "dhaka" ? "INSIDE_DHAKA" : "OUTSIDE_DHAKA";

  useEffect(() => {
    if (selectedDivision) {
      setDeliveryZone(derivedZone);
    }
  }, [derivedZone, selectedDivision, setDeliveryZone]);

  const shipping = deliveryZone === "INSIDE_DHAKA" ? 60 : 120;
  const total = subtotal() + shipping;

  if (lines.length === 0) {
    return (
      <main className="flex-1 bg-background">
        <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-2 text-2xl font-semibold text-foreground">
              Nothing to checkout
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              Your cart is empty. Add some products first.
            </p>
            <Button render={<Link href="/shop" />}>
              Shop Now
            </Button>
          </div>
        </section>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order placement — replace with actual API call
    await new Promise((r) => setTimeout(r, 1500));

    clearLines();
    clearCard();
    router.push("/checkout/success");
  };

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <div className="mb-8">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Checkout
          </p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
            Complete your order
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-[1fr_400px]"
        >
          {/* Left — form fields */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <fieldset className="rounded-md border border-border bg-card p-6">
              <legend className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
                <Truck className="size-4" />
                Shipping Address
              </legend>

              <div className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Full Name
                    </span>
                    <input
                      required
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Phone Number
                    </span>
                    <input
                      required
                      type="tel"
                      value={shippingPhone}
                      onChange={(e) => setShippingPhone(e.target.value)}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </label>
                </div>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Address
                  </span>
                  <textarea
                    required
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Division
                    </span>
                    <select
                      required
                      value={selectedDivision}
                      onChange={(e) => {
                        setSelectedDivision(e.target.value);
                        setSelectedDistrict("");
                        setSelectedUpazila("");
                      }}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select Division</option>
                      {divisions.map((div) => (
                        <option key={div.id} value={div.id}>
                          {div.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      District
                    </span>
                    <select
                      required
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedUpazila("");
                      }}
                      disabled={!selectedDivision}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                    >
                      <option value="">Select District</option>
                      {filteredDistricts.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {dist.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Subdistrict
                    </span>
                    <select
                      required
                      value={selectedUpazila}
                      onChange={(e) => setSelectedUpazila(e.target.value)}
                      disabled={!selectedDistrict}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                    >
                      <option value="">Select Subdistrict</option>
                      {filteredUpazilas.map((upa) => (
                        <option key={upa.id} value={upa.id}>
                          {upa.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Delivery Zone — auto-set based on district */}
            <fieldset className="rounded-md border border-border bg-card p-6">
              <legend className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
                <Truck className="size-4" />
                Delivery Zone
              </legend>

              <div className="mt-4 flex gap-4">
                {(["INSIDE_DHAKA", "OUTSIDE_DHAKA"] as DeliveryZone[]).map(
                  (zone) => (
                    <div
                      key={zone}
                      className={`flex flex-1 items-center gap-3 rounded-md border p-4 text-sm ${
                        deliveryZone === zone
                          ? "border-foreground bg-muted"
                          : "border-border opacity-50"
                      }`}
                    >
                      <div className="size-4 shrink-0 rounded-full border-2 border-foreground flex items-center justify-center">
                        {deliveryZone === zone && (
                          <div className="size-2 rounded-full bg-foreground" />
                        )}
                      </div>
                      <div>
                        <span className="block font-semibold text-foreground">
                          {zone === "INSIDE_DHAKA"
                            ? "Inside Dhaka"
                            : "Outside Dhaka"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {zone === "INSIDE_DHAKA" ? "৳60" : "৳120"}
                        </span>
                      </div>
                    </div>
                  ),
                )}
              </div>
              {!selectedDivision && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Select a division above to determine delivery zone.
                </p>
              )}
            </fieldset>

            {/* Notes */}
            <fieldset className="rounded-md border border-border bg-card p-6">
              <legend className="text-sm font-bold uppercase tracking-wide text-foreground">
                Order Notes (optional)
              </legend>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions for delivery..."
                className="mt-4 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </fieldset>

            {/* Payment */}
           
          </div>

          {/* Right — order summary */}
          <aside className="h-fit rounded-md border border-border bg-card p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">
              Order Summary
            </h2>

            <div className="space-y-3">
              {lines.map((line) => (
                <div
                  key={line.productId}
                  className="flex items-center gap-3"
                >
                  <div className="size-12 shrink-0 overflow-hidden rounded bg-muted">
                    {line.image ? (
                      <img
                        src={line.image}
                        alt={line.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground/40 text-[10px]">
                        N/A
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {line.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {line.quantity}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-foreground">
                    {formatPrice(line.unitPrice * line.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(subtotal())}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(shipping)}
                </span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-base">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-extrabold text-foreground">
                {formatPrice(total)}
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full"
              size="lg"
            >
              {isSubmitting ? (
                "Processing…"
              ) : (
                <>
                  <Lock className="size-4" />
                  Place Order
                </>
              )}
            </Button>

            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Your payment is secured via encrypted connection
            </p>
          </aside>
        </form>
      </section>
    </main>
  );
}
