import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Syne, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/providers/MotionProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-display-next",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ui-next",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-mono-next",
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
    images: [
      {
        url: "https://vsccapital.in/logo.jpg",
        width: 1200,
        height: 630,
        alt: "VSC Capital & Advisory Logo",
      }
    ],
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
    <html lang="en" className={cn(cormorant.variable, syne.variable, dmMono.variable, "font-sans", geist.variable)}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
