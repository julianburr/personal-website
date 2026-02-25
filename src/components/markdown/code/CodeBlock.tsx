import { Prism } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Caption } from '@/components/markdown/code/Caption';
import { Spacer } from '@/components/spacer';

import type { ComponentProps } from 'react';

const customTheme: ComponentProps<typeof Prism>['style'] = {
  ...prism,
  ['code[class*="language-"]']: {
    ...prism['code[class*="language-"]'],
    fontFamily: 'var(--font-mono)',
    textShadow: 'none',
    fontSize: '.9em',
  },
  ['pre[class*="language-"]']: {
    ...prism['pre[class*="language-"]'],
    backgroundColor: 'var(--color-grey-light)',
    margin: 0,
  },
  operator: {
    ...prism.operator,
    background: 'none',
  },
};

type Props = {
  code: string;
  language?: string;
  meta: any;
};

export function CodeBlock({ code, language, meta }: Props) {
  return (
    <div className="flex flex-col gap-[.2rem] my-[2.4rem]">
      <Prism language={language} style={customTheme}>
        {code}
      </Prism>
      {meta?.alt && (
        <>
          <Spacer h=".2rem" />
          <Caption>{meta.alt}</Caption>
        </>
      )}
    </div>
  );
}
