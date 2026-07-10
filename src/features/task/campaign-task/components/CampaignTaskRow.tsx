import { memo } from 'react';
import CampaignTaskActions from './CampaignTaskActions';
import StatusBadge from '../../../../shared/components/StatusBadge';
import { TRow, TCell } from '../../../../shared/components/table';
import type { CampaignTaskRowProps } from '../types/index';

const CampaignTaskRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CampaignTaskRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.title}</TCell>
    <TCell>{item.scheduledDate}</TCell>
    <TCell>{item.assignedTo?.name ?? '-'}</TCell>
    <TCell><StatusBadge value={item.priority} /></TCell>
    <TCell><StatusBadge value={item.status} /></TCell>
    <TCell>{item.lead?.name ?? '-'}</TCell>
    <TCell>
      <CampaignTaskActions
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(CampaignTaskRow);
