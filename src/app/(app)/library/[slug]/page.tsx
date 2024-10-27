import Link from "next/link";
import { notFound } from "next/navigation";

import { getPageFromPath } from "@/utils/getPageFromPath";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath(`library/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Library: ${page.meta.title} — Julian Burr`;
  return { title };
}

export default async function LibraryDetailsPage({ params }: any) {
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

      {page?.meta?.cover && (
        <div className="flex mb-6">
          <img
            alt="Cover image"
            src={page?.meta?.cover}
            className="h-[14rem] w-auto"
          />
        </div>
      )}

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
