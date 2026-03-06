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

  title: "HELLCOIN ($666) | Born in the Red. Forged by Regret.",
  description:
    "HELLCOIN is a satirical memecoin about the hell people go through in crypto, where delusion, scams and painful losses unite survivors in the Cult of the Burned.",

  keywords: [
    "HELLCOIN",
    "hellcoin",
    "$666",
    "666 coin",
    "memecoin",
    "satirical memecoin",
    "crypto",
    "solana memecoin",
    "crypto satire",
    "Cult of the Burned",
  ],

  authors: [{ name: "HELLCOIN" }],
  creator: "HELLCOIN",
  publisher: "HELLCOIN",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "HELLCOIN",
    title: "HELLCOIN ($666)",
    description: "Born in the Red. Forged by Regret.",
    images: [
      {
        url: "/hellcoin-og.png",
        width: 1200,
        height: 630,
        alt: "HELLCOIN ($666) | Born in the Red. Forged by Regret.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HELLCOIN ($666) | Born in the Red. Forged by Regret.",
    description: "Born in the Red. Forged by Regret.",
    images: ["/hellcoin-og.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HELLCOIN",
  alternateName: "HELLCOIN ($666)",
  url: SITE_URL,
  description:
    "HELLCOIN is a satirical memecoin about the hell people go through in crypto, where delusion, scams and painful losses unite survivors in the Cult of the Burned.",
  publisher: {
    "@type": "Organization",
    name: "HELLCOIN",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-192.png`,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
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
        <meta name="theme-color" content="#ff5500" />
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
