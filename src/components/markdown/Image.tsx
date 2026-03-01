import { Caption } from '@/components/markdown/code/Caption';

type Props = {
  src: string;
  alt?: string;
};

export function Image({ src, alt }: Props) {
  return (
    <figure className="my-[1.6rem] max-w-[min(90%,36rem)] mx-auto">
      <img src={src} alt={alt} className="w-full h-auto" />
      {alt && <Caption>{alt}</Caption>}
    </figure>
  );
}
