import { CodeBlock } from '@/components/markdown/code/CodeBlock';
import { CodeEditor } from '@/components/markdown/code/CodeEditor';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  node?: any;
};

export function Code({ children, className }: Props) {
  const raw = String(children).trim();
  const language = className?.match(/language-(\w+)/)?.[1];

  const alt = raw.match(/--alt: (.+)/)?.[1];
  const isSandbox = !!raw.split('\n').find((line) => line === '--sandbox');

  const code = raw
    .replace(/--sandbox/, '')
    .replace(/--alt: (.+)/, '')
    .trim();

  if (!language) {
    return (
      <pre className="bg-[currentColor]/4 inline-block px-[.2rem] font-mono text-[.9em]">
        {code}
      </pre>
    );
  }

  if (isSandbox) {
    return <CodeEditor code={code} language={language} alt={alt} />;
  }

  return <CodeBlock code={code} language={language} alt={alt} />;
}
