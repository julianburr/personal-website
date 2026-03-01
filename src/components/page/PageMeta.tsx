import Link from 'next/link';
import { Fragment } from 'react';

interface Props {
  breadcrumbs: { title: string; href: string }[];
  meta: string[];
}

export function PageMeta({ breadcrumbs, meta }: Props) {
  return (
    <span className="p-0 mb-[.4rem] text-[.9rem] font-sub-heading leading-[.9rem]">
      <nav className="font-heading m-0 p-0 inline text-[1rem] mr-1 mt-[.2rem]">
        {breadcrumbs.map((breadcrumb) => (
          <Link
            role="menuitem leading-[.6rem]"
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
