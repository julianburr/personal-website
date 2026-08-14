'use client';

import { SandpackProvider, type Sandpack } from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';
import { useEffect, useId, useState } from 'react';

import { Caption } from '@/components/markdown/code/Caption';
import { Spacer } from '@/components/spacer';

import { CodeSandboxEditor } from './Editor';
import { CodeSandboxPreview } from './Preview';
import { useCodeSandbox } from './Provider';

import type { ComponentProps } from 'react';

type Sandbox = {
  [id: string]: {
    meta: {
      sandboxId?: string;
      sandboxTemplate?: string;
      sandboxDependencies?: Record<string, string>;
      alt?: string;
    };
    files: {
      [filename: string]: string;
    };
    language?: string;
  };
};

const configs: Sandbox = {};

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
  node: any;
};

export function CodeSandbox({ node }: Props) {
  const config = configs[node.properties?.id as keyof typeof configs];
  if (!config) {
    throw new Error(`Sandbox config not found for id: ${node.properties?.id}`);
  }

  const ownerId = useId();
  const sandboxId = config?.meta?.sandboxId as string;

  const { register, unregister, sandboxes } = useCodeSandbox();
  const sandbox = sandboxes[sandboxId];

  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    register({
      ownerId,
      sandboxId,
      template: config?.meta?.sandboxTemplate as string,
      meta: config?.meta,
      files: config?.files,
    });

    return () => {
      unregister({
        sandboxId,
        files: Object.keys(config?.files),
      });
    };
  }, [ownerId, sandboxId, config]);

  if (!sandbox) {
    return null;
  }

  return (
    <SandpackProvider
      theme={customTheme}
      files={sandbox.files}
      template={sandbox.template as any}
      customSetup={{ dependencies: config?.meta?.sandboxDependencies }}
    >
      <div className="w-full my-[2.4rem]">
        <div className="sandbox w-full h-[30rem] relative overflow-hidden">
          <CodeSandboxEditor />
          <CodeSandboxPreview show={showPreview} setShow={setShowPreview} />
        </div>
        {config?.meta?.alt && (
          <>
            <Spacer h=".2rem" />
            <Caption>{config?.meta?.alt}</Caption>
          </>
        )}
      </div>
    </SandpackProvider>
  );
}
