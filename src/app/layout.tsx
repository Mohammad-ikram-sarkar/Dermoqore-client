import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import { Suspense } from "react";
import { headers } from "next/headers";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { FooterServer } from "@/components/footer/FooterServer";

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dermoqore.com"),
  title: {
    default: "Dermoqore | Science · Skin · Confidence",
    template: "%s | Dermoqore",
  },
  description: "Dermoqore provides science-backed, clean skincare products designed to build your confidence through healthy, glowing skin.",
  keywords: ["skincare", "beauty", "dermatologist tested", "clean ingredients", "serum", "dermoqore"],
  authors: [{ name: "Dermoqore" }],
  creator: "Dermoqore",
  publisher: "Dermoqore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dermoqore | Science · Skin · Confidence",
    description: "Discover our rigorous science-backed skincare formulas that nourish and protect your skin barrier.",
    url: "https://dermoqore.com",
    siteName: "Dermoqore",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dermoqore | Science · Skin · Confidence",
    description: "Science-backed skincare products designed to build confidence.",
    creator: "@dermoqore",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isCampaign = pathname.startsWith("/campaign");

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable)}
    >
      <body className="min-h-full flex flex-col">
        {!isCampaign && (
          <Suspense fallback={null}>
            <AnnouncementBar />
          </Suspense>
        )}
        {!isCampaign && <Navbar />}
        {children}
        {!isCampaign && <FooterServer />}
      </body>
    </html>
  );
}
