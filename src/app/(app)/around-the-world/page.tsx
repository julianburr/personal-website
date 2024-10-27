import { WorldMap } from "@/features/around-the-world/WorldMap";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

export default async function AroundTheWorldPage() {
  const destinations = await getPagesFromPath("around-the-world");
  return (
    <>
      <h1 className="relative z-10">Around the world</h1>
      <WorldMap destinations={destinations} />
    </>
  );
}
