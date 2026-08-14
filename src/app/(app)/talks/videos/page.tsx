import { Grid } from '@/components/list/Grid';
import { PageMeta } from '@/components/page/PageMeta';
import { Spacer } from '@/components/spacer';
import { EventTalkVideoListItem } from '@/features/my-work/EventTalkVideoListItem';
import { getPagesFromPath } from '@/utils/getPagesFromPath';

import type { TalkFrontmatter } from '@/features/my-work/TalkListItem';

type EnhancedEvent = TalkFrontmatter['events'][string] & {
  talk: Awaited<ReturnType<typeof getPagesFromPath<TalkFrontmatter>>>[number];
};

export default async function TalkEventsPage() {
  const talks = await getPagesFromPath<TalkFrontmatter>('my-work/talks');

  const [eventsConffab, eventsYoutube, eventsWithExternalLink] = talks
    ?.reduce<EnhancedEvent[]>((all, talk) => {
      const talkEvents = Object.values(talk?.meta.events || {})
        .filter((event) => !!event.videoUrl)
        .map((event) => ({ ...event, talk: talk! }));
      return all.concat(talkEvents);
    }, [])
    ?.toSorted((a, b) => (a?.date > b?.date ? -1 : 1))
    .reduce<[EnhancedEvent[], EnhancedEvent[], EnhancedEvent[]]>(
      (all, event) => {
        if (event.videoEmbed?.includes('player.mux.com')) {
          all[0].push(event);
        } else if (event.videoUrl?.includes('youtube.com')) {
          all[1].push(event);
        } else {
          all[2].push(event);
        }
        return all;
      },
      [[], [], []],
    );

  return (
    <>
      <PageMeta
        breadcrumbs={[{ title: 'Public speaking', href: '/talks' }]}
        meta={[]}
      />
      <h1 className="p-0">Videos</h1>

      {eventsConffab.length > 0 && (
        <>
          <h2>Conffab</h2>
          <Spacer h=".8rem" />
          <Grid>
            {eventsConffab.map((event) => (
              <EventTalkVideoListItem
                key={event?.date?.toString()}
                event={event}
                talk={event.talk}
              />
            ))}
          </Grid>
        </>
      )}

      {eventsYoutube.length > 0 && (
        <>
          <h2>YouTube</h2>
          <Spacer h=".8rem" />
          <Grid>
            {eventsYoutube.map((event) => (
              <EventTalkVideoListItem
                key={event?.date?.toString()}
                event={event}
                talk={event.talk}
              />
            ))}
          </Grid>
        </>
      )}

      <Spacer h="1.2rem" />
      <h2>External links to other recordings</h2>
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
