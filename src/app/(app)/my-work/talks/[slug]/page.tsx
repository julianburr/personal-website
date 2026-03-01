import * as Icons from '@phosphor-icons/react/dist/ssr';
import { notFound } from 'next/navigation';

import { Grid } from '@/components/list/Grid';
import { ListItem } from '@/components/list/ListItem';
import { Markdown } from '@/components/markdown';
import { PageMeta } from '@/components/page/PageMeta';
import { Spacer } from '@/components/spacer';
import { EventListItem } from '@/features/my-work/EventListItem';
import { getPageFromPath } from '@/utils/getPageFromPath';
import { getPagesFromPath } from '@/utils/getPagesFromPath';

import ogImage from '@/assets/og-fallback.png';

import type { TalkFrontmatter } from '@/features/my-work/TalkListItem';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath<TalkFrontmatter>(
    `my-work/talks/${slug}.md`,
  );

  if (!page) {
    return notFound();
  }

  const title = `Talk: ${page.meta.title} — Julian Burr`;
  const image = page?.meta?.coverUrl || ogImage.src;

  return {
    title,
    openGraph: {
      type: 'article',
      images: [{ url: image }],
    },
    twitter: {
      images: image,
    },
  };
}

export default async function TalkDetailsPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageFromPath<TalkFrontmatter>(
    `my-work/talks/${slug}.md`,
  );

  if (!page) {
    return notFound();
  }

  const links = [
    {
      icon: <Icons.NewspaperIcon />,
      label: 'Blog post',
      href: page?.meta?.blogUrl,
      target: page?.meta?.blogUrl?.startsWith('http')
        ? ('_blank' as const)
        : undefined,
    },
    {
      icon: <Icons.PenIcon />,
      label: 'Transcript',
      href: page?.meta?.transcriptUrl,
    },
  ].filter((action) => !!action.href);

  const videoRecordings = Object.values(page?.meta?.events)?.filter(
    (event) => event?.videoEmbed,
  );

  return (
    <>
      <PageMeta
        breadcrumbs={[{ title: 'My work', href: '/my-work' }]}
        meta={['Talk details']}
      />
      <h1 className="p-0">{page?.meta?.title}</h1>

      {page?.markdown && (
        <>
          <Spacer h="2rem" />
          <Markdown content={page?.markdown} />
        </>
      )}

      <Spacer h="1.2rem" />
      <div className="content markdown flex flex-col">
        <h2>Events</h2>
        <Grid>
          {Object.values(page?.meta?.events)
            ?.filter((event) => event?.date < new Date())
            ?.toSorted((a, b) => (a?.date > b?.date ? -1 : 1))
            ?.map((event) => (
              <EventListItem key={event.date.toString()} event={event} />
            ))}
        </Grid>

        {!!links?.length && (
          <>
            <h2>Other resources</h2>
            <Grid>
              {links.map((link, index) => (
                <ListItem
                  key={`${link.href}-${index}`}
                  title={
                    <span className="flex flex-row items-center gap-2">
                      <span className="text-[1.4rem]">{link.icon}</span>
                      <span>{link.label}</span>
                    </span>
                  }
                  href={link.href}
                  target={link.target}
                />
              ))}
            </Grid>
          </>
        )}

        {!!videoRecordings.length && (
          <>
            <h2 className="pb-0">Recordings</h2>
            {videoRecordings?.map((event, i) => (
              <>
                {i > 0 && <Spacer h=".8rem" />}
                <h3 className="pt-[.8rem] pb-[.2rem]">
                  {event.name} ({event.date.getFullYear()})
                </h3>
                <iframe
                  className="my-0"
                  src={event.videoEmbed}
                  title="Video embed player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath<TalkFrontmatter>('my-work/talks');

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/my-work\/talks\//, ''),
  }));
}
