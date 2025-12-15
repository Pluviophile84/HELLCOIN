import type { Metadata } from "next";
import "./globals.css";
import { fontGothic, fontTerminal } from "./fonts";

export const metadata: Metadata = {
  title: "HELLCOIN ($666) - Born in the Red",
  description: "The official currency of eternal regret.",
  openGraph: {
    title: "HELLCOIN ($666) - Born in the Red",
    description: "The official currency of eternal regret.",
    type: "website",
    images: [
      {
        url: "/SOCIAL-BANNER.png",
        width: 1500,
        height: 500,
        alt: "HELLCOIN ($666)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HELLCOIN ($666) - Born in the Red",
    description: "The official currency of eternal regret.",
    images: ["/SOCIAL-BANNER.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontGothic.variable} ${fontTerminal.variable} scroll-smooth`}>
      {/* Default body font becomes Crimson (via font-terminal) so no silent fallback to sans */}
      <body className="bg-hell-black font-terminal">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
