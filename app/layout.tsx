import type { Metadata } from "next";
// 1. Import Pirata_One (Title) and Marcellus (The "Chiseled Stone" Sans)
import { Pirata_One, Marcellus } from "next/font/google";
import "./globals.css";

// 2. Configure Pirata One (Headers)
const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

// 3. Configure Marcellus (Body)
// This is a "Flared Sans-Serif".
// It looks like text chiseled into stone or a crypt wall. 
// It feels ancient and elegant without the "clutter" of a traditional serif.
const ancientSans = Marcellus({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-vt323" // Maps to 'font-terminal' in Tailwind
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
      {/* 4. Inject variables */}
      <body className={`${pirata.variable} ${ancientSans.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
