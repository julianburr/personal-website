import { preconnect } from 'react-dom';

import { WorldMap } from '@/features/around-the-world/WorldMap';
import { getPagesFromPath } from '@/utils/getPagesFromPath';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Around the world — Julian Burr',
};

export default async function AroundTheWorldPage() {
  preconnect('https://storage.cloud.google.com');

  const talks = await getPagesFromPath('my-work/talks');
  const destinations = await getPagesFromPath('around-the-world');
  return (
    <>
      <h1 className="relative z-10">Around the world</h1>
      <WorldMap destinations={destinations} talks={talks} />
    </>
  );
}
