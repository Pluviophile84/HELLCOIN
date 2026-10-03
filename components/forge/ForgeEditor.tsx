"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent, KeyboardEvent } from "react";
import {
  SIZE,
  FONT_WEIGHT,
  centerBackground,
  clampBackground,
  zoomBackground,
  textLayout,
  drawBackground,
  renderMeme,
} from "./render";
import type { Background, TextBlock } from "./render";

const button =
  "rounded-lg border-3 border-black bg-obsidian-800 px-4 py-3 font-bold text-lava-50 shadow-brutal-sm hover:text-gold focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-40";
const field =
  "w-full min-w-0 rounded-lg border-3 border-black bg-obsidian-950 p-3 text-lava-50 focus-visible:ring-2 focus-visible:ring-gold";

export function ForgeEditor({ fontFamily }: { fontFamily: string }) {
  const preview = useRef<HTMLCanvasElement>(null);
  const resources = useRef<{
    background: HTMLCanvasElement;
    sample: CanvasRenderingContext2D;
    overlay: HTMLImageElement;
  } | null>(null);
  const [ready, setReady] = useState(false);
  const [background, setBackground] = useState<Background | null>(null);
  const [blocks, setBlocks] = useState<TextBlock[]>([]);
  const [selected, setSelected] = useState<number | "background">("background");
  const [message, setMessage] = useState("Your images stay in this browser.");
  const [png, setPng] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [copySupported, setCopySupported] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);
  const [loading, setLoading] = useState(false);
  const objectUrls = useRef(new Set<string>());
  const loadVersion = useRef(0);
  const renderVersion = useRef(0);
  const nextId = useRef(1);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    let active = true;
    const pendingLoads = loadVersion;
    const pendingRenders = renderVersion;
    setCopySupported(
      !!navigator.clipboard?.write &&
        typeof ClipboardItem !== "undefined" &&
        (!ClipboardItem.supports || ClipboardItem.supports("image/png"))
    );
    setShareSupported(!!navigator.share && !!navigator.canShare);
    const overlay = new Image();
    overlay.src = "/forge/hellcoin-devil-overlay-master.png";
    void Promise.all([overlay.decode(), document.fonts.load(FONT_WEIGHT + " 64px " + fontFamily)])
      .then(async ([, faces]) => {
        await document.fonts.ready;
        if (!active) return;
        if (!faces.length) throw new Error("The meme font could not load. Reload to try again.");
        const bg = document.createElement("canvas");
        bg.width = bg.height = SIZE;
        const sampleCanvas = document.createElement("canvas");
        sampleCanvas.width = sampleCanvas.height = 16;
        const sample = sampleCanvas.getContext("2d", { willReadFrequently: true });
        if (!sample) throw new Error("Canvas is unavailable in this browser.");
        resources.current = { background: bg, sample, overlay };
        setReady(true);
      })
      .catch(() => {
        if (active) setMessage("The Devil or Inter could not load. Reload the page to try again.");
      });
    const urls = objectUrls.current;
    return () => {
      active = false;
      pendingLoads.current++;
      pendingRenders.current++;
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
      resources.current = null;
    };
  }, [fontFamily]);

  const loadImage = useCallback(async (file: File) => {
    const version = ++loadVersion.current;
    if (!/^image\/(png|jpeg|webp|gif|avif)$/.test(file.type) || file.size > 15 * 1024 * 1024) {
      setLoading(false);
      setMessage("Choose a PNG, JPEG, WebP, GIF, or AVIF image up to 15 MB.");
      return;
    }
    setLoading(true);
    const url = URL.createObjectURL(file);
    objectUrls.current.add(url);
    try {
      let image = new Image();
      image.src = url;
      await image.decode();
      if (version !== loadVersion.current) return;
      if (!image.naturalWidth || image.naturalWidth * image.naturalHeight > 40_000_000)
        throw new Error("Image dimensions are too large. Use an image under 40 megapixels.");
      // Freeze the decoded frame, including animated raster uploads.
      const snapshot = document.createElement("canvas");
      snapshot.width = image.naturalWidth;
      snapshot.height = image.naturalHeight;
      const snapshotContext = snapshot.getContext("2d");
      if (!snapshotContext) throw new Error("Canvas is unavailable.");
      snapshotContext.drawImage(image, 0, 0);
      const frozenBlob = await new Promise<Blob>((resolve, reject) =>
        snapshot.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("This image could not be decoded."))),
          "image/png"
        )
      );
      const frozenUrl = URL.createObjectURL(frozenBlob);
      objectUrls.current.add(frozenUrl);
      try {
        image = new Image();
        image.src = frozenUrl;
        await image.decode();
      } finally {
        URL.revokeObjectURL(frozenUrl);
        objectUrls.current.delete(frozenUrl);
      }
      if (version !== loadVersion.current) return;
      setPng(null);
      setBackground(centerBackground(image));
      setSelected("background");
      setMessage("Image loaded. Drag the background or choose a text layer.");
    } catch (error) {
      if (version === loadVersion.current)
        setMessage(
          error instanceof Error
            ? error.message
            : "This image could not be decoded. Try another file."
        );
    } finally {
      // The decoded image owns its pixels; no object URL needs to remain live.
      URL.revokeObjectURL(url);
      objectUrls.current.delete(url);
      if (version === loadVersion.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const paste = (event: ClipboardEvent) => {
      const file = Array.from(event.clipboardData?.items ?? [])
        .find((item) => item.kind === "file" && item.type.startsWith("image/"))
        ?.getAsFile();
      if (file) {
        event.preventDefault();
        void loadImage(file);
      }
    };
    window.addEventListener("paste", paste);
    return () => window.removeEventListener("paste", paste);
  }, [loadImage]);

  useEffect(() => {
    const pendingRenders = renderVersion;
    const version = ++pendingRenders.current;
    setPng(null);
    if (!ready) return;
    const frame = requestAnimationFrame(() => {
      const canvas = preview.current;
      const r = resources.current;
      if (!canvas || !r) return;
      try {
        const bgContext = r.background.getContext("2d");
        if (!bgContext) throw new Error("Canvas is unavailable.");
        drawBackground(bgContext, background);
        renderMeme(canvas, r.background, r.sample, blocks, r.overlay, fontFamily);
        if (!background) return;
        // Separate native-size final canvas; CSS size and device pixel ratio never enter export.
        const final = document.createElement("canvas");
        final.width = final.height = SIZE;
        renderMeme(final, r.background, r.sample, blocks, r.overlay, fontFamily);
        final.toBlob((blob) => {
          if (version !== renderVersion.current) return;
          if (blob)
            setPng(
              new File([blob], "hellcoin-forged-" + Date.now() + ".png", { type: "image/png" })
            );
          else setMessage("PNG generation failed. Try a smaller image.");
        }, "image/png");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "The preview could not render.");
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      pendingRenders.current++;
    };
  }, [ready, background, blocks, fontFamily]);

  function updateBlock(id: number, patch: Partial<TextBlock>) {
    const ctx = preview.current?.getContext("2d");
    if (!ctx) return;
    try {
      const next = blocks.map((block) => {
        if (block.id !== id) return block;
        const changed = { ...block, ...patch };
        const box = textLayout(ctx, changed, fontFamily);
        return { ...changed, x: box.x, y: box.y };
      });
      setPng(null);
      setBlocks(next);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Text does not fit.");
    }
  }
  function move(dx: number, dy: number) {
    setPng(null);
    if (selected === "background")
      setBackground((bg) => (bg ? clampBackground({ ...bg, x: bg.x + dx, y: bg.y + dy }) : bg));
    else {
      const block = blocks.find((item) => item.id === selected);
      if (block) updateBlock(selected, { x: block.x + dx, y: block.y + dy });
    }
  }
  function pointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!drag.current || event.pointerId !== drag.current.id) return;
    const rect = event.currentTarget.getBoundingClientRect();
    move(
      ((event.clientX - drag.current.x) * SIZE) / rect.width,
      ((event.clientY - drag.current.y) * SIZE) / rect.height
    );
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }
  function keyMove(event: KeyboardEvent<HTMLCanvasElement>) {
    const step = event.shiftKey ? 20 : 4;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (delta[event.key]) {
      event.preventDefault();
      move(...delta[event.key]);
    }
  }
  async function output(action: "download" | "copy" | "share") {
    if (!png || busy || loading) return;
    setBusy(true);
    try {
      if (action === "download") {
        const url = URL.createObjectURL(png);
        objectUrls.current.add(url);
        const a = document.createElement("a");
        a.href = url;
        a.download = png.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
          objectUrls.current.delete(url);
        }, 1000);
        setMessage("PNG downloaded. Regret travels well.");
      } else if (action === "copy") {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": png })]);
        setMessage("Image copied. Open X and paste it into your post.");
      } else {
        if (!navigator.canShare?.({ files: [png] })) {
          setMessage("File sharing is unavailable here. Download PNG still works.");
          return;
        }
        await navigator.share({ files: [png] });
        setMessage("Meme shared.");
      }
    } catch (error) {
      setMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "Sharing cancelled. Your meme is still here."
          : "That action was unavailable or denied. Try Download PNG."
      );
    } finally {
      setBusy(false);
    }
  }

  const selectedLabel =
    selected === "background"
      ? "Background"
      : "Text " + (blocks.findIndex((block) => block.id === selected) + 1);
  const canExport = !!png && !busy && !loading;
  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,1fr)] lg:items-start">
      <section aria-label="Meme preview" className="min-w-0">
        <div
          className="overflow-hidden rounded-xl border-3 border-black bg-obsidian-900 shadow-brutal"
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
          }}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (file) void loadImage(file);
          }}
        >
          <canvas
            ref={preview}
            width={SIZE}
            height={SIZE}
            tabIndex={0}
            aria-label={"Meme canvas. Selected layer: " + selectedLabel}
            aria-describedby="forge-movement"
            className="block aspect-square w-full cursor-move touch-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gold"
            onPointerDown={(event) => {
              if (!ready || event.button !== 0 || drag.current) return;
              event.currentTarget.focus();
              event.currentTarget.setPointerCapture(event.pointerId);
              drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
            }}
            onPointerMove={pointerMove}
            onPointerUp={(event) => {
              if (drag.current?.id === event.pointerId) {
                drag.current = null;
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onLostPointerCapture={() => {
              drag.current = null;
            }}
            onKeyDown={keyMove}
          >
            Your browser needs Canvas support to use the Forge.
          </canvas>
        </div>
        <p id="forge-movement" className="mt-4 text-sm leading-relaxed text-lava-100/70">
          Moving: <strong className="text-gold">{selectedLabel}</strong>. Drag the preview, or focus
          it and use arrow keys. Hold Shift for larger steps. The Devil is fixed.
        </p>
        {!background && (
          <p className="mt-3 text-gold">
            Upload an image to begin. PNG export is always 1080 × 1080.
          </p>
        )}
      </section>
      <div className="min-w-0 space-y-6">
        <section
          className="space-y-4 rounded-xl border-3 border-black bg-obsidian-900 p-5 shadow-brutal"
          aria-labelledby="background-heading"
        >
          <h2 id="background-heading" className="text-2xl text-hellfire-orange">
            THE BACKGROUND
          </h2>
          <label className="block text-sm font-bold">
            Upload image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
              disabled={!ready}
              className="mt-2 block w-full min-w-0 text-sm file:mr-3 file:rounded file:border-0 file:bg-gold file:px-3 file:py-3 file:font-bold file:text-black"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void loadImage(file);
                event.target.value = "";
              }}
            />
          </label>
          <p className="text-xs text-lava-100/60">
            Up to 15 MB / 40 megapixels. Animated images use a still frame. You can also drop onto
            the preview or paste an image.
          </p>
          <label className="block text-sm font-bold">
            Zoom {background ? background.zoom.toFixed(2) : "1.00"}×
            <input
              aria-label="Background zoom"
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={background?.zoom ?? 1}
              disabled={!background}
              className="mt-3 w-full accent-gold"
              onChange={(event) => {
                const zoom = Number(event.target.value);
                setPng(null);
                setBackground((bg) => (bg ? zoomBackground(bg, zoom) : bg));
              }}
            />
          </label>
          <button
            className={button}
            disabled={!background}
            onClick={() => {
              setPng(null);
              setBackground((bg) => (bg ? centerBackground(bg.image) : bg));
              setSelected("background");
            }}
          >
            RESET BACKGROUND
          </button>
        </section>
        <section
          aria-labelledby="text-heading"
          className="space-y-4 rounded-xl border-3 border-black bg-obsidian-900 p-5 shadow-brutal"
        >
          <h2 id="text-heading" className="text-2xl text-hellfire-orange">
            LAST WORDS
          </h2>
          <label className="block text-sm font-bold">
            Movable layer
            <select
              className={field + " mt-2"}
              value={selected}
              onChange={(event) =>
                setSelected(
                  event.target.value === "background" ? "background" : Number(event.target.value)
                )
              }
            >
              <option value="background">Background</option>
              {blocks.map((block, index) => (
                <option key={block.id} value={block.id}>
                  Text {index + 1}
                </option>
              ))}
            </select>
          </label>
          {blocks.map((block, index) => (
            <fieldset key={block.id} className="min-w-0 space-y-3 border-t border-lava-100/20 pt-4">
              <legend className="px-1 text-sm font-bold text-gold">
                Text {index + 1}
                {selected === block.id ? " · SELECTED" : ""}
              </legend>
              <label className="block text-sm">
                Words
                <textarea
                  aria-label={"Text " + (index + 1) + " words"}
                  className={field + " mt-2 resize-y"}
                  rows={3}
                  maxLength={500}
                  value={block.text}
                  onFocus={() => setSelected(block.id)}
                  onChange={(event) => updateBlock(block.id, { text: event.target.value })}
                />
              </label>
              <label className="block text-sm">
                Font size: {block.size} px
                <input
                  aria-label={"Text " + (index + 1) + " font size"}
                  type="range"
                  min="32"
                  max="96"
                  value={block.size}
                  className="mt-2 w-full accent-gold"
                  onChange={(event) => updateBlock(block.id, { size: Number(event.target.value) })}
                />
              </label>
              <label className="block text-sm">
                Contrast background
                <select
                  aria-label={"Text " + (index + 1) + " contrast"}
                  className={field + " mt-2"}
                  value={block.contrast}
                  onChange={(event) =>
                    updateBlock(block.id, { contrast: event.target.value as TextBlock["contrast"] })
                  }
                >
                  <option>Auto</option>
                  <option>On</option>
                  <option>Off</option>
                </select>
              </label>
              <button
                className={button}
                onClick={() => {
                  setPng(null);
                  setBlocks((items) => items.filter((item) => item.id !== block.id));
                  if (selected === block.id) setSelected("background");
                }}
              >
                REMOVE TEXT {index + 1}
              </button>
            </fieldset>
          ))}
          <button
            className={button}
            disabled={!ready || blocks.length >= 2}
            onClick={() => {
              if (blocks.length >= 2) return;
              const id = nextId.current++;
              setPng(null);
              setBlocks([
                ...blocks,
                { id, text: "", size: 64, x: 100, y: blocks.length ? 300 : 80, contrast: "Auto" },
              ]);
              setSelected(id);
            }}
          >
            ADD TEXT ({blocks.length}/2)
          </button>
          <p className="text-xs text-lava-100/60">
            Inter Bold. White letters. Up to two blocks; none is fine. Text stays clear of the
            Devil.
          </p>
        </section>
        <section aria-label="Export meme" className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              className={button + " hellfire-bg"}
              disabled={!canExport}
              onClick={() => void output("download")}
            >
              DOWNLOAD PNG
            </button>
            <button
              className={button}
              disabled={!canExport || !copySupported}
              onClick={() => void output("copy")}
            >
              COPY IMAGE
            </button>
            <button
              className={button}
              disabled={
                !canExport || !shareSupported || !png || !navigator.canShare?.({ files: [png] })
              }
              onClick={() => void output("share")}
            >
              SHARE MEME
            </button>
          </div>
          {!copySupported && (
            <p className="text-xs text-lava-100/70">
              Image clipboard writing is unavailable here. Download PNG still works.
            </p>
          )}
          {(!shareSupported || (png && !navigator.canShare?.({ files: [png] }))) && (
            <p className="text-xs text-lava-100/70">
              File sharing is unavailable here. Download PNG and attach it manually.
            </p>
          )}
          <p className="text-sm text-lava-100/70">
            Copy Image → open X → paste. Image attachment is up to you.
          </p>
          <p
            role="status"
            aria-live="polite"
            className="rounded-lg border-3 border-black bg-obsidian-800 p-4 text-sm text-gold"
          >
            {loading
              ? "Loading your image…"
              : !ready
                ? "Loading the Devil and Inter… " + message
                : message}
          </p>
        </section>
      </div>
    </div>
  );
}
