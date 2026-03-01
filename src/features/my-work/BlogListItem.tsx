import { ListItem } from '@/components/list/ListItem';
import { getTimeToRead } from '@/utils/getTimeToRead';

import type { getPageFromPath } from '@/utils/getPageFromPath';

export type BlogFrontmatter = {
  title: string;
  date: Date;
  type?: 'blog' | 'write-up';
  externalUrl?: string;
  coverUrl?: string;
};

type BlogListItemProps = {
  page: Awaited<ReturnType<typeof getPageFromPath<BlogFrontmatter>>>;
};

export function BlogListItem({ page }: BlogListItemProps) {
  const href = page?.markdown ? page?.pathname : page?.meta?.externalUrl;
  const cover = page?.meta?.type === 'blog' ? page?.meta?.coverUrl : undefined;
  const meta = page?.markdown
    ? `${getTimeToRead(page?.markdown)} min read`
    : undefined;

  return (
    <ListItem
      key={page?.pathname}
      date={page?.meta?.date}
      cover={cover}
      title={page?.meta?.title}
      meta={meta}
      href={href}
      target={page?.markdown ? undefined : '_blank'}
    />
  );
}
