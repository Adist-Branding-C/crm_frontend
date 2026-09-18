import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle2, XCircle } from 'lucide-react';
import type { TaskWorkflowItem } from '../types/interface';
import './TaskWorkflowCard.css';

interface TaskWorkflowCardProps {
  workflow: TaskWorkflowItem;
  onSetDefault: (workflow: TaskWorkflowItem) => void;
  onDelete: (workflow: TaskWorkflowItem) => void;
}

function TaskWorkflowCard({ workflow, onSetDefault, onDelete }: TaskWorkflowCardProps) {
  const navigate = useNavigate();

  return (
    <div className="pipeline-card">
      <div className="pipeline-card__header">
        <h3 className="pipeline-card__name">{workflow.name}</h3>
        {workflow.isDefault && (
          <span className="pipeline-card__badge pipeline-card__badge--default">
            <Star size={12} /> Default
          </span>
        )}
      </div>

      <div className="pipeline-card__status">
        {workflow.isActive ? (
          <span className="pipeline-card__status-text pipeline-card__status-text--active">
            <CheckCircle2 size={14} /> Active
          </span>
        ) : (
          <span className="pipeline-card__status-text pipeline-card__status-text--inactive">
            <XCircle size={14} /> Inactive
          </span>
        )}
      </div>

      <div className="pipeline-card__actions">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/user/task_workflows/${workflow.id}`)}
        >
          Open
        </button>
        {!workflow.isDefault && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => onSetDefault(workflow)}>
            Make default
          </button>
        )}
        {!workflow.isDefault && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ color: 'var(--danger-text)' }}
            onClick={() => onDelete(workflow)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskWorkflowCard;
