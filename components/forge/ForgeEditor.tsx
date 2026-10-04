"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import {
  BACKDROPS,
  SIZE,
  DEVIL,
  clampBackground,
  centerBackground,
  textLayout,
  zoomBackground,
} from "./render";
import type { TextBlock } from "./render";
import { useForge } from "./useForge";
import styles from "./ForgeEditor.module.css";

const button =
  "min-h-11 rounded-lg border-3 border-black bg-obsidian-800 px-3 py-2 text-sm font-bold text-lava-50 shadow-brutal-sm hover:text-gold focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-40";
const primaryButton =
  "hellfire-bg min-h-11 rounded-lg border-3 border-black px-3 py-2 text-sm font-bold text-white shadow-brutal-sm hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-gold active:text-black disabled:cursor-not-allowed disabled:opacity-60";
const field =
  "w-full min-w-0 rounded-lg border-3 border-black bg-obsidian-950 px-3 py-2 text-base text-lava-50 focus-visible:ring-2 focus-visible:ring-gold";
const modes = ["IMAGE", "TEXT", "EXPORT"] as const;
type Mode = (typeof modes)[number];
type Target = { type: "background" } | { type: "text"; id: number } | null;
export function ForgeEditor({
  fontFamily,
  active = true,
  embedded = false,
  onClose,
}: {
  fontFamily: string;
  active?: boolean;
  embedded?: boolean;
  onClose?: () => void;
}) {
  const [mode, setMode] = useState<Mode>("IMAGE");
  const [selected, setSelected] = useState<number | null>(null);
  const [moving, setMoving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [previewWidth, setPreviewWidth] = useState(0);
  const [busy, setBusy] = useState(false);
  const [copySupported, setCopySupported] = useState(false);
  const [shareAvailable, setShareAvailable] = useState(false);
  const workspace = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const nextId = useRef(1);
  const drag = useRef<{ id: number; x: number; y: number; target: Target } | null>(null);
  const id = useId();
  const engine = useForge(fontFamily, active, mode === "EXPORT" && !dragging);
  const {
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
  } = engine;
  const selectedBlock = scene.blocks.find((b) => b.id === selected);
  const selectedIndex = scene.blocks.findIndex((b) => b.id === selected);
  const target: Target =
    mode === "IMAGE"
      ? scene.background
        ? { type: "background" }
        : null
      : selectedBlock
        ? { type: "text", id: selectedBlock.id }
        : null;
  const selectedLabel = target?.type === "text" ? "Text " + (selectedIndex + 1) : "image";
  const ctx = ready ? preview.current?.getContext("2d") : null;
  const scale = previewWidth / SIZE;
  const hits =
    ctx && scale && mode !== "IMAGE"
      ? scene.blocks.flatMap((block, index) => {
          if (!block.text.trim()) return [];
          const box = textLayout(ctx, block, font);
          const hit = {
            x: Math.max(0, box.x - Math.max(0, (44 / scale - box.width) / 2)),
            y: Math.max(0, box.y - Math.max(0, (44 / scale - box.height) / 2)),
            width: Math.max(box.width, 44 / scale),
            height: Math.max(box.height, 44 / scale),
          };
          hit.width = Math.min(hit.width, SIZE - hit.x);
          hit.height = Math.min(hit.height, SIZE - hit.y);
          if (hit.x < DEVIL.right && hit.y + hit.height > DEVIL.top) {
            if (box.x >= DEVIL.right) {
              hit.width -= DEVIL.right - hit.x;
              hit.x = DEVIL.right;
            } else hit.height = DEVIL.top - hit.y;
          }
          return hit.width > 0 && hit.height > 0 ? [{ block, index, hit }] : [];
        })
      : [];
  useEffect(() => {
    const canvas = preview.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => setPreviewWidth(canvas.clientWidth));
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [preview]);

  useEffect(() => {
    setCopySupported(
      window.isSecureContext &&
        !!navigator.clipboard?.write &&
        typeof ClipboardItem !== "undefined" &&
        (!ClipboardItem.supports || ClipboardItem.supports("image/png"))
    );
  }, []);
  useEffect(() => {
    if (!active) {
      setMoving(false);
      if (workspace.current) workspace.current.dataset.keyboard = "false";
      return;
    }
    const element = workspace.current;
    if (!element) return;
    const navHeight = () =>
      embedded
        ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0
        : 0;
    const fullScreen = () =>
      embedded &&
      window.matchMedia("(max-width: 767px), (max-height: 500px) and (pointer: coarse)").matches;
    // Account for the fixed navbar once; document scroll-padding also affects scrollIntoView.
    const align = () =>
      window.scrollTo({
        top: Math.max(
          0,
          window.scrollY +
            element.getBoundingClientRect().top -
            navHeight() -
            8 -
            (window.visualViewport?.offsetTop ?? 0)
        ),
        behavior: "instant",
      });
    let frame = 0;
    let lastWidth = 0;
    const layout = () => {
      const width = element.clientWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      // Freeze height-dependent landscape/tray layout until the container width changes.
      element.style.setProperty("--forge-layout-height", window.innerHeight + "px");
      element.dataset.landscape = String(
        window.innerWidth > window.innerHeight && window.innerWidth < 1024
      );
    };
    const keyboard = () => {
      const viewport = window.visualViewport;
      const focused = document.activeElement as HTMLElement | null;
      const fieldFocused =
        !!focused &&
        element.contains(focused) &&
        focused.matches("textarea, input:not([type=range])");
      const keyboardVisible = !!viewport && window.innerHeight - viewport.height > 150;
      // Keep the tray raised through a tap that blurs the field; the viewport resize ends it.
      const occluded = keyboardVisible && (fieldFocused || element.dataset.keyboard === "true");
      if (fullScreen()) {
        element.dataset.keyboard = String(occluded);
        if (occluded && viewport) {
          element.style.setProperty(
            "--forge-keyboard-bottom",
            Math.max(0, window.innerHeight - viewport.offsetTop - viewport.height) + "px"
          );
          element.style.setProperty(
            "--forge-keyboard-visible",
            Math.max(12 * 16, viewport.height - 60) + "px"
          );
        }
      }
      if (!occluded || !viewport || !focused) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const panel = element.querySelector<HTMLElement>('[role="tabpanel"]');
        if (panel)
          panel.scrollTop += Math.max(
            0,
            focused.getBoundingClientRect().bottom - panel.getBoundingClientRect().bottom + 8
          );
        if (!fullScreen()) {
          const overflow =
            focused.getBoundingClientRect().bottom - viewport.offsetTop - viewport.height + 12;
          if (overflow > 0) window.scrollBy({ top: overflow, behavior: "instant" });
        }
      });
    };
    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(element);
    if (!embedded) align();
    element
      .querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
      ?.focus({ preventScroll: true });
    element.addEventListener("focusin", keyboard);
    element.addEventListener("focusout", keyboard);
    window.visualViewport?.addEventListener("resize", keyboard);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener("focusin", keyboard);
      element.removeEventListener("focusout", keyboard);
      window.visualViewport?.removeEventListener("resize", keyboard);
    };
  }, [active, embedded]);

  function selectMode(next: Mode) {
    setMode(next);
    setMoving(false);
    if (next === "TEXT" && selected === null && scene.blocks.length)
      setSelected(scene.blocks[0].id);
  }
  function tabKey(event: KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault();
    selectMode(modes[next]);
    tabs.current[next]?.focus();
  }
  function updateBlock(blockId: number, patch: Partial<TextBlock>) {
    const ctx = preview.current?.getContext("2d");
    if (!ctx) return;
    try {
      change((old) => ({
        ...old,
        blocks: old.blocks.map((block) => {
          if (block.id !== blockId) return block;
          const next = { ...block, ...patch };
          const box = textLayout(ctx, next, font);
          return { ...next, x: box.x, y: box.y };
        }),
      }));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "That text does not fit.");
    }
  }
  function move(dx: number, dy: number, manipulation: Target = target) {
    if (!manipulation) return;
    if (manipulation.type === "text") {
      const block = current.current.blocks.find((b) => b.id === manipulation.id);
      if (block) updateBlock(block.id, { x: block.x + dx, y: block.y + dy });
    } else
      change((old) =>
        old.background
          ? {
              ...old,
              background: clampBackground({
                ...old.background,
                x: old.background.x + dx,
                y: old.background.y + dy,
              }),
            }
          : old
      );
  }
  function pointerMove(event: PointerEvent<HTMLElement>) {
    if (!drag.current || event.pointerId !== drag.current.id) return;
    const rect = preview.current!.getBoundingClientRect();
    move(
      ((event.clientX - drag.current.x) * SIZE) / rect.width,
      ((event.clientY - drag.current.y) * SIZE) / rect.height,
      drag.current.target
    );
    drag.current = { ...drag.current, x: event.clientX, y: event.clientY };
  }
  function keyMove(event: KeyboardEvent<HTMLElement>, manipulation: Target = target) {
    if (event.key === "Escape") {
      setMoving(false);
      return;
    }
    const step = event.shiftKey ? 20 : 4;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (delta[event.key]) {
      event.preventDefault();
      move(...delta[event.key], manipulation);
    }
  }
  function startDrag(event: PointerEvent<HTMLElement>, manipulation: Target) {
    if (!ready || !manipulation || event.button !== 0 || drag.current) return;
    if (manipulation.type === "text") setSelected(manipulation.id);
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      target: manipulation,
    };
    setDragging(true);
  }
  function endDrag(event: PointerEvent<HTMLElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }
  const canShare = (file: File | undefined) => {
    try {
      return (
        !!file &&
        typeof navigator !== "undefined" &&
        !!navigator.share &&
        !!navigator.canShare?.({ files: [file] })
      );
    } catch {
      return false;
    }
  };
  async function output(action: "jpg" | "png" | "copy" | "share") {
    if (busy || loading || !ready || drag.current) return;
    setBusy(true);
    try {
      // Share/copy use files prepared on Export entry to preserve user activation.
      const asset =
        generated.current?.revision === revision.current
          ? generated.current
          : action === "share" || action === "copy"
            ? null
            : await prepare();
      if (!asset || asset.revision !== revision.current) {
        setMessage("Generating the latest image. Try the action again when ready.");
        return;
      }
      if (action === "share") {
        if (!canShare(asset.jpg)) {
          setMessage("Sharing unavailable here. Download JPG or open the image to save it.");
          return;
        }
        await navigator.share({ files: [asset.jpg] });
        setMessage("Meme shared.");
      } else if (action === "copy") {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": asset.png })]);
        setMessage("Image copied. Paste it into any supported app.");
      } else {
        const a = document.createElement("a");
        a.href = action === "jpg" ? asset.jpgUrl : asset.pngUrl;
        if ("download" in HTMLAnchorElement.prototype) a.download = asset[action].name;
        else {
          a.target = "_blank";
          a.rel = "noopener";
        }
        document.body.appendChild(a);
        a.click();
        a.remove();
        setMessage(
          "File ready. If it did not save, use Open image below, then Save Image / Save to Files."
        );
      }
    } catch (error) {
      setMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "Sharing cancelled. Your meme is still here."
          : "This browser blocked that action. Try Download or Open image to save."
      );
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    if (files) setShareAvailable(canShare(files.jpg));
  }, [files]);
  const canExport = ready && !!files && !loading && !encoding && !busy && !dragging;
  const shareSupported = files ? canShare(files.jpg) : shareAvailable;

  return (
    <div
      ref={workspace}
      className={
        styles.workspace +
        " " +
        (embedded ? styles.embedded : "") +
        " overflow-hidden rounded-xl border-3 border-black bg-obsidian-900 shadow-brutal"
      }
      aria-label="Meme Forge workspace"
    >
      <div
        className={
          styles.forgeHeader +
          " flex min-h-12 items-center justify-between gap-3 border-b-3 border-black px-3 py-1"
        }
      >
        <span className="font-heading text-xl text-hellfire-orange">THE FORGE</span>
        {onClose ? (
          <button className="min-h-11 rounded px-2 text-sm font-bold text-gold" onClick={onClose}>
            CLOSE FORGE
          </button>
        ) : (
          <span className="text-xs text-lava-100/60">1080 × 1080 · LOCAL ONLY</span>
        )}
      </div>
      <div className={styles.body}>
        <div
          className={styles.preview}
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
          <div className={styles.square}>
            <div className={styles.surface + " rounded-lg border-3 border-black"}>
              <canvas
                ref={preview}
                width={SIZE}
                height={SIZE}
                tabIndex={0}
                aria-label={"Meme preview. Move " + selectedLabel + " with arrow keys."}
                aria-describedby={id + "-movement"}
                className={
                  styles.canvas +
                  " " +
                  (moving ? styles.moving : "") +
                  " rounded-lg bg-obsidian-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                }
                onPointerDown={(event) => {
                  if (target?.type === "background" && (event.pointerType === "mouse" || moving))
                    startDrag(event, target);
                }}
                onPointerMove={pointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
                onKeyDown={keyMove}
              >
                Live 1080-square meme preview: your backdrop, up to two high-contrast text blocks,
                and the fixed Devil. Use the labeled controls to edit and export.
              </canvas>
              {hits.map(({ block, index, hit }) => (
                <div
                  key={block.id}
                  role="button"
                  tabIndex={0}
                  aria-label={"Drag Text " + (index + 1)}
                  className={
                    styles.textTarget +
                    (mode === "TEXT" && selected === block.id ? " " + styles.selectedText : "")
                  }
                  style={{
                    left: (hit.x / SIZE) * 100 + "%",
                    top: (hit.y / SIZE) * 100 + "%",
                    width: (hit.width / SIZE) * 100 + "%",
                    height: (hit.height / SIZE) * 100 + "%",
                    zIndex: selected === block.id ? 3 : index + 1,
                  }}
                  onPointerDown={(event) => startDrag(event, { type: "text", id: block.id })}
                  onPointerMove={pointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onLostPointerCapture={endDrag}
                  onKeyDown={(event) => keyMove(event, { type: "text", id: block.id })}
                />
              ))}
            </div>
          </div>
          <div className={styles.interactionRail}>
            {mode === "IMAGE" && !!scene.background && (
              <button
                className={button + (moving ? " border-gold text-gold" : "")}
                aria-pressed={moving}
                disabled={!ready}
                onClick={() => setMoving((value) => !value)}
              >
                {moving ? "DONE MOVING" : "MOVE IMAGE"}
              </button>
            )}
            <p id={id + "-movement"} className="max-w-40 text-xs leading-4 text-lava-100/70">
              {target?.type === "text"
                ? "Drag a text block. Swipe elsewhere to scroll."
                : moving
                  ? "Drag in any direction. Done restores scrolling."
                  : mode === "IMAGE"
                    ? scene.background
                      ? "Swipe to scroll. Use Move to reposition."
                      : "Swipe to scroll. Add an image to move it."
                    : mode === "EXPORT"
                      ? "Drag text for a final adjustment."
                      : "Swipe to scroll."}
            </p>
          </div>
        </div>
        <div
          className={
            styles.tray + " border-t-3 border-black bg-obsidian-800 lg:border-l-3 lg:border-t-0"
          }
        >
          <div
            role="tablist"
            aria-label="Forge controls"
            className="grid grid-cols-3 border-b-3 border-black"
          >
            {modes.map((item, index) => (
              <button
                key={item}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                id={id + "-" + item}
                role="tab"
                aria-selected={mode === item}
                aria-controls={id + "-panel"}
                tabIndex={mode === item ? 0 : -1}
                className={
                  "min-h-12 px-2 font-heading text-xl" +
                  (index < 2 ? " border-r-3 border-black" : "") +
                  " " +
                  (mode === item ? "hellfire-bg text-white" : "bg-obsidian-900 text-lava-100/60")
                }
                onClick={() => selectMode(item)}
                onKeyDown={(event) => tabKey(event, index)}
              >
                {item}
              </button>
            ))}
          </div>
          <div
            id={id + "-panel"}
            role="tabpanel"
            aria-labelledby={id + "-" + mode}
            tabIndex={0}
            className={styles.panel + " space-y-4"}
          >
            {mode === "IMAGE" && (
              <>
                <fieldset>
                  <legend className="mb-2 text-sm font-bold text-gold">HELLCOIN backdrop</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(BACKDROPS).map((name) => (
                      <button
                        key={name}
                        className={
                          button +
                          " px-1 text-xs" +
                          (scene.backdrop === name ? " border-gold text-gold" : "")
                        }
                        aria-pressed={scene.backdrop === name}
                        onClick={() =>
                          change((old) => ({ ...old, backdrop: name as keyof typeof BACKDROPS }))
                        }
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-sm font-bold">
                  {scene.background ? "Replace image" : "Upload image (optional)"}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={!ready}
                    className="mt-2 block w-full min-w-0 text-sm file:mr-2 file:min-h-11 file:rounded file:border-0 file:bg-gold file:px-3 file:font-bold file:text-black"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void loadImage(file);
                      event.target.value = "";
                    }}
                  />
                </label>
                <p className="text-xs text-lava-100/70">
                  Drop or paste a photo. Up to 25 MB. Nothing leaves your browser.
                </p>
                {scene.background && (
                  <>
                    <label className="block text-sm font-bold">
                      Zoom {scene.background.zoom.toFixed(2)}×
                      <input
                        aria-label="Image zoom"
                        type="range"
                        min="1"
                        max="3"
                        step="0.01"
                        value={scene.background.zoom}
                        className="block min-h-11 w-full accent-gold"
                        onChange={(event) => {
                          const zoom = Number(event.target.value);
                          change((old) =>
                            old.background
                              ? { ...old, background: zoomBackground(old.background, zoom) }
                              : old
                          );
                        }}
                      />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className={button}
                        onClick={() =>
                          change((old) =>
                            old.background
                              ? { ...old, background: centerBackground(old.background.image) }
                              : old
                          )
                        }
                      >
                        RESET CROP
                      </button>
                      <button
                        className={button}
                        onClick={() => change((old) => ({ ...old, background: null }))}
                      >
                        REMOVE IMAGE
                      </button>
                    </div>
                    <p className="text-xs text-lava-100/60">High zoom may soften the image.</p>
                  </>
                )}
              </>
            )}
            {mode === "TEXT" && (
              <>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Text blocks">
                  {scene.blocks.map((block, index) => (
                    <button
                      key={block.id}
                      aria-pressed={selected === block.id}
                      className={button + (selected === block.id ? " border-gold text-gold" : "")}
                      onClick={() => setSelected(block.id)}
                    >
                      TEXT {index + 1}
                    </button>
                  ))}
                  {scene.blocks.length < 2 && (
                    <button
                      className={button}
                      disabled={!ready}
                      onClick={() => {
                        const blockId = nextId.current++;
                        change((old) =>
                          old.blocks.length < 2
                            ? {
                                ...old,
                                blocks: [
                                  ...old.blocks,
                                  {
                                    id: blockId,
                                    text: "",
                                    size: 64,
                                    x: 80,
                                    y: old.blocks.length ? 300 : 80,
                                    contrast: "Auto",
                                  },
                                ],
                              }
                            : old
                        );
                        setSelected(blockId);
                      }}
                    >
                      ADD {scene.blocks.length ? "SECOND TEXT" : "TEXT"}
                    </button>
                  )}
                </div>
                {selectedBlock ? (
                  <>
                    <label className="block text-sm font-bold" htmlFor={id + "-words"}>
                      Text {selectedIndex + 1} words
                    </label>
                    <textarea
                      id={id + "-words"}
                      rows={2}
                      maxLength={500}
                      className={field + " resize-none"}
                      value={selectedBlock.text}
                      onChange={(event) =>
                        updateBlock(selectedBlock.id, { text: event.target.value })
                      }
                    />
                    <label className="block text-sm font-bold">
                      Size: {selectedBlock.size} px
                      <input
                        aria-label="Text size"
                        className="block min-h-11 w-full accent-gold"
                        type="range"
                        min="32"
                        max="96"
                        value={selectedBlock.size}
                        onChange={(event) =>
                          updateBlock(selectedBlock.id, { size: Number(event.target.value) })
                        }
                      />
                    </label>
                    {!(scene.backdrop === "WHITE" && !scene.background) ? (
                      <label className="block text-sm font-bold">
                        Contrast background
                        <select
                          aria-label="Contrast background"
                          className={field + " mt-2 min-h-11"}
                          value={selectedBlock.contrast}
                          onChange={(event) =>
                            updateBlock(selectedBlock.id, {
                              contrast: event.target.value as TextBlock["contrast"],
                            })
                          }
                        >
                          <option>Auto</option>
                          <option>On</option>
                          <option>Off</option>
                        </select>
                      </label>
                    ) : (
                      <p className="text-xs text-lava-100/70">Black text on White is automatic.</p>
                    )}
                    <button
                      className={button}
                      onClick={() => {
                        const next = scene.blocks.filter((b) => b.id !== selectedBlock.id);
                        change((old) => ({ ...old, blocks: next }));
                        setSelected(next[0]?.id ?? null);
                        setMoving(false);
                      }}
                    >
                      REMOVE TEXT {selectedIndex + 1}
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-lava-100/70">
                    Add your words, or let the Devil speak for himself.
                  </p>
                )}
                <p className="text-xs text-lava-100/60">
                  Inter Bold. Color is automatic. Two blocks maximum. The Devil stays clear.
                </p>
              </>
            )}
            {mode === "EXPORT" && (
              <>
                <p className="text-sm text-lava-100/80">Your meme. Ready to leave hell.</p>
                {(encoding || !files) && (
                  <p className="text-sm text-gold">
                    {ready ? "Preparing JPG + PNG…" : "Loading Inter and the Devil…"}
                  </p>
                )}
                {shareSupported && (
                  <button
                    className={primaryButton + " w-full"}
                    disabled={!canExport}
                    onClick={() => void output("share")}
                  >
                    SHARE MEME
                  </button>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    className={shareSupported ? button : primaryButton}
                    disabled={!canExport}
                    onClick={() => void output("jpg")}
                  >
                    DOWNLOAD JPG
                  </button>
                  <button
                    className={button}
                    disabled={!canExport}
                    onClick={() => void output("png")}
                  >
                    DOWNLOAD PNG
                  </button>
                </div>
                <p className="text-xs text-lava-100/70">
                  JPG for social apps. PNG for lossless quality. Both opaque, 1080 × 1080.
                </p>
                {copySupported ? (
                  <button
                    className={button + " w-full"}
                    disabled={!canExport}
                    onClick={() => void output("copy")}
                  >
                    COPY IMAGE
                  </button>
                ) : (
                  <p className="text-xs text-lava-100/70">
                    Image copying unavailable. Use Download{shareSupported ? " or Share" : ""}.
                  </p>
                )}
                {!shareSupported && files && (
                  <p className="text-xs text-lava-100/70">
                    No file sharing here. Download and attach in your app.
                  </p>
                )}
                {files && (
                  <div className="border-t border-lava-100/20 pt-3 text-xs text-lava-100/70">
                    <p>Download did not save? Open the image, then Save Image / Save to Files.</p>
                    <div className="mt-2 flex gap-4">
                      <a
                        href={files.jpgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-gold underline"
                      >
                        OPEN JPG
                      </a>
                      <a
                        href={files.pngUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-gold underline"
                      >
                        OPEN PNG
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
            <p
              role="status"
              aria-live="polite"
              className="border-t border-lava-100/20 pt-3 text-xs leading-relaxed text-gold"
            >
              {loading
                ? "Opening image…"
                : !ready
                  ? "Loading the Devil and Inter… " + message
                  : message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
