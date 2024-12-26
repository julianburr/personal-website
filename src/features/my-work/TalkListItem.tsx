import { ListItem } from "@/components/list/ListItem";

import type { getPageFromPath } from "@/utils/getPageFromPath";

export type TalkFrontmatter = {
  title: string;
  coverUrl?: string;
  blogUrl?: string;
  transcriptUrl?: string;
  events: {
    [key: string]: {
      date: Date;
      title?: string;
      name: string;
      url?: string;
      type: "conference" | "meetup" | "workshop";
      slidesUrl?: string;
      videoEmbed?: string;
      videoUrl?: string;
      place: {
        online?: boolean;
        country?: string;
        region?: string;
        city?: string;
        latlng?: string;
      };
    };
  };
};

type TalkListItemProps = {
  page: Awaited<ReturnType<typeof getPageFromPath<TalkFrontmatter>>>;
};

export function TalkListItem({ page }: TalkListItemProps) {
  const events = Object.values(page?.meta.events || {})
    ?.filter((event) => event?.date < new Date())
    ?.toSorted?.((a, b) => (a?.date > b?.date ? -1 : 1));
  const eventCount = events.length;
  const lastEvent = events?.at(0);

  let meta = lastEvent?.name;
  if (eventCount > 1) {
    meta += ` + ${eventCount - 1} more`;
  }

  return (
    <ListItem
      key={page?.pathname}
      cover={page?.meta?.coverUrl}
      date={lastEvent?.date}
      meta={meta}
      title={page?.meta?.title}
      href={page?.pathname}
    />
  );
}
