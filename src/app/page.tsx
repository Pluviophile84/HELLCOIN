"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CONTRACT = "PASTE_CONTRACT_HERE";
const PUMPFUN = "https://pump.fun/PASTE_TOKEN_HERE";
const DEX = "https://dexscreener.com/solana/PASTE_POOL_HERE";
const X = "https://x.com/HELLCOIN";
const TG = "https://t.me/hellcoinportal";

export default function Page() {
  // Background mode toggle via URL param: ?bg=charts
  const [bgCharts, setBgCharts] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setBgCharts(params.get("bg") === "charts");
  }, []);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(CONTRACT);
    alert("Contract copied");
  }, []);

  return (
    <main className="relative min-h-screen antialiased">
      {/* Alternate background (descending red candles) overlayed when ?bg=charts */}
      {bgCharts && <CandlesBackground />}

      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center justify-center px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 h-48 w-48 rounded-full ring-1 ring-neutral-800 md:h-60 md:w-60 animate-heat overflow-hidden">
            {/* Replace with your transparent circular emblem */}
            <img
              src="/logo-hellcoin-666.png"
              alt="HELLCOIN Emblem"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <h1 className="font-black tracking-tight text-white text-4xl md:text-6xl leading-[0.95]">
            HELLCOIN ($666) — THE AFTERLIFE OF EVERY BAG.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-neutral-300">
            Welcome to the only honest chart left. You were the rug all along.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row">
            <a
              href="#lore"
              className="rounded-xl bg-ember px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-ember ring-1 ring-ember-dark transition hover:bg-ember-light"
            >
              Enter Hell
            </a>
            <button
              onClick={copy}
              className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-neutral-800 transition hover:ring-neutral-600"
            >
              Contract ($666)
            </button>
            <a
              href={PUMPFUN}
              target="_blank"
              className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-neutral-800 transition hover:ring-neutral-600"
            >
              Buy on Pump.fun
            </a>
          </div>
        </div>
      </section>

      {/* LORE */}
      <section id="lore" className="relative mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-center text-sm font-semibold tracking-[0.2em] text-ember">
          PROOF-OF-SUFFERING. REWARDS PAID IN EMOTIONAL DAMAGE.
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-200">
          <p>
            When the first trader said “this time it’s different,” Hell was born. From the
            ashes of liquidated accounts, burned bridges, and failed presales rose a digital
            inferno powered by one thing only: cope.
          </p>
          <p>
            That inferno minted itself as <span className="font-semibold text-white">HELLCOIN ($666)</span>{" "}
            — the chain of eternal lessons. Its miners are sleepless traders. Its validators are
            the ones still coping. Transactions are confessions; charts are flames; the liquidity
            pool is a lava pit.
          </p>
          <p>
            Every block is written in blood, memes, and red candles. Every holder is a sinner,
            yet every sinner is early. This isn’t a community — it’s an afterparty for the
            financially damned.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {["HOLD.", "BURN.", "COPE."].map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold tracking-wider text-neutral-200 ring-1 ring-neutral-800 transition hover:ring-neutral-600"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* TOKENOMICS */}
      <section className="relative mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-center text-2xl font-black text-white">$666 TAX. NO LIES.</h2>
        <div className="mx-auto mt-6 grid max-w-3xl gap-4 md:grid-cols-3">
          <Card title="Chain" body="Solana" />
          <Card title="Buy/Sell Tax" body="1.332% total" />
          <Card title="Breakdown" body="0.666% Hellfire Burn • 0.666% Damned Marketing" />
        </div>
        {/* burn bar */}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="h-3 w-full rounded-full bg-neutral-900 ring-1 ring-neutral-800 overflow-hidden">
            <div className="h-full w-[6.66%] bg-ember animate-ember" />
          </div>
          <p className="mt-2 text-center text-xs text-neutral-400">
            Visualizing the Hellfire Burn (0.666%)
          </p>
        </div>
      </section>

      {/* ANTI-ROADMAP */}
      <section className="relative mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-center text-2xl font-black text-white">
          OUR PROMISES? NONE. OUR REALITY? PERMANENT.
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-neutral-950/80 p-6 ring-1 ring-neutral-800">
            <h3 className="text-lg font-semibold text-white">We Will Not</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc list-inside">
              <li>CEX pump plans</li>
              <li>Metaverse / VR vaporware</li>
              <li>Charity clout plays</li>
              <li>“Strategic partnerships” with empty logos</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-neutral-950/80 p-6 ring-1 ring-neutral-800">
            <h3 className="text-lg font-semibold text-white">We Actually Do</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc list-inside">
              <li>Keep liquidity sane</li>
              <li>Spread the lore via memes</li>
              <li>Celebrate chaos</li>
              <li>Post receipts</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <img src="/broken-roadmap.svg" alt="Broken roadmap" className="w-full opacity-60" />
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="relative mx-auto max-w-4xl px-6 pb-24">
        <h2 className="text-center text-2xl font-black text-white">
          WELCOME TO THE AFTERPARTY. YOU'RE AMONG YOUR OWN NOW.
        </h2>
        <p className="mt-3 text-center text-sm text-neutral-300">No shills. Just shared trauma bonding.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={X}
            target="_blank"
            className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-neutral-800 transition hover:ring-neutral-600"
          >
            X (Twitter)
          </a>
          <a
            href={TG}
            target="_blank"
            className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-neutral-800 transition hover:ring-neutral-600"
          >
            Telegram
          </a>
          <a
            href={DEX}
            target="_blank"
            className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-neutral-800 transition hover:ring-neutral-600"
          >
            Dex
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 px-6 py-12 text-center text-xs text-neutral-400">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={copy}
            className="rounded-lg bg-neutral-900 px-2 py-1 text-xs text-neutral-300 ring-1 ring-neutral-800 transition hover:ring-neutral-600"
          >
            Copy Contract
          </button>
          <a
            href={PUMPFUN}
            target="_blank"
            className="rounded-lg bg-ember px-2 py-1 text-xs text-white ring-1 ring-ember-dark"
          >
            Buy on Pump.fun
          </a>
          <a
            href={X}
            target="_blank"
            className="rounded-lg bg-neutral-900 px-2 py-1 text-xs text-neutral-300 ring-1 ring-neutral-800"
          >
            X
          </a>
          <a
            href={TG}
            target="_blank"
            className="rounded-lg bg-neutral-900 px-2 py-1 text-xs text-neutral-300 ring-1 ring-neutral-800"
          >
            Telegram
          </a>
        </div>
        <p className="mt-4">
          This is a memecoin. You are a gambler. Expect emotional damage. Not financial advice.
        </p>
        <p className="mt-3 text-neutral-500">© 2025 HELLCOIN. Born in the red.</p>
      </footer>
    </main>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-neutral-950/80 p-6 ring-1 ring-neutral-800 transition hover:ring-neutral-600">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-300">{body}</p>
    </div>
  );
}

