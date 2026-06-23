import CampaignActionMenu from '../CampaignActionMenu';
import type { CampaignActionCellProps } from '../../types/campaign-table.types';

const CampaignActionCell = ({ campaign, isOpen, onToggle, onDelete, onEdit }: CampaignActionCellProps) => (
  <div className="action-cell">
    <CampaignActionMenu
      campaign={campaign}
      isOpen={isOpen}
      onToggle={onToggle}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  </div>
);

export default CampaignActionCell;
