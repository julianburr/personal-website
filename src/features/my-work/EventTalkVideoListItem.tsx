import { ListItem } from "@/components/list/ListItem";

import type { TalkFrontmatter } from "@/features/my-work/TalkListItem";
import type { getPageFromPath } from "@/utils/getPageFromPath";

type EventTalkVideoListItemProps = {
  event: TalkFrontmatter["events"][string];
  talk: Awaited<ReturnType<typeof getPageFromPath<TalkFrontmatter>>>;
};

export function EventTalkVideoListItem({
  event,
  talk,
}: EventTalkVideoListItemProps) {
  if (!event?.videoUrl) {
    return null;
  }

  const title = event.title || talk?.meta?.title;
  return (
    <ListItem
      key={event.date.toString()}
      title={title}
      date={event.date}
      meta={`@ ${event.name}`}
      href={event?.videoUrl}
      target="_blank"
      coverVideo={event.videoEmbed}
    />
  );
}
