import { Prism } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Caption } from '@/components/markdown/code/Caption';
import { Spacer } from '@/components/spacer';

type Props = {
  language: string;
  code: string;
  alt?: string;
};

export function CodeBlock({ code, language, alt }: Props) {
  return (
    <div className="flex flex-col gap-[.2rem] my-[1.2rem]">
      <Prism
        language={language}
        style={{
          ...prism,
          ['code[class*="language-"]']: {
            ...prism['code[class*="language-"]'],
            fontFamily: 'var(--font-mono)',
            textShadow: 'none',
            fontSize: '.9em',
          },
        }}
      >
        {code}
      </Prism>
      {alt && (
        <>
          <Caption>{alt}</Caption>
          <Spacer h=".2rem" />
        </>
      )}
    </div>
  );
}
