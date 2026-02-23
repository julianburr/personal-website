import { notFound } from 'next/navigation';

import { Galery } from '@/features/around-the-world/Galery';
import { getPageFromPath } from '@/utils/getPageFromPath';
import { getPagesFromPath } from '@/utils/getPagesFromPath';

export default async function AroundTheWorldDetailsPage({ params }: any) {
  const { slug } = await params;
  const pagePath = `around-the-world/${slug.join('/')}.md`;
  const page = await getPageFromPath<any>(pagePath);

  if (!page) {
    return notFound();
  }

  return (
    <div className="flex flex-1 bg-white absolute inset-[.6rem] sm:inset-[3rem]">
      <div className="w-full h-full relative">
        <Galery {...page.meta} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const destinations = await getPagesFromPath('around-the-world');

  return destinations.map((destinations) => ({
    slug: destinations?.pathname
      .replace(/^\/around-the-world\//, '')
      .split('/')
      .map((item) => item.trim())
      .filter(Boolean),
  }));
}