/** Background canvas: descending red candlesticks (enabled via ?bg=charts) */
function CandlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (prefersReduced) return;

    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    let running = true;

    const onResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    type Candle = { x: number; y: number; body: number; wickTop: number; wickBot: number; speed: number; width: number };
    const candles: Candle[] = [];
    const init = (count: number) => {
      candles.length = 0;
      for (let i = 0; i < count; i++) {
        candles.push(spawn());
      }
    };
    const spawn = (): Candle => {
      const width = Math.random() * 4 + 2;
      const body = Math.random() * 30 + 20;
      const wickTop = Math.random() * 10 + 5;
      const wickBot = Math.random() * 10 + 5;
      const x = Math.random() * w;
      const y = -Math.random() * h;
      const speed = Math.random() * 0.25 + 0.05; // very slow
      return { x, y, body, wickTop, wickBot, speed, width };
    };

    init(Math.max(60, Math.floor(w / 20)));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // subtle dark backdrop to ensure visibility
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, w, h);

      candles.forEach((cd, i) => {
        cd.y += cd.speed;
        if (cd.y - cd.wickTop > h + 20) candles[i] = spawn();

        // wicks
        ctx.strokeStyle = "rgba(255,59,0,0.45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cd.x, cd.y - cd.wickTop);
        ctx.lineTo(cd.x, cd.y + cd.body + cd.wickBot);
        ctx.stroke();

        // body
        const grd = ctx.createLinearGradient(cd.x, cd.y, cd.x, cd.y + cd.body);
        grd.addColorStop(0, "rgba(255,90,31,0.6)");
        grd.addColorStop(1, "rgba(214,50,0,0.6)");
        ctx.fillStyle = grd;
        ctx.fillRect(cd.x - cd.width / 2, cd.y, cd.width, cd.body);
      });

      if (!running) return;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-30"
      aria-hidden
    />
  );
}
