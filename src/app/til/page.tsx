import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Spacer } from "@/components/spacer";
import { TilList } from "@/features/til/TilList";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { Metadata } from "next";

dayjs.extend(customParseFormat);

export const metadata: Metadata = {
  title: "Today I learned — Julian Burr",
};

type Props = {
  searchParams: any;
};

export default async function TilPage({ searchParams }: Props) {
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
      <TilList searchParams={searchParams} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath("til");

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/til\//, ""),
  }));
}
