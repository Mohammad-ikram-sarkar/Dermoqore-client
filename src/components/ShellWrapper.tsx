"use client";

import { usePathname } from "next/navigation";

interface ShellWrapperProps {
  announcement: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export default function ShellWrapper({ announcement, navbar, footer, children }: ShellWrapperProps) {
  const pathname = usePathname();
  const isCampaign = pathname.startsWith("/campaign");

  return (
    <>
      {!isCampaign && announcement}
      {!isCampaign && navbar}
      {children}
      {!isCampaign && footer}
    </>
  );
}
