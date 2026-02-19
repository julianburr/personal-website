export function getPathnameGroup(pathname: string) {
  if (pathname === '/') {
    return 'home';
  }

  if (pathname.includes('/black-lives-matter')) {
    return 'black-lives-matter';
  }

  return pathname.split('/').filter(Boolean)[0];
}
