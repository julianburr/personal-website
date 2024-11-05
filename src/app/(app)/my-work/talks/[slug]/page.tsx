import {
  MicrophoneStage,
  MonitorPlay,
  Newspaper,
  Pen,
  ProjectorScreen,
} from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Grid } from "@/components/list/Grid";
import { ListItem } from "@/components/list/ListItem";
import { Spacer } from "@/components/spacer";
import { getPageFromPath } from "@/utils/getPageFromPath";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/talks/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const title = `Talk: ${page.meta.title} — Julian Burr`;
  return { title };
}

export default async function TalkDetailsPage({ params }: any) {
  const { slug } = await params;
  const page = await getPageFromPath(`my-work/talks/${slug}.md`);

  if (!page) {
    return notFound();
  }

  const links = [
    {
      icon: <MicrophoneStage />,
      label: "External event link",
      href: page?.meta?.eventUrl,
      target: "_blank" as const,
    },
    {
      icon: <ProjectorScreen />,
      label: "Slides",
      href: page?.meta?.slidesUrl,
      target: "_blank" as const,
    },
    {
      icon: <MonitorPlay />,
      label: "Video",
      href: page?.meta?.videoUrl,
      target: "_blank" as const,
    },
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
        <Link href="/my-work">My work</Link> —{" "}
        {dayjs(page?.meta?.date).format("MMMM D, YYYY")} — {page?.meta?.event}
      </p>
      <h1 className="p-0 mt-1 mb-6">{page?.meta?.title}</h1>

      {page?.meta?.videoEmbed && (
        <>
          <iframe
            className="video-embed"
            src={page?.meta?.videoEmbed}
            title="Video embed player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <Spacer h="1.8rem" />
        </>
      )}

      {!!links?.length && (
        <>
          <Grid>
            {links.map((link) => (
              <ListItem
                key={link.href}
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
  const posts = await getPagesFromPath("my-work/talks");

  return posts.map((post) => ({
    slug: post?.pathname.replace(/^\/my-work\/talks\//, ""),
  }));
}
