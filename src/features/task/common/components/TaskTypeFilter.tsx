import { TASK_TYPE_FILTER_OPTIONS } from '../constants/taskTypeConfig';

interface TaskTypeFilterProps {
  value: string;
  onChange: (type: string) => void;
}

const TaskTypeFilter = ({ value, onChange }: TaskTypeFilterProps) => (
  <select
    className="field-input"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      border: '1px solid var(--border-default)',
      fontSize: 'var(--text-sm)',
      minWidth: '140px',
    }}
  >
    {TASK_TYPE_FILTER_OPTIONS.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default TaskTypeFilter;
