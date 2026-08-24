import { Cormorant_Garamond, Manrope } from "next/font/google";

export const sans = Manrope({
  variable: "--font-sans",
  subsets: ["cyrillic", "latin"],
});

export const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});
