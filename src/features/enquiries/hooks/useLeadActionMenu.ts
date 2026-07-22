import { useState, useCallback } from 'react';
import type { UseLeadActionMenuReturn } from '../types/hook.types';

export function useLeadActionMenu(): UseLeadActionMenuReturn {
  const [openId, setOpenId] = useState<string | null>(null);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

  const open = useCallback((id: string, rect: DOMRect) => {
    setOpenId(id);
    setButtonRect(rect);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    setButtonRect(null);
  }, []);

  return { openId, buttonRect, open, close };
}
