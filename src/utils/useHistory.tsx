'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { getPathnameColor } from '@/utils/getPathnameColor';
import { getPathnameGroup } from '@/utils/getPathnameGroup';

type HistoryItem = {
  group: string;
  pathname: string;
};

export function UseHistory() {
  const pathname = usePathname();
  const group = useMemo(() => getPathnameGroup(pathname), [pathname]);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory((state) =>
      !state.find((h) => h.group === group)
        ? [...state, { group, pathname }]
        : state,
    );
  }, [pathname, group]);

  // HACK: manual scroll restoration to avoid scroll padding and smooth scrolling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname]);

  // HACK: to avoid hydration errors, we only render after the page has
  // been mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed hidden sm:flex flex-row flex-wrap gap-1 left-[5rem] bottom-[5rem] w-[5.4rem]">
      {history.map((item) => (
        <Link
          key={item.group}
          href={item.pathname}
          data-active={group === item.group}
          className={classnames(
            'flex w-[1.6rem] h-[1.6rem] relative bg-grey-medium hover:bg-(--history--item-color) focus:bg-(--history--item-color) data-[active="true"]:bg-(--history--item-color)',
          )}
          style={{
            ['--history--item-color' as any]: getPathnameColor(item.pathname),
          }}
        />
      ))}
    </nav>
  );
}
