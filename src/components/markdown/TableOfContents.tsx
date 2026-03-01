'use client';

import { useLayoutEffect, useState } from 'react';

import { Tooltip } from '@/components/tooltip';

type Heading = {
  id: string;
  content: string;
  level: string;
};

type HeadingPosition = {
  id: string;
  top: number;
};

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'));
    const headings = headingElements
      .map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        return {
          id,
          content: heading.textContent,
          level: heading.tagName.toLowerCase(),
        };
      })
      .filter((heading) => heading.content !== 'Footnotes');

    setHeadings(headings);

    let lastHash: string | null = null;
    let lastHeadingsMap: HeadingPosition[] | null = null;
    const handleScroll = () => {
      const hash = `${window.document.body.scrollWidth}-${window.document.body.scrollHeight}`;

      const headingsMap =
        hash === lastHash
          ? lastHeadingsMap
          : headings.map((heading) => {
              const headingElement = document.getElementById(heading.id);
              const rect = headingElement?.getBoundingClientRect();
              return {
                id: heading.id,
                top: rect?.top || 0,
              };
            });

      const activeHeading = headingsMap?.toReversed().find((heading) => {
        const headingElement = document.getElementById(heading.id);
        const rect = headingElement?.getBoundingClientRect();
        return rect?.top && rect.top - 100 < 0;
      });
      setActiveHeadingId(activeHeading?.id || headings[0].id);
      lastHash = hash;
      lastHeadingsMap = headingsMap;
    };

    handleScroll();
    window.document.addEventListener('scroll', handleScroll);
    return () => window.document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="toc fixed top-[50%] translate-y-[-50%] right-[3rem] z-10 hidden min-[1240px]:flex flex-col items-end">
      {headings.map((heading) => (
        <Tooltip
          key={heading.id}
          content={
            <>
              <span>{heading.content}</span>
              <span
                aria-hidden="true"
                className="font-serif text-white opacity-[.4] ml-[.3rem]"
              >
                {heading.level === 'h2' ? '#' : '##'}
              </span>
            </>
          }
          placement="left"
        >
          <a
            role="menuitem"
            href={`#${heading.id}`}
            title={heading.content}
            data-level={heading.level}
            data-active={activeHeadingId === heading.id}
            className="flex py-[.25rem] before:content-[''] before:block before:h-px before:w-[1.6rem] data-[level='h3']:before:w-[.8rem] before:bg-black-subtle/30 data-[active='true']:before:bg-black-subtle hover:before:bg-black-subtle before:transition-all before:duration-200"
          />
        </Tooltip>
      ))}
    </nav>
  );
}
