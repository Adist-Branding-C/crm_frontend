import { LayoutGrid, Table2 } from 'lucide-react';
import type { TaskBoardView } from '../types/kanban.types';
import './TaskViewToggle.css';

interface TaskViewToggleProps {
  view: TaskBoardView;
  onChange: (view: TaskBoardView) => void;
}

function TaskViewToggle({ view, onChange }: TaskViewToggleProps) {
  return (
    <div className="task-board-view-toggle" role="tablist" aria-label="Task board view">
      <button
        type="button"
        role="tab"
        aria-selected={view === 'kanban'}
        className={`task-board-view-toggle__btn${view === 'kanban' ? ' is-active' : ''}`}
        onClick={() => onChange('kanban')}
      >
        <LayoutGrid size={16} /> Kanban
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === 'table'}
        className={`task-board-view-toggle__btn${view === 'table' ? ' is-active' : ''}`}
        onClick={() => onChange('table')}
      >
        <Table2 size={16} /> Table
      </button>
    </div>
  );
}

export default TaskViewToggle;
