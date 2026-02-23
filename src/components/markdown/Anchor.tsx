import classNames from 'classnames';

export function Anchor(props: any) {
  const isFootnote = !props.href && props.children?.[1]?.type === 'sup';
  const isBacklink = props['data-footnote-backref'] !== undefined;

  if (isBacklink) {
    return (
      <a
        {...props}
        className={classNames(
          props.className,
          'text-black-subtle/40 hover:text-black-subtle text-[.8em] mt-[.15em] mx-[.2rem] no-underline font-serif font-light',
        )}
      >
        ↩︎
      </a>
    );
  }

  if (isFootnote) {
    const href = props.children?.[1]?.props?.children?.props?.href;
    const nmb = parseInt(props.children?.[1]?.props?.children?.props?.children);
    return (
      <>
        <a
          {...props}
          href={href}
          id={`user-content-fnref-${nmb}`}
          className="group"
        >
          {props.children[0]}
        </a>
        <span className="relative pr-[.6em]">
          <sup className="absolute top-[.5em] left-[.15em] text-black-subtle no-underline group-hover:text-(--page-color) font-handwriting text-[.8em]">
            {nmb}
          </sup>
        </span>

        <style>
          {`
            #user-content-fnref-${nmb} {
              anchor-name: --content-fn-ref-${nmb};
            }

            #user-content-fn-${nmb} {
              position-anchor: --content-fn-ref-${nmb};
              anchor-name: --content-fn-${nmb};
              top: ${
                nmb > 1
                  ? `max(anchor(top), calc(anchor(--content-fn-${nmb - 1} bottom) + var(--gap)))`
                  : 'anchor(top)'
              };
            }

            #user-content-fn-${nmb}:hover,
            :has(#user-content-fnref-${nmb}:hover) #user-content-fn-${nmb} {
              opacity: 1;
            }

            :has(#user-content-fn-${nmb}:hover) #user-content-fnref-${nmb} {
              text-decoration-color: var(--color-black);
            }
          `}
        </style>
      </>
    );
  }

  return <a {...props} />;
}
