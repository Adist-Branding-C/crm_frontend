import { getBadgeClass } from '../../utils/campaign.utils';
import type { CampaignTypeBadgeProps } from '../../types/campaign-table.types';

const CampaignTypeBadge = ({ type }: CampaignTypeBadgeProps) => (
  <span className={getBadgeClass(type)}>{type}</span>
);

export default CampaignTypeBadge;
