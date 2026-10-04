"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { decodeImage } from "./media";
import { SIZE, FONT_WEIGHT, centerBackground, drawBackground, renderMeme } from "./render";
import type { Background, Backdrop, TextBlock } from "./render";
export type Scene = { background: Background | null; backdrop: Backdrop; blocks: TextBlock[] };
type Files = { revision: number; png: File; jpg: File; pngUrl: string; jpgUrl: string };
const blobOf = (canvas: HTMLCanvasElement, type: string, quality?: number) =>
  new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Encoding failed. Please try again."))),
      type,
      quality
    )
  );

export function useForge(primaryFont: string, active: boolean, exporting: boolean) {
  const font = primaryFont + ", sans-serif";
  const preview = useRef<HTMLCanvasElement>(null);
  const initial: Scene = { background: null, backdrop: "OBSIDIAN", blocks: [] };
  const current = useRef(initial);
  const [scene, setScene] = useState(initial);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [encoding, setEncoding] = useState(false);
  const [message, setMessage] = useState("Ready for your words. No upload needed.");
  const [files, setFiles] = useState<Files | null>(null);
  const revision = useRef(0);
  const alive = useRef(false);
  const decoder = useRef<AbortController | null>(null);
  const generated = useRef<Files | null>(null);
  const pending = useRef<{ revision: number; promise: Promise<Files | null> } | null>(null);
  const resources = useRef<{
    background: HTMLCanvasElement;
    sample: CanvasRenderingContext2D;
    overlay: HTMLImageElement;
  } | null>(null);

  const releaseFiles = useCallback(() => {
    const old = generated.current;
    if (old) {
      URL.revokeObjectURL(old.pngUrl);
      URL.revokeObjectURL(old.jpgUrl);
    }
    generated.current = null;
  }, []);
  const change = useCallback(
    (update: (scene: Scene) => Scene) => {
      const previous = current.current;
      const next = update(previous);
      if (next === previous) return;
      revision.current++;
      releaseFiles();
      setFiles(null);
      current.current = next;
      setScene(next);
      if (previous.background?.image !== next.background?.image)
        previous.background?.image.dispose();
    },
    [releaseFiles]
  );

  useEffect(() => {
    let cancelled = false;
    alive.current = true;
    const live = alive,
      rev = revision,
      decode = decoder,
      state = current,
      r = resources;
    const overlay = new Image();
    overlay.src = "/forge/hellcoin-devil-overlay-master.png";
    void Promise.all([
      overlay.decode(),
      document.fonts.load(FONT_WEIGHT + " 64px " + primaryFont, "Still here. ËëÇç Éé Àà Žž Ăă"),
    ])
      .then(async ([, faces]) => {
        await document.fonts.ready;
        if (cancelled) return;
        if (!faces.length) throw new Error("Inter is unavailable.");
        const background = document.createElement("canvas");
        background.width = background.height = SIZE;
        const tiny = document.createElement("canvas");
        tiny.width = tiny.height = 16;
        const sample = tiny.getContext("2d", { willReadFrequently: true, colorSpace: "srgb" });
        if (!sample) throw new Error("Canvas is unavailable.");
        r.current = { background, sample, overlay };
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setMessage("The Devil or Inter could not load. Reload to try again.");
      });
    return () => {
      cancelled = true;
      live.current = false;
      rev.current++;
      decode.current?.abort();
      state.current.background?.image.dispose();
      releaseFiles();
      r.current = null;
    };
  }, [primaryFont, releaseFiles]);

  const loadImage = useCallback(
    async (file: File) => {
      decoder.current?.abort();
      const controller = new AbortController();
      decoder.current = controller;
      setLoading(true);
      setMessage("Opening image…");
      try {
        const image = await decodeImage(file, controller.signal);
        if (controller.signal.aborted || !alive.current) {
          image.dispose();
          return;
        }
        change((old) => ({ ...old, background: centerBackground(image) }));
        setMessage("Image ready. Animated inputs use a still frame.");
      } catch (error) {
        if (!controller.signal.aborted && alive.current)
          setMessage(
            error instanceof Error
              ? error.message
              : "This image could not be opened. Try JPEG or PNG."
          );
      } finally {
        if (!controller.signal.aborted && alive.current) setLoading(false);
      }
    },
    [change]
  );

  useEffect(() => {
    if (!active) return;
    const paste = (event: ClipboardEvent) => {
      const file = Array.from(event.clipboardData?.files ?? [])[0];
      if (file) {
        event.preventDefault();
        void loadImage(file);
      }
    };
    window.addEventListener("paste", paste);
    return () => window.removeEventListener("paste", paste);
  }, [active, loadImage]);

  const draw = useCallback(
    (target: HTMLCanvasElement) => {
      const r = resources.current;
      if (!r) throw new Error("The editor is still loading.");
      const ctx = r.background.getContext("2d", { alpha: false, colorSpace: "srgb" });
      if (!ctx) throw new Error("Canvas is unavailable.");
      const s = current.current;
      drawBackground(ctx, s.background, s.backdrop);
      renderMeme(
        target,
        r.background,
        r.sample,
        s.blocks,
        r.overlay,
        font,
        !s.background && s.backdrop === "WHITE"
      );
    },
    [font]
  );

  useEffect(() => {
    if (!ready || !active) return;
    const frame = requestAnimationFrame(() => {
      if (preview.current) {
        try {
          draw(preview.current);
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "Preview unavailable.");
        }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [ready, active, scene, draw]);

  const prepare = useCallback((): Promise<Files | null> => {
    const rev = revision.current;
    if (generated.current?.revision === rev) return Promise.resolve(generated.current);
    if (pending.current?.revision === rev) return pending.current.promise;
    if (!resources.current) return Promise.resolve(null);
    setEncoding(true);
    const promise = (async () => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = SIZE;
      try {
        // One immutable pixel snapshot, encoded only on Export entry or an export action.
        draw(canvas);
        const png = await blobOf(canvas, "image/png");
        if (rev !== revision.current || !alive.current) return null;
        let jpg = await blobOf(canvas, "image/jpeg", 0.92);
        for (let q = 0.86; jpg.size > 4_500_000 && q >= 0.62; q -= 0.06)
          jpg = await blobOf(canvas, "image/jpeg", q);
        if (jpg.size > 4_500_000)
          throw new Error("This export is too large. Try simplifying the image.");
        if (rev !== revision.current || !alive.current) return null;
        const name =
          "hellcoin-meme-" +
          new Date()
            .toISOString()
            .replace(/[^0-9]/g, "")
            .slice(0, 14);
        const next = {
          revision: rev,
          png: new File([png], name + ".png", { type: "image/png" }),
          jpg: new File([jpg], name + ".jpg", { type: "image/jpeg" }),
          pngUrl: URL.createObjectURL(png),
          jpgUrl: URL.createObjectURL(jpg),
        };
        releaseFiles();
        generated.current = next;
        setFiles(next);
        return next;
      } catch (error) {
        if (alive.current && rev === revision.current)
          setMessage(error instanceof Error ? error.message : "Export failed. Try again.");
        return null;
      } finally {
        canvas.width = canvas.height = 1;
        if (pending.current?.revision === rev) {
          pending.current = null;
          if (alive.current) setEncoding(false);
        }
      }
    })();
    pending.current = { revision: rev, promise };
    return promise;
  }, [draw, releaseFiles]);

  useEffect(() => {
    if (active && exporting && ready && !loading) void prepare();
  }, [active, exporting, ready, loading, scene, prepare]);
  return {
    preview,
    scene,
    current,
    change,
    ready,
    loading,
    encoding,
    files,
    generated,
    revision,
    message,
    setMessage,
    loadImage,
    prepare,
    font,
  };
}
