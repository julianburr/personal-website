/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import dayjs from "dayjs";
import Link from "next/link";

import { Tooltip } from "@/components/tooltip";

import type { ReactNode } from "react";

type Props = {
  cover?: string;
  coverAspectRatio?: "landscape" | "portrait";
  date?: Date | string;
  dateFormat?: string;
  meta?: string;
  title: ReactNode;
  description?: string;
  actions?: {
    href: string;
    icon: ReactNode;
    label: string;
    target?: "_blank";
  }[];
  href?: string;
  target?: "_blank";
};

function MaybeLink(props: any) {
  return props.href ? <Link {...props} /> : <div {...props} />;
}

export function ListItem({
  cover,
  coverAspectRatio = "landscape",
  date,
  dateFormat = "MMMM D, YYYY",
  meta,
  title,
  description,
  actions,
  href,
  target,
}: Props) {
  const effectiveActions = actions?.filter((action) => !!action.href) || [];

  return (
    <div role="listitem" className="flex flex-1 relative font-heading group">
      <MaybeLink
        href={href}
        rel={href && target === "_blank" ? "noopener noreferrer" : undefined}
        className={classNames(
          "flex flex-1 flex-col shadow-none transition-all",
          {
            "text-inherit drop-shadow-none hover:no-underline hover:drop-shadow-lg":
              !!href,
          }
        )}
      >
        {cover && (
          <img
            alt={`${title} hero image`}
            src={cover}
            className={classNames(
              "w-full aspect-[16/9] object-cover transition-all grayscale opacity-75 group-hover:grayscale-0 group-focus-within:grayscale-0 group-hover:opacity-100 group-focus-within:opacity-100",
              {
                "aspect-[14/9]": coverAspectRatio === "landscape",
                "aspect-[9/14]": coverAspectRatio === "portrait",
              }
            )}
          />
        )}

        <div
          className={
            "flex flex-1 flex-col p-[.8rem] w-full transition-all text-inherit font-normal bg-grey-light no-underline"
          }
        >
          {!!(date || meta) && (
            <span className="text-[var(--page--color)] text-xs inline pr-[.2rem] translate-y-[-.1rem] leading-[1.2]">
              {date && `${dayjs(date).format(dateFormat)} — `}
              {meta}
            </span>
          )}

          <h2 className="p-0 mt-[.2rem] text-lg leading-[1.2]">{title}</h2>
          {description && (
            <p className="p-0 text-sm text-black/80 font-default">
              {description}
            </p>
          )}
        </div>
      </MaybeLink>

      {!!effectiveActions?.length && (
        <div className="absolute right-0 top-0 p-1 flex flex-row flex-wrap gap-1 transition-all opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
          {effectiveActions?.map((action) => {
            return (
              <Tooltip key={action.href} content={action.label}>
                <Link
                  href={action.href}
                  target={action.target}
                  rel={
                    action.target === "_blank"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-inherit w-[2.4rem] h-[2.4rem] flex items-center justify-center transition-all bg-grey-light shadow-none opacity-60 hover:shadow-lg hover:opacity-100"
                >
                  <span className="flex text-[1.4rem]">{action.icon}</span>
                </Link>
              </Tooltip>
            );
          })}
        </div>
      )}
    </div>
  );
}
