import { getPathnameGroup } from '@/utils/getPathnameGroup';

const colors = {
  home: 'var(--color-beige)',
  talks: 'var(--color-red)',
  blog: 'var(--color-blue-medium)',
  til: 'var(--color-blue-light)',
  library: 'var(--color-green)',
  'around-the-world': 'var(--color-teal)',
  'get-in-touch': 'var(--color-purple)',
  'black-lives-matter': 'var(--color-black)',

  __fallback: 'var(--color-beige)',
};

export function getPathnameColor(pathname: string) {
  const group = getPathnameGroup(pathname);
  return colors[group as keyof typeof colors] || colors.__fallback;
}
