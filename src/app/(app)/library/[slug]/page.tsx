import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Markdown } from '@/components/markdown';
import { PageMeta } from '@/components/page/PageMeta';
import { Spacer } from '@/components/spacer';
import { Tooltip } from '@/components/tooltip';
import { getPageFromPath } from '@/utils/getPageFromPath';
import { getPagesFromPath } from '@/utils/getPagesFromPath';
import { getTimeToRead } from '@/utils/getTimeToRead';

import type { BookFrontmatter } from '@/app/(app)/library/page';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath<BookFrontmatter>(`library/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Library: ${page.meta.title} — Julian Burr`;
  return { title };
}

export default async function LibraryDetailsPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageFromPath<BookFrontmatter>(`library/${slug}.md`);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <PageMeta
        breadcrumbs={[{ title: 'Library', href: '/library' }]}
        meta={[
          page?.meta?.author,
          ...(page?.content?.raw
            ? [`${getTimeToRead(page?.content?.raw)} min summary`]
            : []),
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
      {page?.meta?.cover && (
        <>
          <Spacer h="1.2rem" />
          <div className="flex self-start relative">
            <img
              alt="Cover image"
              src={page?.meta?.cover}
              className="h-[18rem] w-auto"
            />
            {page?.meta?.externalUrl && (
              <div className="absolute right-0 top-0 p-1">
                <Tooltip content="External link">
                  <Link
                    href={page?.meta?.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit w-[2.4rem] h-[2.4rem] flex items-center justify-center transition-all bg-grey-light shadow-none opacity-60 hover:shadow-lg hover:opacity-100"
                  >
                    <span className="flex text-[1.4rem]">
                      <ArrowSquareOutIcon />
                    </span>
                  </Link>
                </Tooltip>
              </div>
            )}
          </div>
        </>
      )}
      <Spacer h="3.2rem" />
      <Markdown content={page?.content?.raw} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath<BookFrontmatter>('library');

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/library\//, ''),
  }));
}
