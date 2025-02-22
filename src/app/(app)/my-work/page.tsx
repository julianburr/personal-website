import Link from "next/link";
import { preconnect } from "react-dom";

import { Grid } from "@/components/list/Grid";
import { Spacer } from "@/components/spacer";
import { BlogListItem } from "@/features/my-work/BlogListItem";
import { OpenSourceListItem } from "@/features/my-work/OpenSourceListItem";
import { TalkListItem } from "@/features/my-work/TalkListItem";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { BlogFrontmatter } from "@/features/my-work/BlogListItem";
import type { OpenSourceFrontmatter } from "@/features/my-work/OpenSourceListItem";
import type { TalkFrontmatter } from "@/features/my-work/TalkListItem";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My work — Julian Burr",
};

export default async function MyWorkPage() {
  preconnect("https://storage.cloud.google.com");

  const talks = await getPagesFromPath<TalkFrontmatter>("my-work/talks");
  const blogs = await getPagesFromPath<BlogFrontmatter>("my-work/blog");
  const openSource = await getPagesFromPath<OpenSourceFrontmatter>(
    "my-work/open-source"
  );

  const [talksWithCover, talksWithoutCover] = talks
    .filter((talk) => !!talk)
    .map((talk) => {
      const lastEvent = Object.values(talk?.meta?.events || {})
        .filter((event) => event.date < new Date())
        .toSorted((a, b) => (a.date > b.date ? -1 : 1))
        .at(0);
      return { ...talk, __lastEvent: lastEvent };
    })
    .filter((talk) => !!talk.__lastEvent)
    .toSorted((a, b) => (a.__lastEvent!.date! > b.__lastEvent!.date! ? -1 : 1))
    .reduce<[typeof talks, typeof talks]>(
      (all, talk) => {
        const { __lastEvent, ...rest } = talk;
        if (new Date(talk.__lastEvent!.date)?.getFullYear() >= 2023) {
          all[0].push(rest);
        } else {
          all[1].push(rest);
        }
        return all;
      },
      [[], []]
    );

  return (
    <>
      <h1>My work</h1>

      <h2>Talks</h2>
      <p>
        Over the last few years I’ve been using opportunities at meetups and
        conferences to improve my skills around public speaking and
        communication more generally. This is a selection of talks I have
        recently been presenting. You can also see a{" "}
        <Link href="/my-work/talks/events">list of all events</Link> or a{" "}
        <Link href="/my-work/talks/videos">list of all video recordings</Link>.
      </p>

      <Spacer h="1.2rem" />
      <Grid>
        {talksWithCover.map((talk) => (
          <TalkListItem key={talk?.pathname} page={talk} />
        ))}
      </Grid>

      <Spacer h="1.2rem" />
      <Grid>
        {talksWithoutCover.map((talk) => (
          <TalkListItem key={talk?.pathname} page={talk} />
        ))}
      </Grid>

      <Spacer h="1.2rem" />
      <h2>Blog posts</h2>
      <p>
        On top of the snippets in the <Link href="/til">TIL section</Link>, I am
        aiming to do a lot more writing in the near future. Similar to public
        speaking, I like sharing my experiences and my learnings, so writing
        these up into blog posts will be a fun challenge. Below you find a
        selection of articles I have written so far.
      </p>

      <Spacer h=".8rem" />
      <Grid>
        {blogs
          .toSorted((a, b) => (a?.meta?.date! > b?.meta?.date! ? -1 : 1))
          .map((blog) => (
            <BlogListItem key={blog?.pathname} page={blog} />
          ))}
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
          .toSorted((a, b) => (a?.meta?.date! > b?.meta?.date! ? -1 : 1))
          .map((project) => (
            <OpenSourceListItem key={project?.pathname} page={project} />
          ))}
      </Grid>
    </>
  );
}
