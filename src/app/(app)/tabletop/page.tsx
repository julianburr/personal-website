import { Grid } from '@/components/list/Grid';
import { ListItem } from '@/components/list/ListItem';
import { Spacer } from '@/components/spacer';
import { getPagesFromPath } from '@/utils/getPagesFromPath';

import type { getPageFromPath } from '@/utils/getPageFromPath';
import type { Metadata } from 'next';

export type GameFrontmatter = {
  cover: string;
  title: string;
  description?: string;
  externalUrl?: string;
  status: 'played' | 'shelf';
  isLegacy?: boolean;
};

type Game = Awaited<ReturnType<typeof getPageFromPath<GameFrontmatter>>>;

export const metadata: Metadata = {
  title: 'Tabletop — Julian Burr',
};

export default async function TabletopPage() {
  const games = await getPagesFromPath<GameFrontmatter>('tabletop');
  const grouped = games
    .toSorted((a, b) => {
      const aTitle = a?.meta.title ?? '';
      const bTitle = b?.meta.title ?? '';
      return aTitle < bTitle ? -1 : 1;
    })
    .reduce<[Game[], Game[], Game[]]>(
      (all, game) => {
        if (game?.meta?.status === 'played') {
          if (game?.meta?.isLegacy) {
            all[1].push(game);
          } else {
            all[0].push(game);
          }
        } else if (game) {
          all[2].push(game);
        }
        return all;
      },
      [[], [], []],
    );

  const renderGame = (game: Game) => (
    <ListItem
      key={game?.pathname}
      cover={game?.meta?.cover}
      coverAspectRatio="square"
      title={game?.meta?.title}
      href={game?.meta?.externalUrl}
      target="_blank"
    />
  );

  return (
    <>
      <h1>Tabletop</h1>

      <h2>Great legacy games</h2>
      <Spacer h=".4rem" />
      <Grid size="small">{grouped[1].map(renderGame)}</Grid>

      <Spacer h="1.2rem" />
      <h2>Other board games I highly recommend</h2>
      <Spacer h=".4rem" />
      <Grid size="small">{grouped[0].map(renderGame)}</Grid>

      <Spacer h="1.2rem" />
      <h2>On my wishlist</h2>
      <p>
        ...and possibly on my shelf already, still wrapped in the plastic foil
        of shame.
      </p>
      <Spacer h="1.2rem" />
      <Grid size="small">{grouped[2].map(renderGame)}</Grid>
    </>
  );
}
