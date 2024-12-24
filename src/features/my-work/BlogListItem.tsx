import { ListItem } from "@/components/list/ListItem";

import type { getPageFromPath } from "@/utils/getPageFromPath";

export type BlogFrontmatter = {
  title: string;
  date: Date;
  externalUrl?: string;
};

type BlogListItemProps = {
  page: Awaited<ReturnType<typeof getPageFromPath<BlogFrontmatter>>>;
};

export function BlogListItem({ page }: BlogListItemProps) {
  const href = page?.content?.raw ? page?.pathname : page?.meta?.externalUrl;
  return (
    <ListItem
      key={page?.pathname}
      date={page?.meta?.date}
      title={page?.meta?.title}
      href={href}
      target={page?.content?.raw ? undefined : "_blank"}
    />
  );
}
