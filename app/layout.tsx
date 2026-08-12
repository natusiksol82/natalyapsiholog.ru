import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Психолог Наталья в Ростове-на-Дону | Очно и онлайн",
      template: "%s | Психолог Наталья",
    },
    description:
      "Индивидуальные консультации психолога в Ростове-на-Дону и онлайн. Тревога, эмоции, самооценка, отношения и сложные жизненные ситуации.",
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
      siteName: "Психолог Наталья",
      title: "Бережно к себе. Шаг за шагом.",
      description: "Психологические консультации очно в Ростове-на-Дону и онлайн.",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Психолог Наталья, очно и онлайн" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Психолог Наталья в Ростове-на-Дону",
      description: "Бережная психологическая помощь очно и онлайн.",
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
