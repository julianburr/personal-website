import path from "node:path";

import { glob } from "glob";

import { getPageFromPath } from "@/utils/getPageFromPath";

const contentRoot = path.resolve(process.cwd(), "./src/content");

export async function getPagesFromPath(dirPath: string) {
  const filePaths = await glob(`${dirPath}/**/*.md`, {
    cwd: contentRoot,
    ignore: "**/DRAFT_*.md",
  });
  return Promise.all(filePaths.map((filePath) => getPageFromPath(filePath)));
}