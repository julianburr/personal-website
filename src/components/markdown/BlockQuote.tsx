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
        <div className="twitter-embed--content bg-grey-light p-[1.2rem] whitespace-pre-line">
          {content}
        </div>
        <p className="twitter-embed--author my-[.3rem] mb-0 text-[.8em] w-full font-serif text-black-subtle text-center whitespace-normal">
          {author}
        </p>
      </blockquote>
    );
  }

  return (
    <blockquote className="relative my-[2.4rem] mx-auto w-[calc(100%-2rem)] max-w-[30rem] bg-grey-light p-[1.6rem] text-[1.2rem] leading-[1.3] font-sub-heading text-black-subtle text-center before:content-['“'] before:font-sub-heading before:absolute before:left-[.6rem] before:top-[.4rem] before:text-left before:text-[4rem] before:leading-none before:text-black-subtle before:opacity-[.1]">
      {children}
    </blockquote>
  );
}
