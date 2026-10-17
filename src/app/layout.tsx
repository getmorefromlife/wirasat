import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mīrāth al-Thaqalayn | میراثِ ثقلین — Shia Inheritance Engine & Academy",
  description: "Accredited Ja'fari Jurisprudence Inheritance Calculator and Academy with multi-marja comparative matrix, interactive mind-maps, and bilingual certificates.",
  keywords: ["Shia Inheritance", "Fiqh al-Mawarith", "Ja'fari Law", "Wirasat Shia", "میراث ثقلین", "Sistani", "Khamenei", "Khoei"],
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
