import dynamic from "next/dynamic";

import { AppShellClient } from "@/components/AppShellClient";

// Above-the-fold: ONLY Hero is eagerly loaded for fastest LCP
import { Hero } from "@/components/sections/Hero";

// Below-the-fold: code-split everything else to reduce initial JS by ~60%
// This is critical for mobile performance where JS parse time is 3-5x slower

const GenesisLazy = dynamic(() => import("@/components/sections/Genesis").then((m) => m.Genesis), {
  loading: () => null,
  ssr: true,
});

const RevelationLazy = dynamic(
  () => import("@/components/sections/Revelation").then((m) => m.Revelation),
  { loading: () => null, ssr: true }
);

const CommandmentsLazy = dynamic(
  () => import("@/components/sections/Commandments").then((m) => m.Commandments),
  { loading: () => null, ssr: true }
);

const NineTypesLazy = dynamic(
  () => import("@/components/sections/NineTypes").then((m) => m.NineTypes),
  { loading: () => null, ssr: true }
);

const DevilsMathLazy = dynamic(
  () => import("@/components/sections/Math").then((m) => m.DevilsMath),
  { loading: () => null, ssr: true }
);

const RitualLazy = dynamic(() => import("@/components/sections/Ritual").then((m) => m.Ritual), {
  loading: () => null,
  ssr: true,
});

const HallOfPainLazy = dynamic(
  () => import("@/components/sections/HallOfPain").then((m) => m.HallOfPain),
  { loading: () => null, ssr: true }
);

const HellmapLazy = dynamic(() => import("@/components/sections/Hellmap").then((m) => m.Hellmap), {
  loading: () => null,
  ssr: true,
});

const ThePitLazy = dynamic(() => import("@/components/sections/ThePit").then((m) => m.ThePit), {
  loading: () => null,
  ssr: true,
});

const FooterLazy = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer), {
  loading: () => null,
  ssr: true,
});

export default function Page() {
  return (
    <AppShellClient>
      <Hero />
      <GenesisLazy />
      <CommandmentsLazy />
      <NineTypesLazy />
      <DevilsMathLazy />
      <RitualLazy />
      <HellmapLazy />
      <HallOfPainLazy />
      <RevelationLazy />
      <ThePitLazy />
      <FooterLazy />
    </AppShellClient>
  );
}
