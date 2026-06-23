import React from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { DealAdditionalFieldActionMenuProps } from '../types/deal-additional-field-action-menu.types';

const DROPDOWN_HEIGHT = 100;

const DealAdditionalFieldActionMenu: React.FC<DealAdditionalFieldActionMenuProps> = ({
  item, dropdownOpen, onToggle, dropdownDirection, onDirectionChange, onEdit, onDelete,
}) => {
  const key = `add_${item.id}`;
  const isOpen = dropdownOpen === key;

  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={(e) => {
        if (isOpen) {
          onToggle(null);
        } else {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const spaceBelow = window.innerHeight - rect.bottom;
          onDirectionChange(spaceBelow < DROPDOWN_HEIGHT ? 'up' : 'down');
          onToggle(key);
        }
      }}>
        <MoreHorizontal size={16} />
      </button>
      {isOpen && (
        <div className={`dropdown-menu ${dropdownDirection === 'up' ? 'dropup' : ''}`}>
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

export default DealAdditionalFieldActionMenu;
