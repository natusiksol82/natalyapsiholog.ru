import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./site-config";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["cyrillic", "latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: {
    default: siteConfig.title,
    template: "%s | Психолог Наталья",
  },
  description: siteConfig.description,
  keywords: [
    "психолог Ростов-на-Дону",
    "психолог онлайн",
    "консультация психолога",
    "психолог Комсомольская площадь",
    "КПТ психолог",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: siteConfig.name,
    title: "Бережно к себе. Шаг за шагом.",
    description: "Психологические консультации очно в Ростове-на-Дону и онлайн.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Психолог Наталья, очно и онлайн",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Психолог Наталья в Ростове-на-Дону",
    description: "Бережная психологическая помощь очно и онлайн.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
