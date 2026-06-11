import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DarkSpotsIcon,
  AcneMarksIcon,
  UnevenSkinToneIcon,
  OilyAcneIcon,
  DryDehydratedIcon,
  SensitiveSkinIcon,
} from "./skin-icons";
import type { ComponentType, SVGProps } from "react";

interface Concern {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const concerns: Concern[] = [
  {
    label: "Dark Spots &\nPigmentation",
    href: "/skin-concern/dark-spots",
    Icon: DarkSpotsIcon,
  },
  {
    label: "Acne Marks",
    href: "/skin-concern/acne-marks",
    Icon: AcneMarksIcon,
  },
  {
    label: "Uneven Skin\nTone",
    href: "/skin-concern/uneven-skin-tone",
    Icon: UnevenSkinToneIcon,
  },
  {
    label: "Oily & Acne\nProne Skin",
    href: "/skin-concern/oily-acne",
    Icon: OilyAcneIcon,
  },
  {
    label: "Dry & Dehydrated\nSkin",
    href: "/skin-concern/dry-dehydrated",
    Icon: DryDehydratedIcon,
  },
  {
    label: "Sensitive\nSkin",
    href: "/skin-concern/sensitive",
    Icon: SensitiveSkinIcon,
  },
];

export default function Skin() {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className=" text-lg font-black tracking-[0.15em]  uppercase md:text-xl text-muted-foreground">
            What's Your Skin Concern?
          </h2>
          <p className="mt-2 text-[12px] tracking-[0.08em] text-muted-foreground">
            Find the perfect serum for your skin
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {concerns.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex flex-col items-center gap-4 rounded-sm border border-border bg-background px-3 py-6 text-center",
                "transition-all duration-200 hover:border-foreground/30 hover:shadow-sm",
              )}
            >
              <Icon
                className="h-12 w-12 text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
                aria-hidden="true"
              />
              <span className="whitespace-pre-line text-[10px] font-medium leading-relaxed tracking-[0.08em] text-muted-foreground uppercase transition-colors duration-200 group-hover:text-foreground">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
