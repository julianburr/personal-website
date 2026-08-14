import Link from 'next/link';
import { preconnect } from 'react-dom';

import { Grid } from '@/components/list/Grid';
import { Spacer } from '@/components/spacer';
import { BlogListItem } from '@/features/my-work/BlogListItem';
import { getPagesFromPath } from '@/utils/getPagesFromPath';

import type { BlogFrontmatter } from '@/features/my-work/BlogListItem';
import type { Metadata } from 'next';

const sortByDate = (a: any, b: any) => {
  return !!a?.meta?.date && !!b?.meta?.date && a?.meta?.date > b?.meta?.date
    ? -1
    : 1;
};

export const metadata: Metadata = {
  title: 'Blog — Julian Burr',
};

export default async function MyWorkPage() {
  preconnect('https://storage.cloud.google.com');

  const blogs = await getPagesFromPath<BlogFrontmatter>('my-work/blog');

  const [blogPosts] = blogs
    .toSorted(sortByDate)
    .reduce<[typeof blogs, typeof blogs]>(
      (all, blog) => {
        if (blog?.meta?.type === 'blog') {
          all[0].push(blog);
        } else {
          all[1].push(blog);
        }
        return all;
      },
      [[], []],
    );

  return (
    <>
      <h1>Blog</h1>
      <p>
        I like to write down my thoughts and learnings, not only to share them
        with others, but also for future me to come back to. Most of that ends
        up in small snippets I put into the <Link href="/til">TIL section</Link>
        , but some of it also ends up in longer blog posts.
      </p>

      <Spacer h=".8rem" />
      <Grid>
        {blogPosts.map((blog) => (
          <BlogListItem key={blog?.pathname} page={blog} />
        ))}
      </Grid>
    </>
  );
}
