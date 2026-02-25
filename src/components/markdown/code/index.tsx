import { CodeBlock } from '@/components/markdown/code/CodeBlock';
import { InlineCode } from '@/components/markdown/code/InlineCode';
import { CodeSandbox } from '@/components/markdown/code/sandbox';

import type { ReactNode } from 'react';

type Meta = {
  sandbox?: boolean;
  sandboxId?: string;
  sandboxTemplate?: string;
  sandboxFile?: string;
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

  const isSandbox = meta.sandbox;
  const language = meta.language || className?.match(/language-(\w+)/)?.[1];

  if (!language) {
    return <InlineCode code={code} />;
  }

  if (isSandbox) {
    return <CodeSandbox code={code} meta={meta} language={language} />;
  }

  return <CodeBlock code={code} meta={meta} language={language} />;
}
