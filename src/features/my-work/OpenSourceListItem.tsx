import { ListItem } from '@/components/list/ListItem';

import type { getPageFromPath } from '@/utils/getPageFromPath';

export type OpenSourceFrontmatter = {
  title: string;
  date: Date;
  externalUrl: string;
};

type OpenSourceListItemProps = {
  page: Awaited<ReturnType<typeof getPageFromPath<OpenSourceFrontmatter>>>;
};

export function OpenSourceListItem({ page }: OpenSourceListItemProps) {
  return (
    <ListItem
      key={page?.pathname}
      title={page?.meta?.title}
      href={page?.meta?.externalUrl}
      target="_blank"
    />
  );
}
