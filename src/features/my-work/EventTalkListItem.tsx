import {
  MicrophoneStage,
  MonitorPlay,
  ProjectorScreen,
} from "@phosphor-icons/react/dist/ssr";

import { ListItem } from "@/components/list/ListItem";

import type { TalkFrontmatter } from "@/features/my-work/TalkListItem";
import type { getPageFromPath } from "@/utils/getPageFromPath";

type EventTalkListItemProps = {
  event: TalkFrontmatter["events"][string];
  talk: Awaited<ReturnType<typeof getPageFromPath<TalkFrontmatter>>>;
  disabled?: boolean;
};

export function EventTalkListItem({
  event,
  talk,
  disabled,
}: EventTalkListItemProps) {
  const title = event.title || talk?.meta?.title;
  return (
    <ListItem
      key={event.date.toString()}
      title={title}
      date={event.date}
      meta={`@ ${event.name}`}
      href={disabled ? undefined : talk?.pathname}
      actionsInline={[
        {
          icon: <MicrophoneStage />,
          label: "External event link",
          href: event?.url!,
          target: "_blank",
        },
        {
          icon: <ProjectorScreen />,
          label: "Slides",
          href: event?.slidesUrl!,
          target: "_blank",
        },
        {
          icon: <MonitorPlay />,
          label: "Video",
          href: event?.videoUrl!,
          target: "_blank",
        },
      ]}
    />
  );
}
