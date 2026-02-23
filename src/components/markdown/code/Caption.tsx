import { CoreMarkdown } from '@/components/markdown';

export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="text-[.8em] w-[calc(100%-2rem)] mx-auto font-serif text-black-subtle text-center whitespace-normal mb-2">
      <CoreMarkdown content={String(children)} />
    </figcaption>
  );
}
