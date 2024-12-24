import fs from "node:fs";
import path from "node:path";

import remarkEmbedder from "@remark-embedder/core";
import oembedTransformer from "@remark-embedder/transformer-oembed";
import matter from "gray-matter";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";

import "prism-themes/themes/prism-lucario.css";

const contentRoot = path.resolve(process.cwd(), "./content");

async function parseMarkdown(raw: string) {
  const remarkResult = await unified()
    .use(remarkParse)
    .use(remarkEmbedder, { transformers: [oembedTransformer] })
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeKatex)
    .use(rehypeExternalLinks, { target: "_blank", rel: ["nofollow"] })
    .use(rehypeStringify)
    .process(raw);
  const html = remarkResult.toString();
  return { raw, html };
}

export async function getPageFromPath<Meta = any>(relFilePath: string) {
  try {
    const filePath = path.resolve(contentRoot, relFilePath);
    const fileContent = fs.readFileSync(filePath);

    const { data, content } = matter(fileContent);

    // We want to be able to add some markdown in the frontmatter metadata
    // as well, so here we check for the prefix `md*` pattern to parse those
    // meta fields
    let meta: any = {};
    for (let key in data) {
      if (key.match(/^md[A-Z]{1}/)) {
        meta[key] = await parseMarkdown(data[key].replace("\n", "\n\n"));
      } else {
        meta[key] = data[key];
      }
    }

    return {
      pathname: `/${relFilePath.replace(/\.md$/, "")}`,
      meta: meta as Meta,
      content: await parseMarkdown(content),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
