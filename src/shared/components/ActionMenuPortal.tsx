import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ActionMenuPortalProps } from '../types/actionMenu';

const ActionMenuPortal = ({ isOpen, triggerRef, onClose, children }: ActionMenuPortalProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [openUp, setOpenUp] = useState(false);

  const updatePosition = useCallback(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const DROPDOWN_HEIGHT = 160;
    const MENU_WIDTH = 220;
    const MARGIN = 8;
    const shouldOpenUp = spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow;
    setOpenUp(shouldOpenUp);

    let left: number | undefined;
    let right: number | undefined;

    if (rect.left < MENU_WIDTH) {
      left = rect.left;
    } else {
      right = window.innerWidth - rect.right;
    }

    setStyle({
      position: 'fixed',
      top: shouldOpenUp ? undefined : rect.bottom + MARGIN,
      bottom: shouldOpenUp ? window.innerHeight - rect.top + MARGIN : undefined,
      left,
      right,
      zIndex: 9999,
    });
  }, [isOpen, triggerRef]);

  useEffect(() => { updatePosition(); }, [updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) { onClose(); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  useEffect(() => { if (!isOpen) setStyle({}); }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div ref={menuRef} style={style} className={`action-dropdown-portal${openUp ? ' dropup' : ''}`}>
      {children}
    </div>,
    document.body
  );
};

export default ActionMenuPortal;
