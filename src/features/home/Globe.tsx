import Link from 'next/link';

export function Globe() {
  return (
    <Link
      href="/around-the-world"
      className="globe highlight-object absolute top-[44.3%] left-[38.3%] h-[15vh] w-[15vh] rounded-full"
    />
  );
}
