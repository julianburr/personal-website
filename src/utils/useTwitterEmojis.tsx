'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';
import twemoji from 'twemoji';

export function useTwitterEmojis() {
  const pathname = usePathname();

  // Parse page body with twemoji to get nicer looking flat emoji SVGs
  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    twemoji.parse(window.document.body, {
      ext: '.svg',
      size: 'svg',
      base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
    });
  }, [pathname]);
}

export function UseTwitterEmojis() {
  useTwitterEmojis();
  return null;
}
