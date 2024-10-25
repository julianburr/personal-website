import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPageFromPath } from "@/utils/getPageFromPath";
import { getPagesFromPath } from "@/utils/getPagesFromPath";
import { getTimeToRead } from "@/utils/getTimeToRead";

import type { Metadata } from "next";

import "@/styles/details.css";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/transcripts/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Transcript: ${page.meta.title} — Julian Burr`;
  return { title };
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function TranscriptDetailsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/transcripts/${slug}.md`);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <p className="font-heading p-0 leading-[1.2]">
        <Link href="/my-work">My work</Link> —{" "}
        {dayjs(page?.meta?.date).format("MMMM D, YYYY")} —{" "}
        {getTimeToRead(page?.content?.raw)} min read
      </p>
      <h1 className="p-0 mt-1 mb-6">{page?.meta?.title}</h1>

      {page?.meta?.mdDescription?.html && (
        <p
          dangerouslySetInnerHTML={{
            __html: page?.meta?.mdDescription?.html,
          }}
        />
      )}

      <img
        sizes="100vw"
        src={page?.meta?.heroUrl}
        className="shadow-lg my-[2rem]"
      />
      <div
        className="details grid grid-cols-1 md:grid-cols-2 gap-[1.6rem]"
        dangerouslySetInnerHTML={{
          __html:
            page?.content?.html
              .replaceAll("<blockquote>", "<section>")
              .replaceAll("</blockquote>", "</section>") || "",
        }}
      />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath("my-work/transcripts");

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/my-work\/transcripts\//, ""),
  }));
}
