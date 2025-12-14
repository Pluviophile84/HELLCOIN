import { Pirata_One, Crimson_Text } from "next/font/google";

// Display / Gothic
export const fontGothic = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gothic",
  display: "swap",
});

// Body / Scripture
export const fontTerminal = Crimson_Text({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-terminal",
  display: "swap",
});
