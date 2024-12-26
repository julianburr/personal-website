import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPageFromPath } from "@/utils/getPageFromPath";
import { getPagesFromPath } from "@/utils/getPagesFromPath";
import { getTimeToRead } from "@/utils/getTimeToRead";

import type { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath(`til/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Today I learned: ${page.meta.title} — Julian Burr`;
  return { title };
}

export default async function TilDetailsPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageFromPath(`til/${slug}.md`);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <p className="font-heading p-0 leading-[1.2]">
        <Link href="/til">Today I learned</Link> —{" "}
        {dayjs(page?.meta?.date).format("MMMM D, YYYY")} —{" "}
        {getTimeToRead(page?.content?.raw)} min read
        {page?.meta?.tags && ` — ${page?.meta?.tags}`}
      </p>
      <h1 className="p-0 mt-1 mb-6">{page?.meta?.title}</h1>

      <div
        className="details"
        dangerouslySetInnerHTML={{ __html: page?.content?.html || "" }}
      />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath("til");

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/til\//, ""),
  }));
}
