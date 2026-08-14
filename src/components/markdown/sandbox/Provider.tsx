'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

type SandboxValue = {
  ownerId: string;
  template: string;
  files: Record<string, string>;
  meta: Record<string, any>;
};

type SandboxContextValue = {
  register: (args: {
    ownerId: string;
    sandboxId: string;
    template: string;
    files: Record<string, string>;
    meta?: Record<string, any>;
  }) => void;
  unregister: (args: { sandboxId: string; files: string[] }) => void;
  sandboxes: Record<string, SandboxValue>;
};

export const CodeSandboxContext = createContext<SandboxContextValue>({
  register: () => {},
  unregister: () => {},
  sandboxes: {},
});

export function CodeSandboxProvider({ children }: PropsWithChildren) {
  const [sandboxes, setSandboxes] = useState<Record<string, SandboxValue>>({});

  const register = useCallback<SandboxContextValue['register']>(
    ({ ownerId, sandboxId, template, files, meta = {} }) => {
      setSandboxes((prev) => {
        const prevSandbox = (prev[sandboxId] as any) || { files: {}, meta: {} };
        return {
          ...prev,
          [sandboxId]: {
            ownerId,
            template,
            ...prevSandbox,
            files: {
              ...prevSandbox.files,
              ...files,
            },
            meta: {
              ...prevSandbox.meta,
              ...meta,
            },
          },
        };
      });
    },
    [],
  );

  const unregister = useCallback<SandboxContextValue['unregister']>(
    ({ sandboxId, files }) => {
      setSandboxes((prev) => {
        for (const file of files) {
          delete prev[sandboxId]?.files?.[file];
        }
        return prev;
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      register,
      unregister,
      sandboxes,
    }),
    [register, unregister, sandboxes],
  );

  return (
    <CodeSandboxContext.Provider value={value}>
      {children}
    </CodeSandboxContext.Provider>
  );
}

export function useCodeSandbox() {
  return useContext(CodeSandboxContext);
}
