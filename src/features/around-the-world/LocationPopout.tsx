import { MicrophoneStage, PersonSimpleHike } from "@phosphor-icons/react";
import Link from "next/link";
import { Fragment, useCallback, useMemo } from "react";

type Entry = {
  pathname?: string;
  meta: {
    title?: string;
    subtitle?: string;
    place: string;
    region?: string;
    country: string;
    type?: string;
    thumb?: string;
    images?: string[];
    date: string;
  };
};

type Props = {
  entries: Entry[];
};

function LocationPopout({ entries }: Props) {
  const thumb = entries?.find((entry) => !!entry?.meta?.thumb)?.meta?.thumb;

  const grouped = useMemo(
    () =>
      entries
        ?.toSorted?.((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1))
        ?.reduce<[Entry[], Entry[]]>(
          (all, entry) => {
            if (entry?.meta?.type === "talk") {
              all[1].push(entry);
            } else {
              all[0].push(entry);
            }
            return all;
          },
          [[], []]
        ) || [],
    [entries]
  );

  const renderGroup = useCallback((entry: Entry, index: number) => {
    const shouldRenderLink =
      !!entry?.pathname &&
      (entry?.meta?.type === "talk" || !!entry?.meta?.images?.length);
    return (
      <Fragment key={index}>
        {shouldRenderLink ? (
          <Link
            href={entry?.pathname!}
            className="flex text-inherit p-[.6rem] group font-normal hover:bg-grey-light hover:no-underline focus:bg-grey-light focus:no-underline transition-all"
          >
            <span className="flex flex-col flex-1">
              <h1 className="text-base m-0 p-0 leading-[1.1] font-bold group-hover:underline group-focus:underline">
                {entry?.meta?.title || entry?.meta?.place}
              </h1>
              <span className="text-xs opacity-[.64] leading-[1.1]">
                {entry?.meta?.subtitle ? (
                  <>{entry.meta.subtitle}</>
                ) : entry?.meta?.region ? (
                  <>
                    {entry.meta.region}, {entry.meta.country}
                  </>
                ) : (
                  <>{entry.meta.country}</>
                )}
              </span>
            </span>
          </Link>
        ) : (
          <div className="flex flex-col p-[.6rem]">
            <h1 className="text-base m-0 p-0 leading-[1.1]">
              {entry?.meta?.title || entry?.meta?.place}
            </h1>
            <span className="text-xs opacity-[.64] leading-[1.1]">
              {entry?.meta?.region ? (
                <>
                  {entry.meta.region}, {entry.meta.country}
                </>
              ) : (
                <>{entry.meta.country}</>
              )}
            </span>
          </div>
        )}
      </Fragment>
    );
  }, []);

  return (
    <div className="w-[12rem]">
      {thumb && (
        <img
          alt={`${entries?.[0]?.meta?.place} thumbnail`}
          className="w-full h-[7rem] object-fill bg-grey-medium"
          src={thumb}
        />
      )}
      <div className="p-[.2rem] flex flex-col max-h-[16rem] overflow-auto">
        {!!grouped[0]?.length && (
          <span className="flex items-center p-[.6rem] pb-[.3rem] gap-[.3rem] opacity-[.40] text-xs">
            <PersonSimpleHike className="h-[1rem] w-auto" />
            <span>Travel</span>
          </span>
        )}
        {grouped[0].map(renderGroup)}

        {!!grouped[0]?.length && !!grouped[1]?.length && (
          <span className="flex flex-shrink-0 h-[1px] w-[calc(100%+.4rem)] my-[.2rem] mx-[-.2rem] bg-grey-light" />
        )}

        {!!grouped[1]?.length && (
          <span className="flex items-center p-[.6rem] pb-[.3rem] gap-[.3rem] opacity-[.40] text-xs">
            <MicrophoneStage className="h-[1rem] w-auto" />
            <span>Talks</span>
          </span>
        )}
        {grouped[1].map(renderGroup)}
      </div>
    </div>
  );
}

export { LocationPopout };
