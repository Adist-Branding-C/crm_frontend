import { formatDisplayDate } from '../../utils/date.utils';
import type { CampaignDateCellProps } from '../../types/campaign-table.types';

const CampaignDateCell = ({ date }: CampaignDateCellProps) => (
  <span>{formatDisplayDate(date)}</span>
);

export default CampaignDateCell;
