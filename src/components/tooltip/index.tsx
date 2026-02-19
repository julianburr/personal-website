'use client';

import { computePosition, flip, offset } from '@floating-ui/dom';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { Placement } from '@floating-ui/dom';
import type { HTMLProps, ReactNode } from 'react';

type Props = Omit<HTMLProps<HTMLDivElement>, 'content'> & {
  content: ReactNode;
  placement?: Placement;
  offset?: number;
};

export function Tooltip({
  content,
  placement = 'top',
  offset: offsetProp = 8,
  ...props
}: Props) {
  const id = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [portalTarget, setPortalTarget] = useState<Element | undefined>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalTarget(window.document.body);
    }
  }, []);

  useEffect(() => {
    const handleMouseOver = () => {
      const triggerElement = containerRef?.current?.firstElementChild;
      const tooltipElement = tooltipRef?.current;

      if (triggerElement && tooltipElement) {
        tooltipElement.showPopover();
        computePosition(triggerElement, tooltipElement, {
          placement,
          middleware: [flip(), offset(offsetProp)],
        }).then(({ x, y }) => {
          tooltipElement.style.left = `${x}px`;
          tooltipElement.style.top = `${y}px`;
        });
      }
    };

    const handleMouseLeave = () => {
      tooltipRef?.current?.hidePopover();
    };

    const triggerElement = containerRef?.current?.firstElementChild;
    const tooltipElement = tooltipRef?.current;
    if (triggerElement && tooltipElement) {
      triggerElement.addEventListener('mouseenter', handleMouseOver);
      triggerElement.addEventListener('mouseleave', handleMouseLeave);
      triggerElement.addEventListener('focus', handleMouseOver);
      triggerElement.addEventListener('blur', handleMouseLeave);
      return () => {
        triggerElement.removeEventListener('mouseenter', handleMouseOver);
        triggerElement.removeEventListener('mouseleave', handleMouseLeave);
        triggerElement.removeEventListener('focus', handleMouseOver);
        triggerElement.removeEventListener('blur', handleMouseLeave);
      };
    }
  }, [id, offsetProp, placement, portalTarget]);

  return (
    <>
      <div
        {...props}
        className="contents"
        ref={containerRef}
        popoverTarget={`popover-${id}`}
      />
      {portalTarget &&
        createPortal(
          <div
            role="tooltip"
            popover="auto"
            id={`popover-${id}`}
            className="absolute top-0 left-0 m-0"
            ref={tooltipRef}
          >
            {content}
          </div>,
          portalTarget,
        )}
    </>
  );
}
