import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mīrāth al-Thaqalayn | میراثِ ثقلین — Shia Inheritance Engine & Academy",
  description: "A scholarly project by Maulana Syed Imon Rizvi (مولانا سیّد آئمن رضوی) — Accredited Ja'fari Jurisprudence Inheritance Calculator and Academy with multi-marja comparative matrix, interactive mind-maps, and estate planning studio.",
  authors: [{ name: "Maulana Syed Imon Rizvi (مولانا سیّد آئمن رضوی)" }],
  creator: "Maulana Syed Imon Rizvi",
  keywords: ["Shia Inheritance", "Fiqh al-Mawarith", "Ja'fari Law", "Wirasat Shia", "میراث ثقلین", "Maulana Syed Imon Rizvi", "مولانا سید آئمن رضوی", "Sistani", "Khamenei", "Khoei"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" data-theme="emerald" data-font-scale="normal">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Gulzar&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-jakarta antialiased selection:bg-[#d4af37]/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
