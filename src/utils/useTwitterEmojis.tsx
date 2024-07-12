"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import twemoji from "twemoji";

export function useTwitterEmojis() {
  const pathname = usePathname();

  // Parse page body with twemoji to get nicer looking flat emoji SVGs
  useEffect(() => {
    if (typeof window !== "undefined") {
      twemoji.parse(window.document.body, {
        ext: ".svg",
        size: "svg",
      });
    }
  }, [pathname]);
}

export function UseTwitterEmojis() {
  useTwitterEmojis();
  return null;
}