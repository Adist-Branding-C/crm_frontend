import { memo } from 'react';
import { TRow, TCell } from '../../../shared/components/table';
import CampaignActions from './CampaignActions';
import { formatDisplayDate } from '../utils/date.utils';
import { getCreatedByLabel, getPoolAgentsLabel, getCampaignTypeBadgeClass } from '../utils/campaign.utils';
import type { CampaignRowProps } from '../types';

const CampaignRow = ({ campaign, dropdownOpen, onToggleDropdown, onView, onEdit, onAssign, onDelete }: CampaignRowProps) => (
  <TRow>
    <TCell>{campaign.slNo}</TCell>
    <TCell>{campaign.name}</TCell>
    <TCell>
      <span className={getCampaignTypeBadgeClass(campaign.type)}>{campaign.type}</span>
    </TCell>
    <TCell>{campaign.totalTasks}</TCell>
    <TCell>{campaign.completedTasks}</TCell>
    <TCell>
      <div className="progress-cell">
        <span>{campaign.completedPercent}%</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${campaign.completedPercent}%` }} />
        </div>
      </div>
    </TCell>
    <TCell>{getCreatedByLabel(campaign.createdBy)}</TCell>
    <TCell>{getPoolAgentsLabel(campaign.poolAgents)}</TCell>
    <TCell>{formatDisplayDate(campaign.createdAt)}</TCell>
    <TCell>
      <CampaignActions
        campaign={campaign}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onView={onView}
        onEdit={onEdit}
        onAssign={onAssign}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(CampaignRow);
