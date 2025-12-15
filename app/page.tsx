import HomeClient from "@/components/HomeClient";

export default function Home() {
  // Server Component shell: keeps the route itself server-rendered while
  // the interactive experience lives in a single client boundary.
  return <HomeClient />;
}
