import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPageFromPath } from "@/utils/getPageFromPath";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const page = await getPageFromPath(`til/${params.slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Today I learned: ${page.meta.title} — Julian Burr`;
  return { title };
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function TilDetailsPage({ params }: Props) {
  const page = await getPageFromPath(`til/${params.slug}.md`);

  if (!page) {
    return notFound();
  }

  const wpm = 225;
  const words = page.content.raw.split(/\s+/).length;
  const time = Math.ceil(words / wpm);

  return (
    <>
      <p className="font-heading">
        <Link href="/til">Back to list</Link> —{" "}
        {dayjs(page?.meta?.date).format("MMMM D, YYYY")} — {time} min read
      </p>
      <h1>{page.meta.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.html }} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath("til");

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/til\//, ""),
  }));
}
