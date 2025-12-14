import type { Metadata } from "next";
import "./globals.css";
import { fontGothic, fontTerminal } from "./fonts";

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
    <html
      lang="en"
      className={`${fontGothic.variable} ${fontTerminal.variable} scroll-smooth`}
    >
      {/* Default body font becomes Crimson (via font-terminal) so no silent fallback to sans */}
      <body className="font-terminal scanlines bg-hell-black">{children}</body>
    </html>
  );
}
