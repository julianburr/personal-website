import classNames from "classnames";

import type { HTMLProps } from "react";

type Props = Omit<HTMLProps<HTMLDivElement>, "size"> & {
  size?: "small" | "default";
};

export function Grid({ size = "default", ...props }: Props) {
  return (
    <div
      {...props}
      role="list"
      className={classNames(
        "grid grid-cols-1 sm:grid-cols-2 gap-2",
        {
          "md:grid-cols-4": size === "small",
          "md:grid-cols-3": size === "default",
        },
        props.className
      )}
    />
  );
}
