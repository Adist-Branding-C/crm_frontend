import type { CampaignProgressCellProps } from '../../types/campaign-table.types';

const CampaignProgressCell = ({ percent }: CampaignProgressCellProps) => (
  <div className="progress-cell">
    <span>{percent}%</span>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  </div>
);

export default CampaignProgressCell;
