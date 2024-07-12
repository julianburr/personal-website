import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPageFromPath } from "@/utils/getPageFromPath";

import type { Metadata } from "next";

import "@/styles/talk-details.css";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const page = await getPageFromPath(`my-work/talk/${params.slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Talk: ${page.meta.title} — Julian Burr`;
  return { title };
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function TilDetailsPage({ params }: Props) {
  const page = await getPageFromPath(`my-work/talk/${params.slug}.md`);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <p className="font-heading">
        <Link href="/my-work">Back to overview</Link> —{" "}
        {dayjs(page?.meta?.date).format("MMMM D, YYYY")}
      </p>
      <h1>{page.meta.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: page.meta.mdDescription.html }} />

      <img src={page.meta.heroSrc} className="shadow-lg my-[2rem]" />
      <div
        className="talk-details grid grid-cols-1 md:grid-cols-2 gap-[1.6rem]"
        dangerouslySetInnerHTML={{ __html: page.content.html }}
      />
    </>
  );
}
