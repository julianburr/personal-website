import {
  Notepad,
  ProjectorScreen,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import Link from "next/link";

import { getPagesFromPath } from "@/utils/getPagesFromPath";

import ImagesSvg from "@/assets/icons/images.svg";
import NotepadSvg from "@/assets/icons/notepad.svg";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My work — Julian Burr",
};

export default async function MyWorkPage() {
  const talks = await getPagesFromPath("my-work/talks");
  const blogs = await getPagesFromPath("my-work/blog");
  const openSource = await getPagesFromPath("my-work/open-source");

  return (
    <>
      <h1>My work</h1>

      <h2>Talks</h2>
      <p>
        Over the last few years I’ve been using opportunities at meetups and
        conferences to improve my skills around public speaking and
        communication more generally. This is a selection of events I recently
        spoke at, you can also find details in my{" "}
        <a href="https://noti.st/jburr90" target="_blank">
          notist profile
        </a>
        .
      </p>
      <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-heading">
        {talks
          .sort((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1))
          .map((talk) => {
            const detailsUrl = talk?.content?.raw
              ? talk.pathname
              : talk?.meta?.detailsUrl
              ? talk?.meta?.detailsUrl
              : undefined;

            const Element = (props: any) =>
              detailsUrl ? (
                <Link
                  href={detailsUrl}
                  className="flex flex-col p-[.8rem] transition-all text-inherit font-normal bg-grey-light shadow-none hover:no-underline hover:shadow-lg"
                  {...props}
                />
              ) : (
                <div
                  className="flex flex-col p-[.8rem] transition-all text-inherit font-normal bg-grey-light"
                  {...props}
                />
              );

            return (
              <Element key={talk?.pathname}>
                <span className="text-[var(--page--color)] text-xs inline pr-[.2rem] translate-y-[-.1rem] leading-[1.2]">
                  {dayjs(talk?.meta?.date).format("MMMM D, YYYY")} —{" "}
                  {talk?.meta?.eventUrl ? (
                    <Link
                      href={talk?.meta?.eventUrl}
                      target="_blank"
                      className="inline"
                    >
                      {talk?.meta?.event}
                    </Link>
                  ) : (
                    <>{talk?.meta?.event}</>
                  )}
                </span>
                <h3 className="p-0 mt-[.2rem] text-lg leading-[1.2]">
                  {talk?.meta?.title}
                </h3>

                <span className="flex flex-row flex-wrap gap-1 mt-1">
                  {detailsUrl && (
                    <Link
                      href={detailsUrl}
                      title="View write-up"
                      className="w-[2.2rem] h-[2.2rem] flex items-center justify-center bg-beige/15 text-red hover:bg-red hover:text-white transition-all"
                    >
                      <Notepad className="h-[1.2rem] w-auto" weight="bold" />
                    </Link>
                  )}
                  {talk?.meta?.videoUrl && (
                    <Link
                      href={talk?.meta?.videoUrl}
                      target="_blank"
                      title="View recording"
                      className="w-[2.2rem] h-[2.2rem] flex items-center justify-center bg-beige/15 text-red hover:bg-red hover:text-white transition-all"
                    >
                      <VideoCamera
                        className="h-[1.2rem] w-auto"
                        weight="bold"
                      />
                    </Link>
                  )}
                  {talk?.meta?.slidesUrl && (
                    <Link
                      href={talk?.meta?.slidesUrl}
                      target="_blank"
                      title="View slides"
                      className="w-[2.2rem] h-[2.2rem] flex items-center justify-center bg-beige/15 text-red hover:bg-red hover:text-white transition-all"
                    >
                      <ProjectorScreen
                        className="h-[1.2rem] w-auto"
                        weight="bold"
                      />
                    </Link>
                  )}
                </span>
              </Element>
            );
          })}
      </div>

      <h2>Blog posts</h2>
      <p>
        On top of the snippets in the <Link href="/til">TIL section</Link>, I
        also published articles on other platforms. My goal is to write more in
        the future, not only sharing my experience with others but also
        improving my own skills at the same time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-heading">
        {blogs
          .sort((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1))
          .map((blog) => {
            return (
              <div
                key={blog?.pathname}
                className="flex flex-col p-[.8rem] transition-all text-inherit font-normal bg-grey-light"
              >
                <span className="text-[var(--page--color)] text-xs inline pr-[.2rem] translate-y-[-.1rem] leading-[1.1]">
                  {dayjs(blog?.meta?.date).format("MMMM D, YYYY")} —
                </span>
                <h3 className="p-0 mt-[.2rem] text-lg leading-[1.1]">
                  {blog?.meta?.title}
                </h3>

                <div className="flex flex-row flex-wrap gap-1">
                  {blog?.content?.raw && (
                    <Link href={blog.pathname}>
                      <NotepadSvg />
                    </Link>
                  )}
                  {blog?.meta?.externalUrl && (
                    <Link href={blog?.meta?.externalUrl} target="_blank">
                      <ImagesSvg />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      <h2>Open Source</h2>
      <p>
        Besides contributions to open source libraries, I created{" "}
        <a href="#">a few of my own</a>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-heading">
        {openSource
          .sort((a, b) => (a?.meta?.date > b?.meta?.date ? -1 : 1))
          .map((project) => {
            return (
              <div
                key={project?.pathname}
                className="flex flex-col p-[.8rem] transition-all text-inherit font-normal bg-grey-light"
              >
                <span className="text-[var(--page--color)] text-xs inline pr-[.2rem] translate-y-[-.1rem] leading-[1.1]">
                  {dayjs(project?.meta?.date).format("YYYY")} —
                </span>
                <h3 className="p-0 mt-[.2rem] text-lg leading-[1.1]">
                  {project?.meta?.title}
                </h3>

                <div className="flex flex-row flex-wrap gap-1">
                  {project?.meta?.externalUrl && (
                    <Link href={project?.meta?.externalUrl} target="_blank">
                      <ImagesSvg />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
