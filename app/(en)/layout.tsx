import type { Metadata } from "next";
import { sans, serif } from "../fonts";
import "../globals.css";
import { createMetadata } from "../metadata";

export const metadata: Metadata = createMetadata("en");

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
