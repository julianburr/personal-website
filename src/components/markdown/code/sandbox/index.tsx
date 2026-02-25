'use client';

import { SandpackProvider, type Sandpack } from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';
import { useEffect, useId, useState } from 'react';

import { Caption } from '@/components/markdown/code/Caption';
import { CodeSandboxEditor } from '@/components/markdown/code/sandbox/Editor';
import { CodeSandboxPreview } from '@/components/markdown/code/sandbox/Preview';
import { Spacer } from '@/components/spacer';

import { useCodeSandbox } from './Provider';

import type { ComponentProps } from 'react';

const customTheme: ComponentProps<typeof Sandpack>['theme'] = {
  ...githubLight,
  colors: {
    ...githubLight.colors,
    surface1: 'var(--color-grey-light)',
    surface2: 'var(--color-grey-medium)',
    surface3: 'var(--color-grey-medium)',
  },
  font: {
    ...githubLight.font,
    body: 'var(--font-default)',
    mono: 'var(--font-mono)',
    size: '.9rem',
    lineHeight: '1.5rem',
  },
};

type Props = {
  code: string;
  meta: any;
  language?: string;
};

export function CodeSandbox({ meta, code }: Props) {
  const ownerId = useId();
  const sandboxId = meta.sandboxId as string;

  const { register, unregister, sandboxes } = useCodeSandbox();
  const sandbox = sandboxes[sandboxId];

  const [showPreview, setShowPreview] = useState(!!meta.sandboxPreview);

  useEffect(() => {
    register({
      ownerId,
      sandboxId,
      template: meta.sandboxTemplate as string,
      meta,
      files: {
        [meta.sandboxFile as string]: code,
      },
    });

    return () => {
      unregister({
        sandboxId,
        files: [meta.sandboxFile as string],
      });
    };
  }, [ownerId, sandboxId, meta.sandboxTemplate, meta.sandboxFile, code]);

  if (!sandbox || sandbox.ownerId !== ownerId) {
    return null;
  }

  return (
    <SandpackProvider
      theme={customTheme}
      files={sandbox.files}
      template={sandbox.template as any}
      customSetup={{ dependencies: meta.sandboxDependencies }}
    >
      <div className="w-full my-[2.4rem]">
        <div className="sandbox w-full h-[30rem] relative overflow-hidden">
          <CodeSandboxEditor />
          <CodeSandboxPreview show={showPreview} setShow={setShowPreview} />
        </div>
        {meta?.alt && (
          <>
            <Spacer h=".2rem" />
            <Caption>{meta.alt}</Caption>
          </>
        )}
      </div>
    </SandpackProvider>
  );
}
