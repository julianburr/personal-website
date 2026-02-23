import { getPathnameGroup } from '@/utils/getPathnameGroup';

const colors = {
  home: 'var(--color-beige)',
  'my-work': 'var(--color-red)',
  til: 'var(--color-blue-medium)',
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
