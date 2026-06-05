import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { BranchItem } from '../types/branch.types';

interface BranchActionMenuProps {
  item: BranchItem
  dropdownOpen: number | null
  onToggleDropdown: (value: number | null) => void
  onEdit: (item: BranchItem) => void
  onDelete: (item: BranchItem) => void
}

const BranchActionMenu = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: BranchActionMenuProps) => {
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

export default BranchActionMenu;
