import Link from "next/link";
import { ComponentProps } from "react";

type Props = {
  href: ComponentProps<typeof Link>["href"];
  onClick?: ComponentProps<typeof Link>["onClick"];
  children: ComponentProps<typeof Link>["children"];
};

export function NavigationItem({ href, onClick, children }: Props) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex py-[.1rem] text-inherit"
      >
        {children}
      </Link>
    </li>
  );
}
