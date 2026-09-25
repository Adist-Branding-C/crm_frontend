import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

const VIEWPORT_MARGIN = 8;
const ANCHOR_GAP = 8;

export interface TooltipPosition {
  top: number;
  left: number;
}

export function useTruncatedTooltip<T extends HTMLElement>(text: string) {
  const anchorRef = useRef<T>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const [isTruncated, setIsTruncated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const measure = () => setIsTruncated(anchor.scrollWidth - anchor.clientWidth > 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [text]);

  const close = useCallback(() => {
    setIsOpen(false);
    setPosition(null);
  }, []);

  const open = useCallback(() => {
    if (isTruncated) setIsOpen(true);
  }, [isTruncated]);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const tooltip = tooltipRef.current;
    if (!isOpen || !anchor || !tooltip) return;
    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const above = anchorRect.top - tooltipRect.height - ANCHOR_GAP;
    const top = above >= VIEWPORT_MARGIN ? above : anchorRect.bottom + ANCHOR_GAP;
    const maxLeft = window.innerWidth - tooltipRect.width - VIEWPORT_MARGIN;
    const left = Math.max(VIEWPORT_MARGIN, Math.min(anchorRect.left, maxLeft));
    setPosition({ top, left });
  }, [isOpen, text]);

  useEffect(() => {
    if (isOpen && !isTruncated) close();
  }, [isOpen, isTruncated, close]);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!anchorRef.current?.contains(event.target as Node)) close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [isOpen, close]);

  return { anchorRef, tooltipRef, tooltipId, isTruncated, isOpen, position, open, close };
}
