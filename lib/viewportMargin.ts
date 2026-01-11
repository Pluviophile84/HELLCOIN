// lib/viewportMargin.ts
export function remMarginToPx(
  top: number,
  right = 0,
  bottom = 0,
  left = 0
): string {
  if (typeof window === "undefined") return "0px 0px 0px 0px";

  const rootFontSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

  const toPx = (rem: number) => `${rem * rootFontSize}px`;

  return `${toPx(top)} ${toPx(right)} ${toPx(bottom)} ${toPx(left)}`;
}
