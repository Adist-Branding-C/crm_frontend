import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Eye, Edit2, Phone, MessageSquare, Trash2 } from 'lucide-react';
import type { DealActionMenuProps, MenuPosition } from '../types';

const MENU_WIDTH = 200;
const MENU_HEIGHT = 260;
const GAP = 6;

const DealActionMenu = ({ isOpen, onToggle, onClose, row, onEdit, onDelete }: DealActionMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<MenuPosition | null>(null);

  const measure = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const spaceBelow = vh - r.bottom;
    const openUpward = spaceBelow < MENU_HEIGHT;

    let top: number;
    if (openUpward) {
      top = Math.max(GAP, r.top - MENU_HEIGHT - GAP);
    } else {
      top = r.bottom + GAP;
    }

    let left = r.right - MENU_WIDTH;
    if (left < GAP) left = GAP;
    if (left + MENU_WIDTH > vw - GAP) left = vw - MENU_WIDTH - GAP;

    setPos({ top, left, openUpward });
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      measure();
    } else {
      setPos(null);
    }
  }, [isOpen, measure]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    const close = () => onClose();

    document.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <button
        ref={buttonRef}
        className="action-btn"
        type="button"
        onClick={onToggle}
      >
        <MoreHorizontal size={16} />
      </button>
      {isOpen && pos && createPortal(
        <div
          ref={menuRef}
          className={`deal-action-dropdown${pos.openUpward ? ' upward' : ''}`}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: MENU_WIDTH,
            zIndex: 9999,
          }}
        >
          <button type="button">
            <Eye size={14} /> View Deal
          </button>
          <button type="button" onClick={() => { onEdit(row); onClose(); }}>
            <Edit2 size={14} /> Edit Deal
          </button>
          <button type="button">
            <Phone size={14} /> WhatsApp
          </button>
          <button type="button">
            <MessageSquare size={14} /> Message
          </button>
          <button type="button" className="delete" onClick={() => { onDelete(row.id); onClose(); }}>
            <Trash2 size={14} /> Delete
          </button>
        </div>,
        document.body
      )}
    </>
  );
};

export default DealActionMenu;
