import type { Metadata } from "next";
import { sans, serif } from "../fonts";
import "../globals.css";
import { createMetadata } from "../metadata";

export const metadata: Metadata = createMetadata("ru");

export default function RussianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
