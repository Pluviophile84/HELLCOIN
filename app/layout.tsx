import type { Metadata } from "next";
import localFont from "next/font/local";
import { Crimson_Text } from "next/font/google";
import "./globals.css";

// 1. Custom Title Font
const customTitle = localFont({
  src: "./fonts/myfonts8.woff2",
  variable: "--font-pirata", 
  display: "swap",
});

// 2. Body Font
const crimson = Crimson_Text({ 
  weight: ["400", "600", "700"], 
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-vt323" 
});

export const metadata: Metadata = {
  title: "HELLCOIN ($666) - Born in the Red",
  description: "The official currency of eternal regret.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${customTitle.variable} ${crimson.variable} font-sans scanlines bg-hell-black`}>
        
        {/* FIX: FORCE SCROLL TO TOP ON REFRESH */}
        {/* This prevents the "Bouncing Navbar" bug by ensuring every visit starts at the Hero section */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />

        {children}
      </body>
    </html>
  );
}
