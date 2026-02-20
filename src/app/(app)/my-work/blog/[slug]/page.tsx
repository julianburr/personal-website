import dayjs from 'dayjs';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { Spacer } from '@/components/spacer';
import { getPageFromPath } from '@/utils/getPageFromPath';
import { getPagesFromPath } from '@/utils/getPagesFromPath';
import { getTimeToRead } from '@/utils/getTimeToRead';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/blog/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Blog: ${page.meta.title} — Julian Burr`;
  return {
    title,
    alternates: {
      canonical: page?.meta?.externalUrl,
    },
  };
}

export default async function BlogDetailsPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/blog/${slug}.md`);

  if (!page) {
    return notFound();
  }

  if (!page?.content?.raw && page?.meta?.externalUrl) {
    return redirect(page?.meta?.externalUrl);
  }

  return (
    <>
      <p className="font-heading p-0 leading-[1.2]">
        <Link href="/my-work">My work</Link> —{' '}
        {dayjs(page?.meta?.date).format('MMMM D, YYYY')} —{' '}
        {getTimeToRead(page?.content?.raw)} min read
      </p>
      <h1 className="p-0 mt-1">{page?.meta?.title}</h1>
      {page?.meta?.description && (
        <p className="text-[1.3rem]">{page?.meta?.description}</p>
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
      <div
        className="details"
        dangerouslySetInnerHTML={{
          __html: page?.content?.html || '',
        }}
      />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath('my-work/blog');

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/my-work\/blog\//, ''),
  }));
}
