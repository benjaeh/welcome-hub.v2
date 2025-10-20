import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ICON_VERSION } from "@/lib/iconVersion";
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
  title: "Welcome Hub",
  description: "International Student Portal by Communiteer",
  icons: {
    icon: [
      { url: `/icon-v2.png?${ICON_VERSION}`, type: "image/png", sizes: "210x210" },
      { url: `/favicon-v2.ico?${ICON_VERSION}`, type: "image/x-icon" },
      { url: `/favicon.ico?${ICON_VERSION}`, type: "image/x-icon" },
    ],
    apple: [{ url: `/icon-v2.png?${ICON_VERSION}`, sizes: "180x180" }],
    shortcut: [`/favicon-v2.ico?${ICON_VERSION}`],
  },
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
