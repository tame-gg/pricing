import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import Curtain from "@/components/Curtain";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "tame.gg — Web Services for Local Businesses",
  description:
    "Modern, animated websites for barbers, salons, food trucks, and local businesses. Built in Charlotte, NC.",
  metadataBase: new URL("https://tame.gg"),
  openGraph: {
    title: "tame.gg — Web Services",
    description:
      "Modern, animated websites for barbers, salons, food trucks, and local businesses. Built in Charlotte, NC.",
    url: "https://tame.gg",
    siteName: "tame.gg",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tame.gg — Web Services",
    description:
      "Modern, animated websites for local businesses in Charlotte, NC.",
    images: ["/og.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-bg text-ink">
        <Curtain />
        <CustomCursor />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
