import { Newspaper, Pen } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Grid } from "@/components/list/Grid";
import { ListItem } from "@/components/list/ListItem";
import { Spacer } from "@/components/spacer";
import { EventListItem } from "@/features/my-work/EventListItem";
import { getPageFromPath } from "@/utils/getPageFromPath";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { TalkFrontmatter } from "@/features/my-work/TalkListItem";
import type { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/talks/${slug}.md`);
  console.log({ page });

  if (!page) {
    return notFound();
  }

  const title = `Talk: ${page.meta.title} — Julian Burr`;
  return { title };
}

export default async function TalkDetailsPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageFromPath<TalkFrontmatter>(
    `my-work/talks/${slug}.md`
  );

  if (!page) {
    return notFound();
  }

  const links = [
    {
      icon: <Newspaper />,
      label: "Blog",
      href: page?.meta?.blogUrl,
      target: page?.meta?.blogUrl?.startsWith("http")
        ? ("_blank" as const)
        : undefined,
    },
    {
      icon: <Pen />,
      label: "Transcript",
      href: page?.meta?.transcriptUrl,
    },
  ].filter((action) => !!action.href);

  return (
    <>
      <p className="font-heading p-0 leading-[1.2]">
        <Link href="/my-work">My work</Link> — Talk details
      </p>
      <h1 className="p-0 mt-1 mb-6">{page?.meta?.title}</h1>

      <div
        className="details"
        dangerouslySetInnerHTML={{
          __html: page?.content?.html || "",
        }}
      />

      <Spacer h="1.2rem" />
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
          <Spacer h="1.2rem" />
          <h2>Further resources</h2>
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
          <Spacer h="1.8rem" />
        </>
      )}

      {Object.values(page?.meta?.events)
        ?.filter((event) => event?.videoEmbed)
        ?.map((event) => (
          <>
            <Spacer h="1.2rem" />
            <h2>Recording from {event.name}</h2>
            <iframe
              className="video-embed"
              src={event.videoEmbed}
              title="Video embed player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <Spacer h="1.8rem" />
          </>
        ))}
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPagesFromPath<TalkFrontmatter>("my-work/talks");

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/my-work\/talks\//, ""),
  }));
}
