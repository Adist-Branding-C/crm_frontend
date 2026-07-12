import { useEffect, useRef } from 'react';
import { scrollToFirstError } from '../utils/scrollToError.util';

interface ScrollToFirstErrorProps {
  errors: Record<string, unknown>;
  submitCount: number;
  containerRef?: React.RefObject<HTMLElement | null> | undefined;
}

/**
 * Scrolls to the first `.input-error` element inside `containerRef` when a Formik
 * submit attempt produces validation errors. Rendered as a null child inside the
 * Formik render prop so the side-effect runs in the commit phase via useEffect,
 * not during render.
 */
export function ScrollToFirstError({ errors, submitCount, containerRef }: ScrollToFirstErrorProps) {
  const prevSubmitCountRef = useRef(0);

  useEffect(() => {
    if (submitCount > prevSubmitCountRef.current) {
      prevSubmitCountRef.current = submitCount;
      if (Object.keys(errors).length > 0) {
        requestAnimationFrame(() => scrollToFirstError(containerRef?.current ?? null));
      }
    }
  }, [submitCount, errors, containerRef]);

  return null;
}
