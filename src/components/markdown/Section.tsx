import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, ...props }: Props) {
  if (props.className === 'footnotes') {
    return (
      <aside {...props} className="footnotes">
        {children}
      </aside>
    );
  }

  return <section {...props}>{children}</section>;
}
