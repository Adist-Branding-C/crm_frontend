import React from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { DealTypeActionMenuProps } from '../types/deal-type-action-menu.types';

const DealTypeActionMenu: React.FC<DealTypeActionMenuProps> = ({
  item, dropdownOpen, onToggle, onEdit, onDelete,
}) => {
  const isOpen = dropdownOpen === item.id;

  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={() => onToggle(isOpen ? null : item.id)}>
        <MoreHorizontal size={16} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a className="dropdown-item" onClick={() => { onEdit(item); onToggle(null); }}>
            <Edit2 size={14} /> Edit
          </a>
          <a className="dropdown-item" onClick={() => { onDelete(item); onToggle(null); }}>
            <Trash2 size={14} /> Delete
          </a>
        </div>
      )}
    </div>
  );
};

export default DealTypeActionMenu;
