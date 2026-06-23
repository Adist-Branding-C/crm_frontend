import type { CampaignNameCellProps } from '../../types/campaign-table.types';

const CampaignNameCell = ({ name }: CampaignNameCellProps) => (
  <span className="lead-name-cell">{name}</span>
);

export default CampaignNameCell;
