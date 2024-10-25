"use client";

import classNames from "classnames";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { List } from "@/components/list/List";
import { ListItem } from "@/components/list/ListItem";
import { Spacer } from "@/components/spacer";

type Props = {
  pages: any[];
};

export function TilList({ pages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTags =
    searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const [activeTags, setActiveTags] = useState<string[]>(initialTags);

  useEffect(() => {
    router.push(activeTags?.length ? `?tags=${activeTags.join(",")}` : ``);
  }, [router, activeTags]);

  const filtered = pages
    ?.filter((page: any) => dayjs(page.meta.date).isBefore(dayjs()))
    ?.filter((page) =>
      activeTags?.length
        ? page?.meta?.tags
            .split(",")
            ?.map((tag: string) => tag?.trim?.())
            ?.filter(Boolean)
            ?.find((tag: string) => activeTags.includes(tag))
        : true
    )
    ?.sort((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1));

  const tags = pages
    .reduce((all: any[], page: any) => {
      (page.meta?.tags as string)
        ?.split?.(",")
        ?.map((tag) => tag?.trim?.())
        ?.filter(Boolean)
        ?.forEach((tag) => {
          const existing = all.find((i) => i.name === tag);
          if (!existing) {
            all.push({ name: tag, count: 1 });
          } else {
            existing.count++;
          }
        });

      return all;
    }, [])
    ?.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <>
      <div className="flex flex-row flex-wrap gap-1">
        {tags.map((tag) => {
          const isActive = activeTags.includes(tag.name);
          return (
            <button
              key={tag.name}
              onClick={() =>
                setActiveTags(
                  isActive
                    ? activeTags.filter((item) => tag.name !== item)
                    : [...activeTags, tag.name]
                )
              }
              className={classNames(
                "flex bg-grey-medium text-inherit py-[.2rem] px-[.6rem] font-heading transition-all hover:bg-[var(--page--color)] hover:text-white hover:no-underline",
                {
                  "bg-[var(--page--color)] text-white": isActive,
                }
              )}
            >
              {tag.name}
            </button>
          );
        })}
      </div>

      <Spacer h="1.6rem" />
      <List>
        {filtered.map((page) => {
          return (
            <ListItem
              key={page?.pathname}
              date={page?.meta?.date}
              meta={page?.meta?.tags}
              title={page?.meta?.title}
              href={page?.pathname}
            />
          );
        })}
      </List>
    </>
  );
}
