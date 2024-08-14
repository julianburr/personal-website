import classNames from "classnames";
import dayjs from "dayjs";
import Link from "next/link";

import { Spacer } from "@/components/spacer";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

export async function TilList() {
  const activeTags: string[] = []; // searchParams?.tags?.split(",").filter(Boolean) || [];

  let pages = await getPagesFromPath("til");

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
            <Link
              key={tag.name}
              href={
                isActive && activeTags.length === 1
                  ? `/til`
                  : `/til?tags=${
                      isActive
                        ? activeTags
                            .filter((item) => item !== tag.name)
                            .join(",")
                        : activeTags
                            .concat([tag.name])
                            .filter(Boolean)
                            .join(",")
                    }`
              }
              className={classNames(
                "flex bg-grey-medium text-inherit py-[.2rem] px-[.6rem] font-heading transition-all hover:bg-[var(--page--color)] hover:text-white hover:no-underline",
                {
                  "bg-[var(--page--color)] text-white": isActive,
                }
              )}
            >
              {tag.name}
            </Link>
          );
        })}
      </div>

      <Spacer h="1.6rem" />
      <div className="flex flex-col gap-1">
        {filtered.map((page) => {
          return (
            <Link
              key={page?.pathname}
              href={page?.pathname as string}
              className="flex flex-col p-[.8rem] transition-all text-inherit font-normal bg-grey-light hover:bg-grey-medium hover:no-underline"
            >
              <h2 className="p-0 text-xl leading-[1.3]">
                <span className="text-[var(--page--color)] text-sm mt-[-.8rem] inline-flex pr-[.2rem] translate-y-[-.1rem]">
                  {dayjs(page?.meta?.date).format("MMMM D, YYYY")} —
                </span>{" "}
                {page?.meta?.title}
              </h2>
              <p className="p-0 text-sm text-black/80">
                {page?.meta?.description}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
