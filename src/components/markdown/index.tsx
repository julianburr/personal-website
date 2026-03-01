import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import classNames from 'classnames';
import { MarkdownAsync } from 'react-markdown';
import rehypeCallouts from 'rehype-callouts';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSmartypants from 'remark-smartypants';

import { Anchor } from '@/components/markdown/Anchor';
import { BlockQuote } from '@/components/markdown/BlockQuote';
import { Demo } from '@/components/markdown/Demo';
import { Hr } from '@/components/markdown/Hr';
import { Image } from '@/components/markdown/Image';
import { Section } from '@/components/markdown/Section';
import { Code } from '@/components/markdown/code';
import { CodeSandboxProvider } from '@/components/markdown/code/sandbox/Provider';
import { remarkDirectiveToHast } from '@/utils/remarkDirectiveToHast';

const remarkPlugins = [
  remarkDirectiveToHast,
  remarkDirective,
  [remarkEmbedder, { transformers: [oembedTransformer] }],
  remarkGfm,
  remarkMath,
  remarkSmartypants,
  remarkParse,
  remarkRehype,
];

const rehypePlugins = [
  [rehypeExternalLinks, { target: '_blank', rel: ['nofollow'] }],
  rehypeKatex,
  [rehypeCallouts, { callouts: { slide: { title: '', indicator: '' } } }],
  rehypeUnwrapImages,
];

const components = {
  img: Image,
  blockquote: BlockQuote,
  code: Code,
  a: Anchor,
  hr: Hr,
  section: Section,
  demo: Demo,
};

type Props = {
  content: string;
  components?: any;
  className?: string;
};

export async function CoreMarkdown({ content, components, className }: Props) {
  const rendered = await MarkdownAsync({
    children: content,
    remarkPlugins,
    rehypePlugins,
    components,
  } as any);

  return (
    <div className={classNames(className, 'details markdown relative')}>
      {rendered}
    </div>
  );
}

export function Markdown(props: Omit<Props, 'components'>) {
  return (
    <CodeSandboxProvider>
      <CoreMarkdown {...props} components={components} />
    </CodeSandboxProvider>
  );
}
