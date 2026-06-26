// TrustBadgeStrip.tsx — place this immediately after your <section> in the JSX

import { ShieldCheck, Truck, Banknote } from "lucide-react"

const badges = [
  { icon: Banknote,   label: "Cash on Delivery" },
  { icon: Truck,      label: "সারা বাংলাদেশ ডেলিভারি" },
  { icon: ShieldCheck, label: "সুরক্ষিত পেমেন্ট" },
]

export function TrustBadgeStrip() {
  return (
    <div className="w-full border-b border-border bg-secondary/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-start gap-x-8 gap-y-2 px-5 py-3 sm:gap-x-12 sm:px-8 justify-start">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-muted-foreground">
            <Icon className="size-4 shrink-0 text-foreground/70" />
            <span className="text-xs font-medium sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}