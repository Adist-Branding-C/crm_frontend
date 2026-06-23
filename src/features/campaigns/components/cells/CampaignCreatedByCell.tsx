import type { CampaignCreatedByCellProps } from '../../types/campaign-table.types';

const CampaignCreatedByCell = ({ createdByName, createdBy }: CampaignCreatedByCellProps) => (
  <span>{createdByName || createdBy}</span>
);

export default CampaignCreatedByCell;
