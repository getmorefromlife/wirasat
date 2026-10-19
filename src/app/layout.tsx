import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shia-wirasat.vercel.app"),
  title: "Wirasat — A Legacy of Fairness | وراثت",
  description: "Wirasat: A Legacy of Fairness. Educational Ja‘farī Inheritance Platform curated by Maulana Syed Imon Rizvi.",
  applicationName: "Wirasat",
  authors: [{ name: "Maulana Syed Imon Rizvi (مولانا سیّد آئمن رضوی)" }],
  creator: "Maulana Syed Imon Rizvi",
  keywords: ["Wirasat", "وراثت", "A Legacy of Fairness", "Shia Inheritance", "Fiqh al-Mawarith", "Ja'fari Law", "Maulana Syed Imon Rizvi", "مولانا سید آئمن رضوی", "Sistani", "Khamenei"],
  openGraph: {
    type: "website",
    url: "https://shia-wirasat.vercel.app",
    title: "Wirasat — A Legacy of Fairness | وراثت",
    description: "Wirasat: A Legacy of Fairness. Educational Ja‘farī Inheritance Platform curated by Maulana Syed Imon Rizvi.",
    siteName: "Wirasat",
    locale: "en_US",
    alternateLocale: ["ur_PK"],
    images: [
      {
        url: "/images/icon-192.png",
        width: 192,
        height: 192,
        alt: "Wirasat — A Legacy of Fairness",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Wirasat — A Legacy of Fairness | وراثت",
    description: "Wirasat: A Legacy of Fairness. Educational Ja‘farī Inheritance Platform curated by Maulana Syed Imon Rizvi.",
    images: ["/images/icon-192.png"],
  },
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
