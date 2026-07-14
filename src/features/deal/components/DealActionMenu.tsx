import { useRef } from 'react';
import { MoreHorizontal, Eye, Edit2, Phone, MessageSquare, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../../shared/components/ActionMenuPortal';
import type { DealActionMenuProps } from '../types';

const DealActionMenu = ({ isOpen, onToggle, onClose, row, onEdit, onDelete }: DealActionMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      <ActionMenuPortal isOpen={isOpen} triggerRef={buttonRef} onClose={onClose}>
        <div className="deal-action-dropdown">
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
        </div>
      </ActionMenuPortal>
    </>
  );
};

export default DealActionMenu;
