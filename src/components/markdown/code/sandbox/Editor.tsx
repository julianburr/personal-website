import { SandpackCodeEditor } from '@codesandbox/sandpack-react';

export function CodeSandboxEditor() {
  return (
    <div className="absolute z-1 bg-grey-light inset-0">
      <SandpackCodeEditor />
    </div>
  );
}
