'use client';

import { useEffect, useRef, useState } from 'react';

import { usePersistedState } from '@/utils/usePersistedState';

import type {
  PropsWithChildren,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from 'react';

export function ScrollContainer({ children }: PropsWithChildren) {
  const [isDragging, setIsDragging] = useState(false);

  const wasDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dragTimer = useRef<NodeJS.Timeout | null>(null);

  const validateDrag = (dragX: number) => {
    const container = containerRef.current;
    if (!container) {
      return 0;
    }

    const maxPx =
      (container.clientWidth - window.innerWidth) / 2 + window.innerWidth / 4;
    const maxVw = (maxPx / window.innerWidth) * 100;

    const vw = ((dragX / window.innerWidth) * 100) / 3;
    const fixed = Math.min(maxVw, Math.max(-maxVw, vw));

    return fixed;
  };

  const handleMouseDown = (e: ReactMouseEvent | ReactTouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    wasDraggingRef.current = false;
    clearTimeout(dragTimer.current!);

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const startX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    let deltaX = 0;

    dragTimer.current = setTimeout(() => {
      setIsDragging(true);

      const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();

        wasDraggingRef.current = true;

        const dataX = parseInt(container.dataset.scrollX || '0');
        const currentX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
        deltaX = dataX + currentX - startX;

        container.style.transform = `translateX(${validateDrag(deltaX)}vw)`;
      };

      const handleMouseUp = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();

        container.dataset.scrollX = deltaX.toString();
        setInitialX(deltaX);
        window.document.body.removeEventListener('mousemove', handleMouseMove);
        window.document.body.removeEventListener('mouseup', handleMouseUp);
        window.document.body.removeEventListener('mouseleave', handleMouseUp);
        window.document.body.removeEventListener('touchmove', handleMouseMove);
        window.document.body.removeEventListener('touchend', handleMouseUp);

        setIsDragging(false);
        clearTimeout(dragTimer.current!);
      };

      window.document.body.addEventListener('mousemove', handleMouseMove);
      window.document.body.addEventListener('mouseup', handleMouseUp);
      window.document.body.addEventListener('mouseleave', handleMouseUp);
      window.document.body.addEventListener('touchmove', handleMouseMove);
      window.document.body.addEventListener('touchend', handleMouseUp);
    }, 100);
  };

  const handleClick = (e: ReactMouseEvent) => {
    if (wasDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }

    wasDraggingRef.current = false;
    clearTimeout(dragTimer.current!);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleResize = () => {
      const currentX = parseInt(container.dataset.scrollX || '0');
      const fixed = validateDrag(currentX);
      container.style.transform = `translateX(${fixed}vw)`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [_initialX, setInitialX] = usePersistedState('home/scroll', 0);
  const initialX = useRef(_initialX);

  return (
    <div
      ref={containerRef}
      data-dragging={isDragging}
      data-scroll-x={initialX.current}
      className='scroll-container w-[164vh] left-[calc(50%-82vh)] bottom-[12vh] shrink-0 relative data-[dragging="true"]:cursor-grabbing'
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onClickCapture={handleClick}
    >
      {children}
    </div>
  );
}
