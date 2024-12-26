import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

import { Grid } from "@/components/list/Grid";
import { ListItem } from "@/components/list/ListItem";
import { Spacer } from "@/components/spacer";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

import type { getPageFromPath } from "@/utils/getPageFromPath";
import type { Metadata } from "next";

export type BookFrontmatter = {
  cover: string;
  author: string;
  title: string;
  description?: string;
  externalUrl?: string;
  status: "read" | "reading" | "shelf";
};

type Book = Awaited<ReturnType<typeof getPageFromPath<BookFrontmatter>>>;

export const metadata: Metadata = {
  title: "Library — Julian Burr",
};

export default async function LibraryPage() {
  const books = await getPagesFromPath<BookFrontmatter>("library");
  const grouped = books
    .toSorted((a, b) => (a?.meta.title! < b?.meta.title! ? -1 : 1))
    .reduce<[Book[], Book[], Book[]]>(
      (all, book) => {
        if (book?.meta?.status === "read") {
          all[0].push(book);
        } else if (book?.meta?.status === "reading") {
          all[1].push(book);
        } else if (book) {
          all[2].push(book);
        }
        return all;
      },
      [[], [], []]
    );

  const renderBook = (book: Book) => (
    <ListItem
      key={book?.pathname}
      cover={book?.meta?.cover}
      coverAspectRatio="portrait"
      meta={book?.meta?.author}
      title={book?.meta?.title}
      href={book?.pathname}
      actions={
        book?.meta?.externalUrl
          ? [
              {
                icon: <ArrowSquareOut />,
                label: "External link",
                href: book?.meta?.externalUrl,
                target: "_blank",
              },
            ]
          : []
      }
    />
  );

  return (
    <>
      <h1>Library</h1>

      <h2>Books read</h2>
      <p>
        This is a collection of books I’ve been reading that I would recommend.
        It is by no means a complete list or anything, and you’ll also find that
        it might contain a book or two that have nothing to do with programming
        or business. I just enjoyed reading them.
      </p>

      <Spacer h="1.2rem" />
      <Grid size="small">{grouped[0].map(renderBook)}</Grid>

      <Spacer h="1.2rem" />
      <h2>Currently reading</h2>
      <Grid size="small">{grouped[1].map(renderBook)}</Grid>

      <Spacer h="1.2rem" />
      <h2>Sitting on my bookshelf</h2>
      <Grid size="small">{grouped[2].map(renderBook)}</Grid>
    </>
  );
}
