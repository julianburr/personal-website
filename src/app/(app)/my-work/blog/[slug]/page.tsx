import dayjs from 'dayjs';
import { notFound, redirect } from 'next/navigation';

import { Markdown } from '@/components/markdown';
import { TableOfContents } from '@/components/markdown/TableOfContents';
import { PageMeta } from '@/components/page/PageMeta';
import { Spacer } from '@/components/spacer';
import { getPageFromPath } from '@/utils/getPageFromPath';
import { getPagesFromPath } from '@/utils/getPagesFromPath';
import { getTimeToRead } from '@/utils/getTimeToRead';

import ogImage from '@/assets/og-fallback.png';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/blog/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Blog: ${page.meta.title} — Julian Burr`;
  const description = page?.meta?.description;
  const image = page?.meta?.coverUrl || ogImage.src;

  return {
    title,
    description,
    alternates: {
      canonical: page?.meta?.externalUrl,
    },
    openGraph: {
      type: 'article',
      images: [{ url: image }],
    },
    twitter: {
      images: image,
    },
  };
}

export default async function BlogDetailsPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/blog/${slug}.md`);

  if (!page) {
    return notFound();
  }

  if (!page?.markdown && page?.meta?.externalUrl) {
    return redirect(page?.meta?.externalUrl);
  }

  return (
    <>
      <PageMeta
        breadcrumbs={[{ title: 'My work', href: '/my-work' }]}
        meta={[
          dayjs(page?.meta?.date).format('MMMM D, YYYY'),
          `${getTimeToRead(page?.markdown)} min read`,
        ]}
      />
      <h1 className="p-0">{page?.meta?.title}</h1>
      {page?.meta?.description && (
        <>
          <Spacer h=".3rem" />
          <div className="font-serif italic text-[1.1em] text-black-subtle">
            <Markdown content={page?.meta?.description} />
          </div>
        </>
      )}

      {page?.meta?.coverUrl && (
        <>
          <Spacer h=".8rem" />
          <img
            role="presentation"
            src={page?.meta?.coverUrl}
            className="w-full h-auto"
          />
        </>
      )}

      <Spacer h="3.2rem" />
      <Markdown content={page?.markdown} />

      <TableOfContents />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath('my-work/blog');

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/my-work\/blog\//, ''),
  }));
}
