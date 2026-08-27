import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Oswald } from "next/font/google";
import { MobileStickyActionBar } from "@/components/MobileStickyActionBar";
import { SchemaRoot } from "@/components/SchemaRoot";
import { SiteFooter } from "@/components/SiteFooter";
import { TranslucentHeader } from "@/components/TranslucentHeader";
import { seoTargets, site } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seoTargets.home.title,
    template: `%s | ${site.name}`,
  },
  description: seoTargets.home.description,
  keywords: [
    "The Mighty Grill",
    "Mighty City Grill Bukoto",
    "best grill restaurant Bukoto",
    "fast food Kampala",
    "muchomo Bukoto",
    "burgers Ntinda Road",
  ],
  openGraph: {
    title: seoTargets.home.title,
    description: seoTargets.home.description,
    url: site.url,
    siteName: site.name,
    locale: "en_UG",
    type: "website",
    images: [{ url: "/images/og-share.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTargets.home.title,
    description: seoTargets.home.description,
    images: ["/images/og-share.jpg"],
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-UG" className={`${oswald.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-grill-cream antialiased">
        <SchemaRoot />
        <TranslucentHeader />
        {children}
        <SiteFooter />
        <MobileStickyActionBar />
      </body>
    </html>
  );
}
