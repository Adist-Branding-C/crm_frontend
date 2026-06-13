import TaskActionMenu from './TaskActionMenu';
import type { TaskTableRowProps } from '../types/task-table-row.types';

const TaskTableRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TaskTableRowProps) => (
  <tr key={item.id}>
    <td>{index + 1}</td>
    <td>{item.title}</td>
    <td>{item.category}</td>
    <td>{item.scheduledDate || '-'}</td>
    <td>{item.assignedTo || '-'}</td>
    <td>
      <span className={`status-badge status-${(item.priority || '').toLowerCase()}`}>
        {item.priority || '-'}
      </span>
    </td>
    <td>
      <span className={`status-badge status-${(item.status || '').toLowerCase()}`}>
        {item.status}
      </span>
    </td>
    <td>
      <TaskActionMenu
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </td>
  </tr>
);

export default TaskTableRow;
