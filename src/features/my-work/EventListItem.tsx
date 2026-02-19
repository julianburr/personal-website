import * as Icons from '@phosphor-icons/react/dist/ssr';

import { ListItem } from '@/components/list/ListItem';

import type { TalkFrontmatter } from '@/features/my-work/TalkListItem';

type EventListItemProps = {
  event: TalkFrontmatter['events'][string];
};

export function EventListItem({ event }: EventListItemProps) {
  const location = [event.place?.city, event.place?.country]
    .filter(Boolean)
    .join(', ');

  const meta = event.place?.online
    ? location
      ? `${location} (Online)`
      : 'Online'
    : location;

  const title = event.type === 'meetup' ? `Meetup: ${event.name}` : event.name;

  return (
    <ListItem
      key={event.date.toString()}
      title={title}
      date={event.date}
      meta={meta}
      actionsInline={[
        {
          icon: <Icons.MicrophoneStageIcon />,
          label: 'External event link',
          href: event?.url,
          target: '_blank',
        },
        {
          icon: <Icons.ProjectorScreenIcon />,
          label: 'Slides',
          href: event?.slidesUrl,
          target: '_blank',
        },
        {
          icon: <Icons.MonitorPlayIcon />,
          label: 'Video',
          href: event?.videoUrl,
          target: '_blank',
        },
      ]}
    />
  );
}
