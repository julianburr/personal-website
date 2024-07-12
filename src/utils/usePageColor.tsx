"use client";

import { usePathname } from "next/navigation";
import { HTMLAttributes, useLayoutEffect, useMemo } from "react";

import { getPathnameColor } from "@/utils/getPathnameColor";

export function BodyWithColor(props: HTMLAttributes<HTMLBodyElement>) {
  const pathname = usePathname();

  const color = useMemo(() => getPathnameColor(pathname), [pathname]);
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.document.body.style.setProperty("--page--color", color);
    }
  }, [color]);

  return <body style={{ "--page--color": color } as any} {...props} />;
}