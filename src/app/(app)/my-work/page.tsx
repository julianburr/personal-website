import {
  MicrophoneStage,
  MonitorPlay,
  Newspaper,
  Pen,
  ProjectorScreen,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Grid } from "@/components/list/Grid";
import { ListItem } from "@/components/list/ListItem";
import { Spacer } from "@/components/spacer";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My work — Julian Burr",
};

export default async function MyWorkPage() {
  const talks = await getPagesFromPath("my-work/talks");
  const blogs = await getPagesFromPath("my-work/blog");
  const openSource = await getPagesFromPath("my-work/open-source");

  return (
    <>
      <h1>My work</h1>

      <h2>Talks</h2>
      <p>
        Over the last few years I’ve been using opportunities at meetups and
        conferences to improve my skills around public speaking and
        communication more generally. This is a selection of events I have
        recently been speaking at.
      </p>

      <Spacer h=".8rem" />
      <Grid>
        {talks
          .sort((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1))
          .map((talk) => {
            return (
              <ListItem
                key={talk?.pathname}
                cover={talk?.meta?.cover}
                date={talk?.meta?.date}
                meta={talk?.meta?.event}
                title={talk?.meta?.title}
                href={talk?.pathname}
                actions={[
                  {
                    icon: <MicrophoneStage />,
                    label: "External event link",
                    href: talk?.meta?.eventUrl,
                    target: "_blank",
                  },
                  {
                    icon: <ProjectorScreen />,
                    label: "Slides",
                    href: talk?.meta?.slidesUrl,
                    target: "_blank",
                  },
                  {
                    icon: <MonitorPlay />,
                    label: "Video",
                    href: talk?.meta?.videoUrl,
                    target: "_blank",
                  },
                  {
                    icon: <Newspaper />,
                    label: "Blog",
                    href: talk?.meta?.blogUrl,
                    target: talk?.meta?.blogUrl?.startsWith("http")
                      ? ("_blank" as const)
                      : undefined,
                  },
                  {
                    icon: <Pen />,
                    label: "Transcript",
                    href: talk?.meta?.transcriptUrl,
                  },
                ]}
              />
            );
          })}
      </Grid>

      <Spacer h="1.2rem" />
      <h2>Blog posts</h2>
      <p>
        On top of the snippets in the <Link href="/til">TIL section</Link>, I
        also published articles on other platforms. My goal is to write more in
        the future, not only sharing my experience with others but also
        improving my own skills at the same time.
      </p>

      <Spacer h=".8rem" />
      <Grid>
        {blogs
          .sort((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1))
          .map((blog) => {
            const href = blog?.content?.raw
              ? blog?.pathname
              : blog?.meta?.externalUrl;
            return (
              <ListItem
                key={blog?.pathname}
                date={blog?.meta?.date}
                title={blog?.meta?.title}
                href={href}
                target={blog?.content?.raw ? undefined : "_blank"}
              />
            );
          })}
      </Grid>

      <Spacer h="1.2rem" />
      <h2>Open Source</h2>
      <p>
        Besides contributions to open source libraries, I created a few of my
        own.
      </p>

      <Spacer h=".8rem" />
      <Grid>
        {openSource
          .sort((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1))
          .map((project) => {
            return (
              <ListItem
                key={project?.pathname}
                title={project?.meta?.title}
                href={project?.meta?.externalUrl}
                target="_blank"
              />
            );
          })}
      </Grid>
    </>
  );
}
