import dayjs from "dayjs";
import Link from "next/link";

import { Grid } from "@/components/list/Grid";
import { Spacer } from "@/components/spacer";
import { EventTalkListItem } from "@/features/my-work/EventTalkListItem";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { TalkFrontmatter } from "@/features/my-work/TalkListItem";

// Force dynamic to ensure date filter is working as expected
export const dynamic = "force-dynamic";

type EnhancedEvent = TalkFrontmatter["events"][string] & {
  talk: Awaited<ReturnType<typeof getPagesFromPath<TalkFrontmatter>>>[number];
};

export default async function TalkEventsPage() {
  const now = new Date();
  const talks = await getPagesFromPath<TalkFrontmatter>("my-work/talks");

  const eventsMap = talks
    ?.reduce<EnhancedEvent[]>((all, talk) => {
      const talkEvents = Object.values(talk?.meta.events || {}).map(
        (event) => ({ ...event, talk: talk! })
      );
      return all.concat(talkEvents);
    }, [])
    ?.toSorted((a, b) => (a?.date! > b?.date! ? -1 : 1))
    ?.reduce<{ [year: string]: EnhancedEvent[] }>((all, event) => {
      const year =
        event.date > now ? "Upcoming" : dayjs(event.date).format("YYYY");
      if (!all[year]) {
        all[year] = [];
      }
      all[year].push(event);
      return all;
    }, {});

  return (
    <>
      <p className="font-heading p-0 leading-[1.2]">
        <Link href="/my-work">My work</Link> — Talks
      </p>
      <h1 className="p-0 mt-1">Events</h1>

      {Object.keys(eventsMap)
        ?.toSorted((a, b) => (a > b ? -1 : 1))
        ?.map((year, index) => (
          <>
            {index > 0 && <Spacer h="1.2rem" />}
            <h2>{year}</h2>

            <Spacer h=".8rem" />
            <Grid>
              {eventsMap[year].map((event) => (
                <EventTalkListItem
                  key={event?.date?.toString()}
                  event={event}
                  talk={event.talk}
                  disabled={event?.date > now}
                />
              ))}
            </Grid>
          </>
        ))}
    </>
  );
}
