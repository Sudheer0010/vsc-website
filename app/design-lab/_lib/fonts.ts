import { Newsreader } from "next/font/google";

/**
 * Direction A only. Not part of the production type system — isolated to
 * the design-lab route so this experiment doesn't leak a new brand font
 * into the rest of the site.
 */
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lab-serif",
  display: "swap",
});
