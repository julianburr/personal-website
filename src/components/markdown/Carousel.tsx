import { Caption } from '@/components/markdown/code/Caption';

type Props = {
  node: any;
};

export function Carousel({ node }: Props) {
  return (
    <div className="flex flex-col py-[2.8rem]">
      <div className="bg-grey-light flex-col">
        <div className="w-full p-[1.2rem] flex flex-row flex-nowrap gap-[.6rem] items-center overflow-x-auto">
          {node?.children
            ?.filter((child: any) => child.tagName === 'img')
            .map((child: any, index: number) => (
              <a
                key={`${index}--${child.properties.src}`}
                href={child.properties.src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0"
              >
                <img
                  src={child.properties.src}
                  alt={child.properties.alt}
                  className="w-auto h-[13.6rem]"
                />
              </a>
            ))}
        </div>

        {node?.properties?.alt && (
          <div className="p-[.8rem] pt-0 -mt-[.6rem]">
            <Caption>{node?.properties?.alt}</Caption>
          </div>
        )}
      </div>
    </div>
  );
}
