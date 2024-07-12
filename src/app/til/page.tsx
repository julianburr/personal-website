import classNames from "classnames";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Metadata } from "next";
import Link from "next/link";

import { Spacer } from "@/components/spacer";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

dayjs.extend(customParseFormat);

export const metadata: Metadata = {
  title: "Today I learned — Julian Burr",
};

export default async function TilPage({ searchParams }: any) {
  const activeTags: string[] =
    searchParams?.tags?.split(",").filter(Boolean) || [];

  let pages = await getPagesFromPath("til");

  const filtered = pages
    ?.filter((page: any) => dayjs(page.meta.date).isBefore(dayjs()))
    ?.filter((page) =>
      activeTags?.length
        ? page?.meta?.tags
            .split(",")
            ?.map((tag: string) => tag?.trim?.())
            ?.filter(Boolean)
            ?.find((tag: string) => activeTags.includes(tag))
        : true
    )
    ?.sort((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1));

  const tags = pages
    .reduce((all: any[], page: any) => {
      (page.meta?.tags as string)
        ?.split?.(",")
        ?.map((tag) => tag?.trim?.())
        ?.filter(Boolean)
        ?.forEach((tag) => {
          const existing = all.find((i) => i.name === tag);
          if (!existing) {
            all.push({ name: tag, count: 1 });
          } else {
            existing.count++;
          }
        });

      return all;
    }, [])
    ?.sort((a, b) => (a.name > b.name ? 1 : -1));

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
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath("til");

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/til\//, ""),
  }));
}
