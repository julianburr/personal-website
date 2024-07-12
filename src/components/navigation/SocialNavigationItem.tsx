const colors = {
  twitter: "twitter-blue",
  medium: "medium-green",
  github: "github-grey",
  linkedin: "linkedin-blue",
};

type Props = {
  id: string;
  href: string;
  title?: string;
  Icon: any;
};

export function SocialNavigationItem({ id, href, title, Icon }: Props) {
  const color = colors[id as keyof typeof colors];
  return (
    <li>
      <a
        href={href}
        title={title}
        target="_blank"
        rel="noreferrer"
        className={`flex p-[.4rem] sm:p-[.1rem] transition-all group text-inherit hover:text-${color}`}
      >
        <Icon className="h-[2.4rem] sm:h-[1.6rem] w-auto transition-all group-hover:translate-y-[-.2rem]" />
      </a>
    </li>
  );
}
