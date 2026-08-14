import LogoBluesky from '@/assets/social/bluesky.svg';
import LogoGithub from '@/assets/social/github.svg';
import LogoLinkedIn from '@/assets/social/linkedin.svg';
import LogoNotist from '@/assets/social/notist.svg';

const items = [
  {
    id: 'home',
    label: 'Hi.',
    href: '/',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
  },
  {
    id: 'til',
    label: 'TIL',
    href: '/til',
  },
  {
    id: 'talks',
    label: 'Public speaking',
    href: '/talks',
  },
  {
    id: 'library',
    label: 'Library',
    href: '/library',
  },
  {
    id: 'around-the-world',
    label: 'Around the world',
    href: '/around-the-world',
  },
  {
    id: 'get-in-touch',
    label: 'Get in touch',
    href: '/get-in-touch',
  },
];

const socials = [
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/julianburr/',
    title: '@julianburr on LinkedIn',
    Icon: LogoLinkedIn,
  },
  {
    id: 'notist',
    href: 'https://noti.st/jburr90',
    title: '@jburr90 on Notist',
    Icon: LogoNotist,
  },
  {
    id: 'bluesky',
    href: 'https://bsky.app/profile/julianburr.de',
    title: '@julianburr.de on Bluesky',
    Icon: LogoBluesky,
  },
  {
    id: 'github',
    href: 'https://github.com/julianburr',
    title: '@julianburr on Github',
    Icon: LogoGithub,
  },
];

export { items, socials };
