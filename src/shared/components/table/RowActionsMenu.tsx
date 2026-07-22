import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { ACTION_EDIT, ACTION_DELETE } from '../../constants/actionLabels';

interface RowActionsMenuProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const DROPDOWN_HEIGHT = 200;

const RowActionsMenu = ({ isOpen, onToggle, onEdit, onDelete }: RowActionsMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ top: number | undefined; bottom: number | undefined; right: number; openUp: boolean } | null>(null);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) {
      setStyle(null);
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUp = spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow;
    setStyle({
      top: openUp ? undefined : rect.bottom + 8,
      bottom: openUp ? window.innerHeight - rect.top + 8 : undefined,
      right: window.innerWidth - rect.right,
      openUp,
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (portalRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      onToggle(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="action-menu-container">
      <button
        ref={buttonRef}
        className={`action-btn ${isOpen ? 'active' : ''}`}
        onClick={() => onToggle(!isOpen)}
      >
        <MoreHorizontal size={16} />
      </button>
      {isOpen && style && createPortal(
        <div
          ref={portalRef}
          className={`premium-dropdown action-dropdown-portal ${style.openUp ? 'dropup' : ''}`}
          style={{ position: 'fixed', top: style.top, bottom: style.bottom, right: style.right }}
        >
          <button className="dropdown-item" onClick={() => { onEdit(); onToggle(false); }}>
            <Edit2 size={14} /> {ACTION_EDIT}
          </button>
          <button className="dropdown-item danger" onClick={() => { onDelete(); onToggle(false); }}>
            <Trash2 size={14} /> {ACTION_DELETE}
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default RowActionsMenu;
