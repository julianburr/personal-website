'use client';

import { useEffect, useState, type PropsWithChildren } from 'react';

export function ClientOnly({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
