import CallTaskActionMenu from './CallTaskActionMenu';
import type { CallTaskTableRowProps } from '../types/call-task-table-row.types';

const CallTaskTableRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CallTaskTableRowProps) => (
  <tr key={item.id}>
    <td>{index + 1}</td>
    <td>{item.title}</td>
    <td>{item.contactName || '-'}</td>
    <td>{item.contactPhone || '-'}</td>
    <td>{item.scheduledDate || '-'}</td>
    <td>{item.duration || '-'}</td>
    <td>{item.assignedTo || '-'}</td>
    <td>
      <span className={`status-badge status-${(item.status || '').toLowerCase()}`}>
        {item.status}
      </span>
    </td>
    <td>
      <CallTaskActionMenu
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </td>
  </tr>
);

export default CallTaskTableRow;
