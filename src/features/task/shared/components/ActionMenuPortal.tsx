import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ActionMenuPortalProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  children: React.ReactNode;
}

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
    const shouldOpenUp = spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow;
    setOpenUp(shouldOpenUp);
    setStyle({
      position: 'fixed',
      top: shouldOpenUp ? undefined : rect.bottom + 4,
      bottom: shouldOpenUp ? window.innerHeight - rect.top + 4 : undefined,
      right: window.innerWidth - rect.right,
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
