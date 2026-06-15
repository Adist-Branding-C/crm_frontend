import CampaignNameCell from './cells/CampaignNameCell';
import CampaignTypeBadge from './cells/CampaignTypeBadge';
import CampaignProgressCell from './cells/CampaignProgressCell';
import CampaignCreatedByCell from './cells/CampaignCreatedByCell';
import CampaignDateCell from './cells/CampaignDateCell';
import CampaignActionCell from './cells/CampaignActionCell';
import { SPECIAL_KEYS, getCellValue } from '../utils/campaign.utils';
import type { CampaignTableRowProps } from '../types/campaign-table.types';
import type { Campaign } from '../types/campaign.types';

const CampaignTableRow = ({
  row,
  columns,
  actionMenuOpen,
  onToggleActionMenu,
  onDelete,
  onEdit,
}: CampaignTableRowProps) => (
  <tr>
    {columns.map(col => (
      <td key={col.key}>
        {col.key === 'name' && <CampaignNameCell name={row.name} />}
        {col.key === 'type' && <CampaignTypeBadge type={row.type} />}
        {col.key === 'completedPercent' && <CampaignProgressCell percent={row.completedPercent ?? 0} />}
        {col.key === 'createdBy' && <CampaignCreatedByCell createdBy={row.createdBy} createdByName={row.createdByName} />}
        {col.key === 'createdAt' && <CampaignDateCell date={row.createdAt} />}
        {col.key === 'action' && (
          <CampaignActionCell
            campaign={row}
            isOpen={actionMenuOpen === row.id}
            onToggle={onToggleActionMenu}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
        {getCellValue(row as unknown as Record<string, unknown>, col.key, SPECIAL_KEYS)}
      </td>
    ))}
  </tr>
);

export default CampaignTableRow;
