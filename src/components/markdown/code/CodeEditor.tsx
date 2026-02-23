'use client';

import Editor from '@monaco-editor/react';

import { Caption } from '@/components/markdown/code/Caption';

type Props = {
  code: string;
  language: string;
  alt?: string;
};

export function CodeEditor({ code, language, alt }: Props) {
  return (
    <div className="bg-[orange]">
      <Editor language={language} value={code} />
      {alt && <Caption>{alt}</Caption>}
    </div>
  );
}
