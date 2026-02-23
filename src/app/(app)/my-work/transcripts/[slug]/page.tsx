import { notFound } from 'next/navigation';
import { preconnect } from 'react-dom';

import { Markdown } from '@/components/markdown';
import { PageMeta } from '@/components/page/PageMeta';
import { Spacer } from '@/components/spacer';
import { getPageFromPath } from '@/utils/getPageFromPath';
import { getPagesFromPath } from '@/utils/getPagesFromPath';
import { getTimeToRead } from '@/utils/getTimeToRead';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  preconnect('https://storage.cloud.google.com');

  const { slug } = await params;
  const page = await getPageFromPath(`my-work/transcripts/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Transcript: ${page.meta.title} — Julian Burr`;
  return { title };
}

export default async function TranscriptDetailsPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/transcripts/${slug}.md`);

  if (!page) {
    return notFound();
  }

  // HACK: to make writing / editing transcripts easier, we add the structure on the fly here
  // that turns normal paragraphs into callouts, so we get a wrapping element around them so
  // we can float the text next to the slide images (if screen size allows)
  const lines = page?.markdown?.split('\n');
  const fixedMarkdown = lines
    ?.map((line, index) =>
      lines[index].startsWith('![') ||
      lines[index - 1]?.startsWith('![') ||
      lines[index + 1]?.startsWith('![')
        ? line
        : `>${line}`,
    )
    ?.map((line, index, fixedLines) =>
      line.startsWith('>') && !fixedLines[index - 1]
        ? `> [!slide]\n${line}`
        : line,
    )
    ?.join('\n');

  return (
    <>
      <PageMeta
        breadcrumbs={[{ title: 'My work', href: '/my-work' }]}
        meta={['Talk transcript', `${getTimeToRead(page?.markdown)} min read`]}
      />
      <h1 className="p-0">{page?.meta?.title}</h1>

      {page?.meta?.description && (
        <>
          <Spacer h=".3rem" />
          <div className="font-serif italic text-[1.1em] text-black-subtle">
            <Markdown
              content={page?.meta?.description.replace(/\n/g, '\n\n')}
            />
          </div>
        </>
      )}

      {page?.meta?.coverUrl && (
        <>
          <Spacer h=".8rem" />
          <img alt="Cover slide" sizes="100vw" src={page?.meta?.coverUrl} />
        </>
      )}

      <Spacer h="3.2rem" />
      <Markdown
        content={fixedMarkdown}
        className="grid grid-cols-1 md:grid-cols-2 gap-[1.6rem]"
      />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath('my-work/transcripts');

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/my-work\/transcripts\//, ''),
  }));
}
