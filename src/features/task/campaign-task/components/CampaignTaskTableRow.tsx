import CampaignTaskActionMenu from './CampaignTaskActionMenu';
import type { CampaignTaskTableRowProps } from '../types/campaign-task-table-row.types';

const CampaignTaskTableRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CampaignTaskTableRowProps) => (
  <tr key={item.id}>
    <td>{index + 1}</td>
    <td>{item.title}</td>
    <td>{item.campaignName || '-'}</td>
    <td>{item.campaignType || '-'}</td>
    <td>{item.scheduledDate || '-'}</td>
    <td>{item.assignedTo?.name || '-'}</td>
    <td>
      <span className={`status-badge status-${(item.status || '').toLowerCase()}`}>
        {item.status}
      </span>
    </td>
    <td>
      <CampaignTaskActionMenu
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </td>
  </tr>
);

export default CampaignTaskTableRow;
