// File signatures, not provider-supplied MIME metadata, decide the raster decode path.
export const MAX_BYTES = 25 * 1024 * 1024;
export const MAX_SOURCE_PIXELS = 80_000_000;
export const MAX_WORK_PIXELS = 4_000_000;
export const MAX_WORK_SIDE = 2560;
export type WorkingImage = {
  source: ImageBitmap | HTMLCanvasElement;
  width: number;
  height: number;
  dispose: () => void;
};
type Header = { mime: string; width: number; height: number; orientation?: number };
const ascii = (bytes: Uint8Array, start: number, count: number) =>
  String.fromCharCode(...bytes.subarray(start, start + count));

export function inspectRaster(buffer: ArrayBuffer): Header {
  const b = new Uint8Array(buffer),
    d = new DataView(buffer);
  if (b.length < 12) throw new Error("This file is not a supported raster image.");
  if (ascii(b, 1, 3) === "PNG" && b[0] === 137 && b.length >= 24)
    return { mime: "image/png", width: d.getUint32(16), height: d.getUint32(20) };
  if (/^GIF8[79]a$/.test(ascii(b, 0, 6)))
    return { mime: "image/gif", width: d.getUint16(6, true), height: d.getUint16(8, true) };
  if (b[0] === 255 && b[1] === 216) {
    let width = 0,
      height = 0,
      orientation = 1;
    for (let p = 2; p + 4 < b.length; ) {
      if (b[p++] !== 255) break;
      while (b[p] === 255) p++;
      const marker = b[p++];
      if (marker === 218 || marker === 217) break;
      if (marker === 1 || (marker >= 208 && marker <= 215)) continue;
      if (p + 2 > b.length) break;
      const length = d.getUint16(p);
      if (length < 2 || p + length > b.length) break;
      if (
        [192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(marker) &&
        length >= 7
      ) {
        height = d.getUint16(p + 3);
        width = d.getUint16(p + 5);
      }
      if (marker === 225 && ascii(b, p + 2, 6) === "Exif\0\0") {
        const t = p + 8,
          end = p + length;
        if (t + 8 <= end) {
          const little = ascii(b, t, 2) === "II";
          const ifd = t + d.getUint32(t + 4, little);
          if (ifd >= t && ifd + 2 <= end) {
            const count = d.getUint16(ifd, little);
            for (let i = 0; i < count; i++) {
              const e = ifd + 2 + i * 12;
              if (e + 12 > end) break;
              if (d.getUint16(e, little) === 274) orientation = d.getUint16(e + 8, little);
            }
          }
        }
      }
      p += length;
    }
    return { mime: "image/jpeg", width, height, orientation };
  }
  if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") {
    const tag = ascii(b, 12, 4);
    if (tag === "VP8X" && b.length >= 30)
      return {
        mime: "image/webp",
        width: 1 + b[24] + (b[25] << 8) + (b[26] << 16),
        height: 1 + b[27] + (b[28] << 8) + (b[29] << 16),
      };
    if (tag === "VP8L" && b.length >= 25)
      return {
        mime: "image/webp",
        width: 1 + b[21] + ((b[22] & 63) << 8),
        height: 1 + (b[22] >> 6) + (b[23] << 2) + ((b[24] & 15) << 10),
      };
    if (tag === "VP8 " && b.length >= 30)
      return {
        mime: "image/webp",
        width: d.getUint16(26, true) & 16383,
        height: d.getUint16(28, true) & 16383,
      };
  }
  if (ascii(b, 4, 4) === "ftyp") {
    const brands = ascii(b, 8, Math.min(d.getUint32(0), 128) - 8);
    const mime = /avif|avis/.test(brands)
      ? "image/avif"
      : /heic|heix|hevc|hevx|mif1|msf1/.test(brands)
        ? "image/heic"
        : "";
    if (mime) {
      let width = 0,
        height = 0,
        rotated = false;
      // ISO-BMFF image properties: only accept complete, bounded ispe/irot boxes.
      for (let p = 4; p + 16 <= b.length; p++) {
        if (b[p] !== 105) continue;
        const size = d.getUint32(p - 4);
        if (size < 9 || p - 4 + size > b.length) continue;
        const type = ascii(b, p, 4);
        if (type === "ispe" && size === 20) {
          const w = d.getUint32(p + 8),
            h = d.getUint32(p + 12);
          if (w * h > width * height) {
            width = w;
            height = h;
          }
        }
        if (type === "irot" && size === 9) rotated = !!(b[p + 4] & 1);
      }
      return { mime, width, height, orientation: rotated ? 6 : 1 };
    }
  }
  throw new Error(
    "Choose a raster photo or screenshot. SVG, PDF and other documents are not supported."
  );
}
export function workingSize(width: number, height: number) {
  const scale = Math.min(
    1,
    MAX_WORK_SIDE / Math.max(width, height),
    Math.sqrt(MAX_WORK_PIXELS / (width * height))
  );
  return {
    width: Math.max(1, Math.floor(width * scale)),
    height: Math.max(1, Math.floor(height * scale)),
  };
}
export async function decodeImage(file: File, signal: AbortSignal): Promise<WorkingImage> {
  if (!file.size || file.size > MAX_BYTES) throw new Error("Choose an image up to 25 MB.");
  const buffer = await file.arrayBuffer();
  signal.throwIfAborted();
  const header = inspectRaster(buffer);
  if (
    !header.width ||
    !header.height ||
    Math.max(header.width, header.height) > 32768 ||
    header.width * header.height > MAX_SOURCE_PIXELS
  )
    throw new Error(
      "This image is too large or has unreadable dimensions. Choose a photo under 80 megapixels."
    );
  const swap = (header.orientation ?? 1) >= 5;
  const size = workingSize(
    swap ? header.height : header.width,
    swap ? header.width : header.height
  );
  const blob = new Blob([buffer], { type: header.mime });
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(blob, {
        imageOrientation: "from-image",
        resizeWidth: size.width,
        resizeHeight: size.height,
        resizeQuality: "high",
        colorSpaceConversion: "default",
      });
      if (signal.aborted) {
        bitmap.close();
        signal.throwIfAborted();
      }
      if (
        bitmap.width <= MAX_WORK_SIDE &&
        bitmap.height <= MAX_WORK_SIDE &&
        bitmap.width * bitmap.height <= MAX_WORK_PIXELS
      ) {
        return {
          source: bitmap,
          width: bitmap.width,
          height: bitmap.height,
          dispose: () => bitmap.close(),
        };
      }
      bitmap.close();
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }
  // Older/native-only decoders may hold source pixels briefly, but never allocate a source-sized canvas.
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const image = new Image();
    const cleanup = () => {
      image.onload = null;
      image.onerror = null;
      image.src = "";
      URL.revokeObjectURL(url);
      signal.removeEventListener("abort", abort);
    };
    const abort = () => {
      cleanup();
      reject(new DOMException("Image replaced", "AbortError"));
    };
    signal.addEventListener("abort", abort, { once: true });
    image.onerror = () => {
      cleanup();
      reject(
        new Error(
          header.mime === "image/heic"
            ? "This browser cannot decode HEIC. Save/share the photo as JPEG or PNG and try again."
            : "This browser cannot decode this image. Try JPEG or PNG."
        )
      );
    };
    image.onload = () => {
      try {
        if (signal.aborted) {
          abort();
          return;
        }
        const target = workingSize(image.naturalWidth, image.naturalHeight);
        const canvas = document.createElement("canvas");
        canvas.width = target.width;
        canvas.height = target.height;
        const ctx = canvas.getContext("2d", { colorSpace: "srgb" });
        if (!ctx) throw new Error("Canvas is unavailable.");
        ctx.drawImage(image, 0, 0, target.width, target.height);
        cleanup();
        resolve({
          source: canvas,
          ...target,
          dispose: () => {
            canvas.width = canvas.height = 1;
          },
        });
      } catch {
        cleanup();
        reject(new Error("This image could not be opened. Try JPEG or PNG."));
      }
    };
    image.src = url;
  });
}
