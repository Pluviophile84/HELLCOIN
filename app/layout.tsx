import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import "./globals.css";
import { Luckiest_Guy, Bangers, Nunito } from "next/font/google";
import { SITE_URL } from "@/lib/constants";

// Brand + Hero voice
const heroFont = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
});

// Section titles + major headings
const headingFont = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Body + UI (menus, labels, paragraphs)
const bodyFont = Nunito({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HELLCOIN ($666)",
  description:
    "The official currency of eternal regret. The first cryptocurrency powered by Proof-of-Suffering.",
  keywords: ["hellcoin", "cryptocurrency", "memecoin", "solana", "$666", "crypto"],
  authors: [{ name: "HELLCOIN" }],
  openGraph: {
    title: "HELLCOIN ($666)",
    description: "The official currency of eternal regret.",
    type: "website",
    siteName: "HELLCOIN",
    images: [
      {
        url: "/banner.webp",
        width: 1920,
        height: 1080,
        alt: "HELLCOIN ($666) - Born in the Red",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HELLCOIN ($666)",
    description: "The official currency of eternal regret.",
    images: ["/banner.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HELLCOIN",
  url: SITE_URL,
  description:
    "The official currency of eternal regret. The first cryptocurrency powered by Proof-of-Suffering.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Provided by middleware.ts (per-request CSP nonce). If missing, we still render safely.
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${heroFont.variable} ${headingFont.variable} ${bodyFont.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff5500" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-obsidian-950 font-body antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
