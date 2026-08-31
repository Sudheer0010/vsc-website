import type { Metadata } from "next";

/**
 * One source for the Open Graph image.
 *
 * Next.js replaces the `openGraph` metadata object rather than merging it,
 * so every route that declared its own `openGraph` block silently dropped
 * the root layout's `images` array — 31 of 37 public routes were shipping
 * no `og:image` at all. Sharing any letter, framework, tool or offering on
 * LinkedIn rendered a bare text link. Importing this constant into each
 * override keeps the image attached without re-stating the URL per route.
 *
 * The dimensions describe the real asset. `public/logo.jpg` is 1024x1024;
 * it was previously declared 1200x630, so consumers that trust the declared
 * box (rather than probing the file) laid out the wrong aspect ratio and
 * cropped badly. Replacing the square logo with a purpose-built 1200x630
 * card is a content task — until then, at least the numbers are true.
 */
export const OG_IMAGES: NonNullable<NonNullable<Metadata["openGraph"]>["images"]> = [
  {
    url: "https://vsccapital.in/logo.jpg",
    width: 1024,
    height: 1024,
    alt: "VSC Capital & Advisory",
  },
];
