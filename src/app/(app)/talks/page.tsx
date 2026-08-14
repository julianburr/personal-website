import Link from 'next/link';
import { preconnect } from 'react-dom';

import { Grid } from '@/components/list/Grid';
import { Spacer } from '@/components/spacer';
import { TalkListItem } from '@/features/my-work/TalkListItem';
import { getPagesFromPath } from '@/utils/getPagesFromPath';

import type { TalkFrontmatter } from '@/features/my-work/TalkListItem';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public speaking — Julian Burr',
};

export default async function MyWorkPage() {
  preconnect('https://storage.cloud.google.com');

  const talks = await getPagesFromPath<TalkFrontmatter>('my-work/talks');
  const [talksWithCover, talksWithoutCover] = talks
    .filter((talk) => !!talk)
    .map((talk) => {
      const lastEvent = Object.values(talk?.meta?.events || {})
        .filter((event) => event.date < new Date())
        .toSorted((a, b) => (a.date > b.date ? -1 : 1))
        .at(0);
      return { ...talk, __lastEvent: lastEvent };
    })
    .filter((talk) => !!talk.__lastEvent)
    .toSorted((a, b) => (a.__lastEvent!.date! > b.__lastEvent!.date! ? -1 : 1))
    .reduce<[typeof talks, typeof talks]>(
      (all, talk) => {
        const { __lastEvent, ...rest } = talk;
        if (new Date(talk.__lastEvent!.date)?.getFullYear() >= 2023) {
          all[0].push(rest);
        } else {
          all[1].push(rest);
        }
        return all;
      },
      [[], []],
    );

  return (
    <>
      <h1>Public speaking</h1>
      <p>
        Over the last few years I’ve been using opportunities at meetups and
        conferences to improve my skills around public speaking and
        communication more generally. This is a selection of talks I have
        recently been presenting. You can also see a{' '}
        <Link href="/my-work/talks/events">list of all events</Link> or a{' '}
        <Link href="/my-work/talks/videos">list of all video recordings</Link>.
      </p>

      <Spacer h="1.2rem" />
      <Grid>
        {talksWithCover.map((talk) => (
          <TalkListItem key={talk?.pathname} page={talk} />
        ))}
      </Grid>

      <Spacer h="1.2rem" />
      <Grid>
        {talksWithoutCover.map((talk) => (
          <TalkListItem key={talk?.pathname} page={talk} />
        ))}
      </Grid>
    </>
  );
}
