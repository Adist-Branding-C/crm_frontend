import { useState, useCallback } from 'react';
import type { UseDealActionMenuReturn } from '../types/hook.types';

export function useDealActionMenu(): UseDealActionMenuReturn {
  const [openId, setOpenId] = useState<number | null>(null);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

  const open = useCallback((id: number, rect: DOMRect) => {
    setOpenId(id);
    setButtonRect(rect);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    setButtonRect(null);
  }, []);

  return { openId, buttonRect, open, close };
}
