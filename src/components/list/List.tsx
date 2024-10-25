import classNames from "classnames";

import type { HTMLProps } from "react";

export function List(props: HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      role="list"
      className={classNames(props.className, "flex flex-col gap-1")}
    />
  );
}
