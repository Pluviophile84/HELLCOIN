import type { WorkingImage } from "./media";
export const SIZE = 1080;
export const FONT_WEIGHT = 700;
export const MARGIN = 36;
export const DEVIL = { right: 434, top: 587 };
export type TextBlock = {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  contrast: "Auto" | "On" | "Off";
};
export type Background = {
  image: WorkingImage;
  baseScale: number;
  zoom: number;
  x: number;
  y: number;
};
export type Layout = {
  lines: string[];
  width: number;
  height: number;
  x: number;
  y: number;
  lineHeight: number;
  textX: number;
  baseline: number;
};
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function clampBackground(bg: Background): Background {
  const scale = bg.baseScale * bg.zoom;
  return {
    ...bg,
    x: clamp(bg.x, SIZE - bg.image.width * scale, 0),
    y: clamp(bg.y, SIZE - bg.image.height * scale, 0),
  };
}
export function centerBackground(image: WorkingImage): Background {
  const baseScale = Math.max(SIZE / image.width, SIZE / image.height);
  return {
    image,
    baseScale,
    zoom: 1,
    x: (SIZE - image.width * baseScale) / 2,
    y: (SIZE - image.height * baseScale) / 2,
  };
}
export function zoomBackground(bg: Background, zoom: number): Background {
  const ratio = zoom / bg.zoom;
  return clampBackground({
    ...bg,
    zoom,
    x: SIZE / 2 - (SIZE / 2 - bg.x) * ratio,
    y: SIZE / 2 - (SIZE / 2 - bg.y) * ratio,
  });
}
export function textLayout(
  ctx: CanvasRenderingContext2D,
  block: TextBlock,
  family: string
): Layout {
  ctx.font = FONT_WEIGHT + " " + block.size + "px " + family;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const padding = block.size / 4;
  const maxWidth = SIZE - 2 * (MARGIN + padding);
  const measureWidth = (text: string) => {
    const metrics = ctx.measureText(text);
    return Math.max(
      metrics.width,
      (metrics.actualBoundingBoxLeft ?? metrics.width / 2) +
        (metrics.actualBoundingBoxRight ?? metrics.width / 2)
    );
  };
  const lines: string[] = [];
  for (const paragraph of block.text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      const candidate = line ? line + " " + word : word;
      if (measureWidth(candidate) <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line) {
        lines.push(line);
        line = "";
      }
      for (const char of Array.from(word)) {
        if (measureWidth(line + char) > maxWidth && line) {
          lines.push(line);
          line = "";
        }
        line += char;
      }
    }
    lines.push(line);
  }
  const lineHeight = block.size * 1.25;
  const metrics = lines.map((line) => ctx.measureText(line));
  const verticalMetrics = lines.map((line, i) => (line ? metrics[i] : ctx.measureText("Mg")));
  // Bound the actual ink across all baselines, preserving the established line spacing.
  // Empty lines use font ink bounds so deliberate blank lines keep their space.
  const left = Math.min(...metrics.map((m) => -(m.actualBoundingBoxLeft ?? m.width / 2)));
  const right = Math.max(...metrics.map((m) => m.actualBoundingBoxRight ?? m.width / 2));
  const top = Math.min(
    ...verticalMetrics.map(
      (m, i) => i * lineHeight - (m.actualBoundingBoxAscent ?? block.size * 0.8)
    )
  );
  const bottom = Math.max(
    ...verticalMetrics.map(
      (m, i) => i * lineHeight + (m.actualBoundingBoxDescent ?? block.size * 0.2)
    )
  );
  const width = Math.max(1, right - left) + padding * 2;
  const height = Math.max(1, bottom - top) + padding * 2;
  // Any accepted block must fit above the observer. Never silently clip or shrink text.
  if (height > DEVIL.top - MARGIN)
    throw new Error("Too many lines at this size. Shorten the text or reduce its size.");
  let x = clamp(block.x, MARGIN, SIZE - MARGIN - width);
  let y = clamp(block.y, MARGIN, SIZE - MARGIN - height);
  if (x < DEVIL.right && y + height > DEVIL.top) {
    const above = DEVIL.top - height;
    const canGoRight = DEVIL.right + width <= SIZE - MARGIN;
    if (canGoRight && DEVIL.right - x < y - above) x = DEVIL.right;
    else y = above;
  }
  return { lines, width, height, x, y, lineHeight, textX: padding - left, baseline: padding - top };
}
export const BACKDROPS = { OBSIDIAN: "#0D0A08", HELLFIRE: "#991F0A", WHITE: "#FFFFFF" } as const;
export type Backdrop = keyof typeof BACKDROPS;
export function drawBackground(
  ctx: CanvasRenderingContext2D,
  bg: Background | null,
  backdrop: Backdrop = "OBSIDIAN"
) {
  ctx.fillStyle = BACKDROPS[backdrop];
  ctx.fillRect(0, 0, SIZE, SIZE);
  if (bg) {
    const scale = bg.baseScale * bg.zoom;
    ctx.drawImage(bg.image.source, bg.x, bg.y, bg.image.width * scale, bg.image.height * scale);
  }
}
function needsContrast(sample: CanvasRenderingContext2D, bgCanvas: HTMLCanvasElement, box: Layout) {
  // 256 samples per block, always from background alone, never from other text or the Devil.
  sample.clearRect(0, 0, 16, 16);
  sample.drawImage(bgCanvas, box.x, box.y, box.width, box.height, 0, 0, 16, 16);
  const data = sample.getImageData(0, 0, 16, 16).data;
  let sum = 0,
    squares = 0,
    bright = 0;
  for (let i = 0; i < data.length; i += 4) {
    const channels = [data[i], data[i + 1], data[i + 2]].map((v) => {
      const s = v / 255;
      return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    const lum = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    sum += lum;
    squares += lum * lum;
    if (lum > 0.183) bright++;
  }
  return bright / 256 > 0.1 || sum / 256 > 0.15 || squares / 256 - Math.pow(sum / 256, 2) > 0.018;
}
export function renderMeme(
  canvas: HTMLCanvasElement,
  backgroundCanvas: HTMLCanvasElement,
  sample: CanvasRenderingContext2D,
  blocks: TextBlock[],
  overlay: HTMLImageElement,
  family: string,
  blackOnWhite = false
) {
  const ctx = canvas.getContext("2d", { alpha: false, colorSpace: "srgb" });
  if (!ctx) throw new Error("Canvas is unavailable in this browser.");
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.drawImage(backgroundCanvas, 0, 0);
  const layouts = blocks.map((block) => ({ block, box: textLayout(ctx, block, family) }));
  for (const { block, box } of layouts) {
    if (!block.text.trim() || blackOnWhite) continue;
    if (
      block.contrast === "On" ||
      (block.contrast === "Auto" && needsContrast(sample, backgroundCanvas, box))
    ) {
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.fillRect(box.x, box.y, box.width, box.height);
    }
  }
  ctx.fillStyle = blackOnWhite ? "#000000" : "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  for (const { block, box } of layouts) {
    ctx.font = FONT_WEIGHT + " " + block.size + "px " + family;
    box.lines.forEach((line, i) =>
      ctx.fillText(line, box.x + box.textX, box.y + box.baseline + i * box.lineHeight)
    );
  }
  ctx.drawImage(overlay, 0, 0, SIZE, SIZE);
}
