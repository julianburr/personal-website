import Link from 'next/link';
import { Fragment } from 'react';

interface Props {
  breadcrumbs: { title: string; href: string }[];
  meta: string[];
}

export function PageMeta({ breadcrumbs, meta }: Props) {
  return (
    <span className="flex flex-row items-center text-[.9rem] font-sub-heading p-0 leading-[1.2] mb-[.5rem]">
      <nav className="font-heading text-[1rem] flex flex-row items-center mr-1 mt-[.2rem]">
        {breadcrumbs.map((breadcrumb) => (
          <Link
            role="menuitem"
            key={breadcrumb.href}
            href={breadcrumb.href}
            className="text-[.9em]"
          >
            {breadcrumb.title}
          </Link>
        ))}
      </nav>

      {meta.map((item) => (
        <Fragment key={item}>
          <span className="mx-[.2rem]">—</span>
          <span key={item}>{item}</span>
        </Fragment>
      ))}
    </span>
  );
}
