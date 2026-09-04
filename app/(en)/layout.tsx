import type { Metadata } from "next";
import { sans, serif } from "../fonts";
import "../globals.css";
import { createMetadata } from "../metadata";
import { ThemeScript } from "../theme-script";

export const metadata: Metadata = createMetadata("en");

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="mint" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
