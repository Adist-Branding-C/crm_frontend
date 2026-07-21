import { useRef } from 'react';
import { MoreHorizontal, CheckCircle2, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../task-settings/components/ActionMenuPortal';
import { CampaignLeadStatus } from '../../../shared/constants/enums';
import type { CampaignLeadItem } from '../types/campaign-lead';

const STATUS_OPTIONS = Object.values(CampaignLeadStatus);

interface CampaignLeadActionsProps {
  item: CampaignLeadItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onUpdateStatus: (leadId: string, status: CampaignLeadStatus) => void;
  onRemove: (leadId: string) => void;
}

const CampaignLeadActions = ({ item, dropdownOpen, onToggleDropdown, onUpdateStatus, onRemove }: CampaignLeadActionsProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const leadId = String(item.leadId);
  const isOpen = dropdownOpen === item.id;

  return (
    <div className="dropdown-container">
      <button ref={buttonRef} className="dropdown-toggle" onClick={() => onToggleDropdown(isOpen ? null : item.id)}>
        <MoreHorizontal size={16} />
      </button>
      <ActionMenuPortal isOpen={isOpen} triggerRef={buttonRef} onClose={() => onToggleDropdown(null)}>
        {STATUS_OPTIONS.filter((status) => status !== item.status).map((status) => (
          <button key={status} onClick={() => { onToggleDropdown(null); onUpdateStatus(leadId, status); }}>
            <CheckCircle2 size={14} /> <span>Mark as {status}</span>
          </button>
        ))}
        <button className="delete" onClick={() => { onToggleDropdown(null); onRemove(leadId); }}>
          <Trash2 size={14} /> <span>Remove</span>
        </button>
      </ActionMenuPortal>
    </div>
  );
};

export default CampaignLeadActions;
