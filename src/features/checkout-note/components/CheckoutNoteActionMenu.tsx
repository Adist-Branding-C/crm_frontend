import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { CheckoutNoteItem } from '../types/checkoutNote.types';

interface CheckoutNoteActionMenuProps {
  item: CheckoutNoteItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CheckoutNoteItem) => void;
  onDelete: (item: CheckoutNoteItem) => void;
}

const CheckoutNoteActionMenu = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CheckoutNoteActionMenuProps) => {
  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}>
        <MoreHorizontal size={16} />
      </button>
      {dropdownOpen === item.id && (
        <div className="dropdown-menu">
          <a className="dropdown-item" onClick={() => onEdit(item)}><Edit2 size={14} /> Edit</a>
          <a className="dropdown-item" onClick={() => onDelete(item)}><Trash2 size={14} /> Delete</a>
        </div>
      )}
    </div>
  );
};

export default CheckoutNoteActionMenu;
