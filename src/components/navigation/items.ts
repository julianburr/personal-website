import LogoGithub from "@/assets/social/github.svg";
import LogoLinkedIn from "@/assets/social/linkedin.svg";
import LogoMedium from "@/assets/social/medium.svg";
import LogoTwitter from "@/assets/social/twitter.svg";

const items = [
  {
    id: "home",
    label: "Hi.",
    href: "/",
  },
  {
    id: "my-work",
    label: "My work",
    href: "/my-work",
  },
  {
    id: "til",
    label: "TIL",
    href: "/til",
  },
  {
    id: "library",
    label: "Library",
    href: "/library",
  },
  {
    id: "around-the-world",
    label: "Around the world",
    href: "/around-the-world",
  },
  {
    id: "get-in-touch",
    label: "Get in touch",
    href: "/get-in-touch",
  },
];

const socials = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/julianburr/",
    title: "@julianburr on LinkedIn",
    Icon: LogoLinkedIn,
  },
  {
    id: "medium",
    href: "https://medium.com/@julianburr",
    title: "@julianburr on Medium",
    Icon: LogoMedium,
  },
  {
    id: "twitter",
    href: "https://mobile.twitter.com/jburr90",
    title: "@jburr90 on Twitter",
    Icon: LogoTwitter,
  },
  {
    id: "github",
    href: "https://github.com/julianburr",
    title: "@julianburr on Github",
    Icon: LogoGithub,
  },
];

export { items, socials };
