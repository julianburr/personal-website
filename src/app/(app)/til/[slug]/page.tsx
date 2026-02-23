import dayjs from 'dayjs';
import { notFound } from 'next/navigation';

import { Markdown } from '@/components/markdown';
import { PageMeta } from '@/components/page/PageMeta';
import { Spacer } from '@/components/spacer';
import { getPageFromPath } from '@/utils/getPageFromPath';
import { getPagesFromPath } from '@/utils/getPagesFromPath';
import { getTimeToRead } from '@/utils/getTimeToRead';

import type { Metadata } from 'next';

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
      <PageMeta
        breadcrumbs={[{ title: 'Today I learned', href: '/til' }]}
        meta={[
          dayjs(page?.meta?.date).format('MMMM D, YYYY'),
          `${getTimeToRead(page?.content?.raw)} min read`,
        ]}
      />
      <h1 className="p-0">{page?.meta?.title}</h1>

      <Spacer h="2rem" />
      <Markdown content={page?.content?.raw} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath('til');

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/til\//, ''),
  }));
}
