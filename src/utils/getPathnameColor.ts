import { COLORS } from "@/styles/theme";
import { getPathnameGroup } from "@/utils/getPathnameGroup";

const colors = {
  home: COLORS.beige,
  "my-work": COLORS.red,
  til: COLORS["blue-medium"],
  library: COLORS.green,
  "around-the-world": COLORS.teal,
  "get-in-touch": COLORS.purple,
  "black-lives-matter": COLORS.black,

  __fallback: COLORS.beige,
};

export function getPathnameColor(pathname: string) {
  const group = getPathnameGroup(pathname);
  return colors[group as keyof typeof colors] || colors.__fallback;
}
