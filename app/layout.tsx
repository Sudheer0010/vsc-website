import type { Metadata } from "next";
import { Alex_Brush, Bricolage_Grotesque, Geist_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SkipToContent } from "@/components/ui/vsc/SkipToContent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OG_IMAGES } from "@/lib/seo";

/**
* Typography — chosen for reading, not for looking expensive.
*
* Bricolage Grotesque carries the personality: a humanist grotesque with
* genuine quirk, so headlines are recognisable rather than default-serif
* "premium". Instrument Sans does the actual work — it is the face you
* read a whole page in without noticing it. Geist Mono is restricted to
* figures; it is never a label font here, because thin mono labels are the
* single most overused tell of a generated finance site.
*
* All three are variable — one axis, full weight range, no weight arrays.
*/
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-next",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-ui-next",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-next",
  display: "swap",
});

// Single-purpose: the founder's signature on the About page only. Not a
// general display face — a script that reads as a pen signature, not
// italicised body type standing in for one.
const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature-next",
  display: "swap",
});

// Editorial accent, homepage only (Belief / Drawdown / CTA italic lines and
// exhibit labels) — not a second default body/display face. Everything else
// on the site still reads in Bricolage/Instrument Sans.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-editorial-serif-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VSC Capital & Advisory | Systematic Trading. Disciplined Capital Growth.",
  description: "Momentum-based market education, research, and process-driven capital development.",
  metadataBase: new URL("https://vsccapital.in"),
  alternates: {
    canonical: "https://vsccapital.in/",
  },
  verification: {
    google: "N8GCf4i1xHSRHgECL3YH44ljyuwotIync6fg2o1Cb-Y",
  },
  other: {
    "apple-touch-icon": "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://vsccapital.in/",
    title: "VSC Capital & Advisory | Systematic Trading",
    description: "Momentum-based market education, research, and process-driven capital development.",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "VSC Capital & Advisory | Systematic Trading",
    description: "Momentum-based market education, research, and process-driven capital development.",
    images: ["https://vsccapital.in/logo.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        bricolage.variable,
        instrumentSans.variable,
        geistMono.variable,
        alexBrush.variable,
        newsreader.variable,
        "font-sans"
      )}
    >
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <SkipToContent />
        {/* Google Analytics Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F2SZMY24JR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F2SZMY24JR');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=gtm";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y7xa29y4go");
          `}
        </Script>
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
