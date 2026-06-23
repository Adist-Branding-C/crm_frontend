import { MoreHorizontal, Eye, Edit2, Trash2, User } from 'lucide-react';
import { ACTION_VIEW, ACTION_EDIT, ACTION_DELETE } from '../../../shared/constants/actionLabels';
import type { CampaignActionMenuProps } from '../types/campaign-action-menu.types';

const CampaignActionMenu = ({ campaign, isOpen, onToggle, onDelete, onEdit }: CampaignActionMenuProps) => {
  return (
    <div className="action-menu-container">
      <button className="action-btn" onClick={() => onToggle(isOpen ? null : campaign.id)}>
        <MoreHorizontal size={16} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item"><Eye size={14} />{ACTION_VIEW}</button>
          <button className="dropdown-item" onClick={() => onEdit(campaign)}><Edit2 size={14} />{ACTION_EDIT}</button>
          <button className="dropdown-item"><User size={14} />Assign</button>
          <button className="dropdown-item dropdown-item-danger" onClick={() => onDelete(campaign.id)}><Trash2 size={14} />{ACTION_DELETE}</button>
        </div>
      )}
    </div>
  );
};

export default CampaignActionMenu;
