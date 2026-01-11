"use client";

import { X_LINK } from "@/lib/constants";
import { SectionKicker } from "@/components/ui/SectionKicker";

export const ThePit = () => {
  return (
    <section
      id="the-pit"
      className="hellfire-bg relative flex min-h-[56.25rem] items-center justify-center overflow-hidden py-32"
    >
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4 3xl:max-w-5xl">
        <div className="mb-12">
          <SectionKicker className="border-3 border-black bg-obsidian-900 px-4 py-2 shadow-brutal">
            THE FINAL CIRCLE
          </SectionKicker>
        </div>

        <div className="relative w-full rounded-xl border-3 border-black bg-obsidian-950 p-1 shadow-brutal">
          <div className="relative overflow-hidden rounded-xl border-3 border-obsidian-800 bg-obsidian-900/90 p-8 text-center backdrop-blur-md md:p-16">
            <h2 className="mb-4 font-heading text-5xl font-black leading-none text-lava-50 md:text-6xl 3xl:text-7xl">
              THE CULT OF <br className="md:hidden" />{" "}
              <span className="hellfire-text-pure pr-1">THE BURNED</span>
            </h2>
            <p className="mb-8 font-body text-lg text-gold">Where bag holders become family.</p>

            <div className="mx-auto mb-12 max-w-3xl space-y-6 font-body text-lg leading-relaxed text-lava-100/70 md:text-xl">
              <p>
                Welcome to the only corner of crypto where everyone finally stops pretending. Here,
                we don&apos;t hide our losses — we frame them as{" "}
                <span className="font-bold text-white">character development.</span>
              </p>

              <p>
                <span className="hellfire-text font-bold">HELLCOIN</span> is a home for the
                overleveraged, the rugged, the delusional, and the eternally optimistic. A sanctuary
                for those who keep making the same mistakes with confidence, pride, and a complete
                lack of learning curve.
              </p>

              <p className="border-l-4 border-gold pl-4 italic text-lava-100">
                We don&apos;t judge. We recognize the pattern. We&apos;ve lived the pattern.
              </p>

              <p>
                This is a community built on shared suffering, recycled hope, and the sacred ritual
                of doing it all again tomorrow.
              </p>

              <p className="pt-4 text-2xl font-bold text-white">
                If you&apos;ve been burned, you belong here.
                <br />
                If you haven&apos;t, you will.
              </p>

              <p className="hellfire-text text-sm font-bold uppercase tracking-widest">
                Misery needs company. Hellcoin provides it.
              </p>
            </div>

            <div className="flex w-full justify-center">
              <a
                href={X_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hellfire-bg group relative inline-flex w-full items-center justify-center gap-3 rounded-xl hc-border-3 border-black px-6 py-3 font-heading text-xl text-white shadow-brutal transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)] active:scale-95 md:w-auto md:px-12 md:py-4 md:text-3xl"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current md:h-6 md:w-6">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="md:hidden">ENTER</span>
                <span className="hidden md:inline">ENTER THE SANCTUARY</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
