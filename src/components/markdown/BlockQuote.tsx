import { Children, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  node?: any;
};

export function BlockQuote({ children, node, ...props }: Props) {
  if (props.className) {
    const [content, ...author] = Children.toArray(children);
    return (
      <blockquote
        {...props}
        className="mx-auto my-[2.4rem] w-[calc(100%-2rem)] max-w-[26rem]"
      >
        <div className="twitter-embed--content bg-grey-light p-[1.2rem]">
          {content}
        </div>
        <p className="twitter-embed--author my-[.3rem] mb-0 text-[.8em] w-full font-serif text-black-subtle text-center whitespace-normal">
          {author}
        </p>
      </blockquote>
    );
  }

  return (
    <blockquote className="my-[2.4rem] text-[1.2rem] font-sub-heading text-black-subtle text-center w-[calc(100%-2rem)] max-w-xl mx-auto">
      {children}
    </blockquote>
  );
}
