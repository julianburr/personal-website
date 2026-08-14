import { CodeBlock } from '@/components/markdown/code/CodeBlock';
import { InlineCode } from '@/components/markdown/code/InlineCode';

import type { ReactNode } from 'react';

type Meta = {
  language?: string;
  alt?: string;
};

type Props = {
  children: ReactNode;
  className?: string;
  node?: any;
};

export function Code({ children, className, node }: Props) {
  const code = String(children).trim();
  const meta = JSON.parse(node?.data?.meta || '{}') as Meta;

  const language = meta.language || className?.match(/language-(\w+)/)?.[1];

  if (!language) {
    return <InlineCode code={code} />;
  }

  return <CodeBlock code={code} meta={meta} language={language} />;
}
