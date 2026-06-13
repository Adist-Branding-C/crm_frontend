import DealTaskActionMenu from './DealTaskActionMenu';
import type { DealTaskTableRowProps } from '../types/deal-task-table-row.types';

const DealTaskTableRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: DealTaskTableRowProps) => (
  <tr key={item.id}>
    <td>{index + 1}</td>
    <td>{item.title}</td>
    <td>{item.deal || '-'}</td>
    <td>{item.amount ? `$${item.amount.toLocaleString()}` : '-'}</td>
    <td>{item.scheduledDate || '-'}</td>
    <td>{item.assignedTo || '-'}</td>
    <td>
      <span className={`status-badge status-${(item.status || '').toLowerCase()}`}>
        {item.status}
      </span>
    </td>
    <td>
      <DealTaskActionMenu
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </td>
  </tr>
);

export default DealTaskTableRow;
