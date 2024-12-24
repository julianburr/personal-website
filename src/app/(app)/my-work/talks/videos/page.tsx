import Link from "next/link";

import { Grid } from "@/components/list/Grid";
import { Spacer } from "@/components/spacer";
import { EventTalkVideoListItem } from "@/features/my-work/EventTalkVideoListItem";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { TalkFrontmatter } from "@/features/my-work/TalkListItem";

type EnhancedEvent = TalkFrontmatter["events"][string] & {
  talk: Awaited<ReturnType<typeof getPagesFromPath<TalkFrontmatter>>>[number];
};

export default async function TalkEventsPage() {
  const talks = await getPagesFromPath<TalkFrontmatter>("my-work/talks");

  const [eventsWithEmbed, eventsWithExternalLink] = talks
    ?.reduce<EnhancedEvent[]>((all, talk) => {
      const talkEvents = Object.values(talk?.meta.events || {})
        .filter((event) => !!event.videoUrl)
        .map((event) => ({ ...event, talk: talk! }));
      return all.concat(talkEvents);
    }, [])
    ?.toSorted((a, b) => (a?.date! > b?.date! ? -1 : 1))
    .reduce<[EnhancedEvent[], EnhancedEvent[]]>(
      (all, event) => {
        if (event.videoEmbed) {
          all[0].push(event);
        } else {
          all[1].push(event);
        }
        return all;
      },
      [[], []]
    );

  return (
    <>
      <p className="font-heading p-0 leading-[1.2]">
        <Link href="/my-work">My work</Link> — Talks
      </p>
      <h1 className="p-0 mt-1">Videos</h1>

      <h2>Recordings on YouTube & Vimeo</h2>
      <Spacer h=".8rem" />
      <Grid>
        {eventsWithEmbed.map((event) => (
          <EventTalkVideoListItem
            key={event?.date?.toString()}
            event={event}
            talk={event.talk}
          />
        ))}
      </Grid>

      <Spacer h="1.2rem" />
      <h2>External links to recordings</h2>
      <Spacer h=".8rem" />
      <Grid>
        {eventsWithExternalLink.map((event) => (
          <EventTalkVideoListItem
            key={event?.date?.toString()}
            event={event}
            talk={event.talk}
          />
        ))}
      </Grid>
    </>
  );
}
