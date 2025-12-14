import type { Metadata } from "next";
import { Pirata_One, Crimson_Text } from "next/font/google";
import "./globals.css";

// 1) Title Font: Pirata One (NOTE: Pirata One only has weight 400)
const pirata = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirata",
});

// 2) Body Font: Crimson Text (includes semibold 600)
const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-crimson",
});

export const metadata: Metadata = {
  title: "HELLCOIN ($666) - Born in the Red",
  description: "The official currency of eternal regret.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={[
          pirata.variable,
          crimson.variable,
          crimson.className, // ✅ makes Crimson the default font site-wide
          "font-normal",     // default weight; use font-semibold where you want 600
          "scanlines",
          "bg-hell-black",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
