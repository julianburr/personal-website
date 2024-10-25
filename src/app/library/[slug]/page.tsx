import Link from "next/link";
import { notFound } from "next/navigation";

import { getPageFromPath } from "@/utils/getPageFromPath";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { Metadata } from "next";

import "@/styles/details.css";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath(`library/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Library: ${page.meta.title} — Julian Burr`;
  return { title };
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function LibraryDetailsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageFromPath(`library/${slug}.md`);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <p className="font-heading p-0 leading-[1.2]">
        <Link href="/library">Library</Link> — {page?.meta?.author}
      </p>
      <h1 className="p-0 mt-1 mb-6">{page?.meta?.title}</h1>

      <div
        className="details"
        dangerouslySetInnerHTML={{
          __html: page?.content?.html || "",
        }}
      />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath("library");

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/library\//, ""),
  }));
}
