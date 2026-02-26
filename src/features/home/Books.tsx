import Link from 'next/link';

export function Books() {
  return (
    <Link
      href="/library"
      className="books highlight-object absolute top-[72%] left-[65%] h-[12vh] w-[20vh]"
    />
  );
}
