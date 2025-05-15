import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "SoftSell — Recover Value from Unused Software Licenses",
  description:
    "SoftSell helps businesses recover up to 70% of their original investment by reselling unused software licenses. Fast 24-hour valuations. Full legal support. Vendors: Microsoft, Adobe, Oracle, SAP, and more.",
  keywords: [
    "sell unused software licenses",
    "recover software license value",
    "resell Microsoft licenses",
    "sell Adobe license",
    "used software resale",
    "license recovery platform",
    "SoftSell software resale"
  ],
  authors: [{ name: "SoftSell Team", url: "https://softsell.com" }],
  openGraph: {
    title: "SoftSell — Recover Value from Unused Software Licenses",
    description:
      "Get up to 70% back on unused software licenses. 24-hour valuation. Full legal support. Trusted by businesses reselling Microsoft, Adobe, Oracle, SAP licenses.",
    url: "https://softsell.com",
    siteName: "SoftSell",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "SoftSell — Resell Unused Software Licenses",
    description:
      "Sell your unused software licenses and recover up to 70% of your initial cost. Fast, legal, and secure with SoftSell.",
    site: "@SoftSellOfficial",
    creator: "@SoftSellOfficial"
  },
  icons: {
    icon: "/favicon.ico"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
