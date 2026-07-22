import { useRef } from 'react';
import { MoreHorizontal, Eye, Edit2, Trash2, User } from 'lucide-react';
import ActionMenuPortal from '../../task-settings/components/ActionMenuPortal';
import { ACTION_VIEW, ACTION_EDIT, ACTION_DELETE } from '../../../shared/constants/actionLabels';
import type { CampaignActionsProps } from '../types';

const CampaignActions = ({ campaign, dropdownOpen, onToggleDropdown, onView, onEdit, onAssign, onDelete }: CampaignActionsProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="dropdown-container">
      <button ref={buttonRef} className="dropdown-toggle" onClick={() => onToggleDropdown(dropdownOpen === campaign.id ? null : campaign.id)}>
        <MoreHorizontal size={16} />
      </button>
      <ActionMenuPortal
        isOpen={dropdownOpen === campaign.id}
        triggerRef={buttonRef}
        onClose={() => onToggleDropdown(null)}
      >
        <button onClick={() => { onToggleDropdown(null); onView(campaign); }}><Eye size={14} />{ACTION_VIEW}</button>
        <button onClick={() => { onToggleDropdown(null); onEdit(campaign); }}><Edit2 size={14} />{ACTION_EDIT}</button>
        {/* <button onClick={() => { onToggleDropdown(null); onAssign(campaign); }}><User size={14} />Assign</button> */}
        <button className="delete" onClick={() => { onToggleDropdown(null); onDelete(campaign); }}><Trash2 size={14} />{ACTION_DELETE}</button>
      </ActionMenuPortal>
    </div>
  );
};

export default CampaignActions;
