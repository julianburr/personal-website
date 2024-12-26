import { Suspense } from "react";

import { Spacer } from "@/components/spacer";
import { TilList } from "@/features/til/TilList";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today I learned — Julian Burr",
};

export default async function TilPage() {
  let pages = await getPagesFromPath("til");

  return (
    <>
      <h1>Today I learned</h1>
      <p>
        This is not a blog, just a collection of small bits and pieces of
        knowledge I picked up on my way. We learn something new every day, so I
        wanted to keep that gained knowledge accessible for later. It also makes
        sharing easier. Most of it is just random thoughts and code snippets,
        with links to further resources.
      </p>

      <Spacer h="1.6rem" />
      <Suspense fallback={null}>
        <TilList pages={pages} />
      </Suspense>
    </>
  );
}
