"use client";
import { useEffect, useRef, useState } from "react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/bodyScrollLock";
import styles from "@/components/forge/ForgeEditor.module.css";
import Image from "next/image";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { ForgeEntry, prewarmForgeWorkspace } from "@/components/forge/ForgeEntry";

export const Forge = () => {
  const [opened, setOpened] = useState(false);
  const [activated, setActivated] = useState(false);
  const [phone, setPhone] = useState(false);
  const returnScroll = useRef(0);
  const openedOnPhone = useRef(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 767px), (max-height: 500px) and (pointer: coarse)"
    );
    const update = () => setPhone(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = section.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          prewarmForgeWorkspace();
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!opened || !phone) return;
    lockBodyScroll("forge:homepage");
    return () => unlockBodyScroll("forge:homepage");
  }, [opened, phone]);
  function close() {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setOpened(false);
    requestAnimationFrame(() => {
      if (openedOnPhone.current) {
        window.scrollTo({ top: returnScroll.current, behavior: "instant" });
        openedOnPhone.current = false;
      } else window.scrollTo({ top: returnScroll.current, behavior: "instant" });
      trigger.current?.focus({ preventScroll: true });
    });
  }
  return (
    <section
      ref={section}
      id="forge"
      className={styles.foundrySection + " relative px-4 py-20 md:py-28"}
    >
      <div className="mx-auto max-w-5xl 3xl:max-w-6xl">
        <div className="mb-9 flex flex-col items-center gap-3 text-center md:mb-12">
          <SectionKicker>COMMUNITY MEME MAKER</SectionKicker>
          <h2 className="font-heading text-5xl font-black text-lava-50 md:text-6xl 3xl:text-7xl">
            THE <span className="hellfire-text-pure pr-1">FORGE</span>
          </h2>
          <p className="font-body text-xl text-lava-100 md:text-2xl">
            Make your own HELLCOIN meme.
          </p>
          <p className="font-body text-base font-bold text-gold md:text-lg">
            Turn bad decisions into content.
          </p>
        </div>
        <div
          hidden={opened}
          className={
            (opened ? "hidden" : "grid") +
            " items-center gap-8 rounded-xl border-3 border-black bg-obsidian-900 p-5 shadow-brutal md:grid-cols-2 md:gap-10 md:p-8"
          }
        >
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <p className="font-body text-lg text-lava-100/80">
              Upload an image. Add your words. The Devil stays.
            </p>
            <button
              ref={trigger}
              aria-expanded={opened}
              aria-controls="homepage-forge-workspace"
              onPointerEnter={prewarmForgeWorkspace}
              onPointerDown={prewarmForgeWorkspace}
              onFocus={prewarmForgeWorkspace}
              className="hellfire-bg min-h-12 rounded-xl border-3 border-black px-8 py-3 font-heading text-2xl text-white shadow-brutal focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950"
              onClick={() => {
                openedOnPhone.current = window.matchMedia(
                  "(max-width: 767px), (max-height: 500px) and (pointer: coarse)"
                ).matches;
                returnScroll.current = window.scrollY;
                setActivated(true);
                setOpened(true);
              }}
            >
              MAKE A MEME
            </button>
            <p className="font-body text-sm text-lava-100/60">
              No account. Nothing uploaded.
              <br />
              Your image stays in your browser.
            </p>
          </div>
          <figure className="mx-auto w-full max-w-72 md:order-first md:max-w-sm">
            <div className="relative aspect-square overflow-hidden rounded-xl border-3 border-black bg-obsidian-900 shadow-brutal">
              <Image
                src="/forge/demo.png"
                alt="Example HELLCOIN meme: Still here. The calm Devil watches from the lower-left corner."
                width={540}
                height={540}
                sizes="(max-width: 767px) 288px, 384px"
                className="h-full w-full"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs uppercase tracking-widest text-lava-100/50">
              Your words. Same Devil.
            </figcaption>
          </figure>
        </div>
      </div>
      <div
        id="homepage-forge-workspace"
        hidden={!opened}
        data-phone={phone}
        data-open={opened}
        className={styles.homeContainer}
      >
        {activated && <ForgeEntry active={opened} embedded onClose={close} />}
      </div>
    </section>
  );
};
