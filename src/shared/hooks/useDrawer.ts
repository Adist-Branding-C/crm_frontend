import { useState, useCallback } from 'react';

export function useDrawer<T = void>() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<T | null>(null);

  const open = useCallback((value?: T) => {
    if (value !== undefined) setItem(value);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setItem(null);
  }, []);

  return { isOpen, item, open, close };
}
