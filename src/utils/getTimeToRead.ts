export function getTimeToRead(content?: string) {
  const wpm = 225;
  const words = content?.split(/\s+/).length || 0;
  const time = Math.ceil(words / wpm);
  return time;
}
