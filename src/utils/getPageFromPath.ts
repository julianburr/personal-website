import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

const contentRoot = path.resolve(process.cwd(), './content');

export async function getPageFromPath<
  Meta extends Record<string, any> = Record<string, any>,
>(relFilePath: string) {
  try {
    const filePath = path.resolve(contentRoot, relFilePath);
    const fileContent = fs.readFileSync(filePath);

    const { data, content } = matter(fileContent);

    // We want to be able to add some markdown in the frontmatter metadata
    // as well, so here we check for the prefix `md*` pattern to parse those
    // meta fields
    const meta = Object.keys(data).reduce<Meta>((acc, key) => {
      acc[key as keyof Meta] = data[key as keyof typeof data];
      return acc;
    }, {} as Meta);

    return {
      pathname: `/${relFilePath.replace(/\.md$/, '')}`,
      meta,
      markdown: content,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
