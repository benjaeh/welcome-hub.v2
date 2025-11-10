import type { Metadata } from "next";
import { ICON_VERSION } from "@/lib/iconVersion";
import "./globals.css";

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
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
