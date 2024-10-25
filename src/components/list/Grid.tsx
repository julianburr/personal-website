import classNames from "classnames";

import type { HTMLProps } from "react";

export function Grid(props: HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      role="list"
      className={classNames(
        props.className,
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
      )}
    />
  );
}
