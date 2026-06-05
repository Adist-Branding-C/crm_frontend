import { MoreHorizontal } from 'lucide-react';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import type { ActionMenuProps } from './types';

const ActionMenu = ({ isOpen, buttonRect, onToggle, onClose, children }: ActionMenuProps) => (
  <div className="action-menu-container">
    <button className="action-btn" onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (isOpen) {
        onToggle(null);
      } else {
        onToggle(rect);
      }
    }}>
      <MoreHorizontal size={16} />
    </button>
    {isOpen && buttonRect && (
      <ActionDropdownPortal isOpen={isOpen} buttonRect={buttonRect} onClose={onClose}>
        {children}
      </ActionDropdownPortal>
    )}
  </div>
);

export default ActionMenu;
