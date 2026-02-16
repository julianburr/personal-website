import classNames from "classnames";

type Props = {
  id: string;
  href: string;
  title?: string;
  Icon: any;
};

export function SocialNavigationItem({ id, href, title, Icon }: Props) {
  return (
    <li
      className={classNames({
        "text-twitter-blue": id === "twitter",
        "text-medium-green": id === "medium",
        "text-notist-grey": id === "notist",
        "text-github-grey": id === "github",
        "text-linkedin-blue": id === "linkedin",
        "text-bluesky-blue": id === "bluesky",
        "text-substack-orange": id === "substack",
      })}
    >
      <a
        href={href}
        title={title}
        target="_blank"
        rel="noreferrer"
        className={`flex p-[.4rem] sm:p-[.1rem] group text-black hover:text-[currentColor]`}
      >
        <Icon className="h-[2.4rem] sm:h-[1.6rem] w-auto transition-all  group-hover:translate-y-[-.2rem]" />
      </a>
    </li>
  );
}
