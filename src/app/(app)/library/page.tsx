import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

import { Grid } from "@/components/list/Grid";
import { ListItem } from "@/components/list/ListItem";
import { Spacer } from "@/components/spacer";
import { getPagesFromPath } from "@/utils/getPagesFromPath";

export default async function LibraryPage() {
  const books = await getPagesFromPath("library");
  return (
    <>
      <h1>Library</h1>
      <p>
        Just a collection of books I’ve been reading that I would recommend.
        This is by no means a complete list or anything, and you’ll also find
        that it might contain a book or two that have nothing to do with
        programming or business. I just enjoyed reading them.
      </p>

      <Spacer h="1.2rem" />
      <Grid size="small">
        {books.map((book) => {
          return (
            <ListItem
              key={book?.pathname}
              cover={book?.meta?.cover}
              coverAspectRatio="portrait"
              meta={book?.meta?.author}
              title={book?.meta?.title}
              href={book?.pathname}
              actions={[
                {
                  icon: <ArrowSquareOut />,
                  label: "External link",
                  href: book?.meta?.externalUrl,
                  target: "_blank",
                },
              ]}
            />
          );
        })}
      </Grid>
    </>
  );
}
