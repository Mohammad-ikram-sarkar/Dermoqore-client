import type { CampaignTheme } from "@/service/campaign.service";

export interface ThemePalette {
  /** Primary solid color — badges, CTA buttons */
  primary: string;
  /** Foreground text on primary backgrounds */
  primaryFg: string;
  /** Soft tinted background — feature cards, section backgrounds */
  soft: string;
  /** Text color on soft backgrounds / icon accent */
  softText: string;
  /** Lighter ring / border accent */
  ring: string;
}

const THEMES: Record<CampaignTheme, ThemePalette> = {
  DEFAULT: {
    primary: "#171717",
    primaryFg: "#ffffff",
    soft: "#f3f4f6",
    softText: "#374151",
    ring: "#9ca3af",
  },
  EMERALD: {
    primary: "#059669",
    primaryFg: "#ffffff",
    soft: "#d1fae5",
    softText: "#059669",
    ring: "#10b981",
  },
  ROSE: {
    primary: "#e11d48",
    primaryFg: "#ffffff",
    soft: "#ffe4e6",
    softText: "#e11d48",
    ring: "#fb7185",
  },
  OCEAN: {
    primary: "#0284c7",
    primaryFg: "#ffffff",
    soft: "#e0f2fe",
    softText: "#0369a1",
    ring: "#38bdf8",
  },
  AMBER: {
    primary: "#d97706",
    primaryFg: "#ffffff",
    soft: "#fef3c7",
    softText: "#b45309",
    ring: "#fbbf24",
  },
};

/**
 * Returns a React-compatible `style` object that sets CSS custom properties
 * for the given campaign theme.  Components reference `var(--cp)`, `var(--cpf)`,
 * `var(--cps)`, `var(--cpt)`, `var(--cpr)` so that theme changes are scoped
 * to the campaign page wrapper.
 */
export function themeVars(theme: CampaignTheme): Record<string, string> {
  const t = THEMES[theme] ?? THEMES.DEFAULT;
  return {
    "--cp": t.primary,
    "--cpf": t.primaryFg,
    "--cps": t.soft,
    "--cpt": t.softText,
    "--cpr": t.ring,
  } as Record<string, string>;
}

export { THEMES };
