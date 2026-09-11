import type { TaskWorkflowItem } from '../../../task-settings/task-workflow/types/interface';
import './TaskWorkflowPicker.css';

interface TaskWorkflowPickerProps {
  workflows: TaskWorkflowItem[];
  selectedWorkflowId: string | null;
  onChange: (id: string) => void;
}

function TaskWorkflowPicker({ workflows, selectedWorkflowId, onChange }: TaskWorkflowPickerProps) {
  if (workflows.length <= 1) return null;

  return (
    <select
      className="task-workflow-picker-select"
      style={{ width: 'auto', minWidth: '10rem' }}
      value={selectedWorkflowId ?? ''}
      onChange={(e) => onChange(e.target.value)}
    >
      {workflows.map((wf) => (
        <option key={wf.id} value={wf.id}>
          {wf.name}
          {wf.isDefault ? ' (Default)' : ''}
        </option>
      ))}
    </select>
  );
}

export default TaskWorkflowPicker;
