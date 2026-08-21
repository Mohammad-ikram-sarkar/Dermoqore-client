import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { FooterServer } from "@/components/footer/FooterServer";
import ShellWrapper from "@/components/ShellWrapper";
import { CompanyInfoService } from "@/service/companyinfo.service";

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const info = await CompanyInfoService.findFirst();
  const icon = info?.logoUrl ?? "/faviconimage.png";

  return {
    metadataBase: new URL("https://dermoqore.com"),
    title: {
      default: "Dermoqore | Science · Skin · Confidence",
      template: "%s | Dermoqore",
    },
    description:
      "Dermoqore provides science-backed, clean skincare products designed to build your confidence through healthy, glowing skin.",
    keywords: ["skincare", "beauty", "dermatologist tested", "clean ingredients", "serum", "dermoqore"],
    authors: [{ name: "Dermoqore" }],
    creator: "Dermoqore",
    publisher: "Dermoqore",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon,
      apple: icon,
    },
    openGraph: {
      title: "Dermoqore | Science · Skin · Confidence",
      description:
        "Discover our rigorous science-backed skincare formulas that nourish and protect your skin barrier.",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ShellWrapper
          announcement={
            <Suspense fallback={null}>
              <AnnouncementBar />
            </Suspense>
          }
          navbar={<Navbar />}
          footer={<FooterServer />}
        >
          {children}
        </ShellWrapper>
      </body>
    </html>
  );
}
